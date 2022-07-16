const _ = require('lodash')
const { getApps, initializeApp } = require('@firebase/app')

module.exports = (firebaseConfig) => {
  if (_.isEmpty(getApps())) return initializeApp(firebaseConfig)
}
