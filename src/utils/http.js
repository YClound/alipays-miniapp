function formatUrl(url, domain) {
  return url.indexOf('://') > -1
    ? url
    : url.startsWith('/')
    ? domain + url
    : domain + '/' + url;
}

function formatOptions(options) {
  const app = getApp();
  const { domain, authAppId } = app.CONSTANTS;
  const tokenInfo = my.getStorageSync({
    key: 'tokenInfo',
  }).data;
  const token = app.CONSTANTS.atk || (tokenInfo ? tokenInfo.token : null);
  const {
    api = 'request',
    url,
    headers,
    success = response => (response.data ? response.data : response),
    fail,
    complete,
    ...restOptions
  } = options;

  return {
    api,
    success,
    fail,
    complete,
    restOptions: {
      ...restOptions,
      url: formatUrl(url, domain),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'forwardUrl': 'http://10.1.8.59:8088',
        // 'forwardUrl': 'http://10.1.8.204:8088',
        token,
        authAppId,
        ...headers,
      },
    },
  };
}

let isRedirected = false

export function request(options) {
  const { api, url, success, fail, complete, restOptions } =
    formatOptions(options);

  my.showNavigationBarLoading();

  return new Promise((resolve, reject) => {
    my[api]({
      url,
      success: async res => {
        if ([1003, 1002].includes(res.data.code)) {
          const app = getApp()
          await app.authHandler()
          reject(res)
        } else if([1014, 1015].includes(res.data.code)) {
          const pages = getCurrentPages()
          if (!isRedirected) {
            my.redirectTo({
              url: '/pages/404/index?code=' + res.data.code
            })
            isRedirected = true
          }
          reject(res)
        } else {
          isRedirected = false
          resolve(res)
        }
      },
      fail: reject,
      complete: response => {
        my.hideNavigationBarLoading();
        complete && complete(response);
      },
      ...restOptions,
    });
  })
    .then(data => (typeof success === 'function' ? success(data) : data))
    .catch(err => {
      if (typeof fail === 'function') return fail(err);
      throw err;
    });
}

export function get(url, data, options) {
  return request({ url, data, ...options });
}

export function post(url, data, options) {
  return request({ url, data, method: 'POST', ...options });
}

export function upload(url, filePath, options) {
  const app = getApp();
  return request({
    api: 'uploadFile',
    url,
    fileType: 'image',
    fileName: 'file',
    filePath,
    success: response => {
      // token 过期
      if (response.data && response.data.code === 1002) {
        // 设置标识符，在 index 页根据标识符重新获取 token
        app.CONSTANTS.tokenExpired = true;
        my.showToast({
          content: '页面停留时间过长，请重试',
        });
        throw response;
      } else {
        return JSON.parse(response.data);
      }
    },
    ...options,
  });
}
