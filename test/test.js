"use strict";

var expect = require('expect.js');
var jsToHtml = require('..');

describe('js-to-html', function(){
    describe('basic test', function(){
        var html = jsToHtml.html;
        var direct = jsToHtml.direct;
        beforeEach(function(){
        });
        it('should render a simple text', function(){
            var textNode=direct({textNode:"simple text"});
            expect(textNode).to.be.a(jsToHtml.Html);
            var htmlText=textNode.toHtmlText();
            expect(htmlText).to.eql("simple text");
        });
        it('should render a simple empty text', function(){
            var textNode=direct({textNode:""});
            expect(textNode).to.be.a(jsToHtml.Html);
            var htmlText=textNode.toHtmlText();
            expect(htmlText).to.eql("");
        });
        it('should render an element without content', function(){
            var div=direct({
                tagName:'div',
                attributes:{},
                content:[]
            });
            expect(div).to.be.a(jsToHtml.Html);
            var htmlText=div.toHtmlText();
            expect(htmlText).to.eql("<div></div>");
        });
        it('should control the presence and type/class of all properties', function(){
            expect(function(){
                direct({tagName:'div', attributes:{}})
            }).to.throwError(/must include content/);
            expect(function(){
                direct({tagName:'div', attributes:{}, content:"must not be a string"})
            }).to.throwError(/must include content of Array class/);
            expect(function(){
                direct({tagName:'div', content:[], attributes:['must not be an array']})
            }).to.throwError(/must include attributes of Object class/);
            expect(function(){
                direct({tagName:8, content:[], attributes:{valid:true}});
            }).to.throwError(/must include tagName of string type/);
            expect(function(){
                direct({tagName:'div', attributes:{}, content:["ok"], other:"no good"})
            }).to.throwError(/not recognized other property/);
            expect(function(){
                direct({textNode:'a phrase', thisAttribute:"no good"})
            }).to.throwError(/not recognized thisAttribute property/);
        });
        it('should render an element without content', function(){
            var p=direct({
                tagName:'p',
                attributes:{},
                content:[direct({textNode: 'The first example'})]
            });
            expect(p).to.be.a(jsToHtml.Html);
            var htmlText=p.toHtmlText();
            expect(htmlText).to.eql("<p>The first example</p>");
        });
        it('should construct a p object', function(){
            var p=html.p('The first example');
            expect(p).to.eql(direct({
                tagName:'p',
                attributes:{},
                content:[direct({textNode: 'The first example'})]
            }));
        });
        it('should render a p with attributes', function(){
            expect(html.p(
                {'class':'the_class', id:'44'},
                'The second example'
            )).to.eql(direct({
                tagName:'p',
                attributes:{'class':'the_class', id:'44'},
                content:[direct({textNode: 'The second example'})]
            }));
        });
        it('should construct and render a div with other elements inside', function(){
            var div=html.div({'class':'the_class', id:'47'},[
                html.p('First paragraph'),
                html.p('Second paragraph')
            ]);
            var object=direct({
                tagName:'div',
                attributes:{'class':'the_class', id:'47'},
                content:[
                    direct({tagName: 'p', attributes:{}, content:[direct({textNode: 'First paragraph' })]}),
                    direct({tagName: 'p', attributes:{}, content:[direct({textNode: 'Second paragraph'})]})
                ]
            });
            expect(div).to.eql(object);
            expect(object.toHtmlText()).to.eql(
                "<div class=the_class id=47>"+
                "<p>First paragraph</p>"+
                "<p>Second paragraph</p>"+
                "</div>"
            );
        });
        it('should render a div with other elements inside in a pretty way', function(){
            expect(html.div({'class':'the_class', id:'47'},[
                html.h1('First title'),
                html.h2(['Second title with ',html.b('something'),' bold'])
            ]).toHtmlText({pretty:true},{margin:4})).to.eql(
                "    <div class=the_class id=47>\n"+
                "      <h1>First title</h1>\n"+
                "      <h2>Second title with <b>something</b> bold</h2>\n"+
                "    </div>\n"
            );
        });
    });
});
