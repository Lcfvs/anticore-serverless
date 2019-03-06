import { anticore } from 'anticore'
import { onClick } from 'anticore/dom/emitter/on/onClick'
import { onSubmit } from 'anticore/dom/emitter/on/onSubmit'
import { nodeName } from 'anticore/dom/info/nodeName'
import emit from './utils/emit'
import escape from './utils/escape'
import serialize from './utils/serialize'

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
          const url = element.action

          emit(event, url, templater(url, serialize(element), escape))
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
