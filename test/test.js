"use strict";

var esIE = this.navigator ? /\.NET/.test(navigator.userAgent) : false;

var jsToHtml = require('../lib/js-to-html')
var bestGlobals = require('best-globals');

var moment = require('moment')

if(typeof document === 'undefined'){
    global.jsToHtml = require('../lib/js-to-html.js');
    global.expect = require('expect.js');
    global.moment = require('moment');
}

function alfaHTML(text){
    var result = text.replace(/(<\/?\w+ )([^<>]*?)(\/?>)/g, function(_all,ini,content,fin){
        var parts = content.split(' ');
        var okParts = [];
        var inString = false;
        var okPart = [];
        while(parts.length){
            var part = parts.shift();
            if(!inString && part.match(/^[-a-zA-Z0-9_]*="/)) inString = true;
            okPart.push(part);
            if(!inString || part[part.length-1] == '"' && part[part.length-2] != '\\'){
                okParts.push(okPart.join(' '));
                inString = false;
                okPart = [];
            }
        }
        return ini+okParts.sort().join(' ')+fin;
    });
    return result;
}

describe('js-to-html', function(){
    describe('basic test', function(){
        var html = jsToHtml.html;
        var direct = jsToHtml.direct;
        beforeEach(function(){
        });
        it('should render a simple text', function(){
            var textNode=direct({textNode:"simple text"});
            expect(textNode).to.be.a(jsToHtml.HtmlTextNode);
            var htmlText=textNode.toHtmlText();
            expect(htmlText).to.eql("simple text");
        });
        it('should render a simple empty text', function(){
            var textNode=direct({textNode:""});
            expect(textNode).to.be.a(jsToHtml.HtmlTextNode);
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
        it('should render an element with content', function(){
            var p=direct({
                tagName:'p',
                attributes:{},
                content:[direct({textNode: 'The first example'})]
            });
            expect(p).to.be.a(jsToHtml.Html);
            var htmlText=p.toHtmlText();
            expect(htmlText).to.eql("<p>The first example</p>");
        });
        it.skip('should render an input element with a date', function(){
            // esto es inválido, no entiendo por qué lo pusimos
            var input=direct({
                tagName:'input',
                attributes:{'class':'date', value:direct({textNode: '3/12/2015'})},
                content:[]
            });
            expect(input).to.be.a(jsToHtml.Html);
            var htmlText=input.toHtmlText();
            expect(htmlText).to.eql('<input class=date value="2015/12/3">');
        });
        it('should not render a boolean false attribute', function(){
            // esto es inválido, no entiendo por qué lo pusimos
            var input=direct({
                tagName:'input',
                attributes:{checked:false, type:'radio'},
                content:[]
            });
            expect(input).to.be.a(jsToHtml.Html);
            var htmlText=input.toHtmlText();
            expect(htmlText).to.eql('<input type=radio>');
        });
        it('should render a boolean true attribute', function(){
            // esto es inválido, no entiendo por qué lo pusimos
            var input=direct({
                tagName:'input',
                attributes:{checked:true, type:'radio'},
                content:[]
            });
            expect(input).to.be.a(jsToHtml.Html);
            var htmlText=input.toHtmlText();
            expect(htmlText).to.eql('<input checked type=radio>');
        });
        it('should exclude null and undefined  in content', function(){
            var p=html.p(['sí', null, html.img(), undefined, 1, '', 'no', 0]);
            expect(p).to.eql(direct({
                tagName:'p',
                attributes:{},
                content:[
                    direct({textNode: 'sí'}),
                    direct({tagName:'img', attributes:{}, content:[]}),
                    direct({textNode: '1'}),
                    direct({textNode: ''}),
                    direct({textNode: 'no'}),
                    direct({textNode: '0'})
                ]
            }));
        });
        it('should exclude allow nested arrays in content', function(){
            var p=html.p(['sí', null, [html.img(), undefined, 1, '', 'no'], 0]);
            expect(p).to.eql(direct({
                tagName:'p',
                attributes:{},
                content:[
                    direct({textNode: 'sí'}),
                    direct({tagName:'img', attributes:{}, content:[]}),
                    direct({textNode: '1'}),
                    direct({textNode: ''}),
                    direct({textNode: 'no'}),
                    direct({textNode: '0'})
                ]
            }));
        });
        it('should get empty content when null and undefined in content', function(){
            var p=html.p(null);
            expect(p).to.eql(direct({
                tagName:'p',
                attributes:{},
                content:[]
            }));
            var div=html.div();
            expect(div).to.eql(direct({
                tagName:'div',
                attributes:{},
                content:[]
            }));
        });
        it('should construct a textNode', function(){
            var p=html._text('A text node that could not be created with document.createElement');
            expect(p).to.eql(direct({textNode: 'A text node that could not be created with document.createElement'}));
        });
        it('should construct a commentNode', function(){
            this.timeout(9000);
            var p=html._comment('A text node that could only be created with <!--');
            expect(p).to.eql(direct({commentText: 'A text node that could only be created with <!--'}));
        });
        it('should construct a commentNode and text it', function(){
            this.timeout(9000);
            var t=html._comment('A text node that could \nonly be created with <!--').toHtmlText();
            expect(t).to.eql('<!--A text node that could \nonly be created with <!---->');
        });
        it('should rejeect a commentNode with invalid texts', function(){
            expect(function(){
                html._comment('A text node that could only be created with <!-- ... -->');
            }).to.throwError(/invalid text in comment/);
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
            expect(object.toHtmlDoc({incomplete:true})).to.eql(
                "<!doctype html>\n"+
                "<div class=the_class id=47>"+
                "<p>First paragraph</p>"+
                "<p>Second paragraph</p>"+
                "</div>"
            );
        });
        it('should render a div with other elements inside in a pretty way', function(){
            expect(html.div({'class':'the_class', id:'47'},[
                html.h1('First title'),
                html.h2(['Second title with ',html.b('something'),' bold']),
                "text content"
            ]).toHtmlText({pretty:true},{margin:4})).to.eql(
                "    <div class=the_class id=47>\n"+
                "      <h1>First title</h1>\n"+
                "      <h2>Second title with <b>something</b> bold</h2>\n"+
                "text content"+ // doubt
                "    </div>\n"
            );
        });
        it('should construct div without content', function(){
            expect(html.div().toHtmlText()).to.eql(
                "<div></div>"
            );
        });
        it('should delimite with simple quotes attribute value if contains some not alphabetic chars', function(){
            this.timeout(9000);
            expect(
                html.p({"class":'names', title:'this title', lang:''},'text').toHtmlText()
            ).to.eql("<p class=names title='this title' lang=''>text</p>");
        });
        it('should escape text', function(){
            this.timeout(9000);
            expect(direct({textNode:'esto < esto & > aquello \'sí\' y "no"'}).toHtmlText()).to.eql(
                'esto &lt; esto &amp; &gt; aquello &#39;sí&#39; y &quot;no&quot;'
            );
        });
        it('should escape attributes', function(){
            this.timeout(9000);
            expect(html.p({title:'esto < esto & > aquello \'sí\' y "no"'}).toHtmlText()).to.eql(
                "<p title='esto &lt; esto &amp; &gt; aquello &#39;sí&#39; y &quot;no&quot;'></p>"
            );
        });
        it('should accpet space in class atribute', function(){
            expect(
                html.p({"class":'three class names'},'text').toHtmlText()
            ).to.eql(
                "<p class='three class names'>text</p>"
            );
        });
        it('should not admit an invalid element', function(){
            this.timeout(9000);
            expect(function(){
                direct({tagName:"not-exists", attributes:{}, content:[]})
            }).to.throwError(/tagName not-exists not exists/);
        });
        it('should not admit an invalid main argument', function(){
            expect(function(){
                direct({inexistingMain:"not-exists"})
            }).to.throwError(/invalid arguments to direct function/);
        });
        it('should render void elements without closing tag', function(){
            this.timeout(9000);
            expect(
                direct({tagName:"img", attributes:{src:'img.png'}, content:[]}).toHtmlText()
            ).to.eql("<img src='img.png'>");
        });
        it('should concat list values for list-type attributes', function(){
            this.timeout(9000);
            expect(
                html.p({"class":['names', 'other']},'text').toHtmlText()
            ).to.eql("<p class='names other'>text</p>");
        });
        it('should accept numbers', function(){
            this.timeout(9000);
            expect(html.p([html.span(3),1.1]).toHtmlText()).to.eql(
                "<p><span>3</span>1.1</p>"
            );
            expect(html.p({"class": "the_class_name"}, 314).toHtmlText()).to.eql(
                "<p class=the_class_name>314</p>"
            );
        });
    });
    describe('controls of direct function.', function(){
        var html = jsToHtml.html;
        var direct = jsToHtml.direct;
        it('should control the presence of content', function(){
            this.timeout(9000);
            expect(function(){
                direct({tagName:'div', attributes:{}})
            }).to.throwError(/must include content/);
        });
        it('should control the type of content', function(){
            this.timeout(9000);
            expect(function(){
                direct({tagName:'div', attributes:{}, content:"must not be a string"})
            }).to.throwError(/content must be an Array/);
        });
        it('should control the type of attributes', function(){
            this.timeout(9000);
            expect(function(){
                direct({tagName:'div', content:[], attributes:['must not be an array']})
            }).to.throwError(/attributes must be a plain Object/);
        });
        it('should control the type of tagName', function(){
            expect(function(){
                direct({tagName:8, content:[], attributes:{valid:true}});
            }).to.throwError(/tagName must be a string/);
        });
        it('should not control attributes with null value', function(){
            this.timeout(9000);
            expect(
                direct({tagName:'p', content:[], attributes:{id:null}}).toHtmlText()
            ).to.eql("<p></p>");
            //attributes can contain null value/;
        });
        it('should not permit de presence of other attributes', function(){
            this.timeout(9000);
            expect(function(){
                direct({tagName:'div', attributes:{}, content:["ok"], other:"no good"})
            }).to.throwError(/not recognized other property/);
        });
        it('should not permit de presence of other attributes in a TextNode', function(){
            this.timeout(9000);
            expect(function(){
                direct({textNode:'a phrase', thisAttribute:"no good"})
            }).to.throwError(/not recognized thisAttribute property/);
        });
        it('should not permit null in a TextNode', function(){
            this.timeout(9000);
            expect(function(){
                direct({textNode:null})
            }).to.throwError(/textNodes must not contains null/);
        });
        it('should reject double content (probably a mismatch)', function(){
            this.timeout(9000);
            expect(function(){
                html.p("texto", "otro texto")
            }).to.throwError(/the first parameter is not an attribute object then must there no be a second parameter/);
        });
        it('should reject content for void elements', function(){
            expect(function(){
                direct({tagName:'link', attributes:{href: "http://correct.com"}, content:["content"]})
            }).to.throwError(/void elements must not have content/);
        });
    });
    describe('controls of html.TAGS parameters', function(){
        var html = jsToHtml.html;
        it('should reject null in escapeChar by _text', function(){
            expect(function(){
                html._text()
            }).to.throwError(/textNodes must not contains null/);
        });
        it('should reject other objects', function(){
            this.timeout(9000);
            expect(function(){
                var complexObject=moment();
                html.p(complexObject);
            }).to.throwError(/expects plain object of attributes or array of content/);
        });
        it('should accept script attributes',function(){
            html.script({src:"ok.js"});
        });
        describe("html.script new", function(){ [true, false].forEach(function(direct){
            beforeEach(function(){
                jsToHtml.setScriptIsVoid(true);
            })
            describe("html.script: " + (direct ? 'direct' : 'tag'), function(){
                [["in-array.js"],"one.js"].forEach(function(content){
                    it('should reject script content: '+JSON.stringify(content),function(){
                        expect(function(){
                            if(direct && content instanceof Array)
                                jsToHtml.direct({tagName:"script", attributes:{src:"ok.js"}, content:content})
                            else
                                html.script({src:"ok.js"}, content)
                        }).to.throwError(/must not have content/);
                    });
                });
                [{src:null},{id:"bad.js"},{},null,undefined].forEach(function(attrs){
                    it('should reject script without source: '+(attrs ? JSON.stringify(attrs) : attrs),function(){
                        expect(function(){
                            if(direct && attrs && attrs instanceof Object)
                                jsToHtml.direct({tagName:"script", attributes:attrs, content:null})
                            else
                                html.script(attrs)
                        }).to.throwError(/lack of src in html.script/);
                    });
                });
            })
        })});
        it('should accept script with all others',function(){
            jsToHtml.setScriptIsVoid(false);
            html.script({src:"ok.js"});
            html.script();
            html.script("ok.js");
        });
    });
    describe("toHtmlDoc", function(){
        var html = jsToHtml.html;
        var dt="<!doctype html>\n";
        it('should reject toHtmlDoc without mandatoryTitle', function(){
            this.timeout(9000);
            expect(function(){
                html.div().toHtmlDoc()
            }).to.throwError(/missing mandatory title/);
        });
        it('should complete the HTML tag in simple html', function(){
            this.timeout(9000);
            html.mandatoryTitle=false;
            expect(html.div().toHtmlDoc()).to.eql("<!doctype html>\n<html><head></head><body><div></div></body></html>");
        });
        it('should complete the HTML tag when no head', function(){
            this.timeout(9000);
            html.mandatoryTitle=false;
            expect(html.body([html.br()]).toHtmlDoc()).to.eql("<!doctype html>\n<html><head></head><body><br></body></html>");
        });
        it('should complete the HTML tag when no title explicit', function(){
            this.timeout(9000);
            html.mandatoryTitle=true;
            expect(
                html.html([html.head(),html.body([html.br()])]).toHtmlDoc({title:'the title'})
            ).to.eql("<!doctype html>\n<html><head><title>the title</title></head><body><br></body></html>");
        });
        it('should complete the HTML tag when no title with default', function(){
            this.timeout(9000);
            html.mandatoryTitle=true;
            html.defaultTitle='the default title';
            expect(
                html.html([html.head([html.meta()]),html.br(),html.img()]).toHtmlDoc()
            ).to.eql("<!doctype html>\n<html><head><title>the default title</title><meta></head><body><br><img></body></html>");
        });
        it('should mantain the title when no default', function(){
            this.timeout(9000);
            html.mandatoryTitle=true;
            html.defaultTitle=false;
            expect(
                html.html([html.head([html.meta(),html.title("this")]),html.body([html.br()])]).toHtmlDoc()
            ).to.eql("<!doctype html>\n<html><head><meta><title>this</title></head><body><br></body></html>");
        });
        it('should mantain the title when haves default', function(){
            html.mandatoryTitle=true;
            html.defaultTitle='the default title';
            expect(
                html.html([html.head([html.meta(),html.title("this")]),html.body([html.br()])]).toHtmlDoc()
            ).to.eql("<!doctype html>\n<html><head><meta><title>this</title></head><body><br></body></html>");
        });
        it('should reject double title', function(){
            this.timeout(9000);
            html.mandatoryTitle=true;
            expect(function(){
                html.html([html.head([html.meta(),html.title("this")]),html.body([html.br()])]).toHtmlDoc({title:'other'})
            }).to.throwError(/double title/);
        });
        it('should reject multiple title', function(){
            this.timeout(9000);
            html.mandatoryTitle=true;
            expect(function(){
                html.html([html.head([html.title("that"),html.title("this")]),html.body([html.br()])]).toHtmlDoc()
            }).to.throwError(/multiple title/);
        });
        it('should complete the HTML only tag', function(){
            html.defaultTitle='t';
            expect(html.html({lang: "es"}).toHtmlDoc()).to.eql("<!doctype html>\n<html lang=es><head><title>t</title></head><body></body></html>");
        });
    });
    describe('insecure',function(){
        var html = jsToHtml.html;
        var direct = jsToHtml.direct;
        it('should reject insecure html for includeHtml',function(){
            this.timeout(9000);
            expect(function(){
                html.insecureModeEnabled=true;
                html.includeHtml("<div> a > b </div>");
            }).to.throwError(/invalid htmlCode/);
        });
        it('should accept secure html for includeHtml',function(){
            html.includeHtml('<div class="this one">\ndo &amp; code\n</div>' );
        });
        it('should include HTML code', function(){
            var html = jsToHtml.html;
            html.insecureModeEnabled = true;
            var htmlCode = 'the html code';
            html.includeHtmlValidator=function(){
                html.includeHtmlValidator.callCount=html.includeHtmlValidator.callCount||0;
                html.includeHtmlValidator.callCount++;
                if(!html.includeHtmlValidator.firstCall){
                    html.includeHtmlValidator.firstCall={args: Array.prototype.slice.call(arguments)};
                }
                return true;
            };
            var code = html.includeHtml(htmlCode);
            expect(code).to.eql(direct({htmlCode:htmlCode, validator:html.includeHtmlValidator}));
            expect(code.toHtmlText()).to.eql(htmlCode);
            expect(html.includeHtmlValidator.callCount).to.eql(2);
            expect(html.includeHtmlValidator.firstCall.args).to.eql([htmlCode]);
        });
        it('should reject insecure functions for includeHtml',function(){
            expect(function(){
                html.insecureModeEnabled=false;
                html.includeHtml("hello");
            }).to.throwError(/insecure functions not allowed/);
        });
    });
    describe("custom attributes",function(){
        var direct = jsToHtml.direct;
        it('must reject inexistent attributes',function(){
            expect(function(){
                direct({tagName:'p', attributes:{thisnotexists:'one'}, content:[]})
            }).to.throwError(/inexistent attribute "thisnotexists"/);
        })
        it('must reject not matching attributes',function(){
            expect(function(){
                direct({tagName:'p', attributes:{href:'http://p.must.not.contains.it'}, content:[]})
            }).to.throwError(/attribute .* does not match with tagName/);
        })
        it('must accept dashed attributes',function(){
            expect(
                direct({tagName:'div', attributes:{"this-is-special":'yeah'}, content:[]}).toHtmlText()
            ).to.eql(
                "<div this-is-special=yeah></div>"
            );
        })
        it('must accept $attrs',function(){
            expect(
                direct({tagName:'div', attributes:{$attrs:{"this-is-special":'yeah', also:'this'}}, content:[]}).toHtmlText()
            ).to.eql(
                "<div this-is-special=yeah also=this></div>"
            );
        })
    });
    describe("arrayToHtmlText", function(){
        var html = jsToHtml.html;
        it('should list off nodes', function(){
            expect(jsToHtml.arrayToHtmlText([
                html.h1('First title'),
                html.h2(['Second title with ',html.b('something'),' bold'])
            ],{pretty:true},{margin:4})).to.eql(
                "    <h1>First title</h1>\n"+
                "    <h2>Second title with <b>something</b> bold</h2>\n"
            );
        });
        it('should list off any nodes', function(){
            expect(jsToHtml.arrayToHtmlText([
                html.h1('The title'),
                "content"
            ],{pretty:true})).to.eql(
                "<h1>The title</h1>\n"+
                "content"
            );
        });
        it('should list off any nodes uggly', function(){
            expect(jsToHtml.arrayToHtmlText([
                html.h1('The title'),
                html._text("content"),
            ])).to.eql(
                "<h1>The title</h1>content"
            );
        });
    });
});

if(typeof document !== 'undefined'){
    var arrange = jsToHtml.arrange;
    describe('js-to-dom', function(){
        function control(htmlObject, pairsOrHtml, done, others){
            try{
                var div = document.createElement('div');
                document.body.appendChild(div);
                var element = htmlObject.create();
                div.appendChild(element);
                if(typeof pairsOrHtml=="string"){
                    expect(div.innerHTML.replace(/<[^ >]*[ >]/g,function(x){ return x.toLowerCase(); })).to.be(pairsOrHtml);
                }else if(pairsOrHtml instanceof RegExp){
                    expect(div.innerHTML).to.match(pairsOrHtml);
                }else{
                    for(var prop in pairsOrHtml){
                        if(pairsOrHtml[prop] instanceof Array){
                            var obtained=element[prop];
                            if(!(obtained instanceof Array) && 'length' in obtained || '_updateClassName' in obtained){
                                obtained=Array.prototype.slice.call(obtained,0);
                            }
                            expect(obtained).to.eql(pairsOrHtml[prop]);
                        }else{
                            expect(element[prop]).to.be(pairsOrHtml[prop]);
                        }
                    }
                }
                if(others) others(done, element) 
                else setTimeout(done,100);
            }catch(err){
                done(err);
            }
        }
        describe('basic test', function(){
            var html = jsToHtml.html;
            var direct = jsToHtml.direct;
            beforeEach(function(){
            });
            it('should render a simple text', function(done){
                var textNode=direct({textNode:"simple text"});
                control(textNode, "simple text", done);
            });
            it('should render a simple empty text', function(done){
                var textNode=direct({textNode:""});
                control(textNode, "", done);
            });
            // function done(){};
            it('should render an element without content', function(done){
                var div=direct({
                    tagName:'div',
                    attributes:{},
                    content:[]
                });
                control(div,"<div></div>",done);
            });
            it('should render an element with content', function(done){
                var p=direct({
                    tagName:'p',
                    attributes:{},
                    content:[direct({textNode: 'The first example'})]
                });
                control(p,"<p>The first example</p>",done);
            });
            it('should construct and render a div with other elements inside', function(done){
                var div=html.div({'class':'the_class'},[
                    html.p('First paragraph'),
                    html.p('Second paragraph')
                ]);
                control(
                    div,
                    /^<div class="?the_class"?>\r?\n?<p>First paragraph<\/p>\r?\n?<p>Second paragraph<\/p>\r?\n?<\/div>$/i,
                    done
                );
                /*
                control(div,
                    '<div class="the_class">'+
                    "<p>First paragraph</p>"+
                    "<p>Second paragraph</p>"+
                    "</div>",
                    done
                );
                */
            });
            it('should create attribute value if contains some not alphabetic chars', function(done){
                control(
                    html.p({"class":'names', title:'this title'},'text'),
                        {title:"this title"},
                    done
                );
            });
            it('should escape text', function(done){
                control(
                    direct({textNode:'esto < esto & > aquello \'sí\' y "no"'}),
                    'esto &lt; esto &amp; &gt; aquello \'sí\' y "no"',
                    done
                );
            });
            it('should escape attributes', function(done){
                control(
                    html.p({title:'esto < esto & > aquello \'sí\' y "no"'}),
                    {title:'esto < esto & > aquello \'sí\' y "no"'},
                    done
                );
            });
            it('should render void elements without closing tag', function(done){
                control(
                    direct({tagName:"img", attributes:{src:'img.png'}, content:[]}),
                    '<img src="img.png">',
                    done
                );
            });
            it('should concat list values for list-type attributes', function(done){
                control(
                    html.p({"class":['names', 'other']},'text'),
                    {"classList": ['names','other']},
                    done
                );
            });
            it('should concat list values for list-type attributes', function(done){
                control(
                    html.p({"class":['names', 'other']},'text'),
                    '<p class="names other">text</p>',
                    done
                );
            });
            it('should define special dashed attributes', function(done){
                control(
                    html.p({"one-special-attr":'the value'}),
                    '<p one-special-attr="the value"></p>',
                    done
                );
            });
            it('should translate HTML attributes to IDL attributes', function(done){
                this.timeout(9000);
                control(
                    html.td({colspan:3}),
                    {colSpan:3},
                    done
                );
            });
            it('should create input with list attribute', function(done){
                control(
                    html.input({list: 'esto', value: 'alfa'}),
                    '<input list="esto">',
                    done,
                    function(done, element){
                        expect(element.value).to.eql('alfa');
                        done();
                    }
                );
            });
            it('should create input radiobutton unckecked', function(done){
                control(
                    html.input({type:'radio', checked:false}),
                    '<input type="radio">',
                    done,
                    function(done, element){
                        expect(element.checked).to.eql(false);
                        done();
                    }
                );
            });
            it('should create input radiobutton ckecked', function(done){
                control(
                    html.input({type:'radio', checked:true}),
                    '<input type="radio" checked="">', // equivale a <input type="radio" checked>
                    done,
                    function(done, element){
                        expect(element.checked).to.eql(true);
                        done();
                    }
                );
            });
        });
        describe('svg', function(){
            var html = jsToHtml.html;
            beforeEach(function(){
            });
            it('should render an element with content', function(done){
                var svgTxt=esIE?'<svg xmlns="http://www.w3.org/2000/svg" class="one" id="id-svg" viewbox="0 0 100 200"><path id="path-id" d="M 19 13 h -6 v 6 h -2 v -6 H 5 v -2 h 6 V 5 h 2 v 6 h 6 v 2 Z" /></svg>':
                    '<svg id="id-svg" class="one" viewbox="0 0 100 200"><path id="path-id" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>';
                control(
                    html.svg({id:'id-svg', class:'one', viewbox:"0 0 100 200"},[
                        html.path({id:'path-id', d:'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'})
                    ]),
                    svgTxt,
                    done
                );
            });
        });
    });
    describe('mixed objects', function(){
        it('must accept DOMElements in html element list', function(){
            var html = jsToHtml.html;
            var b=html.b("world").create();
            var d=html.div(["hello ", b, html._text("!")]).create();
            expect(d.innerHTML.toLowerCase()).to.eql("hello <b>world</b>!")
        });
    });
    describe('style attribute', function(){
        it('must accept style text attribute', function(){
            var html = jsToHtml.html;
            var div=html.div({style:"width:80%"}, "world").create();
            expect(div.style.width).to.eql("80%");
        });
    });
    describe('alfaHTML', function(){
        it('order attributes', function(){
            var result = alfaHTML('<div eso alfa="esto" gama="aquello a" beta=3393>otra cosa</div><img id=algo-tres algo/>');
            expect(result).to.eql('<div alfa="esto" beta=3393 eso gama="aquello a">otra cosa</div><img algo id=algo-tres/>');
        })
    });
    [false, true].forEach(function(optimizing){ describe('optimizing '+optimizing, function(){
        var cacheAudit = {};
        var html = jsToHtml.html;
        before(function(){
            html.optimizingArrange = optimizing;
            html.auditArrange = function(que, donde){
                var attr = que+(donde?'!':'.');
                cacheAudit[attr] = (cacheAudit[attr] || 0) +  1
            }
        });
        after(function(){
            console.log(optimizing?'o':'i',cacheAudit);
        })
        describe('mutating DOM', function(){
            var layout
            beforeEach(function(){
                layout = document.getElementById('test-layout');
                if(layout){
                    layout.parentElement.removeChild(layout);
                }
                layout = document.createElement('div');
                document.body.appendChild(layout);
                layout.id='test-layout';
                layout.innerHTML="";
            })
            it('must create one element in layout',function(){
                arrange(layout, html.div({id:'one'}, 'the one'));
                var one = document.getElementById('one');
                expect(one).to.be.an(HTMLDivElement);
                expect(one.textContent).to.eql('the one');
                expect(alfaHTML(layout.innerHTML)).to.eql('<div id="one">the one</div>');
            })
            it('must create elements in layout',function(){
                arrange(layout, [html.div({id:'one'}, 'the one'), html.div({id:'two'}, 'the second')]);
                var one = document.getElementById('one');
                expect(one).to.be.an(HTMLDivElement);
                var two = document.getElementById('two');
                expect(two).to.be.an(HTMLDivElement);
                expect(two.textContent).to.eql('the second');
            })
            it('must create delete not mentioned',function(){
                arrange(layout, html.div({id:'one'}, 'the one'));
                arrange(layout, html.div({id:'two'}, 'the second'));
                var one = document.getElementById('one');
                expect(one).to.be(null);
                var two = document.getElementById('two');
                expect(two).to.be.an(HTMLDivElement);
                expect(two.textContent).to.eql('the second');
            })
            it('must change attributes of elements',function(){
                arrange(layout, html.div({id:'one', lang:'es'}, 'first'));
                var one = document.getElementById('one');
                arrange(layout, html.div({id:'one', title:'tit1'}, 'second'));
                var sameOne = document.getElementById('one');
                expect(one===sameOne).to.be.ok();
                expect(sameOne.lang).to.eql('es');
                expect(one.title).to.eql('tit1');
                expect(one.textContent).to.eql('second');
            })
            it('must use recursion',function(){
                arrange(layout, html.div({id:'one', lang:'es'}, [
                    html.label({id:'one.1', class:'class.1', $attrs:{attr1:1, attr2:3}}, "one"),
                    html.input({id:'one.2', value:'two'})
                ]));
                var one1 = document.getElementById('one.1');
                arrange(layout, html.div({id:'one', style:'display: none;', lang:'es'}, [
                    html.label({id:'one.1', class:'class.2', $attrs:{attr1:2, attr2:null}}, "ones"),
                    html.input({id:'one.2', value:'two'}),
                    html.span({id:'one.3'}, "warn"),
                ]));
                var sameOne1 = document.getElementById('one.1');
                var one2 = document.getElementById('one.2');
                expect(one1===sameOne1).to.be.ok();
                expect(one1.textContent).to.eql('ones');
                expect(one1.getAttribute('attr1')).to.eql('2');
                expect(one1.hasAttribute('attr2')).to.not.ok();
                expect(one1.className).to.eql('class.2');
                expect(one2.value).to.eql('two');
                expect(alfaHTML(layout.innerHTML)).to.eql('<div id="one" lang="es" style="display: none;"><label attr1="2" class="class.2" id="one.1">ones</label><input id="one.2"><span id="one.3">warn</span></div>');
            })
            it('must use recursion and accept positional elements',function(){
                arrange(layout, html.div({id:'one', lang:'es'}, [
                    html.label("zero"),
                    html.label({id:'one.1', $attrs:{attr1:1, attr2:3}}, "one"),
                    "text1",
                    html.input({value:'two'})
                ]));
                var one1 = document.getElementById('one.1');
                arrange(layout, html.div({id:'one', lang:'es', style:'display:none'}, [
                    html.label({class:'ZERO'}, "zero"),
                    html.label({id:'one.1', $attrs:{attr1:2, attr2:null}}, "ones"),
                    "text2",
                    html.input({value:'two', class:'TWO'}),
                    html.span({id:'one.3'}, "warn"),
                ]));
                var sameOne1 = document.getElementById('one.1');
                expect(one1===sameOne1).to.be.ok();
                expect(one1.textContent).to.eql('ones');
                expect(one1.getAttribute('attr1')).to.eql('2');
                expect(one1.hasAttribute('attr2')).to.not.ok();
                var one = document.getElementById('one');
                expect(alfaHTML(one.innerHTML)).to.eql('<label class="ZERO">zero</label><label attr1="2" id="one.1">ones</label>text2<input class="TWO"><span id="one.3">warn</span>')
                expect(one.childNodes[3].value).to.eql('two')
            });
            it("must work with svg v2", function(){
                this.timeout(9000);
                arrange(layout,html.svg({id:'svg1', class:'one', viewbox:"0 0 100 200"},[
                    html.path({id:'svg2', d:'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z'})
                ]));
                return bestGlobals.sleep(400).then(function(){
                    var svg = document.querySelector('#svg1');
                    // var svg = document.getElementsByTagNameNS("http://www.w3.org/2000/svg", 'svg')[0];
                    if(!esIE){
                        expect(svg.constructor.name).to.eql('SVGSVGElement');
                    }
                    // var path1 = svg.children[0];
                    var path1 = svg.getElementById('svg2');
                    if(!esIE){
                        expect(path1.constructor.name).to.eql('SVGPathElement');
                    }
                    expect(path1.id).to.eql('svg2');
                    var path1d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z';
                    if(!esIE){
                        expect(path1.getAttribute('d')).to.eql(path1d);
                    }else{
                        expect(path1.getAttribute('d').replace(/\s+/g,'')).to.eql(path1d.replace(/\s+/g,''));
                    }
                    arrange(layout,html.svg({id:'svg1', class:'one', viewbox:"0 0 100 200"},[
                        html.path({id:'svg2', d:'M19 13h-6v6h-2v-6Z'})
                    ]));
                    return bestGlobals.sleep(400).then(function(){
                        var svgL = layout.children[0]
                        expect(svgL==svg).to.ok();
                        var id2 = document.querySelector('#svg1');
                        var path2 = id2.getElementById('svg2');
                        expect(svg===id2).to.ok();
                        expect(path1===path2).to.ok();
                        path1d='M19 13h-6v6h-2v-6Z';
                        if(!esIE){
                            expect(path1.getAttribute('d')).to.eql(path1d);
                        }else{
                            expect(path1.getAttribute('d').replace(/\s+/g,'')).to.eql(path1d.replace(/\s+/g,''));
                        }
                        if(!esIE){
                            expect(svg.innerHTML).to.eql('<path id="svg2" d="M19 13h-6v6h-2v-6Z"></path>')
                            expect(path1.constructor.name).to.eql('SVGPathElement')
                        }
                    });
                });
            })
            it.skip('must change tagName of elements and change mutating objects',function(){
                var listOfElements = [
                    html._text('hello'),
                    html.div({id:'one', lang:'es'}, 'first'),
                    html.br()
                ]
                arrange(layout, listOfElements);
                var one = document.getElementById('one');
                listOfElements[1] = html.pre({id:'one', lang:'es'}, 'first');
                arrange(layout, listOfElements);
                var otherOne = document.getElementById('one');
                expect(alfaHTML(layout.innerHTML)).to.eql('hello<pre id="one" lang="es">first</pre><br>');
                expect(otherOne.tagName).to.eql('pre');
                expect(one!==otherOne).to.be.ok();
            })
        })
    })});
    describe('eventListeners', function(){
        var html = jsToHtml.html;;
        var div;
        var clickCount;
        beforeEach(function(){
            clickCount=0;
            div=html.div({id:'clickeable_div', $on:{click:function(){clickCount++}}});
        })
        it('must reject eventListener in txtToHtml', function(){
            expect(function(){
                div.toHtmlText();
            }).to.throwError(/listener can not be toHtmlTexted/);
        });
        it('must assign listeners once', function(){
            arrange(document.body, div);
            arrange(document.body, div);
            var element = document.getElementById('clickeable_div');
            element.click();
            expect(clickCount).to.eql(1);
        });
        it('must assign listeners once with clousures', function(){
            var xs=[{name:'one'},{name:'two'}];
            var z=0;
            var message;
            xs.forEach(function(x){
                var y=0;
                arrange(document.body, html.div({id:'other_clickeable_div', $on:{click:function(){
                    z++;
                    y++;
                    clickCount++;
                    message='counters '+x.name+':'+y+clickCount;
                }}}));
            })
            var element = document.getElementById('other_clickeable_div');
            element.click();
            expect(z).to.eql(1);
            expect(clickCount).to.eql(1);
            expect(message).to.eql('counters two:11');
        });
        it("can receive undefined $attrs an $on", function(){
            var $attrs;
            var $on;
            arrange(document.body, html.div({$attrs:$attrs, $on:$on}));
        })
    });
}