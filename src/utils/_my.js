//内容安全校验
// 2088431237205959
/**
 * 文本风险识别
 * @param {*} config 
 * @param {*} success 
 * @param {*} fail 
 * @param {*} complete 
 */
export function textRiskIdentification(config, success, fail, complete) {
  my.textRiskIdentification({
    content: config.content,
    type: config.type || ['1', '2', '3'],
    success: resp => {
      // 权重设置 
      // 1 涉政 60
      // 2 涉黄 70
      // 3 低俗 75
      let pass = true;
      let msg = ""
      console.log(resp)
      for (const ite of resp.result) {
        if (!pass) break;
        switch (ite.type) {
          case "1":
            if (+ite.score > 60) {
              pass = false;
              msg = "输入信息涉及政治敏感信息"
            }
            break;
          case "2":
            if (+ite.score > 70) {
              pass = false;
              msg = "输入信息涉及黄色信息"
            }
            break;
          case "3":
            if (+ite.score > 75) {
              pass = false;
              msg = "输入信息涉及低俗辱骂信息"
            }
            break;
        }
      }
      if (pass) {
        success(resp)
      } else {
        fail({
          msg
        })
      }
    },
    fail,
    complete
  })
}
/**
 * 图片风险咨询
 * @param {*} config 
 * https://docs.alipay.com/mini/api/img_risk
 * https://docs.alipay.com/mini/api/ze6675
 */
export function imgRisk(config, success, fail, complete) {
  const { pid, appId, bizContext } = config
  my.ap.imgRisk({
    pid,
    appId,
    bizContext,
    success: function (e) {
      const timer = setTimeout(() => {
        my.ap.imgRiskCallback({
          pid,
          appId,
          bizContext: {
            risk_type: "img_risk_result",
            apply_id: JSON.parse(e.riskResult).apply_id
          },
          success: function (ev) {
            success({
              imgRisk: e,
              imgRiskCallback: ev
            })
          },
          fail,
          complete
        })
        clearTimeout(timer)
      }, 500)
    },
    fail,
    complete
  })
}
// 导航栏
// 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
/**
 * @desc 当前页面正跳转
 *  */
export function navigateTo(url, success, fail, complete) {
  my.navigateTo({
    url,
    success,
    fail,
    complete
  })
}
/**
 * @desc 关闭当前页面，返回上一级或多级页面
 * @param {*} url 
 * @param {*} success 
 * @param {*} fail 
 * @param {*} complete 
 */
export function navigateBack(delta) {
  my.navigateBack({ delta })
}
/**
 * @desc 跳转到指定 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {*} url 
 * @param {*} success 
 * @param {*} fail 
 * @param {*} complete 
 */
export function switchTab(url, success, fail, complete) {
  my.switchTab({
    url,
    success,
    fail,
    complete
  })
}
/**
 * @desc 设置导航栏文字及样式
 */
export function setNavigationBar(options) {
  my.setNavigationBar(options)
}
/**
 * @desc 显示导航栏 loading
 */
export function showNavigationBarLoading() {
  my.showNavigationBarLoading()
}
/**
 * @desc 隐藏导航栏 loading
 */
export function hideNavigationBarLoading() {
  my.hideNavigationBarLoading()
}
// 用户授权
export function getAuthCode(scopes, success, fail, complete) {
  my.getAuthCode({
    scopes,
    success,
    fail,
    complete
  })
}
/**
 * @desc 获取系统信息
 */
export function getSystemInfo(success, fail, complete) {
  my.getSystemInfo({
    success,
    fail,
    complete
  })
}
/**
 * @desc 获取系统信息_同步
 */
export function getSystemInfoSync() {
  return my.getSystemInfoSync()
}
// 获取会员信息
export function getAuthUserInfo(success, fail, complete) {
  my.getAuthUserInfo({
    success,
    fail,
    success
  })
}
/**
 * @desc 吐司
 * @param others 
 *    - type toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none’。其中 exception 类型必须传文字信息
 *    - duration 显示时长，单位为 ms，默认 2000
 *  */
export function showToast(content, success, fail, complete, others) {
  my.showToast({
    content,
    success,
    fail,
    complete,
    others
  })
}


// 根据选择器查找指定标签
export function find(selector) {
  const query = my.createSelectorQuery();
  return new Selector(query.select(selector));
}
export function query(selectAll) {
  const query = my.createSelectorQuery();
  return new Selector(query.selectAll(selectAll)) 
}
function Selector(selector) {
  this.selector = selector
}
Selector.prototype = {
  boundingClientRect: function (callback) {
    return this.selector.boundingClientRect().exec(callback)
  },
  scrollOffset: function(callback) {
    return this.selector.scrollOffset().exec(callback)
  }
}
// 画板
export function createCanvasContext(canvas) {
  return my.createCanvasContext(canvas)
}
// 动画
export function animation(options) {
  return my.createAnimation(options);
}