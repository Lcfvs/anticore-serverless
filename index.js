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
          emit(event, templater(element.action, serialize(element), escape))
          element.reset()
        })
      } else {
        onClick(element, event => {
          emit(event, templater(element.href, escape))
        })
      }

      next()
    })

    return this
  }
}
