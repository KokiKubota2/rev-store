const { getStorage, ref, getDownloadURL } = require('firebase/storage')
const { getApps } = require('firebase/app')

const init = require('./init_firebase')
const verify = require('./verify')

module.exports = async (jwtStr, firebaseConfig) => {
  init(firebaseConfig)
  const app = getApps()
  console.log('download.js', app)

  const storage = getStorage()

  const metadata = await verify(jwtStr, firebaseConfig)

  const storageRef = ref(storage, metadata.path)
  const downloadUrl = await getDownloadURL(storageRef)

  return downloadUrl
}
