import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;

const blogDic = {
    "Sample Post 1" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat lacinia vulputate. Maecenas in ornare arcu, ac condimentum ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque mi at pellentesque efficitur. Fusce justo nulla, dignissim sit amet nunc in, bibendum varius elit.",
    "Sample Post 2" : "Maecenas neque eros, fringilla vitae tincidunt viverra, lacinia in dui. Donec et vestibulum neque. Pellentesque maximus, eros sed blandit hendrerit, elit dolor sodales nulla, tristique mattis nisl nulla ut ligula. Donec sed dolor id orci malesuada lacinia sit amet fermentum dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut et nisl quis ligula feugiat lacinia lacinia nec tellus. Vivamus tincidunt, magna ac auctor iaculis, diam diam rhoncus nisl, eu euismod nibh urna id diam. Fusce fringilla nisl bibendum imperdiet maximus. .",
}
var selected = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {content: "", dic: blogDic});
});

app.get("/write", (req, res) => {
    res.render("write.ejs", {content: "", dic: blogDic});
});

app.get("/edit", (req, res) => {
    const title = selected;
    const content = blogDic[selected];
    res.render("edit.ejs", {title: title, content: content, dic: blogDic});
})

app.get("/delete", (req, res) => {
    if(selected){
        delete blogDic[selected];
        selected="";
    }
    res.render("index.ejs", {content: "", dic: blogDic});
})

app.post("/read", (req, res) => {
    const title = req.body.title;
    var content = title + "\n\n" + blogDic[title];
    res.render("index.ejs", {content: content, dic: blogDic});
    selected = title
    console.log(selected);
})


app.post("/submit", (req, res) => {
    var title = req.body.post_title;
    const content =req.body.post_body;
    if (title in blogDic) {title = title + " (Duplicate)"};
    blogDic[title] = content;
    selected="";
    res.render("write.ejs", {content: "", dic: blogDic});
})

app.post("/submit_edit", (req, res) => {
    const title = req.body.post_title;
    blogDic[title] = req.body.post_body;
    selected="";
    res.render("edit.ejs", {title: "", content: "", dic: blogDic});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

