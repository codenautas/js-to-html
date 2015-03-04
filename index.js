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

jsToHtml.Html=function Html(directObject){
    var isTextNode='textNode' in directObject;
    var validProperties=isTextNode?{
        textNode:  {textType:'string type' ,check:function(x){ return typeof x=="string"}},
    }:{
        tagName:   {textType:'string type' ,check:function(x){ return typeof x=="string"}},
        attributes:{textType:'Object class',check:function(x){ return typeof x=="object" && x.constructor == Object}},
        content:   {textType:'Array class' ,check:function(x){ return typeof x=="object" && x instanceof Array}},
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

jsToHtml.Html.prototype.toHtmlText=function toHtmlText(){
    if('textNode' in this){
        return this.textNode;
    }
    return "<"+this.tagName+
        /*(object.attributes?Object.keys(object.attributes).map(function(attrName){
            return ' '+attrName+'='+object.attributes[attrName];
        }).join(''):'')+*/
        ">"+
        /*
        (opts.pretty?spaces(recurseOpts.margin):'')+
        (object.content?nl+object.content.map(function(node){
            // esto hay que controlarlo cuando permitamos meter objetos internos dentro de objetos comunes para pasarlos a internos otra vez. 
            // if(!(node instanceof jsToHtml.Internal)){
                node=jsToHtml(node);
            //}
            return node.toHtml(opts,{margin:recurseOpts.margin+2});
        }).join('')+(opts.pretty?spaces(recurseOpts.margin):''):'')+
        (object.textContent||'')+
        */
        "</"+this.tagName+">"//+nl;
}

jsToHtml.direct=function direct(directObject){
    return new jsToHtml.Html(directObject);
}

jsToHtml.html=function html(){
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
