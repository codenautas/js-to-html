var html = require("js-to-html").html;

var myArticle = html.article(
    {"class":"class-name", id:45},
    [
        html.h1("title"),
        html.p("this is my article"),
        html.p({style:"font-style: italic"}, "good enough to show")
    ]
);

myArticle.toHtmlDoc({pretty:true});
