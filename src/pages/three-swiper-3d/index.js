Page({
  data() {
    return {
      swiperList: [1, 2, 3],
      active: 1,
      prev: 0,
    }
  },
  onLoad(query) {
    setInterval(() => {
      const { active } = this.data
      const curActive = active >= 2 ? 0 : (active + 1);
      const curPrev = curActive - 1 < 0 ? 2 : (curActive - 1);
      this.setData({ active: curActive, prev: curPrev })
    }, 3000)
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
