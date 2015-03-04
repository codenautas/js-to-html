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
        it.skip('should render an element without content', function(){
            var p=direct({
                tagName:'p',
                attributte:{},
                content:'The first example'
            });
            expect(p).to.be.a(jsToHtml.Html);
            var htmlText=p.toHtmlText();
            expect(htmlText).to.eql("<p>The first example</p>");
        });
        it.skip('should render an element with textContent', function(){
            var p=html.p('The first example');
            expect(p).to.be.a(jsToHtml.Html);
            expect(p.toDumpObject()).to.eql({
                tagName:'p',
                textContent:'The first example'
            });
            var htmlText=p.toHtmlText();
            expect(htmlText).to.eql("<p>The first example</p>");
        });
        it.skip('should render a span with attributes', function(){
            expect(html.span(
                {'class':'the_class', id:'44'},
                'The second example'
            ).toHtml()).to.eql(
                "<span class=the_class id=44>The second example</span>"
            );
        });
        it.skip('should render a div with other elements inside', function(){
            expect(jh({
                tagName:'div',
                attributes:{'class':'the_class', id:'47'},
                content:[
                    {tagName: 'p', textContent: 'First paragraph'},
                    {tagName: 'p', textContent: 'Second paragraph'},
                ]
            }).toHtml()).to.eql(
                "<div class=the_class id=47>"+
                "<p>First paragraph</p>"+
                "<p>Second paragraph</p>"+
                "</div>"
            );
        });
        it.skip('should render a div with other elements inside in a pretty way', function(){
            expect(jh({
                tagName:'div',
                attributes:{'class':'the_class', id:'47'},
                content:[
                    {tagName: 'p', textContent: 'First paragraph'},
                    {tagName: 'p', textContent: 'Second paragraph'},
                ]
            }).toHtml({pretty:true},{margin:4})).to.eql(
                "    <div class=the_class id=47>\n"+
                "      <p>First paragraph</p>\n"+
                "      <p>Second paragraph</p>\n"+
                "    </div>\n"
            );
        });
        it.skip('should expose the internal content for test purposes',function(){
            var object={
                tagName:'div',
                attributes:{'class':'the_class', id:'47'},
                content:[
                    {tagName: 'p', textContent: 'First paragraph'},
                    {tagName: 'p', textContent: 'Second paragraph'},
                ]
            };
            jh.testing=true;
            expect(jh(object).internal).to.eql(object);
        });
        it.skip('should not expose the internal content if not for test purposes',function(){
            jh.testing=false;
            expect(function(){
                jh({tagName:'div'}).internal
            }).to.throwError(/internal content is only for test purposes/);
        });
    });
});
