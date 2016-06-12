<!--multilang v0 es:LEEME.md en:README.md -->
# js-to-html

<!--lang:es-->

Crea texto y elementos HTML desde un objeto JS

<!--lang:en--]

Create HTML text from JS object

[!--lang:*-->

<!-- cucardas -->
![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![npm-version](https://img.shields.io/npm/v/js-to-html.svg)](https://npmjs.org/package/js-to-html)
[![downloads](https://img.shields.io/npm/dm/js-to-html.svg)](https://npmjs.org/package/js-to-html)
[![build](https://img.shields.io/travis/codenautas/js-to-html/master.svg)](https://travis-ci.org/codenautas/js-to-html)
[![coverage](https://img.shields.io/coveralls/codenautas/js-to-html/master.svg)](https://coveralls.io/r/codenautas/js-to-html)
[![climate](https://img.shields.io/codeclimate/github/codenautas/js-to-html.svg)](https://codeclimate.com/github/codenautas/js-to-html)
[![dependencies](https://img.shields.io/david/codenautas/js-to-html.svg)](https://david-dm.org/codenautas/js-to-html)
[![qa-control](http://codenautas.com/github/codenautas/js-to-html.svg)](http://codenautas.com/github/codenautas/js-to-html)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

<!--lang:es-->
## Instalación

<!--lang:en--]
## Install

[!--lang:*-->

```sh
$ npm install js-to-html
```

## API

### html.TAGNAME([attributes, ]content)
<!--lang:es-->

Devuelve un objeto HTML cuyo tagname es TAGNAME y que contiene los atributos y el contenido que corresponda. 

<!--lang:en--]
Returns an Html object with TAGNAME, attributes and content. 

<!--lang:es-->
**content** puede ser:
 * un *string* que corresponde a un contenido textual que no tiene elementos HTML internos (o sea solo texto)
 * un *array* con los elementos que contiene, estos elementos pueden ser:
   * una expresión *string*
   * un objeto Html

<!--lang:en--]

**content** could be
 * a string expression
 * an array of children. Each child could be
   * a string expression
   * an Html object

[!--lang:es-->

**attributes** debe ser un objeto plano (sin tipo). 
Cada propiedad del objeto será un atributo html (ejemplo:`{colspan:3,id:"abc"}`).
Algunos nombres de atributos son palabras reservadas, se pueden usar con el mismo nombre (ejemplo:`{'class':'ejemplos'}`).
Algunos atributos (como **class**) pueden contener listas (ejemplo: `{'class':['ejemplos','listas']}`).
   
<!--lang:en--]

**attributes** must be a plain object. Each property of the object will be an html attribute (example: `{colspan:3, id:"abc"}`). 
Some attributes names are reserved words, you can use them with the same name (example: `{class:'examples'}`). 
Some attributes (like **class**) could contain lists (example: `{class:['examples', 'lists']}`). 

[!--lang:*-->
### Html.toHtmlText(opts)

<!--lang:es-->
Devuelve un texto HTML

<!--lang:en--]
Returns an Html Text

<!--lang:es-->
opción  |valor
--------|-------
pretty  | devuelve un texto indentado

<!--lang:en--]
opt    |value
-------|-------
pretty | returns a pretty and indented text

[!--lang:es-->
## Ejemplo
<!--lang:en--]
## Example

[!--lang:*-->
```js
var html = require('js-to-html').html;

console.log(
    html.div(
        {'class':'the_class', id:'47'},
        [
            html.p('First paragraph'),
            html.p('Second paragraph'),
        ]
    ).toHtmlText({pretty:true})
)

/* logs:
<div class=the_class id=47>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>
*/
```

<!--lang:*-->
### Html.toHtmlDoc(opts)

<!--lang:es-->
Igual que `Html.toHtmlText(opts)` pero devuelve el `doctype` en la primera línea y completa con HTML, HEAD, BODY y TITLE:

<!--lang:en--]
Same as `Html.toHtmlText(opts)` but returns `doctype` in the first line and completes with con HTML, HEAD, BODY and TITLE elements:

[!--lang:*-->

```html
var html = require("js-to-html").html;

console.log(
    html.img({src:'photo.png'}).toHtmlDoc({title:"my photo", pretty:true})
)

/*
<!doctype html>
<html>
  <head>
    <title>my photo</title>
  </head>
  <body>
    <img src=photo.png>
  </body>
</html>
*/
```

<!--lang:es-->
opción     |valor
-----------|-------
pretty     | devuelve un texto indentado
incomplete | no completa con los tags html, head y body cuando corresponde
title      | el texto para el TAG title

<!--lang:en--]
opt        |value
-----------|-------
pretty     | returns a pretty and indented text
incomplete | do not complete with  html, head y body tags
title      | text title

<!--lang:es-->
## Usándolo en el navegador

Los objetos html tienen un método `create` que se usa para crear el elemento del DOM
listo para agregarlo (por ejemplo con `appendChild`) a cualqueir elemento existente. 
Además `create` crea también todos los elementos internos. 

<!--lang:en--]
## Using with DOM in client-side

All html objects have a `create` method that build a DOM Element ready to append to a existing one. 
`create` builds the element and inside elements too. 

[!--lang:*-->
```js
var html = jsToHtml.html;

document.body.appendChild(
    html.div([
        html.h1('Log in'),
        html.div([
            html.input({name: 'user', placeholder:'user'}),
            html.input({name: 'pass', type: 'password'})
        ])
    ]).create()
);
  
```

<!--lang:es-->
## Comportamiento especial

tipo     |nombre         |uso
---------|---------------|--------------
función  | html._text    | Introduce texto suelto (equivale a `createTextNode`)
función  | html._comment | Introduce un comentario (equivale a `< !-- ... -- >`)
atributo | classList     | para cargar una lista de nombres de clases (el módulo no acepta {"class": "una otra separada por espacio"} )

<!--lang:en--]
## Special behavior

type      |name           |use
----------|---------------|--------------
function  | html._text    | simple text (like `createTextNode`)
function  | html._comment | html comment (like `< !-- ... -- >`)
attribute | classList     | for a class name list (this module rejects class with spaces like {"class": "una otra separada por espacio"} )

[!--lang:es-->
## Modo inseguro
 * En modo inseguro permite ingresar código HTML proveniente de expresiones de texto

<!--lang:en--]
## Insecure mode

[!--lang:*-->

```js
html.insecureModeEnabled = true;
console.log(html.div({id:'this'}, html.includeHtml('<svg xml:....> </svg>')));
```
 
<!--lang:es-->
## Notas
 * En el futuro será inteligente manejar el atributo **style** como `{style:{color: "blue", background: "none"}}`

<!--lang:en--]
## Notes
 * In the future it will be smart to handle **style** attribute like `{style:{color: "blue", background: "none"}}`

[!--lang:es-->
## Pruebas en dispositivos reales

<!--lang:en--]
## Tests with real devices

[!--lang:*-->

NPM version |Device                 |OS             |nav                      |obs
------------|-----------------------|---------------|-------------------------|----
0.9.1       | Samsung Galaxy Note 4 | Android 6.0.1 | Chrome Mobile 44.0.2403 |
0.9.1       | Blue Vivo Air LTE     | Android 5.0.2 | Chrome Mobile 50.0.2661 |
0.9.1       | Samsung Galaxy S3     | Android 4.3.0 | Android 4.3.0           |
0.9.1       | HTC Desire            | Android 2.2.2 | Android 2.2.2           | polyfill:classList
0.9.1       | iPad mini Retina      | iOS 8.4.0     | Mobile Safari 8.0.0     |
0.9.1       | VMWare                | WinXP         | IE 8.0.0                | polyfill:many
 
<!--lang:es-->

## Licencias

<!--lang:en--]
## License

[!--lang:*-->

[MIT](LICENSE)
