const { getStorage, ref, getDownloadURL } = require('firebase/storage')

const verify = require('./verify')

const storage = getStorage()

module.exports = async (jwtStr) => {
  const metadata = await verify(jwtStr)
  const storageRef = ref(storage, metadata.path)

  const downloadUrl = await getDownloadURL(storageRef)

  return downloadUrl
}
