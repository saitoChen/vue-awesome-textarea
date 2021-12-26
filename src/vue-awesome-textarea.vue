<template>
  <textarea
    :name="name"
    class="vue-awesome-textarea"
    :rows="rows"
    :style="textareaCalcStyle"
    @input="handleInput"
    @change="handleChange"
  ></textarea>
</template>
<script>
export default {
  name: 'VueAwesomeTextarea',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      default: 'vue-awesome-textarea'
    },
    resize: {
      type: [String, Boolean],
      default: true
    },
    autoResize: {
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: null
    },
    maxHeight: {
      type: Number,
      default: null
    },
    rows: {
      type: Number,
      default: 2
    }
  },
  computed: {
    textareaCalcStyle() {
      return {
        resize: this.autoResize ? 'none' : this.resizeStatus,
        overflow: this.overflowHidden ? 'hidden' : 'auto',
        height: this.height
      }
    },
    resizeStatus() {
      if (typeof this.resize === 'boolean') {
        return this.resize ? 'vertical' : 'none'
      }
      return this.resize
    },
    hasMinHeight() {
      return this.minHeight !== null
    },
    hasMaxHeight() {
      return this.maxHeight !== null
    },
    overflowHidden() {
      return this.autoResize && !this.hasScroll
    },
    oneRowsHeight() {
      return this.calcContentHeight() / Number(this.rows) || 0
    }
  },
  data() {
    return {
      hasScroll: false,
      height: 'auto',
      oldContentHeight: 0,
    }
  },
  watch: {
    value() {
      this.initAutoResize()
    },
    rows: {
      handler() {},
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initAutoResize()
    },
    initAutoResize () {
      this.autoResize && this.$nextTick(this.calcResize)
    },
    handleInput(event) {
      this.$emit('input', event.target.value)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    resetHeight() {
      this.height = 'auto'
    },
    calcResize() {
      this.resetHeight()
      this.calcTextareaH()
    },
    calcContentHeight () {
      const { paddingSize } = this.calcNodeStyle(this.$el)
      return this.$el.scrollHeight - paddingSize
    },
    calcTextareaH() {
      let contentHeight = this.calcContentHeight()
      this.height = this.calcHeightChange(contentHeight) + 'px'
      if (this.needUpdateRows(contentHeight)) {
        this.updateRows(contentHeight)
      }
      this.oldContentHeight = contentHeight
    },
    calcHeightChange(contentHeight) {
      if (this.hasMinHeight) {
        contentHeight = Math.max(contentHeight, this.minHeight)
      }
      if (this.hasMaxHeight) {
        this.hasScroll = contentHeight > this.maxHeight
        contentHeight = Math.min(contentHeight, this.maxHeight)
      }
      return contentHeight
    },
    calcNodeStyle(el) {
      const style = window.getComputedStyle(el);
      const borderSize = (
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
      );
      const paddingSize = (
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
      )
      return { borderSize, paddingSize }
    },
    needUpdateRows(newContentHeight) {
      return this.oldContentHeight !== newContentHeight
    },
    updateRows(contentHeight) {
      this.$emit('getRows', Math.round(contentHeight / this.oneRowsHeight))
    }
  }
}
</script>