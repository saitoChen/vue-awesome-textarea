'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
    textareaCalcStyle: function textareaCalcStyle() {
      return {
        resize: this.autoResize ? 'none' : this.resizeStatus,
        overflow: this.overflowHidden ? 'hidden' : 'auto',
        height: this.height
      };
    },
    resizeStatus: function resizeStatus() {
      if (typeof this.resize === 'boolean') {
        return this.resize ? 'vertical' : 'none';
      }

      return this.resize;
    },
    hasMinHeight: function hasMinHeight() {
      return this.minHeight !== null;
    },
    hasMaxHeight: function hasMaxHeight() {
      return this.maxHeight !== null;
    },
    overflowHidden: function overflowHidden() {
      return this.autoResize && !this.hasScroll;
    },
    oneRowsHeight: function oneRowsHeight() {
      return this.calcContentHeight() / Number(this.rows) || 0;
    }
  },
  data: function data() {
    return {
      hasScroll: false,
      height: 'auto',
      oldContentHeight: 0
    };
  },
  watch: {
    value: function value() {
      this.initAutoResize();
    },
    rows: {
      handler: function handler() {},
      immediate: true
    }
  },
  mounted: function mounted() {
    this.init();
  },
  methods: {
    init: function init() {
      this.initAutoResize();
    },
    initAutoResize: function initAutoResize() {
      this.autoResize && this.$nextTick(this.calcResize);
    },
    handleInput: function handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handleChange: function handleChange(event) {
      this.$emit('change', event.target.value);
    },
    resetHeight: function resetHeight() {
      this.height = 'auto';
    },
    calcResize: function calcResize() {
      this.resetHeight();
      this.calcTextareaH();
    },
    calcContentHeight: function calcContentHeight() {
      var _this$calcNodeStyle = this.calcNodeStyle(this.$el),
          paddingSize = _this$calcNodeStyle.paddingSize;

      return this.$el.scrollHeight - paddingSize;
    },
    calcTextareaH: function calcTextareaH() {
      var contentHeight = this.calcContentHeight();
      this.calcHeightChange(contentHeight);
      this.height = contentHeight + 'px';

      if (this.needUpdateRows(contentHeight)) {
        this.updateRows(contentHeight);
      }

      this.oldContentHeight = contentHeight;
    },
    calcHeightChange: function calcHeightChange(contentHeight) {
      if (this.hasMinHeight) {
        contentHeight = Math.max(contentHeight, this.minHeight);
      }

      if (this.hasMaxHeight) {
        this.hasScroll = contentHeight > this.maxHeight;
        contentHeight = Math.min(contentHeight, this.maxHeight);
      }
    },
    calcNodeStyle: function calcNodeStyle(el) {
      var style = window.getComputedStyle(el);
      var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
      var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
      return {
        borderSize: borderSize,
        paddingSize: paddingSize
      };
    },
    needUpdateRows: function needUpdateRows(newContentHeight) {
      return this.oldContentHeight !== newContentHeight;
    },
    updateRows: function updateRows(contentHeight) {
      this.$emit('getRows', Math.round(contentHeight / this.oneRowsHeight));
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
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
  }, []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-37cf91b6";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var component$1 = __vue_component__;// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = component$1; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('VueAwesomeTextarea', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;