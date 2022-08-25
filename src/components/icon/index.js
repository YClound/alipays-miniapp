import * as _My from "./../../utils/_my"
import { classNames } from "./../../utils/format"

Component({
  mixins: [],
  data: {

  },
  props: {
    className: "",
    name: ""
  },

  didMount() {
    let { className, name, style } = this.props
    const { prefixCls } = this.data
    if (!/^icon-\S+/.test(name)) {
      name = `icon-${name}`
    }
    this.setData({
      style,
      dataIndex: this.props["data-index"],
      dataInfo: this.props["data-info"],
      className: classNames(prefixCls, className, name)
    })
  },

  didUpdate(prevProps, prevData) {
    let { className, name, style } = this.props;
    if (prevProps.className !== className) {
      const { prefixCls } = this.data
      if (!/^icon-\S+/.test(name)) {
        name = `icon-${name}`
      }
      this.setData({
        className: classNames(prefixCls, className, name)
      })
    }
    if (style !== prevProps.style) {
      this.setData({ style })
    }
  },

  didUnmount() { },

  methods: {
    handleTap(e) {
      const { onTap } = this.props;
      onTap && onTap(e)
    }
  }
});