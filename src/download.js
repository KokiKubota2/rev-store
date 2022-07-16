const { getStorage, ref, getDownloadURL } = require('firebase/storage')

const verify = require('./verify')
const init = require('./init_firebase')

module.exports = async (jwtStr, firebaseConfig) => {
  init(firebaseconfig)

  const storage = getStorage()
  const metadata = await verify(jwtStr, firebaseConfig)
  const storageRef = ref(storage, metadata.path)

  const downloadUrl = await getDownloadURL(storageRef)

  return downloadUrl
}
