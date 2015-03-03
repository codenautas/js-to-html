"use strict";

var expect = require('expect.js');
var jh = require('..');

describe('js-to-html', function(){
    describe('basic test', function(){
        it('should render an element with textContent', function(){
            var object=jh({
                tagName:'p',
                textContent:'The first example'
            });
            expect(object).to.be.a(jh.Internal);
            var htmlText=object.toHtml();
            expect(htmlText).to.eql("<p>The first example</p>");
        });
        it('should render a span with attributes', function(){
            expect(jh({
                tagName:'span',
                attributes:{'class':'the_class', id:'44'},
                textContent:'The second example'
            }).toHtml()).to.eql(
                "<span class=the_class id=44>The second example</span>"
            );
        });
        it('should render a div with other elements inside', function(){
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
        it('should render a div with other elements inside in a pretty way', function(){
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
        it('should expose the internal content for test purposes',function(){
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
        it('should not expose the internal content if not for test purposes',function(){
            jh.testing=false;
            expect(function(){
                jh({tagName:'div'}).internal
            }).to.throwError(/internal content is only for test purposes/);
        });
    });
});
