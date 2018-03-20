
var fs=require('fs');

// https://html.spec.whatwg.org/multipage/indices.html#element-interfaces

var source=
`a	HTMLAnchorElement : HTMLElement
abbr	HTMLElement
address	HTMLElement
area	HTMLAreaElement : HTMLElement
article	HTMLElement
aside	HTMLElement
audio	HTMLAudioElement : HTMLMediaElement : HTMLElement
b	HTMLElement
base	HTMLBaseElement : HTMLElement
bdi	HTMLElement
bdo	HTMLElement
blockquote	HTMLQuoteElement : HTMLElement
body	HTMLBodyElement : HTMLElement
br	HTMLBRElement : HTMLElement
button	HTMLButtonElement : HTMLElement
canvas	HTMLCanvasElement : HTMLElement
caption	HTMLTableCaptionElement : HTMLElement
cite	HTMLElement
code	HTMLElement
col	HTMLTableColElement : HTMLElement
colgroup	HTMLTableColElement : HTMLElement
data	HTMLDataElement : HTMLElement
datalist	HTMLDataListElement : HTMLElement
dd	HTMLElement
del	HTMLModElement : HTMLElement
details	HTMLDetailsElement : HTMLElement
dfn	HTMLElement
dialog	HTMLDialogElement : HTMLElement
div	HTMLDivElement : HTMLElement
dl	HTMLDListElement : HTMLElement
dt	HTMLElement
em	HTMLElement
embed	HTMLEmbedElement : HTMLElement
fieldset	HTMLFieldSetElement : HTMLElement
figcaption	HTMLElement
figure	HTMLElement
footer	HTMLElement
form	HTMLFormElement : HTMLElement
h1	HTMLHeadingElement : HTMLElement
h2	HTMLHeadingElement : HTMLElement
h3	HTMLHeadingElement : HTMLElement
h4	HTMLHeadingElement : HTMLElement
h5	HTMLHeadingElement : HTMLElement
h6	HTMLHeadingElement : HTMLElement
head	HTMLHeadElement : HTMLElement
header	HTMLElement
hgroup	HTMLElement
hr	HTMLHRElement : HTMLElement
html	HTMLHtmlElement : HTMLElement
i	HTMLElement
iframe	HTMLIFrameElement : HTMLElement
img	HTMLImageElement : HTMLElement
input	HTMLInputElement : HTMLElement
ins	HTMLModElement : HTMLElement
kbd	HTMLElement
label	HTMLLabelElement : HTMLElement
legend	HTMLLegendElement : HTMLElement
li	HTMLLIElement : HTMLElement
link	HTMLLinkElement : HTMLElement
main	HTMLElement
map	HTMLMapElement : HTMLElement
mark	HTMLElement
menu	HTMLMenuElement : HTMLElement
meta	HTMLMetaElement : HTMLElement
meter	HTMLMeterElement : HTMLElement
nav	HTMLElement
noscript	HTMLElement
object	HTMLObjectElement : HTMLElement
ol	HTMLOListElement : HTMLElement
optgroup	HTMLOptGroupElement : HTMLElement
option	HTMLOptionElement : HTMLElement
output	HTMLOutputElement : HTMLElement
p	HTMLParagraphElement : HTMLElement
param	HTMLParamElement : HTMLElement
picture	HTMLPictureElement : HTMLElement
pre	HTMLPreElement : HTMLElement
progress	HTMLProgressElement : HTMLElement
q	HTMLQuoteElement : HTMLElement
rp	HTMLElement
rt	HTMLElement
ruby	HTMLElement
s	HTMLElement
samp	HTMLElement
script	HTMLScriptElement : HTMLElement
section	HTMLElement
select	HTMLSelectElement : HTMLElement
slot	HTMLSlotElement : HTMLElement
small	HTMLElement
source	HTMLSourceElement : HTMLElement
span	HTMLSpanElement : HTMLElement
strong	HTMLElement
style	HTMLStyleElement : HTMLElement
sub	HTMLElement
summary	HTMLElement
sup	HTMLElement
table	HTMLTableElement : HTMLElement
tbody	HTMLTableSectionElement : HTMLElement
td	HTMLTableCellElement : HTMLElement
template	HTMLTemplateElement : HTMLElement
textarea	HTMLTextAreaElement : HTMLElement
tfoot	HTMLTableSectionElement : HTMLElement
th	HTMLTableCellElement : HTMLElement
thead	HTMLTableSectionElement : HTMLElement
time	HTMLTimeElement : HTMLElement
title	HTMLTitleElement : HTMLElement
tr	HTMLTableRowElement : HTMLElement
track	HTMLTrackElement : HTMLElement
u	HTMLElement
ul	HTMLUListElement : HTMLElement
var	HTMLElement
video	HTMLVideoElement : HTMLMediaElement : HTMLElement
wbr	HTMLElement`;


var source=
`a	Hyperlink	flow; phrasing*; interactive; palpable	phrasing	transparent*	globals; href; target; download; ping; rel; hreflang; type; referrerpolicy	HTMLAnchorElement
abbr	Abbreviation	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
address	Contact information for a page or article element	flow; palpable	flow	flow*	globals	HTMLElement
area	Hyperlink or dead area on an image map	flow; phrasing	phrasing*	empty	globals; alt; coords; shape; href; target; download; ping; rel; referrerpolicy	HTMLAreaElement
article	Self-contained syndicatable or reusable composition	flow; sectioning; palpable	flow	flow	globals	HTMLElement
aside	Sidebar for tangentially related content	flow; sectioning; palpable	flow	flow	globals	HTMLElement
audio	Audio player	flow; phrasing; embedded; interactive; palpable*	phrasing	source*; track*; transparent*	globals; src; crossorigin; preload; autoplay; loop; muted; controls	HTMLAudioElement
b	Keywords	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
base	Base URL and default target browsing context for hyperlinks and forms	metadata	head	empty	globals; href; target	HTMLBaseElement
bdi	Text directionality isolation	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
bdo	Text directionality formatting	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
blockquote	A section quoted from another source	flow; sectioning root; palpable	flow	flow	globals; cite	HTMLQuoteElement
body	Document body	sectioning root	html	flow	globals; onafterprint; onbeforeprint; onbeforeunload; onhashchange; onlanguagechange; onmessage; onmessageerror; onoffline; ononline; onpagehide; onpageshow; onpopstate; onrejectionhandled; onstorage; onunhandledrejection; onunload	HTMLBodyElement
br	Line break, e.g. in poem or postal address	flow; phrasing	phrasing	empty	globals	HTMLBRElement
button	Button control	flow; phrasing; interactive; listed; labelable; submittable; form-associated; palpable	phrasing	phrasing*	globals; autofocus; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; name; type; value	HTMLButtonElement
canvas	Scriptable bitmap canvas	flow; phrasing; embedded; palpable	phrasing	transparent	globals; width; height	HTMLCanvasElement
caption	Table caption	none	table	flow*	globals	HTMLTableCaptionElement
cite	Title of a work	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
code	Computer code	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
col	Table column	none	colgroup	empty	globals; span	HTMLTableColElement
colgroup	Group of columns in a table	none	table	col*; template*	globals; span	HTMLTableColElement
data	Machine-readable equivalent	flow; phrasing; palpable	phrasing	phrasing	globals; value	HTMLDataElement
datalist	Container for options for combo box control	flow; phrasing	phrasing	phrasing*; option*; script-supporting elements*	globals	HTMLDataListElement
dd	Content for corresponding dt element(s)	none	dl; div*	flow	globals	HTMLElement
del	A removal from the document	flow; phrasing*	phrasing	transparent	globals; cite; datetime	HTMLModElement
details	Disclosure control for hiding details	flow; sectioning root; interactive; palpable	flow	summary*; flow	globals; open	HTMLDetailsElement
dfn	Defining instance	flow; phrasing; palpable	phrasing	phrasing*	globals	HTMLElement
dialog	Dialog box or window	flow; sectioning root	flow	flow	globals; open	HTMLDialogElement
div	Generic flow container, or container for name-value groups in dl elements	flow; palpable	flow; dl	flow	globals	HTMLDivElement
dl	Association list consisting of zero or more name-value groups	flow; palpable	flow	dt*; dd*; div*; script-supporting elements	globals	HTMLDListElement
dt	Legend for corresponding dd element(s)	none	dl; div*	flow*	globals	HTMLElement
em	Stress emphasis	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
embed	Plugin	flow; phrasing; embedded; interactive; palpable	phrasing	empty	globals; src; type; width; height; any*	HTMLEmbedElement
fieldset	Group of form controls	flow; sectioning root; listed; form-associated; palpable	flow	legend*; flow	globals; disabled; form; name	HTMLFieldSetElement
figcaption	Caption for figure	none	figure	flow	globals	HTMLElement
figure	Figure with optional caption	flow; sectioning root; palpable	flow	figcaption*; flow	globals	HTMLElement
footer	Footer for a page or section	flow; palpable	flow	flow*	globals	HTMLElement
form	User-submittable form	flow; palpable	flow	flow*	globals; accept-charset; action; autocomplete; enctype; method; name; novalidate; target	HTMLFormElement
h1, h2, h3, h4, h5, h6	Section heading	flow; heading; palpable	hgroup; flow	phrasing	globals	HTMLHeadingElement
head	Container for document metadata	none	html	metadata content*	globals	HTMLHeadElement
header	Introductory or navigational aids for a page or section	flow; palpable	flow	flow*	globals	HTMLElement
hgroup	heading group	flow; heading; palpable	flow	One or more h1, h2, h3, h4, h5, h6, and template	globals	HTMLElement
hr	Thematic break	flow	flow	empty	globals	HTMLHRElement
html	Root element	none	none*	head*; body*	globals; manifest	HTMLHtmlElement
i	Alternate voice	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
iframe	Nested browsing context	flow; phrasing; embedded; interactive; palpable	phrasing	empty	globals; src; srcdoc; name; sandbox; allowfullscreen; allowpaymentrequest; allowusermedia; width; height; referrerpolicy	HTMLIFrameElement
img	Image	flow; phrasing; embedded; interactive*; form-associated; palpable	phrasing; picture	empty	globals; alt; src; srcset; crossorigin; usemap; ismap; width; height; decoding; referrerpolicy	HTMLImageElement
input	Form control	flow; phrasing; interactive*; listed; labelable; submittable; resettable; form-associated; palpable*	phrasing	empty	globals; accept; alt; autocomplete; autofocus; checked; dirname; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; height; list; max; maxlength; min; minlength; multiple; name; pattern; placeholder; readonly; required; size; src; step; type; value; width	HTMLInputElement
ins	An addition to the document	flow; phrasing*; palpable	phrasing	transparent	globals; cite; datetime	HTMLModElement
kbd	User input	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
label	Caption for a form control	flow; phrasing; interactive; palpable	phrasing	phrasing*	globals; for	HTMLLabelElement
legend	Caption for fieldset	none	fieldset	phrasing	globals	HTMLLegendElement
li	List item	none	ol; ul; menu*	flow	globals; value*	HTMLLIElement
link	Link metadata	metadata; flow*; phrasing*	head; noscript*; phrasing*	empty	globals; href; crossorigin; rel; as; media; hreflang; type; sizes; referrerpolicy; integrity	HTMLLinkElement
main	Container for the dominant contents of the document	flow; palpable	flow*	flow	globals	HTMLElement
map	Image map	flow; phrasing*; palpable	phrasing	transparent; area*	globals; name	HTMLMapElement
mark	Highlight	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
MathML math	MathML root	flow; phrasing; embedded; palpable	phrasing	per [MATHML]	per [MATHML]	Element
menu	Menu of commands	flow; palpable*	flow	li; script-supporting elements	globals	HTMLMenuElement
meta	Text metadata	metadata; flow*; phrasing*	head; noscript*; phrasing*	empty	globals; name; http-equiv; content; charset	HTMLMetaElement
meter	Gauge	flow; phrasing; labelable; palpable	phrasing	phrasing*	globals; value; min; max; low; high; optimum	HTMLMeterElement
nav	Section with navigational links	flow; sectioning; palpable	flow	flow	globals	HTMLElement
noscript	Fallback content for script	metadata; flow; phrasing	head*; phrasing*	varies*	globals	HTMLElement
object	Image, nested browsing context, or plugin	flow; phrasing; embedded; interactive*; listed; submittable; form-associated; palpable	phrasing	param*; transparent	globals; data; type; typemustmatch; name; usemap; form; width; height	HTMLObjectElement
ol	Ordered list	flow; palpable*	flow	li; script-supporting elements	globals; reversed; start; type	HTMLOListElement
optgroup	Group of options in a list box	none	select	option; script-supporting elements	globals; disabled; label	HTMLOptGroupElement
option	Option in a list box or combo box control	none	select; datalist; optgroup	text*	globals; disabled; label; selected; value	HTMLOptionElement
output	Calculated output value	flow; phrasing; listed; labelable; resettable; form-associated; palpable	phrasing	phrasing	globals; for; form; name	HTMLOutputElement
p	Paragraph	flow; palpable	flow	phrasing	globals	HTMLParagraphElement
param	Parameter for object	none	object	empty	globals; name; value	HTMLParamElement
picture	Image	flow; phrasing; embedded	phrasing	source*; one img; script-supporting elements	globals	HTMLPictureElement
pre	Block of preformatted text	flow; palpable	flow	phrasing	globals	HTMLPreElement
progress	Progress bar	flow; phrasing; labelable; palpable	phrasing	phrasing*	globals; value; max	HTMLProgressElement
q	Quotation	flow; phrasing; palpable	phrasing	phrasing	globals; cite	HTMLQuoteElement
rp	Parenthesis for ruby annotation text	none	ruby	text	globals	HTMLElement
rt	Ruby annotation text	none	ruby	phrasing	globals	HTMLElement
ruby	Ruby annotation(s)	flow; phrasing; palpable	phrasing	phrasing; rt; rp*	globals	HTMLElement
s	Inaccurate text	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
samp	Computer output	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
script	Embedded script	metadata; flow; phrasing; script-supporting	head; phrasing; script-supporting	script, data, or script documentation*	globals; src; type; async; defer; crossorigin; integrity	HTMLScriptElement
section	Generic document or application section	flow; sectioning; palpable	flow	flow	globals	HTMLElement
select	List box control	flow; phrasing; interactive; listed; labelable; submittable; resettable; form-associated; palpable	phrasing	option; optgroup; script-supporting elements	globals; autocomplete; autofocus; disabled; form; multiple; name; required; size	HTMLSelectElement
slot	Shadow tree slot	flow; phrasing	phrasing	transparent	globals; name	HTMLSlotElement
small	Side comment	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
source	Image source for img or media source for video or audio	none	picture; video; audio	empty	globals; src; type srcset; sizes; media	HTMLSourceElement
span	Generic phrasing container	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLSpanElement
strong	Importance	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
style	Embedded styling information	metadata	head; noscript*	text*	globals; media;	HTMLStyleElement
sub	Subscript	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
summary	Caption for details	none	details	phrasing	globals	HTMLElement
sup	Superscript	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
SVG svg	SVG root	flow; phrasing; embedded; palpable	phrasing	per [SVG]	per [SVG]	SVGSVGElement
table	Table	flow; palpable	flow	caption*; colgroup*; thead*; tbody*; tfoot*; tr*; script-supporting elements	globals	HTMLTableElement
tbody	Group of rows in a table	none	table	tr; script-supporting elements	globals	HTMLTableSectionElement
td	Table cell	sectioning root	tr	flow	globals; colspan; rowspan; headers	HTMLTableCellElement
template	Template	metadata; flow; phrasing; script-supporting	metadata; phrasing; script-supporting; colgroup*	empty	globals	HTMLTemplateElement
textarea	Multiline text controls	flow; phrasing; interactive; listed; labelable; submittable; resettable; form-associated; palpable	phrasing	text	globals; autofocus; cols; dirname; disabled; form; maxlength; minlength; name; placeholder; readonly; required; rows; wrap	HTMLTextAreaElement
tfoot	Group of footer rows in a table	none	table	tr; script-supporting elements	globals	HTMLTableSectionElement
th	Table header cell	interactive*	tr	flow*	globals; colspan; rowspan; headers; scope; abbr	HTMLTableCellElement
thead	Group of heading rows in a table	none	table	tr; script-supporting elements	globals	HTMLTableSectionElement
time	Machine-readable equivalent of date- or time-related data	flow; phrasing; palpable	phrasing	phrasing	globals; datetime	HTMLTimeElement
title	Document title	metadata	head	text*	globals	HTMLTitleElement
tr	Table row	none	table; thead; tbody; tfoot	th*; td; script-supporting elements	globals	HTMLTableRowElement
track	Timed text track	none	audio; video	empty	globals; default; kind; label; src; srclang	HTMLTrackElement
u	Keywords	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
ul	List	flow; palpable*	flow	li; script-supporting elements	globals	HTMLUListElement
var	Variable	flow; phrasing; palpable	phrasing	phrasing	globals	HTMLElement
video	Video player	flow; phrasing; embedded; interactive; palpable	phrasing	source*; track*; transparent*	globals; src; crossorigin; poster; preload; autoplay; playsinline; loop; muted; controls; width; height	HTMLVideoElement
wbr	Line breaking opportunity	flow; phrasing	phrasing	empty	globals	HTMLElement`
.replace(/MathML\s+/g,'')
.replace(/SVG\s+/g,'');

var globalAttributes=`class
id
accesskey
autocapitalize
contenteditable
dir
draggable
hidden
inputmode
is
itemid
itemprop
itemref
itemscope
itemtype
lang
nonce
spellcheck
style
tabindex
title
translate`.replace(/\s*\r?\n/g,';');

var lines=source.split(/\r?\n/);


function escapeChar(simpleText){
    simpleText=''+simpleText;
    return !/^\w+$/.test(simpleText)?'"'+simpleText.replace(/["]/g,'\\"')+'"':simpleText;
}

var attrTypesDefs = [];
var attrTypes = {};

var output=lines.map(function(line){
    var [tags,description,category,parents,children,attributes,htmlinterface]=line.split(/\t/);
    var empty = children==="empty"
    return tags.split(/,\s*/).map(function(tag){
        if(/per\s+\[\w+\]/.test(attributes)){
            return null;
        }
        if(htmlinterface=='HTMLElement'){
            return ;
        }
        var attrTypeName='Attr4'+htmlinterface;
        if(!(attrTypeName in attrTypes)){
            var attrList = (attributes.replace(/globals(\s*;\s*|$)/,'$1')).split(/[*\s \t]*;\s*/).filter(function(attribute){
                return true // !attribute.trim();
            });
            var def='export interface '+attrTypeName+' extends Attr4HTMLElement {'+attrList.map(function(attribute){ 
                attribute=attribute.replace('*','')
                if(!attribute){
                    return null;
                }
                return escapeChar(attribute)+'?:any,';
            }).join('')+'}\n';
            attrTypesDefs.push(def)
            attrTypes[attrTypeName]=def;
        }
        return tag+"(opts"+(!empty?"OrContent":"")+"?:"+attrTypeName+"|Content"+
            (!empty?', content?:Content':'')+'){ return indirect("'+tag+'", '+(!empty?'optsOrContent, content':'opts')+')'+
            ' as HtmlTag<'+htmlinterface+'>'+
            '; },\n';
    }).join('');
}).join('')

fs.writeFile('tagInterfaces.data',output);
fs.writeFile('attrTypes.data',attrTypesDefs.join(''));