export declare var html: {
    defaultTitle: string;
    insecureModeEnabled: boolean;
    mandatoryTitle: boolean;
    _text(text: any): any;
    _comment(text: any): any;
    includeHtml(htmlCode: any): any;
    includeHtmlValidator(htmlText: any): boolean;
};
export declare type ValidPropertiesChecker = object;
export declare type ValidPropertydProperty = {
    tagName?: ValidPropertiesChecker;
    attributes?: ValidPropertiesChecker;
    content?: ValidPropertiesChecker;
    textNode?: ValidPropertiesChecker;
    htmlCode?: ValidPropertiesChecker;
    validator?: ValidPropertiesChecker;
    commentText?: ValidPropertiesChecker;
};
export declare type DirectObject = {};
export declare abstract class HtmlBase {
    tagName: string;
    attributes: {
        [key: string]: any;
    };
    content: HtmlBase[];
    textNode: string;
    htmlCode: string;
    commentText: string;
    constructor(directObject: DirectObject, validProperties: ValidPropertydProperty);
    attributesToHtmlText(): string;
    contentToHtmlText(opts: any, recurseOpts: any): any;
    toHtmlDoc(opts: any, recurseOpts: any): string;
    toHtmlText(opts: any, recurseOpts: any): string;
    create(): HTMLElement | Text;
}
export declare function arrayToHtmlText(listOfObjects: any, opts: any, recurseOpts: any): any;
export declare class Html extends HtmlBase {
    constructor(directObject: any);
    toHtmlText(opts: any, recurseOpts: any): string;
    create(): HTMLElement;
}
export declare class HtmlTextNode extends HtmlBase {
    constructor(directObject: any);
    toHtmlText(opts: any, recurseOpts: any): any;
    create(): Text;
}
export declare class HtmlDirectNode extends HtmlBase {
    constructor(directObject: any);
    toHtmlText(): string;
}
export declare function direct(directObject: DirectObject): any;
export declare let htmlTags: {
    "a": {
        type: string;
        description: string;
    };
    "abbr": {
        type: string;
        description: string;
    };
    "acronym": {
        type: string;
        description: string;
    };
    "address": {
        type: string;
        description: string;
    };
    "applet": {
        type: string;
        description: string;
    };
    "area": {
        type: string;
        "void": boolean;
        description: string;
    };
    "article": {
        type: string;
        description: string;
    };
    "aside": {
        type: string;
        description: string;
    };
    "audio": {
        type: string;
        description: string;
    };
    "b": {
        type: string;
        description: string;
    };
    "base": {
        type: string;
        "void": boolean;
        description: string;
    };
    "basefont": {
        type: string;
        description: string;
    };
    "bdi": {
        type: string;
        description: string;
    };
    "bdo": {
        type: string;
        description: string;
    };
    "big": {
        type: string;
        description: string;
    };
    "blockquote": {
        type: string;
        description: string;
    };
    "body": {
        type: string;
        description: string;
    };
    "br": {
        type: string;
        "void": boolean;
        description: string;
    };
    "button": {
        type: string;
        description: string;
    };
    "canvas": {
        type: string;
        description: string;
    };
    "caption": {
        type: string;
        display: string;
        description: string;
    };
    "center": {
        type: string;
        description: string;
    };
    "cite": {
        type: string;
        description: string;
    };
    "code": {
        type: string;
        description: string;
    };
    "col": {
        type: string;
        display: string;
        "void": boolean;
        description: string;
    };
    "colgroup": {
        type: string;
        display: string;
        description: string;
    };
    "command": {
        type: string;
        "void": boolean;
        description: string;
    };
    "datalist": {
        type: string;
        description: string;
    };
    "dd": {
        type: string;
        description: string;
    };
    "del": {
        type: string;
        description: string;
    };
    "details": {
        type: string;
        description: string;
    };
    "dfn": {
        type: string;
        description: string;
    };
    "dialog": {
        type: string;
        description: string;
    };
    "dir": {
        type: string;
        description: string;
    };
    "div": {
        type: string;
        display: string;
        description: string;
    };
    "dl": {
        type: string;
        description: string;
    };
    "dt": {
        type: string;
        description: string;
    };
    "em": {
        type: string;
        description: string;
    };
    "embed": {
        type: string;
        "void": boolean;
        description: string;
    };
    "fieldset": {
        type: string;
        description: string;
    };
    "figcaption": {
        type: string;
        description: string;
    };
    "figure": {
        type: string;
        description: string;
    };
    "font": {
        type: string;
        description: string;
    };
    "footer": {
        type: string;
        description: string;
    };
    "form": {
        type: string;
        description: string;
    };
    "frame": {
        type: string;
        description: string;
    };
    "frameset": {
        type: string;
        description: string;
    };
    "h1": {
        type: string;
        display: string;
        description: string;
    };
    "h2": {
        type: string;
        display: string;
        description: string;
    };
    "h3": {
        type: string;
        display: string;
        description: string;
    };
    "h4": {
        type: string;
        display: string;
        description: string;
    };
    "h5": {
        type: string;
        display: string;
        description: string;
    };
    "h6": {
        type: string;
        display: string;
        description: string;
    };
    "head": {
        type: string;
        description: string;
    };
    "header": {
        type: string;
        description: string;
    };
    "hgroup": {
        type: string;
        description: string;
    };
    "hr": {
        type: string;
        "void": boolean;
        description: string;
    };
    "html": {
        type: string;
        description: string;
    };
    "i": {
        type: string;
        description: string;
    };
    "iframe": {
        type: string;
        description: string;
    };
    "img": {
        type: string;
        "void": boolean;
        description: string;
    };
    "input": {
        type: string;
        "void": boolean;
        description: string;
    };
    "ins": {
        type: string;
        description: string;
    };
    "kbd": {
        type: string;
        description: string;
    };
    "keygen": {
        type: string;
        description: string;
    };
    "label": {
        type: string;
        description: string;
    };
    "legend": {
        type: string;
        description: string;
    };
    "li": {
        type: string;
        description: string;
    };
    "link": {
        type: string;
        "void": boolean;
        description: string;
    };
    "map": {
        type: string;
        description: string;
    };
    "mark": {
        type: string;
        description: string;
    };
    "menu": {
        type: string;
        description: string;
    };
    "meta": {
        type: string;
        "void": boolean;
        description: string;
    };
    "meter": {
        type: string;
        description: string;
    };
    "nav": {
        type: string;
        description: string;
    };
    "noframes": {
        type: string;
        description: string;
    };
    "noscript": {
        type: string;
        description: string;
    };
    "object": {
        type: string;
        description: string;
    };
    "ol": {
        type: string;
        description: string;
    };
    "optgroup": {
        type: string;
        description: string;
    };
    "option": {
        type: string;
        description: string;
    };
    "output": {
        type: string;
        description: string;
    };
    "p": {
        type: string;
        display: string;
        description: string;
    };
    "param": {
        type: string;
        "void": boolean;
        description: string;
    };
    "pre": {
        type: string;
        description: string;
    };
    "progress": {
        type: string;
        description: string;
    };
    "q": {
        type: string;
        description: string;
    };
    "rp": {
        type: string;
        description: string;
    };
    "rt": {
        type: string;
        description: string;
    };
    "ruby": {
        type: string;
        description: string;
    };
    "s": {
        type: string;
        description: string;
    };
    "samp": {
        type: string;
        description: string;
    };
    "script": {
        type: string;
        description: string;
    };
    "section": {
        type: string;
        description: string;
    };
    "select": {
        type: string;
        description: string;
    };
    "small": {
        type: string;
        description: string;
    };
    "source": {
        type: string;
        "void": boolean;
        description: string;
    };
    "span": {
        type: string;
        description: string;
    };
    "strike": {
        type: string;
        description: string;
    };
    "strong": {
        type: string;
        description: string;
    };
    "style": {
        type: string;
        description: string;
    };
    "sub": {
        type: string;
        description: string;
    };
    "summary": {
        type: string;
        description: string;
    };
    "sup": {
        type: string;
        description: string;
    };
    "table": {
        type: string;
        display: string;
        description: string;
    };
    "tbody": {
        type: string;
        display: string;
        description: string;
    };
    "td": {
        type: string;
        display: string;
        description: string;
    };
    "textarea": {
        type: string;
        description: string;
    };
    "tfoot": {
        type: string;
        display: string;
        description: string;
    };
    "th": {
        type: string;
        display: string;
        description: string;
    };
    "thead": {
        type: string;
        display: string;
        description: string;
    };
    "time": {
        type: string;
        description: string;
    };
    "title": {
        type: string;
        description: string;
    };
    "tr": {
        type: string;
        display: string;
        description: string;
    };
    "track": {
        type: string;
        description: string;
    };
    "tt": {
        type: string;
        description: string;
    };
    "u": {
        type: string;
        description: string;
    };
    "ul": {
        type: string;
        description: string;
    };
    "var": {
        type: string;
        description: string;
    };
    "video": {
        type: string;
        description: string;
    };
    "wbr": {
        type: string;
        description: string;
    };
};
export declare let htmlAttributes: {
    "abbr": {
        "tags": {
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "accept": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "accept-charset": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "accesskey": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "action": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "allowfullscreen": {
        "tags": {
            "iframe": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "alt": {
        "tags": {
            "area": {
                "description": string;
                "value": string;
            };
            "img": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "async": {
        "tags": {
            "script": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "autocomplete": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "autofocus": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "keygen": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "autoplay": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "challenge": {
        "tags": {
            "keygen": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "charset": {
        "tags": {
            "meta": {
                "description": string;
                "value": string;
            };
            "script": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "checked": {
        "tags": {
            "menuitem": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "cite": {
        "tags": {
            "blockquote": {
                "description": string;
                "value": string;
            };
            "del": {
                "description": string;
                "value": string;
            };
            "ins": {
                "description": string;
                "value": string;
            };
            "q": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "class": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
        "rejectSpaces": boolean;
        "listName": string;
        "reserved": boolean;
    };
    "cols": {
        "tags": {
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "colspan": {
        "tags": {
            "td": {
                "description": string;
                "value": string;
            };
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "content": {
        "tags": {
            "meta": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "contenteditable": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "contextmenu": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "controls": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "coords": {
        "tags": {
            "area": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "crossorigin": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "img": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
            "script": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "data": {
        "tags": {
            "object": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "datetime": {
        "tags": {
            "del": {
                "description": string;
                "value": string;
            };
            "ins": {
                "description": string;
                "value": string;
            };
            "time": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "default": {
        "tags": {
            "menuitem": {
                "description": string;
                "value": string;
            };
            "track": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "defer": {
        "tags": {
            "script": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "dir": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
            "bdo": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "dirname": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "disabled": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "menuitem": {
                "description": string;
                "value": string;
            };
            "fieldset": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "keygen": {
                "description": string;
                "value": string;
            };
            "optgroup": {
                "description": string;
                "value": string;
            };
            "option": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "download": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "area": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "draggable": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "dropzone": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "enctype": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "for": {
        "tags": {
            "label": {
                "description": string;
                "value": string;
            };
            "output": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
        "reserved": boolean;
    };
    "form": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "fieldset": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "keygen": {
                "description": string;
                "value": string;
            };
            "label": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
            "output": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "formaction": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "formenctype": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "formmethod": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "formnovalidate": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "formtarget": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "headers": {
        "tags": {
            "td": {
                "description": string;
                "value": string;
            };
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "height": {
        "tags": {
            "canvas": {
                "description": string;
                "value": string;
            };
            "embed": {
                "description": string;
                "value": string;
            };
            "iframe": {
                "description": string;
                "value": string;
            };
            "img": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "hidden": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "high": {
        "tags": {
            "meter": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "href": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "area": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
            "base": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "hreflang": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "http-equiv": {
        "tags": {
            "meta": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "icon": {
        "tags": {
            "menuitem": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "id": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "inputmode": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "ismap": {
        "tags": {
            "img": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "itemid": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "itemprop": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "itemref": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "itemscope": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "itemtype": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "keytype": {
        "tags": {
            "keygen": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "kind": {
        "tags": {
            "track": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "label": {
        "tags": {
            "menuitem": {
                "description": string;
                "value": string;
            };
            "menu": {
                "description": string;
                "value": string;
            };
            "optgroup": {
                "description": string;
                "value": string;
            };
            "option": {
                "description": string;
                "value": string;
            };
            "track": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "lang": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "list": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
        "noProperty": boolean;
    };
    "loop": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "low": {
        "tags": {
            "meter": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "manifest": {
        "tags": {
            "html": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "max": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "meter": {
                "description": string;
                "value": string;
            };
            "progress": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "maxlength": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "media": {
        "tags": {
            "link": {
                "description": string;
                "value": string;
            };
            "style": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "mediagroup": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "menu": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "method": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "min": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "meter": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "minlength": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "multiple": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "muted": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "name": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "fieldset": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "keygen": {
                "description": string;
                "value": string;
            };
            "output": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
            "form": {
                "description": string;
                "value": string;
            };
            "iframe": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
            "map": {
                "description": string;
                "value": string;
            };
            "meta": {
                "description": string;
                "value": string;
            };
            "param": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "nonce": {
        "tags": {
            "script": {
                "description": string;
                "value": string;
            };
            "style": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "novalidate": {
        "tags": {
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "open": {
        "tags": {
            "details": {
                "description": string;
                "value": string;
            };
            "dialog": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "optimum": {
        "tags": {
            "meter": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "pattern": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "ping": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "area": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "placeholder": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "poster": {
        "tags": {
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "preload": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "radiogroup": {
        "tags": {
            "menuitem": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "readonly": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "rel": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "area": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "required": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "reversed": {
        "tags": {
            "ol": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "rows": {
        "tags": {
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "rowspan": {
        "tags": {
            "td": {
                "description": string;
                "value": string;
            };
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "sandbox": {
        "tags": {
            "iframe": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "spellcheck": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "scope": {
        "tags": {
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "scoped": {
        "tags": {
            "style": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "seamless": {
        "tags": {
            "iframe": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "selected": {
        "tags": {
            "option": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "shape": {
        "tags": {
            "area": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "size": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
            "select": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "sizes": {
        "tags": {
            "link": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "sortable": {
        "tags": {
            "table": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "sorted": {
        "tags": {
            "th": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "span": {
        "tags": {
            "col": {
                "description": string;
                "value": string;
            };
            "colgroup": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "src": {
        "tags": {
            "audio": {
                "description": string;
                "value": string;
            };
            "embed": {
                "description": string;
                "value": string;
            };
            "iframe": {
                "description": string;
                "value": string;
            };
            "img": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "script": {
                "description": string;
                "value": string;
            };
            "source": {
                "description": string;
                "value": string;
            };
            "track": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "srcdoc": {
        "tags": {
            "iframe": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "srclang": {
        "tags": {
            "track": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "srcset": {
        "tags": {
            "img": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "start": {
        "tags": {
            "ol": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "step": {
        "tags": {
            "input": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "style": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
        "noProperty": boolean;
    };
    "tabindex": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "target": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "area": {
                "description": string;
                "value": string;
            };
            "base": {
                "description": string;
                "value": string;
            };
            "form": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "title": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
            "abbr": {
                "description": string;
                "value": string;
            };
            "dfn": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "menuitem": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
            "style": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "translate": {
        "tags": {
            "HTML elements": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "type": {
        "tags": {
            "a": {
                "description": string;
                "value": string;
            };
            "link": {
                "description": string;
                "value": string;
            };
            "button": {
                "description": string;
                "value": string;
            };
            "embed": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
            "script": {
                "description": string;
                "value": string;
            };
            "source": {
                "description": string;
                "value": string;
            };
            "style": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "menu": {
                "description": string;
                "value": string;
            };
            "menuitem": {
                "description": string;
                "value": string;
            };
            "ol": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "typemustmatch": {
        "tags": {
            "object": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "usemap": {
        "tags": {
            "img": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "value": {
        "tags": {
            "button": {
                "description": string;
                "value": string;
            };
            "option": {
                "description": string;
                "value": string;
            };
            "data": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "li": {
                "description": string;
                "value": string;
            };
            "meter": {
                "description": string;
                "value": string;
            };
            "progress": {
                "description": string;
                "value": string;
            };
            "param": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "width": {
        "tags": {
            "canvas": {
                "description": string;
                "value": string;
            };
            "embed": {
                "description": string;
                "value": string;
            };
            "iframe": {
                "description": string;
                "value": string;
            };
            "img": {
                "description": string;
                "value": string;
            };
            "input": {
                "description": string;
                "value": string;
            };
            "object": {
                "description": string;
                "value": string;
            };
            "video": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
    "wrap": {
        "tags": {
            "textarea": {
                "description": string;
                "value": string;
            };
        };
        "idl": string;
    };
};
