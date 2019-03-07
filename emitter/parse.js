import { element } from 'anticore/dom/node/element'
import { fragment } from 'anticore/dom/node/fragment'
import { elements } from 'anticore/dom/query/elements'

export default function parse (data) {
  const body = element('body')

  body.innerHTML = data

  return fragment(elements(body))
}