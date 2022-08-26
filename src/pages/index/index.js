Page({
  data() {
    return {
      list: [{
        title: "基础",
        items: [
          {
            label: "Cell 单元格",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/home/cellPage/index"
          },
          {
            label: "Icon 图标",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/home/iconPage/index"
          },
          {
            label: "Card",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/home/cardPage/index"
          },
        ]
      },{
        title: "动画",
        items: [
          {
            label: "文本截断",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/tmpl-text-ellipsis/index"
          },
          {
            label: "卡片翻转",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/tmpl-animation/index"
          },
          {
            label: "公告",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/tmpl-notice/index"
          },
          {
            label: "横向自动滚动",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/tmpl-auto-scroll/index"
          },
          {
            label: "覆盖式滚动",
            value: "",
            description: "",
            arrow: true,
            href: "/pages/tmpl-swiper/index"
          },
        ]
      }]
    }
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
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
