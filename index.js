import { anticore } from 'anticore'
import { onClick } from 'anticore/dom/emitter/on/onClick'
import { onSubmit } from 'anticore/dom/emitter/on/onSubmit'
import { prevent } from 'anticore/dom/emitter/prevent'
import { nodeName } from 'anticore/dom/info/nodeName'
import escape from './utils/escape'
import parse from './utils/parse'
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
          prevent(event)
          anticore.populate(parse(templater(serialize(element), escape)))
          element.reset()
        })
      } else {
        onClick(element, event => {
          prevent(event)
          anticore.populate(parse(templater(element.href, escape)))
        })
      }

      next()
    })

    return this
  }
}
