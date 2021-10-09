Component({
  data: {
    noticeMode: "link",
    show: false,
    showArrow: false,
    animation: null
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

  didunmount() {
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
            this.translateAnimation(overflowWidth, contentWidth);
            this.setData({ showArrow: true });
          }
        });
    },

    translateAnimation(overflowWidth, contentWidth) {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      const { fps } = this.props.marqueeProps;
      const transLateX =
        overflowWidth -
        contentWidth -
        (this.data.noticeMode !== "link" ? 20 : 0);
      const duration = 0 - Math.ceil(transLateX / fps);

      this.animation
        .translateX(0)
        .step({
          duration: 100,
          delay: 0
        })
        .translateX(transLateX)
        .step({
          duration: duration * 1000,
          delay: 2000,
          timeFunction: "linear"
        });
      this.setData({ animation: this.animation.export() });

      this.timer = setTimeout(() => {
        this.translateAnimation(overflowWidth, contentWidth);
      }, (duration + 5) * 1000);
    }
  }
});
