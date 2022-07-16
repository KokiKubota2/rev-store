const _ = require('lodash')
const { getApps, initializeApp } = require('@firebase/app')

module.exports = (firebaseConfig) => {
  let app
  if (_.isEmpty(getApps())) app = initializeApp(firebaseConfig)

  return app
}
