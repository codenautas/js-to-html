# js-to-html

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![Test Coverage][coveralls-image]][coveralls-url]

## Install

```sh
$ npm install js-to-html
```

## API

### html.TAGNAME([attributes, ]content)

Returns a Html object with TAGNAME, attributes and content. 

**content** could be
 * a string expression
 * an array of children, each child could be
   * a string expression
   * a Html object

**attributes** must be a plain object, each property of the object will be a html attribute (example: `{colspan:3, id:"abc"}`). 
Some attributes names are reserved words, you can use it with the same name (example: `{class:'examples'}`). 
Some attributes (like **class**) could contain lists (example: `{class:['examples', 'lists']}`). 
   
### Html.toHtmlText(opts)

Returns the Html Text

opt  | value
-----|-------
pretty | returns a pretty and indented text

## Example

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

## Notes
 * In the future it will smart handle style attribute like `{style:{color: "blue", background: "none"}}`

## License

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
