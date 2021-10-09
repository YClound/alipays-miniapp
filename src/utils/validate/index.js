import * as Rules from './rules'
import address from './address'

export default {
  ...address,
  validate (data, rules, cb) {
    let errors = []
    rules.forEach(function (rule) {
      let key = rule.key

      let value = data[key]

      let required = rule.required

      let validator = rule.validator ? Rules[rule.validator[0]] : null

      let validatorMsg = validator ? rule.validator[1] : ''

      let msg = rule.msg || `${key}:${value} is not valid`

      if (required && Rules.required(value)) {
        errors.push(msg)
      }

      if (validator && !validator(value)) {
        errors.push(validatorMsg)
      }
    })
    if (errors.length) {
      cb && cb(false, errors[0])
    } else {
      cb && cb(true)
    }
  }
}
