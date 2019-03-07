import { global } from 'anticore/global'

const URL = global().URL
const URLSearchParams = global().URLSearchParams

export default function resolve (url, form) {
  if (!form) {
    return new URL(url)
  }

  const params = new URLSearchParams(form).toString()
  const result = new URL(url)

  if (!params.length) {
    return result
  }

  if (!result.search.length) {
    result.search = params

    return result
  }

  result.search = result.search.concat('&', params)

  return result
}
