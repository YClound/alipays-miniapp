import SLStat from '/utils/SLStat'
import Utils from '/utils'

App(
  SLStat.$App({
    CONSTANTS: {
      domain: '', // 开发
      atk: '',
      userInfo: undefined,
      authAppId: '', // 当前运行小程序AppID
      version: '1.0.0',
    },

    channel: '1003', // 默认渠道

    /**
     * APP工具方法集$utils挂载
     */
    $utils: Utils,

    onLaunch({query, referrerInfo, scene}) {

    },

    onPageNotFound(res) {
     
    },

  })
)
