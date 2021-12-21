//
//
//
//
//
//
//
//
//
//
var script = {
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
      };
    },

    resizeStatus() {
      if (typeof this.resize === 'boolean') {
        return this.resize ? 'vertical' : 'none';
      }

      return this.resize;
    },

    hasMinHeight() {
      return this.minHeight !== null;
    },

    hasMaxHeight() {
      return this.maxHeight !== null;
    },

    overflowHidden() {
      return this.autoResize && !this.hasScroll;
    },

    oneRowsHeight() {
      return this.calcContentHeight() / Number(this.rows) || 0;
    }

  },

  data() {
    return {
      hasScroll: false,
      height: 'auto',
      oldContentHeight: 0
    };
  },

  watch: {
    value() {
      this.initAutoResize();
    },

    rows: {
      handler() {},

      immediate: true
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.initAutoResize();
    },

    initAutoResize() {
      this.autoResize && this.$nextTick(this.calcResize);
    },

    handleInput(event) {
      this.$emit('input', event.target.value);
    },

    handleChange(event) {
      this.$emit('change', event.target.value);
    },

    resetHeight() {
      this.height = 'auto';
    },

    calcResize() {
      this.resetHeight();
      this.calcTextareaH();
    },

    calcContentHeight() {
      const {
        paddingSize
      } = this.calcNodeStyle(this.$el);
      return this.$el.scrollHeight - paddingSize;
    },

    calcTextareaH() {
      let contentHeight = this.calcContentHeight();
      this.calcHeightChange(contentHeight);
      this.height = contentHeight + 'px';

      if (this.needUpdateRows(contentHeight)) {
        this.updateRows(contentHeight);
      }

      this.oldContentHeight = contentHeight;
    },

    calcHeightChange(contentHeight) {
      if (this.hasMinHeight) {
        contentHeight = Math.max(contentHeight, this.minHeight);
      }

      if (this.hasMaxHeight) {
        this.hasScroll = contentHeight > this.maxHeight;
        contentHeight = Math.min(contentHeight, this.maxHeight);
      }
    },

    calcNodeStyle(el) {
      const style = window.getComputedStyle(el);
      const borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
      const paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
      return {
        borderSize,
        paddingSize
      };
    },

    needUpdateRows(newContentHeight) {
      return this.oldContentHeight !== newContentHeight;
    },

    updateRows(contentHeight) {
      this.$emit('getRows', Math.round(contentHeight / this.oneRowsHeight));
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('textarea', {
    staticClass: "vue-awesome-textarea",
    style: _vm.textareaCalcStyle,
    attrs: {
      "name": _vm.name,
      "rows": _vm.rows
    },
    on: {
      "input": _vm.handleInput,
      "change": _vm.handleChange
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component = __vue_component__;

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = component; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component('VueAwesomeTextarea', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
