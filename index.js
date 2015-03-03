/*!
 * js-to-html
 * 2015 Codenautas
 * GNU Licensed
 */

/**
 * Module dependencies.
 */

"use strict";
 
function jsToHtml(object){
    return new jsToHtml.Internal(object);
}

jsToHtml.Internal=function(object){
    this.internalContent=object;
}

jsToHtml.Internal.prototype.toHtml=function toHtml(opts){
    var object=this.internalContent;
    return "<"+object.tagName+">"+(object.textContent||'')+"</"+object.tagName+">";
}

exports = module.exports = jsToHtml;
