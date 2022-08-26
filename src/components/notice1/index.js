Component({
  data: {
    noticeMode: "link",
    show: false,
    overflowWidth: 0,
    duration: 0,
    showArrow: false,
  },

  props: {
    data: null,
    marqueeProps: {
      fps: 16
    },
    eventId: ""
  },

  didMount() {
    this.dataFilterHandler();
    this.animation = my.createAnimation();
  },

  didUpdate(preProps) {
    JSON.stringify(this.props) !== JSON.stringify(preProps) &&
      this.dataFilterHandler();
  },

  didUnmount() {
    this.timer && clearTimeout(this.timer);
  },

  methods: {
    handleTap() {
      const { pageId, pageName, y, data, eventId } = this.props;
      const { enableNavigate, url, text } = data;

      // pageName &&
      //   eventId &&
      //   SLStat.sendEvent('公告点击', {
      //     eventId: eventId || 'noticeClick',
      //     pageAlias: pageName,
      //     component: y,
      //     extParams: {
      //       template: 'dianshang',
      //       page_id: pageId,
      //       banner_url: url,
      //     },
      //   });

      if (enableNavigate) {
        my.navigateTo({
          url,
          success: () => {},
          fail: () => {},
          complete: () => {}
        });
      } else {
        my.alert({
          title: "公告",
          content: text,
          buttonText: "我知道了"
        });
      }
    },

    dataFilterHandler() {
      const now = new Date().getTime();
      const { data } = this.props;
      const { timeRange, enableNavigate } = data || {};

      this.setData(
        {
          show:
            !timeRange ||
            !timeRange.length ||
            (now >= timeRange[0] && now <= timeRange[1]),
          noticeMode: enableNavigate ? "link" : ""
        },
        () => {
          this.calcWidth();
        }
      );
    },

    calcWidth() {
      my.createSelectorQuery()
        .select(`.notification-${this.$id} .scroll-container-${this.$id}`)
        .boundingClientRect()
        .select(`.notification-${this.$id} .animate`)
        .boundingClientRect()
        .exec(ret => {
          const overflowWidth = parseInt((ret && ret[0] && ret[0].width) || 0);
          const contentWidth = parseInt((ret && ret[1] && ret[1].width) || 0);
          const isShowArrow = contentWidth > overflowWidth;
          if (overflowWidth && isShowArrow) {
            const { fps } = this.props.marqueeProps;
            const transLateX =
              overflowWidth -
              contentWidth -
              (this.data.noticeMode !== "link" ? 20 : 0);
            const duration = 0 - Math.ceil(transLateX / fps);

            console.log(transLateX, overflowWidth, contentWidth, duration)

            this.setData({
              overflowWidth: transLateX,
              duration: duration < 3 ? 3 : duration, // duration为0s动画真机预览不停止
              showArrow: isShowArrow
            });
          } else {
            this.setData({
              overflowWidth: 0,
              duration: 0,
              showArrow: false
            });
          }
        });
    },
  }
});
