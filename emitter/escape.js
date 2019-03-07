import { element } from 'anticore/dom/node/element'
import { text } from 'anticore/dom/node/text'
import { append } from 'anticore/dom/tree/append'
import { html } from 'anticore/dom/tree/html'

const div = element('div')

/**
 * Escapes the HTML entities
 * @param {*&string} data
 * @return {string}
 */
export default function escape (data) {
  html(div, '')
  append(text(data.toString(10)), div)

  return html(div)
}