const test = require('tape')

const validate = require('../src/validate')
const demo = require('../src/examples/demo.json')

test('Validate JSON schema', (t) => {
  t.ok(validate(demo), 'demo.json')

  t.end()
})

