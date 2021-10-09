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
    text: ""
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
      

      // 文本过长 或过短不做计算
      if (text.length < 36 || !text) {
        this.setData({ hideAll: true, expanded: false, desc: text });
        return;
      }

      this.setData({ desc: text });

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
              const width = (ret && ret[0] && ret[0].width) || 0;
              const allHeight = (ret && ret[1] && ret[1].height) || 0;
              console.log(height, allHeight, width);

              this.setData(
                {
                  expanded: height >= allHeight,
                  desc:
                    height >= allHeight
                      ? text
                      : text.substring(0, parseInt(width / 14) * 2 - 2) + "...",
                  hideAll: true
                },
                () => {
                  console.log(this.data);
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
