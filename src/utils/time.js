const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

export default {
  // 格式化日期
  formatDate(str, fmt) {
    var date = new Date(str);
    var o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  },
  /**
   * 倒计时-计算剩余时间
   * @params Number remainMs  毫秒
   * @return 01天09时14分
   */
  calRemainTime(remainMs) {
    let t = remainMs; //取得指定时间的总毫秒数
    let n = new Date().getTime(); //取得当前毫秒数
    let c = t - n; //得到时间差
    if (typeof remainMs !== "number") return "";
    if (c <= 60000) return "";
    let dayMs = 24 * 60 * 60 * 1000;
    let hourMs = 60 * 60 * 1000;
    let minuteMs = 60 * 1000;
    // let secondMs = 1000

    let remainDays = Math.floor(c / dayMs);
    let remainHours = Math.floor((c % dayMs) / hourMs);
    let remainMinutes = Math.floor(((c % dayMs) % hourMs) / minuteMs);
    // let remainSeconds = Math.floor(remainMs % dayMs % hourMs % minuteMs / secondMs)

    return (
      remainDays + " 天 " + (remainHours + " 时 ") + (remainMinutes + " 分 ")
    );
  },
  /**
   * 格式化倒计时毫秒
   * @param Number  value 总毫秒数
   * @return String result 格式化后的字符串
   */
  formatSeconds(value) {
    let t = value; //取得指定时间的总毫秒数
    let n = new Date().getTime(); //取得当前毫秒数
    let c = t - n; //得到时间差
    //w = (t - n)*1000;//得到时间差
    if (c <= 0) {
      //如果差小于等于0  也就是过期或者正好过期，则推出程序
      return "00:00:00:000"; //结束执行
    }
    let d = parseInt(c / 1000 / 60 / 60 / 24); //总毫秒除以一天的毫秒 得到相差的天数
    let h = parseInt(c / 1000 / 60 / 60 - 24 * d); //然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
    let m = parseInt(c / 1000 / 60 - 24 * 60 * d - 60 * h); //减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
    let s = parseInt(c / 1000 - 24 * 60 * 60 * d - 60 * 60 * h - 60 * m); //得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可
    let hm = Math.floor(
      c -
      24 * 60 * 60 * 1000 * d -
      60 * 60 * 1000 * h -
      60 * 1000 * m -
      s * 1000
    );
    if (hm < 0) {
      return "00:00:00:000"; //结束执行
    }
    if (hm < 100) {
      hm = "0" + hm;
    }
    if (hm < 10) {
      hm = "0" + hm;
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (m < 10) {
      m = "0" + m;
    }
    h = d * 24 + h;
    if (h < 10) {
      h = "0" + h;
    }
    return h + ":" + m + ":" + s + ":" + hm;
  },

  /**
   * 格式化倒计时秒
   * @param Number  value 总毫秒数
   * @return String  xx:xx:xx
   */
  formatBannerSeconds(value) {
    let c = value; //得到时间差
    if (c <= 0) {
      //如果差小于等于0  也就是过期或者正好过期，则推出程序
      return "00:00:00"; //结束执行
    }
    let d = parseInt(c / 1000 / 60 / 60 / 24); //总毫秒除以一天的毫秒 得到相差的天数
    let h = parseInt(c / 1000 / 60 / 60 - 24 * d); //然后取完天数之后的余下的毫秒数再除以每小时的毫秒数得到小时
    let m = parseInt(c / 1000 / 60 - 24 * 60 * d - 60 * h); //减去天数和小时数的毫秒数剩下的毫秒，再除以每分钟的毫秒数，得到分钟数
    let s = parseInt(c / 1000 - 24 * 60 * 60 * d - 60 * 60 * h - 60 * m); //得到最后剩下的毫秒数除以1000 就是秒数，再剩下的毫秒自动忽略即可
    // let  hm = Math.floor((c - (24 * 60 * 60 * 1000 * d) - (60 * 60 * 1000 * h) - (60 * 1000 * m) - (s * 1000)));
    if (s < 0) {
      return "00:00:00"; //结束执行
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (m < 10) {
      m = "0" + m;
    }
    h = d * 24 + h;
    if (h < 10) {
      h = "0" + h;
    }
    return h + ":" + m + ":" + s;
  },

  /**
   * @name 格式化时间文案
   * 5、时间显示规则：精度显示至年/月/日
    ·60钟内—x分钟前
    ·61分钟-当日24时-x小时前
    ·24时后，xxxx年x月x日 
  */
  formatTimeText(time) {
    const nowDate = +new Date();
    const formTime = +new Date(time);
    const timeDuration = nowDate - formTime;
    const formateDateTime = this.formatDate(formTime, 'yyyy-MM-dd');
    const formateDateDate = this.formatDate(nowDate, 'yyyy-MM-dd');

    // 60钟内
    if (timeDuration < ONE_HOUR) {
      return `${Math.ceil(timeDuration / ONE_MINUTE) || 1}分钟前`;
    } else if (formateDateTime !== formateDateDate) {
      return `${this.formatDate(formTime, 'yyyy-MM-dd')}`
    } else {
      return `${Math.ceil(timeDuration / ONE_HOUR)}小时前`;
    }
  }
};


