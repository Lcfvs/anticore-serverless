const create = Object.create.bind(Object, null)

let session = create()

export default {
  get (name) {
    return session[name]
  },
  set (name, value) {
    session[name] = value

    return this
  },
  reset () {
    session = create()

    return this
  }
}
