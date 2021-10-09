
// 格式化金额 1000,00.00
export function formatMoney(money) {
  if (money) {
    var str = money.toString().indexOf('.') > -1 ? money.toString() : money.toFixed(2) + ''
    // var intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',') // 取到整数部分
    // var dot = str.substring(str.length, str.indexOf('.')) // 取到小数部分搜索
    // var ret = intSum + dot
    return str
  } else if (money == 0) {
    return '0.00'
  } else {
    return ''
  }
}


/**
 * 格式化class
 * @param {*} cn1 
 * @param {*} cn2 
 * @param {*} cn3 
 * @returns 
 */
const objToStr = function (obj) {
  let str = ""
  const toString = Object.prototype.toString;
  if (obj === undefined || obj === null) return ""
  else if (toString.call(obj) === "[object Object]") {
    for (const key in obj) {
      str += obj[key] ? (key + " ") : ""
    }
  } else {
    str = obj + " "
  }
  return str
}

export function classNames(cn1, cn2, cn3) {
  let className = ""
  className += objToStr(cn1)
  className += objToStr(cn2)
  className += objToStr(cn3)
  return (className.replace(/(\s){2,}/g, "$1")).replace(/\s{1,}$/, "")
}
