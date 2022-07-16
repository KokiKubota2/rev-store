const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

const { getStorage, ref, uploadBytes } = require('firebase/storage')

const init = require('./init_firebase')

const FILE_EXT = '.jpg'

module.exports = async (metadata, blob, url, firebaseconfig) => {
  const endpoint = `${url}/api/rev-store/sign`

  const fileName = `${uuidv4()}${FILE_EXT}`
  const path = `images/${fileName}`

  try {
    init(firebaseconfig)
    const storage = getStorage()

    const res = await axios.post(endpoint, { metadata: { ...metadata, path } })

    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, blob, metadata)

    return res.data.jwt
  } catch (e) {
    console.log(e.code)
    return null
  }
}
