import time from './time';
import format from './format';
import validate from './validate';

// 自定义跳转方式，支持跳转其他小程序以及H5页面
export const customNavigate = url => {
  if (!url) return;
  if(['/pages/home/index', '/pages/category/index', '/pages/shopping-cart/index', '/pages/personal-center/index'].includes(url)) {
    my.switchTab({ url});
  }else if (url.indexOf('/pages') === 0 || url.indexOf('dynamic-plugin') === 0) {
    my.navigateTo({ url });
  } else {
    const prefix = 'https://render.alipay.com/p/s/i/?scheme=';
    my.ap.navigateToAlipayPage({
      path: url.indexOf(prefix) === 0 ? url : prefix + url,
    });
  }
};

export default {
  ...time,
  ...format,
  ...validate,
};
