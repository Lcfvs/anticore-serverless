import { anticore } from 'anticore'
import { prevent } from 'anticore/dom/emitter/prevent'
import parse from './parse'

export default function emit (event, url, data) {
  prevent(event)
  anticore.populate(parse(data), true, url)
}
