const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { getStorage, ref, uploadBytes } = require('firebase/storage')
const { getApps } = require('firebase/app')

const init = require('./init_firebase')

const FILE_EXT = '.jpg'

module.exports = async (metadata, blob, endpoint, firebaseConfig) => {
  const fileName = `${uuidv4()}${FILE_EXT}`
  const path = `rev-store/${fileName}`

  try {
    init(firebaseConfig)
    const app = getApps()
    console.log('upload.js', app)

    const storage = getStorage()

    const res = await axios.post(`${endpoint}/api/rev-store/sign`, {
      metadata: { ...metadata, path },
    })

    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, blob, metadata)

    return res.data.jwt
  } catch (e) {
    console.log(e)
    return null
  }
}
