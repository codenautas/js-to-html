"use strict";
/*jshint eqnull:true */
/*jshint globalstrict:true */
/*jshint node:true */
(function codenautasModuleDefinition(root, name, factory) {
    /* global define */
    /* global globalModuleName */
    /* istanbul ignore next */
    if(typeof root.globalModuleName !== 'string'){
        root.globalModuleName = name;
    }
    /* istanbul ignore next */
    if(typeof exports === 'object' && typeof module === 'object'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else if(typeof exports === 'object'){
        exports[root.globalModuleName] = factory();
    }else{
        root[root.globalModuleName] = factory();
    }
    root.globalModuleName = null;
})(/*jshint -W040 */this, 'jsToHtml', function() {
/*jshint +W040 */

/*jshint -W004 */
var jsToHtml = {};
/*jshint +W004 */

/* global document */

function isPlainObject(x){
    return typeof x==="object" && x && x.constructor === Object;
}

function spaces(n){
    return new Array(n+1).join(' ');
}

var htmlReservedSymbols={
    '&' :'&amp;',
    '<' :'&lt;',
    '>' :'&gt;',
    "'" :'&#39;',
    '"' :'&quot;'
};

jsToHtml.html={
    mandatoryTitle:true
};

function escapeChar(simpleText){
    simpleText=''+simpleText;
    return /[&<>'"]/.test(simpleText)?simpleText.replace(/[&<>'"]/g,function(c){ return htmlReservedSymbols[c]; }):simpleText;
}

jsToHtml.couldDirectTextContent=function couldDirectTextContent(x){
    return typeof x==="string" || typeof x==="number";
};

function identity(x){ return x; }

var validDirectProperties={
    textNode:{
        className:'HtmlTextNode',
        properties:{
            textNode:{
                checks:[
                    {check:function(x){ return x!=null;}, text:"textNodes must not contains null"}, 
                    {check:jsToHtml.couldDirectTextContent, text:"must be string or number"}
                ], 
                transform:function(x){ return typeof x==="string" || x==null?x:''+x; }
            }
        }
    },
    tagName:{
        className:'Html',
        properties:{
            tagName:   {checks:[
                {check:function(x){ return typeof x==="string"; }, text:"must be a string"},
                {check:function(x){
                    if(!jsToHtml.htmlTags[x]){ 
                        throw new Error("jsToHtml.Html error: directObject tagName "+x+" not exists");
                    } 
                    return true;
                }}  
            ]},
            attributes:{checks:[
                {check:function(attributes){ return isPlainObject(attributes); }, text:"must be a plain Object"},
                {check:function(attributes){
                    /*jshint forin:false */
                    for(var attrName in attributes){
                        /*jshint forin:true */
                        var attrValue=attributes[attrName];
                        if(attrValue==null){
                            throw new Error('js-to-html: attributes must not contain null value');
                        }
                        if((attrName in jsToHtml.htmlAttrs) && (jsToHtml.htmlAttrs[attrName].rejectSpaces)){
                            var pattWhiteSpaces=new RegExp( "\\s");
                            if(pattWhiteSpaces.test(attrValue)){   
                                throw new Error('js-to-html: ' + attrName + 'class attribute could not contain spaces. Use classList attribute.');
                            }
                            if(attrValue instanceof Array){
                                attrValue = attrValue.join('');
                            }
                        }
                    }
                    return true;
                }},
                {check:function(attributes, o){  
                    /*jshint forin:false */
                    for(var attrName in attributes){
                        /*jshint forin:true */
                        var htmlName = (jsToHtml.htmlAttrs[attrName]||{}).synonym||attrName;
                        var attrInfo=jsToHtml.htmlAttributes[htmlName];
                        if(/-/.test(htmlName)){
                        }else if(!attrInfo){
                            throw new Error("inexistent attribute");
                        }else{
                            if(!attrInfo[o.tagName] && !attrInfo["HTML elements"]){
                                throw new Error("attribute does not match with tagName");
                            }
                        }
                    }
                    return true;
                }},
            ]},
            content:{checks:[
                {check:function(x){ return typeof x==="object" && x instanceof Array; }, text:"must be an Array"},
                {check:function(x,o){ return !jsToHtml.htmlTags[o.tagName]["void"] || !x.length; }, text:"void elements must not have content"},
            ]},
        }
    },
    htmlCode:{
        className:'HtmlDirectNode',
        properties:{
            htmlCode:{
                checks:[
                    {check:function(x){ return x!=null;}, text:"htmlCode must not contains null"}, 
                    {check:function(x){ return typeof x == "string"; }, text:"htmlCode must be a string"},
                    {check:function(){ return jsToHtml.html.insecureModeEnabled; }, text:"insecure functions not allowed"},
                    {check:function(x,o){ return o.validator(x); }, text:"invalid htmlCode"},
                ]
            },
            validator:{
                checks:[
                    {check:function(x){ return x instanceof Function; }, text: "validator must be a function"}
                ]
            }
        },
    },
    commentText:{
        className:'HtmlComment',
        properties:{
            commentText:{
                checks:[
                    {check:function(x){ return typeof x == "string"; }, text:"commentText must be a string"},
                    {check:function(x){ return !/-->/.test(x);}, text:"invalid text in comment"}
                ]
            }
        },
    }
};

function HtmlBase(directObject, validProperties){
    /*jshint forin:false */
    for(var property in validProperties){
        /*jshint forin:true */
        var propertyDef=validProperties[property];
        var value=(propertyDef.transform||identity)(directObject[property]);
        if(!(property in directObject)){
            throw new Error('jsToHtml.Html error: directObject must include '+property);
        }
        for(var c=0; c<propertyDef.checks.length; c++){
            var check=propertyDef.checks[c];
            if(!check.check(value, directObject)){
                throw new Error('jsToHtml.Html error: directObject '+property+' '+check.text);
            }
        }
        this[property]=value;
    }
    /*jshint forin:false */
    for(property in directObject){
        /*jshint forin:true */
        if(!(property in validProperties)){
            throw new Error('jsToHtml.Html error: directObject not recognized '+property+' property');
        }
    }
}

jsToHtml.Html=function Html(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.tagName.properties);
};
jsToHtml.Html.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlTextNode=function HtmlTextNode(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.textNode.properties);
};
jsToHtml.HtmlTextNode.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlDirectNode=function HtmlDirectNode(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.htmlCode.properties);
};
jsToHtml.HtmlDirectNode.prototype = Object.create(HtmlBase.prototype);

jsToHtml.HtmlComment=function HtmlComment(directObject){
    HtmlBase.call(this, directObject, validDirectProperties.commentText.properties);
};
jsToHtml.HtmlComment.prototype = Object.create(HtmlBase.prototype);

HtmlBase.prototype.attributesToHtmlText=function attributesToHtmlText(){
    var pattNonWordChar=new RegExp(/\W/);
    return Object.keys(this.attributes).map(function(attrName){
        var attrVal=this.attributes[attrName];
        var textAttrVal=attrVal;
        var attrDefinition=jsToHtml.htmlAttrs[attrName] || {};
        if(attrDefinition.synonym){
            attrName=attrDefinition.synonym;
            attrDefinition=jsToHtml.htmlAttrs[attrName];
        }
        if(attrDefinition.listType && typeof attrVal!=="string"){
            textAttrVal=attrVal.join(' ');
        } 
        var escapedAttrVal=escapeChar(textAttrVal);
        var quotingAttrVal=textAttrVal===''||pattNonWordChar.test(textAttrVal)?'\''+escapedAttrVal+'\'':escapedAttrVal;
        return ' '+attrName+'='+quotingAttrVal;
    },this).join('');
};

HtmlBase.prototype.contentToHtmlText=function contentToHtmlText(opts,recurseOpts){
    return this.content.map(function(node){
        return node.toHtmlText(opts,{margin:recurseOpts.margin+2});
    }).join('');
};

HtmlBase.prototype.toHtmlDoc=function toHtmlDoc(opts,recurseOpts){
    opts = opts||{};
    var html = jsToHtml.html;
    var target=this;
    if(!opts.incomplete){
        var source=this;
        var head;
        if(source.tagName==='html'){
            target=source;
        }else{
            target=html.html([source]);
        }
        if(!target.content.length){
            target.content.push(html.body());
        }
        if(target.content[0].tagName==='head'){
            head=target.content[0];
        }else{
            head=html.head();
            target.content.unshift(head);
        }
        if(target.content[1].tagName!=='body'){
            target.content.shift();
            // var body=html.body([target.content[0]]);
            var body=html.body(target.content);
            target.content=[head, body];
        }
        var titles=head.content.filter(function(element){
            return element.tagName==='title';
        });
        if(titles.length>1){
            throw new Error("toHtmlDoc ERROR: multiple title");
        }else if(titles.length==1){
            if(opts.title){
                throw new Error("toHtmlDoc ERROR: double title");
            }
        }else{
            var titleText = opts.title||html.defaultTitle;
            if(titleText){
                head.content.unshift(html.title(titleText));
            }else if(jsToHtml.html.mandatoryTitle){
                throw new Error("toHtmlDoc ERROR: missing mandatory title");
            }
        }
    }
    return '<!doctype html>\n'+target.toHtmlText(opts,recurseOpts);
};
/* istanbul ignore next */
HtmlBase.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    throw new Error('must implement toHtmlText');
};

jsToHtml.Html.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    opts=opts||{};
    recurseOpts=recurseOpts||{};
    recurseOpts.margin=recurseOpts.margin||0;
    var tagInfo=jsToHtml.htmlTags[this.tagName];
    var tagInfoFirstChild=jsToHtml.htmlTags[(this.content[0]||{}).tagName]||{};
    var isvoidTag=tagInfo["void"]||false;
    var inlineBlock=((tagInfo.display||'inline')==='inline');
    var firstChildInline=(tagInfoFirstChild.display||'inline')!=='inline';
    var nl=(opts.pretty && !inlineBlock?'\n':'');
    var sp=(opts.pretty && !inlineBlock?spaces:function(){return ''; });
    return sp(recurseOpts.margin)+"<"+
        this.tagName+
        this.attributesToHtmlText()+
        ">"+(firstChildInline?nl:'')+
        this.contentToHtmlText(opts,recurseOpts)+
        (firstChildInline?sp(recurseOpts.margin):'')+
        (isvoidTag?'':"</"+this.tagName+">")+nl;

};

jsToHtml.HtmlTextNode.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return escapeChar(this.textNode);
};

jsToHtml.HtmlDirectNode.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return this.htmlCode;
};

jsToHtml.HtmlComment.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){
    return "<!--"+this.commentText+"-->";
};

jsToHtml.direct=function direct(directObject){
    for(var mainAttr in validDirectProperties){
        if(mainAttr in directObject){
            return new jsToHtml[validDirectProperties[mainAttr].className](directObject);
        }
    }
    throw new Error('js-to-html.direct error: invalid arguments to direct function');
};

jsToHtml.indirect=function indirect(tagName,contentOrAttributes,contentIfThereAreAttributes){
    var thereAreAttributes=isPlainObject(contentOrAttributes);
    if(!thereAreAttributes && contentOrAttributes instanceof Object && !(contentOrAttributes instanceof Array)){
        throw new Error('jsToHtml.'+tagName+' expects plain object of attributes or array of content');
    }
    var attributes = thereAreAttributes?contentOrAttributes:{};
    var content    = thereAreAttributes?contentIfThereAreAttributes:contentOrAttributes;
    if(!thereAreAttributes && (arguments.length>3 || contentIfThereAreAttributes != null)){
        throw new Error('jsToHtml.'+tagName+' ERROR: the first parameter is not an attribute object then must there no be a second parameter');
    }
    return jsToHtml.direct({
        tagName:tagName,
        attributes:attributes,
        content:(content instanceof Array?content:[content]).filter(function(element){
            return element!==null && element!==undefined;
        }).map(function(element){
            return jsToHtml.couldDirectTextContent(element)?jsToHtml.direct({textNode:element}):element;
        })
    });
};

jsToHtml.htmlAttrs={
    "class"        :{ domName:'className', listType:'classList', rejectSpaces:true},
    "for"          :{ domName:'htmlFor'  },
    classList      :{ synonym:'class' },
    className      :{ synonym:'class' },
    htmlFor        :{ synonym:'for' }
};


// https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements
jsToHtml.htmlTags={
    "a"            :{type:'HTML4', description:"Defines a hyperlink"},
    "abbr"         :{type:'HTML4', description:"Defines an abbreviation"},
    "acronym"      :{type:'HTML4', description:"Not supported in HTML5. Defines an acronym"},
    "address"      :{type:'HTML4', description:"Defines contact information for the author/owner of a document"},
    "applet"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines an embedded applet"},
    "area"         :{type:'HTML4', "void":true, description:"Defines an area inside an image-map"},
    "article"      :{type:'HTML5', description:"Defines an article"},
    "aside"        :{type:'HTML5', description:"Defines content aside from the page content"},
    "audio"        :{type:'HTML5', description:"Defines sound content"},
    "b"            :{type:'HTML4', description:"Defines bold text"},
    "base"         :{type:'HTML4', "void":true, description:"Specifies the base URL/target for all relative URLs in a document"},
    "basefont"     :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Specifies a default color, size, and font for all text in a document"},
    "bdi"          :{type:'HTML5', description:"Isolates a part of text that might be formatted in a different direction from other text outside it"},
    "bdo"          :{type:'HTML4', description:"Overrides the current text direction"},
    "big"          :{type:'HTML4', description:"Not supported in HTML5. Defines big text"},
    "blockquote"   :{type:'HTML4', description:"Defines a section that is quoted from another source"},
    "body"         :{type:'HTML4', description:"Defines the document's body"},
    "br"           :{type:'HTML4', "void":true, description:"Defines a single line break"},
    "button"       :{type:'HTML4', description:"Defines a clickable button"},
    "canvas"       :{type:'HTML5', description:"Used to draw graphics, on the fly, via scripting (usually JavaScript)"},
    "caption"      :{type:'HTML4', display:'not-inline', description:"Defines a table caption"},
    "center"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines centered text"},
    "cite"         :{type:'HTML4', description:"Defines the title of a work"},
    "code"         :{type:'HTML4', description:"Defines a piece of computer code"},
    "col"          :{type:'HTML4', display:'not-inline', "void":true, description:"Specifies column properties for each column within a <colgroup> element "},
    "colgroup"     :{type:'HTML4', display:'not-inline', description:"Specifies a group of one or more columns in a table for formatting"},
    "command"      :{type:'HTML5', "void":true, description:"Defines a command button that a user can invoke"},
    "datalist"     :{type:'HTML5', description:"Specifies a list of pre-defined options for input controls"},
    "dd"           :{type:'HTML4', description:"Defines a description of an item in a definition list"},
    "del"          :{type:'HTML4', description:"Defines text that has been deleted from a document"},
    "details"      :{type:'HTML5', description:"Defines additional details that the user can view or hide"},
    "dfn"          :{type:'HTML4', description:"Defines a definition term"},
    "dialog"       :{type:'HTML5', description:"Defines a dialog box or window"},
    "dir"          :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines a directory list"},
    "div"          :{type:'HTML4', display:'block', description:"Defines a section in a document"},
    "dl"           :{type:'HTML4', description:"Defines a definition list"},
    "dt"           :{type:'HTML4', description:"Defines a term (an item) in a definition list"},
    "em"           :{type:'HTML4', description:"Defines emphasized text "},
    "embed"        :{type:'HTML5', "void":true, description:"Defines a container for an external (non-HTML) application"},
    "fieldset"     :{type:'HTML4', description:"Groups related elements in a form"},
    "figcaption"   :{type:'HTML5', description:"Defines a caption for a <figure> element"},
    "figure"       :{type:'HTML5', description:"Specifies self-contained content"},
    "font"         :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines font, color, and size for text"},
    "footer"       :{type:'HTML5', description:"Defines a footer for a document or section"},
    "form"         :{type:'HTML4', description:"Defines an HTML form for user input"},
    "frame"        :{type:'HTML4', description:"Not supported in HTML5. Defines a window (a frame) in a frameset"},
    "frameset"     :{type:'HTML4', description:"Not supported in HTML5. Defines a set of frames"},
    "h1"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 1"},
    "h2"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 2"},
    "h3"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 3"},
    "h4"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 4"},
    "h5"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 5"},
    "h6"           :{type:'HTML4', display:'block', description:" Defines HTML headings level 6"},
    "head"         :{type:'HTML4', description:"Defines information about the document"},
    "header"       :{type:'HTML5', description:"Defines a header for a document or section"},
    "hgroup"       :{type:'HTML5', description:"Groups heading ( <h1> to <h6>) elements"},
    "hr"           :{type:'HTML4', "void":true, description:" Defines a thematic change in the content"},
    "html"         :{type:'HTML4', description:"Defines the root of an HTML document"},
    "i"            :{type:'HTML4', description:"Defines a part of text in an alternate voice or mood"},
    "iframe"       :{type:'HTML4', description:"Defines an inline frame"},
    "img"          :{type:'HTML4', "void":true, description:"Defines an image"},
    "input"        :{type:'HTML4', "void":true, description:"Defines an input control"},
    "ins"          :{type:'HTML4', description:"Defines a text that has been inserted into a document"},
    "kbd"          :{type:'HTML4', description:"Defines keyboard input"},
    "keygen"       :{type:'HTML5', description:"Defines a key-pair generator field (for forms)"},
    "label"        :{type:'HTML4', description:"Defines a label for an <input> element"},
    "legend"       :{type:'HTML4', description:"Defines a caption for a <fieldset>, <figure>, or <details> element"},
    "li"           :{type:'HTML4', description:"Defines a list item"},
    "link"         :{type:'HTML4', "void":true, description:"Defines the relationship between a document and an external resource (most used to link to style sheets)"},
    "map"          :{type:'HTML4', description:"Defines a client-side image-map"},
    "mark"         :{type:'HTML5', description:"Defines marked/highlighted text"},
    "menu"         :{type:'HTML4', description:"Defines a list/menu of commands"},
    "meta"         :{type:'HTML4', "void":true, description:"Defines metadata about an HTML document"},
    "meter"        :{type:'HTML5', description:"Defines a scalar measurement within a known range (a gauge)"},
    "nav"          :{type:'HTML5', description:"Defines navigation links"},
    "noframes"     :{type:'HTML4', description:"Not supported in HTML5. Defines an alternate content for users that do not support frames"},
    "noscript"     :{type:'HTML4', description:"Defines an alternate content for users that do not support client-side scripts"},
    "object"       :{type:'HTML4', description:"Defines an embedded object"},
    "ol"           :{type:'HTML4', description:"Defines an ordered list"},
    "optgroup"     :{type:'HTML4', description:"Defines a group of related options in a drop-down list"},
    "option"       :{type:'HTML4', description:"Defines an option in a drop-down list"},
    "output"       :{type:'HTML5', description:"Defines the result of a calculation"},
    "p"            :{type:'HTML4', display:'block', description:"Defines a paragraph"},
    "param"        :{type:'HTML4', "void":true, description:"Defines a parameter for an object"},
    "pre"          :{type:'HTML4', description:"Defines preformatted text"},
    "progress"     :{type:'HTML5', description:"Represents the progress of a task"},
    "q"            :{type:'HTML4', description:"Defines a short quotation"},
    "rp"           :{type:'HTML5', description:"Defines what to show in browsers that do not support ruby annotations"},
    "rt"           :{type:'HTML5', description:"Defines an explanation/pronunciation of characters (for East Asian typography)"},
    "ruby"         :{type:'HTML5', description:"Defines a ruby annotation (for East Asian typography)"},
    "s"            :{type:'HTML4', description:"Defines text that is no longer correct"},
    "samp"         :{type:'HTML4', description:"Defines sample output from a computer program"},
    "script"       :{type:'HTML4', description:"Defines a client-side script"},
    "section"      :{type:'HTML5', description:"Defines a section in a document"},
    "select"       :{type:'HTML4', description:"Defines a drop-down list"},
    "small"        :{type:'HTML4', description:"Defines smaller text"},
    "source"       :{type:'HTML5', "void":true, description:"Defines multiple media resources for media elements (<video> and <audio>)"},
    "span"         :{type:'HTML4', description:"Defines a section in a document"},
    "strike"       :{type:'HTML4', description:"Not supported in HTML5. Deprecated in HTML 4.01. Defines strikethrough text"},
    "strong"       :{type:'HTML4', description:"Defines important text"},
    "style"        :{type:'HTML4', description:"Defines style information for a document"},
    "sub"          :{type:'HTML4', description:"Defines subscripted text"},
    "summary"      :{type:'HTML5', description:"Defines a visible heading for a <details> element"},
    "sup"          :{type:'HTML4', description:"Defines superscripted text"},
    "table"        :{type:'HTML4', display:'not-inline', description:"Defines a table"},
    "tbody"        :{type:'HTML4', display:'not-inline', description:"Groups the body content in a table"},
    "td"           :{type:'HTML4', display:'not-inline', description:"Defines a cell in a table"},
    "textarea"     :{type:'HTML4', description:"Defines a multiline input control (text area)"},
    "tfoot"        :{type:'HTML4', display:'not-inline', description:"Groups the footer content in a table"},
    "th"           :{type:'HTML4', display:'not-inline', description:"Defines a header cell in a table"},
    "thead"        :{type:'HTML4', display:'not-inline', description:"Groups the header content in a table"},
    "time"         :{type:'HTML5', description:"Defines a date/time"},
    "title"        :{type:'HTML4', description:"Defines a title for the document"},
    "tr"           :{type:'HTML4', display:'not-inline', description:"Defines a row in a table"},
    "track"        :{type:'HTML5', description:"Defines text tracks for media elements (<video> and <audio>)"},
    "tt"           :{type:'HTML4', description:"Not supported in HTML5. Defines teletype text"},
    "u"            :{type:'HTML4', description:"Defines text that should be stylistically different from normal text"},
    "ul"           :{type:'HTML4', description:"Defines an unordered list"},
    "var"          :{type:'HTML4', description:"Defines a variable"},
    "video"        :{type:'HTML5', description:"Defines a video or movie"},
    "wbr"          :{type:'HTML5', description:"Defines a possible line-break"}
};

//
// generated by generators/attributes.js
jsToHtml.htmlAttributes={
    "abbr": {
        "th": {"description": "Alternative label to use for the header cell when referencing the cell in other contexts","value": "Text*"}
    },
    "accept": {
        "input": {"description": "Hint for expected file type in file upload controls","value": "Set of comma-separated tokens* consisting of valid MIME types with no parameters or audio/*, video/*, or image/*"}
    },
    "accept-charset": {
        "form": {"description": "Character encodings to use for form submission","value": "Ordered set of unique space-separated tokens, ASCII case-insensitive, consisting of labels of ASCII-compatible encodings*"}
    },
    "accesskey": {
        "HTML elements": {"description": "Keyboard shortcut to activate or focus element","value": "Ordered set of unique space-separated tokens, case-sensitive, consisting of one Unicode code point in length"}
    },
    "action": {
        "form": {"description": "URL to use for form submission","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "allowfullscreen": {
        "iframe": {"description": "Whether to allow the iframe's contents to use requestFullscreen()","value": "Boolean attribute"}
    },
    "alt": {
        "area": {"description": "Replacement text for use when images are not available","value": "Text*"},
        "img": {"description": "Replacement text for use when images are not available","value": "Text*"},
        "input": {"description": "Replacement text for use when images are not available","value": "Text*"}
    },
    "async": {
        "script": {"description": "Execute script when available, without blocking","value": "Boolean attribute"}
    },
    "autocomplete": {
        "form": {"description": "Default setting for autofill feature for controls in the form","value": "\"on\"; \"off\""},
        "input": {"description": "Hint for form autofill feature","value": "Autofill field name and related tokens*"},
        "select": {"description": "Hint for form autofill feature","value": "Autofill field name and related tokens*"},
        "textarea": {"description": "Hint for form autofill feature","value": "Autofill field name and related tokens*"}
    },
    "autofocus": {
        "button": {"description": "Automatically focus the form control when the page is loaded","value": "Boolean attribute"},
        "input": {"description": "Automatically focus the form control when the page is loaded","value": "Boolean attribute"},
        "keygen": {"description": "Automatically focus the form control when the page is loaded","value": "Boolean attribute"},
        "select": {"description": "Automatically focus the form control when the page is loaded","value": "Boolean attribute"},
        "textarea": {"description": "Automatically focus the form control when the page is loaded","value": "Boolean attribute"}
    },
    "autoplay": {
        "audio": {"description": "Hint that the media resource can be started automatically when the page is loaded","value": "Boolean attribute"},
        "video": {"description": "Hint that the media resource can be started automatically when the page is loaded","value": "Boolean attribute"}
    },
    "challenge": {
        "keygen": {"description": "String to package with the generated and signed public key","value": "Text"}
    },
    "charset": {
        "meta": {"description": "Character encoding declaration","value": "Encoding label*"},
        "script": {"description": "Character encoding of the external script resource","value": "Encoding label*"}
    },
    "checked": {
        "menuitem": {"description": "Whether the command or control is checked","value": "Boolean attribute"},
        "input": {"description": "Whether the command or control is checked","value": "Boolean attribute"}
    },
    "cite": {
        "blockquote": {"description": "Link to the source of the quotation or more information about the edit","value": "Valid URL potentially surrounded by spaces"},
        "del": {"description": "Link to the source of the quotation or more information about the edit","value": "Valid URL potentially surrounded by spaces"},
        "ins": {"description": "Link to the source of the quotation or more information about the edit","value": "Valid URL potentially surrounded by spaces"},
        "q": {"description": "Link to the source of the quotation or more information about the edit","value": "Valid URL potentially surrounded by spaces"}
    },
    "class": {
        "HTML elements": {"description": "Classes to which the element belongs","value": "Set of space-separated tokens"}
    },
    "cols": {
        "textarea": {"description": "Maximum number of characters per line","value": "Valid non-negative integer greater than zero"}
    },
    "colspan": {
        "td": {"description": "Number of columns that the cell is to span","value": "Valid non-negative integer greater than zero"},
        "th": {"description": "Number of columns that the cell is to span","value": "Valid non-negative integer greater than zero"}
    },
    "content": {
        "meta": {"description": "Value of the element","value": "Text*"}
    },
    "contenteditable": {
        "HTML elements": {"description": "Whether the element is editable","value": "\"true\"; \"false\""}
    },
    "contextmenu": {
        "HTML elements": {"description": "The element's context menu","value": "ID*"}
    },
    "controls": {
        "audio": {"description": "Show user agent controls","value": "Boolean attribute"},
        "video": {"description": "Show user agent controls","value": "Boolean attribute"}
    },
    "coords": {
        "area": {"description": "Coordinates for the shape to be created in an image map","value": "Valid list of integers*"}
    },
    "crossorigin": {
        "audio": {"description": "How the element handles crossorigin requests","value": "\"anonymous\"; \"use-credentials\""},
        "img": {"description": "How the element handles crossorigin requests","value": "\"anonymous\"; \"use-credentials\""},
        "link": {"description": "How the element handles crossorigin requests","value": "\"anonymous\"; \"use-credentials\""},
        "script": {"description": "How the element handles crossorigin requests","value": "\"anonymous\"; \"use-credentials\""},
        "video": {"description": "How the element handles crossorigin requests","value": "\"anonymous\"; \"use-credentials\""}
    },
    "data": {
        "object": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "datetime": {
        "del": {"description": "Date and (optionally) time of the change","value": "Valid date string with optional time"},
        "ins": {"description": "Date and (optionally) time of the change","value": "Valid date string with optional time"},
        "time": {"description": "Machine-readable value","value": "Valid month string, valid date string, valid yearless date string, valid time string, valid local date and time string, valid time-zone offset string, valid global date and time string, valid week string, valid non-negative integer, or valid duration string"}
    },
    "default": {
        "menuitem": {"description": "Mark the command as being a default command","value": "Boolean attribute"},
        "track": {"description": "Enable the track if no other text track is more suitable","value": "Boolean attribute"}
    },
    "defer": {
        "script": {"description": "Defer script execution","value": "Boolean attribute"}
    },
    "dir": {
        "HTML elements": {"description": "The text directionality of the element","value": "\"ltr\"; \"rtl\"; \"auto\""},
        "bdo": {"description": "The text directionality of the element","value": "\"ltr\"; \"rtl\""}
    },
    "dirname": {
        "input": {"description": "Name of form field to use for sending the element's directionality in form submission","value": "Text*"},
        "textarea": {"description": "Name of form field to use for sending the element's directionality in form submission","value": "Text*"}
    },
    "disabled": {
        "button": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "menuitem": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "fieldset": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "input": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "keygen": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "optgroup": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "option": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "select": {"description": "Whether the form control is disabled","value": "Boolean attribute"},
        "textarea": {"description": "Whether the form control is disabled","value": "Boolean attribute"}
    },
    "download": {
        "a": {"description": "Whether to download the resource instead of navigating to it, and its file name if so","value": "Text"},
        "area": {"description": "Whether to download the resource instead of navigating to it, and its file name if so","value": "Text"}
    },
    "draggable": {
        "HTML elements": {"description": "Whether the element is draggable","value": "\"true\"; \"false\""}
    },
    "dropzone": {
        "HTML elements": {"description": "Accepted item types for drag-and-drop","value": "Unordered set of unique space-separated tokens, ASCII case-insensitive, consisting of accepted types and drag feedback*"}
    },
    "enctype": {
        "form": {"description": "Form data set encoding type to use for form submission","value": "\"application/x-www-form-urlencoded\"; \"multipart/form-data\"; \"text/plain\""}
    },
    "for": {
        "label": {"description": "Associate the label with form control","value": "ID*"},
        "output": {"description": "Specifies controls from which the output was calculated","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of IDs*"}
    },
    "form": {
        "button": {"description": "Associates the control with a form element","value": "ID*"},
        "fieldset": {"description": "Associates the control with a form element","value": "ID*"},
        "input": {"description": "Associates the control with a form element","value": "ID*"},
        "keygen": {"description": "Associates the control with a form element","value": "ID*"},
        "label": {"description": "Associates the control with a form element","value": "ID*"},
        "object": {"description": "Associates the control with a form element","value": "ID*"},
        "output": {"description": "Associates the control with a form element","value": "ID*"},
        "select": {"description": "Associates the control with a form element","value": "ID*"},
        "textarea": {"description": "Associates the control with a form element","value": "ID*"}
    },
    "formaction": {
        "button": {"description": "URL to use for form submission","value": "Valid non-empty URL potentially surrounded by spaces"},
        "input": {"description": "URL to use for form submission","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "formenctype": {
        "button": {"description": "Form data set encoding type to use for form submission","value": "\"application/x-www-form-urlencoded\"; \"multipart/form-data\"; \"text/plain\""},
        "input": {"description": "Form data set encoding type to use for form submission","value": "\"application/x-www-form-urlencoded\"; \"multipart/form-data\"; \"text/plain\""}
    },
    "formmethod": {
        "button": {"description": "HTTP method to use for form submission","value": "\"GET\"; \"POST\""},
        "input": {"description": "HTTP method to use for form submission","value": "\"GET\"; \"POST\""}
    },
    "formnovalidate": {
        "button": {"description": "Bypass form control validation for form submission","value": "Boolean attribute"},
        "input": {"description": "Bypass form control validation for form submission","value": "Boolean attribute"}
    },
    "formtarget": {
        "button": {"description": "Browsing context for form submission","value": "Valid browsing context name or keyword"},
        "input": {"description": "Browsing context for form submission","value": "Valid browsing context name or keyword"}
    },
    "headers": {
        "td": {"description": "The header cells for this cell","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of IDs*"},
        "th": {"description": "The header cells for this cell","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of IDs*"}
    },
    "height": {
        "canvas": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "embed": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "iframe": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "img": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "input": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "object": {"description": "Vertical dimension","value": "Valid non-negative integer"},
        "video": {"description": "Vertical dimension","value": "Valid non-negative integer"}
    },
    "hidden": {
        "HTML elements": {"description": "Whether the element is relevant","value": "Boolean attribute"}
    },
    "high": {
        "meter": {"description": "Low limit of high range","value": "Valid floating-point number*"}
    },
    "href": {
        "a": {"description": "Address of the hyperlink","value": "Valid URL potentially surrounded by spaces"},
        "area": {"description": "Address of the hyperlink","value": "Valid URL potentially surrounded by spaces"},
        "link": {"description": "Address of the hyperlink","value": "Valid non-empty URL potentially surrounded by spaces"},
        "base": {"description": "Document base URL","value": "Valid URL potentially surrounded by spaces"}
    },
    "hreflang": {
        "a": {"description": "Language of the linked resource","value": "Valid BCP 47 language tag"},
        "link": {"description": "Language of the linked resource","value": "Valid BCP 47 language tag"}
    },
    "http-equiv": {
        "meta": {"description": "Pragma directive","value": "Text*"}
    },
    "icon": {
        "menuitem": {"description": "Icon for the command","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "id": {
        "HTML elements": {"description": "The element's ID","value": "Text*"}
    },
    "inputmode": {
        "input": {"description": "Hint for selecting an input modality","value": "\"verbatim\"; \"latin\"; \"latin-name\"; \"latin-prose\"; \"full-width-latin\"; \"kana\"; \"kana-name\"; \"katakana\"; \"numeric\"; \"tel\"; \"email\"; \"url\""},
        "textarea": {"description": "Hint for selecting an input modality","value": "\"verbatim\"; \"latin\"; \"latin-name\"; \"latin-prose\"; \"full-width-latin\"; \"kana\"; \"kana-name\"; \"katakana\"; \"numeric\"; \"tel\"; \"email\"; \"url\""}
    },
    "ismap": {
        "img": {"description": "Whether the image is a server-side image map","value": "Boolean attribute"}
    },
    "itemid": {
        "HTML elements": {"description": "Global identifier for a microdata item","value": "Valid URL potentially surrounded by spaces"}
    },
    "itemprop": {
        "HTML elements": {"description": "Property names of a microdata item","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of valid absolute URLs, defined property names, or text*"}
    },
    "itemref": {
        "HTML elements": {"description": "Referenced elements","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of IDs*"}
    },
    "itemscope": {
        "HTML elements": {"description": "Introduces a microdata item","value": "Boolean attribute"}
    },
    "itemtype": {
        "HTML elements": {"description": "Item types of a microdata item","value": "Unordered set of unique space-separated tokens, case-sensitive, consisting of valid absolute URL*"}
    },
    "keytype": {
        "keygen": {"description": "The type of cryptographic key to generate","value": "Text*"}
    },
    "kind": {
        "track": {"description": "The type of text track","value": "\"subtitles\"; \"captions\"; \"descriptions\"; \"chapters\"; \"metadata\""}
    },
    "label": {
        "menuitem": {"description": "User-visible label","value": "Text"},
        "menu": {"description": "User-visible label","value": "Text"},
        "optgroup": {"description": "User-visible label","value": "Text"},
        "option": {"description": "User-visible label","value": "Text"},
        "track": {"description": "User-visible label","value": "Text"}
    },
    "lang": {
        "HTML elements": {"description": "Language of the element","value": "Valid BCP 47 language tag or the empty string"}
    },
    "list": {
        "input": {"description": "List of autocomplete options","value": "ID*"}
    },
    "loop": {
        "audio": {"description": "Whether to loop the media resource","value": "Boolean attribute"},
        "video": {"description": "Whether to loop the media resource","value": "Boolean attribute"}
    },
    "low": {
        "meter": {"description": "High limit of low range","value": "Valid floating-point number*"}
    },
    "manifest": {
        "html": {"description": "Application cache manifest","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "max": {
        "input": {"description": "Maximum value","value": "Varies*"},
        "meter": {"description": "Upper bound of range","value": "Valid floating-point number*"},
        "progress": {"description": "Upper bound of range","value": "Valid floating-point number*"}
    },
    "maxlength": {
        "input": {"description": "Maximum length of value","value": "Valid non-negative integer"},
        "textarea": {"description": "Maximum length of value","value": "Valid non-negative integer"}
    },
    "media": {
        "link": {"description": "Applicable media","value": "Valid media query list"},
        "style": {"description": "Applicable media","value": "Valid media query list"}
    },
    "mediagroup": {
        "audio": {"description": "Groups media elements together with an implicit MediaController","value": "Text"},
        "video": {"description": "Groups media elements together with an implicit MediaController","value": "Text"}
    },
    "menu": {
        "button": {"description": "Specifies the element's designated pop-up menu","value": "ID*"}
    },
    "method": {
        "form": {"description": "HTTP method to use for form submission","value": "\"GET\"; \"POST\"; \"dialog\""}
    },
    "min": {
        "input": {"description": "Minimum value","value": "Varies*"},
        "meter": {"description": "Lower bound of range","value": "Valid floating-point number*"}
    },
    "minlength": {
        "input": {"description": "Minimum length of value","value": "Valid non-negative integer"},
        "textarea": {"description": "Minimum length of value","value": "Valid non-negative integer"}
    },
    "multiple": {
        "input": {"description": "Whether to allow multiple values","value": "Boolean attribute"},
        "select": {"description": "Whether to allow multiple values","value": "Boolean attribute"}
    },
    "muted": {
        "audio": {"description": "Whether to mute the media resource by default","value": "Boolean attribute"},
        "video": {"description": "Whether to mute the media resource by default","value": "Boolean attribute"}
    },
    "name": {
        "button": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "fieldset": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "input": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "keygen": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "output": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "select": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "textarea": {"description": "Name of form control to use for form submission and in the form.elements API","value": "Text*"},
        "form": {"description": "Name of form to use in the document.forms API","value": "Text*"},
        "iframe": {"description": "Name of nested browsing context","value": "Valid browsing context name or keyword"},
        "object": {"description": "Name of nested browsing context","value": "Valid browsing context name or keyword"},
        "map": {"description": "Name of image map to reference from the usemap attribute","value": "Text*"},
        "meta": {"description": "Metadata name","value": "Text*"},
        "param": {"description": "Name of parameter","value": "Text"}
    },
    "nonce": {
        "script": {"description": "Cryptographic nonce used in Content Security Policy checks [CSP]","value": "Text"},
        "style": {"description": "Cryptographic nonce used in Content Security Policy checks [CSP]","value": "Text"}
    },
    "novalidate": {
        "form": {"description": "Bypass form control validation for form submission","value": "Boolean attribute"}
    },
    "open": {
        "details": {"description": "Whether the details are visible","value": "Boolean attribute"},
        "dialog": {"description": "Whether the dialog box is showing","value": "Boolean attribute"}
    },
    "optimum": {
        "meter": {"description": "Optimum value in gauge","value": "Valid floating-point number*"}
    },
    "pattern": {
        "input": {"description": "Pattern to be matched by the form control's value","value": "Regular expression matching the JavaScript Pattern production"}
    },
    "ping": {
        "a": {"description": "URLs to ping","value": "Set of space-separated tokens consisting of valid non-empty URLs"},
        "area": {"description": "URLs to ping","value": "Set of space-separated tokens consisting of valid non-empty URLs"}
    },
    "placeholder": {
        "input": {"description": "User-visible label to be placed within the form control","value": "Text*"},
        "textarea": {"description": "User-visible label to be placed within the form control","value": "Text*"}
    },
    "poster": {
        "video": {"description": "Poster frame to show prior to video playback","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "preload": {
        "audio": {"description": "Hints how much buffering the media resource will likely need","value": "\"none\"; \"metadata\"; \"auto\""},
        "video": {"description": "Hints how much buffering the media resource will likely need","value": "\"none\"; \"metadata\"; \"auto\""}
    },
    "radiogroup": {
        "menuitem": {"description": "Name of group of commands to treat as a radio button group","value": "Text"}
    },
    "readonly": {
        "input": {"description": "Whether to allow the value to be edited by the user","value": "Boolean attribute"},
        "textarea": {"description": "Whether to allow the value to be edited by the user","value": "Boolean attribute"}
    },
    "rel": {
        "a": {"description": "Relationship between the document containing the hyperlink and the destination resource","value": "Set of space-separated tokens*"},
        "area": {"description": "Relationship between the document containing the hyperlink and the destination resource","value": "Set of space-separated tokens*"},
        "link": {"description": "Relationship between the document containing the hyperlink and the destination resource","value": "Set of space-separated tokens*"}
    },
    "required": {
        "input": {"description": "Whether the control is required for form submission","value": "Boolean attribute"},
        "select": {"description": "Whether the control is required for form submission","value": "Boolean attribute"},
        "textarea": {"description": "Whether the control is required for form submission","value": "Boolean attribute"}
    },
    "reversed": {
        "ol": {"description": "Number the list backwards","value": "Boolean attribute"}
    },
    "rows": {
        "textarea": {"description": "Number of lines to show","value": "Valid non-negative integer greater than zero"}
    },
    "rowspan": {
        "td": {"description": "Number of rows that the cell is to span","value": "Valid non-negative integer"},
        "th": {"description": "Number of rows that the cell is to span","value": "Valid non-negative integer"}
    },
    "sandbox": {
        "iframe": {"description": "Security rules for nested content","value": "Unordered set of unique space-separated tokens, ASCII case-insensitive, consisting of \"allow-forms\", \"allow-modals\", \"allow-pointer-lock\", \"allow-popups\", \"allow-popups-to-escape-sandbox\", \"allow-same-origin\", \"allow-scripts and \"allow-top-navigation\""}
    },
    "spellcheck": {
        "HTML elements": {"description": "Whether the element is to have its spelling and grammar checked","value": "\"true\"; \"false\""}
    },
    "scope": {
        "th": {"description": "Specifies which cells the header cell applies to","value": "\"row\"; \"col\"; \"rowgroup\"; \"colgroup\""}
    },
    "scoped": {
        "style": {"description": "Whether the styles apply to the entire document or just the parent subtree","value": "Boolean attribute"}
    },
    "seamless": {
        "iframe": {"description": "Whether to apply the document's styles to the nested content","value": "Boolean attribute"}
    },
    "selected": {
        "option": {"description": "Whether the option is selected by default","value": "Boolean attribute"}
    },
    "shape": {
        "area": {"description": "The kind of shape to be created in an image map","value": "\"circle\"; \"default\"; \"poly\"; \"rect\""}
    },
    "size": {
        "input": {"description": "Size of the control","value": "Valid non-negative integer greater than zero"},
        "select": {"description": "Size of the control","value": "Valid non-negative integer greater than zero"}
    },
    "sizes": {
        "link": {"description": "Sizes of the icons (for rel=\"icon\")","value": "Unordered set of unique space-separated tokens, ASCII case-insensitive, consisting of sizes*"}
    },
    "sortable": {
        "table": {"description": "Enables a sorting interface for the table","value": "Boolean attribute"}
    },
    "sorted": {
        "th": {"description": "Column sort direction and ordinality","value": "Set of space-separated tokens, ASCII case-insensitive, consisting of neither, one, or both of \"reversed\" and a valid non-negative integer greater than zero"}
    },
    "span": {
        "col": {"description": "Number of columns spanned by the element","value": "Valid non-negative integer greater than zero"},
        "colgroup": {"description": "Number of columns spanned by the element","value": "Valid non-negative integer greater than zero"}
    },
    "src": {
        "audio": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "embed": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "iframe": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "img": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "input": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "script": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "source": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "track": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"},
        "video": {"description": "Address of the resource","value": "Valid non-empty URL potentially surrounded by spaces"}
    },
    "srcdoc": {
        "iframe": {"description": "A document to render in the iframe","value": "The source of an iframe srcdoc document*"}
    },
    "srclang": {
        "track": {"description": "Language of the text track","value": "Valid BCP 47 language tag"}
    },
    "srcset": {
        "img": {"description": "Images to use in different situations (e.g. high-resolution displays, small monitors, etc)","value": "Comma-separated list of image candidate strings"}
    },
    "start": {
        "ol": {"description": "Ordinal value of the first item","value": "Valid integer"}
    },
    "step": {
        "input": {"description": "Granularity to be matched by the form control's value","value": "Valid floating-point number greater than zero, or \"any\""}
    },
    "style": {
        "HTML elements": {"description": "Presentational and formatting instructions","value": "CSS declarations*"}
    },
    "tabindex": {
        "HTML elements": {"description": "Whether the element is focusable, and the relative order of the element for the purposes of sequential focus navigation","value": "Valid integer"}
    },
    "target": {
        "a": {"description": "Browsing context for hyperlink navigation","value": "Valid browsing context name or keyword"},
        "area": {"description": "Browsing context for hyperlink navigation","value": "Valid browsing context name or keyword"},
        "base": {"description": "Default browsing context for hyperlink navigation and form submission","value": "Valid browsing context name or keyword"},
        "form": {"description": "Browsing context for form submission","value": "Valid browsing context name or keyword"}
    },
    "title": {
        "HTML elements": {"description": "Advisory information for the element","value": "Text"},
        "abbr": {"description": "Full term or expansion of abbreviation","value": "Text"},
        "dfn": {"description": "Full term or expansion of abbreviation","value": "Text"},
        "input": {"description": "Description of pattern (when used with pattern attribute)","value": "Text"},
        "menuitem": {"description": "Hint describing the command","value": "Text"},
        "link": {"description": "Alternative style sheet set name","value": "Text"},
        "style": {"description": "Alternative style sheet set name","value": "Text"}
    },
    "translate": {
        "HTML elements": {"description": "Whether the element is to be translated when the page is localized","value": "\"yes\"; \"no\""}
    },
    "type": {
        "a": {"description": "Hint for the type of the referenced resource","value": "Valid MIME type"},
        "link": {"description": "Hint for the type of the referenced resource","value": "Valid MIME type"},
        "button": {"description": "Type of button","value": "\"submit\"; \"reset\"; \"button\"; \"menu\""},
        "embed": {"description": "Type of embedded resource","value": "Valid MIME type"},
        "object": {"description": "Type of embedded resource","value": "Valid MIME type"},
        "script": {"description": "Type of embedded resource","value": "Valid MIME type"},
        "source": {"description": "Type of embedded resource","value": "Valid MIME type"},
        "style": {"description": "Type of embedded resource","value": "Valid MIME type"},
        "input": {"description": "Type of form control","value": "input type keyword"},
        "menu": {"description": "Type of menu","value": "\"context\"; \"toolbar\""},
        "menuitem": {"description": "Type of command","value": "\"command\"; \"checkbox\"; \"radio\""},
        "ol": {"description": "Kind of list marker","value": "\"1\"; \"a\"; \"A\"; \"i\"; \"I\""}
    },
    "typemustmatch": {
        "object": {"description": "Whether the type attribute and the Content-Type value need to match for the resource to be used","value": "Boolean attribute"}
    },
    "usemap": {
        "img": {"description": "Name of image map to use","value": "Valid hash-name reference*"},
        "object": {"description": "Name of image map to use","value": "Valid hash-name reference*"}
    },
    "value": {
        "button": {"description": "Value to be used for form submission","value": "Text"},
        "option": {"description": "Value to be used for form submission","value": "Text"},
        "data": {"description": "Machine-readable value","value": "Text*"},
        "input": {"description": "Value of the form control","value": "Varies*"},
        "li": {"description": "Ordinal value of the list item","value": "Valid integer"},
        "meter": {"description": "Current value of the element","value": "Valid floating-point number"},
        "progress": {"description": "Current value of the element","value": "Valid floating-point number"},
        "param": {"description": "Value of parameter","value": "Text"}
    },
    "width": {
        "canvas": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "embed": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "iframe": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "img": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "input": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "object": {"description": "Horizontal dimension","value": "Valid non-negative integer"},
        "video": {"description": "Horizontal dimension","value": "Valid non-negative integer"}
    },
    "wrap": {
        "textarea": {"description": "How the value of the form control is to be wrapped for form submission","value": "\"soft\"; \"hard\""}
    }
}
// generated by generators/attributes.js
//


jsToHtml.html._text=function _text(text){
    return jsToHtml.direct({textNode:text});
};

jsToHtml.html._comment=function _comment(text){
    return jsToHtml.direct({commentText:text});
};

jsToHtml.html.includeHtml=function _text(htmlCode){
    if(!this.insecureModeEnabled){
        throw new Error("jsToHtml.html.includeHtml: insecure functions not allowed");
    }
    return jsToHtml.direct({htmlCode:htmlCode, validator:this.includeHtmlValidator});
};

Object.keys(jsToHtml.htmlTags).map(function(tagName){
    jsToHtml.html[tagName]=function(contentOrAttributes,contentIfThereAreAttributes){
        return jsToHtml.indirect(tagName,contentOrAttributes,contentIfThereAreAttributes);
    };
});

jsToHtml.HtmlTextNode.prototype.create = function create(){
    return document.createTextNode(this.textNode);
};

jsToHtml.html.includeHtmlValidator=function(htmlText){
    return /^((<[^<>]+>)|[^<>]+|\n)*$/.test(htmlText);
};

jsToHtml.Html.prototype.create = function create(){
    var element = document.createElement(this.tagName);
    /*jshint -W089 */
    Object.keys(this.attributes).map(function(attr){
        var value=this.attributes[attr];
        if(/-/.test(attr)){
            element.setAttribute(attr, value);
        }else{
            var defAttr=jsToHtml.htmlAttrs[attr]||{};
            if(('listType' in defAttr) && (typeof value!=="string")){
                Array.prototype.forEach.call(value,function(subValue){
                    element[defAttr.listType].add(subValue);
                });
            }else{
                element[defAttr.domName||attr] = value;
            }
        }
    },this);
    this.content.forEach(function(node){
        element.appendChild(node.create());
    });
    /*jshint +W089 */
    return element;
};

return jsToHtml;

});
