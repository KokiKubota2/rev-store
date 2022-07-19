const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

const FILE_EXT = '.jpeg'

module.exports = async (metadata, base64Url, endpoint) => {
  if (!base64Url) throw new Error('base64Url is invalid')
  if (!endpoint) throw new Error('endpoint is invalid')

  const fileName = `${uuidv4()}${FILE_EXT}`
  const path = `rev-store/${fileName}`

  try {
    const res = await axios.post(`${endpoint}/api/rev-store/sign`, {
      metadata: { ...metadata, path },
    })

    await axios.post(`${endpoint}/api/rev-store/upload`, { path, base64Url })

    return res.data.jwt
  } catch (e) {
    console.log(e)
    return null
  }
}
