const randomString = (length) => {
  let result = ''

  while (result.length < length) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26))
  }

  return result
}

export default randomString
