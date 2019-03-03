# <a name="reference">anticore-serverless</a>

An utility to easily write and test your [anticore](https://github.com/Lcfvs/anticore)'s middlewares, serverless

## <a name="install">Install</a>

`npm i anticore-serverless

## <a name="live-demo">Live demo</a>

[anticore-serverless demo](https://stackblitz.com/edit/anticore-serverless)

## <a name="usage">Usage</a>

### <a name="listen-a-form-submit">Listen a form `submit`</a>

Supposing you have a middleware to add some new messages to a messages list, like this:

```js
import { anticore } from 'anticore'
import { one } from 'anticore/dom/query/one'
import { append } from 'anticore/dom/tree/append'

anticore.on('#messages li', (message, next) => {
  append(message, one('#messages'))
  next()
})
```

Register your templater like this:

```js
import serverless from 'anticore-serverless'

serverless.on('main#message-sender form', (url, data, escape) => {
  return `<ol id="messages">
    <li>${escape(data.message)}</li>
  </ol>`
})
```

### <a name="listen-an-anchor-click">Listen an anchor `click`</a>



Supposing you have a middleware to load a new view, like this:

```js
import { anticore } from 'anticore'
import { onClick } from 'anticore/dom/emitter/on/onClick'
import { one } from 'anticore/dom/query/one'
import { replace } from 'anticore/dom/tree/replace'


anticore.on('section.hello', (section, next) => {
  const main = one('main')

  replace(section, main)
  onClick(one('section .closer'), () => replace(main, section))

  next()
})
```

Register your templater like this:

```js
import serverless from 'anticore-serverless'

serverless.on('a[href="/say-hello"]', (url, escape) => {
  return `<section class="hello">
    <h1>Hello world</h1>
    <p>You asked the following url : ${escape(url)}</p>
    <button class="closer">Close</button>
  </section>`
})
```

## <a name="api">API</a>

```js
/**
* Listens a form/anchor selector and sends the response to anticore, based
* on the templater result
* @param {string} selector
* @param {function} templater
* @return {this}
*/
import serverless from 'anticore-serverless'

serverless.on(selector, templater)
```

## <a name="license">License</a>

[MIT](https://github.com/Lcfvs/anticore-serverless/blob/master/licence.md)
