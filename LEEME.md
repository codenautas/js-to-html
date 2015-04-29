<!-- multilang from README.md




NO MODIFIQUE ESTE ARCHIVO. FUE GENERADO AUTOMÁTICAMENTE POR multilang.js




-->
# js-to-html
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]
language: ![English](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-en.png)
also available in:
[![Spanish](https://raw.githubusercontent.com/codenautas/multilang/master/img/lang-es.png)](LEEME.md)
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

[npm-image]: https://img.shields.io/npm/v/js-to-html.svg?style=flat
[npm-url]: https://npmjs.org/package/js-to-html
[travis-image]: https://img.shields.io/travis/codenautas/js-to-html/master.svg?label=linux&style=flat
[travis-url]: https://travis-ci.org/codenautas/js-to-html
[appveyor-image]: https://img.shields.io/appveyor/ci/emilioplatzer/js-to-html/master.svg?label=windows&style=flat
[appveyor-url]: https://ci.appveyor.com/project/emilioplatzer/js-to-html
[coveralls-image]: https://img.shields.io/coveralls/codenautas/js-to-html/master.svg?style=flat
[coveralls-url]: https://coveralls.io/r/codenautas/js-to-html
[downloads-image]: https://img.shields.io/npm/dm/js-to-html.svg?style=flat
[downloads-url]: https://npmjs.org/package/js-to-html
