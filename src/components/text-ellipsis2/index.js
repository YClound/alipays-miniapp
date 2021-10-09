const app = getApp();

Component({
  data() {
    return {
      desc: "",
      expanded: false,
      hideAll: false
    };
  },

  props: {
    lineClamp: 2,
    text: "",
    style: ""
  },

  didMount() {
    this.calcHeight();
  },

  didUpdate(prevProps) {
    if (prevProps.text.length !== this.props.text.length) {
      this.setData({ hideAll: false }, () => {
        this.calcHeight();
      });
    }
  },

  methods: {
    handleExpanded() {
      this.setData({ expanded: true, desc: this.props.text });
    },

    calcHeight() {
      const { text } = this.props;

      // console.log(text.length)

      // 或过短不做计算
      if (text.length < 36 || !text) {
        this.setData({ hideAll: true, expanded: true });
        return;
      }

      // 文本过长 直接折叠
      if (text.length > 100) {
        this.setData({ hideAll: true, expanded: false });
        return;
      }

      setTimeout(() => {
        try {
          my.createSelectorQuery()
            .select(`.text-ellipsis-comp-${this.$id}`)
            .boundingClientRect()
            .select(`.text-ellipsis-comp-${this.$id} .all-text`)
            .boundingClientRect()
            .selectViewport()
            .boundingClientRect()
            .exec(ret => {
              const height = (ret && ret[0] && ret[0].height) || 0;
              const allHeight = (ret && ret[1] && ret[1].height) || 0;
              // console.log(height, allHeight);

              this.setData(
                {
                  expanded: height >= allHeight,
                  hideAll: true
                }
              );
            });
        } catch (error) {
          this.setData({ hideAll: true });
        }
      }, 100);
    }
  }
});
