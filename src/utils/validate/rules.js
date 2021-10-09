export default {
  /**
   * validate phone
   * @param phone
   * @returns {boolean}
   */
  validatePhone (value) {
    return /^1\d{10}$/.test(value)
  },

  /**
   * validate number
   * @param number(Int or float)
   * @returns {boolean}
   */
  validateNumber (value) {
    const reg = /^[0-9]+\.?[0-9]*$/
    return reg.test(value)
  },

  /**
   * 价格校验
   */
  validateCommonPrice (value) {
    if (isNaN(parseFloat(value)) || typeof parseFloat(value) !== 'number') return false
    return true
  },
  
  /**
   * validate Int
   * @param Int
   * @returns {boolean}
   */
  validateInt (value) {
    const reg = /^[0-9]\d*$/
    return reg.test(value)
  },

  /**
   * validate is null
   * @param string number
   * @returns {boolean}
   */
  required (value) {
    return value === null || value === undefined || !value.toString()
  }
}
