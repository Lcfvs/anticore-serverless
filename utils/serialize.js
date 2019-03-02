const create = Object.create.bind(Object, null)

export default function serialize (form) {
  const data = create()

  new FormData(form).forEach(set, data)

  return data
}

function set (value, name) {
  this[name] = value
}