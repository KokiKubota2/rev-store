const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

const { getStorage, ref, uploadBytes } = require('firebase/storage')

const storage = getStorage()
const FILE_EXT = '.jpg'

module.exports = async (metadata, blob, url) => {
  const endpoint = `${url}/api/rev-store/sign`

  const fileName = `${uuidv4()}${FILE_EXT}`
  const path = `images/${fileName}`

  try {
    const res = await axios.post(endpoint, { metadata: { ...metadata, path } })

    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, blob, metadata)

    return res.data.jwt
  } catch (e) {
    console.log(e.code)
    return null
  }
}
