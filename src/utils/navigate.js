const app = getApp();

// 跳转到支付宝卡包页面
export const openAliVoucherList = () => {
  my.openVoucherList();
}

// 跳转到支付宝卡包页面
export const goToMiniService = (partnerId, templatedId) => {
  if (!partnerId || !templatedId) { return; }

  my.navigateToMiniService({
    serviceId: "2019072365974237", // 插件id,固定值勿改
    servicePage: "pages/hz-enjoy/main/index", // 插件页面地址,固定值勿改
    extraData: {
      "alipay.huabei.hz-enjoy.partnerId": partnerId, // 商户id, 必填, 需替换
      "alipay.huabei.hz-enjoy.templateId": templatedId, // 芝麻GO模版id, 必填, 需替换
    },
    success: (res) => {
      // 插件打开成功回调
    },
    fail: (res) => {
      // 插件打开失败回调
    }
  });
}