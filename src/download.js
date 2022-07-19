const axios = require('axios')

const verify = require('./verify')

module.exports = async (jwtStr, expires, endpoint) => {
  if (!jwtStr) throw new Error('jwtStr is invalid')
  if (!endpoint) throw new Error('endpoint is invalid')

  const metadata = await verify(jwtStr, endpoint)

  if (_.isNull(metadata)) throw new Error('invalid signature')

  const res = await axios.post(`${endpoint}/api/rev-store/download`, {
    path: metadata.path,
    expires,
  })

  return res.data.downloadUrl
}
