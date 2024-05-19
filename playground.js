const blogDic = {
    "blog title 1" : "This is a blog. I can keep going.",
    "blog title 2" : "This is a second blog. More to come.",
}

for (const key in blogDic) {
    console.log(key, blogDic[key]);
}