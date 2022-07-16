const jwt = require('jsonwebtoken')
const { getFirestore, getDoc, doc } = require('firebase/firestore')

const db = getFirestore()

module.exports = async (jwtStr) => {
  const configPublic = await getDoc(doc(db, 'config/public')).then((s) =>
    s.data()
  )

  const { key } = configPublic.api

  try {
    const decoded = await jwt.verify(jwtStr, Buffer.from(key, 'base64'), {
      algorithms: ['RS256'],
    })

    return decoded
  } catch (e) {
    console.log(e)
    return null
  }
}