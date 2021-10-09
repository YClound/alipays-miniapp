// 地址管理相关

export default {

  /**
   * validate phone
   * @param phone
   * @returns {boolean}
   */
  validatePhone (value) {
    const re = /1\d{10}$/
    return re.test(value)
  },

  required (value) {
    return value != '' || value != undefined
  }
}
