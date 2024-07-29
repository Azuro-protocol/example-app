const randomizeString = (length = 8) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '1234567890'
  const charset = letters + letters.toUpperCase() + numbers

  const randomCharacter = (array) =>
    array[Math.floor(Math.random() * array.length)]

  let R = ''

  for (let i = 0; i < length; i++) {
    R += randomCharacter(charset)
  }

  return R
}


export default randomizeString
