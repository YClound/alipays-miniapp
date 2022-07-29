// Carousel/Carousel.js
const DURATION = 5000;

Component({
  /**
   * 组件的属性列表
   */
  props: {
    list: [],
  },

  /**
   * 组件的初始数据
   */
  data: {
    allImg: []
  },

  didMount() {
    this.initAllImage(() => {
      this._Swiper = this.init();
      setTimeout(() => {
        // this._Swiper && this._Swiper.start("right");
      }, DURATION);
    });
  },

  didUnMount() {
    this._Swiper && this._Swiper.stop();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initAllImage(callback) {
      this.setData({
        allImg: this.props.list.map((item, index) => {
          if (index < 5) {
            return `item-${index + 1}`;
          } else {
            return 'item-5';
          }
        })
      }, () => {
        callback && callback();
      })
    },

    handleTouchStart(e) {
      const { touches } = e || {};
      this.touchStart = touches[0] || {};
      this._Swiper.stop();
    },

    handleTouchEnd(e) {
      const { changedTouches } = e;
      const [changedTouche = {}] = changedTouches;
      if (changedTouche.pageX > this.touchStart.pageX) {
        this._Swiper.start("left");
        this.touchEndTime = +new Date();

        if (+new Date() - this.touchEndTime < 5000) {
          this._pid && clearTimeout(this._pid);
        }

        this._pid = setTimeout(() => {
          this._Swiper.stop();
          this._Swiper.start("right");
        }, DURATION);
      } else {
        this._Swiper.start("right");
      }
    },

    init() {
      let pid;
      const createAni = type => {
        let theLength = this.props.list.length;
        let msg;
        if (type === "left") {
          // 向左滚动
          msg = this.data.allImg[0];
          for (let i = 0; i < theLength; i++) {
            this.data.allImg[i] = this.data.allImg[i + 1];
          }
          this.data.allImg[theLength - 1] = msg;
          this.setData({
            allImg: this.data.allImg
          });
        } else {
          // 向右滚动
          msg = this.data.allImg[theLength - 1];
          for (let i = theLength; i > 0; i--) {
            this.data.allImg[i - 1] = this.data.allImg[i - 2];
          }
          this.data.allImg[0] = msg;
          this.setData({
            allImg: this.data.allImg
          });
        }
      };

      const start = type => {
        createAni(type);
        pid = setTimeout(() => {
          start(type);
        }, DURATION);
      };

      return {
        start,
        stop: () => {
          pid && clearTimeout(pid);
        }
      };
    }
  }
});
