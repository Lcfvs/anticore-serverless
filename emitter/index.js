import { anticore } from 'anticore'
import { prevent } from 'anticore/dom/emitter/prevent'
import escape from './escape'
import parse from './parse'
import resolve from './resolve'
import serialize from './serialize'
import session from './session'

function emit (event, url, data) {
  prevent(event)
  anticore.populate(parse(data), true, url)
}

export const a = {
  get (event, url, templater) {
    emit(event, url, templater(url, escape, session))
  }
}

export const form = {
  get (event, templater, url, data) {
    const resolved = resolve(url, data)

    emit(event, resolved, templater(resolved, null, escape, session))
  },
  post (event, templater, url, data) {
    const serialized = serialize(data)

    emit(event, url, templater(url, serialized, escape, session))
  }
}
