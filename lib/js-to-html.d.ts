export declare type ArrayContent = (HtmlBase | string | HTMLElement | null)[];
export declare type Content = string | ArrayContent | null;
export declare type Attr4HTMLElement = {
    class?: string;
    id?: string;
    accesskey?: any;
    autocapitalize?: any;
    contenteditable?: any;
    dir?: any;
    draggable?: any;
    hidden?: any;
    inputmode?: any;
    is?: any;
    itemid?: any;
    itemprop?: any;
    itemref?: any;
    itemscope?: any;
    itemtype?: any;
    lang?: any;
    nonce?: any;
    spellcheck?: any;
    style?: any;
    tabindex?: any;
    title?: any;
    translate?: any;
};
export interface Attr4HTMLAnchorElement extends Attr4HTMLElement {
    href?: any;
    target?: any;
    download?: any;
    ping?: any;
    rel?: any;
    hreflang?: any;
    type?: any;
    referrerpolicy?: any;
}
export interface Attr4HTMLAreaElement extends Attr4HTMLElement {
    alt?: any;
    coords?: any;
    shape?: any;
    href?: any;
    target?: any;
    download?: any;
    ping?: any;
    rel?: any;
    referrerpolicy?: any;
}
export interface Attr4HTMLAudioElement extends Attr4HTMLElement {
    src?: any;
    crossorigin?: any;
    preload?: any;
    autoplay?: any;
    loop?: any;
    muted?: any;
    controls?: any;
}
export interface Attr4HTMLBaseElement extends Attr4HTMLElement {
    href?: any;
    target?: any;
}
export interface Attr4HTMLQuoteElement extends Attr4HTMLElement {
    cite?: any;
}
export interface Attr4HTMLBodyElement extends Attr4HTMLElement {
    onafterprint?: any;
    onbeforeprint?: any;
    onbeforeunload?: any;
    onhashchange?: any;
    onlanguagechange?: any;
    onmessage?: any;
    onmessageerror?: any;
    onoffline?: any;
    ononline?: any;
    onpagehide?: any;
    onpageshow?: any;
    onpopstate?: any;
    onrejectionhandled?: any;
    onstorage?: any;
    onunhandledrejection?: any;
    onunload?: any;
}
export interface Attr4HTMLBRElement extends Attr4HTMLElement {
}
export interface Attr4HTMLButtonElement extends Attr4HTMLElement {
    autofocus?: any;
    disabled?: any;
    form?: any;
    formaction?: any;
    formenctype?: any;
    formmethod?: any;
    formnovalidate?: any;
    formtarget?: any;
    name?: any;
    type?: any;
    value?: any;
}
export interface Attr4HTMLCanvasElement extends Attr4HTMLElement {
    width?: any;
    height?: any;
}
export interface Attr4HTMLTableCaptionElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTableColElement extends Attr4HTMLElement {
    span?: any;
}
export interface Attr4HTMLDataElement extends Attr4HTMLElement {
    value?: any;
}
export interface Attr4HTMLDataListElement extends Attr4HTMLElement {
}
export interface Attr4HTMLModElement extends Attr4HTMLElement {
    cite?: any;
    datetime?: any;
}
export interface Attr4HTMLDetailsElement extends Attr4HTMLElement {
    open?: any;
}
export interface Attr4HTMLDialogElement extends Attr4HTMLElement {
    open?: any;
}
export interface Attr4HTMLDivElement extends Attr4HTMLElement {
}
export interface Attr4HTMLDListElement extends Attr4HTMLElement {
}
export interface Attr4HTMLEmbedElement extends Attr4HTMLElement {
    src?: any;
    type?: any;
    width?: any;
    height?: any;
    any?: any;
}
export interface Attr4HTMLFieldSetElement extends Attr4HTMLElement {
    disabled?: any;
    form?: any;
    name?: any;
}
export interface Attr4HTMLFormElement extends Attr4HTMLElement {
    "accept-charset"?: any;
    action?: any;
    autocomplete?: any;
    enctype?: any;
    method?: any;
    name?: any;
    novalidate?: any;
    target?: any;
}
export interface Attr4HTMLHeadingElement extends Attr4HTMLElement {
}
export interface Attr4HTMLHeadElement extends Attr4HTMLElement {
}
export interface Attr4HTMLHRElement extends Attr4HTMLElement {
}
export interface Attr4HTMLHtmlElement extends Attr4HTMLElement {
    manifest?: any;
}
export interface Attr4HTMLIFrameElement extends Attr4HTMLElement {
    src?: any;
    srcdoc?: any;
    name?: any;
    sandbox?: any;
    allowfullscreen?: any;
    allowpaymentrequest?: any;
    allowusermedia?: any;
    width?: any;
    height?: any;
    referrerpolicy?: any;
}
export interface Attr4HTMLImageElement extends Attr4HTMLElement {
    alt?: any;
    src?: any;
    srcset?: any;
    crossorigin?: any;
    usemap?: any;
    ismap?: any;
    width?: any;
    height?: any;
    decoding?: any;
    referrerpolicy?: any;
}
export interface Attr4HTMLInputElement extends Attr4HTMLElement {
    accept?: any;
    alt?: any;
    autocomplete?: any;
    autofocus?: any;
    checked?: any;
    dirname?: any;
    disabled?: any;
    form?: any;
    formaction?: any;
    formenctype?: any;
    formmethod?: any;
    formnovalidate?: any;
    formtarget?: any;
    height?: any;
    list?: any;
    max?: any;
    maxlength?: any;
    min?: any;
    minlength?: any;
    multiple?: any;
    name?: any;
    pattern?: any;
    placeholder?: any;
    readonly?: any;
    required?: any;
    size?: any;
    src?: any;
    step?: any;
    type?: any;
    value?: any;
    width?: any;
}
export interface Attr4HTMLLabelElement extends Attr4HTMLElement {
    for?: any;
}
export interface Attr4HTMLLegendElement extends Attr4HTMLElement {
}
export interface Attr4HTMLLIElement extends Attr4HTMLElement {
    value?: any;
}
export interface Attr4HTMLLinkElement extends Attr4HTMLElement {
    href?: any;
    crossorigin?: any;
    rel?: any;
    as?: any;
    media?: any;
    hreflang?: any;
    type?: any;
    sizes?: any;
    referrerpolicy?: any;
    integrity?: any;
}
export interface Attr4HTMLMapElement extends Attr4HTMLElement {
    name?: any;
}
export interface Attr4HTMLMenuElement extends Attr4HTMLElement {
}
export interface Attr4HTMLMetaElement extends Attr4HTMLElement {
    name?: any;
    "http-equiv"?: any;
    content?: any;
    charset?: any;
}
export interface Attr4HTMLMeterElement extends Attr4HTMLElement {
    value?: any;
    min?: any;
    max?: any;
    low?: any;
    high?: any;
    optimum?: any;
}
export interface Attr4HTMLObjectElement extends Attr4HTMLElement {
    data?: any;
    type?: any;
    typemustmatch?: any;
    name?: any;
    usemap?: any;
    form?: any;
    width?: any;
    height?: any;
}
export interface Attr4HTMLOListElement extends Attr4HTMLElement {
    reversed?: any;
    start?: any;
    type?: any;
}
export interface Attr4HTMLOptGroupElement extends Attr4HTMLElement {
    disabled?: any;
    label?: any;
}
export interface Attr4HTMLOptionElement extends Attr4HTMLElement {
    disabled?: any;
    label?: any;
    selected?: any;
    value?: any;
}
export interface Attr4HTMLOutputElement extends Attr4HTMLElement {
    for?: any;
    form?: any;
    name?: any;
}
export interface Attr4HTMLParagraphElement extends Attr4HTMLElement {
}
export interface Attr4HTMLParamElement extends Attr4HTMLElement {
    name?: any;
    value?: any;
}
export interface Attr4HTMLPictureElement extends Attr4HTMLElement {
}
export interface Attr4HTMLPreElement extends Attr4HTMLElement {
}
export interface Attr4HTMLProgressElement extends Attr4HTMLElement {
    value?: any;
    max?: any;
}
export interface Attr4HTMLScriptElement extends Attr4HTMLElement {
    src?: any;
    type?: any;
    async?: any;
    defer?: any;
    crossorigin?: any;
    integrity?: any;
}
export interface Attr4HTMLSelectElement extends Attr4HTMLElement {
    autocomplete?: any;
    autofocus?: any;
    disabled?: any;
    form?: any;
    multiple?: any;
    name?: any;
    required?: any;
    size?: any;
}
export interface Attr4HTMLSlotElement extends Attr4HTMLElement {
    name?: any;
}
export interface Attr4HTMLSourceElement extends Attr4HTMLElement {
    src?: any;
    "type srcset"?: any;
    sizes?: any;
    media?: any;
}
export interface Attr4HTMLSpanElement extends Attr4HTMLElement {
}
export interface Attr4HTMLStyleElement extends Attr4HTMLElement {
    media?: any;
}
export interface Attr4HTMLTableElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTableSectionElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTableCellElement extends Attr4HTMLElement {
    colspan?: any;
    rowspan?: any;
    headers?: any;
}
export interface Attr4HTMLTemplateElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTextAreaElement extends Attr4HTMLElement {
    autofocus?: any;
    cols?: any;
    dirname?: any;
    disabled?: any;
    form?: any;
    maxlength?: any;
    minlength?: any;
    name?: any;
    placeholder?: any;
    readonly?: any;
    required?: any;
    rows?: any;
    wrap?: any;
}
export interface Attr4HTMLTimeElement extends Attr4HTMLElement {
    datetime?: any;
}
export interface Attr4HTMLTitleElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTableRowElement extends Attr4HTMLElement {
}
export interface Attr4HTMLTrackElement extends Attr4HTMLElement {
    default?: any;
    kind?: any;
    label?: any;
    src?: any;
    srclang?: any;
}
export interface Attr4HTMLUListElement extends Attr4HTMLElement {
}
export interface Attr4HTMLVideoElement extends Attr4HTMLElement {
    src?: any;
    crossorigin?: any;
    poster?: any;
    preload?: any;
    autoplay?: any;
    playsinline?: any;
    loop?: any;
    muted?: any;
    controls?: any;
    width?: any;
    height?: any;
}
export declare var html: {
    defaultTitle: string;
    insecureModeEnabled: boolean;
    mandatoryTitle: boolean;
    _text(text: string): HtmlBase;
    _comment(text: string): HtmlBase;
    includeHtml(htmlCode: string): HtmlBase;
    includeHtmlValidator(htmlText: string): boolean;
    a(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLAnchorElement, content?: Content): HtmlTag<HTMLAnchorElement>;
    abbr(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    address(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    area(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLAreaElement): HtmlTag<HTMLAreaElement>;
    article(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    aside(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    audio(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLAudioElement, content?: Content): HtmlTag<HTMLAudioElement>;
    b(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    base(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLBaseElement): HtmlTag<HTMLBaseElement>;
    bdi(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    bdo(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    blockquote(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLQuoteElement, content?: Content): HtmlTag<HTMLQuoteElement>;
    body(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLBodyElement, content?: Content): HtmlTag<HTMLBodyElement>;
    br(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLBRElement): HtmlTag<HTMLBRElement>;
    button(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLButtonElement, content?: Content): HtmlTag<HTMLButtonElement>;
    canvas(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLCanvasElement, content?: Content): HtmlTag<HTMLCanvasElement>;
    caption(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableCaptionElement, content?: Content): HtmlTag<HTMLTableCaptionElement>;
    cite(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    code(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    col(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableColElement): HtmlTag<HTMLTableColElement>;
    colgroup(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableColElement, content?: Content): HtmlTag<HTMLTableColElement>;
    data(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDataElement, content?: Content): HtmlTag<HTMLDataElement>;
    datalist(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDataListElement, content?: Content): HtmlTag<HTMLDataListElement>;
    dd(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    del(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLModElement, content?: Content): HtmlTag<HTMLModElement>;
    details(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDetailsElement, content?: Content): HtmlTag<HTMLDetailsElement>;
    dfn(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    dialog(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDialogElement, content?: Content): HtmlTag<HTMLDialogElement>;
    div(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDivElement, content?: Content): HtmlTag<HTMLDivElement>;
    dl(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLDListElement, content?: Content): HtmlTag<HTMLDListElement>;
    dt(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    em(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    embed(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLEmbedElement): HtmlTag<HTMLEmbedElement>;
    fieldset(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLFieldSetElement, content?: Content): HtmlTag<HTMLFieldSetElement>;
    figcaption(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    figure(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    footer(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    form(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLFormElement, content?: Content): HtmlTag<HTMLFormElement>;
    h1(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    h2(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    h3(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    h4(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    h5(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    h6(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadingElement, content?: Content): HtmlTag<HTMLHeadingElement>;
    head(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHeadElement, content?: Content): HtmlTag<HTMLHeadElement>;
    header(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    hgroup(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    hr(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHRElement): HtmlTag<HTMLHRElement>;
    html(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLHtmlElement, content?: Content): HtmlTag<HTMLHtmlElement>;
    i(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    iframe(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLIFrameElement): HtmlTag<HTMLIFrameElement>;
    img(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLImageElement): HtmlTag<HTMLImageElement>;
    input(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLInputElement): HtmlTag<HTMLInputElement>;
    ins(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLModElement, content?: Content): HtmlTag<HTMLModElement>;
    kbd(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    label(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLLabelElement, content?: Content): HtmlTag<HTMLLabelElement>;
    legend(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLLegendElement, content?: Content): HtmlTag<HTMLLegendElement>;
    li(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLLIElement, content?: Content): HtmlTag<HTMLLIElement>;
    link(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLLinkElement): HtmlTag<HTMLLinkElement>;
    main(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    map(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLMapElement, content?: Content): HtmlTag<HTMLMapElement>;
    mark(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    menu(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLMenuElement, content?: Content): HtmlTag<HTMLMenuElement>;
    meta(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLMetaElement): HtmlTag<HTMLMetaElement>;
    meter(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLMeterElement, content?: Content): HtmlTag<HTMLMeterElement>;
    nav(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    noscript(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    object(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLObjectElement, content?: Content): HtmlTag<HTMLObjectElement>;
    ol(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLOListElement, content?: Content): HtmlTag<HTMLOListElement>;
    optgroup(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLOptGroupElement, content?: Content): HtmlTag<HTMLOptGroupElement>;
    option(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLOptionElement, content?: Content): HtmlTag<HTMLOptionElement>;
    output(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLOutputElement, content?: Content): HtmlTag<HTMLOutputElement>;
    p(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLParagraphElement, content?: Content): HtmlTag<HTMLParagraphElement>;
    param(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLParamElement): HtmlTag<HTMLParamElement>;
    picture(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLPictureElement, content?: Content): HtmlTag<HTMLPictureElement>;
    pre(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLPreElement, content?: Content): HtmlTag<HTMLPreElement>;
    progress(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLProgressElement, content?: Content): HtmlTag<HTMLProgressElement>;
    q(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLQuoteElement, content?: Content): HtmlTag<HTMLQuoteElement>;
    rp(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    rt(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    ruby(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    s(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    samp(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    script(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLScriptElement, content?: Content): HtmlTag<HTMLScriptElement>;
    section(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    select(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLSelectElement, content?: Content): HtmlTag<HTMLSelectElement>;
    slot(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLSlotElement, content?: Content): HtmlTag<HTMLSlotElement>;
    small(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    source(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLSourceElement): HtmlTag<HTMLSourceElement>;
    span(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLSpanElement, content?: Content): HtmlTag<HTMLSpanElement>;
    strong(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    style(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLStyleElement, content?: Content): HtmlTag<HTMLStyleElement>;
    sub(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    summary(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    sup(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    table(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableElement, content?: Content): HtmlTag<HTMLTableElement>;
    tbody(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableSectionElement, content?: Content): HtmlTag<HTMLTableSectionElement>;
    td(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableCellElement, content?: Content): HtmlTag<HTMLTableCellElement>;
    template(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTemplateElement): HtmlTag<HTMLTemplateElement>;
    textarea(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTextAreaElement, content?: Content): HtmlTag<HTMLTextAreaElement>;
    tfoot(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableSectionElement, content?: Content): HtmlTag<HTMLTableSectionElement>;
    th(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableCellElement, content?: Content): HtmlTag<HTMLTableCellElement>;
    thead(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableSectionElement, content?: Content): HtmlTag<HTMLTableSectionElement>;
    time(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTimeElement, content?: Content): HtmlTag<HTMLTimeElement>;
    title(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTitleElement, content?: Content): HtmlTag<HTMLTitleElement>;
    tr(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTableRowElement, content?: Content): HtmlTag<HTMLTableRowElement>;
    track(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLTrackElement): HtmlTag<HTMLTrackElement>;
    u(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    ul(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLUListElement, content?: Content): HtmlTag<HTMLUListElement>;
    var(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement, content?: Content): HtmlTag<HTMLElement>;
    video(optsOrContent?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLVideoElement, content?: Content): HtmlTag<HTMLVideoElement>;
    wbr(opts?: string | (string | HTMLElement | HtmlBase)[] | Attr4HTMLElement): HtmlTag<HTMLElement>;
};
export declare type Checker = {
    check: (value: any, directObject: DirectObject) => boolean;
    text?: string;
};
export declare type ValidPropertiesChecker = {
    checks: Checker[];
    transform?: (x: any) => any;
};
export declare type ValidPropertydProperty = {
    textNode?: ValidPropertiesChecker;
    tagName?: ValidPropertiesChecker;
    attributes?: ValidPropertiesChecker;
    content?: ValidPropertiesChecker;
    htmlCode?: ValidPropertiesChecker;
    validator?: ValidPropertiesChecker;
    commentText?: ValidPropertiesChecker;
    readonly [key: string]: ValidPropertiesChecker;
};
export declare type DirectObject = {
    textNode?: string;
    tagName?: string;
    attributes?: object;
    content?: HtmlBase[];
    htmlCode?: string;
    validator?: (content: any) => boolean;
    commentText?: string;
    readonly [key: string]: any;
};
export declare type PrintOpts = {
    pretty?: boolean;
    incomplete?: boolean;
    title?: string;
};
export declare type PrintRecurseOpts = {
    margin?: number;
};
export declare class HtmlBase {
    readonly [key: string]: any;
    constructor(directObject: DirectObject, validProperties?: ValidPropertydProperty);
    attributesToHtmlText(): string;
    toHtmlText(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
    create(): HTMLElement | Text;
}
export declare function arrayToHtmlText(listOfObjects: (string | HtmlBase)[], opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
export declare class Html extends HtmlBase {
    tagName: string;
    attributes: {
        [key: string]: any;
    };
    content: HtmlBase[];
    constructor(directObject: DirectObject);
    toHtmlText(opts?: PrintOpts, recurseOpts?: PrintRecurseOpts): string;
    contentToHtmlText(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
    create(): any;
    toHtmlDoc(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
}
export interface HtmlTag<T extends HTMLElement> extends Html {
    create(): T;
}
export declare class HtmlTextNode extends HtmlBase {
    textNode: string;
    constructor(directObject: DirectObject);
    toHtmlText(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
    create(): Text;
}
export declare class HtmlDirectNode extends HtmlBase {
    htmlCode: string;
    constructor(directObject: DirectObject);
    toHtmlText(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
}
export declare class HtmlComment extends HtmlBase {
    commentText: string;
    constructor(directObject: DirectObject);
    toHtmlText(opts: PrintOpts, recurseOpts: PrintRecurseOpts): string;
}
export declare function direct(directObject: DirectObject): HtmlBase;
export declare type HtmlTagDef = {
    type: string;
    void?: boolean;
    display?: string;
    description: string;
};
export declare type HtmlTags = {
    readonly [key: string]: HtmlTagDef;
};
export declare let htmlTags: HtmlTags;
export declare type HtmlAttributes = {
    [key: string]: {
        tags: {
            [key: string]: {
                description: string;
                value: string;
            };
        };
        idl: string;
        listName?: string;
        rejectSpaces?: boolean;
        reserved?: boolean;
        noProperty?: boolean;
    };
};
export declare let htmlAttributes: HtmlAttributes;
