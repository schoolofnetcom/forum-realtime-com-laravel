webpackJsonp([3],{

/***/ 1:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(59);


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = __webpack_require__(3);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('replies', __webpack_require__(60));

var app = new Vue({
  el: '#app'
});

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(61)
/* template */
var __vue_template__ = __webpack_require__(62)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\replies\\components\\Replies.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9f355396", Component.options)
  } else {
    hotAPI.reload("data-v-9f355396", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['replied', 'reply', 'yourAnswer', 'send', 'threadId', 'isClosed'],
    data: function data() {
        return {
            replies: [],
            logged: window.user || {},
            thread_id: this.threadId,
            is_closed: this.isClosed,
            reply_to_save: {
                body: '',
                thread_id: this.threadId
            }
        };
    },

    methods: {
        save: function save() {
            var _this = this;

            window.axios.post('/replies', this.reply_to_save).then(function () {
                _this.getReplies();
            });
        },
        getReplies: function getReplies() {
            var _this2 = this;

            window.axios.get('/replies/' + this.thread_id).then(function (response) {
                _this2.replies = response.data;
            });
        }
    },
    mounted: function mounted() {
        var _this3 = this;

        this.getReplies();

        Echo.channel('new.reply.' + this.thread_id).listen('NewReply', function (e) {
            console.log(e);
            if (e.reply) {
                _this3.getReplies();
            }
        });
    }
});

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm._l(_vm.replies, function(data) {
        return _c(
          "div",
          {
            staticClass: "card horizontal",
            class: { "lime lighten-4": data.highlighted }
          },
          [
            _c("div", { staticClass: "card-images" }, [
              _c("img", { attrs: { src: data.user.photo_url, alt: "" } })
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "card-stacked" }, [
              _c("div", { staticClass: "card-content" }, [
                _c("span", { staticClass: "card-title" }, [
                  _vm._v(_vm._s(data.user.name) + " " + _vm._s(_vm.replied))
                ]),
                _vm._v(" "),
                _c("blockquote", [
                  _vm._v(
                    "\n                    " +
                      _vm._s(data.body) +
                      "\n                "
                  )
                ])
              ]),
              _vm._v(" "),
              _vm.logged.role === "admin"
                ? _c("div", { staticClass: "card-action" }, [
                    _c(
                      "a",
                      { attrs: { href: "/reply/highligth/" + data.id } },
                      [_vm._v("em destaque")]
                    )
                  ])
                : _vm._e()
            ])
          ]
        )
      }),
      _vm._v(" "),
      _vm.is_closed == 0
        ? _c("div", { staticClass: "card grey lighten-4" }, [
            _c("div", { staticClass: "card-content" }, [
              _c("span", { staticClass: "card-title" }, [
                _vm._v(_vm._s(_vm.reply))
              ]),
              _vm._v(" "),
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      _vm.save()
                    }
                  }
                },
                [
                  _c("div", { staticClass: "input-field" }, [
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.reply_to_save.body,
                          expression: "reply_to_save.body"
                        }
                      ],
                      staticClass: "materialize-textarea",
                      attrs: { rows: "10", placeholder: _vm.yourAnswer },
                      domProps: { value: _vm.reply_to_save.body },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.reply_to_save,
                            "body",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn red accent-2",
                      attrs: { type: "submit" }
                    },
                    [_vm._v(_vm._s(_vm.send))]
                  )
                ]
              )
            ])
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9f355396", module.exports)
  }
}

/***/ })

},[58]);