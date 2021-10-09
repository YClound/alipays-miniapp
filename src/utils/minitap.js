(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: tap, off, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var APP_PROXY_METHODS = ['onLaunch', 'onShow', 'onHide', 'onError', 'onUnhandledRejection'];
var PAGE_PROXY_METHODS = ['onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onTitleClick', 'onPullDownRefresh', 'onReachBottom'];
var PAGE_EVENTS_PROXY_METHODS = ['onBack'];
/**
 * 将event挂载到App，防止重复引用minitap导致事件多次触发
 */

var event = App.__minitap_event = App.__minitap_event || _utils__WEBPACK_IMPORTED_MODULE_0__["event"];
/**
 * 创建方法代理
 * @param method 如果不存在则新建一个function
 * @param callback
 */

function createMethodProxy(method, callback) {
  return _utils__WEBPACK_IMPORTED_MODULE_0__["createProxy"](method || function () {}, callback);
}
/**
 * 创建小程序App对象代理
 */


function proxyApp() {
  App = _utils__WEBPACK_IMPORTED_MODULE_0__["createProxy"](App, function (app, argArray) {
    return app(APP_PROXY_METHODS.reduce(function (arg, methodName) {
      arg[methodName] = createMethodProxy(arg[methodName], function (method, params) {
        var _event$trigger;

        (_event$trigger = event.trigger).call.apply(_event$trigger, [this, 'app:' + methodName].concat(_toConsumableArray(params)));

        method.apply(this, params);
      });
      return arg;
    }, argArray[0]));
  });
}
/**
 * 创建小程序Page对象代理
 */


function proxyPage() {
  Page = _utils__WEBPACK_IMPORTED_MODULE_0__["createProxy"](Page, function (page, argArray) {
    argArray[0].events = PAGE_EVENTS_PROXY_METHODS.reduce(function (evs, methodName) {
      evs[methodName] = createMethodProxy(evs[methodName], function (method, params) {
        var _event$trigger2, _event$trigger3;

        (_event$trigger2 = event.trigger).call.apply(_event$trigger2, [this, "page@".concat(this.route, ":").concat(methodName)].concat(_toConsumableArray(params)));

        (_event$trigger3 = event.trigger).call.apply(_event$trigger3, [this, "page:".concat(methodName)].concat(_toConsumableArray(params)));

        method.apply(this, params);
      });
      return evs;
    }, argArray[0].events || {});
    return page(PAGE_PROXY_METHODS.reduce(function (arg, methodName) {
      arg[methodName] = createMethodProxy(arg[methodName], function (method, params) {
        var _event$trigger4, _event$trigger5;

        (_event$trigger4 = event.trigger).call.apply(_event$trigger4, [this, "page@".concat(this.route, ":").concat(methodName)].concat(_toConsumableArray(params)));

        (_event$trigger5 = event.trigger).call.apply(_event$trigger5, [this, "page:".concat(methodName)].concat(_toConsumableArray(params)));

        method.apply(this, params);
      });
      return arg;
    }, argArray[0]));
  });
}
/**
 * 创建request代理
 */


function proxyRequest() {
  my.request = _utils__WEBPACK_IMPORTED_MODULE_0__["createProxy"](my.request, function (request, config) {
    var startTime = _utils__WEBPACK_IMPORTED_MODULE_0__["now"]();
    return request(_objectSpread(_objectSpread({}, config), {}, {
      success: function success() {
        var dur = _utils__WEBPACK_IMPORTED_MODULE_0__["now"]() - startTime;
        config.success && config.success.apply(config, arguments);
        event.trigger.call(this, "request", dur, config);
        event.trigger.call(this, "request:".concat(config.url), dur, config);
      }
    }));
  });
}
/**
 * 监听事件
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback
 */


function tap(scope, eventName, callback) {
  switch (scope) {
    case 'app':
      event.on('app:' + eventName, callback);
      break;

    case 'page':
      event.on('page:' + eventName, callback);
      break;

    case 'request':
      if (eventName) {
        event.on('request:' + eventName, callback);
      } else {
        event.on('request', callback);
      }

      break;

    default:
      event.on('page@' + scope + ':' + eventName, callback);
      break;
  }
}
/**
 * 取消监听
 * @param scope 'app' | 'pages/index/index' ...
 * @param eventName 'onShow', 'onHide', ....
 * @param callback 可选，为空则该事件下的回调全部取消
 */

function off(scope, eventName, callback) {
  switch (scope) {
    case 'app':
      event.off('app:' + eventName, callback);
      break;

    case 'page':
      event.off('page:' + eventName, callback);
      break;

    case 'request':
      if (eventName) {
        event.off('request:' + eventName, callback);
      } else {
        event.off('request', callback);
      }

      break;

    default:
      event.off('page@' + scope + ':' + eventName, callback);
      break;
  }
} // 防止重复挂载

if (!App.__minitaped) {
  proxyApp();
  proxyPage(); // proxyRequest();

  App.__minitaped = true;
}

/* harmony default export */ __webpack_exports__["default"] = (tap);

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: event, createProxy, now */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return event; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProxy", function() { return createProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
var event = {
  $: {},
  on: function on(name, callback) {
    event.$[name] = event.$[name] || [];
    event.$[name].push(callback);
  },
  off: function off(name, callback) {
    if (event.$[name]) {
      if (callback) {
        event.$[name].splice(event.$[name].indexOf(callback), 1);
      } else {
        event.$[name] = [];
        delete event.$[name];
      }
    }
  },
  trigger: function trigger(name) {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (event.$[name]) {
      return event.$[name].map(function (handler) {
        return handler.apply(_this, args);
      });
    }
  }
};
var createProxy = function () {
  try {
    if (Proxy) {
      return function (target, callback) {
        return new Proxy(target, {
          apply: function apply(func, that, params) {
            return callback.call(that, func, params);
          }
        });
      };
    } else {
      throw new Error('Proxy not exist');
    }
  } catch (e) {
    return function (target, callback) {
      return function () {
        for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }

        return callback.call(this, target, params);
      };
    };
  }
}();
function now() {
  return +new Date();
}

/***/ })

/******/ });
});
//# sourceMappingURL=minitap.js.map