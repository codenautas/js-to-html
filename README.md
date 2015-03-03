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

### jsToHtml(object)

Create a jsToHtml.Internal object that contains the data

### internal.toHtml(opt)

Returns the Html Text

opt  | value
-----|-------
pretty | returns a pretty and indented text

### jsToHtml.testing

Enter testing mode (for access internal property).

### internal.internal

Returns the internal object for test purposes


## Example

```js
var jsToHtml = require('js-to-html');

console.log(
    jsToHtml({
        tagName:'div',
        attributes:{'class':'the_class', id:'47'},
        content:[
            {tagName: 'p', textContent: 'First paragraph'},
            {tagName: 'p', textContent: 'Second paragraph'},
        ]
    }).toHtml({pretty:true})
)

/* logs:
<div class=the_class id=47>
  <p>First paragraph</p>
  <p>Second paragraph</p>
</div>
)
```

## Notes

* Do not use in production enviroments. Do not escape text yet!

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
