const test = require('tape')
const validator = require('is-my-json-valid')

const schema = require('../src/schema.json')
const demo = require('../src/examples/demo.json')

const validate = validator(schema)

test('Validate JSON schema', (t) => {
  t.ok(validate(demo), 'demo.json')

  t.end()
})

