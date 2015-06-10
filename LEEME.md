<!-- multilang from README.md




NO MODIFIQUE ESTE ARCHIVO. FUE GENERADO AUTOMÁTICAMENTE POR multilang.js




-->
# js-to-html

![extending](https://img.shields.io/badge/stability-extending-orange.svg)
[![version](https://img.shields.io/npm/v/js-to-html.svg)](https://npmjs.org/package/js-to-html)
[![downloads](https://img.shields.io/npm/dm/js-to-html.svg)](https://npmjs.org/package/js-to-html)
[![linux](https://img.shields.io/travis/codenautas/js-to-html/master.svg)](https://travis-ci.org/codenautas/js-to-html)
[![coverage](https://img.shields.io/coveralls/codenautas/js-to-html/master.svg)](https://coveralls.io/r/codenautas/js-to-html)
[![climate](https://img.shields.io/codeclimate/github/codenautas/js-to-html.svg)](https://codeclimate.com/github/codenautas/js-to-html)
[![dependencies](https://img.shields.io/david/codenautas/js-to-html.svg)](https://david-dm.org/codenautas/js-to-html)

<!--multilang buttons-->

idioma: ![castellano](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)
también disponible en:
[![inglés](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)](README.md)

## Instalación


```sh
$ npm install js-to-html
```

## API

### html.TAGNAME([attributes, ]content)

Devuelve un objeto HTML cuyo tagname es TAGNAME y que contiene los atributos y el contenido que corresponda. 

**content** puede ser:
 * un *string* que corresponde a un contenido textual que no tiene elementos HTML internos (o sea solo texto)
 * un *array* con los elementos que contiene, estos elementos pueden ser:
   * una expresión *string*
   * un objeto Html

**attributes** debe ser un objeto plano (sin tipo). Cada propiedad del objeto será un atributo html (ejemplo:`{colspan:3,id:"abc"}`).
Algunos nombres de atributos son palabras reservadas, se pueden usar con el mismo nombre (ejemplo:`{'class':'ejemplos'}`).
Algunos atributos (como **class**) pueden contener listas (ejemplo: `{'class':['ejemplos','listas']}`).
   
### Html.toHtmlText(opts)

Devuelve un texto HTML

opción  | valor
-----|-------
pretty | devuelve un texto indentado

## Ejemplo

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
)
```

## Notas
 * En el futuro será inteligente manejar el atributo **style** como `{style:{color: "blue", background: "none"}}`

## Licencias


[MIT](LICENSE)
