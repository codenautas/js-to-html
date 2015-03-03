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

function spaces(n){
    return new Array(n+1).join(' ');
}

jsToHtml.Internal.prototype.toHtml=function toHtml(opts,recurseOpts){
    var object=this.internalContent;
    opts=opts||{};
    recurseOpts=recurseOpts||{};
    recurseOpts.margin=recurseOpts.margin||0;
    var nl=(opts.pretty?'\n':'');
    return (opts.pretty?spaces(recurseOpts.margin):'')+
        "<"+object.tagName+
        (object.attributes?Object.keys(object.attributes).map(function(attrName){
            return ' '+attrName+'='+object.attributes[attrName];
        }).join(''):'')+
        ">"+
        (object.content?nl+object.content.map(function(node){
            // esto hay que controlarlo cuando permitamos meter objetos internos dentro de objetos comunes para pasarlos a internos otra vez. 
            // if(!(node instanceof jsToHtml.Internal)){
                node=jsToHtml(node);
            //}
            return node.toHtml(opts,{margin:recurseOpts.margin+2});
        }).join('')+(opts.pretty?spaces(recurseOpts.margin):''):'')+
        (object.textContent||'')+
        "</"+object.tagName+">"+nl;
}

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
