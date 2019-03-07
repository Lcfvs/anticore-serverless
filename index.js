import { anticore } from 'anticore'
import { onClick } from 'anticore/dom/emitter/on/onClick'
import { onSubmit } from 'anticore/dom/emitter/on/onSubmit'
import { nodeName } from 'anticore/dom/info/nodeName'
import { global } from 'anticore/global'
import { a, form } from './emitter'

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
          const method = (element.method || 'get').toLowerCase()

          form[method](event, templater, element.action, new FormData(element))
        })
      } else {
        onClick(element, event => {
          a.get(event, element.href, templater)
        })
      }

      next()
    })

    return this
  }
}
