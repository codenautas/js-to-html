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
        return this.textNode;
    }
    var nl='';
    var opts={};
    var recurseOpts={};
    return "<"+this.tagName+
        Object.keys(this.attributes).map(function(attrName){
            return ' '+attrName+'='+this.attributes[attrName];
        },this).join('')+
        ">"+
        (opts.pretty?spaces(recurseOpts.margin):'')+
        nl+this.content.map(function(node){
            return node.toHtmlText(opts,{margin:recurseOpts.margin+2});
        }).join('')+(opts.pretty?spaces(recurseOpts.margin):'')+
        "</"+this.tagName+">"//+nl;
}

jsToHtml.direct=function direct(directObject){
    return new jsToHtml.Html(directObject);
}

jsToHtml.indirect=function direct(tagName,contentOrAttributes,contentIfThereAreAttributes){
    var thereAreAttributes=isPlainObject(contentOrAttributes);
    var attributes = thereAreAttributes?contentOrAttributes:{};
    var content    = thereAreAttributes?contentIfThereAreAttributes:contentOrAttributes;
    return jsToHtml.direct({
        tagName:tagName,
        attributes:attributes,
        content:typeof content=='string'?[{textNode:content}]:content
    });
}

jsToHtml.html={
}

jsToHtml.html.p=function p(contentOrAttributes,contentIfThereAreAttributes){
    return jsToHtml.indirect('p',contentOrAttributes,contentIfThereAreAttributes);
}

jsToHtml.html.div=function div(contentOrAttributes,contentIfThereAreAttributes){
    return jsToHtml.indirect('div',contentOrAttributes,contentIfThereAreAttributes);
}

jsToHtml.Internal=function(object){
    this.internalContent=object;
}

function spaces(n){
    return new Array(n+1).join(' ');
}

jsToHtml.Internal.prototype.toHtml=function toHtml(opts,recurseOpts){
    var object=this.internalContent;
    opts=opts||{};
    recurseOpts=recurseOpts||{};
    recurseOpts.margin=recurseOpts.margin||0;
    var nl=(opts.pretty?'\n':'');
    return }

Object.defineProperty(jsToHtml.Internal.prototype, 'internal', {
    get: function(){
        if(jsToHtml.testing){
            return this.internalContent;
        }else{
            throw new Error('jsToHtml.Internal error: the internal content is only for test purposes');
        }
    }
});

exports = module.exports = jsToHtml;
