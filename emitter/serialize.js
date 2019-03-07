const create = Object.create.bind(Object, null)

export default function serialize (form) {
  const data = create()

  form.forEach(set, data)

  return data
}

function set (value, name) {
  this[name] = value
}
