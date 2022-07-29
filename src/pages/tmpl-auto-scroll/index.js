let pid = null;

Page({
  data: {
    scrollLeft: 0,
    scrollX: true,
    prizeList: [],
  },
  _Scroll: null,
  startTouch: {},
  originList: [
    { iconUrl: 'https://sl-online-oss.shulidata.com/lottery-modal-bg.png' },
    { iconUrl: 'https://sl-online-oss.shulidata.com/chain_lottery/complaint-icon.png' },
    { iconUrl: 'https://sl-online-oss.shulidata.com/chain_lottery/record-icon.png' },
    { iconUrl: 'https://sl-online-oss.shulidata.com/chain_lottery/gift-icon.png' },
    { iconUrl: 'https://sl-online-oss.shulidata.com/chain_lottery/v1_0_0/home-card-icon.png' }
  ],

  onLoad() {
    this.initAnimation();
  },

  onShow() {
    this._Scroll && this._Scroll.reset();
    this._Scroll && this._Scroll.startAni();
  },

  onHide() {
    this._Scroll && this._Scroll.stopAni();
  },

  initAnimation() {
    this.setData({ prizeList: this.originList });
    
    const createScroll = () => {
      let flag = false;
      let increase = 0;

      const stopAni = () => {
        pid && clearTimeout(pid);
        flag = true;
      }

      const startAni = () => {
        if (flag) return;
        this.setData({ scrollLeft: ++increase });
        pid = setTimeout(startAni, 1000 / 60);
      }

      return {
        stopAni,
        startAni: () => {
          flag = false;
          startAni();
        },
        setIncrease: (num) => {
          increase = num;
        },
        reset: () => {
          increase = 0;
          this.setData({ 
            scrollLeft: 0,
            prizeList: this.originList,
          });
        }
      }
    }

    this._Scroll = createScroll();

    this._Scroll.startAni();
  },

  handleTouchStart(e) {
    this.startTouch = e.changedTouches[0] || {};
    pid && clearTimeout(pid);
    this._Scroll && this._Scroll.stopAni();
  },

  handleTouchEnd(e) {
    const changedTouche = e.changedTouches[0]
    if (changedTouche.pageX < this.startTouch.pageX) {
      const num = this.data.scrollLeft + (this.startTouch.pageX - changedTouche.pageX);
      this._Scroll && this._Scroll.setIncrease(num)
    } else {
      const num = this.data.scrollLeft - (changedTouche.pageX - this.startTouch.pageX);
      this._Scroll && this._Scroll.setIncrease(num <= 0 ? 0 : num);
    }
    this.setData({ scrollX: false });

    setTimeout(() => {
      this.setData({ scrollX: true });
      this._Scroll && this._Scroll.startAni();
    }, 10)
  },


  handleScrollToLower() {
    this.$spliceData({
      prizeList: [this.data.prizeList.length, 0, ...this.originList]
    })
  }
});
