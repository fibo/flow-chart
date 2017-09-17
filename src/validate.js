const validator = require('is-my-json-valid')
const schema = require('./schema.json')

const validate = validator(schema)

// TODO check ids are unique.
module.exports = validate
