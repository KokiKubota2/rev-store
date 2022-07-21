const axios = require('axios')

const verify = require('./verify')

module.exports = async (jwtStr, bucketName, endpoint) => {
  if (!jwtStr) throw new Error('jwtStr is invalid')
  if (!endpoint) throw new Error('endpoint is invalid')

  const metadata = await verify(jwtStr, endpoint)

  if (_.isNull(metadata)) throw new Error('invalid signature')

  const res = await axios.post(`${endpoint}/api/rev-store/download`, {
    bucketName,
    path: metadata.path,
  })

  return res.data.url
}
