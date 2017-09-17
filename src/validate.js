import validator from 'is-my-json-valid'
import schema from './schema.json'

const validate = validator(schema)

// TODO check ids are unique.
export default validate
