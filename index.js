import { anticore } from 'anticore'
import { onClick } from 'anticore/dom/emitter/on/onClick'
import { onSubmit } from 'anticore/dom/emitter/on/onSubmit'
import { nodeName } from 'anticore/dom/info/nodeName'
import { global } from 'anticore/global'
import emit from './utils/emit'
import escape from './utils/escape'
import resolve from './utils/resolve'
import serialize from './utils/serialize'

const FormData = global().FormData

export default {
  /**
   * Listens a form/anchor selector and sends the response to anticore, based
   * on the templater result
   * @param {string} selector
   * @param {function} templater
   * @return {this}
   */
  on (selector, templater) {
    anticore.on(selector, (element, next) => {
      if (nodeName(element) === 'form') {
        onSubmit(element, event => {
          let url = element.action
          let data = new FormData(element)

          if (element.method.toString().toLowerCase() === 'post') {
            data = serialize(data)
          } else {
            data = null
            url = resolve(url, data)
          }

          emit(event, url, templater(url, data, escape))
        })
      } else {
        onClick(element, event => {
          const url = element.href

          emit(event, url, templater(url, escape))
        })
      }

      next()
    })

    return this
  }
}
