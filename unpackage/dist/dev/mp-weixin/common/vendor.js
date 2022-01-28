(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 11);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 11:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 12:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 136:
/*!*********************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/pages/address/reglist2selectlist.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;function _default(list) {
  return list.items11.map(function (ele) {
    var obj = {
      value: ele.code,
      label: ele.name };

    var children = list["items".concat(ele.code)];
    if (children && children.length > 0) {
      obj.children = children.map(function (item) {
        var obj2 = {
          value: item.code,
          label: item.name };

        var children2 = list["items".concat(item.code)];
        if (children2 && children2.length > 0) {
          obj2.children = children2.map(function (item2) {
            return {
              value: item2.code,
              label: item2.name };

          });
        } else {
          obj2.children = [{
            value: item.code,
            label: item.name }];

        }
        return obj2;
      });
    }
    return obj;
  });
}

/***/ }),

/***/ 15:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/store/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));
var _service = __webpack_require__(/*! @/common/service.js */ 17);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    /**
            * 是否需要强制登录
            */
    forcedLogin: true,
    hasLogin: false,
    login: "",
    client: [], //个人中心浮动图标位置记录
    chooseIndex: { bs_id: 1, business_name: '网盛生意宝' },
    shenhe: 1,
    yindao: 1,
    tiao: 0,
    sharelist: {},
    updatemsg: {},
    CustomBar: 64,
    StatusBar: 20,
    bannerstate: true,
    has_wp: false,
    tim_login: false,
    currentMessageList: [],
    conversationActive: {
      conversationID: '' },

    conversationList: [],
    g_tim: null,
    theme: {
      themeColor: '#5770bd',
      textColor: '#ffffff',
      bgColor: '#ededef' },

    regionalList: [],
    couponCate: {},
    history: [],
    userInfo: {},
    cartCount: uni.getStorageSync('cart') ? uni.getStorageSync('cart').reduce(function (pre, cur) {return pre + Number(cur.num);}, 0) : 0,
    homeCate: 8,
    exjson: uni.getExtConfigSync(),
    isEwmed: null,
    ewmInfo: {
      title: "",
      info: "",
      button: "",
      titlea: "",
      url: "" } },


  mutations: {
    changeEwmFlag: function changeEwmFlag(state, data) {
      state.isEwmed = data;
    },
    isEwmFunc: function isEwmFunc(state) {
      var timeLimit = 86400000; //24h
      var last_time = uni.getStorageSync("last_time");
      if (!last_time) {
        this.commit("changeEwmFlag", true);
        uni.setStorageSync("last_time", new Date().getTime());
      } else {
        var timeD = new Date().getTime() - last_time;
        if (timeD >= timeLimit) {
          this.commit("changeEwmFlag", true);
          uni.setStorageSync("last_time", new Date().getTime());
        } else {
          this.commit("changeEwmFlag", false);
        }
      }
    },
    setHomeCate: function setHomeCate(state, cate) {
      state.homeCate = cate;
    },
    setCartCount: function setCartCount(state, num) {
      state.cartCount = num;
    },
    login: function login(state, _login) {
      state.login = _login || '新用户';
      state.hasLogin = true;
    },
    loginstatus: function loginstatus(state, login) {
      state.hasLogin = login;
    },
    logout: function logout(state) {
      state.login = "";
      state.hasLogin = false;
    },
    setUserInfo: function setUserInfo(state, info) {
      state.userInfo = info;
    },
    removeUserInfo: function removeUserInfo(state) {
      state.userInfo = {};
    },
    addHistory: function addHistory(state, item) {
      state.history.push(item);
    },
    getCouponCate: function getCouponCate(state, cate) {
      state.couponCate = cate;
    },
    recordclient: function recordclient(state, client) {
      state.client = client;
    },
    changechoose: function changechoose(state, e) {
      state.chooseIndex = e;
    },
    shenhedata: function shenhedata(state, e) {
      state.shenhe = e;
    },
    yindaodata: function yindaodata(state, e) {
      state.yindao = e;
    },
    tiaodata: function tiaodata(state, e) {
      state.tiao = e;
    },
    sharedata: function sharedata(state, e) {
      state.sharelist = e;
    },
    getupdatemsg: function getupdatemsg(state, e) {
      state.updatemsg = e;
    },
    setCustomBar: function setCustomBar(state, e) {
      state.CustomBar = e;
    },
    setStatusBar: function setStatusBar(state, e) {
      state.StatusBar = e;
    },
    changebanner: function changebanner(state, e) {
      state.bannerstate = e;
    },
    wpchange: function wpchange(state, e) {
      state.has_wp = e;
    },
    //更新登录状态
    toggleIsLogin: function toggleIsLogin(state, isLogin) {
      state.tim_login = typeof isLogin === 'undefined' ? !state.tim_login : isLogin;
    },
    pushCurrentMessageList: function pushCurrentMessageList(state, data) {
      // 还没当前会话，则跳过
      if (Array.isArray(data)) {
        // 筛选出当前会话的消息
        var result = data.filter(function (item) {return item.conversationID === state.conversationActive.conversationID;});
        state.currentMessageList = [].concat(_toConsumableArray(state.currentMessageList), _toConsumableArray(result));
      }
      // else if (data.conversationID === state.conversationActive.conversationID) {
      //   state.currentMessageList = [...state.currentMessageList, data]
      // }
      if (state.currentMessageList.length > 200) {
        state.currentMessageList = state.currentMessageList.slice(100);
      }
    },
    //选择好友聊天--创建会话/拼接会话id
    createConversationActive: function createConversationActive(state, toUserId) {
      state.conversationActive.conversationID = toUserId;
      state.currentMessageList = [];
    },
    //更新会话列表
    updateConversationList: function updateConversationList(state, newConversationList) {
      state.conversationList = newConversationList;
    },
    set_tim: function set_tim(state, tim) {
      state.g_tim = tim;
    },
    changeVoteTheme: function changeVoteTheme(state, data) {
      state.theme = data;
    },
    getRegionalList: function getRegionalList(state, list) {
      state.regionalList = list;
    } },

  actions: {
    getEwm: function getEwm(_ref) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var commit, state, res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:commit = _ref.commit, state = _ref.state;_context.next = 3;return (
                  _service.http.get("Xcx/follow_syb"));case 3:res = _context.sent;
                state.ewmInfo.title = res.data.title;
                state.ewmInfo.titlea = res.data.titlea;
                state.ewmInfo.info = res.data.info;
                state.ewmInfo.button = res.data.button;
                state.ewmInfo.url = res.data.url;case 9:case "end":return _context.stop();}}}, _callee);}))();
    },
    getEwmData: function getEwmData(_ref2) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var commit, dispatch, state;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:commit = _ref2.commit, dispatch = _ref2.dispatch, state = _ref2.state;
                commit("isEwmFunc");
                if (state.isEwmed) {
                  dispatch('getEwm');
                }case 3:case "end":return _context2.stop();}}}, _callee2);}))();
    },
    addVoteTheme: function addVoteTheme(_ref3, data) {var commit = _ref3.commit;
      commit('changeVoteTheme', data);
    },
    addCart: function addCart(_ref4, datalist) {var commit = _ref4.commit;
      // if(!this.check()) return 
      //加入购物车
      var list = uni.getStorageSync('cart') || [];
      if (list.some(function (ele) {return ele.id == datalist.id;})) {
        uni.showModal({
          title: '提示',
          confirmText: '跳转',
          content: '该商品已在购物车中，如需调整数量请在购物车中操作。确认是否跳转？',
          success: function success(res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/cart/cart' });

            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          } });

      } else {
        list.push(_objectSpread(_objectSpread({}, datalist), {}, { pid: datalist.id, num: 1 }));
        uni.setStorageSync('cart', list);
        uni.showToast({
          title: '成功加入购物车' });

        commit('setCartCount', list.reduce(function (pre, cur) {return pre + Number(cur.num);}, 0));
      }

    } } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!***************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/common/service.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.http = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));








var _index = _interopRequireDefault(__webpack_require__(/*! @/utils/luch-request/index.js */ 18));
var _md = _interopRequireDefault(__webpack_require__(/*! uview-ui/libs/function/md5 */ 31));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// 获取storage中token
var getTokenStorage = function getTokenStorage() {
  var token = '';
  try {
    token = uni.getStorageSync('userid');
  } catch (e) {
    //TODO handle the exception
  }
  return token;
};

var http = new _index.default();exports.http = http;

var extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
console.log(extConfig);
// console.log(extConfig.attr.login)

uni.setStorageSync('xcx_login', extConfig.attr.login);
uni.setStorageSync('xcx_appid', extConfig.attr.wxappid);

function get_xcx_code() {
  return new Promise(function (resolve, rejected) {
    uni.login({
      success: function success(res) {
        resolve(res.code);
      },
      fail: function fail(err) {
        md5flag = true;
        rejected(err);
      } });

  });
}function

refreshToken() {return _refreshToken.apply(this, arguments);}












// 给实例添加一个setToken方法，用于登录后方便将最新token动态添加到header，同时将token保存在localStorage中
function _refreshToken() {_refreshToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {var code;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.prev = 0;_context2.next = 3;return get_xcx_code();case 3:code = _context2.sent;console.log('code打印:', code);return _context2.abrupt("return", http.post('Xcx/xcx_login', { code: code }));case 8:_context2.prev = 8;_context2.t0 = _context2["catch"](0);return _context2.abrupt("return", _context2.t0);case 11:case "end":return _context2.stop();}}}, _callee2, null, [[0, 8]]);}));return _refreshToken.apply(this, arguments);}http.setToken = function (token, md5flag) {
  http.config.header['userid'] = token;
  if (!md5flag) {
    // 不存在md5时保存userid
    uni.setStorageSync('userid', token);
  }

};
var md5flag = false;
var requests = []; // 存储无token的请求队列
var isRefreshing = false; //正在刷新token


http.setConfig(function (config) {/* 设置全局配置 */
  config.baseURL = 'https://wx3.y.netsun.com/'; /* 根域名不同 */
  config.header = _objectSpread(_objectSpread({},
  config.header), {}, {
    'content-type': 'application/x-www-form-urlencoded',
    'appid': 10000,
    'appsecret': '7923FoGlaAlRnbpfl+lepwzh/2lVLDAnb8gyRDSpJKX6TJLW9CTXfW4',
    'xcxlogin': extConfig.attr.login,
    'xcxappid': extConfig.attr.wxappid,
    'market': extConfig.attr.market });

  return config;
});


http.interceptors.request.use(function (config) {/* 请求之前拦截器。可以使用async await 做异步操作 */
  var token = getTokenStorage();
  config.header = _objectSpread(_objectSpread({},
  config.header), {}, {
    'userid': token });

  // 登录接口和刷新token接口绕过
  if (config.url.indexOf('xcx_login') >= 0) {
    return config;
  }
  if (!token) {
    // 立即刷新token
    if (!isRefreshing) {
      console.log('刷新token ing');
      isRefreshing = true;
      refreshToken().then(function (res) {
        console.log('获取token成功，存入头部', res);
        var userid = "";
        if (res.errMsg != "request:ok") {
          userid = _md.default.md5(formatDate(new Date()) + 'toocle');
          http.setToken(userid, true);
        } else {
          userid = res.data.userid;
          http.setToken(userid);
        }

        console.log('刷新token成功，执行队列');
        requests.forEach(function (cb) {return cb(userid);});
        // 执行完成后，清空队列
        requests = [];
      }).catch(function (res) {
        console.error('refresh token error: ', res);
      }).finally(function () {
        isRefreshing = false;
      });
    }
    return new Promise(function (resolve) {
      requests.push(function (token) {
        // 因为config中的token是旧的，所以刷新token后要将新token传进来
        config.header['userid'] = token;
        resolve(config);
      });
    });

  }
  /*
     if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
       return Promise.reject(config)
     }
     */
  return config;
}, function (config) {
  return Promise.reject(config);
});


http.interceptors.response.use( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(response) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0: /* 请求之后拦截器。可以使用async await 做异步操作  */
            // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
            //   return Promise.reject(response)
            // }
            uni.hideLoading();
            uni.hideNavigationBarLoading();
            if (response.hasOwnProperty('data')) {
              if (response.data.code != 1) {
                if (response.data.msg) {
                  uni.showToast({
                    title: response.data.msg,
                    icon: 'none',
                    mask: true,
                    duration: 1000 });

                }
              }
            }return _context.abrupt("return",
            response);case 4:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}(),
function (response) {// 请求错误做点什么。可以使用async await 做异步操作
  console.log(response);
  return Promise.reject(response);
});
var formatDate = function formatDate(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + m + d;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!*************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 19:
/*!********************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/Request.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 20));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 28));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 29));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 30));
var _utils = __webpack_require__(/*! ../utils */ 23);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。App和支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认30000。仅微信小程序（2.10.0）、支付宝小程序支持
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/dispatchRequest.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),

/***/ 21:
/*!**********************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/adapters/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 22));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 24));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var _config = {
      url: (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params),
      header: config.header,
      complete: function complete(response) {
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [






      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/helpers/buildURL.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 23));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 23:
/*!*************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/utils.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/***/ }),

/***/ 239:
/*!*****************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/static/js/tim-wx.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {var e = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_REVOKED: "onMessageRevoked", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice", PROFILE_UPDATED: "onProfileUpdated", BLACKLIST_UPDATED: "blacklistUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange" },t = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_SYSTEM: "@TIM#SYSTEM", GRP_PRIVATE: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected" };function n(e) {return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function r(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function o(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}function i(e, t, n) {return t && o(e.prototype, t), n && o(e, n), e;}function s(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function a(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var r = Object.getOwnPropertySymbols(e);t && (r = r.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, r);}return n;}function u(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? a(Object(n), !0).forEach(function (t) {s(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function l(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && p(e, t);}function c(e) {return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}function p(e, t) {return (p = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function h() {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}function f(e, t, n) {return (f = h() ? Reflect.construct : function (e, t, n) {var r = [null];r.push.apply(r, t);var o = new (Function.bind.apply(e, r))();return n && p(o, n.prototype), o;}).apply(null, arguments);}function d(e) {var t = "function" == typeof Map ? new Map() : void 0;return (d = function d(e) {if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;var n;if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");if (void 0 !== t) {if (t.has(e)) return t.get(e);t.set(e, r);}function r() {return f(e, arguments, c(this).constructor);}return r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), p(r, e);})(e);}function g(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function m(e, t) {return !t || "object" != typeof t && "function" != typeof t ? g(e) : t;}function y(e) {return function () {var t,n = c(e);if (h()) {var r = c(this).constructor;t = Reflect.construct(n, arguments, r);} else t = n.apply(this, arguments);return m(this, t);};}function v(e, t) {return function (e) {if (Array.isArray(e)) return e;}(e) || function (e, t) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;var n = [],r = !0,o = !1,i = void 0;try {for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0) {;}} catch (u) {o = !0, i = u;} finally {try {r || null == a.return || a.return();} finally {if (o) throw i;}}return n;}(e, t) || C(e, t) || function () {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function _(e) {return function (e) {if (Array.isArray(e)) return M(e);}(e) || function (e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}(e) || C(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function C(e, t) {if (e) {if ("string" == typeof e) return M(e, t);var n = Object.prototype.toString.call(e).slice(8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? M(e, t) : void 0;}}function M(e, t) {(null == t || t > e.length) && (t = e.length);for (var n = 0, r = new Array(t); n < t; n++) {r[n] = e[n];}return r;}function I(e) {if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (e = C(e))) {var t = 0,n = function n() {};return { s: n, n: function n() {return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };}, e: function e(_e2) {throw _e2;}, f: n };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var r,o,i = !0,s = !1;return { s: function s() {r = e[Symbol.iterator]();}, n: function n() {var e = r.next();return i = e.done, e;}, e: function e(_e3) {s = !0, o = _e3;}, f: function f() {try {i || null == r.return || r.return();} finally {if (s) throw o;}} };}var S = function () {function e() {r(this, e), this.cache = [], this.options = null;}return i(e, [{ key: "use", value: function value(e) {if ("function" != typeof e) throw "middleware must be a function";return this.cache.push(e), this;} }, { key: "next", value: function value(e) {if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this));} }, { key: "run", value: function value(e) {return this.middlewares = this.cache.map(function (e) {return e;}), this.options = e, this.next();} }]), e;}(),D = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function T(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var E,k,A,w = T(function (e, t) {var n, r, o, i, s, a, u, l, c, p, h, f, d, g, m, y, v, _;e.exports = (n = "function" == typeof Promise, r = "object" == typeof self ? self : D, o = "undefined" != typeof Symbol, i = "undefined" != typeof Map, s = "undefined" != typeof Set, a = "undefined" != typeof WeakMap, u = "undefined" != typeof WeakSet, l = "undefined" != typeof DataView, c = o && void 0 !== Symbol.iterator, p = o && void 0 !== Symbol.toStringTag, h = s && "function" == typeof Set.prototype.entries, f = i && "function" == typeof Map.prototype.entries, d = h && Object.getPrototypeOf(new Set().entries()), g = f && Object.getPrototypeOf(new Map().entries()), m = c && "function" == typeof Array.prototype[Symbol.iterator], y = m && Object.getPrototypeOf([][Symbol.iterator]()), v = c && "function" == typeof String.prototype[Symbol.iterator], _ = v && Object.getPrototypeOf(""[Symbol.iterator]()), function (e) {var t = typeof e;if ("object" !== t) return t;if (null === e) return "null";if (e === r) return "global";if (Array.isArray(e) && (!1 === p || !(Symbol.toStringTag in e))) return "Array";if ("object" == typeof window && null !== window) {if ("object" == typeof window.location && e === window.location) return "Location";if ("object" == typeof window.document && e === window.document) return "Document";if ("object" == typeof window.navigator) {if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray";}if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";if ("TD" === e.tagName) return "HTMLTableDataCellElement";if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";}}var o = p && e[Symbol.toStringTag];if ("string" == typeof o) return o;var c = Object.getPrototypeOf(e);return c === RegExp.prototype ? "RegExp" : c === Date.prototype ? "Date" : n && c === Promise.prototype ? "Promise" : s && c === Set.prototype ? "Set" : i && c === Map.prototype ? "Map" : u && c === WeakSet.prototype ? "WeakSet" : a && c === WeakMap.prototype ? "WeakMap" : l && c === DataView.prototype ? "DataView" : i && c === g ? "Map Iterator" : s && c === d ? "Set Iterator" : m && c === y ? "Array Iterator" : v && c === _ ? "String Iterator" : null === c ? "Object" : Object.prototype.toString.call(e).slice(8, -1);});}),R = "undefined" != typeof window,O = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync,L = R && window.navigator && window.navigator.userAgent || "",N = /AppleWebKit\/([\d.]+)/i.exec(L),b = (N && parseFloat(N.pop()), /iPad/i.test(L)),P = (/iPhone/i.test(L), /iPod/i.test(L), (E = L.match(/OS (\d+)_/i)) && E[1] && E[1], /Android/i.test(L)),G = function () {var e = L.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if (!e) return null;var t = e[1] && parseFloat(e[1]),n = e[2] && parseFloat(e[2]);return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;}(),U = (P && /webkit/i.test(L), /Firefox/i.test(L), /Edge/i.test(L)),q = !U && /Chrome/i.test(L),x = (function () {var e = L.match(/Chrome\/(\d+)/);e && e[1] && parseFloat(e[1]);}(), /MSIE/.test(L)),F = (/MSIE\s8\.0/.test(L), function () {var e = /MSIE\s(\d+)\.\d/.exec(L),t = e && parseFloat(e[1]);return !t && /Trident\/7.0/i.test(L) && /rv:11.0/.test(L) && (t = 11), t;}()),H = (/Safari/i.test(L), /TBS\/\d+/i.test(L)),B = (function () {var e = L.match(/TBS\/(\d+)/i);if (e && e[1]) e[1];}(), !H && /MQQBrowser\/\d+/i.test(L), !H && / QQBrowser\/\d+/i.test(L), /(micromessenger|webbrowser)/i.test(L)),V = (/Windows/i.test(L), /MAC OS X/i.test(L), /MicroMessenger/i.test(L), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});k = "undefined" != typeof console ? console : void 0 !== V && V.console ? V.console : "undefined" != typeof window && window.console ? window.console : {};for (var K = function K() {}, j = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], $ = j.length; $--;) {A = j[$], console[A] || (k[A] = K);}k.methods = j;var Y = k,z = 0,W = new Map();function X() {var e = new Date();return "TIM " + e.toLocaleTimeString("en-US", { hour12: !1 }) + "." + function (e) {var t;switch (e.toString().length) {case 1:t = "00" + e;break;case 2:t = "0" + e;break;default:t = e;}return t;}(e.getMilliseconds()) + ":";}var J = { _data: [], _length: 0, _visible: !1, arguments2String: function arguments2String(e) {var t;if (1 === e.length) t = X() + e[0];else {t = X();for (var n = 0, r = e.length; n < r; n++) {ie(e[n]) ? ae(e[n]) ? t += fe(e[n]) : t += JSON.stringify(e[n]) : t += e[n], t += " ";}}return t;}, debug: function debug() {if (z <= -1) {var e = this.arguments2String(arguments);J.record(e, "debug"), Y.debug(e);}}, log: function log() {if (z <= 0) {var e = this.arguments2String(arguments);J.record(e, "log"), Y.log(e);}}, info: function info() {if (z <= 1) {var e = this.arguments2String(arguments);J.record(e, "info"), Y.info(e);}}, warn: function warn() {if (z <= 2) {var e = this.arguments2String(arguments);J.record(e, "warn"), Y.warn(e);}}, error: function error() {if (z <= 3) {var e = this.arguments2String(arguments);J.record(e, "error"), Y.error(e);}}, time: function time(e) {W.set(e, pe.now());}, timeEnd: function timeEnd(e) {if (W.has(e)) {var t = pe.now() - W.get(e);return W.delete(e), t;}return Y.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0;}, setLevel: function setLevel(e) {e < 4 && Y.log(X() + "set level from " + z + " to " + e), z = e;}, record: function record(e, t) {1100 === J._length && (J._data.splice(0, 100), J._length = 1e3), J._length++, J._data.push("".concat(e, " [").concat(t, "] \n"));}, getLog: function getLog() {return J._data;} },Q = function Q(e) {return "file" === ue(e);},Z = function Z(e) {return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" === n(e) && e.constructor === Number);},ee = function ee(e) {return "string" == typeof e;},te = function te(e) {return null !== e && "object" === n(e);},ne = function ne(e) {if ("object" !== n(e) || null === e) return !1;var t = Object.getPrototypeOf(e);if (null === t) return !0;for (var r = t; null !== Object.getPrototypeOf(r);) {r = Object.getPrototypeOf(r);}return t === r;},re = function re(e) {return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === ue(e);},oe = function oe(e) {return void 0 === e;},ie = function ie(e) {return re(e) || te(e);},se = function se(e) {return "function" == typeof e;},ae = function ae(e) {return e instanceof Error;},ue = function ue(e) {return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase();},le = function le(e) {if ("string" != typeof e) return !1;var t = e[0];return !/[^a-zA-Z0-9]/.test(t);},ce = 0;Date.now || (Date.now = function () {return new Date().getTime();});var pe = { now: function now() {0 === ce && (ce = Date.now() - 1);var e = Date.now() - ce;return e > 4294967295 ? (ce += 4294967295, Date.now() - ce) : e;}, utc: function utc() {return Math.round(Date.now() / 1e3);} },he = function e(t, n, r, o) {if (!ie(t) || !ie(n)) return 0;for (var i, s = 0, a = Object.keys(n), u = 0, l = a.length; u < l; u++) {if (i = a[u], !(oe(n[i]) || r && r.includes(i))) if (ie(t[i]) && ie(n[i])) s += e(t[i], n[i], r, o);else {if (o && o.includes(n[i])) continue;t[i] !== n[i] && (t[i] = n[i], s += 1);}}return s;},fe = function fe(e) {return JSON.stringify(e, ["message", "code"]);},de = function de() {var e = new Date(),t = e.toISOString(),n = e.getTimezoneOffset() / 60,r = "";return r = n < 0 ? n > -10 ? "+0" + Math.abs(100 * n) : "+" + Math.abs(100 * n) : n >= 10 ? "-" + 100 * n : "-0" + 100 * n, t.replace("Z", r);},ge = function ge(e) {if (0 === e.length) return 0;for (var t = 0, n = 0, r = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) {n += e[t++].charCodeAt[t] <= 255 ? 1 : !1 === r ? 3 : 2;}return n;},me = function me(e) {var t = e || 99999999;return Math.round(Math.random() * t);},ye = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",ve = ye.length,_e = function _e(e, t) {for (var n in e) {if (e[n] === t) return !0;}return !1;},Ce = {},Me = function Me() {if (O) return "https:";var e = window.location.protocol;return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e;},Ie = function Ie(e) {return -1 === e.indexOf("http://") || -1 === e.indexOf("https://") ? "https://" + e : e.replace(/https|http/, "https");};function Se(e, t) {re(e) && re(t) ? t.forEach(function (t) {var n = t.key,r = t.value,o = e.find(function (e) {return e.key === n;});o ? o.value = r : e.push({ key: n, value: r });}) : J.warn("updateCustomField target 或 source 不是数组，忽略此次更新。");}var De = function De(e) {return e === t.GRP_PUBLIC;},Te = function Te(e) {return e === t.GRP_AVCHATROOM;},Ee = function Ee(e) {return ee(e) && e === t.CONV_SYSTEM;};function ke(e, t) {var n = {};return Object.keys(e).forEach(function (r) {n[r] = t(e[r], r);}), n;}var Ae = Object.prototype.hasOwnProperty;function we(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (ne(e)) {for (var t in e) {if (Ae.call(e, t)) return !1;}return !0;}return !("map" !== ue(e) && !function (e) {return "set" === ue(e);}(e) && !Q(e)) && 0 === e.size;}function Re(e, t, n) {if (void 0 === t) return !0;var r = !0;if ("object" === w(t).toLowerCase()) Object.keys(t).forEach(function (o) {var i = 1 === e.length ? e[0][o] : void 0;r = !!Oe(i, t[o], n, o) && r;});else if ("array" === w(t).toLowerCase()) for (var o = 0; o < t.length; o++) {r = !!Oe(e[o], t[o], n, t[o].name) && r;}if (r) return r;throw new Error("Params validate failed.");}function Oe(e, t, n, r) {if (void 0 === t) return !0;var o = !0;return t.required && we(e) && (Y.error("TIM [".concat(n, '] Missing required params: "').concat(r, '".')), o = !1), we(e) || w(e).toLowerCase() === t.type.toLowerCase() || (Y.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(r, '".Expected ').concat(t.type, ".")), o = !1), t.validator && !t.validator(e) && (Y.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), o = !1), o;}var Le = { SUCCESS: "JoinedSuccess", WAIT_APPROVAL: "WaitAdminApproval" },Ne = { SUCCESS: 0 },be = { IS_LOGIN: 1, IS_NOT_LOGIN: 0 },Pe = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" },Ge = { NOT_START: "notStart", PENDING: "pengding", RESOLVED: "resolved", REJECTED: "rejected" },Ue = function () {function e(n) {r(this, e), this.type = t.MSG_TEXT, this.content = { text: n.text || "" };}return i(e, [{ key: "setText", value: function value(e) {this.content.text = e;} }, { key: "sendable", value: function value() {return 0 !== this.content.text.length;} }]), e;}(),qe = { JSON: { TYPE: { C2C: { NOTICE: 1, COMMON: 9, EVENT: 10 }, GROUP: { COMMON: 3, TIP: 4, SYSTEM: 5, TIP2: 6 }, FRIEND: { NOTICE: 7 }, PROFILE: { NOTICE: 8 } }, SUBTYPE: { C2C: { COMMON: 0, READED: 92, KICKEDOUT: 96 }, GROUP: { COMMON: 0, LOVEMESSAGE: 1, TIP: 2, REDPACKET: 3 } }, OPTIONS: { GROUP: { JOIN: 1, QUIT: 2, KICK: 3, SET_ADMIN: 4, CANCEL_ADMIN: 5, MODIFY_GROUP_INFO: 6, MODIFY_MEMBER_INFO: 7 } } }, PROTOBUF: {}, IMAGE_TYPES: { ORIGIN: 1, LARGE: 2, SMALL: 3 }, IMAGE_FORMAT: { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 } },xe = 1,Fe = 2,He = 3,Be = 4,Ve = 5,Ke = 7,je = 8,$e = 9,Ye = 10,ze = 15,We = 255,Xe = 2,Je = 0,Qe = 1,Ze = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" },et = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" },tt = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" },nt = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" },rt = function () {function e(n) {r(this, e), this._imageMemoryURL = "", this._file = n.file, O ? this.createImageDataASURLInWXMiniApp(n.file) : this.createImageDataASURLInWeb(n.file), this._initImageInfoModel(), this.type = t.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: qe.IMAGE_FORMAT[n.imageFormat] || qe.IMAGE_FORMAT.UNKNOWN, uuid: n.uuid, imageInfoArray: [] }, this.initImageInfoArray(n.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl();}return i(e, [{ key: "_initImageInfoModel", value: function value() {var e = this;this._ImageInfoModel = function (t) {this.instanceID = me(9999999), this.sizeType = t.type || 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage;}, this._ImageInfoModel.prototype = { setSizeType: function setSizeType(e) {this.sizeType = e;}, setImageUrl: function setImageUrl(e) {e && (this.imageUrl = e);}, getImageUrl: function getImageUrl() {return this.imageUrl;} };} }, { key: "initImageInfoArray", value: function value(e) {for (var t = 2, n = null, r = null; t >= 0;) {r = void 0 === e || void 0 === e[t] ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e[t], (n = new this._ImageInfoModel(r)).setSizeType(t + 1), this.addImageInfo(n), t--;}} }, { key: "updateImageInfoArray", value: function value(e) {for (var t, n = this.content.imageInfoArray.length, r = 0; r < n; r++) {t = this.content.imageInfoArray[r], e.size && (t.size = e.size), e.url && t.setImageUrl(e.url), e.width && (t.width = e.width), e.height && (t.height = e.height);}} }, { key: "_autoFixUrl", value: function value() {for (var e = this.content.imageInfoArray.length, t = "", n = "", r = ["http", "https"], o = null, i = 0; i < e; i++) {this.content.imageInfoArray[i].url && "" !== (o = this.content.imageInfoArray[i]).imageUrl && (n = o.imageUrl.slice(0, o.imageUrl.indexOf("://") + 1), t = o.imageUrl.slice(o.imageUrl.indexOf("://") + 1), r.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[i].setImageUrl([n, t].join("")));}} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateImageFormat", value: function value(e) {this.content.imageFormat = e;} }, { key: "createImageDataASURLInWeb", value: function value(e) {void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]));} }, { key: "createImageDataASURLInWXMiniApp", value: function value(e) {e && e.url && (this._imageMemoryURL = e.url);} }, { key: "replaceImageInfo", value: function value(e, t) {this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e);} }, { key: "addImageInfo", value: function value(e) {this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e);} }, { key: "sendable", value: function value() {return 0 !== this.content.imageInfoArray.length && "" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size;} }]), e;}(),ot = function () {function e(n) {r(this, e), this.type = t.MSG_FACE, this.content = n || null;}return i(e, [{ key: "sendable", value: function value() {return null !== this.content;} }]), e;}(),it = function () {function e(n) {r(this, e), this.type = t.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: n.second, size: n.size, url: n.url, remoteAudioUrl: "", uuid: n.uuid };}return i(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateAudioUrl", value: function value(e) {this.content.remoteAudioUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.remoteAudioUrl;} }]), e;}(),st = { from: !0, groupID: !0, groupName: !0, to: !0 },at = function () {function e(n) {r(this, e), this.type = t.MSG_GRP_TIP, this.content = {}, this._initContent(n);}return i(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "remarkInfo":break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;case "operatorInfo":case "memberInfoList":break;case "msgMemberInfo":t.content.memberList = e[n], Object.defineProperty(t.content, "msgMemberInfo", { get: function get() {return J.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n", "msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n", "参考：群提示消息 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupTipPayload"), t.content.memberList.map(function (e) {return { userID: e.userID, shutupTime: e.muteTime };});} });break;default:t.content[n] = e[n];}}), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];st[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),ut = { from: !0, groupID: !0, name: !0, to: !0 },lt = function () {function e(n) {r(this, e), this.type = t.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(n);}return i(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "memberInfoList":break;case "remarkInfo":t.content.handleMessage = e[n];break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;default:t.content[n] = e[n];}});} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];ut[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),ct = { 70001: "UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。", 70002: "UserSig 长度为0，请检查传入的 UserSig 是否正确。", 70003: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70005: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70009: "UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70013: "请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70014: "请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70016: "密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(https://cloud.tencent.com/document/product/269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。", 70020: "SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。", 70050: "UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70051: "帐号被拉入黑名单。", 70052: "UserSig 已经失效，请重新生成，再次尝试。", 70107: "因安全原因被限制登录，请不要频繁登录。", 70169: "请求的用户帐号不存在。", 70114: "服务端内部超时，请稍后重试。", 70202: "服务端内部超时，请稍后重试。", 70206: "请求中批量数量不合法。", 70402: "参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。", 70403: "请求失败，需要 App 管理员权限。", 70398: "帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(https://cloud.tencent.com/document/product/269/32458)。", 70500: "服务端内部错误，请稍后重试。", 71e3: "删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。", 20001: "请求包非法。", 20002: "UserSig 或 A2 失效。", 20003: "消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。", 20004: "网络异常，请重试。", 20005: "服务端内部错误，请重试。", 20006: "触发发送单聊消息之前回调，App 后台返回禁止下发该消息。", 20007: "发送单聊消息，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(https://cloud.tencent.com/document/product/269/38656)。", 20009: "消息发送双方互相不是好友，禁止发送（配置单聊消息校验好友关系才会出现）。", 20010: "发送单聊消息，自己不是对方的好友（单向关系），禁止发送。", 20011: "发送单聊消息，对方不是自己的好友（单向关系），禁止发送。", 20012: "发送方被禁言，该条消息被禁止发送。", 20016: "消息撤回超过了时间限制（默认2分钟）。", 20018: "删除漫游内部错误。", 90001: "JSON 格式解析失败，请检查请求包是否符合 JSON 规范。", 90002: "JSON 格式请求包中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90003: "JSON 格式请求包体中缺少 To_Account 字段或者 To_Account 帐号不存在。", 90005: "JSON 格式请求包体中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。", 90006: "JSON 格式请求包体中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。", 90007: "JSON 格式请求包体中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。", 90008: "JSON 格式请求包体中缺少 From_Account 字段或者 From_Account 帐号不存在。", 90009: "请求需要 App 管理员权限。", 90010: "JSON 格式请求包不符合消息格式描述，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90011: "批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。", 90012: "To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。", 90026: "消息离线存储时间错误（最多不能超过7天）。", 90031: "JSON 格式请求包体中 SyncOtherMachine 字段不是 Integer 类型。", 90044: "JSON 格式请求包体中 MsgLifeTime 字段不是 Integer 类型。", 90048: "请求的用户帐号不存在。", 90054: "撤回请求中的 MsgKey 不合法。", 90994: "服务内部错误，请重试。", 90995: "服务内部错误，请重试。", 91e3: "服务内部错误，请重试。", 90992: "服务内部错误，请重试；如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。", 93e3: "JSON 数据包超长，消息包体请不要超过8k。", 91101: "Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。", 10002: "服务端内部错误，请重试。", 10003: "请求中的接口名称错误，请核对接口名称并重试。", 10004: "参数非法，请根据错误描述检查请求是否正确。", 10005: "请求包体中携带的帐号数量过多。", 10006: "操作频率限制，请尝试降低调用的频率。", 10007: "操作权限不足，例如 Public 群组中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。", 10008: "请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。", 10009: "该群不允许群主主动退出。", 10010: "群组不存在，或者曾经存在过，但是目前已经被解散。", 10011: "解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。", 10012: "发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。", 10013: "被邀请加入的用户已经是群成员。", 10014: "群已满员，无法将请求中的用户加入群组，如果是批量加人，可以尝试减少加入用户的数量。", 10015: "找不到指定 ID 的群组。", 10016: "App 后台通过第三方回调拒绝本次操作。", 10017: "因被禁言而不能发送消息，请检查发送者是否被设置禁言。", 10018: "应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。", 10019: "请求的用户帐号不存在。", 10021: "群组 ID 已被使用，请选择其他的群组 ID。", 10023: "发消息的频率超限，请延长两次发消息时间的间隔。", 10024: "此邀请或者申请请求已经被处理。", 10025: "群组 ID 已被使用，并且操作者为群主，可以直接使用。", 10026: "该 SDKAppID 请求的命令字已被禁用。", 10030: "请求撤回的消息不存在。", 10031: "消息撤回超过了时间限制（默认2分钟）。", 10032: "请求撤回的消息不支持撤回操作。", 10033: "群组类型不支持消息撤回操作。", 10034: "该消息类型不支持删除操作。", 10035: "音视频聊天室和在线成员广播大群不支持删除消息。", 10036: "音视频聊天室创建数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买预付费套餐“IM音视频聊天室”。", 10037: "单个用户可创建和加入的群组数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“单人可创建与加入群组数”。", 10038: "群成员数量超过限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“扩展群人数上限”。", 10041: "该应用（SDKAppID）已配置不支持群消息撤回。" },pt = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this)).code = e.code, o.message = ct[e.code] || e.message, o.data = e.data || {}, o;}return n;}(d(Error)),ht = 2e3,ft = 2001,dt = 2002,gt = 2003,mt = 2022,yt = 2023,vt = 2040,_t = 2100,Ct = 2103,Mt = 2105,It = 2106,St = 2108,Dt = 2109,Tt = 2110,Et = 2251,kt = 2252,At = 2253,wt = 2300,Rt = 2301,Ot = 2350,Lt = 2351,Nt = 2352,bt = 2400,Pt = 2401,Gt = 2402,Ut = 2403,qt = 2500,xt = 2501,Ft = 2502,Ht = 2600,Bt = 2601,Vt = 2620,Kt = 2621,jt = 2622,$t = 2660,Yt = 2661,zt = 2662,Wt = 2680,Xt = 2681,Jt = 2682,Qt = 2683,Zt = 2684,en = 2685,tn = 2700,nn = 2721,rn = 2722,on = 2740,sn = 2741,an = 2742,un = 2800,ln = 2801,cn = 2802,pn = 2803,hn = 2804,fn = 2805,dn = 2900,gn = 2901,mn = 2902,yn = 2903,vn = 2904,_n = 2999,Cn = 91101,Mn = 20002,In = 70001,Sn = "无 SDKAppID",Dn = "无 accountType",Tn = "无 userID",En = "无 userSig",kn = "无 tinyID",An = "无 a2key",wn = "未检测到 COS 上传插件",Rn = "消息发送失败",On = "MessageController.constructor() 需要参数 options",Ln = "需要 Message 的实例",Nn = 'Message.conversationType 只能为 "C2C" 或 "GROUP"',bn = "无法发送空文件",Pn = "回调函数运行时遇到错误，请检查接入侧代码",Gn = "消息撤回失败",Un = "请先选择一个图片",qn = "只允许上传 jpg png jpeg gif 格式的图片",xn = "图片大小超过20M，无法发送",Fn = "语音上传失败",Hn = "语音大小大于20M，无法发送",Bn = "视频上传失败",Vn = "视频大小超过100M，无法发送",Kn = "只允许上传 mp4 格式的视频",jn = "文件上传失败",$n = "请先选择一个文件",Yn = "文件大小超过100M，无法发送 ",zn = "缺少必要的参数文件 URL",Wn = "没有找到相应的会话，请检查传入参数",Xn = "没有找到相应的用户或群组，请检查传入参数",Jn = "未记录的会话类型",Qn = "非法的群类型，请检查传入参数",Zn = "不能加入 Private 类型的群组",er = "AVChatRoom 类型的群组不能转让群主",tr = "不能把群主转让给自己",nr = "不能解散 Private 类型的群组",rr = "加群失败，请检查传入参数或重试",or = "AVChatRoom 类型的群不支持邀请群成员",ir = "非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",sr = "不能在 AVChatRoom 类型的群组踢人",ar = "你不是群主，只有群主才有权限操作",ur = "不能在 Private / AVChatRoom 类型的群中设置群成员身份",lr = "不合法的群成员身份，请检查传入参数",cr = "不能设置自己的群成员身份，请检查传入参数",pr = "不能将自己禁言，请检查传入参数",hr = "传入 deleteFriend 接口的参数无效",fr = "传入 updateMyProfile 接口的参数无效",dr = "updateMyProfile 无标配资料字段或自定义资料字段",gr = "传入 addToBlacklist 接口的参数无效",mr = "传入 removeFromBlacklist 接口的参数无效",yr = "不能拉黑自己",vr = "网络层初始化错误，缺少 URL 参数",_r = "打包错误，未定义的 serverName",Cr = "未定义的 packageConfig",Mr = "未连接到网络",Ir = "不规范的参数名称",Sr = "意料外的通知条件",Dr = "_syncOffset 丢失",Tr = "获取 longpolling id 失败",Er = "接口需要 SDK 处于 ready 状态后才能调用",kr = ["jpg", "jpeg", "gif", "png"],Ar = ["mp4"],wr = function () {function e(n) {r(this, e);var o = this._check(n);if (o instanceof pt) throw o;this.type = t.MSG_FILE, this._percent = 0;var i = this._getFileInfo(n);this.content = { downloadFlag: 2, fileUrl: n.url || "", uuid: n.uuid, fileName: i.name || "", fileSize: i.size || 0 };}return i(e, [{ key: "_getFileInfo", value: function value(e) {if (e.fileName && e.fileSize) return { size: e.fileSize, name: e.fileName };if (O) return {};var t = e.file.files[0];return { size: t.size, name: t.name, type: t.type.slice(t.type.lastIndexOf("/") + 1).toLowerCase() };} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateFileUrl", value: function value(e) {this.content.fileUrl = e;} }, { key: "_check", value: function value(e) {if (e.size > 104857600) return new pt({ code: Gt, message: "".concat(Yn, ": ").concat(104857600, " bytes") });} }, { key: "sendable", value: function value() {return "" !== this.content.fileUrl && "" !== this.content.fileName && 0 !== this.content.fileSize;} }]), e;}(),Rr = function () {function e(n) {r(this, e), this.type = t.MSG_CUSTOM, this.content = { data: n.data || "", description: n.description || "", extension: n.extension || "" };}return i(e, [{ key: "setData", value: function value(e) {return this.content.data = e, this;} }, { key: "setDescription", value: function value(e) {return this.content.description = e, this;} }, { key: "setExtension", value: function value(e) {return this.content.extension = e, this;} }, { key: "sendable", value: function value() {return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;} }]), e;}(),Or = function () {function e(n) {r(this, e), this.type = t.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: n.remoteVideoUrl, videoFormat: n.videoFormat, videoSecond: parseInt(n.videoSecond, 10), videoSize: n.videoSize, videoUrl: n.videoUrl, videoDownloadFlag: 2, videoUUID: n.videoUUID, thumbUUID: n.thumbUUID, thumbFormat: n.thumbFormat, thumbWidth: n.thumbWidth, thumbHeight: n.thumbHeight, thumbSize: n.thumbSize, thumbDownloadFlag: 2, thumbUrl: n.thumbUrl };}return i(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateVideoUrl", value: function value(e) {e && (this.content.remoteVideoUrl = e);} }, { key: "sendable", value: function value() {return "" !== this.content.remoteVideoUrl;} }]), e;}(),Lr = function e(n) {r(this, e), this.type = t.MSG_GEO, this.content = n;},Nr = { 1: t.MSG_PRIORITY_HIGH, 2: t.MSG_PRIORITY_NORMAL, 3: t.MSG_PRIORITY_LOW, 4: t.MSG_PRIORITY_LOWEST },br = function () {function e(n) {r(this, e), this.ID = "", this.conversationID = n.conversationID || null, this.conversationType = n.conversationType || t.CONV_C2C, this.conversationSubType = n.conversationSubType, this.time = n.time || Math.ceil(Date.now() / 1e3), this.sequence = n.sequence || 0, this.clientSequence = n.clientSequence || n.sequence || 0, this.random = n.random || me(), this.priority = this._computePriority(n.priority), this.nick = "", this.avatar = "", this._elements = [], this.isPlaceMessage = n.isPlaceMessage || 0, this.isRevoked = 2 === n.isPlaceMessage || 8 === n.msgFlagBits, this.geo = {}, this.from = n.from || null, this.to = n.to || null, this.flow = "", this.isSystemMessage = n.isSystemMessage || !1, this.protocol = n.protocol || "JSON", this.isResend = !1, this.isRead = !1, this.status = n.status || Pe.SUCCESS, this.reInitialize(n.currentUser), this.extractGroupInfo(n.groupProfile || null);}return i(e, [{ key: "getElements", value: function value() {return this._elements;} }, { key: "extractGroupInfo", value: function value(e) {null !== e && (ee(e.fromAccountNick) && (this.nick = e.fromAccountNick), ee(e.fromAccountHeadurl) && (this.avatar = e.fromAccountHeadurl));} }, { key: "_initProxy", value: function value() {this.payload = this._elements[0].content, this.type = this._elements[0].type;} }, { key: "reInitialize", value: function value(e) {e && (this.status = this.from ? Pe.SUCCESS : Pe.UNSEND, !this.from && (this.from = e)), this._initFlow(e), this._initielizeSequence(e), this._concactConversationID(e), this.generateMessageID(e);} }, { key: "isSendable", value: function value() {return 0 !== this._elements.length && ("function" != typeof this._elements[0].sendable ? (J.warn("".concat(this._elements[0].type, ' need "boolean : sendable()" method')), !1) : this._elements[0].sendable());} }, { key: "_initTo", value: function value(e) {this.conversationType === t.CONV_GROUP && (this.to = e.groupID);} }, { key: "_initielizeSequence", value: function value(e) {0 === this.clientSequence && e && (this.clientSequence = function (e) {if (!e) return J.error("autoincrementIndex(string: key) need key parameter"), !1;if (void 0 === Ce[e]) {var t = new Date(),n = "3".concat(t.getHours()).slice(-2),r = "0".concat(t.getMinutes()).slice(-2),o = "0".concat(t.getSeconds()).slice(-2);Ce[e] = parseInt([n, r, o, "0001"].join("")), n = null, r = null, o = null, J.warn("utils.autoincrementIndex() create new sequence : ".concat(e, " = ").concat(Ce[e]));}return Ce[e]++;}(e)), 0 === this.sequence && this.conversationType === t.CONV_C2C && (this.sequence = this.clientSequence);} }, { key: "generateMessageID", value: function value(e) {var t = e === this.from ? 1 : 0,n = this.sequence > 0 ? this.sequence : this.clientSequence;this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t);} }, { key: "_initFlow", value: function value(e) {"" !== e && (e === this.from ? (this.flow = "out", this.isRead = !0) : this.flow = "in");} }, { key: "_concactConversationID", value: function value(e) {var n = this.to,r = "",o = this.conversationType;o !== t.CONV_SYSTEM ? (r = o === t.CONV_C2C ? e === this.from ? n : this.from : this.to, this.conversationID = "".concat(o).concat(r)) : this.conversationID = t.CONV_SYSTEM;} }, { key: "isElement", value: function value(e) {return e instanceof Ue || e instanceof rt || e instanceof ot || e instanceof it || e instanceof wr || e instanceof Or || e instanceof at || e instanceof lt || e instanceof Rr || e instanceof Lr;} }, { key: "setElement", value: function value(e) {var n = this;if (this.isElement(e)) return this._elements = [e], void this._initProxy();var r = function r(e) {switch (e.type) {case t.MSG_TEXT:n.setTextElement(e.content);break;case t.MSG_IMAGE:n.setImageElement(e.content);break;case t.MSG_AUDIO:n.setAudioElement(e.content);break;case t.MSG_FILE:n.setFileElement(e.content);break;case t.MSG_VIDEO:n.setVideoElement(e.content);break;case t.MSG_CUSTOM:n.setCustomElement(e.content);break;case t.MSG_GEO:n.setGEOElement(e.content);break;case t.MSG_GRP_TIP:n.setGroupTipElement(e.content);break;case t.MSG_GRP_SYS_NOTICE:n.setGroupSystemNoticeElement(e.content);break;case t.MSG_FACE:n.setFaceElement(e.content);break;default:J.warn(e.type, e.content, "no operation......");}};if (Array.isArray(e)) for (var o = 0; o < e.length; o++) {r(e[o]);} else r(e);this._initProxy();} }, { key: "setTextElement", value: function value(e) {var t = "string" == typeof e ? e : e.text,n = new Ue({ text: t });this._elements.push(n);} }, { key: "setImageElement", value: function value(e) {var t = new rt(e);this._elements.push(t);} }, { key: "setAudioElement", value: function value(e) {var t = new it(e);this._elements.push(t);} }, { key: "setFileElement", value: function value(e) {var t = new wr(e);this._elements.push(t);} }, { key: "setVideoElement", value: function value(e) {var t = new Or(e);this._elements.push(t);} }, { key: "setGEOElement", value: function value(e) {var t = new Lr(e);this._elements.push(t);} }, { key: "setCustomElement", value: function value(e) {var t = new Rr(e);this._elements.push(t);} }, { key: "setGroupTipElement", value: function value(e) {if (e.operatorInfo) {var t = e.operatorInfo,n = t.nick,r = t.avatar;ee(n) && (this.nick = n), ee(r) && (this.avatar = r);}var o = new at(e);this._elements.push(o);} }, { key: "setGroupSystemNoticeElement", value: function value(e) {var t = new lt(e);this._elements.push(t);} }, { key: "setFaceElement", value: function value(e) {var t = new ot(e);this._elements.push(t);} }, { key: "setIsRead", value: function value(e) {this.isRead = e;} }, { key: "_computePriority", value: function value(e) {if (oe(e)) return t.MSG_PRIORITY_NORMAL;if (ee(e) && -1 !== Object.values(Nr).indexOf(e)) return e;if (Z(e)) {var n = "" + e;if (-1 !== Object.keys(Nr).indexOf(n)) return Nr[n];}return t.MSG_PRIORITY_NORMAL;} }, { key: "elements", get: function get() {return J.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"), this._elements;} }]), e;}(),Pr = function Pr(e) {return !!e && (!!(function (e) {return ee(e) && e.slice(0, 3) === t.CONV_C2C;}(e) || function (e) {return ee(e) && e.slice(0, 5) === t.CONV_GROUP;}(e) || Ee(e)) || (console.warn("非法的会话 ID:".concat(e, "。会话 ID 组成方式：\n  C2C + userID（单聊）\n  GROUP + groupID（群聊）\n  @TIM#SYSTEM（系统通知会话）")), !1));},Gr = { login: { userID: { type: "String", required: !0 }, userSig: { type: "String", required: !0 } }, addToBlacklist: { userIDList: { type: "Array", required: !0 } }, mutilParam: [{ name: "paramName", type: "Number", required: !0 }, { name: "paramName", type: "String", required: !0 }], on: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("on 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("on 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"), !0);} }], once: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("once 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("once 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("once 接口的 handler 参数推荐使用具名函数。"), !0);} }], off: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("off 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("off 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("off 接口的 handler 参数为匿名函数，无法取消订阅。"), !0);} }], sendMessage: [{ name: "message", type: "Object", required: !0 }], getMessageList: { conversationID: { type: "String", required: !0, validator: function validator(e) {return Pr(e);} }, nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function validator(e) {return !(!oe(e) && !/^[1-9][0-9]*$/.test(e)) || (console.warn("getMessageList 接口的 count 参数必须为正整数"), !1);} } }, setMessageRead: { conversationID: { type: "String", required: !0, validator: function validator(e) {return Pr(e);} } }, getConversationProfile: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return Pr(e);} }], deleteConversation: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return Pr(e);} }], getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: { type: "String", required: !0 }, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: { type: "Array", required: !0 } }, createGroup: { name: { type: "String", required: !0 } }, joinGroup: { groupID: { type: "String", required: !0 }, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [{ name: "groupID", type: "String", required: !0 }], handleApplication: { message: { type: "Object", required: !0 }, handleAction: { type: "String", required: !0 }, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: { type: "String", required: !0 }, newOwnerID: { type: "String", required: !0 } }, updateGroupProfile: { groupID: { type: "String", required: !0 }, muteAllMembers: { type: "Boolean" } }, dismissGroup: [{ name: "groupID", type: "String", required: !0 }], searchGroupByID: [{ name: "groupID", type: "String", required: !0 }], getGroupMemberList: { groupID: { type: "String", required: !0 }, offset: { type: "Number" }, count: { type: "Number" } }, getGroupMemberProfile: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 }, memberCustomFieldFilter: { type: "Array" } }, addGroupMemeber: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 } }, setGroupMemberRole: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, role: { type: "String", required: !0 } }, setGroupMemberMuteTime: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, muteTime: { type: "Number", validator: function validator(e) {return e >= 0;} } }, setGroupMemberNameCard: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, nameCard: { type: "String", required: !0, validator: function validator(e) {return !0 !== /^\s+$/.test(e);} } }, setMessageRemindType: { groupID: { type: "String", required: !0 }, messageRemindType: { type: "String", required: !0 } }, setGroupMemberCustomField: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, memberCustomField: { type: "Array", required: !0 } }, deleteGroupMember: { groupID: { type: "String", required: !0 } }, createTextMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return ee(e.text) ? 0 !== e.text.length || (console.warn("createTextMessage 消息内容不能为空。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1) : (console.warn("createTextMessage payload.text 类型必须为字符串。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1);} } }, createCustomMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return e.data && !ee(e.data) ? (console.warn("createCustomMessage payload.data 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1) : e.description && !ee(e.description) ? (console.warn("createCustomMessage payload.description 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1) : !(e.extension && !ee(e.extension)) || (console.warn("createCustomMessage payload.extension 类型必须为 String。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createCustomMessage"), !1);} } }, createImageMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createImageMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (R) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createImageMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createImageMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;}return !0;}, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createImageMessage 没有 onProgress 回调，您将无法获取图片上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !0;} } } }, createAudioMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0 }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createAudioMessage 没有 onProgress 回调，您将无法获取音频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createAudioMessage"), !0;} } }, createVideoMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createVideoMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (R) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createVideoMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createVideoMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createVideoMessage 没有 onProgress 回调，您将无法获取视频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !0;} } }, createFaceMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return !!ne(e) && (Z(e.index) ? !!ee(e.data) || (console.warn("createFaceMessage payload.data 类型必须为 String！"), !1) : (console.warn("createFaceMessage payload.index 类型必须为 Number！"), !1));} } }, createFileMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (oe(e.file)) return console.warn("createFileMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (R) {if (!(e.file instanceof HTMLInputElement || Q(e.file))) return console.warn("createFileMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createFileMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return oe(e) && console.warn("createFileMessage 没有 onProgress 回调，您将无法获取文件上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !0;} } }, revokeMessage: [{ name: "message", type: "Object", required: !0, validator: function validator(e) {return e instanceof br ? e.conversationType === t.CONV_SYSTEM ? (console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"), !1) : !0 !== e.isRevoked || (console.warn("revokeMessage 消息已经被撤回，请勿重复操作"), !1) : (console.warn("revokeMessage 参数 message 必须为 Message(https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html) 实例。"), !1);} }], getUserProfile: { userIDList: { type: "Array", validator: function validator(e) {return re(e) ? (0 === e.length && console.warn("getUserProfile userIDList 不能为空数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !0) : (console.warn("getUserProfile userIDList 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !1);} } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function validator(e) {return !!oe(e) || !!re(e) || (console.warn("updateMyProfile profileCustomField 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile"), !1);} } } },Ur = { login: "login", logout: "logout", on: "on", once: "once", off: "off", setLogLevel: "setLogLevel", downloadLog: "downloadLog", registerPlugin: "registerPlugin", destroy: "destroy", createTextMessage: "createTextMessage", createImageMessage: "createImageMessage", createAudioMessage: "createAudioMessage", createVideoMessage: "createVideoMessage", createCustomMessage: "createCustomMessage", createFaceMessage: "createFaceMessage", createFileMessage: "createFileMessage", sendMessage: "sendMessage", resendMessage: "resendMessage", getMessageList: "getMessageList", setMessageRead: "setMessageRead", revokeMessage: "revokeMessage", getConversationList: "getConversationList", getConversationProfile: "getConversationProfile", deleteConversation: "deleteConversation", getGroupList: "getGroupList", getGroupProfile: "getGroupProfile", createGroup: "createGroup", joinGroup: "joinGroup", updateGroupProfile: "updateGroupProfile", quitGroup: "quitGroup", dismissGroup: "dismissGroup", changeGroupOwner: "changeGroupOwner", searchGroupByID: "searchGroupByID", setMessageRemindType: "setMessageRemindType", handleGroupApplication: "handleGroupApplication", getGroupMemberProfile: "getGroupMemberProfile", getGroupMemberList: "getGroupMemberList", addGroupMember: "addGroupMember", deleteGroupMember: "deleteGroupMember", setGroupMemberNameCard: "setGroupMemberNameCard", setGroupMemberMuteTime: "setGroupMemberMuteTime", setGroupMemberRole: "setGroupMemberRole", setGroupMemberCustomField: "setGroupMemberCustomField", getMyProfile: "getMyProfile", getUserProfile: "getUserProfile", updateMyProfile: "updateMyProfile", getBlacklist: "getBlacklist", addToBlacklist: "addToBlacklist", removeFromBlacklist: "removeFromBlacklist", getFriendList: "getFriendList" },qr = "1.7.3",xr = "537048168",Fr = "10",Hr = "protobuf",Br = "json",Vr = { HOST: { TYPE: 3, ACCESS_LAYER_TYPES: { SANDBOX: 1, TEST: 2, PRODUCTION: 3 }, CURRENT: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, PRODUCTION: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, SANDBOX: { COMMON: "https://events.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, TEST: { COMMON: "https://test.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://test.tim.qq.com" }, setCurrent: function setCurrent() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;switch (e) {case this.ACCESS_LAYER_TYPES.SANDBOX:this.CURRENT = this.SANDBOX, this.TYPE = this.ACCESS_LAYER_TYPES.SANDBOX;break;case this.ACCESS_LAYER_TYPES.TEST:this.CURRENT = this.TEST, this.TYPE = this.ACCESS_LAYER_TYPES.TEST;break;default:this.CURRENT = this.PRODUCTION, this.TYPE = this.ACCESS_LAYER_TYPES.PRODUCTION;}} }, NAME: { OPEN_IM: "openim", GROUP: "group_open_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr" }, CMD: { ACCESS_LAYER: "accesslayer", LOGIN: "login", LOGOUT_LONG_POLL: "longpollinglogout", LOGOUT_ALL: "logout", PORTRAIT_GET: "portrait_get_all", PORTRAIT_SET: "portrait_set", GET_LONG_POLL_ID: "getlongpollingid", LONG_POLL: "longpolling", AVCHATROOM_LONG_POLL: "get_msg", FRIEND_ADD: "friend_add", FRIEND_GET_ALL: "friend_get_all", FRIEND_DELETE: "friend_delete", RESPONSE_PENDENCY: "friend_response", GET_PENDENCY: "pendency_get", DELETE_PENDENCY: "pendency_delete", GET_GROUP_PENDENCY: "get_pendency", GET_BLACKLIST: "black_list_get", ADD_BLACKLIST: "black_list_add", DELETE_BLACKLIST: "black_list_delete", CREATE_GROUP: "create_group", GET_JOINED_GROUPS: "get_joined_group_list", SEND_MESSAGE: "sendmsg", REVOKE_C2C_MESSAGE: "msgwithdraw", SEND_GROUP_MESSAGE: "send_group_msg", REVOKE_GROUP_MESSAGE: "group_msg_recall", GET_GROUP_INFO: "get_group_info", GET_GROUP_MEMBER_INFO: "get_specified_group_member_info", GET_GROUP_MEMBER_LIST: "get_group_member_info", QUIT_GROUP: "quit_group", CHANGE_GROUP_OWNER: "change_group_owner", DESTROY_GROUP: "destroy_group", ADD_GROUP_MEMBER: "add_group_member", DELETE_GROUP_MEMBER: "delete_group_member", SEARCH_GROUP_BY_ID: "get_group_public_info", APPLY_JOIN_GROUP: "apply_join_group", HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group", MODIFY_GROUP_INFO: "modify_group_base_info", MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info", DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg", GET_CONVERSATION_LIST: "get", PAGING_GET_CONVERSATION_LIST: "page_get", DELETE_CONVERSATION: "delete", GET_MESSAGES: "getmsg", GET_C2C_ROAM_MESSAGES: "getroammsg", GET_GROUP_ROAM_MESSAGES: "group_msg_get", SET_C2C_MESSAGE_READ: "msgreaded", SET_GROUP_MESSAGE_READ: "msg_read_report", FILE_READ_AND_WRITE_AUTHKEY: "authkey", FILE_UPLOAD: "pic_up", COS_SIGN: "cos", TIM_WEB_REPORT: "tim_web_report", BIG_DATA_HALLWAY_AUTH_KEY: "authkey" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v1", group_open_long_polling_http_noauth_svc: "v1", imopenstat: "v4", im_cos_sign_svr: "v4", webim: "v4" } };Vr.HOST.setCurrent(Vr.HOST.ACCESS_LAYER_TYPES.PRODUCTION);var Kr = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", avatar: "FaceUrl" }, response: { GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", GroupWithdrawInfoArray: "revokedInfos", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupName: "name", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension" }, ignoreKeyWord: ["C2C", "ID", "USP"] },jr = "_contextWasUpdated",$r = "_contextWasReset",Yr = "_a2KeyAndTinyIDUpdated",zr = "_specifiedConfigUpdated",Wr = "_noticeIsSynchronizing",Xr = "_noticeIsSynchronized",Jr = "_messageSent",Qr = "_syncMessageProcessing",Zr = "_syncMessageFinished",eo = "_receiveInstantMessage",to = "_receiveGroupInstantMessage",no = "_receveGroupSystemNotice",ro = "_messageRevoked",oo = "_longPollGetIDFailed",io = "_longPollRequestFailed",so = "_longPollResponseOK",ao = "_longPollFastStart",uo = "_longPollSlowStart",lo = "_longPollKickedOut",co = "_longPollMitipuleDeviceKickedOut",po = "_longPollGetNewC2CNotice",ho = "_longPollGetNewGroupMessages",fo = "_longPollGetNewGroupTips",go = "_longPollGetNewGroupNotice",mo = "_longPollGetNewFriendMessages",yo = "_longPollProfileModified",vo = "_longPollNoticeReceiveSystemOrders",_o = " _longpollGroupMessageRevoked",Co = "_longpollC2CMessageRevoked",Mo = "_avlongPollRequestFailed",Io = "_avlongPollResponseOK",So = "_onGroupListUpdated",Do = "_loginSuccess",To = "_signLogoutExcuting",Eo = "_logoutSuccess",ko = "_a2keyExpired",Ao = "_errorHasBeenDetected",wo = "_onConversationListUpdated",Ro = "_onConversationListProfileUpdated",Oo = "_conversationDeleted",Lo = "onProfileUpdated",No = "joinAVChatRoomSuccess",bo = "joinAVChatRoomSuccessNoAuth",Po = "_sdkStateReady";function Go(e, t) {if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");t = Object.assign({ pascalCase: !1 }, t);var n;return 0 === (e = Array.isArray(e) ? e.map(function (e) {return e.trim();}).filter(function (e) {return e.length;}).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = Uo(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {return t.toUpperCase();}).replace(/\d+(\w|$)/g, function (e) {return e.toUpperCase();}), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n);}var Uo = function Uo(e) {for (var t = !1, n = !1, r = !1, o = 0; o < e.length; o++) {var i = e[o];t && /[a-zA-Z]/.test(i) && i.toUpperCase() === i ? (e = e.slice(0, o) + "-" + e.slice(o), t = !1, r = n, n = !0, o++) : n && r && /[a-zA-Z]/.test(i) && i.toLowerCase() === i ? (e = e.slice(0, o - 1) + "-" + e.slice(o - 1), r = n, n = !1, t = !0) : (t = i.toLowerCase() === i && i.toUpperCase() !== i, r = n, n = i.toUpperCase() === i && i.toLowerCase() !== i);}return e;};function qo(e, t, n) {var r = [],o = 0,i = function e(t, n) {if (++o > 10) return o--, t;if (re(t)) {var i = t.map(function (t) {return te(t) ? e(t, n) : t;});return o--, i;}if (te(t)) {var s = (a = t, u = function u(e, t) {if (!le(t)) return !1;if ((s = t) !== Go(s)) {for (var o = !0, i = 0; i < Kr.ignoreKeyWord.length; i++) {if (t.includes(Kr.ignoreKeyWord[i])) {o = !1;break;}}o && r.push(t);}var s;return oe(n[t]) ? function (e) {return e[0].toUpperCase() + Go(e).slice(1);}(t) : n[t];}, l = Object.create(null), Object.keys(a).forEach(function (e) {var t = u(a[e], e);t && (l[t] = a[e]);}), l);return s = ke(s, function (t, r) {return re(t) || te(t) ? e(t, n) : t;}), o--, s;}var a, u, l;}(e, t = u({}, Kr.request, {}, t));return r.length > 0 && n.innerEmitter.emit(Ao, { code: dn, message: Ir }), i;}function xo(e, t) {if (t = u({}, Kr.response, {}, t), re(e)) return e.map(function (e) {return te(e) ? xo(e, t) : e;});if (te(e)) {var n = (r = e, o = function o(e, n) {return oe(t[n]) ? Go(n) : t[n];}, i = {}, Object.keys(r).forEach(function (e) {i[o(r[e], e)] = r[e];}), i);return n = ke(n, function (e) {return re(e) || te(e) ? xo(e, t) : e;});}var r, o, i;}var Fo = function () {function e(t) {var n = this;r(this, e), this.url = "", this.requestData = null, this.method = t.method || "POST", this.callback = function (e) {return xo(e = t.decode(e), n._getResponseMap(t));}, this._initializeServerMap(), this._initializeURL(t), this._initializeRequestData(t);}return i(e, [{ key: "_initializeServerMap", value: function value() {this._serverMap = Object.create(null);var e = "";for (var t in Vr.NAME) {if (Object.prototype.hasOwnProperty.call(Vr.NAME, t)) switch (e = Vr.NAME[t]) {case Vr.NAME.PIC:this._serverMap[e] = Vr.HOST.CURRENT.PIC;break;case Vr.NAME.IM_COS_SIGN:this._serverMap[e] = Vr.HOST.CURRENT.COS;break;default:this._serverMap[e] = Vr.HOST.CURRENT.COMMON;}}} }, { key: "_getHost", value: function value(e) {if (void 0 !== this._serverMap[e]) return this._serverMap[e];throw new pt({ code: pn, message: _r });} }, { key: "_initializeURL", value: function value(e) {var t = e.serverName,n = e.cmd,r = this._getHost(t),o = "".concat(r, "/").concat(Vr.NAME_VERSION[t], "/").concat(t, "/").concat(n);o += "?".concat(this._getQueryString(e.queryString)), this.url = o;} }, { key: "getUrl", value: function value() {return this.url.replace(/&reqtime=(\d+)/, "&reqtime=".concat(Math.ceil(+new Date() / 1e3)));} }, { key: "_initializeRequestData", value: function value(e) {var t,n = e.requestData;t = this._requestDataCleaner(n), this.requestData = e.encode(t);} }, { key: "_requestDataCleaner", value: function value(e) {var t = Array.isArray(e) ? [] : Object.create(null);for (var r in e) {Object.prototype.hasOwnProperty.call(e, r) && le(r) && null !== e[r] && ("object" !== n(e[r]) ? t[r] = e[r] : t[r] = this._requestDataCleaner.bind(this)(e[r]));}return t;} }, { key: "_getQueryString", value: function value(e) {var t = [];for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && ("function" != typeof e[n] ? t.push("".concat(n, "=").concat(e[n])) : t.push("".concat(n, "=").concat(e[n]())));}return t.join("&");} }, { key: "_getResponseMap", value: function value(e) {if (e.keyMaps && e.keyMaps.response && Object.keys(e.keyMaps.response).length > 0) return e.keyMaps.response;} }]), e;}();function Ho(e) {this.mixin(e);}Ho.mixin = function (e) {var t = e.prototype || e;t._isReady = !1, t.ready = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e) return this._isReady ? void (t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e));}, t.triggerReady = function () {var e = this;this._isReady = !0, setTimeout(function () {var t = e._readyQueue;e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {e.call(this);}, e);}, 1);}, t.resetReady = function () {this._isReady = !1, this._readyQueue = [];}, t.isReady = function () {return this._isReady;};};var Bo = function () {function e(t) {r(this, e), Ho.mixin(this), this.tim = t;}return i(e, [{ key: "isLoggedIn", value: function value() {return this.tim.context.login === be.IS_LOGIN || !!this.tim.context.a2Key;} }, { key: "createTransportCapsule", value: function value(e) {var t = this.tim.packageConfig.get(e);return t ? new Fo(t) : null;} }, { key: "request", value: function value(e) {var t = this.createTransportCapsule(e);return t || J.error("unknown transport capsule, please check!", e), this.tim.connectionController.request(t);} }, { key: "emitInnerEvent", value: function value(e, t) {this.tim.innerEmitter.emit(e, t);} }, { key: "emitOuterEvent", value: function value(e, t) {this.tim.outerEmitter.emit(e, t);} }, { key: "reset", value: function value() {J.warn(["method: IMController.reset() method must be implemented"].join());} }, { key: "probeNetwork", value: function value() {return this.tim.netMonitor.probe();} }, { key: "getNetworkType", value: function value() {return this.tim.netMonitor.getNetworkType();} }, { key: "getPlatform", value: function value() {var e = "web";return B ? e = "wechat" : O && (e = "wxmp"), e;} }]), e;}(),Vo = function () {function e(t, n) {r(this, e), this.data = t, this._innerEmitter = n, this.defaultData = {}, Object.assign(this.defaultData, t), this.initGetterAndSetter();}return i(e, [{ key: "initGetterAndSetter", value: function value() {var e = this,t = function t(_t2) {Object.defineProperty(e, _t2, { enumerable: !0, configurable: !0, get: function get() {return e.data[_t2];}, set: function set(n) {e.data[_t2] !== n && (e.data[_t2] = n, e.onChange.bind(e)(_t2, n));} });};for (var n in e.data) {Object.prototype.hasOwnProperty.call(e.data, n) && t(n);}} }, { key: "onChange", value: function value(e, t) {this._innerEmitter.emit(jr, { key: e, value: t });} }, { key: "reset", value: function value() {for (var e in J.log("Context.reset"), this.data) {Object.prototype.hasOwnProperty.call(this.data, e) && (this.data[e] = this.defaultData.hasOwnProperty(e) ? this.defaultData[e] : null);}} }]), e;}(),Ko = function (e) {l(n, e);var t = y(n);function n(e) {var o;r(this, n);var i = (o = t.call(this, e)).tim.loginInfo;return o._context = new Vo({ login: be.IS_NOT_LOGIN, SDKAppID: i.SDKAppID, appIDAt3rd: null, accountType: i.accountType, identifier: i.identifier, tinyID: null, identifierNick: i.identifierNick, userSig: i.userSig, a2Key: null, contentType: "json", apn: 1 }, o.tim.innerEmitter), o._initListener(), o;}return i(n, [{ key: "reset", value: function value() {this._context.reset(), this.emitInnerEvent($r);} }, { key: "_initListener", value: function value() {this.tim.innerEmitter.on(jr, this._onContextMemberChange, this), this.tim.innerEmitter.on(Do, this._updateA2KeyAndTinyID, this);} }, { key: "_updateA2KeyAndTinyID", value: function value(e) {var t = e.data,n = t.a2Key,r = t.tinyID;this._context.a2Key = n, this._context.tinyID = r, this.emitInnerEvent(Yr), this.triggerReady();} }, { key: "getContext", value: function value() {return this._context;} }, { key: "_onContextMemberChange", value: function value(e) {var t = e.data,n = t.key,r = t.value;("tinyID" === n || "a2Key" === n) && (r.length <= 0 ? this._context.login = be.IS_NOT_LOGIN : this._context.login = null !== this._context.a2Key ? be.IS_LOGIN : be.IS_NOT_LOGIN);} }]), n;}(Bo),jo = function e(t) {r(this, e), this.code = 0, this.data = t || {};},$o = null,Yo = function Yo(e) {$o = e;},zo = function zo(e) {return e instanceof jo ? (J.warn("IMPromise.resolve 此函数会自动用options创建IMResponse实例，调用侧不需创建，建议修改！"), Promise.resolve(e)) : Promise.resolve(new jo(e));},Wo = function Wo(t) {var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (t instanceof pt) return n && null !== $o && $o.emit(e.ERROR, t), Promise.reject(t);if (t instanceof Error) {var r = new pt({ code: yn, message: t.message });return n && null !== $o && $o.emit(e.ERROR, r), Promise.reject(r);}if (oe(t) || oe(t.code) || oe(t.message)) J.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else {if (Z(t.code) && ee(t.message)) {var o = new pt(t);return n && null !== $o && $o.emit(e.ERROR, o), Promise.reject(o);}J.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!");}},Xo = "sdkReady",Jo = "login",Qo = "longpolling",Zo = "longpollingAV",ei = "sendMessage",ti = "initConversationList",ni = "initGroupList",ri = "upload",oi = function () {function e() {r(this, e), this.SDKAppID = "", this.version = "", this.tinyID = "", this.userID = "", this.platform = "", this.method = "", this.time = "", this.startts = 0, this.endts = 0, this.timespan = 0, this.codeint = 0, this.message = "", this.text = "", this.msgType = "", this.networkType = "", this.platform = "", this._sentFlag = !1;}return i(e, [{ key: "setCommonInfo", value: function value(e, t, n, r, o) {this.SDKAppID = "".concat(e), this.version = "".concat(t), this.tinyID = n, this.userID = r, this.platform = o, this.time = de(), this.startts && this.endts && !this.timespan && (this.timespan = Math.abs(this.endts - this.startts));} }, { key: "setMethod", value: function value(e) {return this.method = e, this;} }, { key: "setStart", value: function value() {this.startts = Date.now();} }, { key: "setEnd", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this._sentFlag || (this.endts = Date.now(), t ? (this._sentFlag = !0, this._eventStatController.pushIn(this)) : setTimeout(function () {e._sentFlag = !0, e._eventStatController.pushIn(e);}, 0));} }, { key: "setError", value: function value(e, t, n) {return e instanceof Error ? (this._sentFlag || (this.setNetworkType(n), t ? (e.code && this.setCode(e.code), e.message && this.setMessage(e.message)) : (this.setCode(fn), this.setMessage(Mr))), this) : (J.warn("SSOLogData.setError value not instanceof Error, please check!"), this);} }, { key: "setCode", value: function value(e) {return oe(e) || this._sentFlag || (Z(e) ? this.codeint = e : J.warn("SSOLogData.setCode value not a number, please check!")), this;} }, { key: "setMessage", value: function value(e) {return oe(e) || this._sentFlag ? this : ee(e) ? (this.message = e, this) : this;} }, { key: "setText", value: function value(e) {return Z(e) ? this.text = e.toString() : ee(e) && (this.text = e), this;} }, { key: "setMessageType", value: function value(e) {return this.msgType = e, this;} }, { key: "setNetworkType", value: function value(e) {return oe(e) ? J.warn("SSOLogData.setNetworkType value is undefined, please check!") : this.networkType = e, this;} }], [{ key: "bindController", value: function value(t) {e.prototype._eventStatController = t;} }]), e;}(),ii = "sdkConstruct",si = "sdkReady",ai = "accessLayer",ui = "login",li = "getCosAuthKey",ci = "upload",pi = "sendMessage",hi = "getC2CRoamingMessages",fi = "getGroupRoamingMessages",di = "revokeMessage",gi = "setC2CMessageRead",mi = "setGroupMessageRead",yi = "getConversationList",vi = "getConversationListInStorage",_i = "syncConversationList",Ci = "createGroup",Mi = "applyJoinGroup",Ii = "quitGroup",Si = "changeGroupOwner",Di = "dismissGroup",Ti = "updateGroupProfile",Ei = "getGroupList",ki = "getGroupListInStorage",Ai = "getGroupLastSequence",wi = "setGroupMemberMuteTime",Ri = "setGroupMemberNameCard",Oi = "setGroupMemberRole",Li = "setGroupMemberCustomField",Ni = "getLongPollID",bi = "longPollingError",Pi = "networkJitter",Gi = "fastStart",Ui = "slowStart",qi = "getUserProfile",xi = "getBlacklist",Fi = "mpHideToShow",Hi = function (n) {l(s, n);var o = y(s);function s(e) {var t;return r(this, s), (t = o.call(this, e))._initializeListener(), t;}return i(s, [{ key: "login", value: function value(e) {if (this.isLoggedIn()) {var t = "您已经登录账号".concat(e.identifier, "！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return J.warn(t), zo({ actionStatus: "OK", errorCode: 0, errorInfo: t, repeatLogin: !0 });}J.log("SignController.login userID=", e.identifier), J.time(Jo);var n = this._checkLoginInfo(e);return we(n) ? (this.tim.context.identifier = e.identifier, this.tim.context.userSig = e.userSig, this.tim.context.identifier && this.tim.context.userSig ? this._accessLayer() : void 0) : Wo(n);} }, { key: "_isLoginCurrentUser", value: function value(e) {return this.tim.context.identifier === e;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(lo, this._onKickedOut, this), e.on(co, this._onMultipleDeviceKickedOut, this), e.on(ko, this._onUserSigExpired, this);} }, { key: "_accessLayer", value: function value() {var e = this,t = new oi();return t.setMethod(ai).setStart(), J.log("SignController._accessLayer."), this.request({ name: "accessLayer", action: "query" }).then(function (n) {return t.setCode(0).setNetworkType(e.getNetworkType()).setText(n.data.webImAccessLayer).setEnd(), J.log("SignController._accessLayer ok. webImAccessLayer=".concat(n.data.webImAccessLayer)), 1 === n.data.webImAccessLayer && Vr.HOST.setCurrent(n.data.webImAccessLayer), e._login();}).catch(function (n) {return e.probeNetwork().then(function (r) {var o = v(r, 2),i = o[0],s = o[1];t.setError(n, i, s).setEnd(!0), e.tim.eventStatController.reportAtOnce();}), J.error("SignController._accessLayer failed. error:".concat(n)), Wo(n);});} }, { key: "_login", value: function value() {var e = this,t = new oi();return t.setMethod(ui).setStart(), this.request({ name: "login", action: "query" }).then(function (n) {var r = null;if (!n.data.tinyID) throw r = new pt({ code: mt, message: kn }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;if (!n.data.a2Key) throw r = new pt({ code: yt, message: An }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;return t.setCode(0).setNetworkType(e.getNetworkType()).setText("".concat(e.tim.loginInfo.identifier)).setEnd(), J.log("SignController.login ok. userID=".concat(e.tim.loginInfo.identifier, " loginCost=").concat(J.timeEnd(Jo), "ms")), e.emitInnerEvent(Do, { a2Key: n.data.a2Key, tinyID: n.data.tinyID }), zo(n.data);}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = v(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd(!0);}), J.error("SignController.login failed. error:".concat(n)), Wo(n);});} }, { key: "logout", value: function value() {return J.info("SignController.logout"), this.emitInnerEvent(To), this._logout(Qe).then(this._emitLogoutSuccess.bind(this)).catch(this._emitLogoutSuccess.bind(this));} }, { key: "_logout", value: function value(e) {var t = this.tim.notificationController,n = e === Je ? "logout" : "longPollLogout",r = e === Je ? { name: n, action: "query" } : { name: n, action: "query", param: { longPollID: t.getLongPollID() } };return this.request(r).catch(function (e) {return J.error("SignController._logout error:", e), Wo(e);});} }, { key: "_checkLoginInfo", value: function value(e) {var t = 0,n = "";return null === e.SDKAppID ? (t = ht, n = Sn) : null === e.accountType ? (t = ft, n = Dn) : null === e.identifier ? (t = dt, n = Tn) : null === e.userSig && (t = gt, n = En), we(t) || we(n) ? {} : { code: t, message: n };} }, { key: "_emitLogoutSuccess", value: function value() {return this.emitInnerEvent(Eo), zo({});} }, { key: "_onKickedOut", value: function value() {var n = this;J.warn("SignController._onKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {n.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_MULT_ACCOUNT });});} }, { key: "_onMultipleDeviceKickedOut", value: function value() {var n = this;J.warn("SignController._onMultipleDeviceKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {n.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_MULT_DEVICE });});} }, { key: "_onUserSigExpired", value: function value() {J.warn("SignController._onUserSigExpired: userSig 签名过期被踢下线"), this.emitOuterEvent(e.KICKED_OUT, { type: t.KICKED_OUT_USERSIG_EXPIRED }), this.tim.resetSDK();} }, { key: "reset", value: function value() {J.info("SignController.reset");} }]), s;}(Bo),Bi = function Bi(e, t) {return function () {for (var n = new Array(arguments.length), r = 0; r < n.length; r++) {n[r] = arguments[r];}return e.apply(t, n);};},Vi = Object.prototype.toString;function Ki(e) {return "[object Array]" === Vi.call(e);}function ji(e) {return void 0 === e;}function $i(e) {return null !== e && "object" == typeof e;}function Yi(e) {return "[object Function]" === Vi.call(e);}function zi(e, t) {if (null != e) if ("object" != typeof e && (e = [e]), Ki(e)) for (var n = 0, r = e.length; n < r; n++) {t.call(null, e[n], n, e);} else for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);}}var Wi = { isArray: Ki, isArrayBuffer: function isArrayBuffer(e) {return "[object ArrayBuffer]" === Vi.call(e);}, isBuffer: function isBuffer(e) {return null !== e && !ji(e) && null !== e.constructor && !ji(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}, isFormData: function isFormData(e) {return "undefined" != typeof FormData && e instanceof FormData;}, isArrayBufferView: function isArrayBufferView(e) {return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;}, isString: function isString(e) {return "string" == typeof e;}, isNumber: function isNumber(e) {return "number" == typeof e;}, isObject: $i, isUndefined: ji, isDate: function isDate(e) {return "[object Date]" === Vi.call(e);}, isFile: function isFile(e) {return "[object File]" === Vi.call(e);}, isBlob: function isBlob(e) {return "[object Blob]" === Vi.call(e);}, isFunction: Yi, isStream: function isStream(e) {return $i(e) && Yi(e.pipe);}, isURLSearchParams: function isURLSearchParams(e) {return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;}, isStandardBrowserEnv: function isStandardBrowserEnv() {return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;}, forEach: zi, merge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n;}for (var r = 0, o = arguments.length; r < o; r++) {zi(arguments[r], n);}return t;}, deepMerge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n;}for (var r = 0, o = arguments.length; r < o; r++) {zi(arguments[r], n);}return t;}, extend: function extend(e, t, n) {return zi(t, function (t, r) {e[r] = n && "function" == typeof t ? Bi(t, n) : t;}), e;}, trim: function trim(e) {return e.replace(/^\s*/, "").replace(/\s*$/, "");} };function Xi(e) {return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");}var Ji = function Ji(e, t, n) {if (!t) return e;var r;if (n) r = n(t);else if (Wi.isURLSearchParams(t)) r = t.toString();else {var o = [];Wi.forEach(t, function (e, t) {null != e && (Wi.isArray(e) ? t += "[]" : e = [e], Wi.forEach(e, function (e) {Wi.isDate(e) ? e = e.toISOString() : Wi.isObject(e) && (e = JSON.stringify(e)), o.push(Xi(t) + "=" + Xi(e));}));}), r = o.join("&");}if (r) {var i = e.indexOf("#");-1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + r;}return e;};function Qi() {this.handlers = [];}Qi.prototype.use = function (e, t) {return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;}, Qi.prototype.eject = function (e) {this.handlers[e] && (this.handlers[e] = null);}, Qi.prototype.forEach = function (e) {Wi.forEach(this.handlers, function (t) {null !== t && e(t);});};var Zi = Qi,es = function es(e, t, n) {return Wi.forEach(n, function (n) {e = n(e, t);}), e;},ts = function ts(e) {return !(!e || !e.__CANCEL__);};function ns() {throw new Error("setTimeout has not been defined");}function rs() {throw new Error("clearTimeout has not been defined");}var os = ns,is = rs;function ss(e) {if (os === setTimeout) return setTimeout(e, 0);if ((os === ns || !os) && setTimeout) return os = setTimeout, setTimeout(e, 0);try {return os(e, 0);} catch (t) {try {return os.call(null, e, 0);} catch (t) {return os.call(this, e, 0);}}}"function" == typeof V.setTimeout && (os = setTimeout), "function" == typeof V.clearTimeout && (is = clearTimeout);var as,us = [],ls = !1,cs = -1;function ps() {ls && as && (ls = !1, as.length ? us = as.concat(us) : cs = -1, us.length && hs());}function hs() {if (!ls) {var e = ss(ps);ls = !0;for (var t = us.length; t;) {for (as = us, us = []; ++cs < t;) {as && as[cs].run();}cs = -1, t = us.length;}as = null, ls = !1, function (e) {if (is === clearTimeout) return clearTimeout(e);if ((is === rs || !is) && clearTimeout) return is = clearTimeout, clearTimeout(e);try {is(e);} catch (t) {try {return is.call(null, e);} catch (t) {return is.call(this, e);}}}(e);}}function fs(e, t) {this.fun = e, this.array = t;}fs.prototype.run = function () {this.fun.apply(null, this.array);};function ds() {}var gs = ds,ms = ds,ys = ds,vs = ds,_s = ds,Cs = ds,Ms = ds;var Is = V.performance || {},Ss = Is.now || Is.mozNow || Is.msNow || Is.oNow || Is.webkitNow || function () {return new Date().getTime();};var Ds = new Date();var Ts = { nextTick: function nextTick(e) {var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}us.push(new fs(e, t)), 1 !== us.length || ls || ss(hs);}, title: "browser", browser: !0, env: {}, argv: [], version: "", versions: {}, on: gs, addListener: ms, once: ys, off: vs, removeListener: _s, removeAllListeners: Cs, emit: Ms, binding: function binding(e) {throw new Error("process.binding is not supported");}, cwd: function cwd() {return "/";}, chdir: function chdir(e) {throw new Error("process.chdir is not supported");}, umask: function umask() {return 0;}, hrtime: function hrtime(e) {var t = .001 * Ss.call(Is),n = Math.floor(t),r = Math.floor(t % 1 * 1e9);return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r];}, platform: "browser", release: {}, config: {}, uptime: function uptime() {return (new Date() - Ds) / 1e3;} },Es = function Es(e, t) {Wi.forEach(e, function (n, r) {r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);});},ks = function ks(e, t, n, r, o) {return function (e, t, n, r, o) {return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };}, e;}(new Error(e), t, n, r, o);},As = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],ws = Wi.isStandardBrowserEnv() ? function () {var e,t = /(msie|trident)/i.test(navigator.userAgent),n = document.createElement("a");function r(e) {var r = e;return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname };}return e = r(window.location.href), function (t) {var n = Wi.isString(t) ? r(t) : t;return n.protocol === e.protocol && n.host === e.host;};}() : function () {return !0;},Rs = Wi.isStandardBrowserEnv() ? { write: function write(e, t, n, r, o, i) {var s = [];s.push(e + "=" + encodeURIComponent(t)), Wi.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), Wi.isString(r) && s.push("path=" + r), Wi.isString(o) && s.push("domain=" + o), !0 === i && s.push("secure"), document.cookie = s.join("; ");}, read: function read(e) {var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;}, remove: function remove(e) {this.write(e, "", Date.now() - 864e5);} } : { write: function write() {}, read: function read() {return null;}, remove: function remove() {} },Os = function Os(e) {return new Promise(function (t, n) {var r = e.data,o = e.headers;Wi.isFormData(r) && delete o["Content-Type"];var i = new XMLHttpRequest();if (e.auth) {var s = e.auth.username || "",a = e.auth.password || "";o.Authorization = "Basic " + btoa(s + ":" + a);}var u,l,c = (u = e.baseURL, l = e.url, u && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(l) ? function (e, t) {return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;}(u, l) : l);if (i.open(e.method.toUpperCase(), Ji(c, e.params, e.paramsSerializer), !0), i.timeout = e.timeout, i.onreadystatechange = function () {if (i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:"))) {var r,o,s,a,u,l = "getAllResponseHeaders" in i ? (r = i.getAllResponseHeaders(), u = {}, r ? (Wi.forEach(r.split("\n"), function (e) {if (a = e.indexOf(":"), o = Wi.trim(e.substr(0, a)).toLowerCase(), s = Wi.trim(e.substr(a + 1)), o) {if (u[o] && As.indexOf(o) >= 0) return;u[o] = "set-cookie" === o ? (u[o] ? u[o] : []).concat([s]) : u[o] ? u[o] + ", " + s : s;}}), u) : u) : null,c = { data: e.responseType && "text" !== e.responseType ? i.response : i.responseText, status: i.status, statusText: i.statusText, headers: l, config: e, request: i };!function (e, t, n) {var r = n.config.validateStatus;!r || r(n.status) ? e(n) : t(ks("Request failed with status code " + n.status, n.config, null, n.request, n));}(t, n, c), i = null;}}, i.onabort = function () {i && (n(ks("Request aborted", e, "ECONNABORTED", i)), i = null);}, i.onerror = function () {n(ks("Network Error", e, null, i)), i = null;}, i.ontimeout = function () {var t = "timeout of " + e.timeout + "ms exceeded";e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(ks(t, e, "ECONNABORTED", i)), i = null;}, Wi.isStandardBrowserEnv()) {var p = Rs,h = (e.withCredentials || ws(c)) && e.xsrfCookieName ? p.read(e.xsrfCookieName) : void 0;h && (o[e.xsrfHeaderName] = h);}if ("setRequestHeader" in i && Wi.forEach(o, function (e, t) {void 0 === r && "content-type" === t.toLowerCase() ? delete o[t] : i.setRequestHeader(t, e);}), Wi.isUndefined(e.withCredentials) || (i.withCredentials = !!e.withCredentials), e.responseType) try {i.responseType = e.responseType;} catch (f) {if ("json" !== e.responseType) throw f;}"function" == typeof e.onDownloadProgress && i.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && i.upload && i.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {i && (i.abort(), n(e), i = null);}), void 0 === r && (r = null), i.send(r);});},Ls = { "Content-Type": "application/x-www-form-urlencoded" };function Ns(e, t) {!Wi.isUndefined(e) && Wi.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);}var bs,Ps = { adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== Ts && "[object process]" === Object.prototype.toString.call(Ts)) && (bs = Os), bs), transformRequest: [function (e, t) {return Es(t, "Accept"), Es(t, "Content-Type"), Wi.isFormData(e) || Wi.isArrayBuffer(e) || Wi.isBuffer(e) || Wi.isStream(e) || Wi.isFile(e) || Wi.isBlob(e) ? e : Wi.isArrayBufferView(e) ? e.buffer : Wi.isURLSearchParams(e) ? (Ns(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : Wi.isObject(e) ? (Ns(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;}], transformResponse: [function (e) {if ("string" == typeof e) try {e = JSON.parse(e);} catch (t) {}return e;}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {return e >= 200 && e < 300;} };Ps.headers = { common: { Accept: "application/json, text/plain, */*" } }, Wi.forEach(["delete", "get", "head"], function (e) {Ps.headers[e] = {};}), Wi.forEach(["post", "put", "patch"], function (e) {Ps.headers[e] = Wi.merge(Ls);});var Gs = Ps;function Us(e) {e.cancelToken && e.cancelToken.throwIfRequested();}var qs = function qs(e) {return Us(e), e.headers = e.headers || {}, e.data = es(e.data, e.headers, e.transformRequest), e.headers = Wi.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), Wi.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {delete e.headers[t];}), (e.adapter || Gs.adapter)(e).then(function (t) {return Us(e), t.data = es(t.data, t.headers, e.transformResponse), t;}, function (t) {return ts(t) || (Us(e), t && t.response && (t.response.data = es(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);});},xs = function xs(e, t) {t = t || {};var n = {},r = ["url", "method", "params", "data"],o = ["headers", "auth", "proxy"],i = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];Wi.forEach(r, function (e) {void 0 !== t[e] && (n[e] = t[e]);}), Wi.forEach(o, function (r) {Wi.isObject(t[r]) ? n[r] = Wi.deepMerge(e[r], t[r]) : void 0 !== t[r] ? n[r] = t[r] : Wi.isObject(e[r]) ? n[r] = Wi.deepMerge(e[r]) : void 0 !== e[r] && (n[r] = e[r]);}), Wi.forEach(i, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);});var s = r.concat(o).concat(i),a = Object.keys(t).filter(function (e) {return -1 === s.indexOf(e);});return Wi.forEach(a, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);}), n;};function Fs(e) {this.defaults = e, this.interceptors = { request: new Zi(), response: new Zi() };}Fs.prototype.request = function (e) {"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = xs(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";var t = [qs, void 0],n = Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {t.unshift(e.fulfilled, e.rejected);}), this.interceptors.response.forEach(function (e) {t.push(e.fulfilled, e.rejected);}); t.length;) {n = n.then(t.shift(), t.shift());}return n;}, Fs.prototype.getUri = function (e) {return e = xs(this.defaults, e), Ji(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");}, Wi.forEach(["delete", "get", "head", "options"], function (e) {Fs.prototype[e] = function (t, n) {return this.request(Wi.merge(n || {}, { method: e, url: t }));};}), Wi.forEach(["post", "put", "patch"], function (e) {Fs.prototype[e] = function (t, n, r) {return this.request(Wi.merge(r || {}, { method: e, url: t, data: n }));};});var Hs = Fs;function Bs(e) {this.message = e;}Bs.prototype.toString = function () {return "Cancel" + (this.message ? ": " + this.message : "");}, Bs.prototype.__CANCEL__ = !0;var Vs = Bs;function Ks(e) {if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new Promise(function (e) {t = e;});var n = this;e(function (e) {n.reason || (n.reason = new Vs(e), t(n.reason));});}Ks.prototype.throwIfRequested = function () {if (this.reason) throw this.reason;}, Ks.source = function () {var e;return { token: new Ks(function (t) {e = t;}), cancel: e };};var js = Ks;function $s(e) {var t = new Hs(e),n = Bi(Hs.prototype.request, t);return Wi.extend(n, Hs.prototype, t), Wi.extend(n, t), n;}var Ys = $s(Gs);Ys.Axios = Hs, Ys.create = function (e) {return $s(xs(Ys.defaults, e));}, Ys.Cancel = Vs, Ys.CancelToken = js, Ys.isCancel = ts, Ys.all = function (e) {return Promise.all(e);}, Ys.spread = function (e) {return function (t) {return e.apply(null, t);};};var zs = Ys,Ws = Ys;zs.default = Ws;var Xs = zs,Js = Xs.create({ timeout: 3e4, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });Js.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return Z(n) && (r = n), r !== Ne.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === Js.defaults.withCredentials && J.warn("Network Error, try to close `IMAxios.defaults.withCredentials` to false. (IMAxios.js)"), Js.defaults.withCredentials = !1), Promise.reject(e);});var Qs = function () {function e() {r(this, e);}return i(e, [{ key: "request", value: function value(e) {console.warn("请注意： ConnectionBase.request() 方法必须被派生类重写:"), console.log("参数如下：\n    * @param {String} options.url string 是 开发者服务器接口地址\n    * @param {*} options.data - string/object/ArrayBuffer 否 请求的参数\n    * @param {Object} options.header - Object 否 设置请求的 header，\n    * @param {String} options.method - string GET 否 HTTP 请求方法\n    * @param {String} options.dataType - string json 否 返回的数据格式\n    * @param {String} options.responseType - string text 否 响应的数据类型\n    * @param {Boolean} isRetry - string text false 是否为重试的请求\n   ");} }, { key: "_checkOptions", value: function value(e) {if (!1 == !!e.url) throw new pt({ code: cn, message: vr });} }, { key: "_initOptions", value: function value(e) {e.method = ["POST", "GET", "PUT", "DELETE", "OPTION"].indexOf(e.method) >= 0 ? e.method : "POST", e.dataType = e.dataType || "json", e.responseType = e.responseType || "json";} }]), e;}(),Zs = function (e) {l(n, e);var t = y(n);function n() {var e;return r(this, n), (e = t.call(this)).retry = 2, e;}return i(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), this._requestWithRetry({ url: e.url, data: e.data, method: e.method });} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return Js(e).catch(function (r) {return t.retry && n < t.retry ? t._requestWithRetry(e, ++n) : Wo(new pt({ code: r.code || "", message: r.message || "" }));});} }]), n;}(Qs),ea = [],ta = [],na = "undefined" != typeof Uint8Array ? Uint8Array : Array,ra = !1;function oa() {ra = !0;for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; t < n; ++t) {ea[t] = e[t], ta[e.charCodeAt(t)] = t;}ta["-".charCodeAt(0)] = 62, ta["_".charCodeAt(0)] = 63;}function ia(e, t, n) {for (var r, o, i = [], s = t; s < n; s += 3) {r = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], i.push(ea[(o = r) >> 18 & 63] + ea[o >> 12 & 63] + ea[o >> 6 & 63] + ea[63 & o]);}return i.join("");}function sa(e) {var t;ra || oa();for (var n = e.length, r = n % 3, o = "", i = [], s = 0, a = n - r; s < a; s += 16383) {i.push(ia(e, s, s + 16383 > a ? a : s + 16383));}return 1 === r ? (t = e[n - 1], o += ea[t >> 2], o += ea[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += ea[t >> 10], o += ea[t >> 4 & 63], o += ea[t << 2 & 63], o += "="), i.push(o), i.join("");}function aa(e, t, n, r, o) {var i,s,a = 8 * o - r - 1,u = (1 << a) - 1,l = u >> 1,c = -7,p = n ? o - 1 : 0,h = n ? -1 : 1,f = e[t + p];for (p += h, i = f & (1 << -c) - 1, f >>= -c, c += a; c > 0; i = 256 * i + e[t + p], p += h, c -= 8) {;}for (s = i & (1 << -c) - 1, i >>= -c, c += r; c > 0; s = 256 * s + e[t + p], p += h, c -= 8) {;}if (0 === i) i = 1 - l;else {if (i === u) return s ? NaN : Infinity * (f ? -1 : 1);s += Math.pow(2, r), i -= l;}return (f ? -1 : 1) * s * Math.pow(2, i - r);}function ua(e, t, n, r, o, i) {var s,a,u,l = 8 * i - o - 1,c = (1 << l) - 1,p = c >> 1,h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,f = r ? 0 : i - 1,d = r ? 1 : -1,g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || Infinity === t ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (t += s + p >= 1 ? h / u : h * Math.pow(2, 1 - p)) * u >= 2 && (s++, u /= 2), s + p >= c ? (a = 0, s = c) : s + p >= 1 ? (a = (t * u - 1) * Math.pow(2, o), s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + f] = 255 & a, f += d, a /= 256, o -= 8) {;}for (s = s << o | a, l += o; l > 0; e[n + f] = 255 & s, f += d, s /= 256, l -= 8) {;}e[n + f - d] |= 128 * g;}var la = {}.toString,ca = Array.isArray || function (e) {return "[object Array]" == la.call(e);};function pa() {return fa.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;}function ha(e, t) {if (pa() < t) throw new RangeError("Invalid typed array length");return fa.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = fa.prototype : (null === e && (e = new fa(t)), e.length = t), e;}function fa(e, t, n) {if (!(fa.TYPED_ARRAY_SUPPORT || this instanceof fa)) return new fa(e, t, n);if ("number" == typeof e) {if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return ma(this, e);}return da(this, e, t, n);}function da(e, t, n, r) {if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, r) {if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);fa.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = fa.prototype : e = ya(e, t);return e;}(e, t, n, r) : "string" == typeof t ? function (e, t, n) {"string" == typeof n && "" !== n || (n = "utf8");if (!fa.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');var r = 0 | Ca(t, n),o = (e = ha(e, r)).write(t, n);o !== r && (e = e.slice(0, o));return e;}(e, t, n) : function (e, t) {if (_a(t)) {var n = 0 | va(t.length);return 0 === (e = ha(e, n)).length || t.copy(e, 0, 0, n), e;}if (t) {if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? ha(e, 0) : ya(e, t);if ("Buffer" === t.type && ca(t.data)) return ya(e, t.data);}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");}(e, t);}function ga(e) {if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');}function ma(e, t) {if (ga(t), e = ha(e, t < 0 ? 0 : 0 | va(t)), !fa.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) {e[n] = 0;}return e;}function ya(e, t) {var n = t.length < 0 ? 0 : 0 | va(t.length);e = ha(e, n);for (var r = 0; r < n; r += 1) {e[r] = 255 & t[r];}return e;}function va(e) {if (e >= pa()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + pa().toString(16) + " bytes");return 0 | e;}function _a(e) {return !(null == e || !e._isBuffer);}function Ca(e, t) {if (_a(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var r = !1;;) {switch (t) {case "ascii":case "latin1":case "binary":return n;case "utf8":case "utf-8":case void 0:return $a(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return 2 * n;case "hex":return n >>> 1;case "base64":return Ya(e).length;default:if (r) return $a(e).length;t = ("" + t).toLowerCase(), r = !0;}}}function Ma(e, t, n) {var r = !1;if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";if ((n >>>= 0) <= (t >>>= 0)) return "";for (e || (e = "utf8");;) {switch (e) {case "hex":return Pa(this, t, n);case "utf8":case "utf-8":return La(this, t, n);case "ascii":return Na(this, t, n);case "latin1":case "binary":return ba(this, t, n);case "base64":return Oa(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return Ga(this, t, n);default:if (r) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), r = !0;}}}function Ia(e, t, n) {var r = e[t];e[t] = e[n], e[n] = r;}function Sa(e, t, n, r, o) {if (0 === e.length) return -1;if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {if (o) return -1;n = e.length - 1;} else if (n < 0) {if (!o) return -1;n = 0;}if ("string" == typeof t && (t = fa.from(t, r)), _a(t)) return 0 === t.length ? -1 : Da(e, t, n, r, o);if ("number" == typeof t) return t &= 255, fa.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : Da(e, [t], n, r, o);throw new TypeError("val must be string, number or Buffer");}function Da(e, t, n, r, o) {var i,s = 1,a = e.length,u = t.length;if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {if (e.length < 2 || t.length < 2) return -1;s = 2, a /= 2, u /= 2, n /= 2;}function l(e, t) {return 1 === s ? e[t] : e.readUInt16BE(t * s);}if (o) {var c = -1;for (i = n; i < a; i++) {if (l(e, i) === l(t, -1 === c ? 0 : i - c)) {if (-1 === c && (c = i), i - c + 1 === u) return c * s;} else -1 !== c && (i -= i - c), c = -1;}} else for (n + u > a && (n = a - u), i = n; i >= 0; i--) {for (var p = !0, h = 0; h < u; h++) {if (l(e, i + h) !== l(t, h)) {p = !1;break;}}if (p) return i;}return -1;}function Ta(e, t, n, r) {n = Number(n) || 0;var o = e.length - n;r ? (r = Number(r)) > o && (r = o) : r = o;var i = t.length;if (i % 2 != 0) throw new TypeError("Invalid hex string");r > i / 2 && (r = i / 2);for (var s = 0; s < r; ++s) {var a = parseInt(t.substr(2 * s, 2), 16);if (isNaN(a)) return s;e[n + s] = a;}return s;}function Ea(e, t, n, r) {return za($a(t, e.length - n), e, n, r);}function ka(e, t, n, r) {return za(function (e) {for (var t = [], n = 0; n < e.length; ++n) {t.push(255 & e.charCodeAt(n));}return t;}(t), e, n, r);}function Aa(e, t, n, r) {return ka(e, t, n, r);}function wa(e, t, n, r) {return za(Ya(t), e, n, r);}function Ra(e, t, n, r) {return za(function (e, t) {for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) {n = e.charCodeAt(s), r = n >> 8, o = n % 256, i.push(o), i.push(r);}return i;}(t, e.length - n), e, n, r);}function Oa(e, t, n) {return 0 === t && n === e.length ? sa(e) : sa(e.slice(t, n));}function La(e, t, n) {n = Math.min(e.length, n);for (var r = [], o = t; o < n;) {var i,s,a,u,l = e[o],c = null,p = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;if (o + p <= n) switch (p) {case 1:l < 128 && (c = l);break;case 2:128 == (192 & (i = e[o + 1])) && (u = (31 & l) << 6 | 63 & i) > 127 && (c = u);break;case 3:i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (u = (15 & l) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (c = u);break;case 4:i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & l) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (c = u);}null === c ? (c = 65533, p = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), o += p;}return function (e) {var t = e.length;if (t <= 4096) return String.fromCharCode.apply(String, e);var n = "",r = 0;for (; r < t;) {n += String.fromCharCode.apply(String, e.slice(r, r += 4096));}return n;}(r);}fa.TYPED_ARRAY_SUPPORT = void 0 === V.TYPED_ARRAY_SUPPORT || V.TYPED_ARRAY_SUPPORT, fa.poolSize = 8192, fa._augment = function (e) {return e.__proto__ = fa.prototype, e;}, fa.from = function (e, t, n) {return da(null, e, t, n);}, fa.TYPED_ARRAY_SUPPORT && (fa.prototype.__proto__ = Uint8Array.prototype, fa.__proto__ = Uint8Array), fa.alloc = function (e, t, n) {return function (e, t, n, r) {return ga(t), t <= 0 ? ha(e, t) : void 0 !== n ? "string" == typeof r ? ha(e, t).fill(n, r) : ha(e, t).fill(n) : ha(e, t);}(null, e, t, n);}, fa.allocUnsafe = function (e) {return ma(null, e);}, fa.allocUnsafeSlow = function (e) {return ma(null, e);}, fa.isBuffer = function (e) {return null != e && (!!e._isBuffer || Wa(e) || function (e) {return "function" == typeof e.readFloatLE && "function" == typeof e.slice && Wa(e.slice(0, 0));}(e));}, fa.compare = function (e, t) {if (!_a(e) || !_a(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) {if (e[o] !== t[o]) {n = e[o], r = t[o];break;}}return n < r ? -1 : r < n ? 1 : 0;}, fa.isEncoding = function (e) {switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return !0;default:return !1;}}, fa.concat = function (e, t) {if (!ca(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return fa.alloc(0);var n;if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) {t += e[n].length;}var r = fa.allocUnsafe(t),o = 0;for (n = 0; n < e.length; ++n) {var i = e[n];if (!_a(i)) throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r, o), o += i.length;}return r;}, fa.byteLength = Ca, fa.prototype._isBuffer = !0, fa.prototype.swap16 = function () {var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {Ia(this, t, t + 1);}return this;}, fa.prototype.swap32 = function () {var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {Ia(this, t, t + 3), Ia(this, t + 1, t + 2);}return this;}, fa.prototype.swap64 = function () {var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {Ia(this, t, t + 7), Ia(this, t + 1, t + 6), Ia(this, t + 2, t + 5), Ia(this, t + 3, t + 4);}return this;}, fa.prototype.toString = function () {var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? La(this, 0, e) : Ma.apply(this, arguments);}, fa.prototype.equals = function (e) {if (!_a(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === fa.compare(this, e);}, fa.prototype.inspect = function () {var e = "";return this.length > 0 && (e = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (e += " ... ")), "<Buffer " + e + ">";}, fa.prototype.compare = function (e, t, n, r, o) {if (!_a(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");if (r >= o && t >= n) return 0;if (r >= o) return -1;if (t >= n) return 1;if (this === e) return 0;for (var i = (o >>>= 0) - (r >>>= 0), s = (n >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(r, o), l = e.slice(t, n), c = 0; c < a; ++c) {if (u[c] !== l[c]) {i = u[c], s = l[c];break;}}return i < s ? -1 : s < i ? 1 : 0;}, fa.prototype.includes = function (e, t, n) {return -1 !== this.indexOf(e, t, n);}, fa.prototype.indexOf = function (e, t, n) {return Sa(this, e, t, n, !0);}, fa.prototype.lastIndexOf = function (e, t, n) {return Sa(this, e, t, n, !1);}, fa.prototype.write = function (e, t, n, r) {if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;else {if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);}var o = this.length - t;if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");r || (r = "utf8");for (var i = !1;;) {switch (r) {case "hex":return Ta(this, e, t, n);case "utf8":case "utf-8":return Ea(this, e, t, n);case "ascii":return ka(this, e, t, n);case "latin1":case "binary":return Aa(this, e, t, n);case "base64":return wa(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return Ra(this, e, t, n);default:if (i) throw new TypeError("Unknown encoding: " + r);r = ("" + r).toLowerCase(), i = !0;}}}, fa.prototype.toJSON = function () {return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };};function Na(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(127 & e[o]);}return r;}function ba(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(e[o]);}return r;}function Pa(e, t, n) {var r = e.length;(!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);for (var o = "", i = t; i < n; ++i) {o += ja(e[i]);}return o;}function Ga(e, t, n) {for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) {o += String.fromCharCode(r[i] + 256 * r[i + 1]);}return o;}function Ua(e, t, n) {if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");}function qa(e, t, n, r, o, i) {if (!_a(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');if (n + r > e.length) throw new RangeError("Index out of range");}function xa(e, t, n, r) {t < 0 && (t = 65535 + t + 1);for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) {e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);}}function Fa(e, t, n, r) {t < 0 && (t = 4294967295 + t + 1);for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) {e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255;}}function Ha(e, t, n, r, o, i) {if (n + r > e.length) throw new RangeError("Index out of range");if (n < 0) throw new RangeError("Index out of range");}function Ba(e, t, n, r, o) {return o || Ha(e, 0, n, 4), ua(e, t, n, r, 23, 4), n + 4;}function Va(e, t, n, r, o) {return o || Ha(e, 0, n, 8), ua(e, t, n, r, 52, 8), n + 8;}fa.prototype.slice = function (e, t) {var n,r = this.length;if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), fa.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = fa.prototype;else {var o = t - e;n = new fa(o, void 0);for (var i = 0; i < o; ++i) {n[i] = this[i + e];}}return n;}, fa.prototype.readUIntLE = function (e, t, n) {e |= 0, t |= 0, n || Ua(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r;}, fa.prototype.readUIntBE = function (e, t, n) {e |= 0, t |= 0, n || Ua(e, t, this.length);for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) {r += this[e + --t] * o;}return r;}, fa.prototype.readUInt8 = function (e, t) {return t || Ua(e, 1, this.length), this[e];}, fa.prototype.readUInt16LE = function (e, t) {return t || Ua(e, 2, this.length), this[e] | this[e + 1] << 8;}, fa.prototype.readUInt16BE = function (e, t) {return t || Ua(e, 2, this.length), this[e] << 8 | this[e + 1];}, fa.prototype.readUInt32LE = function (e, t) {return t || Ua(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];}, fa.prototype.readUInt32BE = function (e, t) {return t || Ua(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);}, fa.prototype.readIntLE = function (e, t, n) {e |= 0, t |= 0, n || Ua(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;}, fa.prototype.readIntBE = function (e, t, n) {e |= 0, t |= 0, n || Ua(e, t, this.length);for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);) {i += this[e + --r] * o;}return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;}, fa.prototype.readInt8 = function (e, t) {return t || Ua(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];}, fa.prototype.readInt16LE = function (e, t) {t || Ua(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;}, fa.prototype.readInt16BE = function (e, t) {t || Ua(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;}, fa.prototype.readInt32LE = function (e, t) {return t || Ua(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;}, fa.prototype.readInt32BE = function (e, t) {return t || Ua(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];}, fa.prototype.readFloatLE = function (e, t) {return t || Ua(e, 4, this.length), aa(this, e, !0, 23, 4);}, fa.prototype.readFloatBE = function (e, t) {return t || Ua(e, 4, this.length), aa(this, e, !1, 23, 4);}, fa.prototype.readDoubleLE = function (e, t) {return t || Ua(e, 8, this.length), aa(this, e, !0, 52, 8);}, fa.prototype.readDoubleBE = function (e, t) {return t || Ua(e, 8, this.length), aa(this, e, !1, 52, 8);}, fa.prototype.writeUIntLE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || qa(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = 1,i = 0;for (this[t] = 255 & e; ++i < n && (o *= 256);) {this[t + i] = e / o & 255;}return t + n;}, fa.prototype.writeUIntBE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || qa(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = n - 1,i = 1;for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) {this[t + o] = e / i & 255;}return t + n;}, fa.prototype.writeUInt8 = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 1, 255, 0), fa.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;}, fa.prototype.writeUInt16LE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 2, 65535, 0), fa.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : xa(this, e, t, !0), t + 2;}, fa.prototype.writeUInt16BE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 2, 65535, 0), fa.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : xa(this, e, t, !1), t + 2;}, fa.prototype.writeUInt32LE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 4, 4294967295, 0), fa.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : Fa(this, e, t, !0), t + 4;}, fa.prototype.writeUInt32BE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 4, 4294967295, 0), fa.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : Fa(this, e, t, !1), t + 4;}, fa.prototype.writeIntLE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);qa(this, e, t, n, o - 1, -o);}var i = 0,s = 1,a = 0;for (this[t] = 255 & e; ++i < n && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, fa.prototype.writeIntBE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);qa(this, e, t, n, o - 1, -o);}var i = n - 1,s = 1,a = 0;for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) {e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / s >> 0) - a & 255;}return t + n;}, fa.prototype.writeInt8 = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 1, 127, -128), fa.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;}, fa.prototype.writeInt16LE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 2, 32767, -32768), fa.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : xa(this, e, t, !0), t + 2;}, fa.prototype.writeInt16BE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 2, 32767, -32768), fa.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : xa(this, e, t, !1), t + 2;}, fa.prototype.writeInt32LE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 4, 2147483647, -2147483648), fa.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : Fa(this, e, t, !0), t + 4;}, fa.prototype.writeInt32BE = function (e, t, n) {return e = +e, t |= 0, n || qa(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), fa.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : Fa(this, e, t, !1), t + 4;}, fa.prototype.writeFloatLE = function (e, t, n) {return Ba(this, e, t, !0, n);}, fa.prototype.writeFloatBE = function (e, t, n) {return Ba(this, e, t, !1, n);}, fa.prototype.writeDoubleLE = function (e, t, n) {return Va(this, e, t, !0, n);}, fa.prototype.writeDoubleBE = function (e, t, n) {return Va(this, e, t, !1, n);}, fa.prototype.copy = function (e, t, n, r) {if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");if (r < 0) throw new RangeError("sourceEnd out of bounds");r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);var o,i = r - n;if (this === e && n < t && t < r) for (o = i - 1; o >= 0; --o) {e[o + t] = this[o + n];} else if (i < 1e3 || !fa.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) {e[o + t] = this[o + n];} else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);return i;}, fa.prototype.fill = function (e, t, n, r) {if ("string" == typeof e) {if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {var o = e.charCodeAt(0);o < 256 && (e = o);}if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");if ("string" == typeof r && !fa.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);} else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");if (n <= t) return this;var i;if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < n; ++i) {this[i] = e;} else {var s = _a(e) ? e : $a(new fa(e, r).toString()),a = s.length;for (i = 0; i < n - t; ++i) {this[i + t] = s[i % a];}}return this;};var Ka = /[^+\/0-9A-Za-z-_]/g;function ja(e) {return e < 16 ? "0" + e.toString(16) : e.toString(16);}function $a(e, t) {var n;t = t || Infinity;for (var r = e.length, o = null, i = [], s = 0; s < r; ++s) {if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {if (!o) {if (n > 56319) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}if (s + 1 === r) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}o = n;continue;}if (n < 56320) {(t -= 3) > -1 && i.push(239, 191, 189), o = n;continue;}n = 65536 + (o - 55296 << 10 | n - 56320);} else o && (t -= 3) > -1 && i.push(239, 191, 189);if (o = null, n < 128) {if ((t -= 1) < 0) break;i.push(n);} else if (n < 2048) {if ((t -= 2) < 0) break;i.push(n >> 6 | 192, 63 & n | 128);} else if (n < 65536) {if ((t -= 3) < 0) break;i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);} else {if (!(n < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);}}return i;}function Ya(e) {return function (e) {var t, n, r, o, i, s;ra || oa();var a = e.length;if (a % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");i = "=" === e[a - 2] ? 2 : "=" === e[a - 1] ? 1 : 0, s = new na(3 * a / 4 - i), r = i > 0 ? a - 4 : a;var u = 0;for (t = 0, n = 0; t < r; t += 4, n += 3) {o = ta[e.charCodeAt(t)] << 18 | ta[e.charCodeAt(t + 1)] << 12 | ta[e.charCodeAt(t + 2)] << 6 | ta[e.charCodeAt(t + 3)], s[u++] = o >> 16 & 255, s[u++] = o >> 8 & 255, s[u++] = 255 & o;}return 2 === i ? (o = ta[e.charCodeAt(t)] << 2 | ta[e.charCodeAt(t + 1)] >> 4, s[u++] = 255 & o) : 1 === i && (o = ta[e.charCodeAt(t)] << 10 | ta[e.charCodeAt(t + 1)] << 4 | ta[e.charCodeAt(t + 2)] >> 2, s[u++] = o >> 8 & 255, s[u++] = 255 & o), s;}(function (e) {if ((e = function (e) {return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");}(e).replace(Ka, "")).length < 2) return "";for (; e.length % 4 != 0;) {e += "=";}return e;}(e));}function za(e, t, n, r) {for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) {t[o + n] = e[o];}return o;}function Wa(e) {return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}var Xa = function (e) {l(n, e);var t = y(n);function n() {var e;return r(this, n), (e = t.call(this)).retry = 2, e._request = e.promisify(wx.request), e;}return i(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), e = u({}, e, { responseType: "text" }), this._requestWithRetry(e);} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return this._request(e).then(this._handleResolve).catch(function (r) {if (ee(r.errMsg)) {if (r.errMsg.includes("abort")) return zo({});if (r.errMsg.includes("timeout")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : Wo(new pt({ code: ln, message: r.errMsg }));if (r.errMsg.includes("fail")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : Wo(new pt({ code: un, message: r.errMsg }));}return Wo(new pt(u({ code: yn, message: r.message }, r)));});} }, { key: "_handleResolve", value: function value(e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return "number" == typeof n && (r = n), r !== Ne.SUCCESS && (e.data.ErrorCode = Number("".concat(r))), e;} }, { key: "promisify", value: function value(e) {return function (t) {return new Promise(function (n, r) {var o = e(Object.assign({}, t, { success: n, fail: r }));t.updateAbort && t.updateAbort(function () {o && se(o.abort) && o.abort();});});};} }]), n;}(Qs),Ja = function () {function e() {r(this, e), this.request = 0, this.success = 0, this.fail = 0, this.reportRate = 10, this.requestTimeCost = [];}return i(e, [{ key: "report", value: function value() {if (1 !== this.request) {if (this.request % this.reportRate != 0) return null;var e = this.avgRequestTime(),t = "runLoop reports: success=".concat(this.success, ",fail=").concat(this.fail, ",total=").concat(this.request, ",avg=").concat(e, ",cur=").concat(this.requestTimeCost[this.requestTimeCost.length - 1], ",max=").concat(Math.max.apply(null, this.requestTimeCost), ",min=").concat(Math.min.apply(null, this.requestTimeCost));J.log(t);}} }, { key: "setRequestTime", value: function value(e, t) {var n = Math.abs(t - e);100 === this.requestTimeCost.length && this.requestTimeCost.shift(), this.requestTimeCost.push(n);} }, { key: "avgRequestTime", value: function value() {for (var e, t = this.requestTimeCost.length, n = 0, r = 0; r < t; r++) {n += this.requestTimeCost[r];}return e = n / t, Math.round(100 * e) / 100;} }]), e;}(),Qa = Xs.create({ timeout: 6e3, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });Qa.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return Z(n) && (r = n), r !== Ne.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === Qa.defaults.withCredentials && J.warn("Network Error, try to close `IMAxiosAVChatroom.defaults.withCredentials` to false. (IMAxiosAVChatroom.js)"), Qa.defaults.withCredentials = !1), Promise.reject(e);});var Za = Xs.CancelToken,eu = function () {function e(t) {r(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new Ja();}return i(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.options.isAVChatRoomLoop ? this.requestor = Qa : this.requestor = Js, J.log("XHRRunLoop._initializeMembers isAVChatRoomLoop=".concat(!!this.options.isAVChatRoomLoop)), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : J.log('XHRRunLoop.start(), XHRRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {J.log("XHRRunLoop._reset(), reset long poll _intervalTime", this._intervalTime), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === Ne.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(this.options.pack.requestData);var t = Date.now(),n = 0;this.requestor.request({ url: this.options.pack.getUrl(), data: this.options.pack.requestData, method: this.options.pack.method, cancelToken: new Za(function (t) {e.abort = t;}) }).then(function (r) {if (e._intervalTimeAdjustmentBaseOnResponseData.bind(e)(r.data), e._retryCount > 0 && (e._retryCount = 0), e.status.success++, n = Date.now(), e.status.setRequestTime(t, n), r.data.timecost = n - t, "function" == typeof e.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(r.data) });} catch (o) {J.warn("XHRRunLoop._send(), error:", o);}e._requestStatus = !1, !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e.status.report();}).catch(function (r) {if (e.status.fail++, e._retryCount++, e._intervalTimeAdjustment.bind(e)(), !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e._requestStatus = !1, "function" == typeof e.options.fail && void 0 !== r.request) try {e.options.fail({ pack: e.options.pack, error: r, data: !1 });} catch (o) {J.warn("XHRRunLoop._send(), fail callback error:"), J.error(o);}n = Date.now(), e.status.setRequestTime(t, n), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),tu = function () {function e(t) {r(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new Ja();}return i(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.requestor = new Xa(), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : J.log('WXRunLoop.start(): WXRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {J.log("WXRunLoop.reset(), long poll _intervalMaxRate", this._intervalMaxRate), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === Ne.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {var t = this;this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(t.options.pack.requestData);var n = Date.now(),r = 0;this.requestor.request({ url: t.options.pack.getUrl(), data: t.options.pack.requestData, method: t.options.pack.method, updateAbort: function updateAbort(t) {e.abort = t;} }).then(function (o) {if (t._intervalTimeAdjustmentBaseOnResponseData.bind(e)(o.data), t._retryCount > 0 && (t._retryCount = 0), e.status.success++, r = Date.now(), e.status.setRequestTime(n, r), o.data.timecost = r - n, "function" == typeof t.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(o.data) });} catch (i) {J.warn("WXRunLoop._send(), error:", i);}t._requestStatus = !1, !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), e.status.report();}).catch(function (o) {if (e.status.fail++, t._retryCount++, t._intervalTimeAdjustment.bind(e)(), !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), t._requestStatus = !1, "function" == typeof t.options.fail) try {e.options.fail({ pack: e.options.pack, error: o, data: !1 });} catch (i) {J.warn("WXRunLoop._send(), fail callback error:"), J.error(i);}r = Date.now(), e.status.setRequestTime(n, r), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),nu = function () {function e(t) {r(this, e), this.tim = t, this.httpConnection = O ? new Xa() : new Zs(), this.keepAliveConnections = [];}return i(e, [{ key: "initializeListener", value: function value() {this.tim.innerEmitter.on(To, this._stopAllRunLoop, this);} }, { key: "request", value: function value(e) {var t = { url: e.url, data: e.requestData, method: e.method, callback: e.callback };return this.httpConnection.request(t).then(function (t) {return t.data = e.callback(t.data), t.data.errorCode !== Ne.SUCCESS ? Wo(new pt({ code: t.data.errorCode, message: t.data.errorInfo })) : t;});} }, { key: "createRunLoop", value: function value(e) {var t = this.createKeepAliveConnection(e);return t.setIndex(this.keepAliveConnections.push(t) - 1), t;} }, { key: "stopRunLoop", value: function value(e) {e.stop();} }, { key: "_stopAllRunLoop", value: function value() {for (var e = this.keepAliveConnections.length, t = 0; t < e; t++) {this.keepAliveConnections[t].stop();}} }, { key: "destroyRunLoop", value: function value(e) {e.stop();var t = e.destructor();this.keepAliveConnections.slice(t, 1);} }, { key: "startRunLoopExclusive", value: function value(e) {for (var t = e.getIndex(), n = 0; n < this.keepAliveConnections.length; n++) {n !== t && this.keepAliveConnections[n].stop();}e.start();} }, { key: "createKeepAliveConnection", value: function value(e) {return O ? new tu(e) : (this.tim.options.runLoopNetType === Xe || this.tim.options.runLoopNetType, new eu(e));} }, { key: "clearAll", value: function value() {this.conn.cancelAll();} }, { key: "reset", value: function value() {this.keepAliveConnections = [];} }]), e;}(),ru = function () {function t(e) {r(this, t), this.tim = e, this.tim.innerEmitter.on(Ao, this._onErrorDetected, this);}return i(t, [{ key: "_onErrorDetected", value: function value(t) {var n = t.data;n.code ? J.warn("Oops! code:".concat(n.code, " message:").concat(n.message)) : J.warn("Oops! message:".concat(n.message, " stack:").concat(n.stack)), this.tim.outerEmitter.emit(e.ERROR, n);} }]), t;}(),ou = function () {function e(n) {var o = this;r(this, e), we(n) || (this.userID = n.userID || "", this.nick = n.nick || "", this.gender = n.gender || "", this.birthday = n.birthday || 0, this.location = n.location || "", this.selfSignature = n.selfSignature || "", this.allowType = n.allowType || t.ALLOW_TYPE_ALLOW_ANY, this.language = n.language || 0, this.avatar = n.avatar || "", this.messageSettings = n.messageSettings || 0, this.adminForbidType = n.adminForbidType || t.FORBID_TYPE_NONE, this.level = n.level || 0, this.role = n.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], we(n.profileCustomField) || n.profileCustomField.forEach(function (e) {o.profileCustomField.push({ key: e.key, value: e.value });}));}return i(e, [{ key: "validate", value: function value(e) {var t = !0,n = "";if (we(e)) return { valid: !1, tips: "empty options" };if (e.profileCustomField) for (var r = e.profileCustomField.length, o = null, i = 0; i < r; i++) {if (o = e.profileCustomField[i], !ee(o.key) || -1 === o.key.indexOf("Tag_Profile_Custom")) return { valid: !1, tips: "自定义资料字段的前缀必须是 Tag_Profile_Custom" };if (!ee(o.value)) return { valid: !1, tips: "自定义资料字段的 value 必须是字符串" };}for (var s in e) {if (Object.prototype.hasOwnProperty.call(e, s)) {if ("profileCustomField" === s) continue;if (we(e[s]) && !ee(e[s]) && !Z(e[s])) {n = "key:" + s + ", invalid value:" + e[s], t = !1;continue;}switch (s) {case "nick":ee(e[s]) || (n = "nick should be a string", t = !1), ge(e[s]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(ge(e[s]), " bytes"), t = !1);break;case "gender":_e(et, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = !1);break;case "birthday":Z(e.birthday) || (n = "birthday should be a number", t = !1);break;case "location":ee(e.location) || (n = "location should be a string", t = !1);break;case "selfSignature":ee(e.selfSignature) || (n = "selfSignature should be a string", t = !1);break;case "allowType":_e(nt, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = !1);break;case "language":Z(e.language) || (n = "language should be a number", t = !1);break;case "avatar":ee(e.avatar) || (n = "avatar should be a string", t = !1);break;case "messageSettings":0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = !1);break;case "adminForbidType":_e(tt, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = !1);break;case "level":Z(e.level) || (n = "level should be a number", t = !1);break;case "role":Z(e.role) || (n = "role should be a number", t = !1);break;default:n = "unknown key:" + s + "  " + e[s], t = !1;}}}return { valid: t, tips: n };} }]), e;}(),iu = function () {function t(e) {r(this, t), this.userController = e, this.TAG = "profile", this.Actions = { Q: "query", U: "update" }, this.accountProfileMap = new Map(), this.expirationTime = 864e5;}return i(t, [{ key: "setExpirationTime", value: function value(e) {this.expirationTime = e;} }, { key: "getUserProfile", value: function value(e) {var t = this,n = e.userIDList;e.fromAccount = this.userController.getMyAccount(), n.length > 100 && (J.warn("ProfileHandler.getUserProfile 获取用户资料人数不能超过100人"), n.length = 100);for (var r, o = [], i = [], s = 0, a = n.length; s < a; s++) {r = n[s], this.userController.isMyFriend(r) && this._containsAccount(r) ? i.push(this._getProfileFromMap(r)) : o.push(r);}if (0 === o.length) return zo(i);e.toAccount = o;var u = e.bFromGetMyProfile || !1,l = [];e.toAccount.forEach(function (e) {l.push({ toAccount: e, standardSequence: 0, customSequence: 0 });}), e.userItem = l;var c = new oi();c.setMethod(qi).setStart();var p = this.userController.generateConfig(this.TAG, this.Actions.Q, e);return this.userController.request(p).then(function (e) {c.setCode(0).setNetworkType(t.userController.getNetworkType()).setText(e.data.userProfileItem.length).setEnd(), J.info("ProfileHandler.getUserProfile ok");var n = t._handleResponse(e).concat(i);return u ? (t.userController.onGotMyProfile(), new jo(n[0])) : new jo(n);}).catch(function (e) {return t.userController.probeNetwork().then(function (t) {var n = v(t, 2),r = n[0],o = n[1];c.setError(e, r, o).setEnd();}), J.error("ProfileHandler.getUserProfile error:", e), Wo(e);});} }, { key: "getMyProfile", value: function value() {var e = this.userController.getMyAccount();if (J.log("ProfileHandler.getMyProfile myAccount=" + e), this._fillMap(), this._containsAccount(e)) {var t = this._getProfileFromMap(e);return J.debug("ProfileHandler.getMyProfile from cache, myProfile:" + JSON.stringify(t)), this.userController.onGotMyProfile(), zo(t);}return this.getUserProfile({ fromAccount: e, userIDList: [e], bFromGetMyProfile: !0 });} }, { key: "_handleResponse", value: function value(e) {for (var t, n, r = pe.now(), o = e.data.userProfileItem, i = [], s = 0, a = o.length; s < a; s++) {"@TLS#NOT_FOUND" !== o[s].to && "" !== o[s].to && (t = o[s].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, o[s].profileItem)), i.push(n));}return J.log("ProfileHandler._handleResponse cost " + (pe.now() - r) + " ms"), i;} }, { key: "_getLatestProfileFromResponse", value: function value(e, t) {var n = {};if (n.userID = e, n.profileCustomField = [], !we(t)) for (var r = 0, o = t.length; r < o; r++) {if (t[r].tag.indexOf("Tag_Profile_Custom") > -1) n.profileCustomField.push({ key: t[r].tag, value: t[r].value });else switch (t[r].tag) {case Ze.NICK:n.nick = t[r].value;break;case Ze.GENDER:n.gender = t[r].value;break;case Ze.BIRTHDAY:n.birthday = t[r].value;break;case Ze.LOCATION:n.location = t[r].value;break;case Ze.SELFSIGNATURE:n.selfSignature = t[r].value;break;case Ze.ALLOWTYPE:n.allowType = t[r].value;break;case Ze.LANGUAGE:n.language = t[r].value;break;case Ze.AVATAR:n.avatar = t[r].value;break;case Ze.MESSAGESETTINGS:n.messageSettings = t[r].value;break;case Ze.ADMINFORBIDTYPE:n.adminForbidType = t[r].value;break;case Ze.LEVEL:n.level = t[r].value;break;case Ze.ROLE:n.role = t[r].value;break;default:J.warn("ProfileHandler._handleResponse unkown tag->", t[r].tag, t[r].value);}}return n;} }, { key: "updateMyProfile", value: function value(t) {var n = this,r = new ou().validate(t);if (!r.valid) return J.error("ProfileHandler.updateMyProfile info:".concat(r.tips, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), Wo({ code: nn, message: fr });var o = [];for (var i in t) {Object.prototype.hasOwnProperty.call(t, i) && ("profileCustomField" === i ? t.profileCustomField.forEach(function (e) {o.push({ tag: e.key, value: e.value });}) : o.push({ tag: Ze[i.toUpperCase()], value: t[i] }));}if (0 === o.length) return J.error("ProfileHandler.updateMyProfile info:".concat(dr, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), Wo({ code: rn, message: dr });var s = this.userController.generateConfig(this.TAG, this.Actions.U, { fromAccount: this.userController.getMyAccount(), profileItem: o });return this.userController.request(s).then(function (r) {J.info("ProfileHandler.updateMyProfile ok");var o = n._updateMap(n.userController.getMyAccount(), t);return n.userController.emitOuterEvent(e.PROFILE_UPDATED, [o]), zo(o);}).catch(function (e) {return J.error("ProfileHandler.updateMyProfile error:", e), Wo(e);});} }, { key: "onProfileModified", value: function value(t) {var n = t.data;if (!we(n)) {var r,o,i = n.length;J.info("ProfileHandler.onProfileModified length=" + i);for (var s = [], a = 0; a < i; a++) {r = n[a].userID, o = this._updateMap(r, this._getLatestProfileFromResponse(r, n[a].profileList)), s.push(o);}this.userController.emitInnerEvent(Lo, s), this.userController.emitOuterEvent(e.PROFILE_UPDATED, s);}} }, { key: "_fillMap", value: function value() {if (0 === this.accountProfileMap.size) {for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, r = e.length; n < r; n++) {t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);}J.log("ProfileHandler._fillMap from cache, map.size=" + this.accountProfileMap.size);}} }, { key: "_updateMap", value: function value(e, t) {var n,r = Date.now();return this._containsAccount(e) ? (n = this._getProfileFromMap(e), t.profileCustomField && Se(n.profileCustomField, t.profileCustomField), he(n, t, ["profileCustomField"]), n.lastUpdatedTime = r) : (n = new ou(t), (this.userController.isMyFriend(e) || e === this.userController.getMyAccount()) && (n.lastUpdatedTime = r, this.accountProfileMap.set(e, n))), this._flushMap(e === this.userController.getMyAccount()), n;} }, { key: "_flushMap", value: function value(e) {var t = _(this.accountProfileMap.values()),n = this.userController.tim.storage;J.debug("ProfileHandler._flushMap length=".concat(t.length, " flushAtOnce=").concat(e)), n.setItem(this.TAG, t, e);} }, { key: "_containsAccount", value: function value(e) {return this.accountProfileMap.has(e);} }, { key: "_getProfileFromMap", value: function value(e) {return this.accountProfileMap.get(e);} }, { key: "_getCachedProfiles", value: function value() {var e = this.userController.tim.storage.getItem(this.TAG);return we(e) ? [] : e;} }, { key: "onConversationsProfileUpdated", value: function value(e) {for (var t, n, r, o = [], i = 0, s = e.length; i < s; i++) {n = (t = e[i]).userID, this.userController.isMyFriend(n) && (this._containsAccount(n) ? (r = this._getProfileFromMap(n), he(r, t) > 0 && o.push(n)) : o.push(t.userID));}0 !== o.length && (J.info("ProfileHandler.onConversationsProfileUpdated toAccount:", o), this.getUserProfile({ userIDList: o }));} }, { key: "reset", value: function value() {this._flushMap(!0), this.accountProfileMap.clear();} }]), t;}(),su = function () {function e(t) {r(this, e), this.options = t ? t.options : { enablePointer: !0 }, this.pointsList = {}, this.reportText = {}, this.maxNameLen = 0, this.gapChar = "-", this.log = console.log, this.currentTask = "";}return i(e, [{ key: "newTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = ["task", this._timeFormat()].join("-")), this.pointsList[e] = [], this.currentTask = e, console.log("Pointer new Task : ".concat(this.currentTask)));} }, { key: "deleteTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = this.currentTask), this.pointsList[e].length = 0, delete this.pointsList[e]);} }, { key: "dot", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",t = arguments.length > 1 ? arguments[1] : void 0;if (!1 !== this.options.enablePointer) {t = t || this.currentTask;var n = +new Date();this.maxNameLen = this.maxNameLen < e.length ? e.length : this.maxNameLen, this.flen = this.maxNameLen + 10, this.pointsList[t].push({ pointerName: e, time: n });}} }, { key: "_analisys", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;for (var t = this.pointsList[e], n = t.length, r = [], o = [], i = 0; i < n; i++) {0 !== i && (o = this._analisysTowPoints(t[i - 1], t[i]), r.push(o.join("")));}return o = this._analisysTowPoints(t[0], t[n - 1], !0), r.push(o.join("")), r.join("");}} }, { key: "_analisysTowPoints", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];if (!1 !== this.options.enablePointer) {var r = this.flen,o = t.time - e.time,i = o.toString(),s = e.pointerName + this.gapChar.repeat(r - e.pointerName.length),a = t.pointerName + this.gapChar.repeat(r - t.pointerName.length),u = this.gapChar.repeat(4 - i.length) + i,l = n ? ["%c", s, a, u, "ms\n%c"] : [s, a, u, "ms\n"];return l;}} }, { key: "report", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;var t = this._analisys(e);this.pointsList = [];var n = this._timeFormat(),r = "Pointer[".concat(e, "(").concat(n, ")]"),o = 4 * this.maxNameLen,i = (o - r.length) / 2;console.log(["-".repeat(i), r, "-".repeat(i)].join("")), console.log("%c" + t, "color:#66a", "color:red", "color:#66a"), console.log("-".repeat(o));}} }, { key: "_timeFormat", value: function value() {var e = new Date(),t = this.zeroFix(e.getMonth() + 1, 2),n = this.zeroFix(e.getDate(), 2);return "".concat(t, "-").concat(n, " ").concat(e.getHours(), ":").concat(e.getSeconds(), ":").concat(e.getMinutes(), "~").concat(e.getMilliseconds());} }, { key: "zeroFix", value: function value(e, t) {return ("000000000" + e).slice(-t);} }, { key: "reportAll", value: function value() {if (!1 !== this.options.enablePointer) for (var e in this.pointsList) {Object.prototype.hasOwnProperty.call(this.pointsList, e) && this.eport(e);}} }]), e;}(),au = function e(t, n) {r(this, e), this.userID = t;var o = {};if (o.userID = t, !we(n)) for (var i = 0, s = n.length; i < s; i++) {switch (n[i].tag) {case Ze.NICK:o.nick = n[i].value;break;case Ze.GENDER:o.gender = n[i].value;break;case Ze.BIRTHDAY:o.birthday = n[i].value;break;case Ze.LOCATION:o.location = n[i].value;break;case Ze.SELFSIGNATURE:o.selfSignature = n[i].value;break;case Ze.ALLOWTYPE:o.allowType = n[i].value;break;case Ze.LANGUAGE:o.language = n[i].value;break;case Ze.AVATAR:o.avatar = n[i].value;break;case Ze.MESSAGESETTINGS:o.messageSettings = n[i].value;break;case Ze.ADMINFORBIDTYPE:o.adminForbidType = n[i].value;break;case Ze.LEVEL:o.level = n[i].value;break;case Ze.ROLE:o.role = n[i].value;break;default:J.debug("snsProfileItem unkown tag->", n[i].tag);}}this.profile = new ou(o);},uu = function () {function e(t) {r(this, e), this.userController = t, this.TAG = "friend", this.Actions = { G: "get", D: "delete" }, this.friends = new Map(), this.pointer = new su();}return i(e, [{ key: "isMyFriend", value: function value(e) {var t = this.friends.has(e);return t || J.debug("FriendHandler.isMyFriend " + e + " is not my friend"), t;} }, { key: "_transformFriendList", value: function value(e) {if (!we(e) && !we(e.infoItem)) {J.info("FriendHandler._transformFriendList friendNum=" + e.friendNum);for (var t, n, r = e.infoItem, o = 0, i = r.length; o < i; o++) {n = r[o].infoAccount, t = new au(n, r[o].snsProfileItem), this.friends.set(n, t);}}} }, { key: "_friends2map", value: function value(e) {var t = new Map();for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && t.set(n, e[n]);}return t;} }, { key: "getFriendList", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), J.info("FriendHandler.getFriendList myAccount=" + t.fromAccount);var n = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(n).then(function (t) {J.info("FriendHandler.getFriendList ok"), e._transformFriendList(t.data);var n = _(e.friends.values());return zo(n);}).catch(function (e) {return J.error("FriendHandler.getFriendList error:", JSON.stringify(e)), Wo(e);});} }, { key: "deleteFriend", value: function value(e) {if (!Array.isArray(e.toAccount)) return J.error("FriendHandler.deleteFriend options.toAccount 必需是数组"), Wo({ code: tn, message: hr });e.toAccount.length > 1e3 && (J.warn("FriendHandler.deleteFriend 删除好友人数不能超过1000人"), e.toAccount.length = 1e3);var t = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(t).then(function (e) {return J.info("FriendHandler.deleteFriend ok"), zo();}).catch(function (e) {return J.error("FriendHandler.deleteFriend error:", e), Wo(e);});} }]), e;}(),lu = function e(t) {r(this, e), we || (this.userID = t.userID || "", this.timeStamp = t.timeStamp || 0);},cu = function () {function t(e) {r(this, t), this.userController = e, this.TAG = "blacklist", this.Actions = { G: "get", C: "create", D: "delete" }, this.blacklistMap = new Map(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;}return i(t, [{ key: "getBlacklist", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), t.maxLimited = this.maxLimited, t.startIndex = 0, t.lastSequence = this.curruentSequence;var n = new oi();n.setMethod(xi).setStart();var r = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(r).then(function (t) {var r = we(t.data.blackListItem) ? 0 : t.data.blackListItem.length;return n.setCode(0).setNetworkType(e.userController.getNetworkType()).setText(r).setEnd(), J.info("BlacklistHandler.getBlacklist ok"), e.curruentSequence = t.data.curruentSequence, e._handleResponse(t.data.blackListItem, !0), e._onBlacklistUpdated();}).catch(function (t) {return e.userController.probeNetwork().then(function (e) {var r = v(e, 2),o = r[0],i = r[1];n.setError(t, o, i).setEnd();}), J.error("BlacklistHandler.getBlacklist error:", t), Wo(t);});} }, { key: "addBlacklist", value: function value(e) {var t = this;if (!re(e.userIDList)) return J.error("BlacklistHandler.addBlacklist options.userIDList 必需是数组"), Wo({ code: on, message: gr });var n = this.userController.tim.loginInfo.identifier;if (1 === e.userIDList.length && e.userIDList[0] === n) return J.error("BlacklistHandler.addBlacklist 不能把自己拉黑"), Wo({ code: an, message: yr });e.userIDList.includes(n) && (e.userIDList = e.userIDList.filter(function (e) {return e !== n;}), J.warn("BlacklistHandler.addBlacklist 不能把自己拉黑，已过滤")), e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var r = this.userController.generateConfig(this.TAG, this.Actions.C, e);return this.userController.request(r).then(function (e) {return J.info("BlacklistHandler.addBlacklist ok"), t._handleResponse(e.data.resultItem, !0), t._onBlacklistUpdated();}).catch(function (e) {return J.error("BlacklistHandler.addBlacklist error:", e), Wo(e);});} }, { key: "_handleResponse", value: function value(e, t) {if (!we(e)) for (var n, r, o, i = 0, s = e.length; i < s; i++) {r = e[i].to, o = e[i].resultCode, (oe(o) || 0 === o) && (t ? ((n = this.blacklistMap.has(r) ? this.blacklistMap.get(r) : new lu()).userID = r, !we(e[i].addBlackTimeStamp) && (n.timeStamp = e[i].addBlackTimeStamp), this.blacklistMap.set(r, n)) : this.blacklistMap.has(r) && (n = this.blacklistMap.get(r), this.blacklistMap.delete(r)));}J.log("BlacklistHandler._handleResponse total=" + this.blacklistMap.size + " bAdd=" + t);} }, { key: "deleteBlacklist", value: function value(e) {var t = this;if (!re(e.userIDList)) return J.error("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组"), Wo({ code: sn, message: mr });e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var n = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(n).then(function (e) {return J.info("BlacklistHandler.deleteBlacklist ok"), t._handleResponse(e.data.resultItem, !1), t._onBlacklistUpdated();}).catch(function (e) {return J.error("BlacklistHandler.deleteBlacklist error:", e), Wo(e);});} }, { key: "_onBlacklistUpdated", value: function value() {var t = _(this.blacklistMap.keys());return this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, t), zo(t);} }, { key: "handleBlackListDelAccount", value: function value(t) {for (var n, r = [], o = 0, i = t.length; o < i; o++) {n = t[o], this.blacklistMap.has(n) && (this.blacklistMap.delete(n), r.push(n));}r.length > 0 && (J.log("BlacklistHandler.handleBlackListDelAccount delCount=" + r.length + " : " + r.join(",")), this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, _(this.blacklistMap.keys())));} }, { key: "handleBlackListAddAccount", value: function value(t) {for (var n, r = [], o = 0, i = t.length; o < i; o++) {n = t[o], this.blacklistMap.has(n) || (this.blacklistMap.set(n, new lu({ userID: n })), r.push(n));}r.length > 0 && (J.log("BlacklistHandler.handleBlackListAddAccount addCount=" + r.length + " : " + r.join(",")), this.userController.emitOuterEvent(e.BLACKLIST_UPDATED, _(this.blacklistMap.keys())));} }, { key: "reset", value: function value() {this.blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;} }]), t;}(),pu = function () {function e(t) {r(this, e), this.userController = t, this.TAG = "applyC2C", this.Actions = { C: "create", G: "get", D: "delete", U: "update" };}return i(e, [{ key: "applyAddFriend", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.C, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("applyAddFriend", t.Actions.C, e);}).catch(function (e) {}), r;} }, { key: "getPendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.G, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("getPendency", t.Actions.G, e);}).catch(function (e) {}), r;} }, { key: "deletePendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.D, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("deletePendency", t.Actions.D, e);}).catch(function (e) {}), r;} }, { key: "replyPendency", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},n = this.userController.generateConfig(this.TAG, this.Actions.U, t),r = this.userController.request(n);return r.then(function (t) {e.userController.isActionSuccessful("replyPendency", e.Actions.U, t);}).catch(function (e) {}), r;} }]), e;}(),hu = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).profileHandler = new iu(g(o)), o.friendHandler = new uu(g(o)), o.blacklistHandler = new cu(g(o)), o.applyC2CHandler = new pu(g(o)), o._initializeListener(), o;}return i(n, [{ key: "_initializeListener", value: function value(e) {var t = this.tim.innerEmitter;t.on(Yr, this.onContextUpdated, this), t.on(yo, this.onProfileModified, this), t.on(mo, this.onNewFriendMessages, this), t.on(Ro, this.onConversationsProfileUpdated, this);} }, { key: "onContextUpdated", value: function value(e) {var t = this.tim.context;!1 != !!t.a2Key && !1 != !!t.tinyID && (this.profileHandler.getMyProfile(), this.friendHandler.getFriendList(), this.blacklistHandler.getBlacklist());} }, { key: "onGotMyProfile", value: function value() {this.triggerReady();} }, { key: "onProfileModified", value: function value(e) {this.profileHandler.onProfileModified(e);} }, { key: "onNewFriendMessages", value: function value(e) {J.debug("onNewFriendMessages", JSON.stringify(e.data)), we(e.data.blackListDelAccount) || this.blacklistHandler.handleBlackListDelAccount(e.data.blackListDelAccount), we(e.data.blackListAddAccount) || this.blacklistHandler.handleBlackListAddAccount(e.data.blackListAddAccount);} }, { key: "onConversationsProfileUpdated", value: function value(e) {this.profileHandler.onConversationsProfileUpdated(e.data);} }, { key: "getMyAccount", value: function value() {return this.tim.context.identifier;} }, { key: "isMyFriend", value: function value(e) {return this.friendHandler.isMyFriend(e);} }, { key: "generateConfig", value: function value(e, t, n) {return { name: e, action: t, param: n };} }, { key: "getMyProfile", value: function value() {return this.profileHandler.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.profileHandler.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.profileHandler.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.friendHandler.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.friendHandler.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.blacklistHandler.getBlacklist();} }, { key: "addBlacklist", value: function value(e) {return this.blacklistHandler.addBlacklist(e);} }, { key: "deleteBlacklist", value: function value(e) {return this.blacklistHandler.deleteBlacklist(e);} }, { key: "applyAddFriend", value: function value(e) {return this.applyC2CHandler.applyAddFriend(e);} }, { key: "getPendency", value: function value(e) {return this.applyC2CHandler.getPendency(e);} }, { key: "deletePendency", value: function value(e) {return this.applyC2CHandler.deletePendency(e);} }, { key: "replyPendency", value: function value(e) {return this.applyC2CHandler.replyPendency(e);} }, { key: "reset", value: function value() {J.info("UserController.reset"), this.resetReady(), this.profileHandler.reset(), this.blacklistHandler.reset(), this.checkTimes = 0;} }]), n;}(Bo),fu = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers"],du = function () {function e(t) {r(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "" }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.maxMemberNum = "", this.joinOption = "", this.groupCustomField = [], this.muteAllMembers = void 0, this._initGroup(t);}return i(e, [{ key: "_initGroup", value: function value(e) {for (var t in e) {fu.indexOf(t) < 0 || ("selfInfo" !== t ? this[t] = e[t] : this.updateSelfInfo(e[t]));}} }, { key: "updateGroup", value: function value(e) {e.lastMsgTime && (this.lastMessage.lastTime = e.lastMsgTime), oe(e.muteAllMembers) || ("On" === e.muteAllMembers ? e.muteAllMembers = !0 : e.muteAllMembers = !1), e.groupCustomField && Se(this.groupCustomField, e.groupCustomField), he(this, e, ["members", "errorCode", "lastMsgTime", "groupCustomField"]);} }, { key: "updateSelfInfo", value: function value(e) {var t = e.nameCard,n = e.joinTime,r = e.role,o = e.messageRemindType;he(this.selfInfo, { nameCard: t, joinTime: n, role: r, messageRemindType: o }, [], ["", null, void 0, 0, NaN]);} }, { key: "setSelfNameCard", value: function value(e) {this.selfInfo.nameCard = e;} }]), e;}(),gu = function gu(e, n) {if (oe(n)) return "";switch (e) {case t.MSG_TEXT:return n.text;case t.MSG_IMAGE:return "[图片]";case t.MSG_GEO:return "[位置]";case t.MSG_AUDIO:return "[语音]";case t.MSG_VIDEO:return "[视频]";case t.MSG_FILE:return "[文件]";case t.MSG_CUSTOM:return "[自定义消息]";case t.MSG_GRP_TIP:return "[群提示消息]";case t.MSG_GRP_SYS_NOTICE:return "[群系统通知]";case t.MSG_FACE:return "[动画表情]";default:return "";}},mu = function () {function e(t) {var n;r(this, e), this.conversationID = t.conversationID || "", this.unreadCount = t.unreadCount || 0, this.type = t.type || "", this.lastMessage = (n = t.lastMessage, oe(n) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: !1 } : n instanceof br ? { lastTime: n.time || 0, lastSequence: n.sequence || 0, fromAccount: n.from || "", messageForShow: gu(n.type, n.payload), payload: n.payload || null, type: n.type || null, isRevoked: !1 } : u({}, n, { isRevoked: !1, messageForShow: gu(n.type, n.payload) })), t.lastMsgTime && (this.lastMessage.lastTime = t.lastMsgTime), this._isInfoCompleted = !1, this._initProfile(t);}return i(e, [{ key: "_initProfile", value: function value(e) {var n = this;Object.keys(e).forEach(function (t) {switch (t) {case "userProfile":n.userProfile = e.userProfile;break;case "groupProfile":n.groupProfile = e.groupProfile;}}), oe(this.userProfile) && this.type === t.CONV_C2C ? this.userProfile = new ou({ userID: e.conversationID.replace("C2C", "") }) : oe(this.groupProfile) && this.type === t.CONV_GROUP && (this.groupProfile = new du({ groupID: e.conversationID.replace("GROUP", "") }));} }, { key: "updateUnreadCount", value: function value(e, n) {oe(e) || (this.subType === t.GRP_CHATROOM || Te(this.subType) ? this.unreadCount = 0 : n && this.type === t.CONV_GROUP ? this.unreadCount = e : this.unreadCount = this.unreadCount + e);} }, { key: "reduceUnreadCount", value: function value() {this.unreadCount >= 1 && (this.unreadCount -= 1);} }, { key: "isLastMessageRevoked", value: function value(e) {var n = e.sequence,r = e.time;return this.type === t.CONV_C2C && n === this.lastMessage.lastSequence && r === this.lastMessage.lastTime || this.type === t.CONV_GROUP && n === this.lastMessage.lastSequence;} }, { key: "setLastMessageRevoked", value: function value(e) {this.lastMessage.isRevoked = e;} }, { key: "toAccount", get: function get() {return this.conversationID.replace("C2C", "").replace("GROUP", "");} }, { key: "subType", get: function get() {return this.groupProfile ? this.groupProfile.type : "";} }]), e;}(),yu = function (n) {l(s, n);var o = y(s);function s(e) {var t;return r(this, s), (t = o.call(this, e)).pagingStatus = Ge.NOT_START, t.pagingTimeStamp = 0, t.conversationMap = new Map(), t.tempGroupList = [], t._initListeners(), t;}return i(s, [{ key: "hasLocalConversationMap", value: function value() {return this.conversationMap.size > 0;} }, { key: "createLocalConversation", value: function value(e) {return this.conversationMap.has(e) ? this.conversationMap.get(e) : new mu({ conversationID: e, type: e.slice(0, 3) === t.CONV_C2C ? t.CONV_C2C : t.CONV_GROUP });} }, { key: "hasLocalConversation", value: function value(e) {return this.conversationMap.has(e);} }, { key: "getConversationList", value: function value() {var e = this;J.log("ConversationController.getConversationList."), this.pagingStatus === Ge.REJECTED && (J.log("ConversationController.getConversationList. continue to sync conversationList"), this._syncConversationList());var t = new oi();return t.setMethod(yi).setStart(), this.request({ name: "conversation", action: "query" }).then(function (n) {var r = n.data.conversations,o = void 0 === r ? [] : r,i = e._getConversationOptions(o);return e._updateLocalConversationList(i, !0), e._setStorageConversationList(), t.setCode(0).setText(o.length).setNetworkType(e.getNetworkType()).setEnd(), J.log("ConversationController.getConversationList ok."), zo({ conversationList: e.getLocalConversationList() });}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = v(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), J.error("ConversationController.getConversationList error:", n), Wo(n);});} }, { key: "_syncConversationList", value: function value() {var e = this,t = new oi();return t.setMethod(_i).setStart(), this.pagingStatus === Ge.NOT_START && this.conversationMap.clear(), this._autoPagingSyncConversationList().then(function (n) {return e.pagingStatus = Ge.RESOLVED, e._setStorageConversationList(), t.setCode(0).setText("".concat(e.conversationMap.size)).setNetworkType(e.getNetworkType()).setEnd(), n;}).catch(function (n) {return e.pagingStatus = Ge.REJECTED, t.setText(e.pagingTimeStamp), e.probeNetwork().then(function (e) {var r = v(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), Wo(n);});} }, { key: "_autoPagingSyncConversationList", value: function value() {var e = this;return this.pagingStatus = Ge.PENDING, this.request({ name: "conversation", action: "pagingQuery", param: { fromAccount: this.tim.context.identifier, timeStamp: this.pagingTimeStamp, orderType: 1 } }).then(function (t) {var n = t.data,r = n.completeFlag,o = n.conversations,i = void 0 === o ? [] : o,s = n.timeStamp;if (J.log("ConversationController._autoPagingSyncConversationList completeFlag=".concat(r, " nums=").concat(i.length)), i.length > 0) {var a = e._getConversationOptions(i);e._updateLocalConversationList(a, !0);}return e._isReady ? e._emitConversationUpdate() : e.triggerReady(), e.pagingTimeStamp = s, 1 !== r ? e._autoPagingSyncConversationList() : zo();});} }, { key: "getConversationProfile", value: function value(e) {var n = this.conversationMap.has(e) ? this.conversationMap.get(e) : this.createLocalConversation(e);return n._isInfoCompleted || n.type === t.CONV_SYSTEM ? zo({ conversation: n }) : (J.log("ConversationController.getConversationProfile. conversationID:", e), this._updateUserOrGroupProfileCompletely(n).then(function (t) {return J.log("ConversationController.getConversationProfile ok. conversationID:", e), t;}).catch(function (e) {return J.error("ConversationController.getConversationProfile error:", e), Wo(e);}));} }, { key: "deleteConversation", value: function value(e) {var n = this,r = {};if (!this.conversationMap.has(e)) {var o = new pt({ code: qt, message: Wn });return Wo(o);}switch (this.conversationMap.get(e).type) {case t.CONV_C2C:r.type = 1, r.toAccount = e.slice(3);break;case t.CONV_GROUP:r.type = 2, r.toGroupID = e.slice(5);break;case t.CONV_SYSTEM:return this.tim.groupController.deleteGroupSystemNotice({ messageList: this.tim.messageController.getLocalMessageList(e) }), this.deleteLocalConversation(e), zo({ conversationID: e });default:var i = new pt({ code: Ft, message: Jn });return Wo(i);}return J.log("ConversationController.deleteConversation. conversationID:", e), this.tim.setMessageRead({ conversationID: e }).then(function () {return n.request({ name: "conversation", action: "delete", param: r });}).then(function () {return J.log("ConversationController.deleteConversation ok. conversationID:", e), n.deleteLocalConversation(e), zo({ conversationID: e });}).catch(function (e) {return J.error("ConversationController.deleteConversation error:", e), Wo(e);});} }, { key: "getLocalConversationList", value: function value() {return _(this.conversationMap.values());} }, { key: "getLocalConversation", value: function value(e) {return this.conversationMap.get(e);} }, { key: "_initLocalConversationList", value: function value() {var e = new oi();e.setMethod(vi).setStart(), J.time(ti), J.log("ConversationController._initLocalConversationList init");var t = this._getStorageConversationList();if (t) {for (var n = t.length, r = 0; r < n; r++) {this.conversationMap.set(t[r].conversationID, new mu(t[r]));}this._emitConversationUpdate(!0, !1), e.setCode(0).setNetworkType(this.getNetworkType()).setText(n).setEnd();} else e.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd();this._syncConversationList();} }, { key: "_getStorageConversationList", value: function value() {return this.tim.storage.getItem("conversationMap");} }, { key: "_setStorageConversationList", value: function value() {var e = this.getLocalConversationList().slice(0, 20).map(function (e) {return { conversationID: e.conversationID, type: e.type, subType: e.subType, lastMessage: e.lastMessage, groupProfile: e.groupProfile, userProfile: e.userProfile };});this.tim.storage.setItem("conversationMap", e);} }, { key: "_initListeners", value: function value() {var e = this;this.tim.innerEmitter.once(Yr, this._initLocalConversationList, this), this.tim.innerEmitter.on(Jr, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(Qr, this._handleSyncMessages, this), this.tim.innerEmitter.on(Zr, this._handleSyncMessages, this), this.tim.innerEmitter.on(eo, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(to, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(no, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(So, this._onGroupListUpdated, this), this.tim.innerEmitter.on(Lo, this._updateConversationUserProfile, this), this.tim.innerEmitter.on(ro, this._onMessageRevoked, this), this.ready(function () {e.tempGroupList.length > 0 && (e._updateConversationGroupProfile(e.tempGroupList), e.tempGroupList.length = 0);});} }, { key: "_onGroupListUpdated", value: function value(e) {this._updateConversationGroupProfile(e.data);} }, { key: "_updateConversationGroupProfile", value: function value(e) {var t = this;re(e) && 0 === e.length || (this.hasLocalConversationMap() ? (e.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t.conversationMap.has(n)) {var r = t.conversationMap.get(n);r.groupProfile = e, r.lastMessage.lastSequence < e.nextMessageSeq && (r.lastMessage.lastSequence = e.nextMessageSeq - 1), r.subType || (r.subType = e.type);}}), this._emitConversationUpdate(!0, !1)) : this.tempGroupList = e);} }, { key: "_updateConversationUserProfile", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = "C2C".concat(e.userID);t.conversationMap.has(n) && (t.conversationMap.get(n).userProfile = e);}), this._emitConversationUpdate(!0, !1);} }, { key: "_onMessageRevoked", value: function value(e) {var t = this,n = e.data;if (0 !== n.length) {var r = null,o = !1;n.forEach(function (e) {(r = t.conversationMap.get(e.conversationID)) && r.isLastMessageRevoked(e) && (o = !0, r.setLastMessageRevoked(!0));}), o && this._emitConversationUpdate(!0, !1);}} }, { key: "_handleSyncMessages", value: function value(e) {this._onSendOrReceiveMessage(e, !0);} }, { key: "_onSendOrReceiveMessage", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],r = e.data.eventDataList;this._isReady ? 0 !== r.length && (this._updateLocalConversationList(r, !1, n), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {t._onSendOrReceiveMessage(e, n);});} }, { key: "_updateLocalConversationList", value: function value(e, t, n) {var r;r = this._updateTempConversations(e, t, n), this.conversationMap = new Map(this._sortConversations([].concat(_(r.conversations), _(this.conversationMap)))), t || this._updateUserOrGroupProfile(r.newerConversations);} }, { key: "_updateTempConversations", value: function value(e, n, r) {for (var o = [], i = [], s = 0, a = e.length; s < a; s++) {var u = new mu(e[s]),l = this.conversationMap.get(u.conversationID);if (this.conversationMap.has(u.conversationID)) {var c = ["unreadCount", "allowType", "adminForbidType", "payload"];r && c.push("lastMessage"), he(l, u, c, [null, void 0, "", 0, NaN]), l.updateUnreadCount(u.unreadCount, n), r || (l.lastMessage.payload = e[s].lastMessage.payload), this.conversationMap.delete(l.conversationID), o.push([l.conversationID, l]);} else {if (u.type === t.CONV_GROUP) {var p = u.groupProfile.groupID,h = this.tim.groupController.getLocalGroupProfile(p);h && (u.groupProfile = h, u.updateUnreadCount(0));}i.push(u), o.push([u.conversationID, u]);}}return { conversations: o, newerConversations: i };} }, { key: "_sortConversations", value: function value(e) {return e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;});} }, { key: "_updateUserOrGroupProfile", value: function value(e) {var n = this;if (0 !== e.length) {var r = [],o = [];e.forEach(function (e) {if (e.type === t.CONV_C2C) r.push(e.toAccount);else if (e.type === t.CONV_GROUP) {var i = e.toAccount;n.tim.groupController.hasLocalGroup(i) ? e.groupProfile = n.tim.groupController.getLocalGroupProfile(i) : o.push(i);}}), r.length > 0 && this.tim.getUserProfile({ userIDList: r }).then(function (e) {var t = e.data;re(t) ? t.forEach(function (e) {n.conversationMap.get("C2C".concat(e.userID)).userProfile = e;}) : n.conversationMap.get("C2C".concat(t.userID)).userProfile = t;}), o.length > 0 && this.tim.groupController.getGroupProfileAdvance({ groupIDList: o, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function (e) {e.data.successGroupList.forEach(function (e) {var t = "GROUP".concat(e.groupID);if (n.conversationMap.has(t)) {var r = n.conversationMap.get(t);he(r.groupProfile, e, [], [null, void 0, "", 0, NaN]), !r.subType && e.type && (r.subType = e.type);}});});}} }, { key: "_updateUserOrGroupProfileCompletely", value: function value(e) {var n = this;return e.type === t.CONV_C2C ? this.tim.getUserProfile({ userIDList: [e.toAccount] }).then(function (t) {var r = t.data;return 0 === r.length ? Wo(new pt({ code: xt, message: Xn })) : (e.userProfile = r[0], e._isInfoCompleted = !0, n._unshiftConversation(e), zo({ conversation: e }));}) : this.tim.getGroupProfile({ groupID: e.toAccount }).then(function (t) {return e.groupProfile = t.data.group, e._isInfoCompleted = !0, n._unshiftConversation(e), zo({ conversation: e });});} }, { key: "_unshiftConversation", value: function value(e) {e instanceof mu && !this.conversationMap.has(e.conversationID) && (this.conversationMap = new Map([[e.conversationID, e]].concat(_(this.conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(!0, !1));} }, { key: "deleteLocalConversation", value: function value(e) {return this.conversationMap.delete(e), this._setStorageConversationList(), this.emitInnerEvent(Oo, e), this._emitConversationUpdate(!0, !1), this.conversationMap.has(e);} }, { key: "_getConversationOptions", value: function value(e) {var t = [],n = e.filter(function (e) {var t = e.lastMsg;return ne(t);}).map(function (e) {if (1 === e.type) {var n = { userID: e.userID, nick: e.c2CNick, avatar: e.c2CImage };return t.push(n), { conversationID: "C2C".concat(e.userID), type: "C2C", lastMessage: { lastTime: e.time, lastSequence: e.sequence, fromAccount: e.lastC2CMsgFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, userProfile: new ou(n) };}return { conversationID: "GROUP".concat(e.groupID), type: "GROUP", lastMessage: { lastTime: e.time, lastSequence: e.messageReadSeq + e.unreadCount, fromAccount: e.msgGroupFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, groupProfile: new du({ groupID: e.groupID, name: e.groupNick, avatar: e.groupImage }), unreadCount: e.unreadCount };});return t.length > 0 && this.emitInnerEvent(Ro, t), n;} }, { key: "_emitConversationUpdate", value: function value() {var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],r = _(this.conversationMap.values());n && this.emitInnerEvent(wo, r), t && this.emitOuterEvent(e.CONVERSATION_LIST_UPDATED, r);} }, { key: "_conversationMapTreeShaking", value: function value(e) {var n = this,r = new Map(_(this.conversationMap));e.forEach(function (e) {return r.delete(e.conversationID);}), r.has(t.CONV_SYSTEM) && r.delete(t.CONV_SYSTEM);var o = this.tim.groupController.getJoinedAVChatRoom();o && r.delete("".concat(t.CONV_GROUP).concat(o.groupID)), _(r.keys()).forEach(function (e) {return n.conversationMap.delete(e);});} }, { key: "reset", value: function value() {this.pagingStatus = Ge.NOT_START, this.pagingTimeStamp = 0, this.conversationMap.clear(), this.resetReady(), this.tim.innerEmitter.once(Yr, this._initLocalConversationList, this);} }]), s;}(Bo),vu = function () {function e(t) {if (r(this, e), void 0 === t) throw new pt({ code: Ct, message: On });if (void 0 === t.tim) throw new pt({ code: Ct, message: "".concat(On, ".tim") });this.list = new Map(), this.tim = t.tim, this._initializeOptions(t);}return i(e, [{ key: "getLocalOldestMessageByConversationID", value: function value(e) {if (!e) return null;if (!this.list.has(e)) return null;var t = this.list.get(e).values();return t ? t.next().value : null;} }, { key: "_initializeOptions", value: function value(e) {this.options = {};var t = { memory: { maxDatasPerKey: 100, maxBytesPerData: 256, maxKeys: 0 }, cache: { maxDatasPerKey: 10, maxBytesPerData: 256, maxKeys: 0 } };for (var n in t) {if (Object.prototype.hasOwnProperty.call(t, n)) {if (void 0 === e[n]) {this.options[n] = t[n];continue;}var r = t[n];for (var o in r) {if (Object.prototype.hasOwnProperty.call(r, o)) {if (void 0 === e[n][o]) {this.options[n][o] = r[o];continue;}this.options[n][o] = e[n][o];}}}}} }, { key: "pushIn", value: function value(e) {var t = e.conversationID,n = e.ID,r = !0;return this.list.has(t) || this.list.set(t, new Map()), this.list.has(t) && this.list.get(t).has(n) ? r = !1 : this.list.get(t).set(n, e), r;} }, { key: "unshift", value: function value(e) {re(e) ? e.length > 0 && this._unshiftMultipleMessages(e) : this._unshiftSingleMessage(e);} }, { key: "_unshiftSingleMessage", value: function value(e) {var t = e.conversationID,n = e.ID;if (!this.list.has(t)) return this.list.set(t, new Map()), void this.list.get(t).set(n, e);var r = Array.from(this.list.get(t));r.unshift([n, e]), this.list.set(t, new Map(r));} }, { key: "_unshiftMultipleMessages", value: function value(e) {for (var t = e.length, n = [], r = e[0].conversationID, o = this.list.has(r) ? Array.from(this.list.get(r)) : [], i = 0; i < t; i++) {n.push([e[i].ID, e[i]]);}this.list.set(r, new Map(n.concat(o)));} }, { key: "remove", value: function value(e) {var t = e.conversationID,n = e.ID;this.list.has(t) && this.list.get(t).delete(n);} }, { key: "revoke", value: function value(e, t, n) {if (J.debug("revoke message", e, t, n), this.list.has(e)) {var r,o = I(this.list.get(e));try {for (o.s(); !(r = o.n()).done;) {var i = v(r.value, 2)[1];if (i.sequence === t && !i.isRevoked && (oe(n) || i.random === n)) return i.isRevoked = !0, i;}} catch (s) {o.e(s);} finally {o.f();}}return null;} }, { key: "removeByConversationID", value: function value(e) {this.list.has(e) && this.list.delete(e);} }, { key: "hasLocalMessageList", value: function value(e) {return this.list.has(e);} }, { key: "getLocalMessageList", value: function value(e) {return this.hasLocalMessageList(e) ? _(this.list.get(e).values()) : [];} }, { key: "hasLocalMessage", value: function value(e, t) {return !!this.hasLocalMessageList(e) && this.list.get(e).has(t);} }, { key: "getLocalMessage", value: function value(e, t) {return this.hasLocalMessage(e, t) ? this.list.get(e).get(t) : null;} }, { key: "reset", value: function value() {this.list.clear();} }]), e;}(),_u = function () {function e(t) {r(this, e), this.tim = t;}return i(e, [{ key: "setMessageRead", value: function value(e) {var n = e.conversationID,r = e.messageID,o = this.tim.conversationController.getLocalConversation(n);if (J.log("ReadReportHandler.setMessageRead conversationID=".concat(n, " unreadCount=").concat(o ? o.unreadCount : 0)), !o || 0 === o.unreadCount) return zo();var i = r ? this.tim.messageController.getLocalMessage(n, r) : null;switch (o.type) {case t.CONV_C2C:return this._setC2CMessageRead({ conversationID: n, lastMessageTime: i ? i.time : o.lastMessage.lastTime });case t.CONV_GROUP:return this._setGroupMessageRead({ conversationID: n, lastMessageSeq: i ? i.sequence : o.lastMessage.lastSequence });case t.CONV_SYSTEM:return o.unreadCount = 0, zo();default:return zo();}} }, { key: "_setC2CMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageTime;J.log("ReadReportHandler._setC2CMessageRead conversationID=".concat(n, " lastMessageTime=").concat(r)), Z(r) || J.warn("ReadReportHandler._setC2CMessageRead 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确");var o = new oi();return o.setMethod(gi).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setC2CMessageRead", param: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n.replace("C2C", ""), lastMessageTime: r }] } } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), J.log("ReadReportHandler._setC2CMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageTime: r }), t._updateUnreadCount(n), new jo();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = v(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), J.log("ReadReportHandler._setC2CMessageRead failed. ".concat(fe(e))), Wo(e);});} }, { key: "_setGroupMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageSeq;J.log("ReadReportHandler._setGroupMessageRead conversationID=".concat(n, " lastMessageSeq=").concat(r)), Z(r) || J.warn("ReadReportHandler._setGroupMessageRead 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确");var o = new oi();return o.setMethod(mi).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setGroupMessageRead", param: { groupID: n.replace("GROUP", ""), messageReadSeq: r } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), J.log("ReadReportHandler._setGroupMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageSeq: r }), t._updateUnreadCount(n), new jo();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = v(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), J.log("ReadReportHandler._setGroupMessageRead failed. ".concat(fe(e))), Wo(e);});} }, { key: "_updateUnreadCount", value: function value(e) {var t = this.tim,n = t.conversationController,r = t.messageController,o = n.getLocalConversation(e),i = r.getLocalMessageList(e);o && (o.unreadCount = i.filter(function (e) {return !e.isRead;}).length, J.log("ReadReportHandler._updateUnreadCount conversationID=".concat(o.conversationID, " unreadCount=").concat(o.unreadCount)));} }, { key: "_updateIsReadAfterReadReport", value: function value(e) {var t = e.conversationID,n = e.lastMessageSeq,r = e.lastMessageTime,o = this.tim.messageController.getLocalMessageList(t);if (0 !== o.length) for (var i, s = o.length - 1; s >= 0; s--) {if (i = o[s], !(r && i.time > r || n && i.sequence > n)) {if ("in" === i.flow && i.isRead) break;i.setIsRead(!0);}}} }, { key: "updateIsRead", value: function value(e) {var n = this.tim,r = n.conversationController,o = n.messageController,i = r.getLocalConversation(e),s = o.getLocalMessageList(e);if (i && 0 !== s.length && !Ee(i.type)) {for (var a = [], u = 0; u < s.length; u++) {"in" !== s[u].flow ? "out" !== s[u].flow || s[u].isRead || s[u].setIsRead(!0) : a.push(s[u]);}var l = 0;if (i.type === t.CONV_C2C) {var c = a.slice(-i.unreadCount).filter(function (e) {return e.isRevoked;}).length;l = a.length - i.unreadCount - c;} else l = a.length - i.unreadCount;for (var p = 0; p < l && !a[p].isRead; p++) {a[p].setIsRead(!0);}}} }]), e;}(),Cu = function () {function e(t) {var n = t.tim,o = t.messageController;r(this, e), this.tim = n, this.messageController = o, this.completedMap = new Map(), this._initListener();}return i(e, [{ key: "getMessageList", value: function value(e) {var t = this,n = e.conversationID,r = e.nextReqMessageID,o = e.count;if (this.tim.groupController.checkJoinedAVChatRoomByID(n.replace("GROUP", ""))) return J.log("GetMessageHandler.getMessageList not available in avchatroom. conversationID=".concat(n)), zo({ messageList: [], nextReqMessageID: "", isCompleted: !0 });(oe(o) || o > 15) && (o = 15);var i = this._computeLeftCount({ conversationID: n, nextReqMessageID: r });return J.log("GetMessageHandler.getMessageList. conversationID=".concat(n, " leftCount=").concat(i, " count=").concat(o, " nextReqMessageID=").concat(r)), this._needGetHistory({ conversationID: n, leftCount: i, count: o }) ? this.messageController.getHistoryMessages({ conversationID: n, count: 20 }).then(function () {return i = t._computeLeftCount({ conversationID: n, nextReqMessageID: r }), new jo(t._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i }));}) : (J.log("GetMessageHandler.getMessageList. get messagelist from memory"), zo(this._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i })));} }, { key: "setCompleted", value: function value(e) {J.log("GetMessageHandler.setCompleted. conversationID=".concat(e)), this.completedMap.set(e, !0);} }, { key: "deleteCompletedItem", value: function value(e) {J.log("GetMessageHandler.deleteCompletedItem. conversationID=".concat(e)), this.completedMap.delete(e);} }, { key: "_initListener", value: function value() {var e = this;this.tim.innerEmitter.on(Po, function () {e.setCompleted(t.CONV_SYSTEM);}), this.tim.innerEmitter.on(No, function (n) {var r = n.data;e.setCompleted("".concat(t.CONV_GROUP).concat(r));});} }, { key: "_getMessageListSize", value: function value(e) {return this.messageController.getLocalMessageList(e).length;} }, { key: "_needGetHistory", value: function value(e) {var n = e.conversationID,r = e.leftCount,o = e.count,i = this.tim.conversationController.getLocalConversation(n),s = !!i && i.type === t.CONV_SYSTEM,a = !!i && i.subType === t.GRP_AVCHATROOM;return !s && !a && r < o && !this.completedMap.has(n);} }, { key: "_computeResult", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = e.leftCount,i = this._computeMessageList({ conversationID: t, nextReqMessageID: n, count: r }),s = this._computeIsCompleted({ conversationID: t, leftCount: o, count: r }),a = this._computeNextReqMessageID({ messageList: i, isCompleted: s, conversationID: t });return J.log("GetMessageHandler._computeResult. conversationID=".concat(t, " leftCount=").concat(o, " count=").concat(r, " nextReqMessageID=").concat(a, " nums=").concat(i.length, " isCompleted=").concat(s)), { messageList: i, nextReqMessageID: a, isCompleted: s };} }, { key: "_computeNextReqMessageID", value: function value(e) {var t = e.messageList,n = e.isCompleted,r = e.conversationID;if (!n) return 0 === t.length ? "" : t[0].ID;var o = this.messageController.getLocalMessageList(r);return 0 === o.length ? "" : o[0].ID;} }, { key: "_computeMessageList", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = this.messageController.getLocalMessageList(t),i = this._computeIndexEnd({ nextReqMessageID: n, messageList: o }),s = this._computeIndexStart({ indexEnd: i, count: r });return o.slice(s, i);} }, { key: "_computeIndexEnd", value: function value(e) {var t = e.messageList,n = void 0 === t ? [] : t,r = e.nextReqMessageID;return r ? n.findIndex(function (e) {return e.ID === r;}) : n.length;} }, { key: "_computeIndexStart", value: function value(e) {var t = e.indexEnd,n = e.count;return t > n ? t - n : 0;} }, { key: "_computeLeftCount", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;return n ? this.messageController.getLocalMessageList(t).findIndex(function (e) {return e.ID === n;}) : this._getMessageListSize(t);} }, { key: "_computeIsCompleted", value: function value(e) {var t = e.conversationID;return !!(e.leftCount <= e.count && this.completedMap.has(t));} }, { key: "reset", value: function value() {J.log("GetMessageHandler.reset"), this.completedMap.clear();} }]), e;}(),Mu = function e(t) {r(this, e), this.value = t, this.next = null;},Iu = function () {function e(t) {r(this, e), this.MAX_LENGTH = t, this.pTail = null, this.pNodeToDel = null, this.map = new Map(), J.log("SinglyLinkedList init MAX_LENGTH=".concat(this.MAX_LENGTH));}return i(e, [{ key: "pushIn", value: function value(e) {var t = new Mu(e);if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);else {var n = this.pNodeToDel;this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1);}} }, { key: "has", value: function value(e) {return this.map.has(e);} }, { key: "reset", value: function value() {for (var e; null !== this.pNodeToDel;) {e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;}this.pTail = null, this.map.clear();} }]), e;}(),Su = function () {function e(t) {r(this, e), this.tim = t;}return i(e, [{ key: "upload", value: function value(e) {switch (e.type) {case t.MSG_IMAGE:return this._uploadImage(e);case t.MSG_FILE:return this._uploadFile(e);case t.MSG_AUDIO:return this._uploadAudio(e);case t.MSG_VIDEO:return this._uploadVideo(e);default:return Promise.resolve();}} }, { key: "_uploadImage", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadImage({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Wo(new pt({ code: Dt, message: "".concat(Pn) }));}} }).then(function (e) {var t,n = e.location,r = e.fileType,i = e.fileSize,s = Ie(n);return o.updateImageFormat(r), o.updateImageInfoArray({ size: i, url: s }), t = o._imageMemoryURL, O ? new Promise(function (e, n) {wx.getImageInfo({ src: t, success: function success(t) {e({ width: t.width, height: t.height });}, fail: function fail() {e({ width: 0, height: 0 });} });}) : x && 9 === F ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function (e, n) {var r = new Image();r.onload = function () {e({ width: this.width, height: this.height }), r = null;}, r.onerror = function () {e({ width: 0, height: 0 }), r = null;}, r.src = t;});}).then(function (t) {var n = t.width,r = t.height;return o.updateImageInfoArray({ width: n, height: r }), e;});} }, { key: "_uploadFile", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadFile({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Wo(new pt({ code: Dt, message: "".concat(Pn) }));}} }).then(function (t) {var n = t.location,r = Ie(n);return o.updateFileUrl(r), e;});} }, { key: "_uploadAudio", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadAudio({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Wo(new pt({ code: Dt, message: "".concat(Pn) }));}} }).then(function (t) {var n = t.location,r = Ie(n);return o.updateAudioUrl(r), e;});} }, { key: "_uploadVideo", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadVideo({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), se(i.onProgress)) try {i.onProgress(e);} catch (t) {return Wo(new pt({ code: Dt, message: "".concat(Pn) }));}} }).then(function (t) {var n = Ie(t.location);return o.updateVideoUrl(n), e;});} }]), e;}(),Du = function (n) {l(s, n);var o = y(s);function s(e) {var t;return r(this, s), (t = o.call(this, e))._initializeMembers(), t._initializeListener(), t._initialzeHandlers(), t.messageOptionMap = new Map(), t;}return i(s, [{ key: "_initializeMembers", value: function value() {this.messagesList = new vu({ tim: this.tim }), this.currentMessageKey = {}, this.singlyLinkedList = new Iu(100);} }, { key: "_initialzeHandlers", value: function value() {this.readReportHandler = new _u(this.tim, this), this.getMessageHandler = new Cu({ messageController: this, tim: this.tim }), this.uploadFileHandler = new Su(this.tim);} }, { key: "reset", value: function value() {this.messagesList.reset(), this.currentMessageKey = {}, this.getMessageHandler.reset(), this.singlyLinkedList.reset(), this.messageOptionMap.clear();} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(po, this._onReceiveC2CMessage, this), e.on(Wr, this._onSyncMessagesProcessing, this), e.on(Xr, this._onSyncMessagesFinished, this), e.on(ho, this._onReceiveGroupMessage, this), e.on(fo, this._onReceiveGroupTips, this), e.on(go, this._onReceiveSystemNotice, this), e.on(_o, this._onReceiveGroupMessageRevokedNotice, this), e.on(Co, this._onReceiveC2CMessageRevokedNotice, this), e.on(Oo, this._clearConversationMessages, this);} }, { key: "sendMessageInstance", value: function value(e) {var n,r = this,o = this.tim.sumStatController,i = null;switch (e.conversationType) {case t.CONV_C2C:i = this._handleOnSendC2CMessageSuccess.bind(this);break;case t.CONV_GROUP:i = this._handleOnSendGroupMessageSuccess.bind(this);break;default:return Wo(new pt({ code: It, message: Nn }));}return this.singlyLinkedList.pushIn(e.random), this.uploadFileHandler.upload(e).then(function () {var i = null;return e.isSendable() ? (o.addTotalCount(ei), n = Date.now(), e.conversationType === t.CONV_C2C ? i = r._createC2CMessagePack(e) : e.conversationType === t.CONV_GROUP && (i = r._createGroupMessagePack(e)), r.request(i)) : Wo({ code: Ut, message: zn });}).then(function (s) {return o.addSuccessCount(ei), o.addCost(ei, Math.abs(Date.now() - n)), e.conversationType === t.CONV_GROUP && (e.sequence = s.data.sequence, e.time = s.data.time, e.generateMessageID(r.tim.context.identifier)), r.messagesList.pushIn(e), i(e, s.data), r.messageOptionMap.delete(e.messageID), r.emitInnerEvent(Jr, { eventDataList: [{ conversationID: e.conversationID, unreadCount: 0, type: e.conversationType, subType: e.conversationSubType, lastMessage: e }] }), new jo({ message: e });}).catch(function (t) {e.status = Pe.FAIL;var n = new oi();return n.setMethod(pi).setMessageType(e.type).setText("".concat(r._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), r.probeNetwork().then(function (e) {var r = v(e, 2),o = r[0],i = r[1];n.setError(t, o, i).setEnd();}), J.error("MessageController.sendMessageInstance error:", t), Wo(new pt({ code: t && t.code ? t.code : _t, message: t && t.message ? t.message : Rn, data: { message: e } }));});} }, { key: "resendMessage", value: function value(e) {return e.isResend = !0, e.status = Pe.UNSEND, this.sendMessageInstance(e);} }, { key: "_isFileLikeMessage", value: function value(e) {return [t.MSG_IMAGE, t.MSG_FILE, t.MSG_AUDIO, t.MSG_VIDEO].indexOf(e.type) >= 0;} }, { key: "_resendBinaryTypeMessage", value: function value() {} }, { key: "_createC2CMessagePack", value: function value(e) {return { name: "c2cMessage", action: "create", tjgID: this._generateTjgID(e), param: { toAccount: e.to, msgBody: e.getElements(), msgSeq: e.sequence, msgRandom: e.random } };} }, { key: "_handleOnSendC2CMessageSuccess", value: function value(e, t) {e.status = Pe.SUCCESS, e.time = t.time;} }, { key: "_createGroupMessagePack", value: function value(e) {return { name: "groupMessage", action: "create", tjgID: this._generateTjgID(e), param: { groupID: e.to, msgBody: e.getElements(), random: e.random, priority: e.priority, clientSequence: e.clientSequence } };} }, { key: "_handleOnSendGroupMessageSuccess", value: function value(e, t) {e.sequence = t.sequence, e.time = t.time, e.status = Pe.SUCCESS;} }, { key: "_onReceiveC2CMessage", value: function value(n) {J.debug("MessageController._onReceiveC2CMessage nums=".concat(n.data.length));var r = this._newC2CMessageStoredAndSummary({ notifiesList: n.data, type: t.CONV_C2C, C2CRemainingUnreadList: n.C2CRemainingUnreadList }),o = r.eventDataList,i = r.result;o.length > 0 && this.emitInnerEvent(eo, { eventDataList: o, result: i }), i.length > 0 && this.emitOuterEvent(e.MESSAGE_RECEIVED, i);} }, { key: "_onReceiveGroupMessage", value: function value(t) {J.debug("MessageController._onReceiveGroupMessage nums=".concat(t.data.length));var n = this.newGroupMessageStoredAndSummary(t.data),r = n.eventDataList,o = n.result;r.length > 0 && this.emitInnerEvent(to, { eventDataList: r, result: o, isGroupTip: !1 }), o.length > 0 && this.emitOuterEvent(e.MESSAGE_RECEIVED, o);} }, { key: "_onReceiveGroupTips", value: function value(t) {var n = t.data;J.debug("MessageController._onReceiveGroupTips nums=".concat(n.length));var r = this.newGroupTipsStoredAndSummary(n),o = r.eventDataList,i = r.result;o.length > 0 && this.emitInnerEvent(to, { eventDataList: o, result: i, isGroupTip: !0 }), i.length > 0 && this.emitOuterEvent(e.MESSAGE_RECEIVED, i);} }, { key: "_onReceiveSystemNotice", value: function value(t) {var n = t.data,r = n.groupSystemNotices,o = n.type;J.debug("MessageController._onReceiveSystemNotice nums=".concat(r.length));var i = this.newSystemNoticeStoredAndSummary({ notifiesList: r, type: o }),s = i.eventDataList,a = i.result;s.length > 0 && this.emitInnerEvent(no, { eventDataList: s, result: a, type: o }), a.length > 0 && "poll" === o && this.emitOuterEvent(e.MESSAGE_RECEIVED, a);} }, { key: "_onReceiveGroupMessageRevokedNotice", value: function value(t) {var n = this;J.debug("MessageController._onReceiveGroupMessageRevokedNotice nums=".concat(t.data.length));var r = [],o = null;t.data.forEach(function (e) {e.elements.revokedInfos.forEach(function (e) {(o = n.messagesList.revoke("GROUP".concat(e.groupID), e.sequence)) && r.push(o);});}), 0 !== r.length && (this.emitInnerEvent(ro, r), this.emitOuterEvent(e.MESSAGE_REVOKED, r));} }, { key: "_onReceiveC2CMessageRevokedNotice", value: function value(t) {var n = this;J.debug("MessageController._onReceiveC2CMessageRevokedNotice nums=".concat(t.data.length));var r = [],o = null;t.data.forEach(function (e) {e.c2cMessageRevokedNotify.revokedInfos.forEach(function (e) {var t = n.tim.context.identifier === e.from ? "C2C".concat(e.to) : "C2C".concat(e.from);(o = n.messagesList.revoke(t, e.sequence, e.random)) && r.push(o);});}), 0 !== r.length && (this.emitInnerEvent(ro, r), this.emitOuterEvent(e.MESSAGE_REVOKED, r));} }, { key: "_clearConversationMessages", value: function value(e) {var t = e.data;this.messagesList.removeByConversationID(t), this.getMessageHandler.deleteCompletedItem(t);} }, { key: "_pushIntoNoticeResult", value: function value(e, t) {var n = this.messagesList.pushIn(t),r = this.singlyLinkedList.has(t.random);return !(!n || !1 !== r) && (e.push(t), !0);} }, { key: "_newC2CMessageStoredAndSummary", value: function value(e) {for (var n = e.notifiesList, r = e.type, o = e.C2CRemainingUnreadList, i = e.isFromSync, s = null, a = [], u = [], l = {}, c = this.tim.bigDataHallwayController, p = 0, h = n.length; p < h; p++) {var f = n[p];if (f.currentUser = this.tim.context.identifier, f.conversationType = r, f.isSystemMessage = !!f.isSystemMessage, s = new br(f), f.elements = c.parseElements(f.elements, f.from), s.setElement(f.elements), !i) if (!this._pushIntoNoticeResult(u, s)) continue;void 0 === l[s.conversationID] ? l[s.conversationID] = a.push({ conversationID: s.conversationID, unreadCount: "out" === s.flow ? 0 : 1, type: s.conversationType, subType: s.conversationSubType, lastMessage: s }) - 1 : (a[l[s.conversationID]].type = s.conversationType, a[l[s.conversationID]].subType = s.conversationSubType, a[l[s.conversationID]].lastMessage = s, "in" === s.flow && a[l[s.conversationID]].unreadCount++);}if (re(o)) for (var d = function d(e, n) {var r = a.find(function (t) {return t.conversationID === "C2C".concat(o[e].from);});r ? r.unreadCount += o[e].count : a.push({ conversationID: "C2C".concat(o[e].from), unreadCount: o[e].count, type: t.CONV_C2C, lastMsgTime: o[e].lastMsgTime });}, g = 0, m = o.length; g < m; g++) {d(g);}return { eventDataList: a, result: u };} }, { key: "newGroupMessageStoredAndSummary", value: function value(e) {var n = null,r = [],o = {},i = [],s = t.CONV_GROUP,a = this.tim.bigDataHallwayController,u = e.length;u > 1 && e.sort(function (e, t) {return e.sequence - t.sequence;});for (var l = 0; l < u; l++) {var c = e[l];if (c.currentUser = this.tim.context.identifier, c.conversationType = s, c.isSystemMessage = !!c.isSystemMessage, n = new br(c), c.elements = a.parseElements(c.elements, c.from), n.setElement(c.elements), !this._isMessageFromAVChatroom(n)) this._pushIntoNoticeResult(i, n) && (void 0 === o[n.conversationID] ? o[n.conversationID] = r.push({ conversationID: n.conversationID, unreadCount: "out" === n.flow ? 0 : 1, type: n.conversationType, subType: n.conversationSubType, lastMessage: n }) - 1 : (r[o[n.conversationID]].type = n.conversationType, r[o[n.conversationID]].subType = n.conversationSubType, r[o[n.conversationID]].lastMessage = n, "in" === n.flow && r[o[n.conversationID]].unreadCount++));}return { eventDataList: r, result: i };} }, { key: "_isMessageFromAVChatroom", value: function value(e) {var t = e.conversationID.slice(5);return this.tim.groupController.checkJoinedAVChatRoomByID(t);} }, { key: "newGroupTipsStoredAndSummary", value: function value(e) {for (var n = null, r = [], o = [], i = {}, s = 0, a = e.length; s < a; s++) {var l = e[s];if (l.currentUser = this.tim.context.identifier, l.conversationType = t.CONV_GROUP, (n = new br(l)).setElement({ type: t.MSG_GRP_TIP, content: u({}, l.elements, { groupProfile: l.groupProfile }) }), n.isSystemMessage = !1, !this._isMessageFromAVChatroom(n)) this._pushIntoNoticeResult(o, n) && (void 0 === i[n.conversationID] ? i[n.conversationID] = r.push({ conversationID: n.conversationID, unreadCount: "out" === n.flow ? 0 : 1, type: n.conversationType, subType: n.conversationSubType, lastMessage: n }) - 1 : (r[i[n.conversationID]].type = n.conversationType, r[i[n.conversationID]].subType = n.conversationSubType, r[i[n.conversationID]].lastMessage = n, "in" === n.flow && r[i[n.conversationID]].unreadCount++));}return { eventDataList: r, result: o };} }, { key: "newSystemNoticeStoredAndSummary", value: function value(e) {var n = e.notifiesList,r = e.type,o = null,i = n.length,s = 0,a = [],l = { conversationID: t.CONV_SYSTEM, unreadCount: 0, type: t.CONV_SYSTEM, subType: null, lastMessage: null };for (s = 0; s < i; s++) {var c = n[s];if (c.elements.operationType !== ze) c.currentUser = this.tim.context.identifier, c.conversationType = t.CONV_SYSTEM, c.conversationID = t.CONV_SYSTEM, (o = new br(c)).setElement({ type: t.MSG_GRP_SYS_NOTICE, content: u({}, c.elements, { groupProfile: c.groupProfile }) }), o.isSystemMessage = !0, (1 === o.sequence && 1 === o.random || 2 === o.sequence && 2 === o.random) && (o.sequence = me(), o.random = me(), o.generateMessageID(c.currentUser), J.log("MessageController.newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID=".concat(o.ID))), this._pushIntoNoticeResult(a, o) && ("poll" === r ? l.unreadCount++ : "sync" === r && o.setIsRead(!0), l.subType = o.conversationSubType);}return l.lastMessage = a[a.length - 1], { eventDataList: a.length > 0 ? [l] : [], result: a };} }, { key: "_onSyncMessagesProcessing", value: function value(e) {var n = this._newC2CMessageStoredAndSummary({ notifiesList: e.data, type: t.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.C2CRemainingUnreadList }),r = n.eventDataList,o = n.result;this.emitInnerEvent(Qr, { eventDataList: r, result: o });} }, { key: "_onSyncMessagesFinished", value: function value(e) {this.triggerReady();var n = this._newC2CMessageStoredAndSummary({ notifiesList: e.data.messageList, type: t.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.data.C2CRemainingUnreadList }),r = n.eventDataList,o = n.result;this.emitInnerEvent(Zr, { eventDataList: r, result: o });} }, { key: "getHistoryMessages", value: function value(e) {if (e.conversationID === t.CONV_SYSTEM) return zo();!e.count && (e.count = 15), e.count > 20 && (e.count = 20);var n = this.messagesList.getLocalOldestMessageByConversationID(e.conversationID);n || ((n = {}).time = 0, n.sequence = 0, 0 === e.conversationID.indexOf(t.CONV_C2C) ? (n.to = e.conversationID.replace(t.CONV_C2C, ""), n.conversationType = t.CONV_C2C) : 0 === e.conversationID.indexOf(t.CONV_GROUP) && (n.to = e.conversationID.replace(t.CONV_GROUP, ""), n.conversationType = t.CONV_GROUP));var r = "";switch (n.conversationType) {case t.CONV_C2C:return r = e.conversationID.replace(t.CONV_C2C, ""), this.getC2CRoamMessages({ conversationID: e.conversationID, peerAccount: r, count: e.count, lastMessageTime: void 0 === this.currentMessageKey[e.conversationID] ? 0 : n.time });case t.CONV_GROUP:return this.getGroupRoamMessages({ conversationID: e.conversationID, groupID: n.to, count: e.count, sequence: n.sequence - 1 });default:return zo();}} }, { key: "getC2CRoamMessages", value: function value(e) {var n = this,r = void 0 !== this.currentMessageKey[e.conversationID] ? this.currentMessageKey[e.conversationID] : "";J.log("MessageController.getC2CRoamMessages toAccount=".concat(e.peerAccount, " count=").concat(e.count || 15, " lastMessageTime=").concat(e.lastMessageTime || 0, " messageKey=").concat(r));var o = new oi();return o.setMethod(hi).setStart(), this.request({ name: "c2cMessage", action: "query", param: { peerAccount: e.peerAccount, count: e.count || 15, lastMessageTime: e.lastMessageTime || 0, messageKey: r } }).then(function (i) {var s = i.data,a = s.complete,u = s.messageList;oe(u) ? J.log("MessageController.getC2CRoamMessages ok. complete=".concat(a, " but messageList is undefined!")) : J.log("MessageController.getC2CRoamMessages ok. complete=".concat(a, " nums=").concat(u.length)), o.setCode(0).setNetworkType(n.getNetworkType()).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(r, "-").concat(a, "-").concat(u ? u.length : "undefined")).setEnd(), 1 === a && n.getMessageHandler.setCompleted(e.conversationID);var l = n._roamMessageStore(u, t.CONV_C2C, e.conversationID);return n.readReportHandler.updateIsRead(e.conversationID), n.currentMessageKey[e.conversationID] = i.data.messageKey, l;}).catch(function (t) {return n.probeNetwork().then(function (n) {var i = v(n, 2),s = i[0],a = i[1];o.setError(t, s, a).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(r)).setEnd();}), J.warn("MessageController.getC2CRoamMessages failed. ".concat(t)), Wo(t);});} }, { key: "_computeLastSequence", value: function value(e) {return e.sequence >= 0 ? Promise.resolve(e.sequence) : this.tim.groupController.getGroupLastSequence(e.groupID);} }, { key: "getGroupRoamMessages", value: function value(e) {var n = this,r = new oi(),o = 0;return this._computeLastSequence(e).then(function (t) {return o = t, J.log("MessageController.getGroupRoamMessages groupID=".concat(e.groupID, " lastSequence=").concat(o)), r.setMethod(fi).setStart(), n.request({ name: "groupMessage", action: "query", param: { groupID: e.groupID, count: 21, sequence: o } });}).then(function (i) {var s = i.data,a = s.messageList,u = s.complete;oe(a) ? J.log("MessageController.getGroupRoamMessages ok. complete=".concat(u, " but messageList is undefined!")) : J.log("MessageController.getGroupRoamMessages ok. complete=".concat(u, " nums=").concat(a.length)), r.setCode(0).setNetworkType(n.getNetworkType()).setText("".concat(e.groupID, "-").concat(o, "-").concat(u, "-").concat(a ? a.length : "undefined")).setEnd();var l = "GROUP".concat(e.groupID);if (2 === u || we(a)) return n.getMessageHandler.setCompleted(l), [];var c = n._roamMessageStore(a, t.CONV_GROUP, l);return n.readReportHandler.updateIsRead(l), c;}).catch(function (t) {return n.probeNetwork().then(function (n) {var i = v(n, 2),s = i[0],a = i[1];r.setError(t, s, a).setText("".concat(e.groupID, "-").concat(o)).setEnd();}), J.warn("MessageController.getGroupRoamMessages failed. ".concat(t)), Wo(t);});} }, { key: "_roamMessageStore", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],n = arguments.length > 1 ? arguments[1] : void 0,r = arguments.length > 2 ? arguments[2] : void 0,o = null,i = [],s = 0,a = e.length,l = null,c = n === t.CONV_GROUP,p = this.tim.bigDataHallwayController,h = function h() {s = c ? e.length - 1 : 0, a = c ? 0 : e.length;},f = function f() {c ? --s : ++s;},d = function d() {return c ? s >= a : s < a;};for (h(); d(); f()) {c && 1 === e[s].sequence && this.getMessageHandler.setCompleted(r), 1 !== e[s].isPlaceMessage && ((o = new br(e[s])).to = e[s].to, o.isSystemMessage = !!e[s].isSystemMessage, o.conversationType = n, e[s].event === qe.JSON.TYPE.GROUP.TIP ? l = { type: t.MSG_GRP_TIP, content: u({}, e[s].elements, { groupProfile: e[s].groupProfile }) } : (e[s].elements = p.parseElements(e[s].elements, e[s].from), l = e[s].elements), o.setElement(l), o.reInitialize(this.tim.context.identifier), i.push(o));}return this.messagesList.unshift(i), h = f = d = null, i;} }, { key: "getLocalMessageList", value: function value(e) {return this.messagesList.getLocalMessageList(e);} }, { key: "getLocalMessage", value: function value(e, t) {return this.messagesList.getLocalMessage(e, t);} }, { key: "hasLocalMessage", value: function value(e, t) {return this.messagesList.hasLocalMessage(e, t);} }, { key: "deleteLocalMessage", value: function value(e) {e instanceof br && this.messagesList.remove(e);} }, { key: "revokeMessage", value: function value(e) {var n,r = this;e.conversationType === t.CONV_C2C ? n = { name: "c2cMessageWillBeRevoked", action: "create", param: { msgInfo: { fromAccount: e.from, toAccount: e.to, msgSeq: e.sequence, msgRandom: e.random, msgTimeStamp: e.time } } } : e.conversationType === t.CONV_GROUP && (n = { name: "groupMessageWillBeRevoked", action: "create", param: { to: e.to, msgSeqList: [{ msgSeq: e.sequence }] } });var o = new oi();return o.setMethod(di).setMessageType(e.type).setText("".concat(this._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), this.request(n).then(function (t) {var n = t.data.recallRetList;if (!we(n) && 0 !== n[0].retCode) {var i = new pt({ code: n[0].retCode, message: ct[n[0].retCode] || Gn, data: { message: e } });return o.setCode(i.code).setMessage(i.message).setEnd(), Wo(i);}return J.info("MessageController.revokeMessage ok. ID=".concat(e.ID)), e.isRevoked = !0, o.setCode(0).setEnd(), r.emitInnerEvent(ro, [e]), new jo({ message: e });}).catch(function (t) {r.probeNetwork().then(function (e) {var n = v(e, 2),r = n[0],i = n[1];o.setError(t, r, i).setEnd();});var n = new pt({ code: t && t.code ? t.code : Tt, message: t && t.message ? t.message : Gn, data: { message: e } });return J.warn("MessageController.revokeMessage failed. ID=".concat(e.ID, " code=").concat(n.code, " message=").concat(n.message)), Wo(n);});} }, { key: "setMessageRead", value: function value(e) {var t = this;return new Promise(function (n, r) {t.ready(function () {t.readReportHandler.setMessageRead(e).then(n).catch(r);});});} }, { key: "getMessageList", value: function value(e) {return this.getMessageHandler.getMessageList(e);} }, { key: "createTextMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new br(e),n = "string" == typeof e.payload ? e.payload : e.payload.text,r = new Ue({ text: n });return t.setElement(r), t;} }, { key: "createCustomMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new br(e),n = new Rr({ data: e.payload.data, description: e.payload.description, extension: e.payload.extension });return t.setElement(n), t;} }, { key: "createImageMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new br(e);if (O) {var n = e.payload.file;if (Q(n)) return void J.warn("微信小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var r = n.tempFilePaths[0],o = { url: r, name: r.slice(r.lastIndexOf("/") + 1), size: n.tempFiles[0].size, type: r.slice(r.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = o;} else if (R && Q(e.payload.file)) {var i = e.payload.file;e.payload.file = { files: [i] };}var s = new rt({ imageFormat: "UNKNOWN", uuid: this._generateUUID(), file: e.payload.file });return t.setElement(s), this.messageOptionMap.set(t.messageID, e), t;} }, { key: "createFileMessage", value: function value(e) {if (!O) {if (R && Q(e.payload.file)) {var t = e.payload.file;e.payload.file = { files: [t] };}e.currentUser = this.tim.context.identifier;var n = new br(e),r = new wr({ uuid: this._generateUUID(), file: e.payload.file });return n.setElement(r), this.messageOptionMap.set(n.messageID, e), n;}J.warn("微信小程序目前不支持选择文件， createFileMessage 接口不可用！");} }, { key: "createAudioMessage", value: function value(e) {if (O) {var t = e.payload.file;if (O) {var n = { url: t.tempFilePath, name: t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/") + 1), size: t.fileSize, second: parseInt(t.duration) / 1e3, type: t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = n;}e.currentUser = this.tim.context.identifier;var r = new br(e),o = new it({ second: Math.floor(t.duration / 1e3), size: t.fileSize, url: t.tempFilePath, uuid: this._generateUUID() });return r.setElement(o), this.messageOptionMap.set(r.messageID, e), r;}J.warn("createAudioMessage 目前只支持微信小程序发语音消息");} }, { key: "createVideoMessage", value: function value(e) {e.currentUser = this.tim.context.identifier, e.payload.file.thumbUrl = "https://webim-1252463788.cos.ap-shanghai.myqcloud.com/assets/images/transparent.png", e.payload.file.thumbSize = 1668;var t = {};if (O) {if (Q(e.payload.file)) return void J.warn("微信小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var n = e.payload.file;t.url = n.tempFilePath, t.name = n.tempFilePath.slice(n.tempFilePath.lastIndexOf("/") + 1), t.size = n.size, t.second = n.duration, t.type = n.tempFilePath.slice(n.tempFilePath.lastIndexOf(".") + 1).toLowerCase();} else if (R) {if (Q(e.payload.file)) {var r = e.payload.file;e.payload.file.files = [r];}var o = e.payload.file;t.url = window.URL.createObjectURL(o.files[0]), t.name = o.files[0].name, t.size = o.files[0].size, t.second = o.files[0].duration || 0, t.type = o.files[0].type.split("/")[1];}e.payload.file.videoFile = t;var i = new br(e),s = new Or({ videoFormat: t.type, videoSecond: Number(t.second.toFixed(0)), videoSize: t.size, remoteVideoUrl: "", videoUrl: t.url, videoUUID: this._generateUUID(), thumbUUID: this._generateUUID(), thumbWidth: e.payload.file.width || 200, thumbHeight: e.payload.file.height || 200, thumbUrl: e.payload.file.thumbUrl, thumbSize: e.payload.file.thumbSize, thumbFormat: e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() });return i.setElement(s), this.messageOptionMap.set(i.messageID, e), i;} }, { key: "createFaceMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new br(e),n = new ot(e.payload);return t.setElement(n), t;} }, { key: "_generateUUID", value: function value() {var e = this.tim.context;return "".concat(e.SDKAppID, "-").concat(e.identifier, "-").concat(function () {for (var e = "", t = 32; t > 0; --t) {e += ye[Math.floor(Math.random() * ve)];}return e;}());} }, { key: "_generateTjgID", value: function value(e) {return this.tim.context.tinyID + "-" + e.random;} }, { key: "getMessageOptionByID", value: function value(e) {return this.messageOptionMap.get(e);} }]), s;}(Bo),Tu = function () {function e(t) {r(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(t);}return i(e, [{ key: "_initMember", value: function value(e) {this.updateMember(e);} }, { key: "updateMember", value: function value(e) {var t = [null, void 0, "", 0, NaN];e.memberCustomField && Se(this.memberCustomField, e.memberCustomField), he(this, e, ["memberCustomField"], t);} }, { key: "updateRole", value: function value(e) {["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e);} }, { key: "updateMuteUntil", value: function value(e) {oe(e) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e) / 1e3));} }, { key: "updateNameCard", value: function value(e) {oe(e) || (this.nameCard = e);} }, { key: "updateMemberCustomField", value: function value(e) {e && Se(this.memberCustomField, e);} }]), e;}(),Eu = function () {function e(t) {r(this, e), this.tim = t.tim, this.groupController = t.groupController, this._initListeners();}return i(e, [{ key: "_initListeners", value: function value() {this.tim.innerEmitter.on(to, this._onReceivedGroupTips, this);} }, { key: "_onReceivedGroupTips", value: function value(e) {var t = this,n = e.data,r = n.result;n.isGroupTip && r.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:J.warn("GroupTipsHandler._onReceivedGroupTips Unhandled groupTips. operationType=", e.payload.operationType);}});} }, { key: "_onNewMemberComeIn", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n);} }, { key: "_onMemberQuit", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberKickedOut", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && Z(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberSetAdmin", value: function value(e) {var n = this,r = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var o = n.groupController.getLocalGroupMemberInfo(r, e);o && o.updateRole(t.GRP_MBR_ROLE_ADMIN);});} }, { key: "_onMemberCancelledAdmin", value: function value(e) {var n = this,r = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var o = n.groupController.getLocalGroupMemberInfo(r, e);o && o.updateRole(t.GRP_MBR_ROLE_MEMBER);});} }, { key: "_onGroupProfileModified", value: function value(e) {var t = this,n = e.payload.newGroupProfile,r = e.payload.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);Object.keys(n).forEach(function (e) {switch (e) {case "ownerID":t._ownerChaged(o, n);break;default:o[e] = n[e];}}), this.groupController.emitGroupListUpdate(!0, !0);} }, { key: "_ownerChaged", value: function value(e, n) {var r = e.groupID,o = this.groupController.getLocalGroupProfile(r),i = this.tim.context.identifier;if (i === n.ownerID) {o.updateGroup({ selfInfo: { role: t.GRP_MBR_ROLE_OWNER } });var s = this.groupController.getLocalGroupMemberInfo(r, i),a = this.groupController.getLocalGroupProfile(r).ownerID,u = this.groupController.getLocalGroupMemberInfo(r, a);s && s.updateRole(t.GRP_MBR_ROLE_OWNER), u && u.updateRole(t.GRP_MBR_ROLE_MEMBER);}} }, { key: "_onMemberInfoModified", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;e.payload.memberList.forEach(function (e) {var r = t.groupController.getLocalGroupMemberInfo(n, e.userID);r && e.muteTime && r.updateMuteUntil(e.muteTime);});} }]), e;}(),ku = function () {function n(e) {r(this, n), this.groupController = e.groupController, this.tim = e.tim, this.pendencyMap = new Map(), this._initLiceners();}return i(n, [{ key: "_initLiceners", value: function value() {this.tim.innerEmitter.on(no, this._onReceivedGroupSystemNotice, this), this.tim.innerEmitter.on(Xr, this._clearGroupSystemNotice, this);} }, { key: "_clearGroupSystemNotice", value: function value() {var e = this;this.getPendencyList().then(function (n) {n.forEach(function (t) {e.pendencyMap.set("".concat(t.from, "_").concat(t.groupID, "_").concat(t.to), t);});var r = e.tim.messageController.getLocalMessageList(t.CONV_SYSTEM),o = [];r.forEach(function (t) {var n = t.payload,r = n.operatorID,i = n.operationType,s = n.groupProfile;if (i === xe) {var a = "".concat(r, "_").concat(s.groupID, "_").concat(s.to),u = e.pendencyMap.get(a);u && Z(u.handled) && 0 !== u.handled && o.push(t);}}), e.groupController.deleteGroupSystemNotice({ messageList: o });});} }, { key: "getPendencyList", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "getGroupPendency", param: { startTime: e && e.startTime ? e.startTime : 0, limit: e && e.limit ? e.limit : 10, handleAccount: this.tim.context.identifier } }).then(function (e) {var n = e.data,r = n.pendencyList;return 0 !== n.nextStartTime ? t.getPendencyList({ startTime: n.nextStartTime }).then(function (e) {return [].concat(_(r), _(e));}) : r;});} }, { key: "_onReceivedGroupSystemNotice", value: function value(t) {var n = this,r = t.data,o = r.result;"sync" !== r.type && o.forEach(function (t) {switch (t.payload.operationType) {case 1:n._onApplyGroupRequest(t);break;case 2:n._onApplyGroupRequestAgreed(t);break;case 3:n._onApplyGroupRequestRefused(t);break;case 4:n._onMemberKicked(t);break;case 5:n._onGroupDismissed(t);break;case 6:break;case 7:n._onInviteGroup(t);break;case 8:n._onQuitGroup(t);break;case 9:n._onSetManager(t);break;case 10:n._onDeleteManager(t);break;case 11:case 12:case 15:break;case 255:n.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: We });}});} }, { key: "_onApplyGroupRequest", value: function value(t) {this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: xe });} }, { key: "_onApplyGroupRequestAgreed", value: function value(t) {var n = this,r = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(r) || this.groupController.getGroupProfile({ groupID: r }).then(function (e) {var t = e.data.group;t && (n.groupController.updateGroupMap([t]), n.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Fe });} }, { key: "_onApplyGroupRequestRefused", value: function value(t) {this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: He });} }, { key: "_onMemberKicked", value: function value(t) {var n = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) && this.groupController.deleteLocalGroupAndConversation(n), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Be });} }, { key: "_onGroupDismissed", value: function value(t) {var n = t.payload.groupProfile.groupID,r = this.groupController.hasLocalGroup(n),o = this.groupController.AVChatRoomHandler;r && this.groupController.deleteLocalGroupAndConversation(n), o.checkJoinedAVChatRoomByID(n) && o.reset(), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Ve });} }, { key: "_onInviteGroup", value: function value(t) {var n = this,r = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(r) || this.groupController.getGroupProfile({ groupID: r }).then(function (e) {var t = e.data.group;t && (n.groupController.updateGroupMap([t]), n.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: Ke });} }, { key: "_onQuitGroup", value: function value(t) {var n = t.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) && this.groupController.deleteLocalGroupAndConversation(n), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: t, type: je });} }, { key: "_onSetManager", value: function value(n) {var r = n.payload.groupProfile,o = r.to,i = r.groupID,s = this.groupController.getLocalGroupMemberInfo(i, o);s && s.updateRole(t.GRP_MBR_ROLE_ADMIN), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: n, type: $e });} }, { key: "_onDeleteManager", value: function value(n) {var r = n.payload.groupProfile,o = r.to,i = r.groupID,s = this.groupController.getLocalGroupMemberInfo(i, o);s && s.updateRole(t.GRP_MBR_ROLE_MEMBER), this.groupController.emitOuterEvent(e.GROUP_SYSTEM_NOTICE_RECEIVED, { message: n, type: Ye });} }, { key: "reset", value: function value() {this.pendencyMap.clear();} }]), n;}(),Au = { 3: !0, 4: !0, 5: !0, 6: !0 },wu = function () {function n(e) {var t = e.tim,o = e.groupController;r(this, n), this.tim = t, this.groupController = o, this.AVChatRoomLoop = null, this.key = "", this.startSeq = 0, this.group = {};}return i(n, [{ key: "hasJoinedAVChatRoom", value: function value() {return !(!this.group || oe(this.group.groupID));} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return !(!this.group && oe(this.group.groupID)) && e === this.group.groupID;} }, { key: "getJoinedAVChatRoom", value: function value() {return this.hasJoinedAVChatRoom() ? this.group : null;} }, { key: "_updateProperties", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {t[n] = e[n];});} }, { key: "start", value: function value() {var e = { key: this.key, startSeq: this.startSeq };if (null === this.AVChatRoomLoop) {var t = this.groupController.createTransportCapsule({ name: "AVChatRoom", action: "startLongPoll", param: e });this.AVChatRoomLoop = this.tim.connectionController.createRunLoop({ pack: t, before: this._updateRequestData.bind(this), success: this._handleSuccess.bind(this), fail: this._handleFailure.bind(this), isAVChatRoomLoop: !0 }), this.AVChatRoomLoop.start(), J.log("AVChatRoomHandler.start message channel started");} else this.AVChatRoomLoop.isRunning() || this.AVChatRoomLoop.start();} }, { key: "stop", value: function value() {null !== this.AVChatRoomLoop && this.AVChatRoomLoop.isRunning() && (this.AVChatRoomLoop.abort(), this.AVChatRoomLoop.stop(), J.log("AVChatRoomHandler.stop message channel stopped"));} }, { key: "startRunLoop", value: function value(e) {var t = this;return this._precheck().then(function () {var n = e.longPollingKey,r = e.group;return t._updateProperties({ key: n, startSeq: 0, group: r || {} }), t.groupController.updateGroupMap([r]), t.groupController.emitGroupListUpdate(!0, !1), t.start(), t.groupController.isLoggedIn() ? zo({ status: Le.SUCCESS, group: r }) : zo({ status: Le.SUCCESS });});} }, { key: "joinWithoutAuth", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "applyJoinAVChatRoom", param: e }).then(function (n) {var r = n.data.longPollingKey;if (oe(r)) return Wo(new pt({ code: zt, message: ir }));J.log("AVChatRoomHandler.joinWithoutAuth ok. groupID:", e.groupID), t.groupController.emitInnerEvent(bo), t.groupController.emitInnerEvent(No, e.groupID);var o = new du({ groupID: e.groupID });return t.startRunLoop({ group: o, longPollingKey: r }), new jo({ status: Le.SUCCESS });}).catch(function (t) {return J.error("AVChatRoomHandler.joinWithoutAuth error:".concat(t.message, ". groupID:").concat(e.groupID)), Wo(t);});} }, { key: "_precheck", value: function value() {if (!this.hasJoinedAVChatRoom()) return Promise.resolve();if (this.groupController.isLoggedIn()) {if (!(this.group.selfInfo.role === t.GRP_MBR_ROLE_OWNER || this.group.ownerID === this.tim.loginInfo.identifier)) return this.groupController.quitGroup(this.group.groupID);this.groupController.deleteLocalGroupAndConversation(this.group.groupID);} else this.groupController.deleteLocalGroupAndConversation(this.group.groupID);return this.reset(), Promise.resolve();} }, { key: "_updateRequestData", value: function value(e) {e.StartSeq = this.startSeq, e.Key = this.key, this.tim.sumStatController.addTotalCount(Zo);} }, { key: "_handleSuccess", value: function value(e) {this.tim.sumStatController.addSuccessCount(Zo), this.tim.sumStatController.addCost(Zo, e.data.timecost), this.startSeq = e.data.nextSeq, this.key = e.data.key, Array.isArray(e.data.rspMsgList) && e.data.rspMsgList.forEach(function (e) {e.to = e.groupID;}), e.data.rspMsgList && e.data.rspMsgList.length > 0 && this._dispatchNotice(e.data.rspMsgList), this.groupController.emitInnerEvent(Io);} }, { key: "_handleFailure", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === ln) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;J.log("AVChatRoomHandler._handleFailure request timed out. url=".concat(t, " data=").concat(n));} else J.log("AVChatRoomHandler._handleFailure request timed out");} else J.log("AVChatRoomHandler._handleFailure request failed due to network error");this.groupController.emitInnerEvent(Mo);} }, { key: "_dispatchNotice", value: function value(n) {if (re(n) && 0 !== n.length) {var r = null,o = [],i = [],s = n.length;s > 1 && n.sort(function (e, t) {return e.sequence - t.sequence;});for (var a = 0; a < s; a++) {Au[n[a].event] ? (r = this.packMessage(n[a], n[a].event), this.tim.messageController.hasLocalMessage(r.conversationID, r.ID) || (r.conversationType === t.CONV_SYSTEM && i.push(r), o.push(r))) : J.warn("AVChatRoomHandler._dispatchMessage 未处理的 event 类型：", n[a].event);}if (i.length > 0 && this.groupController.emitInnerEvent(no, { result: i, eventDataList: [], type: "poll" }), 0 !== o.length) {var u = this.packConversationOption(o);u.length > 0 && this.groupController.emitInnerEvent(to, { eventDataList: u, type: "poll" }), J.debug("AVChatRoomHandler._dispatchNotice nums=".concat(o.length)), this.groupController.emitOuterEvent(e.MESSAGE_RECEIVED, o);}}} }, { key: "packMessage", value: function value(e, n) {e.currentUser = this.tim.context.identifier, e.conversationType = 5 === n ? t.CONV_SYSTEM : t.CONV_GROUP, e.isSystemMessage = !!e.isSystemMessage;var r = new br(e),o = this.packElements(e, n);return r.setElement(o), r;} }, { key: "packElements", value: function value(e, n) {return 4 === n || 6 === n ? { type: t.MSG_GRP_TIP, content: u({}, e.elements, { groupProfile: e.groupProfile }) } : 5 === n ? { type: t.MSG_GRP_SYS_NOTICE, content: u({}, e.elements, { groupProfile: e.groupProfile }) } : this.tim.bigDataHallwayController.parseElements(e.elements, e.from);} }, { key: "packConversationOption", value: function value(e) {for (var t = new Map(), n = 0; n < e.length; n++) {var r = e[n],o = r.conversationID;if (t.has(o)) {var i = t.get(o);i.lastMessage = r, "in" === r.flow && i.unreadCount++;} else t.set(o, { conversationID: r.conversationID, unreadCount: "out" === r.flow ? 0 : 1, type: r.conversationType, subType: r.conversationSubType, lastMessage: r });}return _(t.values());} }, { key: "reset", value: function value() {null !== this.AVChatRoomLoop && (J.log("AVChatRoomHandler.reset"), this.stop(), this.AVChatRoomLoop = null, this.key = "", this.startSeq = 0, this.group = {});} }]), n;}(),Ru = function (n) {l(s, n);var o = y(s);function s(e) {var t;return r(this, s), (t = o.call(this, e)).groupMap = new Map(), t.groupMemberListMap = new Map(), t.groupNoticeHandler = new ku({ tim: e, groupController: g(t) }), t.groupTipsHandler = new Eu({ tim: e, groupController: g(t) }), t.AVChatRoomHandler = new wu({ tim: e, groupController: g(t) }), t._initListeners(), t;}return i(s, [{ key: "createGroup", value: function value(e) {var n = this;if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {var r = new pt({ code: Ht, message: Qn });return Wo(r);}Te(e.type) && !oe(e.memberList) && e.memberList.length > 0 && (J.warn("GroupController.createGroup 创建AVChatRoom时不能添加群成员，自动忽略该字段"), e.memberList = void 0), De(e.type) || oe(e.joinOption) || (J.warn("GroupController.createGroup 创建Private/ChatRoom/AVChatRoom群时不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0);var o = new oi();return o.setMethod(Ci).setStart(), J.log("GroupController.createGroup."), this.request({ name: "group", action: "create", param: e }).then(function (r) {if (o.setCode(0).setNetworkType(n.getNetworkType()).setText("groupType=".concat(e.type, " groupID=").concat(r.data.groupID)).setEnd(), J.log("GroupController.createGroup ok. groupID:", r.data.groupID), e.type === t.GRP_AVCHATROOM) return n.getGroupProfile({ groupID: r.data.groupID });n.updateGroupMap([u({}, e, { groupID: r.data.groupID })]);var i = n.tim.createCustomMessage({ to: r.data.groupID, conversationType: t.CONV_GROUP, payload: { data: "group_create", extension: "".concat(n.tim.context.identifier, "创建群组") } });return n.tim.sendMessage(i), n.emitGroupListUpdate(), n.getGroupProfile({ groupID: r.data.groupID });}).then(function (e) {var n = e.data.group;return n.selfInfo.messageRemindType = t.MSG_REMIND_ACPT_AND_NOTE, n.selfInfo.role = t.GRP_MBR_ROLE_OWNER, e;}).catch(function (t) {return o.setText("groupType=".concat(e.type)), n.probeNetwork().then(function (e) {var n = v(e, 2),r = n[0],i = n[1];o.setError(t, r, i).setEnd();}), J.error("GroupController.createGroup error:", t), Wo(t);});} }, { key: "joinGroup", value: function value(e) {if (this.hasLocalGroup(e.groupID)) {var n = { status: t.JOIN_STATUS_ALREADY_IN_GROUP };return zo(n);}if (e.type === t.GRP_PRIVATE) {var r = new pt({ code: Bt, message: Zn });return Wo(r);}return J.log("GroupController.joinGroup. groupID:", e.groupID), this.isLoggedIn() ? this.applyJoinGroup(e) : this.AVChatRoomHandler.joinWithoutAuth(e);} }, { key: "quitGroup", value: function value(e) {var t = this;J.log("GroupController.quitGroup. groupID:", e);var n = this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);if (n && !this.isLoggedIn()) return J.log("GroupController.quitGroup anonymously ok. groupID:", e), this.deleteLocalGroupAndConversation(e), this.AVChatRoomHandler.reset(), zo({ groupID: e });var r = new oi();return r.setMethod(Ii).setStart(), this.request({ name: "group", action: "quitGroup", param: { groupID: e } }).then(function () {return r.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(), J.log("GroupController.quitGroup ok. groupID:", e), n && t.AVChatRoomHandler.reset(), t.deleteLocalGroupAndConversation(e), new jo({ groupID: e });}).catch(function (n) {return r.setText("groupID=".concat(e)), t.probeNetwork().then(function (e) {var t = v(e, 2),o = t[0],i = t[1];r.setError(n, o, i).setEnd();}), J.error("GroupController.quitGroup error.  error:".concat(n, ". groupID:").concat(e)), Wo(n);});} }, { key: "changeGroupOwner", value: function value(e) {var n = this;if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === t.GRP_AVCHATROOM) return Wo(new pt({ code: Vt, message: er }));if (e.newOwnerID === this.tim.loginInfo.identifier) return Wo(new pt({ code: Kt, message: tr }));var r = new oi();return r.setMethod(Si).setStart(), J.log("GroupController.changeGroupOwner. groupID:", e.groupID), this.request({ name: "group", action: "changeGroupOwner", param: e }).then(function () {r.setCode(0).setNetworkType(n.getNetworkType()).setText("groupID=".concat(e.groupID)).setEnd(), J.log("GroupController.changeGroupOwner ok. groupID:", e.groupID);var t = e.groupID,o = e.newOwnerID;n.groupMap.get(t).ownerID = o;var i = n.groupMemberListMap.get(t);if (i instanceof Map) {var s = i.get(n.tim.loginInfo.identifier);oe(s) || (s.updateRole("Member"), n.groupMap.get(t).selfInfo.role = "Member");var a = i.get(o);oe(a) || a.updateRole("Owner");}return n.emitGroupListUpdate(!0, !1), new jo({ group: n.groupMap.get(t) });}).catch(function (t) {return r.setText("groupID=".concat(e.groupID)), n.probeNetwork().then(function (e) {var n = v(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();}), J.error("GroupController.changeGroupOwner error:".concat(t, ". groupID:").concat(e.groupID)), Wo(t);});} }, { key: "dismissGroup", value: function value(e) {var n = this;if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === t.GRP_PRIVATE) return Wo(new pt({ code: jt, message: nr }));var r = new oi();return r.setMethod(Di).setStart(), J.log("GroupController.dismissGroup. groupID:".concat(e)), this.request({ name: "group", action: "destroyGroup", param: { groupID: e } }).then(function () {return r.setCode(0).setNetworkType(n.getNetworkType()).setText("groupID=".concat(e)).setEnd(), J.log("GroupController.dismissGroup ok. groupID:".concat(e)), n.deleteLocalGroupAndConversation(e), n.checkJoinedAVChatRoomByID(e) && n.AVChatRoomHandler.reset(), new jo({ groupID: e });}).catch(function (t) {return r.setText("groupID=".concat(e)), n.probeNetwork().then(function (e) {var n = v(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();}), J.error("GroupController.dismissGroup error:".concat(t, ". groupID:").concat(e)), Wo(t);});} }, { key: "updateGroupProfile", value: function value(e) {var t = this;!this.hasLocalGroup(e.groupID) || De(this.getLocalGroupProfile(e.groupID).type) || oe(e.joinOption) || (J.warn("GroupController.updateGroupProfile Private/ChatRoom/AVChatRoom群不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0), oe(e.muteAllMembers) || (e.muteAllMembers ? e.muteAllMembers = "On" : e.muteAllMembers = "Off");var n = new oi();return n.setMethod(Ti).setStart(), n.setText("groupID=".concat(e.groupID)), J.log("GroupController.updateGroupProfile. groupID:", e.groupID), this.request({ name: "group", action: "updateGroupProfile", param: e }).then(function () {(n.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.updateGroupProfile ok. groupID:", e.groupID), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setStorageGroupList());return new jo({ group: t.groupMap.get(e.groupID) });}).catch(function (r) {return t.probeNetwork().then(function (e) {var t = v(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), J.log("GroupController.updateGroupProfile failed. error:".concat(fe(r), " groupID:").concat(e.groupID)), Wo(r);});} }, { key: "setGroupMemberRole", value: function value(e) {var n = this,r = e.groupID,o = e.userID,i = e.role,s = this.groupMap.get(r);if (s.selfInfo.role !== t.GRP_MBR_ROLE_OWNER) return Wo(new pt({ code: Xt, message: ar }));if ([t.GRP_PRIVATE, t.GRP_AVCHATROOM].includes(s.type)) return Wo(new pt({ code: Jt, message: ur }));if ([t.GRP_MBR_ROLE_ADMIN, t.GRP_MBR_ROLE_MEMBER].indexOf(i) < 0) return Wo(new pt({ code: Qt, message: lr }));if (o === this.tim.loginInfo.identifier) return Wo(new pt({ code: Zt, message: cr }));var a = new oi();return a.setMethod(Oi).setStart(), a.setText("groupID=".concat(r, " userID=").concat(o, " role=").concat(i)), J.log("GroupController.setGroupMemberRole. groupID:".concat(r, ". userID: ").concat(o)), this._modifyGroupMemberInfo({ groupID: r, userID: o, role: i }).then(function (e) {return a.setCode(0).setNetworkType(n.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberRole ok. groupID:".concat(r, ". userID: ").concat(o)), new jo({ group: s, member: e });}).catch(function (e) {return n.probeNetwork().then(function (t) {var n = v(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberRole error:".concat(e, ". groupID:").concat(r, ". userID:").concat(o)), Wo(e);});} }, { key: "setGroupMemberMuteTime", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = e.muteTime;if (r === this.tim.loginInfo.identifier) return Wo(new pt({ code: en, message: pr }));J.log("GroupController.setGroupMemberMuteTime. groupID:".concat(n, ". userID: ").concat(r));var i = new oi();return i.setMethod(wi).setStart(), i.setText("groupID=".concat(n, " userID=").concat(r, " muteTime=").concat(o)), this._modifyGroupMemberInfo({ groupID: n, userID: r, muteTime: o }).then(function (e) {return i.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberMuteTime ok. groupID:".concat(n, ". userID: ").concat(r)), new jo({ group: t.getLocalGroupProfile(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = v(t, 2),r = n[0],o = n[1];i.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberMuteTime error:".concat(e, ". groupID:").concat(n, ". userID:").concat(r)), Wo(e);});} }, { key: "setMessageRemindType", value: function value(e) {var t = this;J.log("GroupController.setMessageRemindType. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));var n = e.groupID,r = e.messageRemindType;return this._modifyGroupMemberInfo({ groupID: n, messageRemindType: r, userID: this.tim.loginInfo.identifier }).then(function () {J.log("GroupController.setMessageRemindType ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || t.tim.loginInfo.identifier));var n = t.getLocalGroupProfile(e.groupID);return n && (n.selfInfo.messageRemindType = r), new jo({ group: n });}).catch(function (n) {return J.error("GroupController.setMessageRemindType error:".concat(n, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID || t.tim.loginInfo.identifier)), Wo(n);});} }, { key: "setGroupMemberNameCard", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.nameCard;J.log("GroupController.setGroupMemberNameCard. groupID:".concat(n, ". userID: ").concat(o));var s = new oi();return s.setMethod(Ri).setStart(), s.setText("groupID=".concat(n, " userID=").concat(o, " nameCard=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, nameCard: i }).then(function (e) {J.log("GroupController.setGroupMemberNameCard ok. groupID:".concat(n, ". userID: ").concat(o)), s.setCode(0).setNetworkType(t.getNetworkType()).setEnd();var r = t.getLocalGroupProfile(n);return o === t.tim.loginInfo.identifier && r && r.setSelfNameCard(i), new jo({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = v(t, 2),r = n[0],o = n[1];s.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberNameCard error:".concat(e, ". groupID:").concat(n, ". userID:").concat(o)), Wo(e);});} }, { key: "setGroupMemberCustomField", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.memberCustomField;J.log("GroupController.setGroupMemberCustomField. groupID:".concat(n, ". userID: ").concat(o));var s = new oi();return s.setMethod(Li).setStart(), s.setText("groupID=".concat(n, " userID=").concat(o, " memberCustomField=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, memberCustomField: i }).then(function (e) {return s.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), J.log("GroupController.setGroupMemberCustomField ok. groupID:".concat(n, ". userID: ").concat(o)), new jo({ group: t.groupMap.get(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = v(t, 2),r = n[0],o = n[1];s.setError(e, r, o).setEnd();}), J.error("GroupController.setGroupMemberCustomField error:".concat(e, ". groupID:").concat(n, ". userID:").concat(o)), Wo(e);});} }, { key: "getGroupList", value: function value(e) {var t = this,n = new oi();n.setMethod(Ei).setStart(), J.log("GroupController.getGroupList");var r = { introduction: "Introduction", notification: "Notification", createTime: "CreateTime", ownerID: "Owner_Account", lastInfoTime: "LastInfoTime", memberNum: "MemberNum", maxMemberNum: "MaxMemberNum", joinOption: "ApplyJoinOption", muteAllMembers: "ShutUpAllMember" },o = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime"];return e && e.groupProfileFilter && e.groupProfileFilter.forEach(function (e) {r[e] && o.push(r[e]);}), this.request({ name: "group", action: "list", param: { responseFilter: { groupBaseInfoFilter: o, selfInfoFilter: ["Role", "JoinTime", "MsgFlag"] } } }).then(function (e) {var r = e.data.groups;return n.setCode(0).setNetworkType(t.getNetworkType()).setText(r.length).setEnd(), J.log("GroupController.getGroupList ok. nums=".concat(r.length)), t._groupListTreeShaking(r), t.updateGroupMap(r), t.tempConversationList && (J.log("GroupController.getGroupList update last message with tempConversationList, nums=".concat(t.tempConversationList.length)), t._handleUpdateGroupLastMessage({ data: t.tempConversationList }), t.tempConversationList = null), t.emitGroupListUpdate(), new jo({ groupList: t.getLocalGroups() });}).catch(function (e) {return t.probeNetwork().then(function (t) {var r = v(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), J.error("GroupController.getGroupList error: ", e), Wo(e);});} }, { key: "getGroupMemberList", value: function value(e) {var t = this,n = e.groupID,r = e.offset,o = void 0 === r ? 0 : r,i = e.count,s = void 0 === i ? 15 : i;J.log("GroupController.getGroupMemberList groupID: ".concat(n, " offset: ").concat(o, " count: ").concat(s));var a = [];return this.request({ name: "group", action: "getGroupMemberList", param: { groupID: n, offset: o, limit: s > 100 ? 100 : s, memberInfoFilter: ["Role", "NameCard", "ShutUpUntil"] } }).then(function (e) {var r = e.data,o = r.members,i = r.memberNum;return re(o) && 0 !== o.length ? (t.hasLocalGroup(n) && (t.getLocalGroupProfile(n).memberNum = i), a = t._updateLocalGroupMemberMap(n, o), t.tim.getUserProfile({ userIDList: o.map(function (e) {return e.userID;}), tagList: [Ze.NICK, Ze.AVATAR] })) : Promise.resolve([]);}).then(function (e) {var r = e.data;if (!re(r) || 0 === r.length) return zo({ memberList: [] });var o = r.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});return t._updateLocalGroupMemberMap(n, o), J.log("GroupController.getGroupMemberList ok."), new jo({ memberList: a });}).catch(function (e) {return J.error("GroupController.getGroupMemberList error: ", e), Wo(e);});} }, { key: "getLocalGroups", value: function value() {return _(this.groupMap.values());} }, { key: "getLocalGroupProfile", value: function value(e) {return this.groupMap.get(e);} }, { key: "hasLocalGroup", value: function value(e) {return this.groupMap.has(e);} }, { key: "getLocalGroupMemberInfo", value: function value(e, t) {return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : null;} }, { key: "setLocalGroupMember", value: function value(e, t) {if (this.groupMemberListMap.has(e)) this.groupMemberListMap.get(e).set(t.userID, t);else {var n = new Map().set(t.userID, t);this.groupMemberListMap.set(e, n);}} }, { key: "hasLocalGroupMember", value: function value(e, t) {return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t);} }, { key: "hasLocalGroupMemberMap", value: function value(e) {return this.groupMemberListMap.has(e);} }, { key: "getGroupProfile", value: function value(e) {var t = this;J.log("GroupController.getGroupProfile. groupID:", e.groupID);var n = e.groupID,r = e.groupCustomFieldFilter,o = { groupIDList: [n], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: r } };return this.getGroupProfileAdvance(o).then(function (r) {var o,i = r.data,s = i.successGroupList,a = i.failureGroupList;return J.log("GroupController.getGroupProfile ok. groupID:", e.groupID), a.length > 0 ? Wo(a[0]) : (Te(s[0].type) && !t.hasLocalGroup(n) ? o = new du(s[0]) : (t.updateGroupMap(s), o = t.getLocalGroupProfile(n)), o && o.selfInfo && !o.selfInfo.nameCard ? t.updateSelfInfo(o).then(function (e) {return new jo({ group: e });}) : new jo({ group: o }));}).catch(function (t) {return J.error("GroupController.getGroupProfile error:".concat(t, ". groupID:").concat(e.groupID)), Wo(t);});} }, { key: "getGroupMemberProfile", value: function value(e) {var t = this;J.log("GroupController.getGroupMemberProfile groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList.join(","))), e.userIDList.length > 50 && (e.userIDList = e.userIDList.slice(0, 50));var n = e.groupID,r = e.userIDList;return this._getGroupMemberProfileAdvance(u({}, e, { userIDList: r })).then(function (e) {var r = e.data.members;return re(r) && 0 !== r.length ? (t._updateLocalGroupMemberMap(n, r), t.tim.getUserProfile({ userIDList: r.map(function (e) {return e.userID;}), tagList: [Ze.NICK, Ze.AVATAR] })) : zo([]);}).then(function (e) {var o = e.data.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});t._updateLocalGroupMemberMap(n, o);var i = r.filter(function (e) {return t.hasLocalGroupMember(n, e);}).map(function (e) {return t.getLocalGroupMemberInfo(n, e);});return new jo({ memberList: i });});} }, { key: "_getGroupMemberProfileAdvance", value: function value(e) {return this.request({ name: "group", action: "getGroupMemberProfile", param: u({}, e, { memberInfoFilter: e.memberInfoFilter ? e.memberInfoFilter : ["Role", "JoinTime", "NameCard", "ShutUpUntil"] }) });} }, { key: "updateSelfInfo", value: function value(e) {var t = e.groupID;J.log("GroupController.updateSelfInfo groupID:", t);var n = { groupID: t, userIDList: [this.tim.loginInfo.identifier] };return this.getGroupMemberProfile(n).then(function (n) {var r = n.data.memberList;return J.log("GroupController.updateSelfInfo ok. groupID:", t), e && 0 !== r.length && e.updateSelfInfo(r[0]), e;});} }, { key: "addGroupMember", value: function value(e) {var t = this.getLocalGroupProfile(e.groupID);if (Te(t.type)) {var n = new pt({ code: Yt, message: or });return Wo(n);}return e.userIDList = e.userIDList.map(function (e) {return { userID: e };}), J.log("GroupController.addGroupMember. groupID:", e.groupID), this.request({ name: "group", action: "addGroupMember", param: e }).then(function (n) {var r = n.data.members;J.log("GroupController.addGroupMember ok. groupID:", e.groupID);var o = r.filter(function (e) {return 1 === e.result;}).map(function (e) {return e.userID;}),i = r.filter(function (e) {return 0 === e.result;}).map(function (e) {return e.userID;}),s = r.filter(function (e) {return 2 === e.result;}).map(function (e) {return e.userID;});return 0 === o.length ? new jo({ successUserIDList: o, failureUserIDList: i, existedUserIDList: s }) : (t.memberNum += o.length, new jo({ successUserIDList: o, failureUserIDList: i, existedUserIDList: s, group: t }));}).catch(function (t) {return J.error("GroupController.addGroupMember error:".concat(t, ", groupID:").concat(e.groupID)), Wo(t);});} }, { key: "deleteGroupMember", value: function value(e) {var n = this;J.log("GroupController.deleteGroupMember groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList));var r = this.getLocalGroupProfile(e.groupID);return r.type === t.GRP_AVCHATROOM ? Wo(new pt({ code: Wt, message: sr })) : this.request({ name: "group", action: "deleteGroupMember", param: e }).then(function () {return J.log("GroupController.deleteGroupMember ok"), r.memberNum--, n.deleteLocalGroupMembers(e.groupID, e.userIDList), new jo({ group: r, userIDList: e.userIDList });}).catch(function (t) {return J.error("GroupController.deleteGroupMember error:".concat(t.code, ", groupID:").concat(e.groupID)), Wo(t);});} }, { key: "searchGroupByID", value: function value(e) {var t = { groupIDList: [e] };return J.log("GroupController.searchGroupByID. groupID:".concat(e)), this.request({ name: "group", action: "searchGroupByID", param: t }).then(function (t) {var n = t.data.groupProfile;if (n[0].errorCode !== Ne.SUCCESS) throw new pt({ code: n[0].errorCode, message: n[0].errorInfo });return J.log("GroupController.searchGroupByID ok. groupID:".concat(e)), new jo({ group: new du(n[0]) });}).catch(function (t) {return J.warn("GroupController.searchGroupByID error:".concat(fe(t), ", groupID:").concat(e)), Wo(t);});} }, { key: "applyJoinGroup", value: function value(e) {var t = this,n = new oi();return n.setMethod(Mi).setStart(), this.request({ name: "group", action: "applyJoinGroup", param: e }).then(function (r) {var o = r.data,i = o.joinedStatus,s = o.longPollingKey;switch (n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID, " joinedStatus=").concat(i)).setEnd(), J.log("GroupController.joinGroup ok. groupID:", e.groupID), i) {case Le.WAIT_APPROVAL:return new jo({ status: Le.WAIT_APPROVAL });case Le.SUCCESS:return t.getGroupProfile({ groupID: e.groupID }).then(function (n) {var r = n.data.group,o = { status: Le.SUCCESS, group: r };return oe(s) ? new jo(o) : (t.emitInnerEvent(No, e.groupID), t.AVChatRoomHandler.startRunLoop({ longPollingKey: s, group: r }));});default:var a = new pt({ code: $t, message: rr });return J.error("GroupController.joinGroup error:".concat(a, ". groupID:").concat(e.groupID)), Wo(a);}}).catch(function (r) {return n.setText("groupID=".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = v(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), J.error("GroupController.joinGroup error:".concat(r, ". groupID:").concat(e.groupID)), Wo(r);});} }, { key: "applyJoinAVChatRoom", value: function value(e) {return this.AVChatRoomHandler.applyJoinAVChatRoom(e);} }, { key: "handleGroupApplication", value: function value(e) {var t = this,n = e.message.payload,r = n.groupProfile.groupID,o = n.authentication,i = n.messageKey,s = n.operatorID;return J.log("GroupController.handleApplication. groupID:", r), this.request({ name: "group", action: "handleApplyJoinGroup", param: u({}, e, { applicant: s, groupID: r, authentication: o, messageKey: i }) }).then(function () {return J.log("GroupController.handleApplication ok. groupID:", r), t.deleteGroupSystemNotice({ messageList: [e.message] }), new jo({ group: t.getLocalGroupProfile(r) });}).catch(function (e) {return J.error("GroupController.handleApplication error.  error:".concat(e, ". groupID:").concat(r)), Wo(e);});} }, { key: "deleteGroupSystemNotice", value: function value(e) {var n = this;return re(e.messageList) && 0 !== e.messageList.length ? (J.log("GroupController.deleteGroupSystemNotice " + e.messageList.map(function (e) {return e.ID;})), this.request({ name: "group", action: "deleteGroupSystemNotice", param: { messageListToDelete: e.messageList.map(function (e) {return { from: t.CONV_SYSTEM, messageSeq: e.clientSequence, messageRandom: e.random };}) } }).then(function () {return J.log("GroupController.deleteGroupSystemNotice ok"), e.messageList.forEach(function (e) {n.tim.messageController.deleteLocalMessage(e);}), new jo();}).catch(function (e) {return J.error("GroupController.deleteGroupSystemNotice error:", e), Wo(e);})) : zo();} }, { key: "getGroupProfileAdvance", value: function value(e) {return re(e.groupIDList) && e.groupIDList.length > 50 && (J.warn("GroupController.getGroupProfileAdvance 获取群资料的数量不能超过50个"), e.groupIDList.length = 50), J.log("GroupController.getGroupProfileAdvance. groupIDList:", e.groupIDList), this.request({ name: "group", action: "query", param: e }).then(function (e) {J.log("GroupController.getGroupProfileAdvance ok.");var t = e.data.groups,n = t.filter(function (e) {return oe(e.errorCode) || e.errorCode === Ne.SUCCESS;}),r = t.filter(function (e) {return e.errorCode && e.errorCode !== Ne.SUCCESS;}).map(function (e) {return new pt({ code: Number("500".concat(e.errorCode)), message: e.errorInfo, data: { groupID: e.groupID } });});return new jo({ successGroupList: n, failureGroupList: r });}).catch(function (t) {return J.error("GroupController.getGroupProfileAdvance error:".concat(t, ". groupID:").concat(e.groupID)), Wo(t);});} }, { key: "_deleteLocalGroup", value: function value(e) {return this.groupMap.delete(e), this.groupMemberListMap.delete(e), this._setStorageGroupList(), this.groupMap.has(e) && this.groupMemberListMap.has(e);} }, { key: "_initGroupList", value: function value() {var e = this,t = new oi();t.setMethod(ki).setStart(), J.time(ni), J.log("GroupController._initGroupList");var n = this._getStorageGroupList();re(n) && n.length > 0 ? (n.forEach(function (t) {e.groupMap.set(t.groupID, new du(t));}), this.emitGroupListUpdate(!0, !1), t.setCode(0).setNetworkType(this.getNetworkType()).setText(this.groupMap.size).setEnd()) : t.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd(), this.triggerReady(), J.log("GroupController._initGroupList ok. initCost=".concat(J.timeEnd(ni), "ms")), this.getGroupList();} }, { key: "_initListeners", value: function value() {var e = this.tim.innerEmitter;e.once(Yr, this._initGroupList, this), e.on(wo, this._handleUpdateGroupLastMessage, this), e.on(to, this._handleReceivedGroupMessage, this), e.on(Lo, this._handleProfileUpdated, this);} }, { key: "emitGroupListUpdate", value: function value() {var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],r = this.getLocalGroups();n && this.emitInnerEvent(So, r), t && this.emitOuterEvent(e.GROUP_LIST_UPDATED, r);} }, { key: "_handleReceivedGroupMessage", value: function value(e) {var n = this,r = e.data.eventDataList;Array.isArray(r) && r.forEach(function (e) {var r = e.conversationID.replace(t.CONV_GROUP, "");n.groupMap.has(r) && (n.groupMap.get(r).nextMessageSeq = e.lastMessage.sequence + 1);});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = e.data;this.groupNoticeHandler._onReceivedGroupNotice(t);} }, { key: "_handleUpdateGroupLastMessage", value: function value(e) {var n = e.data;if (J.log("GroupController._handleUpdateGroupLastMessage convNums=".concat(n.length, " groupNums=").concat(this.groupMap.size)), 0 !== this.groupMap.size) {for (var r, o, i, s = !1, a = 0, u = n.length; a < u; a++) {(r = n[a]).conversationID && r.type !== t.CONV_GROUP && (o = r.conversationID.split(/^GROUP/)[1], (i = this.getLocalGroupProfile(o)) && (i.lastMessage = r.lastMessage, s = !0));}s && (this.groupMap = this._sortLocalGroupList(this.groupMap), this.emitGroupListUpdate(!0, !1));} else this.tempConversationList = n;} }, { key: "_sortLocalGroupList", value: function value(e) {var t = _(e).filter(function (e) {var t = v(e, 2);t[0];return !we(t[1].lastMessage);});return t.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}), new Map([].concat(_(t), _(e)));} }, { key: "_getStorageGroupList", value: function value() {return this.tim.storage.getItem("groupMap");} }, { key: "_setStorageGroupList", value: function value() {var e = this.getLocalGroups().filter(function (e) {var t = e.type;return !Te(t);}).slice(0, 20).map(function (e) {return { groupID: e.groupID, name: e.name, avatar: e.avatar, type: e.type };});this.tim.storage.setItem("groupMap", e);} }, { key: "updateGroupMap", value: function value(e) {var t = this;e.forEach(function (e) {t.groupMap.has(e.groupID) ? t.groupMap.get(e.groupID).updateGroup(e) : t.groupMap.set(e.groupID, new du(e));}), this._setStorageGroupList();} }, { key: "_updateLocalGroupMemberMap", value: function value(e, t) {var n = this;return re(t) && 0 !== t.length ? t.map(function (t) {return n.hasLocalGroupMember(e, t.userID) ? n.getLocalGroupMemberInfo(e, t.userID).updateMember(t) : n.setLocalGroupMember(e, new Tu(t)), n.getLocalGroupMemberInfo(e, t.userID);}) : [];} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {var n = this.groupMemberListMap.get(e);n && t.forEach(function (e) {n.delete(e);});} }, { key: "_modifyGroupMemberInfo", value: function value(e) {var t = this,n = e.groupID,r = e.userID;return this.request({ name: "group", action: "modifyGroupMemberInfo", param: e }).then(function () {if (t.hasLocalGroupMember(n, r)) {var o = t.getLocalGroupMemberInfo(n, r);return oe(e.muteTime) || o.updateMuteUntil(e.muteTime), oe(e.role) || o.updateRole(e.role), oe(e.nameCard) || o.updateNameCard(e.nameCard), oe(e.memberCustomField) || o.updateMemberCustomField(e.memberCustomField), o;}return t.getGroupMemberProfile({ groupID: n, userIDList: [r] }).then(function (e) {return v(e.data.memberList, 1)[0];});});} }, { key: "_groupListTreeShaking", value: function value(e) {for (var t = new Map(_(this.groupMap)), n = 0, r = e.length; n < r; n++) {t.delete(e[n].groupID);}this.AVChatRoomHandler.hasJoinedAVChatRoom() && t.delete(this.AVChatRoomHandler.group.groupID);for (var o = _(t.keys()), i = 0, s = o.length; i < s; i++) {this.groupMap.delete(o[i]);}} }, { key: "_handleProfileUpdated", value: function value(e) {for (var t = this, n = e.data, r = function r(e) {var r = n[e];t.groupMemberListMap.forEach(function (e) {e.has(r.userID) && e.get(r.userID).updateMember({ nick: r.nick, avatar: r.avatar });});}, o = 0; o < n.length; o++) {r(o);}} }, { key: "getJoinedAVChatRoom", value: function value() {return this.AVChatRoomHandler.getJoinedAVChatRoom();} }, { key: "deleteLocalGroupAndConversation", value: function value(e) {this._deleteLocalGroup(e), this.tim.conversationController.deleteLocalConversation("GROUP".concat(e)), this.emitGroupListUpdate(!0, !1);} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "getGroupLastSequence", value: function value(e) {var t = this,n = new oi();n.setMethod(Ai).setStart();var r = 0;if (this.hasLocalGroup(e)) {var o = this.getLocalGroupProfile(e);if (o.lastMessage.lastSequence > 0) return r = o.lastMessage.lastSequence, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);if (o.nextMessageSeq > 1) return r = o.nextMessageSeq - 1, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)).setEnd(), Promise.resolve(r);}var i = "GROUP".concat(e),s = this.tim.conversationController.getLocalConversation(i);if (s && s.lastMessage.lastSequence) return r = s.lastMessage.lastSequence, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);var a = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };return this.getGroupProfileAdvance(a).then(function (o) {var i = o.data.successGroupList;return we(i) ? J.log("GroupController.getGroupLastSequence successGroupList is empty. groupID=".concat(e)) : (r = i[0].nextMessageSeq - 1, J.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e))), n.setCode(0).setNetworkType(t.getNetworkType()).setText("got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e)).setEnd(), r;}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = v(t, 2),i = o[0],s = o[1];n.setError(r, i, s).setText("get lastSequence failed from getGroupProfileAdvance. groupID=".concat(e)).setEnd();}), J.warn("GroupController.getGroupLastSequence failed. ".concat(r)), Wo(r);});} }, { key: "reset", value: function value() {this.groupMap.clear(), this.groupMemberListMap.clear(), this.resetReady(), this.groupNoticeHandler.reset(), this.AVChatRoomHandler.reset(), this.tim.innerEmitter.once(Yr, this._initGroupList, this);} }]), s;}(Bo),Ou = function (n) {l(s, n);var o = y(s);function s(e) {var n;r(this, s), (n = o.call(this, e)).REALTIME_MESSAGE_TIMEOUT = 11e4, n.LONGPOLLING_ID_TIMEOUT = 3e5, n._currentState = t.NET_STATE_CONNECTED, n._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };var i = n.tim.innerEmitter;return i.on(oo, n._onGetLongPollIDFailed, g(n)), i.on(so, n._onOpenIMResponseOK, g(n)), i.on(io, n._onOpenIMRequestFailed, g(n)), i.on(Io, n._onAVChatroomResponseOK, g(n)), i.on(Mo, n._onAVChatroomRequestFailed, g(n)), n;}return i(s, [{ key: "_onGetLongPollIDFailed", value: function value() {this._currentState !== t.NET_STATE_DISCONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED);} }, { key: "_onOpenIMResponseOK", value: function value() {this._onResponseOK("OPENIM");} }, { key: "_onOpenIMRequestFailed", value: function value() {this._onRequestFailed("OPENIM");} }, { key: "_onAVChatroomResponseOK", value: function value() {this.isLoggedIn() || this._onResponseOK("AVCHATROOM");} }, { key: "_onAVChatroomRequestFailed", value: function value() {this.isLoggedIn() || this._onRequestFailed("AVCHATROOM");} }, { key: "_onResponseOK", value: function value(e) {var n = this._status[e],r = Date.now();if (0 !== n.lastResponseReceivedTime) {var o = r - n.lastResponseReceivedTime;if (J.debug("StatusController._onResponseOK key=".concat(e, " currentState=").concat(this._currentState, " interval=").concat(o, " failedCount=").concat(n.failedCount, " jitterCount=").concat(n.jitterCount)), n.failedCount > 0 && (n.failedCount = 0, n.jitterCount += 1, this._currentState !== t.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_CONNECTED)), o <= this.REALTIME_MESSAGE_TIMEOUT) {if (n.jitterCount >= 3) {var i = new oi();i.setMethod(Pi).setStart(), i.setCode(0).setText("".concat(e, "-").concat(o, "-").concat(n.jitterCount)).setNetworkType(this.getNetworkType()).setEnd(), n.jitterCount = 0;}} else if (o >= this.REALTIME_MESSAGE_TIMEOUT && o < this.LONGPOLLING_ID_TIMEOUT) {var s = new oi();s.setMethod(Gi).setStart(), s.setCode(0).setText("".concat(e, "-").concat(o)).setNetworkType(this.getNetworkType()).setEnd(), J.warn("StatusController._onResponseOK, fast start. key=".concat(e, " interval=").concat(o, " ms")), this.emitInnerEvent(ao);} else if (o >= this.LONGPOLLING_ID_TIMEOUT) {var a = new oi();a.setMethod(Ui).setStart(), a.setCode(0).setText("".concat(e, "-").concat(o)).setNetworkType(this.getNetworkType()).setEnd(), J.warn("StatusController._onResponseOK, slow start. key=".concat(e, " interval=").concat(o, " ms")), this.emitInnerEvent(uo);}n.lastResponseReceivedTime = r;} else n.lastResponseReceivedTime = r;} }, { key: "_onRequestFailed", value: function value(e) {var n = this,r = this._status[e];Date.now() - r.lastResponseReceivedTime >= this.LONGPOLLING_ID_TIMEOUT ? this._currentState !== t.NET_STATE_DISCONNECTED && (J.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable more than 5min. key=".concat(e, " networkType=").concat(this.getNetworkType())), this._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED)) : (r.failedCount += 1, r.failedCount > 5 ? this.probeNetwork().then(function (o) {var i = v(o, 2),s = i[0],a = i[1];s ? (n._currentState !== t.NET_STATE_CONNECTING && n._emitNetStateChangeEvent(t.NET_STATE_CONNECTING), J.warn("StatusController._onRequestFailed, connecting, network jitter. key=".concat(e, " networkType=").concat(a))) : (n._currentState !== t.NET_STATE_DISCONNECTED && n._emitNetStateChangeEvent(t.NET_STATE_DISCONNECTED), J.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable. key=".concat(e, " networkType=").concat(a))), r.failedCount = 0, r.jitterCount = 0;}) : this._currentState === t.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(t.NET_STATE_CONNECTING));} }, { key: "_emitNetStateChangeEvent", value: function value(t) {J.log("StatusController._emitNetStateChangeEvent net state changed from ".concat(this._currentState, " to ").concat(t)), this._currentState = t, this.emitOuterEvent(e.NET_STATE_CHANGE, { state: t });} }, { key: "reset", value: function value() {J.log("StatusController.reset"), this._currentState = t.NET_STATE_CONNECTED, this._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };} }]), s;}(Bo);function Lu() {return null;}var Nu = function () {function e(t) {r(this, e), this.tim = t, this.isWX = O, this.storageQueue = new Map(), this.checkTimes = 0, this.checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3), this._errorTolerantHandle();}return i(e, [{ key: "_errorTolerantHandle", value: function value() {!this.isWX && oe(window.localStorage) && (this.getItem = Lu, this.setItem = Lu, this.removeItem = Lu, this.clear = Lu);} }, { key: "_onCheckTimer", value: function value() {if (this.checkTimes++, this.checkTimes % 20 == 0) {if (0 === this.storageQueue.size) return;this._doFlush();}} }, { key: "_doFlush", value: function value() {try {var e,t = I(this.storageQueue);try {for (t.s(); !(e = t.n()).done;) {var n = v(e.value, 2),r = n[0],o = n[1];this.isWX ? wx.setStorageSync(this._getKey(r), o) : localStorage.setItem(this._getKey(r), JSON.stringify(o));}} catch (i) {t.e(i);} finally {t.f();}this.storageQueue.clear();} catch (s) {J.warn("Storage._doFlush error", s);}} }, { key: "_getPrefix", value: function value() {var e = this.tim.loginInfo,t = e.SDKAppID,n = e.identifier;return "TIM_".concat(t, "_").concat(n, "_");} }, { key: "getItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;return this.isWX ? wx.getStorageSync(n) : JSON.parse(localStorage.getItem(n));} catch (r) {J.warn("Storage.getItem error:", r);}} }, { key: "setItem", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (n) {var o = r ? this._getKey(e) : e;this.isWX ? wx.setStorageSync(o, t) : localStorage.setItem(o, JSON.stringify(t));} else this.storageQueue.set(e, t);} }, { key: "clear", value: function value() {try {this.isWX ? wx.clearStorageSync() : localStorage.clear();} catch (e) {J.warn("Storage.clear error:", e);}} }, { key: "removeItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;this.isWX ? wx.removeStorageSync(n) : localStorage.removeItem(n);} catch (r) {J.warn("Storage.removeItem error:", r);}} }, { key: "getSize", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";try {var r = { size: 0, limitSize: 5242880, unit: n };if (Object.defineProperty(r, "leftSize", { enumerable: !0, get: function get() {return r.limitSize - r.size;} }), this.isWX && (r.limitSize = 1024 * wx.getStorageInfoSync().limitSize), e) r.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;else if (this.isWX) {var o = wx.getStorageInfoSync(),i = o.keys;i.forEach(function (e) {r.size += JSON.stringify(wx.getStorageSync(e)).length + t._getKey(e).length;});} else for (var s in localStorage) {localStorage.hasOwnProperty(s) && (r.size += localStorage.getItem(s).length + s.length);}return this._convertUnit(r);} catch (a) {J.warn("Storage.getSize error:", a);}} }, { key: "_convertUnit", value: function value(e) {var t = {},n = e.unit;for (var r in t.unit = n, e) {"number" == typeof e[r] && ("kb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024) : "mb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024 / 1024) : t[r] = e[r]);}return t;} }, { key: "_getKey", value: function value(e) {return "".concat(this._getPrefix()).concat(e);} }, { key: "reset", value: function value() {this._doFlush(), this.checkTimes = 0;} }]), e;}(),bu = T(function (e) {var t = Object.prototype.hasOwnProperty,n = "~";function r() {}function o(e, t, n) {this.fn = e, this.context = t, this.once = n || !1;}function i(e, t, r, i, s) {if ("function" != typeof r) throw new TypeError("The listener must be a function");var a = new o(r, i || e, s),u = n ? n + t : t;return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], a] : e._events[u].push(a) : (e._events[u] = a, e._eventsCount++), e;}function s(e, t) {0 == --e._eventsCount ? e._events = new r() : delete e._events[t];}function a() {this._events = new r(), this._eventsCount = 0;}Object.create && (r.prototype = Object.create(null), new r().__proto__ || (n = !1)), a.prototype.eventNames = function () {var e,r,o = [];if (0 === this._eventsCount) return o;for (r in e = this._events) {t.call(e, r) && o.push(n ? r.slice(1) : r);}return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o;}, a.prototype.listeners = function (e) {var t = n ? n + e : e,r = this._events[t];if (!r) return [];if (r.fn) return [r.fn];for (var o = 0, i = r.length, s = new Array(i); o < i; o++) {s[o] = r[o].fn;}return s;}, a.prototype.listenerCount = function (e) {var t = n ? n + e : e,r = this._events[t];return r ? r.fn ? 1 : r.length : 0;}, a.prototype.emit = function (e, t, r, o, i, s) {var a = n ? n + e : e;if (!this._events[a]) return !1;var u,l,c = this._events[a],p = arguments.length;if (c.fn) {switch (c.once && this.removeListener(e, c.fn, void 0, !0), p) {case 1:return c.fn.call(c.context), !0;case 2:return c.fn.call(c.context, t), !0;case 3:return c.fn.call(c.context, t, r), !0;case 4:return c.fn.call(c.context, t, r, o), !0;case 5:return c.fn.call(c.context, t, r, o, i), !0;case 6:return c.fn.call(c.context, t, r, o, i, s), !0;}for (l = 1, u = new Array(p - 1); l < p; l++) {u[l - 1] = arguments[l];}c.fn.apply(c.context, u);} else {var h,f = c.length;for (l = 0; l < f; l++) {switch (c[l].once && this.removeListener(e, c[l].fn, void 0, !0), p) {case 1:c[l].fn.call(c[l].context);break;case 2:c[l].fn.call(c[l].context, t);break;case 3:c[l].fn.call(c[l].context, t, r);break;case 4:c[l].fn.call(c[l].context, t, r, o);break;default:if (!u) for (h = 1, u = new Array(p - 1); h < p; h++) {u[h - 1] = arguments[h];}c[l].fn.apply(c[l].context, u);}}}return !0;}, a.prototype.on = function (e, t, n) {return i(this, e, t, n, !1);}, a.prototype.once = function (e, t, n) {return i(this, e, t, n, !0);}, a.prototype.removeListener = function (e, t, r, o) {var i = n ? n + e : e;if (!this._events[i]) return this;if (!t) return s(this, i), this;var a = this._events[i];if (a.fn) a.fn !== t || o && !a.once || r && a.context !== r || s(this, i);else {for (var u = 0, l = [], c = a.length; u < c; u++) {(a[u].fn !== t || o && !a[u].once || r && a[u].context !== r) && l.push(a[u]);}l.length ? this._events[i] = 1 === l.length ? l[0] : l : s(this, i);}return this;}, a.prototype.removeAllListeners = function (e) {var t;return e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new r(), this._eventsCount = 0), this;}, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a;}),Pu = function Pu(e) {var t, n, r, o, i;return we(e.context) ? (t = "", n = 0, r = 0, o = 0, i = 1) : (t = e.context.a2Key, n = e.context.tinyID, r = e.context.SDKAppID, o = e.context.contentType, i = e.context.apn), { platform: Fr, websdkappid: xr, v: qr, a2: t, tinyid: n, sdkappid: r, contentType: o, apn: i, reqtime: function reqtime() {return +new Date();} };},Gu = function () {function e(t) {r(this, e), this.tim = t, this.tim.innerEmitter.on(jr, this._update, this), this.tim.innerEmitter.on($r, this._update, this), this.tim.innerEmitter.on(zr, this._updateSpecifiedConfig, this), this._initConfig();}return i(e, [{ key: "_update", value: function value(e) {this._initConfig();} }, { key: "_updateSpecifiedConfig", value: function value(e) {var t = this;e.data.forEach(function (e) {t._set(e);});} }, { key: "get", value: function value(e) {var t = e.name,r = e.action,o = e.param,i = e.tjgID;if (oe(this.config[t]) || oe(this.config[t][r])) throw new pt({ code: hn, message: "".concat(Cr, ": PackageConfig.").concat(t) });var s = function e(t) {if (0 === Object.getOwnPropertyNames(t).length) return Object.create(null);var r = Array.isArray(t) ? [] : Object.create(null),o = "";for (var i in t) {null !== t[i] ? void 0 !== t[i] ? (o = n(t[i]), ["string", "number", "function", "boolean"].indexOf(o) >= 0 ? r[i] = t[i] : r[i] = e(t[i])) : r[i] = void 0 : r[i] = null;}return r;}(this.config[t][r]);return s.requestData = this._initRequestData(o, s), s.encode = this._initEncoder(s), s.decode = this._initDecoder(s), i && (s.queryString.tjg_id = i), s;} }, { key: "_set", value: function value(e) {var t = e.key,r = e.value;if (!1 != !!t) {var o = t.split(".");if (!(o.length <= 0)) {!function e(t, r, o, i) {var s = r[o];"object" === n(t[s]) ? e(t[s], r, o + 1, i) : t[s] = i;}(this.config, o, 0, r);}}} }, { key: "_initConfig", value: function value() {var e;this.config = {}, this.config.accessLayer = (e = this.tim, { create: null, query: { serverName: Vr.NAME.WEB_IM, cmd: Vr.CMD.ACCESS_LAYER, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { platform: Fr, identifier: e.context.identifier, usersig: e.context.userSig, contentType: e.context.contentType, apn: null !== e.context ? e.context.apn : 1, websdkappid: xr, v: qr }, requestData: {} }, update: null, delete: null }), this.config.login = function (e) {return { create: null, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.LOGIN, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { websdkappid: xr, v: qr, platform: Fr, identifier: e.loginInfo.identifier, usersig: e.loginInfo.userSig, sdkappid: e.loginInfo.SDKAppID, accounttype: e.loginInfo.accountType, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: { state: "Online" }, keyMaps: { request: { tinyID: "tinyId" }, response: { TinyId: "tinyID" } } }, update: null, delete: null };}(this.tim), this.config.logout = function (e) {return { create: null, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.LOGOUT_ALL, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { websdkappid: xr, v: qr, platform: Fr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : "", sdkappid: null !== e.loginInfo ? e.loginInfo.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : "", reqtime: +new Date() / 1e3 }, requestData: {} }, update: null, delete: null };}(this.tim), this.config.longPollLogout = function (e) {return { create: null, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.LOGOUT_LONG_POLL, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { websdkappid: xr, v: qr, platform: Fr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} }, requestData: { longPollID: "" }, keyMaps: { request: { longPollID: "LongPollingId" } } }, update: null, delete: null };}(this.tim), this.config.profile = function (e) {var t = Pu(e),n = Vr.NAME.PROFILE,r = Vr.CHANNEL.XHR,o = Br;return { query: { serverName: n, cmd: Vr.CMD.PORTRAIT_GET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", userItem: [] }, keyMaps: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } }, update: { serverName: n, cmd: Vr.CMD.PORTRAIT_SET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", profileItem: [{ tag: Ze.NICK, value: "" }, { tag: Ze.GENDER, value: "" }, { tag: Ze.ALLOWTYPE, value: "" }, { tag: Ze.AVATAR, value: "" }] } } };}(this.tim), this.config.group = function (e) {var n = { websdkappid: xr, v: qr, platform: Fr, a2: null !== e.context && e.context.a2Key ? e.context.a2Key : void 0, tinyid: null !== e.context && e.context.tinyID ? e.context.tinyID : void 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 },r = { request: { ownerID: "Owner_Account", userID: "Member_Account", newOwnerID: "NewOwner_Account", maxMemberNum: "MaxMemberCount", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember", messageRemindType: "MsgFlag", userIDList: "MemberList", groupIDList: "GroupIdList", applyMessage: "ApplyMsg", muteTime: "ShutUpTime", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } };return { create: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.CREATE_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { type: t.GRP_PRIVATE, name: void 0, groupID: void 0, ownerID: e.loginInfo.identifier, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0 }, keyMaps: r }, list: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_JOINED_GROUPS, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { userID: e.loginInfo.identifier, limit: void 0, offset: void 0, groupType: void 0, responseFilter: void 0 }, keyMaps: r }, query: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_GROUP_INFO, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupIDList: void 0, responseFilter: void 0 }, keyMaps: r }, getGroupMemberProfile: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_GROUP_MEMBER_INFO, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMaps: { request: u({}, r.request, { userIDList: "Member_List_Account" }), response: r.response } }, getGroupMemberList: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_GROUP_MEMBER_LIST, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, limit: 0, offset: 0, memberRoleFilter: void 0, memberInfoFilter: void 0 }, keyMaps: r }, quitGroup: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.QUIT_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0 } }, changeGroupOwner: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.CHANGE_GROUP_OWNER, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, newOwnerID: void 0 }, keyMaps: r }, destroyGroup: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.DESTROY_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0 } }, updateGroupProfile: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.MODIFY_GROUP_INFO, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0 }, keyMaps: { request: u({}, r.request, { groupCustomField: "AppDefinedData" }), response: r.response } }, modifyGroupMemberInfo: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.MODIFY_GROUP_MEMBER_INFO, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMaps: r }, addGroupMember: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.ADD_GROUP_MEMBER, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMaps: r }, deleteGroupMember: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.DELETE_GROUP_MEMBER, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMaps: { request: { userIDList: "MemberToDel_Account" } } }, searchGroupByID: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.SEARCH_GROUP_BY_ID, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"] } }, keyMaps: { request: { groupIDList: "GroupIdList" } } }, applyJoinGroup: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.APPLY_JOIN_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: r }, applyJoinAVChatRoom: { serverName: Vr.NAME.BIG_GROUP_NO_AUTH, cmd: Vr.CMD.APPLY_JOIN_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: { websdkappid: xr, v: qr, platform: Fr, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 }, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: r }, handleApplyJoinGroup: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.HANDLE_APPLY_JOIN_GROUP, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMaps: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" }, response: { MsgKey: "messageKey" } } }, deleteGroupSystemNotice: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.DELETE_GROUP_SYSTEM_MESSAGE, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { messageListToDelete: void 0 }, keyMaps: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } }, getGroupPendency: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_GROUP_PENDENCY, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: n, requestData: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMaps: { request: { handleAccount: "Handle_Account" } } } };}(this.tim), this.config.longPollID = function (e) {return { create: {}, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.GET_LONG_POLL_ID, channel: Vr.CHANNEL.XHR, protocol: Br, queryString: { websdkappid: xr, v: qr, platform: Fr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: {}, keyMaps: { response: { LongPollingId: "longPollingID" } } }, update: {}, delete: {} };}(this.tim), this.config.longPoll = function (e) {var t = { websdkappid: xr, v: qr, platform: Fr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.loginInfo.accountType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: Math.ceil(+new Date() / 1e3) };return { create: {}, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.LONG_POLL, channel: Vr.CHANNEL.AUTO, protocol: Br, queryString: t, requestData: { timeout: null, cookie: { notifySeq: 0, noticeSeq: 0, longPollingID: 0 } }, keyMaps: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension" } } }, update: {}, delete: {} };}(this.tim), this.config.applyC2C = function (e) {var t = Pu(e),n = Vr.NAME.FRIEND,r = Vr.CHANNEL.XHR,o = Br;return { create: { serverName: n, cmd: Vr.CMD.FRIEND_ADD, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", addFriendItem: [] } }, get: { serverName: n, cmd: Vr.CMD.GET_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", pendencyType: "Pendency_Type_ComeIn" } }, update: { serverName: n, cmd: Vr.CMD.RESPONSE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", responseFriendItem: [] } }, delete: { serverName: n, cmd: Vr.CMD.DELETE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", toAccount: [], pendencyType: "Pendency_Type_ComeIn" } } };}(this.tim), this.config.friend = function (e) {var t = Pu(e),n = Vr.NAME.FRIEND,r = Vr.CHANNEL.XHR,o = Br;return { get: { serverName: n, cmd: Vr.CMD.FRIEND_GET_ALL, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", timeStamp: 0, tagList: [Ze.NICK, "Tag_SNS_IM_Remark", Ze.AVATAR] }, keyMaps: { request: {}, response: {} } }, delete: { serverName: n, cmd: Vr.CMD.FRIEND_DELETE, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [], deleteType: "Delete_Type_Single" } } };}(this.tim), this.config.blacklist = function (e) {var t = Pu(e);return { create: { serverName: Vr.NAME.FRIEND, cmd: Vr.CMD.ADD_BLACKLIST, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, get: { serverName: Vr.NAME.FRIEND, cmd: Vr.CMD.GET_BLACKLIST, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 } }, delete: { serverName: Vr.NAME.FRIEND, cmd: Vr.CMD.DELETE_BLACKLIST, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, update: {} };}(this.tim), this.config.c2cMessage = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag" }, response: { MsgContent: "content", MsgTime: "time", Data: "data", Desc: "description", Ext: "extension", MsgKey: "messageKey", MsgType: "type", MsgBody: "elements", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.SEND_MESSAGE, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0, msgBody: [] }, keyMaps: n }, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.GET_C2C_ROAM_MESSAGES, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMsg: 1 }, keyMaps: n }, update: null, delete: null };}(this.tim), this.config.c2cMessageWillBeRevoked = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.REVOKE_C2C_MESSAGE, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0 } }, keyMaps: { request: { msgInfo: "MsgInfo", fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody" } } } };}(this.tim), this.config.groupMessage = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsPlaceMsg: "isPlaceMessage", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.SEND_GROUP_MESSAGE, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { groupID: "", fromAccount: e.loginInfo.identifier, random: 0, clientSequence: 0, priority: "", msgBody: [] }, keyMaps: n }, query: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.GET_GROUP_ROAM_MESSAGES, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "" }, keyMaps: n }, update: null, delete: null };}(this.tim), this.config.groupMessageWillBeRevoked = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.REVOKE_GROUP_MESSAGE, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { to: "", msgSeqList: [] }, keyMaps: { request: { to: "GroupId", msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } } };}(this.tim), this.config.conversation = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1 };return { query: { serverName: Vr.NAME.RECENT_CONTACT, cmd: Vr.CMD.GET_CONVERSATION_LIST, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, count: 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq" } } }, pagingQuery: { serverName: Vr.NAME.RECENT_CONTACT, cmd: Vr.CMD.PAGING_GET_CONVERSATION_LIST, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: void 0, timeStamp: void 0, orderType: void 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq" } } }, delete: { serverName: Vr.NAME.RECENT_CONTACT, cmd: Vr.CMD.DELETE_CONVERSATION, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: void 0, type: 1, toGroupID: void 0 }, keyMaps: { request: { toGroupID: "ToGroupid" } } }, setC2CMessageRead: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.SET_C2C_MESSAGE_READ, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { C2CMsgReaded: void 0 }, keyMaps: { request: { lastMessageTime: "LastedMsgTime" } } }, setGroupMessageRead: { serverName: Vr.NAME.GROUP, cmd: Vr.CMD.SET_GROUP_MESSAGE_READ, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { groupID: void 0, messageReadSeq: void 0 }, keyMaps: { request: { messageReadSeq: "MsgReadedSeq" } } } };}(this.tim), this.config.syncMessage = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return [Math.ceil(+new Date()), Math.random()].join("");} };return { create: null, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.GET_MESSAGES, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { cookie: "", syncFlag: 0, needAbstract: 1 }, keyMaps: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "groupID", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList" } } }, update: null, delete: null };}(this.tim), this.config.AVChatRoom = function (e) {return { startLongPoll: { serverName: Vr.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, cmd: Vr.CMD.AVCHATROOM_LONG_POLL, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { websdkappid: xr, v: qr, platform: Fr, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMaps: { request: { USP: "USP" }, response: { ToGroupId: "groupID", MsgPriority: "priority" } } } };}(this.tim), this.config.cosUpload = function (e) {var t = { platform: Fr, websdkappid: xr, v: qr, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} };return { create: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.FILE_UPLOAD, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { appVersion: "2.1", fromAccount: "", toAccount: "", sequence: 0, time: function time() {return Math.ceil(Date.now() / 1e3);}, random: function random() {return me();}, fileStrMd5: "", fileSize: "", serverVer: 1, authKey: "", busiId: 1, pkgFlag: 1, sliceOffset: 0, sliceSize: 0, sliceData: "", contentType: "application/x-www-form-urlencoded" }, keyMaps: { request: {}, response: {} } }, update: null, delete: null };}(this.tim), this.config.cosSig = function (e) {var t = { sdkappid: function sdkappid() {return e.loginInfo.SDKAppID;}, identifier: function identifier() {return e.loginInfo.identifier;}, userSig: function userSig() {return e.context.userSig;} };return { create: null, query: { serverName: Vr.NAME.IM_COS_SIGN, cmd: Vr.CMD.COS_SIGN, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: t, requestData: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMaps: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } }, update: null, delete: null };}(this.tim), this.config.bigDataHallwayAuthKey = function (e) {return { create: null, query: { serverName: Vr.NAME.OPEN_IM, cmd: Vr.CMD.BIG_DATA_HALLWAY_AUTH_KEY, channel: Vr.CHANNEL.XHR, protocol: Br, method: "POST", queryString: { websdkappid: xr, v: qr, platform: Fr, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: {} } };}(this.tim), this.config.ssoEventStat = function (e) {var t = { sdkappid: e.loginInfo.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) };return { create: { serverName: Vr.NAME.IM_OPEN_STAT, cmd: Vr.CMD.TIM_WEB_REPORT, channel: Vr.CHANNEL.AUTO, protocol: Br, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", platform: "platform", method: "method", time: "time", start: "start", end: "end", cost: "cost", status: "status", codeint: "codeint", message: "message", pointer: "pointer", text: "text", msgType: "msgtype", networkType: "networktype", startts: "startts", endts: "endts", timespan: "timespan" } } }, query: {}, update: {}, delete: {} };}(this.tim), this.config.ssoSumStat = function (e) {var t = null;null !== e.context && (t = { sdkappid: e.context.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) });return { create: { serverName: Vr.NAME.IM_OPEN_STAT, cmd: Vr.CMD.TIM_WEB_REPORT, channel: Vr.CHANNEL.AUTO, protocol: Br, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", item: "item", lpID: "lpid", platform: "platform", networkType: "networktype", total: "total", successRate: "successrate", avg: "avg", timespan: "timespan", time: "time" } } }, query: {}, update: {}, delete: {} };}(this.tim);} }, { key: "_initRequestData", value: function value(e, t) {if (void 0 === e) return qo(t.requestData, this._getRequestMap(t), this.tim);var n = t.requestData,r = Object.create(null);for (var o in n) {if (Object.prototype.hasOwnProperty.call(n, o)) {if (r[o] = "function" == typeof n[o] ? n[o]() : n[o], void 0 === e[o]) continue;r[o] = e[o];}}return r = qo(r, this._getRequestMap(t), this.tim);} }, { key: "_getRequestMap", value: function value(e) {if (e.keyMaps && e.keyMaps.request && Object.keys(e.keyMaps.request).length > 0) return e.keyMaps.request;} }, { key: "_initEncoder", value: function value(e) {switch (e.protocol) {case Br:return function (e) {if ("string" === n(e)) try {return JSON.parse(e);} catch (t) {return e;}return e;};case Hr:return function (e) {return e;};default:return function (e) {return J.warn("PackageConfig._initEncoder(), unknow response type, data: ", JSON.stringify(e)), e;};}} }, { key: "_initDecoder", value: function value(e) {switch (e.protocol) {case Br:return function (e) {if ("string" === n(e)) try {return JSON.parse(e);} catch (t) {return e;}return e;};case Hr:return function (e) {return e;};default:return function (e) {return J.warn("PackageConfig._initDecoder(), unknow response type, data: ", e), e;};}} }]), e;}(),Uu = function Uu() {for (var e = [], t = qu(arguments), n = 0; n < arguments.length; n++) {Number.isInteger(arguments[n]) ? e.push(arguments[n]) : e.push(!0 == !!arguments[n] ? "1" : "0");}return e.join(t);},qu = function qu(e) {var t = e.length,n = e[t - 1];if ("string" != typeof n) return "";if (n.length > 1) return "";var r = e[t - 1];return delete e[t - 1], e.length -= t === e.length ? 1 : 0, r;},xu = { C2CMessageArray: 1, groupMessageArray: 1, groupTips: 1, C2CNotifyMessageArray: 1, profileModify: 1, friendListMod: 1 },Fu = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this, e))._initialization(), o;}return i(n, [{ key: "_initialization", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1, this._isLongPoll = !1, this._longPollID = 0, this._noticeSequence = 0, this._initializeListener(), this._runLoop = null, this._initShuntChannels();} }, { key: "_initShuntChannels", value: function value() {this._shuntChannels = Object.create(null), this._shuntChannels.C2CMessageArray = this._C2CMessageArrayChannel.bind(this), this._shuntChannels.groupMessageArray = this._groupMessageArrayChannel.bind(this), this._shuntChannels.groupTips = this._groupTipsChannel.bind(this), this._shuntChannels.C2CNotifyMessageArray = this._C2CNotifyMessageArrayChannel.bind(this), this._shuntChannels.profileModify = this._profileModifyChannel.bind(this), this._shuntChannels.friendListMod = this._friendListModChannel.bind(this);} }, { key: "_C2CMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(po, t);} }, { key: "_groupMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(ho, t);} }, { key: "_groupTipsChannel", value: function value(e, t, n) {var r = this;switch (console.log(e, "有通知吗"), e) {case 4:case 6:this.emitInnerEvent(fo, t);break;case 5:t.forEach(function (e) {re(e.elements.revokedInfos) ? r.emitInnerEvent(_o, t) : r.emitInnerEvent(go, { groupSystemNotices: t, type: n });});break;default:J.log("NotificationController._groupTipsChannel unknown event=".concat(e, " type=").concat(n), t);}} }, { key: "_C2CNotifyMessageArrayChannel", value: function value(e, t, n) {this._isKickedoutNotice(t) ? this.emitInnerEvent(co) : this._isSysCmdMsgNotify(t) ? this.emitInnerEvent(vo) : this._isC2CMessageRevokedNotify(t) && this.emitInnerEvent(Co, t);} }, { key: "_profileModifyChannel", value: function value(e, t, n) {this.emitInnerEvent(yo, t);} }, { key: "_friendListModChannel", value: function value(e, t, n) {this.emitInnerEvent(mo, t);} }, { key: "_dispatchNotice", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "poll";if (re(e)) for (var n = null, r = null, o = "", i = "", s = "", a = 0, u = 0, l = e.length; u < l; u++) {a = (n = e[u]).event, o = Object.keys(n).find(function (e) {return void 0 !== xu[e];}), se(this._shuntChannels[o]) ? (r = n[o], "poll" === t && this._updatenoticeSequence(r), this._shuntChannels[o](a, r, t)) : ("poll" === t && this._updatenoticeSequence(), i = "".concat(gn), s = "".concat(Sr, ": ").concat(a, ", ").concat(o), this.emitInnerEvent(Ao, new pt({ code: i, message: s, data: { payloadName: o, event: a } })), i = "", s = "");}} }, { key: "getLongPollID", value: function value() {return this._longPollID;} }, { key: "_IAmReady", value: function value() {this.triggerReady();} }, { key: "reset", value: function value() {this._noticeSequence = 0, this._resetSync(), this.closeNoticeChannel();} }, { key: "_resetSync", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1;} }, { key: "_setNoticeSeqInRequestData", value: function value(e) {e.Cookie.NoticeSeq = this._noticeSequence, this.tim.sumStatController.addTotalCount(Qo);} }, { key: "_updatenoticeSequence", value: function value(e) {if (e) {var t = e[e.length - 1].noticeSequence;t && "number" == typeof t ? t <= this._noticeSequence || (this._noticeSequence = t) : this._noticeSequence++;} else this._noticeSequence++;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(Yr, this._startSyncMessages, this), e.on(Eo, this.closeNoticeChannel, this), e.on(ao, this._onFastStart, this);} }, { key: "openNoticeChannel", value: function value() {J.log("NotificationController.openNoticeChannel"), this._getLongPollID();} }, { key: "closeNoticeChannel", value: function value() {J.log("NotificationController.closeNoticeChannel"), (this._runLoop instanceof eu || this._runLoop instanceof tu) && (this._runLoop.abort(), this._runLoop.stop()), this._longPollID = 0, this._isLongPoll = !1;} }, { key: "_getLongPollID", value: function value() {var e = this;if (0 === this._longPollID) {var t = new oi();t.setMethod(Ni).setStart(), this.request({ name: "longPollID", action: "query" }).then(function (n) {var r = n.data.longPollingID;e._onGetLongPollIDSuccess(r), t.setCode(0).setText("longPollingID=".concat(r)).setNetworkType(e.getNetworkType()).setEnd();}).catch(function (n) {var r = new pt({ code: n.code || vn, message: n.message || Tr });e.emitInnerEvent(oo), e.emitInnerEvent(Ao, r), e.probeNetwork().then(function (e) {var n = v(e, 2),o = n[0],i = n[1];t.setError(r, o, i).setEnd();});});} else this._onGetLongPollIDSuccess(this._longPollID);} }, { key: "_onGetLongPollIDSuccess", value: function value(e) {this.emitInnerEvent(zr, [{ key: "long_poll_logout.query.requestData.longPollingID", value: e }, { key: "longPoll.query.requestData.cookie.longPollingID", value: e }]), this._longPollID = e, this._startLongPoll(), this._IAmReady(), this.tim.sumStatController.recordLongPollingID(this._longPollID);} }, { key: "_startLongPoll", value: function value() {if (!0 !== this._isLongPoll) {J.log("NotificationController._startLongPoll...");var e = this.tim.connectionController,t = this.createTransportCapsule({ name: "longPoll", action: "query" });this._isLongPoll = !0, this._runLoop = e.createRunLoop({ pack: t, before: this._setNoticeSeqInRequestData.bind(this), success: this._onNoticeReceived.bind(this), fail: this._onNoticeFail.bind(this) }), this._runLoop.start();} else J.log("NotificationController._startLongPoll is running...");} }, { key: "_onFastStart", value: function value() {this.closeNoticeChannel(), this.syncMessage();} }, { key: "_onNoticeReceived", value: function value(e) {var t = e.data;if (t.errorCode !== Ne.SUCCESS) {var n = new oi();n.setMethod(bi).setStart(), n.setMessage(t.errorInfo || JSON.stringify(t)).setCode(t.errorCode).setNetworkType(this.getNetworkType()).setEnd(), this._onResponseError(t);} else this.emitInnerEvent(so);this.tim.sumStatController.addSuccessCount(Qo), this.tim.sumStatController.addCost(Qo, t.timecost), e.data.eventArray && this._dispatchNotice(e.data.eventArray);} }, { key: "_onResponseError", value: function value(e) {switch (e.errorCode) {case Cn:J.warn("NotificationController._onResponseError, longPollingID=".concat(this._longPollID, " was kicked out")), this.emitInnerEvent(lo), this.closeNoticeChannel();break;case Mn:case In:this.emitInnerEvent(ko);break;default:oe(e.errorCode) || oe(e.errorInfo) ? J.log("NotificationController._onResponseError, errorCode or errorInfo undefined!", e) : this.emitInnerEvent(Ao, new pt({ code: e.errorCode, message: e.errorInfo }));}} }, { key: "_onNoticeFail", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === ln) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;J.log("NotificationController._onNoticeFail request timed out. url=".concat(t, " data=").concat(n));} else J.log("NotificationController._onNoticeFail request timed out.");} else J.log("NotificationController._onNoticeFail request failed due to network error");this.emitInnerEvent(io);} }, { key: "_isKickedoutNotice", value: function value(e) {return !!e[0].hasOwnProperty("kickoutMsgNotify");} }, { key: "_isSysCmdMsgNotify", value: function value(e) {if (!e[0]) return !1;var t = e[0];return !!Object.prototype.hasOwnProperty.call(t, "sysCmdMsgNotify");} }, { key: "_isC2CMessageRevokedNotify", value: function value(e) {var t = e[0];return !!Object.prototype.hasOwnProperty.call(t, "c2cMessageRevokedNotify");} }, { key: "_startSyncMessages", value: function value(e) {!0 !== this._syncMessagesFinished && this.syncMessage();} }, { key: "syncMessage", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;this._syncMessagesIsRunning = !0, this.request({ name: "syncMessage", action: "query", param: { cookie: t, syncFlag: n } }).then(function (t) {var n = t.data;switch (Uu(n.cookie, n.syncFlag)) {case "00":case "01":e.emitInnerEvent(Ao, { code: mn, message: Dr });break;case "10":case "11":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(Wr, { data: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e.syncMessage(n.cookie, n.syncFlag);break;case "12":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e.openNoticeChannel(), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(Xr, { messageList: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e._syncNoticeList = [], e._syncMessagesIsRunning = !1, e._syncMessagesFinished = !0;}}).catch(function (t) {e._syncMessagesIsRunning = !1, J.error("NotificationController.syncMessage failed. error:".concat(t));});} }]), n;}(Bo),Hu = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).COSSDK = null, o._cosUploadMethod = null, o.expiredTimeLimit = 300, o.appid = 0, o.bucketName = "", o.ciUrl = "", o.directory = "", o.downloadUrl = "", o.uploadUrl = "", o.expiredTimeOut = o.expiredTimeLimit, o.region = "ap-shanghai", o.cos = null, o.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, o._timer = 0, o.tim.innerEmitter.on(Yr, o._init, g(o)), o.triggerReady(), o;}return i(n, [{ key: "_expiredTimer", value: function value() {var e = this;this._timer = setInterval(function () {Math.ceil(Date.now() / 1e3) >= e.cosOptions.expiredTime - 60 && (e._getAuthorizationKey(), clearInterval(e._timer));}, 3e4);} }, { key: "_init", value: function value() {var e = O ? "cos-wx-sdk" : "cos-js-sdk";this.COSSDK = this.tim.getPlugin(e), this.COSSDK ? this._getAuthorizationKey() : J.warn("UploadController._init 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin");} }, { key: "_getAuthorizationKey", value: function value() {var e = this,t = Math.ceil(Date.now() / 1e3),n = new oi();n.setMethod(li).setStart(), this.request({ name: "cosSig", action: "query", param: { duration: this.expiredTimeLimit } }).then(function (r) {J.log("UploadController._getAuthorizationKey ok. data:", r.data);var o = r.data,i = o.expiredTime - t;n.setCode(0).setText("timeout=".concat(i, "s")).setNetworkType(e.getNetworkType()).setEnd(), e.appid = o.appid, e.bucketName = o.bucketName, e.ciUrl = o.ciUrl, e.directory = o.directory, e.downloadUrl = o.downloadUrl, e.uploadUrl = o.uploadUrl, e.expiredTimeOut = i, e.cosOptions = { secretId: o.secretId, secretKey: o.secretKey, sessionToken: o.sessionToken, expiredTime: o.expiredTime }, e._initUploaderMethod(), e._expiredTimer();}).catch(function (t) {e.probeNetwork().then(function (n) {var r = v(n, 2),o = r[0],i = r[1];e.setError(t, o, i).setEnd();}), J.warn("UploadController._getAuthorizationKey failed. error:", t);});} }, { key: "_initUploaderMethod", value: function value() {var e = this;this.appid && (this.cos = O ? new this.COSSDK({ ForcePathStyle: !0, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = O ? function (t, n) {e.cos.postObject(t, n);} : function (t, n) {e.cos.uploadFiles(t, n);});} }, { key: "_getAuthorization", value: function value(e, t) {t({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });} }, { key: "uploadImage", value: function value(e) {if (!e.file) return Wo(new pt({ code: Et, message: Un }));var t = this._checkImageType(e.file);if (!0 !== t) return t;var n = this._checkImageMime(e.file);if (!0 !== n) return n;var r = this._checkImageSize(e.file);return !0 !== r ? r : this.upload(e);} }, { key: "_checkImageType", value: function value(e) {var t = "";return t = O ? e.url.slice(e.url.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), kr.indexOf(t.toLowerCase()) >= 0 || Wo(new pt({ coe: kt, message: qn }));} }, { key: "_checkImageMime", value: function value(e) {return !0;} }, { key: "_checkImageSize", value: function value(e) {var t = 0;return 0 === (t = O ? e.size : e.files[0].size) ? Wo(new pt({ code: St, message: "".concat(bn) })) : t < 20971520 || Wo(new pt({ coe: At, message: "".concat(xn) }));} }, { key: "uploadFile", value: function value(e) {var t = null;return e.file ? e.file.files[0].size > 104857600 ? (t = new pt({ code: Gt, message: Yn }), Wo(t)) : 0 === e.file.files[0].size ? (t = new pt({ code: St, message: "".concat(bn) }), Wo(t)) : this.upload(e) : (t = new pt({ code: Pt, message: $n }), Wo(t));} }, { key: "uploadVideo", value: function value(e) {return e.file.videoFile.size > 104857600 ? Wo(new pt({ code: Lt, message: "".concat(Vn) })) : 0 === e.file.videoFile.size ? Wo(new pt({ code: St, message: "".concat(bn) })) : -1 === Ar.indexOf(e.file.videoFile.type) ? Wo(new pt({ code: Nt, message: "".concat(Kn) })) : O ? this.handleVideoUpload({ file: e.file.videoFile }) : R ? this.handleVideoUpload(e) : void 0;} }, { key: "handleVideoUpload", value: function value(e) {var t = this;return new Promise(function (n, r) {t.upload(e).then(function (e) {n(e);}).catch(function () {t.upload(e).then(function (e) {n(e);}).catch(function () {r(new pt({ code: Ot, message: Bn }));});});});} }, { key: "uploadAudio", value: function value(e) {return e.file ? e.file.size > 20971520 ? Wo(new pt({ code: Rt, message: "".concat(Hn) })) : 0 === e.file.size ? Wo(new pt({ code: St, message: "".concat(bn) })) : this.upload(e) : Wo(new pt({ code: wt, message: Fn }));} }, { key: "upload", value: function value(e) {var t = this;if (!se(this._cosUploadMethod)) return J.warn("UploadController.upload 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin"), Wo(new pt({ code: vt, message: wn }));var n = new oi();n.setMethod(ci).setStart(), J.time(ri);var r = O ? e.file : e.file.files[0];return new Promise(function (o, i) {var s = O ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),a = t;t._cosUploadMethod(s, function (e, s) {var u = Object.create(null);if (s) {if (e || re(s.files) && s.files[0].error) {var l = new pt({ code: bt, message: jn });return n.setError(l, !0, t.getNetworkType()).setEnd(), J.log("UploadController.upload failed, error:", s.files[0].error), 403 === s.files[0].error.statusCode && (J.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), void i(l);}u.fileName = r.name, u.fileSize = r.size, u.fileType = r.type.slice(r.type.indexOf("/") + 1).toLowerCase(), u.location = O ? s.Location : s.files[0].data.Location;var c = J.timeEnd(ri),p = a._formatFileSize(r.size),h = a._formatSpeed(1e3 * r.size / c),f = "size=".concat(p, ",time=").concat(c, "ms,speed=").concat(h);return J.log("UploadController.upload success name=".concat(r.name, ",").concat(f)), o(u), void n.setCode(0).setNetworkType(t.getNetworkType()).setText(f).setEnd();}var d = new pt({ code: bt, message: jn });n.setError(d, !0, a.getNetworkType()).setEnd(), J.warn("UploadController.upload failed, error:", e), 403 === e.statusCode && (J.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), i(d);});});} }, { key: "_formatFileSize", value: function value(e) {return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB";} }, { key: "_formatSpeed", value: function value(e) {return e <= 1048576 ? (e / 1024).toFixed(1) + "KB/s" : (e / 1048576).toFixed(1) + "MB/s";} }, { key: "_createCosOptionsWeb", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.files[0].name);return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), Body: e.file.files[0] }], SliceSize: 1048576, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {J.warn("onProgress callback error:"), J.error(n);}}, onFileFinish: function onFileFinish(e, t, n) {} };} }, { key: "_createCosOptionsWXMiniApp", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.name),r = e.file.url;return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), FilePath: r, onProgress: function onProgress(t) {if (J.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {J.warn("onProgress callback error:"), J.error(n);}} };} }, { key: "_genFileName", value: function value(e, t, n) {return "".concat(e, "-").concat(t, "-").concat(me(99999), "-").concat(n);} }, { key: "reset", value: function value() {this._timer && (clearInterval(this._timer), this._timer = 0);} }]), n;}(Bo),Bu = function (e) {l(o, e);var n = y(o);function o(e) {var t;return r(this, o), (t = n.call(this, e)).FILETYPE = { SOUND: 2106, FILE: 2107, VIDEO: 2113 }, t._bdh_download_server = "grouptalk.c2c.qq.com", t._BDHBizID = 10001, t._authKey = "", t._expireTime = 0, t.tim.innerEmitter.on(Yr, t._getAuthKey, g(t)), t;}return i(o, [{ key: "_getAuthKey", value: function value() {var e = this;this.request({ name: "bigDataHallwayAuthKey", action: "query" }).then(function (t) {t.data.authKey && (e._authKey = t.data.authKey, e._expireTime = parseInt(t.data.expireTime));});} }, { key: "_isFromOlderVersion", value: function value(e) {return 2 !== e.content.downloadFlag;} }, { key: "parseElements", value: function value(e, t) {if (!re(e) || !t) return [];for (var n = [], r = null, o = 0; o < e.length; o++) {r = e[o], this._needParse(r) ? n.push(this._parseElement(r, t)) : n.push(e[o]);}return n;} }, { key: "_needParse", value: function value(e) {return !(!this._isFromOlderVersion(e) || e.type !== t.MSG_AUDIO && e.type !== t.MSG_FILE && e.type !== t.MSG_VIDEO);} }, { key: "_parseElement", value: function value(e, n) {switch (e.type) {case t.MSG_AUDIO:return this._parseAudioElement(e, n);case t.MSG_FILE:return this._parseFileElement(e, n);case t.MSG_VIDEO:return this._parseVideoElement(e, n);}} }, { key: "_parseAudioElement", value: function value(e, t) {return e.content.url = this._genAudioUrl(e.content.uuid, t), e;} }, { key: "_parseFileElement", value: function value(e, t) {return e.content.url = this._genFileUrl(e.content.uuid, t, e.content.fileName), e;} }, { key: "_parseVideoElement", value: function value(e, t) {return e.content.url = this._genVideoUrl(e.content.uuid, t), e;} }, { key: "_genAudioUrl", value: function value(e, t) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genAudioUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.SOUND, "&openid=").concat(t, "&ver=0");} }, { key: "_genFileUrl", value: function value(e, t, n) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genFileUrl no authKey!"), "") : (n || (n = "".concat(Math.floor(1e5 * Math.random()), "-").concat(Date.now())), "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.FILE, "&openid=").concat(t, "&ver=0&filename=").concat(encodeURIComponent(n)));} }, { key: "_genVideoUrl", value: function value(e, t) {return "" === this._authKey ? (J.warn("BigDataHallwayController._genVideoUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.VIDEO, "&openid=").concat(t, "&ver=0");} }, { key: "reset", value: function value() {this._authKey = "", this.expireTime = 0;} }]), o;}(Bo),Vu = { app_id: "", event_id: "", api_base: "https://pingtas.qq.com/pingd", prefix: "_mta_", version: "1.3.9", stat_share_app: !1, stat_pull_down_fresh: !1, stat_reach_bottom: !1, stat_param: !0 };function Ku() {try {var e = "s" + ju();return wx.setStorageSync(Vu.prefix + "ssid", e), e;} catch (t) {}}function ju(e) {for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {var r = Math.floor(10 * Math.random()),o = t[r];t[r] = t[n - 1], t[n - 1] = o;}for (n = r = 0; 5 > n; n++) {r = 10 * r + t[n];}return (e || "") + (r + "") + +new Date();}function $u() {try {var e = getCurrentPages(),t = "/";return 0 < e.length && (t = e.pop().__route__), t;} catch (n) {console.log("get current page path error:" + n);}}function Yu() {var e,t = { dm: "wechat.apps.xx", url: encodeURIComponent($u() + Xu(Ju.Data.pageQuery)), pvi: "", si: "", ty: 0 };return t.pvi = ((e = function () {try {return wx.getStorageSync(Vu.prefix + "auid");} catch (t) {}}()) || (e = function () {try {var t = ju();return wx.setStorageSync(Vu.prefix + "auid", t), t;} catch (e) {}}(), t.ty = 1), e), t.si = function () {var e = function () {try {return wx.getStorageSync(Vu.prefix + "ssid");} catch (e) {}}();return e || (e = Ku()), e;}(), t;}function zu() {var e = function () {var e = wx.getSystemInfoSync();return { adt: encodeURIComponent(e.model), scl: e.pixelRatio, scr: e.windowWidth + "x" + e.windowHeight, lg: e.language, fl: e.version, jv: encodeURIComponent(e.system), tz: encodeURIComponent(e.platform) };}();return function (e) {wx.getNetworkType({ success: function success(t) {e(t.networkType);} });}(function (e) {try {wx.setStorageSync(Vu.prefix + "ntdata", e);} catch (t) {}}), e.ct = wx.getStorageSync(Vu.prefix + "ntdata") || "4g", e;}function Wu() {var e,t = Ju.Data.userInfo,n = [];for (e in t) {t.hasOwnProperty(e) && n.push(e + "=" + t[e]);}return t = n.join(";"), { r2: Vu.app_id, r4: "wx", ext: "v=" + Vu.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "") };}function Xu(e) {if (!Vu.stat_param || !e) return "";e = function (e) {if (1 > Vu.ignore_params.length) return e;var t,n = {};for (t in e) {0 <= Vu.ignore_params.indexOf(t) || (n[t] = e[t]);}return n;}(e);var t,n = [];for (t in e) {n.push(t + "=" + e[t]);}return 0 < n.length ? "?" + n.join("&") : "";}var Ju = { App: { init: function init(e) {"appID" in e && (Vu.app_id = e.appID), "eventID" in e && (Vu.event_id = e.eventID), "statShareApp" in e && (Vu.stat_share_app = e.statShareApp), "statPullDownFresh" in e && (Vu.stat_pull_down_fresh = e.statPullDownFresh), "statReachBottom" in e && (Vu.stat_reach_bottom = e.statReachBottom), "ignoreParams" in e && (Vu.ignore_params = e.ignoreParams), "statParam" in e && (Vu.stat_param = e.statParam), Ku();try {"lauchOpts" in e && (Ju.Data.lanchInfo = e.lauchOpts, Ju.Data.lanchInfo.landing = 1);} catch (t) {}"autoReport" in e && e.autoReport && function () {var e = Page;Page = function Page(t) {var n = t.onLoad;t.onLoad = function (e) {n && n.call(this, e), Ju.Data.lastPageQuery = Ju.Data.pageQuery, Ju.Data.pageQuery = e, Ju.Data.lastPageUrl = Ju.Data.pageUrl, Ju.Data.pageUrl = $u(), Ju.Data.show = !1, Ju.Page.init();}, e(t);};}();} }, Page: { init: function init() {var e,t = getCurrentPages()[getCurrentPages().length - 1];t.onShow && (e = t.onShow, t.onShow = function () {if (!0 === Ju.Data.show) {var t = Ju.Data.lastPageQuery;Ju.Data.lastPageQuery = Ju.Data.pageQuery, Ju.Data.pageQuery = t, Ju.Data.lastPageUrl = Ju.Data.pageUrl, Ju.Data.pageUrl = $u();}Ju.Data.show = !0, Ju.Page.stat(), e.apply(this, arguments);}), Vu.stat_pull_down_fresh && t.onPullDownRefresh && function () {var e = t.onPullDownRefresh;t.onPullDownRefresh = function () {Ju.Event.stat(Vu.prefix + "pulldownfresh", { url: t.__route__ }), e.apply(this, arguments);};}(), Vu.stat_reach_bottom && t.onReachBottom && function () {var e = t.onReachBottom;t.onReachBottom = function () {Ju.Event.stat(Vu.prefix + "reachbottom", { url: t.__route__ }), e.apply(this, arguments);};}(), Vu.stat_share_app && t.onShareAppMessage && function () {var e = t.onShareAppMessage;t.onShareAppMessage = function () {return Ju.Event.stat(Vu.prefix + "shareapp", { url: t.__route__ }), e.apply(this, arguments);};}();}, multiStat: function multiStat(e, t) {if (1 == t) Ju.Page.stat(e);else {var n = getCurrentPages()[getCurrentPages().length - 1];n.onShow && function () {var t = n.onShow;n.onShow = function () {Ju.Page.stat(e), t.call(this, arguments);};}();}}, stat: function stat(e) {if ("" != Vu.app_id) {var t = [],n = Wu();if (e && (n.r2 = e), e = [Yu(), n, zu()], Ju.Data.lanchInfo) {e.push({ ht: Ju.Data.lanchInfo.scene }), Ju.Data.pageQuery && Ju.Data.pageQuery._mta_ref_id && e.push({ rarg: Ju.Data.pageQuery._mta_ref_id });try {1 == Ju.Data.lanchInfo.landing && (n.ext += ";lp=1", Ju.Data.lanchInfo.landing = 0);} catch (i) {}}e.push({ rdm: "/", rurl: 0 >= Ju.Data.lastPageUrl.length ? Ju.Data.pageUrl + Xu(Ju.Data.lastPageQuery) : encodeURIComponent(Ju.Data.lastPageUrl + Xu(Ju.Data.lastPageQuery)) }), e.push({ rand: +new Date() }), n = 0;for (var r = e.length; n < r; n++) {for (var o in e[n]) {e[n].hasOwnProperty(o) && t.push(o + "=" + (void 0 === e[n][o] ? "" : e[n][o]));}}wx.request({ url: Vu.api_base + "?" + t.join("&").toLowerCase() });}} }, Event: { stat: function stat(e, t) {if ("" != Vu.event_id) {var n = [],r = Yu(),o = Wu();r.dm = "wxapps.click", r.url = e, o.r2 = Vu.event_id;var i,s = void 0 === t ? {} : t,a = [];for (i in s) {s.hasOwnProperty(i) && a.push(encodeURIComponent(i) + "=" + encodeURIComponent(s[i]));}for (s = a.join(";"), o.r5 = s, s = 0, o = (r = [r, o, zu(), { rand: +new Date() }]).length; s < o; s++) {for (var u in r[s]) {r[s].hasOwnProperty(u) && n.push(u + "=" + (void 0 === r[s][u] ? "" : r[s][u]));}}wx.request({ url: Vu.api_base + "?" + n.join("&").toLowerCase() });}} }, Data: { userInfo: null, lanchInfo: null, pageQuery: null, lastPageQuery: null, pageUrl: "", lastPageUrl: "", show: !1 } },Qu = Ju,Zu = function () {function e() {r(this, e), this.cache = [], this.MtaWX = null, this._init();}return i(e, [{ key: "report", value: function value(e, t) {var n = this;try {R ? window.MtaH5 ? (window.MtaH5.clickStat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;window.MtaH5.clickStat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }) : O && (this.MtaWX ? (this.MtaWX.Event.stat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;n.MtaWX.stat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }));} catch (r) {}} }, { key: "stat", value: function value() {try {R && window.MtaH5 ? window.MtaH5.pgv() : O && this.MtaWX && this.MtaWX.Page.stat();} catch (e) {}} }, { key: "_init", value: function value() {try {if (R) {window._mtac = { autoReport: 0 };var e = document.createElement("script"),t = Me();e.src = "".concat(t, "//pingjs.qq.com/h5/stats.js?v2.0.4"), e.setAttribute("name", "MTAH5"), e.setAttribute("sid", "500690998"), e.setAttribute("cid", "500691017");var n = document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e, n);} else O && (this.MtaWX = Qu, this.MtaWX.App.init({ appID: "500690995", eventID: "500691014", autoReport: !1, statParam: !0 }));} catch (r) {}} }]), e;}(),el = function (e) {l(n, e);var t = y(n);function n(e) {var o;r(this, n), (o = t.call(this, e)).MTA = new Zu();var i = o.tim.innerEmitter;return i.on(Po, o._stat, g(o)), i.on(bo, o._stat, g(o)), o;}return i(n, [{ key: "_stat", value: function value() {this.MTA.report("sdkappid", { value: this.tim.context.SDKAppID }), this.MTA.report("version", { value: dl.VERSION }), this.MTA.stat();} }]), n;}(Bo),tl = function () {function e(t) {r(this, e), this._table = "timwebii", this._report = [];}return i(e, [{ key: "pushIn", value: function value(e) {J.debug("SSOLogBody.pushIn", this._report.length, e), this._report.push(e);} }, { key: "backfill", value: function value(e) {var t;re(e) && 0 !== e.length && (J.debug("SSOLogBody.backfill", this._report.length, e.length), (t = this._report).unshift.apply(t, _(e)));} }, { key: "getLogsNumInMemory", value: function value() {return this._report.length;} }, { key: "isEmpty", value: function value() {return 0 === this._report.length;} }, { key: "_reset", value: function value() {this._report.length = 0, this._report = [];} }, { key: "getTable", value: function value() {return this._table;} }, { key: "getLogsInMemory", value: function value() {var e = this._report.slice();return this._reset(), e;} }]), e;}(),nl = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).TAG = "im-ssolog-event", o._reportBody = new tl(), o._version = "2.6.3", o.MIN_THRESHOLD = 20, o.MAX_THRESHOLD = 100, o.WAITING_TIME = 6e4, o.INTERVAL = 2e4, o._timerID = 0, o._resetLastReportTime(), o._startReportTimer(), o._retryCount = 0, o.MAX_RETRY_COUNT = 3, o.tim.innerEmitter.on(Do, o._onLoginSuccess, g(o)), o;}return i(n, [{ key: "reportAtOnce", value: function value() {J.debug("EventStatController.reportAtOnce"), this._report();} }, { key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);we(n) || (J.log("EventStatController._onLoginSuccess get ssolog in storage, nums=" + n.length), n.forEach(function (t) {e._reportBody.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "pushIn", value: function value(e) {e instanceof oi && (e.setCommonInfo(this.tim.context.SDKAppID, this._version, this.tim.context.tinyID, this.tim.loginInfo.identifier, this.getPlatform()), this._reportBody.pushIn(e), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());} }, { key: "_resetLastReportTime", value: function value() {this._lastReportTime = Date.now();} }, { key: "_startReportTimer", value: function value() {var e = this;this._timerID = setInterval(function () {Date.now() < e._lastReportTime + e.WAITING_TIME || e._reportBody.isEmpty() || e._report();}, this.INTERVAL);} }, { key: "_stopReportTimer", value: function value() {this._timerID > 0 && (clearInterval(this._timerID), this._timerID = 0);} }, { key: "_report", value: function value() {var e = this;if (!this._reportBody.isEmpty()) {var t = this._reportBody.getLogsInMemory();this.request({ name: "ssoEventStat", action: "create", param: { table: this._reportBody.getTable(), report: t } }).then(function () {e._resetLastReportTime(), e._retryCount > 0 && (J.debug("EventStatController.report retry success"), e._retryCount = 0);}).catch(function (n) {if (J.warn("EventStatController.report, online:".concat(e.getNetworkType(), " error:").concat(n)), e._reportBody.backfill(t), e._reportBody.getLogsNumInMemory() > e.MAX_THRESHOLD || e._retryCount === e.MAX_RETRY_COUNT || 0 === e._timerID) return e._retryCount = 0, void e._flushAtOnce();e._retryCount += 1;});}} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._reportBody.getLogsInMemory();if (we(t)) J.log("EventStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > this.MAX_THRESHOLD && (r = r.slice(0, this.MAX_THRESHOLD)), J.log("EventStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}} }, { key: "reset", value: function value() {J.log("EventStatController.reset"), this._stopReportTimer(), this._report();} }]), n;}(Bo),rl = "none",ol = "online",il = function () {function e() {r(this, e), this._networkType = "", this.maxWaitTime = 3e3;}return i(e, [{ key: "start", value: function value() {var e = this;O ? (wx.getNetworkType({ success: function success(t) {e._networkType = t.networkType, t.networkType === rl ? J.warn("NetMonitor no network, please check!") : J.info("NetMonitor networkType:".concat(t.networkType));} }), wx.onNetworkStatusChange(this._onWxNetworkStatusChange.bind(this))) : this._networkType = ol;} }, { key: "_onWxNetworkStatusChange", value: function value(e) {this._networkType = e.networkType, e.isConnected ? J.info("NetMonitor networkType:".concat(e.networkType)) : J.warn("NetMonitor no network, please check!");} }, { key: "probe", value: function value() {var e = this;return new Promise(function (t, n) {if (O) wx.getNetworkType({ success: function success(n) {e._networkType = n.networkType, n.networkType === rl ? (J.warn("NetMonitor no network, please check!"), t([!1, n.networkType])) : (J.info("NetMonitor networkType:".concat(n.networkType)), t([!0, n.networkType]));} });else if (window && window.fetch) fetch("".concat(Me(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())).then(function (e) {e.ok ? t([!0, ol]) : t([!1, rl]);}).catch(function (e) {t([!1, rl]);});else {var r = new XMLHttpRequest(),o = setTimeout(function () {J.warn("NetMonitor fetch timeout. Probably no network, please check!"), r.abort(), e._networkType = rl, t([!1, rl]);}, e.maxWaitTime);r.onreadystatechange = function () {4 === r.readyState && (clearTimeout(o), 200 === r.status || 304 === r.status ? (this._networkType = ol, t([!0, ol])) : (J.warn("NetMonitor fetch status:".concat(r.status, ". Probably no network, please check!")), this._networkType = rl, t([!1, rl])));}, r.open("GET", "".concat(Me(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())), r.send();}});} }, { key: "getNetworkType", value: function value() {return this._networkType;} }, { key: "reset", value: function value() {this._networkType = "";} }]), e;}(),sl = function () {function e(t) {var n = this;r(this, e), re(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, []);})) : J.warn("AverageCalculator.constructor need keys");}return i(e, [{ key: "push", value: function value(e, t) {return !(oe(e) || !this._map.has(e) || !Z(t)) && (this._map.get(e).push(t), !0);} }, { key: "getSize", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : this._map.get(e).length;} }, { key: "getAvg", value: function value(e) {if (oe(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = t.length;if (0 === n) return 0;var r = 0;return t.forEach(function (e) {r += e;}), t.length = 0, this._map.set(e, []), parseInt(r / n);} }, { key: "getMax", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : Math.max.apply(null, this._map.get(e));} }, { key: "getMin", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : Math.min.apply(null, this._map.get(e));} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.length = 0;});} }]), e;}(),al = function () {function e(t) {var n = this;r(this, e), re(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, { totalCount: 0, successCount: 0 });})) : J.warn("SuccessRateCalculator.constructor need keys");}return i(e, [{ key: "addTotalCount", value: function value(e) {return !(oe(e) || !this._map.has(e)) && (this._map.get(e).totalCount += 1, !0);} }, { key: "addSuccessCount", value: function value(e) {return !(oe(e) || !this._map.has(e)) && (this._map.get(e).successCount += 1, !0);} }, { key: "getSuccessRate", value: function value(e) {if (oe(e) || !this._map.has(e)) return -1;var t = this._map.get(e);if (0 === t.totalCount) return 1;var n = parseFloat((t.successCount / t.totalCount).toFixed(2));return t.totalCount = t.successCount = 0, n;} }, { key: "getTotalCount", value: function value(e) {return oe(e) || !this._map.has(e) ? -1 : this._map.get(e).totalCount;} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.totalCount = 0, e.successCount = 0;});} }]), e;}(),ul = function (e) {l(n, e);var t = y(n);function n(e) {var o;return r(this, n), (o = t.call(this, e)).TABLE = "timwebsum", o.TAG = "im-ssolog-sumstat", o._items = [Qo, Zo, ei], o._thresholdMap = new Map(), o._thresholdMap.set(Qo, 100), o._thresholdMap.set(Zo, 150), o._thresholdMap.set(ei, 15), o._lpID = "", o._platform = o.getPlatform(), o._lastReportTime = 0, o._statInfoArr = [], o._retryCount = 0, o._avgCalc = new sl(o._items), o._successRateCalc = new al(o._items), o.tim.innerEmitter.on(Do, o._onLoginSuccess, g(o)), o;}return i(n, [{ key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);we(n) || (J.log("SumStatController._onLoginSuccess get sumstatlog in storage, nums=" + n.length), n.forEach(function (t) {e._statInfoArr.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "recordLongPollingID", value: function value(e) {this._lpID = e;} }, { key: "addTotalCount", value: function value(e) {this._successRateCalc.addTotalCount(e) ? 1 === this._successRateCalc.getTotalCount(e) && (this._lastReportTime = Date.now()) : J.warn("SumStatController.addTotalCount invalid key:", e);} }, { key: "addSuccessCount", value: function value(e) {this._successRateCalc.addSuccessCount(e) || J.warn("SumStatController.addSuccessCount invalid key:", e);} }, { key: "addCost", value: function value(e, t) {this._avgCalc.push(e, t) ? (J.debug("SumStatController.addCost", e, t, this._avgCalc.getSize(e)), this._avgCalc.getSize(e) >= this._thresholdMap.get(e) && this._report(e)) : J.warn("SumStatController.addCost invalid key or cost:", e, t);} }, { key: "_getItemNum", value: function value(e) {switch (e) {case Qo:return 1;case Zo:return 2;case ei:return 3;default:return 100;}} }, { key: "_getStatInfo", value: function value(e) {var t = null;return this._avgCalc.getSize(e) > 0 && (t = { SDKAppID: "".concat(this.tim.context.SDKAppID), version: "".concat("2.6.3"), tinyID: this.tim.context.tinyID, userID: this.tim.loginInfo.identifier, item: this._getItemNum(e), lpID: e === Qo ? this._lpID : "", platform: this._platform, networkType: this.getNetworkType(), total: this._successRateCalc.getTotalCount(e), successRate: this._successRateCalc.getSuccessRate(e), avg: this._avgCalc.getAvg(e), timespan: Date.now() - this._lastReportTime, time: de() }), t;} }, { key: "_report", value: function value(e) {var t = this,n = [],r = null;oe(e) ? this._items.forEach(function (e) {null !== (r = t._getStatInfo(e)) && n.push(r);}) : null !== (r = this._getStatInfo(e)) && n.push(r), J.debug("SumStatController._report", n), this._statInfoArr.length > 0 && (n = n.concat(this.statInfoArr), this._statInfoArr = []), this._doReport(n);} }, { key: "_doReport", value: function value(e) {var t = this;we(e) ? J.warn("SumStatController._doReport statInfoArr is empty, do nothing") : this.request({ name: "ssoSumStat", action: "create", param: { table: this.TABLE, report: e } }).then(function () {t._lastReportTime = Date.now(), t._retryCount > 0 && (J.debug("SumStatController._doReport retry success"), t._retryCount = 0);}).catch(function (n) {J.warn("SumStatController._doReport, online:".concat(t.getNetworkType(), " error:"), n, e), t._retryCount <= 1 ? setTimeout(function () {J.info("SumStatController._doReport retry", e), t._retryCount += 1, t._doReport(e);}, 5e3) : (t._retryCount = 0, t._statInfoArr = t._statInfoArr.concat(e), t._flusgAtOnce());});} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._statInfoArr;if (we(t)) J.log("SumStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > 10 && (r = r.slice(0, 10)), J.log("SumStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}this._statInfoArr = [];} }, { key: "reset", value: function value() {J.info("SumStatController.reset"), this._report(), this._avgCalc.reset(), this._successRateCalc.reset();} }]), n;}(Bo),ll = function () {function e() {r(this, e), this._funcMap = new Map();}return i(e, [{ key: "defense", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;if ("string" != typeof e) return null;if (0 === e.length) return null;if ("function" != typeof t) return null;if (this._funcMap.has(e) && this._funcMap.get(e).has(t)) return this._funcMap.get(e).get(t);this._funcMap.has(e) || this._funcMap.set(e, new Map());var r = null;return this._funcMap.get(e).has(t) ? r = this._funcMap.get(e).get(t) : (r = this._pack(t, n), this._funcMap.get(e).set(t, r)), r;} }, { key: "defenseOnce", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;return "function" != typeof e ? null : this._pack(e, t);} }, { key: "find", value: function value(e, t) {return "string" != typeof e || 0 === e.length || "function" != typeof t ? null : this._funcMap.has(e) ? this._funcMap.get(e).has(t) ? this._funcMap.get(e).get(t) : (J.log("SafetyCallback.find: 找不到 func —— ".concat(e, "/").concat("" !== t.name ? t.name : "[anonymous]")), null) : (J.log("SafetyCallback.find: 找不到 eventName-".concat(e, " 对应的 func")), null);} }, { key: "delete", value: function value(e, t) {return "function" == typeof t && !!this._funcMap.has(e) && !!this._funcMap.get(e).has(t) && (this._funcMap.get(e).delete(t), 0 === this._funcMap.get(e).size && this._funcMap.delete(e), !0);} }, { key: "_pack", value: function value(e, t) {return function () {try {e.apply(t, Array.from(arguments));} catch (n) {console.error(n);}};} }]), e;}(),cl = function () {function t(e) {r(this, t);var n = new oi();n.setMethod(ii).setStart(), Ho.mixin(this), this._initOptions(e), this._initMemberVariables(), this._initControllers(), this._initListener(), oi.bindController(this.eventStatController), n.setCode(0).setText("mp=".concat(O, "-ua=").concat(L)).setEnd(), J.info("SDK inWxMiniApp:".concat(O, ", SDKAppID:").concat(e.SDKAppID, ", UserAgent:").concat(L)), this._safetyCallbackFactory = new ll();}return i(t, [{ key: "login", value: function value(e) {return J.time(Xo), this._ssoLog = new oi(), this._ssoLog.setMethod(si).setStart(), this.netMonitor.start(), this.loginInfo.identifier = e.identifier || e.userID, this.loginInfo.userSig = e.userSig, this.signController.login(this.loginInfo);} }, { key: "logout", value: function value() {var e = this.signController.logout();return this.resetSDK(), e;} }, { key: "on", value: function value(t, n, r) {t === e.GROUP_SYSTEM_NOTICE_RECEIVED && J.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"), J.debug("on", "eventName:".concat(t)), this.outerEmitter.on(t, this._safetyCallbackFactory.defense(t, n, r), r);} }, { key: "once", value: function value(e, t, n) {J.debug("once", "eventName:".concat(e)), this.outerEmitter.once(e, this._safetyCallbackFactory.defenseOnce(t, n), n || this);} }, { key: "off", value: function value(e, t, n, r) {J.debug("off", "eventName:".concat(e));var o = this._safetyCallbackFactory.find(e, t);null !== o && (this.outerEmitter.off(e, o, n, r), this._safetyCallbackFactory.delete(e, t));} }, { key: "registerPlugin", value: function value(e) {var t = this;this.plugins || (this.plugins = {}), Object.keys(e).forEach(function (n) {t.plugins[n] = e[n];});} }, { key: "getPlugin", value: function value(e) {return this.plugins[e] || void 0;} }, { key: "setLogLevel", value: function value(e) {if (e <= 0) {console.log(["", " ________  ______  __       __  __       __  ________  _______", "|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\", " \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\", "   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$", "   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$", "   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\", "   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$", "   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$", "    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$", "", ""].join("\n")), console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc", "color:#ff0000");console.log(["", "参考以下文档，会更快解决问题哦！(#^.^#)\n", "SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n", "SDK 接口文档: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html\n", "常见问题: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/tutorial-01-faq.html\n", "反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n", "如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"));}J.setLevel(e);} }, { key: "downloadLog", value: function value() {var e = document.createElement("a"),t = new Date(),n = new Blob(this.getLog());e.download = "TIM-" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + "-" + this.loginInfo.SDKAppID + "-" + this.context.identifier + ".txt", e.href = URL.createObjectURL(n), e.click(), URL.revokeObjectURL(n);} }, { key: "destroy", value: function value() {this.logout(), this.outerEmitter.emit(e.SDK_DESTROY, { SDKAppID: this.loginInfo.SDKAppID });} }, { key: "createTextMessage", value: function value(e) {return this.messageController.createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this.messageController.createImageMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this.messageController.createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this.messageController.createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {return this.messageController.createCustomMessage(e);} }, { key: "createFaceMessage", value: function value(e) {return this.messageController.createFaceMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this.messageController.createFileMessage(e);} }, { key: "sendMessage", value: function value(e) {return e instanceof br ? this.messageController.sendMessageInstance(e) : Wo(new pt({ code: Mt, message: Ln }));} }, { key: "revokeMessage", value: function value(e) {return this.messageController.revokeMessage(e);} }, { key: "resendMessage", value: function value(e) {return this.messageController.resendMessage(e);} }, { key: "getMessageList", value: function value(e) {return this.messageController.getMessageList(e);} }, { key: "setMessageRead", value: function value(e) {return this.messageController.setMessageRead(e);} }, { key: "getConversationList", value: function value() {return this.conversationController.getConversationList();} }, { key: "getConversationProfile", value: function value(e) {return this.conversationController.getConversationProfile(e);} }, { key: "deleteConversation", value: function value(e) {return this.conversationController.deleteConversation(e);} }, { key: "getMyProfile", value: function value() {return this.userController.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.userController.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.userController.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.userController.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.userController.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.userController.getBlacklist();} }, { key: "addToBlacklist", value: function value(e) {return this.userController.addBlacklist(e);} }, { key: "removeFromBlacklist", value: function value(e) {return this.userController.deleteBlacklist(e);} }, { key: "getGroupList", value: function value(e) {return this.groupController.getGroupList(e);} }, { key: "getGroupProfile", value: function value(e) {return this.groupController.getGroupProfile(e);} }, { key: "createGroup", value: function value(e) {return this.groupController.createGroup(e);} }, { key: "dismissGroup", value: function value(e) {return this.groupController.dismissGroup(e);} }, { key: "updateGroupProfile", value: function value(e) {return this.groupController.updateGroupProfile(e);} }, { key: "joinGroup", value: function value(e) {return this.groupController.joinGroup(e);} }, { key: "quitGroup", value: function value(e) {return this.groupController.quitGroup(e);} }, { key: "searchGroupByID", value: function value(e) {return this.groupController.searchGroupByID(e);} }, { key: "changeGroupOwner", value: function value(e) {return this.groupController.changeGroupOwner(e);} }, { key: "handleGroupApplication", value: function value(e) {return this.groupController.handleGroupApplication(e);} }, { key: "setMessageRemindType", value: function value(e) {return this.groupController.setMessageRemindType(e);} }, { key: "getGroupMemberList", value: function value(e) {return this.groupController.getGroupMemberList(e);} }, { key: "getGroupMemberProfile", value: function value(e) {return this.groupController.getGroupMemberProfile(e);} }, { key: "addGroupMember", value: function value(e) {return this.groupController.addGroupMember(e);} }, { key: "deleteGroupMember", value: function value(e) {return this.groupController.deleteGroupMember(e);} }, { key: "setGroupMemberMuteTime", value: function value(e) {return this.groupController.setGroupMemberMuteTime(e);} }, { key: "setGroupMemberRole", value: function value(e) {return this.groupController.setGroupMemberRole(e);} }, { key: "setGroupMemberNameCard", value: function value(e) {return this.groupController.setGroupMemberNameCard(e);} }, { key: "setGroupMemberCustomField", value: function value(e) {return this.groupController.setGroupMemberCustomField(e);} }, { key: "_initOptions", value: function value(e) {this.plugins = {};var t = e.SDKAppID || 0,n = me();this.context = { SDKAppID: t, accountType: n }, this.loginInfo = { SDKAppID: t, accountType: n, identifier: null, userSig: null }, this.options = { runLoopNetType: e.runLoopNetType || Xe, enablePointer: e.enablePointer || !1 };} }, { key: "_initMemberVariables", value: function value() {this.innerEmitter = new bu(), this.outerEmitter = new bu(), Yo(this.outerEmitter), this.packageConfig = new Gu(this), this.storage = new Nu(this), this.netMonitor = new il(), this.outerEmitter._emit = this.outerEmitter.emit, this.outerEmitter.emit = function (e, t) {var n = arguments[0],r = [n, { name: arguments[0], data: arguments[1] }];J.debug("emit outer event:".concat(n), r[1]), this.outerEmitter._emit.apply(this.outerEmitter, r);}.bind(this), this.innerEmitter._emit = this.innerEmitter.emit, this.innerEmitter.emit = function (e, t) {var n;ne(arguments[1]) && arguments[1].data ? (J.warn("inner eventData has data property, please check!"), n = [e, { name: arguments[0], data: arguments[1].data }]) : n = [e, { name: arguments[0], data: arguments[1] }], J.debug("emit inner event:".concat(e), n[1]), this.innerEmitter._emit.apply(this.innerEmitter, n);}.bind(this);} }, { key: "_initControllers", value: function value() {this.exceptionController = new ru(this), this.connectionController = new nu(this), this.contextController = new Ko(this), this.context = this.contextController.getContext(), this.signController = new Hi(this), this.messageController = new Du(this), this.conversationController = new yu(this), this.userController = new hu(this), this.groupController = new Ru(this), this.notificationController = new Fu(this), this.bigDataHallwayController = new Bu(this), this.statusController = new Ou(this), this.uploadController = new Hu(this), this.eventStatController = new nl(this), this.sumStatController = new ul(this), this.mtaReportController = new el(this), this._initReadyListener();} }, { key: "_initListener", value: function value() {var e = this;if (this.innerEmitter.on(uo, this._onSlowStart, this), O && "function" == typeof wx.onAppShow && "function" == typeof wx.onAppHide) {var t = null;wx.onAppHide(function () {(t = new oi()).setMethod(Fi).setStart();}), wx.onAppShow(function () {null !== t && t.setCode(0).setNetworkType(e.netMonitor.getNetworkType()).setEnd();});}} }, { key: "_initReadyListener", value: function value() {for (var e = this, t = this.readyList, n = 0, r = t.length; n < r; n++) {this[t[n]].ready(function () {return e._readyHandle();});}} }, { key: "_onSlowStart", value: function value() {J.log("slow start longpolling..."), this.resetSDK(), this.login(this.loginInfo);} }, { key: "resetSDK", value: function value() {var t = this;this.initList.forEach(function (e) {t[e].reset && t[e].reset();}), this.netMonitor.reset(), this.storage.reset(), this.resetReady(), this._initReadyListener(), this.outerEmitter.emit(e.SDK_NOT_READY);} }, { key: "_readyHandle", value: function value() {for (var t = this.readyList, n = !0, r = 0, o = t.length; r < o; r++) {if (!this[t[r]].isReady()) {n = !1;break;}}if (n) {var i = J.timeEnd(Xo);J.warn("SDK is ready. cost=".concat(i, "ms")), this.triggerReady(), this.innerEmitter.emit(Po), this.outerEmitter.emit(e.SDK_READY), this._ssoLog.setCode(0).setNetworkType(this.netMonitor.getNetworkType()).setText(i).setEnd();}} }]), t;}();cl.prototype.readyList = ["conversationController"], cl.prototype.initList = ["exceptionController", "connectionController", "signController", "contextController", "messageController", "conversationController", "userController", "groupController", "notificationController", "eventStatController", "sumStatController"];var pl = { login: "login", on: "on", off: "off", ready: "ready", setLogLevel: "setLogLevel", joinGroup: "joinGroup", quitGroup: "quitGroup", registerPlugin: "registerPlugin" };function hl(e, t) {return !(!e.isReady() && void 0 === pl[t]) || (e.innerEmitter.emit(Ao, new pt({ code: _n, message: "".concat(t, " ").concat(Er, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html#.SDK_READY") })), !1);}var fl = {},dl = {};return dl.create = function (t) {if (t.SDKAppID && fl[t.SDKAppID]) return fl[t.SDKAppID];J.log("TIM.create");var n = new cl(t);n.on(e.SDK_DESTROY, function (e) {fl[e.data.SDKAppID] = null, delete fl[e.data.SDKAppID];});var r = function (e) {var t = Object.create(null);return Object.keys(Ur).forEach(function (n) {if (e[n]) {var r = Ur[n],o = new S();t[r] = function () {var t = Array.from(arguments);return o.use(function (t, r) {if (hl(e, n)) return r();}).use(function (e, t) {if (!0 === Re(e, Gr[n], r)) return t();}).use(function (t, r) {return e[n].apply(e, t);}), o.run(t);};}}), t;}(n);return fl[t.SDKAppID] = r, J.log("TIM.create ok"), r;}, dl.TYPES = t, dl.EVENT = e, dl.VERSION = "2.6.3", J.log("TIM.VERSION: ".concat(dl.VERSION)), dl;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 24:
/*!**************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/buildFullPath.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 25));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 25:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/helpers/isAbsoluteURL.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 26:
/*!***************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/helpers/combineURLs.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 27:
/*!*******************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/settle.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),

/***/ 28:
/*!*******************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/InterceptorManager.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),

/***/ 29:
/*!************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/mergeConfig.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 23);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {

  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',
    'formData'];

    uploadKeys.forEach(function (prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 30:
/*!*********************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/luch-request/core/defaults.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 30000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),

/***/ 31:
/*!****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/md5.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
     * Configurable variables. You may need to tweak these to be compatible with
     * the server-side, but the defaults work in most cases.
     */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
                                                                               * These are the functions you'll usually want to call
                                                                               * They take string arguments and return either hex or base-64 encoded strings
                                                                               */
function hex_md5(s) {return rstr2hex(rstr_md5(str2rstr_utf8(s)));}
function b64_md5(s) {return rstr2b64(rstr_md5(str2rstr_utf8(s)));}
function any_md5(s, e) {return rstr2any(rstr_md5(str2rstr_utf8(s)), e);}
function hex_hmac_md5(k, d)
{return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));}
function b64_hmac_md5(k, d)
{return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));}
function any_hmac_md5(k, d, e)
{return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);}

/*
                                                                          * Perform a simple self-test to see if the VM is working
                                                                          */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
   * Calculate the MD5 of a raw string
   */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
   * Calculate the HMAC-MD5, of a key and some data (raw strings)
   */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16),opad = Array(16);
  for (var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
   * Convert a raw string to a hex string
   */
function rstr2hex(input)
{
  try {hexcase;} catch (e) {hexcase = 0;}
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for (var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0F) +
    hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
   * Convert a raw string to a base-64 string
   */
function rstr2b64(input)
{
  try {b64pad;} catch (e) {b64pad = '';}
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for (var i = 0; i < len; i += 3)
  {
    var triplet = input.charCodeAt(i) << 16 | (
    i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (
    i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++)
    {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;else
      output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
    }
  }
  return output;
}

/*
   * Convert a raw string to an arbitrary string encoding
   */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++)
  {
    dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
  }

  /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
  var full_length = Math.ceil(input.length * 8 / (
  Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for (j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0)
      quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for (i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);}

  return output;
}

/*
   * Encode a string as utf-8.
   * For efficiency, this assumes the input is valid utf-16.
   */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while (++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if (x <= 0x7F)
    output += String.fromCharCode(x);else
    if (x <= 0x7FF)
    output += String.fromCharCode(0xC0 | x >>> 6 & 0x1F,
    0x80 | x & 0x3F);else
    if (x <= 0xFFFF)
    output += String.fromCharCode(0xE0 | x >>> 12 & 0x0F,
    0x80 | x >>> 6 & 0x3F,
    0x80 | x & 0x3F);else
    if (x <= 0x1FFFFF)
    output += String.fromCharCode(0xF0 | x >>> 18 & 0x07,
    0x80 | x >>> 12 & 0x3F,
    0x80 | x >>> 6 & 0x3F,
    0x80 | x & 0x3F);
  }
  return output;
}

/*
   * Encode a string as utf-16
   */
function str2rstr_utf16le(input)
{
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
    input.charCodeAt(i) >>> 8 & 0xFF);}
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF,
    input.charCodeAt(i) & 0xFF);}
  return output;
}

/*
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++) {
    output[i] = 0;}
  for (var i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;}
  return output;
}

/*
   * Convert an array of little-endian words to a string
   */
function binl2rstr(input)
{
  var output = "";
  for (var i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);}
  return output;
}

/*
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
   * These functions implement the four basic operations the algorithm uses.
   */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
   * Bitwise rotate a 32-bit number to the left.
   */
function bit_rol(num, cnt)
{
  return num << cnt | num >>> 32 - cnt;
}

module.exports = {
  md5: function md5(str) {
    return hex_md5(str);
  } };

/***/ }),

/***/ 32:
/*!****************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 33));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 34));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 38));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 39));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 40));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 41));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 42));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 43));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 44));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 45));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 46));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 36));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 35));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 47));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 37));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 48));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 49));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 50));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 51));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 52));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 53);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 54));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 55));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 56));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 57));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 33:
/*!***************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 34:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/request/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 35));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 37));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 35:
/*!**********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 36:
/*!**********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/deepClone.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 37:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/test.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[3-9]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 38:
/*!************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/queryParams.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 384:
/*!***********************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/components/u-parse/libs/MpHtmlParser.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/**
 * html 解析器
 * @tutorial https://github.com/jin-yufeng/Parser
 * @version 20201029
 * @author JinYufeng
 * @listens MIT
 */
var cfg = __webpack_require__(/*! ./config.js */ 385),
blankChar = cfg.blankChar,
CssHandler = __webpack_require__(/*! ./CssHandler.js */ 386),
windowWidth = uni.getSystemInfoSync().windowWidth;
var emoji;

function MpHtmlParser(data) {var _this = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.attrs = {};
  this.CssHandler = new CssHandler(options.tagStyle, windowWidth);
  this.data = data;
  this.domain = options.domain;
  this.DOM = [];
  this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
  options.prot = (this.domain || '').includes('://') ? this.domain.split('://')[0] : 'http';
  this.options = options;
  this.state = this.Text;
  this.STACK = [];
  // 工具函数
  this.bubble = function () {
    for (var i = _this.STACK.length, item; item = _this.STACK[--i];) {
      if (cfg.richOnlyTags[item.name]) return false;
      item.c = 1;
    }
    return true;
  };
  this.decode = function (val, amp) {
    var i = -1,
    j,en;
    while (1) {
      if ((i = val.indexOf('&', i + 1)) == -1) break;
      if ((j = val.indexOf(';', i + 2)) == -1) break;
      if (val[i + 1] == '#') {
        en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
        if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
      } else {
        en = val.substring(i + 1, j);
        if (cfg.entities[en] || en == amp)
        val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
      }
    }
    return val;
  };
  this.getUrl = function (url) {
    if (url[0] == '/') {
      if (url[1] == '/') url = _this.options.prot + ':' + url;else
      if (_this.domain) url = _this.domain + url;
    } else if (_this.domain && url.indexOf('data:') != 0 && !url.includes('://'))
    url = _this.domain + '/' + url;
    return url;
  };
  this.isClose = function () {return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';};
  this.section = function () {return _this.data.substring(_this.start, _this.i);};
  this.parent = function () {return _this.STACK[_this.STACK.length - 1];};
  this.siblings = function () {return _this.STACK.length ? _this.parent().children : _this.DOM;};
}
MpHtmlParser.prototype.parse = function () {
  if (emoji) this.data = emoji.parseEmoji(this.data);
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  if (this.state == this.Text) this.setText();
  while (this.STACK.length) {this.popNode(this.STACK.pop());}
  return this.DOM;
};
// 设置属性
MpHtmlParser.prototype.setAttr = function () {
  var name = this.attrName.toLowerCase(),
  val = this.attrVal;
  if (cfg.boolAttrs[name]) this.attrs[name] = 'T';else
  if (val) {
    if (name == 'src' || name == 'data-src' && !this.attrs.src) this.attrs.src = this.getUrl(this.decode(val, 'amp'));else
    if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else
    if (name.substr(0, 5) != 'data-') this.attrs[name] = val;
  }
  this.attrVal = '';
  while (blankChar[this.data[this.i]]) {this.i++;}
  if (this.isClose()) this.setNode();else
  {
    this.start = this.i;
    this.state = this.AttrName;
  }
};
// 设置文本节点
MpHtmlParser.prototype.setText = function () {
  var back,text = this.section();
  if (!text) return;
  text = cfg.onText && cfg.onText(text, function () {return back = true;}) || text;
  if (back) {
    this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
    var j = this.start + text.length;
    for (this.i = this.start; this.i < j; this.i++) {this.state(this.data[this.i]);}
    return;
  }
  if (!this.pre) {
    // 合并空白符
    var flag,tmp = [];
    for (var i = text.length, c; c = text[--i];) {
      if (!blankChar[c]) {
        tmp.unshift(c);
        if (!flag) flag = 1;
      } else {
        if (tmp[0] != ' ') tmp.unshift(' ');
        if (c == '\n' && flag == void 0) flag = 0;
      }}
    if (flag == 0) return;
    text = tmp.join('');
  }
  this.siblings().push({
    type: 'text',
    text: this.decode(text) });

};
// 设置元素节点
MpHtmlParser.prototype.setNode = function () {
  var node = {
    name: this.tagName.toLowerCase(),
    attrs: this.attrs },

  close = cfg.selfClosingTags[node.name];
  if (this.options.nodes.length) node.type = 'node';
  this.attrs = {};
  if (!cfg.ignoreTags[node.name]) {
    // 处理属性
    var attrs = node.attrs,
    style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
    styleObj = {};
    if (attrs.id) {
      if (this.options.compress & 1) attrs.id = void 0;else
      if (this.options.useAnchor) this.bubble();
    }
    if (this.options.compress & 2 && attrs.class) attrs.class = void 0;
    switch (node.name) {
      case 'a':
      case 'ad':


        this.bubble();
        break;
      case 'font':
        if (attrs.color) {
          styleObj['color'] = attrs.color;
          attrs.color = void 0;
        }
        if (attrs.face) {
          styleObj['font-family'] = attrs.face;
          attrs.face = void 0;
        }
        if (attrs.size) {
          var size = parseInt(attrs.size);
          if (size < 1) size = 1;else
          if (size > 7) size = 7;
          var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
          styleObj['font-size'] = map[size - 1];
          attrs.size = void 0;
        }
        break;
      case 'embed':

        var src = node.attrs.src || '',
        type = node.attrs.type || '';
        if (type.includes('video') || src.includes('.mp4') || src.includes('.3gp') || src.includes('.m3u8'))
        node.name = 'video';else
        if (type.includes('audio') || src.includes('.m4a') || src.includes('.wav') || src.includes('.mp3') || src.includes(
        '.aac'))
        node.name = 'audio';else
        break;
        if (node.attrs.autostart)
        node.attrs.autoplay = 'T';
        node.attrs.controls = 'T';





      case 'video':
      case 'audio':
        if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else
        this["".concat(node.name, "Num")]++;
        if (node.name == 'video') {
          if (this.videoNum > 3)
          node.lazyLoad = 1;
          if (attrs.width) {
            styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
            attrs.width = void 0;
          }
          if (attrs.height) {
            styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
            attrs.height = void 0;
          }
        }
        if (!attrs.controls && !attrs.autoplay) attrs.controls = 'T';
        attrs.source = [];
        if (attrs.src) {
          attrs.source.push(attrs.src);
          attrs.src = void 0;
        }
        this.bubble();
        break;
      case 'td':
      case 'th':
        if (attrs.colspan || attrs.rowspan)
        for (var k = this.STACK.length, item; item = this.STACK[--k];) {
          if (item.name == 'table') {
            item.flag = 1;
            break;
          }}}

    if (attrs.align) {
      if (node.name == 'table') {
        if (attrs.align == 'center') styleObj['margin-inline-start'] = styleObj['margin-inline-end'] = 'auto';else
        styleObj['float'] = attrs.align;
      } else styleObj['text-align'] = attrs.align;
      attrs.align = void 0;
    }
    // 压缩 style
    var styles = style.split(';');
    style = '';
    for (var i = 0, len = styles.length; i < len; i++) {
      var info = styles[i].split(':');
      if (info.length < 2) continue;
      var _key = info[0].trim().toLowerCase(),
      _value = info.slice(1).join(':').trim();
      if (_value[0] == '-' || _value.includes('safe'))
      style += ";".concat(_key, ":").concat(_value);else
      if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import'))
      styleObj[_key] = _value;
    }
    if (node.name == 'img') {
      if (attrs.src && !attrs.ignore) {
        if (this.bubble())
        attrs.i = (this.imgNum++).toString();else
        attrs.ignore = 'T';
      }
      if (attrs.ignore) {
        style += ';-webkit-touch-callout:none';
        styleObj['max-width'] = '100%';
      }
      var width;
      if (styleObj.width) width = styleObj.width;else
      if (attrs.width) width = attrs.width.includes('%') ? attrs.width : parseFloat(attrs.width) + 'px';
      if (width) {
        styleObj.width = width;
        attrs.width = '100%';
        if (parseInt(width) > windowWidth) {
          styleObj.height = '';
          if (attrs.height) attrs.height = void 0;
        }
      }
      if (styleObj.height) {
        attrs.height = styleObj.height;
        styleObj.height = '';
      } else if (attrs.height && !attrs.height.includes('%'))
      attrs.height = parseFloat(attrs.height) + 'px';
    }
    for (var key in styleObj) {
      var value = styleObj[key];
      if (!value) continue;
      if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
      // 填充链接
      if (value.includes('url')) {
        var j = value.indexOf('(');
        if (j++ != -1) {
          while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {j++;}
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      }
      // 转换 rpx
      else if (value.includes('rpx'))
        value = value.replace(/[0-9.]+\s*rpx/g, function ($) {return parseFloat($) * windowWidth / 750 + 'px';});else
        if (key == 'white-space' && value.includes('pre') && !close)
        this.pre = node.pre = true;
      style += ";".concat(key, ":").concat(value);
    }
    style = style.substr(1);
    if (style) attrs.style = style;
    if (!close) {
      node.children = [];
      if (node.name == 'pre' && cfg.highlight) {
        this.remove(node);
        this.pre = node.pre = true;
      }
      this.siblings().push(node);
      this.STACK.push(node);
    } else if (!cfg.filter || cfg.filter(node, this) != false)
    this.siblings().push(node);
  } else {
    if (!close) this.remove(node);else
    if (node.name == 'source') {
      var parent = this.parent();
      if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src)
      parent.attrs.source.push(node.attrs.src);
    } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
  }
  if (this.data[this.i] == '/') this.i++;
  this.start = this.i + 1;
  this.state = this.Text;
};
// 移除标签
MpHtmlParser.prototype.remove = function (node) {var _this2 = this;
  var name = node.name,
  j = this.i;
  // 处理 svg
  var handleSvg = function handleSvg() {
    var src = _this2.data.substring(j, _this2.i + 1);
    node.attrs.xmlns = 'http://www.w3.org/2000/svg';
    for (var key in node.attrs) {
      if (key == 'viewbox') src = " viewBox=\"".concat(node.attrs.viewbox, "\"") + src;else
      if (key != 'style') src = " ".concat(key, "=\"").concat(node.attrs[key], "\"") + src;
    }
    src = '<svg' + src;
    var parent = _this2.parent();
    if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline'))
    parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
    _this2.siblings().push({
      name: 'img',
      attrs: {
        src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
        style: node.attrs.style,
        ignore: 'T' } });


  };
  if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
  while (1) {
    if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
      if (name == 'pre' || name == 'svg') this.i = j;else
      this.i = this.data.length;
      return;
    }
    this.start = this.i += 2;
    while (!blankChar[this.data[this.i]] && !this.isClose()) {this.i++;}
    if (this.section().toLowerCase() == name) {
      // 代码块高亮
      if (name == 'pre') {
        this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.
        substr(this.i - 5);
        return this.i = j;
      } else if (name == 'style')
      this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else
      if (name == 'title')
      this.DOM.title = this.data.substring(j + 1, this.i - 7);
      if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
      if (name == 'svg') handleSvg();
      return;
    }
  }
};
// 节点出栈处理
MpHtmlParser.prototype.popNode = function (node) {
  // 空白符处理
  if (node.pre) {
    node.pre = this.pre = void 0;
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].pre)
      this.pre = true;}
  }
  var siblings = this.siblings(),
  len = siblings.length,
  childs = node.children;
  if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false)
  return siblings.pop();
  var attrs = node.attrs;
  // 替换一些标签名
  if (cfg.blockTags[node.name]) node.name = 'div';else
  if (!cfg.trustTags[node.name]) node.name = 'span';
  // 处理列表
  if (node.c && (node.name == 'ul' || node.name == 'ol')) {
    if ((node.attrs.style || '').includes('list-style:none')) {
      for (var _i = 0, child; child = childs[_i++];) {
        if (child.name == 'li')
        child.name = 'div';}
    } else if (node.name == 'ul') {
      var floor = 1;
      for (var _i2 = this.STACK.length; _i2--;) {
        if (this.STACK[_i2].name == 'ul') floor++;}
      if (floor != 1)
      for (var _i3 = childs.length; _i3--;) {
        childs[_i3].floor = floor;}
    } else {
      for (var _i4 = 0, num = 1, _child; _child = childs[_i4++];) {
        if (_child.name == 'li') {
          _child.type = 'ol';
          _child.num = function (num, type) {
            if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
            if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
            if (type == 'i' || type == 'I') {
              num = (num - 1) % 99 + 1;
              var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
              ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
              res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
              if (type == 'i') return res.toLowerCase();
              return res;
            }
            return num;
          }(num++, attrs.type) + '.';
        }}
    }
  }
  // 处理表格
  if (node.name == 'table') {
    var padding = parseFloat(attrs.cellpadding),
    spacing = parseFloat(attrs.cellspacing),
    border = parseFloat(attrs.border);
    if (node.c) {
      if (isNaN(padding)) padding = 2;
      if (isNaN(spacing)) spacing = 2;
    }
    if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
    if (node.flag && node.c) {
      // 有 colspan 或 rowspan 且含有链接的表格转为 grid 布局实现
      attrs.style = "".concat(attrs.style || '', ";").concat(spacing ? ";grid-gap:".concat(spacing, "px") : ';border-left:0;border-top:0');
      var row = 1,
      col = 1,
      colNum,
      trs = [],
      children = [],
      map = {};
      (function f(ns) {
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].name == 'tr') trs.push(ns[i]);else
          f(ns[i].children || []);
        }
      })(node.children);
      for (var _i5 = 0; _i5 < trs.length; _i5++) {
        for (var j = 0, td; td = trs[_i5].children[j]; j++) {
          if (td.name == 'td' || td.name == 'th') {
            while (map[row + '.' + col]) {col++;}
            var cell = {
              name: 'div',
              c: 1,
              attrs: {
                style: (td.attrs.style || '') + (border ? ";border:".concat(border, "px solid gray") + (spacing ? '' :
                ';border-right:0;border-bottom:0') : '') + (padding ? ";padding:".concat(padding, "px") : '') },

              children: td.children };

            if (td.attrs.colspan) {
              cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + parseInt(td.attrs.colspan));
              if (!td.attrs.rowspan) cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + 1);
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              cell.attrs.style += ';grid-row-start:' + row + ';grid-row-end:' + (row + parseInt(td.attrs.rowspan));
              if (!td.attrs.colspan) cell.attrs.style += ';grid-column-start:' + col + ';grid-column-end:' + (col + 1);
              for (var k = 1; k < td.attrs.rowspan; k++) {map[row + k + '.' + col] = 1;}
            }
            children.push(cell);
            col++;
          }
        }
        if (!colNum) {
          colNum = col - 1;
          attrs.style += ";grid-template-columns:repeat(".concat(colNum, ",auto)");
        }
        col = 1;
        row++;
      }
      node.children = children;
    } else {
      attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
      if (border || padding)
      (function f(ns) {
        for (var i = 0, n; n = ns[i]; i++) {
          if (n.name == 'th' || n.name == 'td') {
            if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style || '');
            if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style || '');
          } else f(n.children || []);
        }
      })(childs);
    }
    if (this.options.autoscroll) {
      var table = Object.assign({}, node);
      node.name = 'div';
      node.attrs = {
        style: 'overflow:scroll' };

      node.children = [table];
    }
  }
  this.CssHandler.pop && this.CssHandler.pop(node);
  // 自动压缩
  if (node.name == 'div' && !Object.keys(attrs).length && childs.length == 1 && childs[0].name == 'div')
  siblings[len - 1] = childs[0];
};
// 状态机
MpHtmlParser.prototype.Text = function (c) {
  if (c == '<') {
    var next = this.data[this.i + 1],
    isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};
    if (isLetter(next)) {
      this.setText();
      this.start = this.i + 1;
      this.state = this.TagName;
    } else if (next == '/') {
      this.setText();
      if (isLetter(this.data[++this.i + 1])) {
        this.start = this.i + 1;
        this.state = this.EndTag;
      } else this.Comment();
    } else if (next == '!' || next == '?') {
      this.setText();
      this.Comment();
    }
  }
};
MpHtmlParser.prototype.Comment = function () {
  var key;
  if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else
  if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else
  key = '>';
  if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else
  this.i += key.length - 1;
  this.start = this.i + 1;
  this.state = this.Text;
};
MpHtmlParser.prototype.TagName = function (c) {
  if (blankChar[c]) {
    this.tagName = this.section();
    while (blankChar[this.data[this.i]]) {this.i++;}
    if (this.isClose()) this.setNode();else
    {
      this.start = this.i;
      this.state = this.AttrName;
    }
  } else if (this.isClose()) {
    this.tagName = this.section();
    this.setNode();
  }
};
MpHtmlParser.prototype.AttrName = function (c) {
  if (c == '=' || blankChar[c] || this.isClose()) {
    this.attrName = this.section();
    if (blankChar[c])
    while (blankChar[this.data[++this.i]]) {;}
    if (this.data[this.i] == '=') {
      while (blankChar[this.data[++this.i]]) {;}
      this.start = this.i--;
      this.state = this.AttrValue;
    } else this.setAttr();
  }
};
MpHtmlParser.prototype.AttrValue = function (c) {
  if (c == '"' || c == "'") {
    this.start++;
    if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
    this.attrVal = this.section();
    this.i++;
  } else {
    for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {;}
    this.attrVal = this.section();
  }
  this.setAttr();
};
MpHtmlParser.prototype.EndTag = function (c) {
  if (blankChar[c] || c == '>' || c == '/') {
    var name = this.section().toLowerCase();
    for (var i = this.STACK.length; i--;) {
      if (this.STACK[i].name == name) break;}
    if (i != -1) {
      var node;
      while ((node = this.STACK.pop()).name != name) {this.popNode(node);}
      this.popNode(node);
    } else if (name == 'p' || name == 'br')
    this.siblings().push({
      name: name,
      attrs: {} });

    this.i = this.data.indexOf('>', this.i);
    this.start = this.i + 1;
    if (this.i == -1) this.i = this.data.length;else
    this.state = this.Text;
  }
};
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 385:
/*!*****************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/components/u-parse/libs/config.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* 配置文件 */
var cfg = {
  // 出错占位图
  errorImg: null,
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…' },

  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  boolAttrs: makeMap('allowfullscreen,autoplay,autostart,controls,ignore,loop,muted'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section'),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,canvas,frame,iframe,input,link,map,meta,param,script,source,style,svg,textarea,title,track,wbr'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend'),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video'),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline' } };



function makeMap(str) {
  var map = Object.create(null),
  list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;}
  return map;
}


if (wx.canIUse('editor')) {
  cfg.blockTags.pre = void 0;
  cfg.ignoreTags.rp = true;
  Object.assign(cfg.richOnlyTags, makeMap('bdi,bdo,caption,rt,ruby'));
  Object.assign(cfg.trustTags, makeMap('bdi,bdo,caption,pre,rt,ruby'));
}







module.exports = cfg;

/***/ }),

/***/ 386:
/*!*********************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/components/u-parse/libs/CssHandler.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cfg = __webpack_require__(/*! ./config.js */ 385),
isLetter = function isLetter(c) {return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';};

function CssHandler(tagStyle) {
  var styles = Object.assign(Object.create(null), cfg.userAgentStyles);
  for (var item in tagStyle) {
    styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];}
  this.styles = styles;
}
CssHandler.prototype.getStyle = function (data) {
  this.styles = new parser(data, this.styles).parse();
};
CssHandler.prototype.match = function (name, attrs) {
  var tmp,matched = (tmp = this.styles[name]) ? tmp + ';' : '';
  if (attrs.class) {
    var items = attrs.class.split(' ');
    for (var i = 0, item; item = items[i]; i++) {
      if (tmp = this.styles['.' + item])
      matched += tmp + ';';}
  }
  if (tmp = this.styles['#' + attrs.id])
  matched += tmp + ';';
  return matched;
};
module.exports = CssHandler;

function parser(data, init) {
  this.data = data;
  this.floor = 0;
  this.i = 0;
  this.list = [];
  this.res = init;
  this.state = this.Space;
}
parser.prototype.parse = function () {
  for (var c; c = this.data[this.i]; this.i++) {
    this.state(c);}
  return this.res;
};
parser.prototype.section = function () {
  return this.data.substring(this.start, this.i);
};
// 状态机
parser.prototype.Space = function (c) {
  if (c == '.' || c == '#' || isLetter(c)) {
    this.start = this.i;
    this.state = this.Name;
  } else if (c == '/' && this.data[this.i + 1] == '*')
  this.Comment();else
  if (!cfg.blankChar[c] && c != ';')
  this.state = this.Ignore;
};
parser.prototype.Comment = function () {
  this.i = this.data.indexOf('*/', this.i) + 1;
  if (!this.i) this.i = this.data.length;
  this.state = this.Space;
};
parser.prototype.Ignore = function (c) {
  if (c == '{') this.floor++;else
  if (c == '}' && ! --this.floor) {
    this.list = [];
    this.state = this.Space;
  }
};
parser.prototype.Name = function (c) {
  if (cfg.blankChar[c]) {
    this.list.push(this.section());
    this.state = this.NameSpace;
  } else if (c == '{') {
    this.list.push(this.section());
    this.Content();
  } else if (c == ',') {
    this.list.push(this.section());
    this.Comma();
  } else if (!isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_')
  this.state = this.Ignore;
};
parser.prototype.NameSpace = function (c) {
  if (c == '{') this.Content();else
  if (c == ',') this.Comma();else
  if (!cfg.blankChar[c]) this.state = this.Ignore;
};
parser.prototype.Comma = function () {
  while (cfg.blankChar[this.data[++this.i]]) {;}
  if (this.data[this.i] == '{') this.Content();else
  {
    this.start = this.i--;
    this.state = this.Name;
  }
};
parser.prototype.Content = function () {
  this.start = ++this.i;
  if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
  var content = this.section();
  for (var i = 0, item; item = this.list[i++];) {
    if (this.res[item]) this.res[item] += ';' + content;else
    this.res[item] = content;}
  this.list = [];
  this.state = this.Space;
};

/***/ }),

/***/ 39:
/*!******************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/route.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 40:
/*!***********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 41:
/*!*********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 42:
/*!**************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 43:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/guid.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 44:
/*!******************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/color.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 45:
/*!**********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/type2icon.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 46:
/*!************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/randomArray.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 47:
/*!********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/addUnit.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 37));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 471:
/*!****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/util/emitter.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 48:
/*!*******************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/random.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 49:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/trim.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 5:
/*!********************************************!*\
  !*** F:/dx文件/code/wp/market_wx/pages.json ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 50:
/*!******************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/toast.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 51:
/*!**********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/getParent.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 52:
/*!********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/$parent.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 53:
/*!****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/sys.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 54:
/*!*********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/debounce.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 549:
/*!************************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/util/async-validator.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"生意旺铺","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 550)))

/***/ }),

/***/ 55:
/*!*********************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/function/throttle.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 550:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 551);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 551:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 550)))

/***/ }),

/***/ 56:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/config/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 57:
/*!*****************************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/node_modules/uview-ui/libs/config/zIndex.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 58:
/*!******************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/static/js/filters.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} //status => 订单状态
var orderStatus = function orderStatus(v) {
  if (v == 0) return '待付款';else
  if (v == 1) return '待发货';else
  if (v == 2) return '待收货';else
  if (v == 3) return '交易完成';else
  return '';
};
//支付工具
var toTools = function toTools(v) {
  if (v == 1) return '现金';
  if (v == 2) return '账期（赊账）';
  if (v == 3) return '融资';
  if (v == 9) return '微信';
  return '未知';
};
//订单状态
var toState = function toState(v) {
  if (v == 0) return '待议价';
  if (v == 1) return '议价完成';
  if (v == 2) return '订单完成';
  if (v == 3) return '取消订单';
  if (v == 4) return '等待买家确认';
  if (v == 5) return '等待买家填写地址';
  if (v == 6) return '等待买家选择自提还是出运费';
  if (v == 7) return '不议价等待卖家确认运费';
  if (v == 8) return '不议价等待买家确认运费价格';
  return v;
};
//支付状态
var toPayState = function toPayState(v) {
  if (v == 0) return '等待支付';
  if (v == 1) return '等待支付';
  if (v == 2) return '退款中';
  if (v == 3) return '等待收货';
  if (v == 4) return '等待支付';
  if (v == 5) return '支付成功';
  if (v == 6) return '支付失败';
  if (v == 7) return '已退款';
  if (v == 8) return '已部分退款';
  if (v == 9) return '已冻结';
  if (v == 10) return '等待支付';
  if (v == 11) return '等待支付';
  return v;
};
//支付类型
var toPayType = function toPayType(v) {
  if (v == 1) return '担保支付';
  if (v == 2) return '货到付款';
  if (v == 3) return '款到发货';
  return v;
};
var toTranState = function toTranState(v) {
  if (v == 0) return '未发货';
  if (v == 1) return '已发货';
  if (v == 2) return '已收货';
  return v;
};
var buyGetType = function buyGetType(v) {
  if (v == 1) return '买家自提';
  if (v == 2) return '买家出运费';
  if (v == 3) return '卖家包邮';
  return v;
};
var moneyDwInt = function moneyDwInt(v) {
  if (!v) return 0;
  return Number(String(v).split('.')[0]);
};
var moneyDwPoint = function moneyDwPoint(v) {
  if (!v) return '00';
  return String(v.toFixed(2)).split('.')[1];
};
var wxBillState = function wxBillState(v) {
  if (v == 0) return '未支付';
  if (v == 1) return '支付完成';
  return v;
};
var toFixed2 = function toFixed2(v) {
  if (!v) v = 0;
  return v.toFixed(2);
};

//时间格式
var timeFilter = function timeFilter(v) {
  if (!v) return null;
  var dateArr = v.split(' ')[0].split('-');
  var timeArr = v.split(' ')[1].split(':');
  var arr = [].concat(_toConsumableArray(dateArr), _toConsumableArray(timeArr));
  arr = arr.map(function (ele) {return +ele;});
  // console.log(arr)
  var now = new Date().toLocaleString();
  var nowArr1 = now.split(' ')[0].split('/');
  var nowArr2 = now.split(' ')[1].slice(2).split(':');
  var nowArr = [].concat(_toConsumableArray(nowArr1), _toConsumableArray(nowArr2));
  nowArr = nowArr.map(function (ele) {return +ele;});
  if (now.indexOf('下午') != -1) {
    nowArr[3] = nowArr[3] + 12;
  }
  // console.log(nowArr)

  if (nowArr[0] == arr[0] && nowArr[1] == arr[1] && nowArr[2] - arr[2] <= 1) {
    if (nowArr[2] == arr[2]) {
      if (nowArr[3] == arr[3]) {
        return nowArr[4] - arr[4] + 1 + '分钟前';
      } else
      if (nowArr[4] < arr[4] && nowArr[3] - arr[3] == 1) {
        return nowArr[4] - arr[4] + 61 + '分钟前';
      }
      return nowArr[3] - arr[3] + '小时前';

    } else if (nowArr[2] - arr[2] == 1 && nowArr[3] - arr[3] < 0) {
      return +nowArr[3] - +arr[3] + 24 + '小时前';
    } else {
      return v.split(' ')[0].slice(5);
    }
  }
  if (nowArr[0] != arr[0]) {
    return v.split(' ')[0];
  }
  return v.split(' ')[0].slice(5);
};var _default =
{
  orderStatus: orderStatus,
  timeFilter: timeFilter,
  toTools: toTools,
  toState: toState,
  toPayState: toPayState,
  toPayType: toPayType,
  toTranState: toTranState,
  moneyDwInt: moneyDwInt,
  moneyDwPoint: moneyDwPoint,
  wxBillState: wxBillState,
  toFixed2: toFixed2,
  buyGetType: buyGetType };exports.default = _default;

/***/ }),

/***/ 73:
/*!*******************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/mixShareInfo.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default = {
  data: function data() {
    return {
      shareOptions: {
        pageName: '' },

      share_title: '',
      share_img: '',
      params: '' };

  },
  onLoad: function onLoad(options) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              if (options && options.login) {
                uni.setStorageSync('sharelogin', options.login);
              }case 1:case "end":return _context.stop();}}}, _callee);}))();
  },
  onShareTimeline: function onShareTimeline() {
    return {
      title: this.share_title,
      query: this.getQuery(),
      imageUrl: this.share_img };

  },
  onShareAppMessage: function onShareAppMessage(res) {
    return {
      title: this.share_title,
      path: this.getPath(),
      imageUrl: this.share_img };

  },
  // onShareTimeline() {
  // 	let opt = {
  // 		title: this.getShareTitle(),
  // 		query: `login=${uni.getStorageSync('login')}`
  // 	}
  // 	return opt
  // },
  // onShareAppMessage(res) {
  // 	let opt = {
  // 		title: this.getShareTitle(),
  // 		path: this.getPath(),
  // 	};
  // 	return opt
  // },
  methods: {
    getQuery: function getQuery() {
      var fullPath = this.$scope.$page.fullPath;
      var login = "login=".concat(uni.getStorageSync('login'));
      var query = '';
      if (fullPath.includes('?')) {
        query = fullPath.split('?')[1] + '&' + login;
      } else {
        query = login;
      }
      console.log(query);
      return query;
    },
    getPath: function getPath() {
      var fullPath = this.$scope.$page.fullPath;
      var login = "login=".concat(uni.getStorageSync('login'));
      if (fullPath.includes('?')) {
        login = '&' + login;
      } else {
        login = '?' + login;
      }
      return fullPath + login;
    },
    getShareTitle: function getShareTitle() {
      var title = uni.getStorageSync('home').title || '旺铺';
      return "".concat(title, " - ").concat(this.shareOptions.pageName);
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 10);

/***/ }),

/***/ 94:
/*!**************************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/mixCheckLoginStatus.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default = {
  data: function data() {

    return {
      couponShareTitle: "",
      loginBind: {
        auth: 0,
        cash_name: "" } };


  },
  onLoad: function onLoad() {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                _this.checkLogin());case 2:res = _context.sent;
              if (res.data.share_name) _this.couponShareTitle = res.data.share_name;
              _this.loginBind.auth = res.data.auth;
              _this.loginBind.cash_name = res.data.cash_name;
              _this.loginBind.order_type = res.data.order_type;
              if (res.data.login != 0) {
                uni.setStorageSync('login', res.data.login);
              } else {
                uni.setStorageSync('prePage', getCurrentPages()[getCurrentPages().length - 1].$page.fullPath);
                if (getCurrentPages()[0].route != "pages/mine/mine") {
                  uni.redirectTo({
                    url: '/pages/login/index' });

                  uni.showToast({
                    title: '请登录生意宝账号。',
                    icon: 'none' });

                }

              }case 8:case "end":return _context.stop();}}}, _callee);}))();
  },
  methods: {
    checkLogin: function checkLogin() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  _this2.$http.get('Xcx/check_login'));case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2);}))();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 95:
/*!***************************************************!*\
  !*** F:/dx文件/code/wp/market_wx/utils/userCard.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getUserCard = getUserCard;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 9));var _service = __webpack_require__(/*! @/common/service.js */ 17);
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function

getUserCard() {return _getUserCard.apply(this, arguments);}function _getUserCard() {_getUserCard = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var res;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              _service.http.get('Xcx/my_card'));case 2:res = _context.sent;
            if (res.data.code == 1) {
              _store.default.commit('setUserInfo', res.data.list);
            }case 4:case "end":return _context.stop();}}}, _callee);}));return _getUserCard.apply(this, arguments);}

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map