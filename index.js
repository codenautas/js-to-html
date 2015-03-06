/*!
 * js-to-html
 * 2015 Codenautas
 * GNU Licensed
 */

/**
 * Module dependencies.
 */

"use strict";
 
var jsToHtml={};

function isPlainObject(x){
    return typeof x=="object" && x.constructor == Object;
}

function spaces(n){
    return new Array(n+1).join(' ');
}

function escapeChar(simpleText){
    var htmlReservedSymbols={
            '&' :'&amp;',
            '<' :'&lt;',
            '>' :'&gt;',
            '\\\'':'&#39;',
            '"' :'&quot;'
    };
    var escapedText=simpleText;
    for(var htmlReservedSymbol in htmlReservedSymbols){
        escapedText=escapedText.replace(new RegExp( htmlReservedSymbol,'g'),htmlReservedSymbols[htmlReservedSymbol]);
    }
    return escapedText;
}

jsToHtml.Html=function Html(directObject){
    var isTextNode='textNode' in directObject;
    var validProperties=isTextNode?{
        textNode:  {textType:'string type' ,check:function(x){ return typeof x=="string" }},
    }:{
        tagName:   {textType:'string type' ,check:function(x){ return typeof x=="string" }},
        attributes:{textType:'Object class',check:function(x){ return isPlainObject(x) }},
        content:   {textType:'Array class' ,check:function(x){ return typeof x=="object" && x instanceof Array }},
    }
    for(var property in validProperties){
        var value=directObject[property];
        if(!(property in directObject) || !validProperties[property].check(value)){
            throw new Error('jsToHtml.Html error: directObject must include '+property+' of '+validProperties[property].textType);
        }
        this[property]=value;
    }
    for(var property in directObject){
        if(!(property in validProperties)){
            throw new Error('jsToHtml.Html error: directObject not recognized '+property+' property');
        }
    }
}

jsToHtml.Html.prototype.toHtmlText=function toHtmlText(opts,recurseOpts){

    if('textNode' in this){
        return escapeChar(this.textNode);
    }
    opts=opts||{};
    recurseOpts=recurseOpts||{};
    recurseOpts.margin=recurseOpts.margin||0;
    var tagInfo=jsToHtml.htmlTags[this.tagName];
    var tagInfoFirstChild=jsToHtml.htmlTags[(this.content[0]||{}).tagName]||{};
    var isvoidTag=tagInfo["void"]||false;
    var inlineBlock=((tagInfo.display||'inline')=='inline');
    var nl=(opts.pretty && !inlineBlock?'\n':'');
    var sp=(opts.pretty && !inlineBlock?spaces:function(x){return ''; });
    var patt= new RegExp(/[^a-z\^A-Z]/);
    return sp(recurseOpts.margin)+"<"+this.tagName+
        Object.keys(this.attributes).map(function(attrName){
            var escapedAttrVal=escapeChar(this.attributes[attrName])
            var quotingAttrVal=patt.test(this.attributes[attrName])?'\''+escapedAttrVal+'\'':escapedAttrVal;
            return ' '+attrName+'='+quotingAttrVal;
        },this).join('')+
        ">"+((tagInfoFirstChild.display||'inline')!='inline'?nl:'')+
        this.content.map(function(node){
            return node.toHtmlText(opts,{margin:recurseOpts.margin+2});
        }).join('')+((tagInfoFirstChild.display||'inline')!='inline'?sp(recurseOpts.margin):'')+
        (isvoidTag?'':"</"+this.tagName+">")+nl;
}


jsToHtml.direct=function direct(directObject){
    return new jsToHtml.Html(directObject);
}

jsToHtml.indirect=function indirect(tagName,contentOrAttributes,contentIfThereAreAttributes){
    var thereAreAttributes=isPlainObject(contentOrAttributes);
    var attributes = thereAreAttributes?contentOrAttributes:{};
    var content    = thereAreAttributes?contentIfThereAreAttributes:contentOrAttributes;
    return jsToHtml.direct({
        tagName:tagName,
        attributes:attributes,
        content:typeof content=='string'?[jsToHtml.direct({textNode:content})]:(
            !content?[]:(content.map(function(element){
                return typeof element=='string'?jsToHtml.direct({textNode:element}):element;
            }))
        )
    });
}

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

jsToHtml.html={
}

Object.keys(jsToHtml.htmlTags).map(function(tagName){
    jsToHtml.html[tagName]=function(contentOrAttributes,contentIfThereAreAttributes){
        return jsToHtml.indirect(tagName,contentOrAttributes,contentIfThereAreAttributes);
    }
});

exports = module.exports = jsToHtml;
