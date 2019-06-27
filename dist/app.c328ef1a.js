// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/vue/dist/vue.common.dev.js":[function(require,module,exports) {
var global = arguments[3];
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
'use strict';

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
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

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

var SSR_ATTR = 'data-server-rendered';

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

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
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

{
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
      while (vm) {
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
        tree.push(vm);
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
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
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
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
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
      protoAugment(value, arrayMethods);
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
      if (Dep.target) {
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
      if (customSetter) {
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
  if (isUndef(target) || isPrimitive(target)
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
    warn(
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
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
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
{
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
      warn(
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
    assertObjectType(key, childVal, vm);
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
  {
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
      } else {
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
  } else {
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
  } else {
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
  {
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
  if (warnMissing && !res) {
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
  {
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
  if (isObject(def)) {
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
  {
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

var isUsingMicroTask = false;

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
  isUsingMicroTask = true;
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
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
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

var mark;
var measure;

{
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

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
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
      'prevent conflicts with Vue internals' +
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
      warn(
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

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
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
  return res
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
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
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
        } else {
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
      (slots.default || (slots.default = [])).push(child);
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
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
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
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
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
      warn(
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
      warn(
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
    } else if (key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
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
  {
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
    {
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

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
    warn(
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
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
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
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
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
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
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
      if (Array.isArray(vnode)) {
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
      warn(
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
                "timeout (" + (res.timeout) + "ms)"
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
    {
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

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
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
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
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

  {
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
  {
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
    if (has[id] != null) {
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

      if (!config.async) {
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
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
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
    {
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
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
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
    warn(
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
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
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
    if (getter == null) {
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
    } else {
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
  if (sharedPropertyDefinition.set === noop) {
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
      if (Dep.target) {
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
    {
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
  {
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
    if (config.performance && mark) {
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
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
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
  if (!(this instanceof Vue)
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
    if (name) {
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
        if (type === 'component') {
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
  {
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

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

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

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

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

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

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

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

},{}],"../node_modules/vue/dist/vue.common.js":[function(require,module,exports) {
if ("development" === 'production') {
  module.exports = require('./vue.common.prod.js');
} else {
  module.exports = require('./vue.common.dev.js');
}
},{"./vue.common.dev.js":"../node_modules/vue/dist/vue.common.dev.js"}],"../node_modules/vue-carousel-3d/dist/vue-carousel-3d.min.js":[function(require,module,exports) {
var define;
/*!
 * vue-carousel-3d v0.2.0
 * (c) 2019 Vladimir Bujanovic
 * https://github.com/wlada/vue-carousel-3d#readme
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Carousel3d=e():t.Carousel3d=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Slide=e.Carousel3d=void 0;var i=n(1),o=r(i),s=n(16),a=r(s),u=function(t){t.component("carousel3d",o.default),t.component("slide",a.default)};e.default={install:u},e.Carousel3d=o.default,e.Slide=a.default},function(t,e,n){n(2);var r=n(7)(n(8),n(63),"data-v-c06c963c",null);t.exports=r.exports},function(t,e,n){var r=n(3);"string"==typeof r&&(r=[[t.id,r,""]]),r.locals&&(t.exports=r.locals);n(5)("e749a8c4",r,!0)},function(t,e,n){e=t.exports=n(4)(),e.push([t.id,".carousel-3d-container[data-v-c06c963c]{min-height:1px;width:100%;position:relative;z-index:0;overflow:hidden;margin:20px auto;box-sizing:border-box}.carousel-3d-slider[data-v-c06c963c]{position:relative;margin:0 auto;transform-style:preserve-3d;-webkit-perspective:1000px;-moz-perspective:1000px;perspective:1000px}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=c[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var s=[],i=0;i<n.parts.length;i++)s.push(o(n.parts[i]));c[n.id]={id:n.id,refs:1,parts:s}}}}function i(){var t=document.createElement("style");return t.type="text/css",d.appendChild(t),t}function o(t){var e,n,r=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(r){if(p)return v;r.parentNode.removeChild(r)}if(x){var o=f++;r=h||(h=i()),e=s.bind(null,r,o,!1),n=s.bind(null,r,o,!0)}else r=i(),e=a.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function s(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function a(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document,l=n(6),c={},d=u&&(document.head||document.getElementsByTagName("head")[0]),h=null,f=0,p=!1,v=function(){},x="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){p=n;var i=l(t,e);return r(i),function(e){for(var n=[],o=0;o<i.length;o++){var s=i[o],a=c[s.id];a.refs--,n.push(a)}e?(i=l(t,e),r(i)):i=[];for(var o=0;o<n.length;o++){var a=n[o];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete c[a.id]}}}};var m=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],s=o[0],a=o[1],u=o[2],l=o[3],c={id:t+":"+i,css:a,media:u,sourceMap:l};r[s]?r[s].parts.push(c):n.push(r[s]={id:s,parts:[c]})}return n}},function(t,e){t.exports=function(t,e,n,r){var i,o=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,o=t.default);var a="function"==typeof o?o.options:o;if(e&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns),n&&(a._scopeId=n),r){var u=a.computed||(a.computed={});Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}})}return{esModule:i,exports:o,options:a}}},function(t,e,n){(function(t){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(10),o=r(i),s=n(11),a=r(s),u=n(16),l=r(u),c=function(){};e.default={name:"carousel3d",components:{Controls:a.default,Slide:l.default},props:{count:{type:[Number,String],default:0},perspective:{type:[Number,String],default:35},display:{type:[Number,String],default:5},loop:{type:Boolean,default:!0},animationSpeed:{type:[Number,String],default:500},dir:{type:String,default:"rtl"},width:{type:[Number,String],default:360},height:{type:[Number,String],default:270},border:{type:[Number,String],default:1},space:{type:[Number,String],default:"auto"},startIndex:{type:[Number,String],default:0},clickable:{type:Boolean,default:!0},disable3d:{type:Boolean,default:!1},minSwipeDistance:{type:Number,default:10},inverseScaling:{type:[Number,String],default:300},controlsVisible:{type:Boolean,default:!1},controlsPrevHtml:{type:String,default:"&lsaquo;"},controlsNextHtml:{type:String,default:"&rsaquo;"},controlsWidth:{type:[String,Number],default:50},controlsHeight:{type:[String,Number],default:50},onLastSlide:{type:Function,default:c},onSlideChange:{type:Function,default:c},bias:{type:String,default:"left"},onMainSlideClick:{type:Function,default:c}},data:function(){return{viewport:0,currentIndex:0,total:0,dragOffset:0,dragStartX:0,mousedown:!1,zIndex:998}},mixins:[o.default],watch:{count:function(){this.computeData()}},computed:{isLastSlide:function(){return this.currentIndex===this.total-1},isFirstSlide:function(){return 0===this.currentIndex},isNextPossible:function(){return!(!this.loop&&this.isLastSlide)},isPrevPossible:function(){return!(!this.loop&&this.isFirstSlide)},slideWidth:function(){var e=this.viewport,n=parseInt(this.width)+2*parseInt(this.border,10);return e<n&&t.browser?e:n},slideHeight:function(){var t=parseInt(this.width,10)+2*parseInt(this.border,10),e=parseInt(parseInt(this.height)+2*this.border,10),n=this.calculateAspectRatio(t,e);return this.slideWidth/n},visible:function(){var t=this.display>this.total?this.total:this.display;return t},hasHiddenSlides:function(){return this.total>this.visible},leftIndices:function(){var t=(this.visible-1)/2;t="left"===this.bias.toLowerCase()?Math.ceil(t):Math.floor(t);for(var e=[],n=1;n<=t;n++)e.push("ltr"===this.dir?(this.currentIndex+n)%this.total:(this.currentIndex-n)%this.total);return e},rightIndices:function(){var t=(this.visible-1)/2;t="right"===this.bias.toLowerCase()?Math.ceil(t):Math.floor(t);for(var e=[],n=1;n<=t;n++)e.push("ltr"===this.dir?(this.currentIndex-n)%this.total:(this.currentIndex+n)%this.total);return e},leftOutIndex:function(){var t=(this.visible-1)/2;return t="left"===this.bias.toLowerCase()?Math.ceil(t):Math.floor(t),t++,"ltr"===this.dir?this.total-this.currentIndex-t<=0?-parseInt(this.total-this.currentIndex-t):this.currentIndex+t:this.currentIndex-t},rightOutIndex:function(){var t=(this.visible-1)/2;return t="right"===this.bias.toLowerCase()?Math.ceil(t):Math.floor(t),t++,"ltr"===this.dir?this.currentIndex-t:this.total-this.currentIndex-t<=0?-parseInt(this.total-this.currentIndex-t,10):this.currentIndex+t}},methods:{goNext:function(){this.isNextPossible&&(this.isLastSlide?this.goSlide(0):this.goSlide(this.currentIndex+1))},goPrev:function(){this.isPrevPossible&&(this.isFirstSlide?this.goSlide(this.total-1):this.goSlide(this.currentIndex-1))},goSlide:function(t){var e=this;this.currentIndex=t<0||t>this.total-1?0:t,this.isLastSlide&&(this.onLastSlide!==c&&console.warn("onLastSlide deprecated, please use @last-slide"),this.onLastSlide(this.currentIndex),this.$emit("last-slide",this.currentIndex)),this.$emit("before-slide-change",this.currentIndex),setTimeout(function(){return e.animationEnd()},this.animationSpeed)},goFar:function(t){var e=this,n=t===this.total-1&&this.isFirstSlide?-1:t-this.currentIndex;this.isLastSlide&&0===t&&(n=1);for(var r=n<0?-n:n,i=0,o=0;o<r;){o+=1;var s=1===r?0:i;setTimeout(function(){return n<0?e.goPrev(r):e.goNext(r)},s),i+=this.animationSpeed/r}},animationEnd:function(){this.onSlideChange!==c&&console.warn("onSlideChange deprecated, please use @after-slide-change"),this.onSlideChange(this.currentIndex),this.$emit("after-slide-change",this.currentIndex)},handleMouseup:function(){this.mousedown=!1,this.dragOffset=0},handleMousedown:function(t){t.touches||t.preventDefault(),this.mousedown=!0,this.dragStartX="ontouchstart"in window?t.touches[0].clientX:t.clientX},handleMousemove:function(t){if(this.mousedown){var e="ontouchstart"in window?t.touches[0].clientX:t.clientX,n=this.dragStartX-e;this.dragOffset=n,this.dragOffset>this.minSwipeDistance?(this.handleMouseup(),this.goNext()):this.dragOffset<-this.minSwipeDistance&&(this.handleMouseup(),this.goPrev())}},attachMutationObserver:function(){var t=this,e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(e){var n={attributes:!0,childList:!0,characterData:!0};this.mutationObserver=new e(function(){t.$nextTick(function(){t.computeData()})}),this.$el&&this.mutationObserver.observe(this.$el,n)}},detachMutationObserver:function(){this.mutationObserver&&this.mutationObserver.disconnect()},getSlideCount:function(){return void 0!==this.$slots.default?this.$slots.default.filter(function(t){return void 0!==t.tag}).length:0},calculateAspectRatio:function(t,e){return Math.min(t/e)},computeData:function(t){this.total=this.getSlideCount(),(t||this.currentIndex>=this.total)&&(this.currentIndex=parseInt(this.startIndex)>this.total-1?this.total-1:parseInt(this.startIndex)),this.viewport=this.$el.clientWidth},setSize:function(){this.$el.style.cssText+="height:"+this.slideHeight+"px;",this.$el.childNodes[0].style.cssText+="width:"+this.slideWidth+"px; height:"+this.slideHeight+"px;"}},mounted:function(){this.computeData(!0),this.attachMutationObserver(),this.$isServer||(window.addEventListener("resize",this.setSize),"ontouchstart"in window?(this.$el.addEventListener("touchstart",this.handleMousedown),this.$el.addEventListener("touchend",this.handleMouseup),this.$el.addEventListener("touchmove",this.handleMousemove)):(this.$el.addEventListener("mousedown",this.handleMousedown),this.$el.addEventListener("mouseup",this.handleMouseup),this.$el.addEventListener("mousemove",this.handleMousemove)))},beforeDestroy:function(){this.$isServer||(this.detachMutationObserver(),"ontouchstart"in window?this.$el.removeEventListener("touchmove",this.handleMousemove):this.$el.removeEventListener("mousemove",this.handleMousemove),window.removeEventListener("resize",this.setSize))}}}).call(e,n(9))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function o(t){if(d===clearTimeout)return clearTimeout(t);if((d===r||!d)&&clearTimeout)return d=clearTimeout,clearTimeout(t);try{return d(t)}catch(e){try{return d.call(null,t)}catch(e){return d.call(this,t)}}}function s(){v&&f&&(v=!1,f.length?p=f.concat(p):x=-1,p.length&&a())}function a(){if(!v){var t=i(s);v=!0;for(var e=p.length;e;){for(f=p,p=[];++x<e;)f&&f[x].run();x=-1,e=p.length}f=null,v=!1,o(t)}}function u(t,e){this.fun=t,this.array=e}function l(){}var c,d,h=t.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{d="function"==typeof clearTimeout?clearTimeout:r}catch(t){d=r}}();var f,p=[],v=!1,x=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];p.push(new u(t,e)),1!==p.length||v||i(a)},u.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=l,h.addListener=l,h.once=l,h.off=l,h.removeListener=l,h.removeAllListeners=l,h.emit=l,h.prependListener=l,h.prependOnceListener=l,h.listeners=function(t){return[]},h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={props:{autoplay:{type:Boolean,default:!1},autoplayTimeout:{type:Number,default:2e3},autoplayHoverPause:{type:Boolean,default:!0}},data:function(){return{autoplayInterval:null}},destroyed:function(){this.pauseAutoplay(),this.$isServer||(this.$el.removeEventListener("mouseenter",this.pauseAutoplay),this.$el.removeEventListener("mouseleave",this.startAutoplay))},methods:{pauseAutoplay:function(){this.autoplayInterval&&(this.autoplayInterval=clearInterval(this.autoplayInterval))},startAutoplay:function(){var t=this;this.autoplay&&(this.autoplayInterval=setInterval(function(){"ltr"===t.dir?t.goPrev():t.goNext()},this.autoplayTimeout))}},mounted:function(){!this.$isServer&&this.autoplayHoverPause&&(this.$el.addEventListener("mouseenter",this.pauseAutoplay),this.$el.addEventListener("mouseleave",this.startAutoplay)),this.startAutoplay()}};e.default=n},function(t,e,n){n(12);var r=n(7)(n(14),n(15),"data-v-43e93932",null);t.exports=r.exports},function(t,e,n){var r=n(13);"string"==typeof r&&(r=[[t.id,r,""]]),r.locals&&(t.exports=r.locals);n(5)("06c66230",r,!0)},function(t,e,n){e=t.exports=n(4)(),e.push([t.id,".carousel-3d-controls[data-v-43e93932]{position:absolute;top:50%;height:0;margin-top:-30px;left:0;width:100%;z-index:1000}.next[data-v-43e93932],.prev[data-v-43e93932]{width:60px;position:absolute;z-index:1010;font-size:60px;height:60px;line-height:60px;color:#333;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-decoration:none;top:0}.next[data-v-43e93932]:hover,.prev[data-v-43e93932]:hover{cursor:pointer;opacity:.7}.prev[data-v-43e93932]{left:10px;text-align:left}.next[data-v-43e93932]{right:10px;text-align:right}.disabled[data-v-43e93932],.disabled[data-v-43e93932]:hover{opacity:.2;cursor:default}",""])},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"controls",props:{width:{type:[String,Number],default:50},height:{type:[String,Number],default:60},prevHtml:{type:String,default:"&lsaquo;"},nextHtml:{type:String,default:"&rsaquo;"}},data:function(){return{parent:this.$parent}}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"carousel-3d-controls"},[n("a",{staticClass:"prev",class:{disabled:!t.parent.isPrevPossible},style:"width: "+t.width+"px; height: "+t.height+"px; line-height: "+t.height+"px;",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.parent.goPrev()}}},[n("span",{domProps:{innerHTML:t._s(t.prevHtml)}})]),t._v(" "),n("a",{staticClass:"next",class:{disabled:!t.parent.isNextPossible},style:"width: "+t.width+"px; height: "+t.height+"px; line-height: "+t.height+"px;",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.parent.goNext()}}},[n("span",{domProps:{innerHTML:t._s(t.nextHtml)}})])])},staticRenderFns:[]}},function(t,e,n){n(17);var r=n(7)(n(19),n(62),null,null);t.exports=r.exports},function(t,e,n){var r=n(18);"string"==typeof r&&(r=[[t.id,r,""]]),r.locals&&(t.exports=r.locals);n(5)("1dbacf8a",r,!0)},function(t,e,n){e=t.exports=n(4)(),e.push([t.id,".carousel-3d-slide{position:absolute;opacity:0;visibility:hidden;overflow:hidden;top:0;border-radius:1px;border-color:#000;border-color:rgba(0,0,0,.4);border-style:solid;background-size:cover;background-color:#ccc;display:block;margin:0;box-sizing:border-box;text-align:left}.carousel-3d-slide img{width:100%}.carousel-3d-slide.current{opacity:1!important;visibility:visible!important;transform:none!important;z-index:999}",""])},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(20),o=r(i),s=n(40),a=r(s);e.default={name:"slide",props:{index:{type:Number}},data:function(){return{parent:this.$parent,styles:{},zIndex:999}},computed:{isCurrent:function(){return this.index===this.parent.currentIndex},leftIndex:function(){return this.getSideIndex(this.parent.leftIndices)},rightIndex:function(){return this.getSideIndex(this.parent.rightIndices)},slideStyle:function(){var t={};if(!this.isCurrent){var e=this.leftIndex,n=this.rightIndex;(n>=0||e>=0)&&(t=n>=0?this.calculatePosition(n,!0,this.zIndex):this.calculatePosition(e,!1,this.zIndex),t.opacity=1,t.visibility="visible"),this.parent.hasHiddenSlides&&(this.matchIndex(this.parent.leftOutIndex)?t=this.calculatePosition(this.parent.leftIndices.length-1,!1,this.zIndex):this.matchIndex(this.parent.rightOutIndex)&&(t=this.calculatePosition(this.parent.rightIndices.length-1,!0,this.zIndex)))}return(0,a.default)(t,{"border-width":this.parent.border+"px",width:this.parent.slideWidth+"px",height:this.parent.slideHeight+"px",transition:" transform "+this.parent.animationSpeed+"ms,                opacity "+this.parent.animationSpeed+"ms,                visibility "+this.parent.animationSpeed+"ms"})},computedClasses:function(){var t;return t={},(0,o.default)(t,"left-"+(this.leftIndex+1),this.leftIndex>=0),(0,o.default)(t,"right-"+(this.rightIndex+1),this.rightIndex>=0),(0,o.default)(t,"current",this.isCurrent),t}},methods:{getSideIndex:function(t){var e=this,n=-1;return t.forEach(function(t,r){e.matchIndex(t)&&(n=r)}),n},matchIndex:function(t){return t>=0?this.index===t:this.parent.total+t===this.index},calculatePosition:function(t,e,n){var r=this.parent.disable3d?0:parseInt(this.parent.inverseScaling)+100*(t+1),i=this.parent.disable3d?0:parseInt(this.parent.perspective),o="auto"===this.parent.space?parseInt((t+1)*(this.parent.width/1.5),10):parseInt((t+1)*this.parent.space,10),s=e?"translateX("+o+"px) translateZ(-"+r+"px) rotateY(-"+i+"deg)":"translateX(-"+o+"px) translateZ(-"+r+"px) rotateY("+i+"deg)",a="auto"===this.parent.space?0:parseInt((t+1)*this.parent.space);return{transform:s,top:a,zIndex:n-(Math.abs(t)+1)}},goTo:function(){this.isCurrent?this.parent.onMainSlideClick():this.parent.clickable===!0&&this.parent.goFar(this.index)}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(21),o=r(i);e.default=function(t,e,n){return e in t?(0,o.default)(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},function(t,e,n){t.exports={default:n(22),__esModule:!0}},function(t,e,n){n(23);var r=n(26).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(24);r(r.S+r.F*!n(34),"Object",{defineProperty:n(30).f})},function(t,e,n){var r=n(25),i=n(26),o=n(27),s=n(29),a=n(39),u="prototype",l=function(t,e,n){var c,d,h,f=t&l.F,p=t&l.G,v=t&l.S,x=t&l.P,m=t&l.B,g=t&l.W,y=p?i:i[e]||(i[e]={}),b=y[u],w=p?r:v?r[e]:(r[e]||{})[u];p&&(n=e);for(c in n)d=!f&&w&&void 0!==w[c],d&&a(y,c)||(h=d?w[c]:n[c],y[c]=p&&"function"!=typeof w[c]?n[c]:m&&d?o(h,r):g&&w[c]==h?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[u]=t[u],e}(h):x&&"function"==typeof h?o(Function.call,h):h,x&&((y.virtual||(y.virtual={}))[c]=h,t&l.R&&b&&!b[c]&&s(b,c,h)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(28);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(30),i=n(38);t.exports=n(34)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(31),i=n(33),o=n(37),s=Object.defineProperty;e.f=n(34)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(32);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(34)&&!n(35)(function(){return 7!=Object.defineProperty(n(36)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(35)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(32),i=n(25).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var r=n(32);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports={default:n(41),__esModule:!0}},function(t,e,n){n(42),t.exports=n(26).Object.assign},function(t,e,n){var r=n(24);r(r.S+r.F,"Object",{assign:n(43)})},function(t,e,n){"use strict";var r=n(44),i=n(59),o=n(60),s=n(61),a=n(47),u=Object.assign;t.exports=!u||n(35)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=r})?function(t,e){for(var n=s(t),u=arguments.length,l=1,c=i.f,d=o.f;u>l;)for(var h,f=a(arguments[l++]),p=c?r(f).concat(c(f)):r(f),v=p.length,x=0;v>x;)d.call(f,h=p[x++])&&(n[h]=f[h]);return n}:u},function(t,e,n){var r=n(45),i=n(58);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(39),i=n(46),o=n(50)(!1),s=n(54)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),u=0,l=[];for(n in a)n!=s&&r(a,n)&&l.push(n);for(;e.length>u;)r(a,n=e[u++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var r=n(47),i=n(49);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(48);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(46),i=n(51),o=n(53);t.exports=function(t){return function(e,n,s){var a,u=r(e),l=i(u.length),c=o(s,l);if(t&&n!=n){for(;l>c;)if(a=u[c++],a!=a)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(52),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(52),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(55)("keys"),i=n(57);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(26),i=n(25),o="__core-js_shared__",s=i[o]||(i[o]={});(t.exports=function(t,e){return s[t]||(s[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(56)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!0},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(49);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"carousel-3d-slide",class:t.computedClasses,style:t.slideStyle,on:{click:function(e){return t.goTo()}}},[t._t("default",null,{index:t.index,isCurrent:t.isCurrent,leftIndex:t.leftIndex,rightIndex:t.rightIndex})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"carousel-3d-container",style:{height:this.slideHeight+"px"}},[n("div",{staticClass:"carousel-3d-slider",style:{width:this.slideWidth+"px",height:this.slideHeight+"px"}},[t._t("default")],2),t._v(" "),t.controlsVisible?n("controls",{attrs:{"next-html":t.controlsNextHtml,"prev-html":t.controlsPrevHtml,width:t.controlsWidth,height:t.controlsHeight}}):t._e()],1)},staticRenderFns:[]}}])});
},{}],"../node_modules/vue-router/dist/vue-router.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
  * vue-router v3.0.6
  * (c) 2019 Evan You
  * @license MIT
  */

/*  */
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}

function warn(condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn("[vue-router] " + message);
  }
}

function isError(err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1;
}

function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data; // used by devtools to display a router-view badge

    data.routerView = true; // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots

    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {}); // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.

    var depth = 0;
    var inactive = false;

    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;

      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }

        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }

      parent = parent.$parent;
    }

    data.routerViewDepth = depth; // render previous view if the tree is inactive and kept-alive

    if (inactive) {
      return h(cache[name], data, children);
    }

    var matched = route.matched[depth]; // render empty node if no matched route

    if (!matched) {
      cache[name] = null;
      return h();
    }

    var component = cache[name] = matched.components[name]; // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks

    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];

      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    } // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;

    (data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    }; // register instance in init hook
    // in case kept-alive component be actived when routes changed


    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name]) {
        matched.instances[name] = vnode.componentInstance;
      }
    }; // resolve props


    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);

    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass); // pass non-declared props as attrs

      var attrs = data.attrs = data.attrs || {};

      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children);
  }
};

function resolveProps(route, config) {
  switch (typeof config) {
    case 'undefined':
      return;

    case 'object':
      return config;

    case 'function':
      return config(route);

    case 'boolean':
      return config ? route.params : undefined;

    default:
      if ("development" !== 'production') {
        warn(false, "props in \"" + route.path + "\" is a " + typeof config + ", " + "expecting an object, function or boolean.");
      }

  }
}
/*  */


var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function (c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function (str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};
  var parse = _parseQuery || parseQuery;
  var parsedQuery;

  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }

  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }

  return parsedQuery;
}

function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}
/*  */


var trailingSlashRE = /\/?$/;

function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var query = location.query || {};

  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };

  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }

  return Object.freeze(route);
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === 'object') {
    var res = {};

    for (var key in value) {
      res[key] = clone(value[key]);
    }

    return res;
  } else {
    return value;
  }
} // the starting route that represents the initial state


var START = createRoute(null, {
  path: '/'
});

function formatMatch(record) {
  var res = [];

  while (record) {
    res.unshift(record);
    record = record.parent;
  }

  return res;
}

function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;
  if (query === void 0) query = {};
  var hash = ref.hash;
  if (hash === void 0) hash = '';
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash;
}

function isSameRoute(a, b) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') && a.hash === b.hash && isObjectEqual(a.query, b.query);
  } else if (a.name && b.name) {
    return a.name === b.name && a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params);
  } else {
    return false;
  }
}

function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {}; // handle null value #1566

  if (!a || !b) {
    return a === b;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key]; // check nested equality

    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal);
    }

    return String(aVal) === String(bVal);
  });
}

function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, '/').indexOf(target.path.replace(trailingSlashRE, '/')) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}

function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }

  return true;
}
/*  */
// work around weird flow bug


var toTypes = [String, Object];
var eventTypes = [String, Array];
var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render(h) {
    var this$1 = this;
    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass; // Support global empty active class

    var activeClassFallback = globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? 'router-link-exact-active' : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = location.path ? createRoute(null, location, null, router) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = {
      click: guardEvent
    };

    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = {
        href: href
      };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);

      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default);
  }
};

function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  } // don't redirect when preventDefault called


  if (e.defaultPrevented) {
    return;
  } // don't redirect on right click


  if (e.button !== undefined && e.button !== 0) {
    return;
  } // don't redirect if `target="_blank"`


  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');

    if (/\b_blank\b/i.test(target)) {
      return;
    }
  } // this may be a Weex event which doesn't have this method


  if (e.preventDefault) {
    e.preventDefault();
  }

  return true;
}

function findAnchor(children) {
  if (children) {
    var child;

    for (var i = 0; i < children.length; i++) {
      child = children[i];

      if (child.tag === 'a') {
        return child;
      }

      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}

var _Vue;

function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }

  install.installed = true;
  _Vue = Vue;

  var isDef = function (v) {
    return v !== undefined;
  };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;

    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;

        this._router.init(this);

        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }

      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get: function get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, '$route', {
    get: function get() {
      return this._routerRoot._route;
    }
  });
  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);
  var strats = Vue.config.optionMergeStrategies; // use the same hook merging strategy for route hooks

  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}
/*  */


var inBrowser = typeof window !== 'undefined';
/*  */

function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);

  if (firstChar === '/') {
    return relative;
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative;
  }

  var stack = base.split('/'); // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)

  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  } // resolve relative path


  var segments = relative.replace(/^\//, '').split('/');

  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];

    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  } // ensure leading slash


  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/');
}

function parsePath(path) {
  var hash = '';
  var query = '';
  var hashIndex = path.indexOf('#');

  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');

  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  };
}

function cleanPath(path) {
  return path.replace(/\/\//g, '/');
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};
/**
 * Expose `pathToRegexp`.
 */


var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options));
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
/*  */
// $flow-disable-line

var regexpCompileCache = Object.create(null);

function fillParams(path, params, routeMsg) {
  params = params || {};

  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path)); // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}

    if (params.pathMatch) {
      params[0] = params.pathMatch;
    }

    return filler(params, {
      pretty: true
    });
  } catch (e) {
    if ("development" !== 'production') {
      warn(false, "missing param for " + routeMsg + ": " + e.message);
    }

    return '';
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}
/*  */


function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || []; // $flow-disable-line

  var pathMap = oldPathMap || Object.create(null); // $flow-disable-line

  var nameMap = oldNameMap || Object.create(null);
  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  }); // ensure wildcard routes are always at the end

  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  };
}

function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;

  if ("development" !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(typeof route.component !== 'string', "route config \"component\" for path: " + String(path || name) + " cannot be a " + "string id. Use an actual component instead.");
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || {
      default: route.component
    },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : {
      default: route.props
    }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if ("development" !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) {
        return /^\/?$/.test(child.path);
      })) {
        warn(false, "Named Route '" + route.name + "' has a default child route. " + "When navigating to this named route (:to=\"{name: '" + route.name + "'\"), " + "the default child route will not be rendered. Remove the name from " + "this route and use the name of the default child route for named " + "links instead.");
      }
    }

    route.children.forEach(function (child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(false, "Duplicate named routes definition: " + "{ name: \"" + name + "\", path: \"" + record.path + "\" }");
    }
  }
}

function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);

  if ("development" !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], "Duplicate param keys in route with path: \"" + path + "\"");
      keys[key.name] = true;
    });
  }

  return regex;
}

function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, '');
  }

  if (path[0] === '/') {
    return path;
  }

  if (parent == null) {
    return path;
  }

  return cleanPath(parent.path + "/" + path);
}
/*  */


function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === 'string' ? {
    path: raw
  } : raw; // named target

  if (next._normalized) {
    return next;
  } else if (next.name) {
    return extend({}, raw);
  } // relative params


  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);

    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, "path " + current.path);
    } else if ("development" !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }

    return next;
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = current && current.path || '/';
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
  var query = resolveQuery(parsedPath.query, next.query, router && router.options.parseQuery);
  var hash = next.hash || parsedPath.hash;

  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  };
}
/*  */


function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];

      if ("development" !== 'production') {
        warn(record, "Route with name '" + name + "' does not exist");
      }

      if (!record) {
        return _createRoute(null, location);
      }

      var paramNames = record.regex.keys.filter(function (key) {
        return !key.optional;
      }).map(function (key) {
        return key.name;
      });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, "named route \"" + name + "\"");
        return _createRoute(record, location, redirectedFrom);
      }
    } else if (location.path) {
      location.params = {};

      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];

        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    } // no match


    return _createRoute(null, location);
  }

  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function' ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = {
        path: redirect
      };
    }

    if (!redirect || typeof redirect !== 'object') {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];

      if ("development" !== 'production') {
        assert(targetRecord, "redirect failed: named route \"" + name + "\" not found.");
      }

      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location);
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record); // 2. resolve params

      var resolvedPath = fillParams(rawPath, params, "redirect route with path \"" + rawPath + "\""); // 3. rematch with existing query and hash

      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location);
    } else {
      if ("development" !== 'production') {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect));
      }

      return _createRoute(null, location);
    }
  }

  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, "aliased route with path \"" + matchAs + "\"");
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });

    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }

    return _createRoute(null, location);
  }

  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }

    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }

    return createRoute(record, location, redirectedFrom, router);
  }

  return {
    match: match,
    addRoutes: addRoutes
  };
}

function matchRoute(regex, path, params) {
  var m = path.match(regex);

  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];

    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true;
}

function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true);
}
/*  */


var positionStore = Object.create(null);

function setupScroll() {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  window.history.replaceState({
    key: getStateKey()
  }, '', window.location.href.replace(window.location.origin, ''));
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();

    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }

  var behavior = router.options.scrollBehavior;

  if (!behavior) {
    return;
  }

  if ("development" !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  } // wait until re-render finishes before scrolling


  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(router, to, from, isPop ? position : null);

    if (!shouldScroll) {
      return;
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition(shouldScroll, position);
      }).catch(function (err) {
        if ("development" !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition() {
  var key = getStateKey();

  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition() {
  var key = getStateKey();

  if (key) {
    return positionStore[key];
  }
}

function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}

function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}

function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}

function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}

function isNumber(v) {
  return typeof v === 'number';
}

function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';

  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);

    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}
/*  */


var supportsPushState = inBrowser && function () {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }

  return window.history && 'pushState' in window.history;
}(); // use User Timing api (if present) for more accurate key precision


var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;

var _key = genKey();

function genKey() {
  return Time.now().toFixed(3);
}

function getStateKey() {
  return _key;
}

function setStateKey(key) {
  _key = key;
}

function pushState(url, replace) {
  saveScrollPosition(); // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls

  var history = window.history;

  try {
    if (replace) {
      history.replaceState({
        key: _key
      }, '', url);
    } else {
      _key = genKey();
      history.pushState({
        key: _key
      }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState(url) {
  pushState(url, true);
}
/*  */


function runQueue(queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };

  step(0);
}
/*  */


function resolveAsyncComponents(matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;
    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;
        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          } // save resolved on async factory in case it's used elsewhere


          def.resolved = typeof resolvedDef === 'function' ? resolvedDef : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;

          if (pending <= 0) {
            next();
          }
        });
        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);

          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;

        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }

        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;

            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) {
      next();
    }
  };
}

function flatMapComponents(matched, fn) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return fn(m.components[key], m.instances[key], m, key);
    });
  }));
}

function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === 'Module';
} // in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.


function once(fn) {
  var called = false;
  return function () {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    if (called) {
      return;
    }

    called = true;
    return fn.apply(this, args);
  };
}
/*  */


var History = function History(router, base) {
  this.router = router;
  this.base = normalizeBase(base); // start with a route object that stands for "nowhere"

  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen(cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);

    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1 = this;
  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL(); // fire ready cbs once

    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }

    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) {
        cb(err);
      });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1 = this;
  var current = this.current;

  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }

    onAbort && onAbort(err);
  };

  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  route.matched.length === current.matched.length) {
    this.ensureURL();
    return abort();
  }

  var ref = resolveQueue(this.current.matched, route.matched);
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;
  var queue = [].concat( // in-component leave guards
  extractLeaveGuards(deactivated), // global before hooks
  this.router.beforeHooks, // in-component update hooks
  extractUpdateHooks(updated), // in-config enter guards
  activated.map(function (m) {
    return m.beforeEnter;
  }), // async components
  resolveAsyncComponents(activated));
  this.pending = route;

  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort();
    }

    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (typeof to === 'string' || typeof to === 'object' && (typeof to.path === 'string' || typeof to.name === 'string')) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();

          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];

    var isValid = function () {
      return this$1.current === route;
    }; // wait until async components are resolved before
    // extracting in-component enter guards


    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort();
      }

      this$1.pending = null;
      onComplete(route);

      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute(route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/'; // strip full URL origin

      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  } // make sure there's the starting slash


  if (base.charAt(0) !== '/') {
    base = '/' + base;
  } // remove trailing slash


  return base.replace(/\/$/, '');
}

function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);

  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }

  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}

function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);

    if (guard) {
      return Array.isArray(guard) ? guard.map(function (guard) {
        return bind(guard, instance, match, key);
      }) : bind(guard, instance, match, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}

function extractGuard(def, key) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }

  return def.options[key];
}

function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true);
}

function extractUpdateHooks(updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard);
}

function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}

function extractEnterGuards(activated, cbs, isValid) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid);
  });
}

function bindEnterGuard(guard, match, key, cbs, isValid) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);

      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    });
  };
}

function poll(cb, // somehow flow cannot infer this is a function
instances, key, isValid) {
  if (instances[key] && !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
      cb(instances[key]);
    } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}
/*  */


var HTML5History =
/*@__PURE__*/
function (History$$1) {
  function HTML5History(router, base) {
    var this$1 = this;
    History$$1.call(this, router, base);
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current; // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.

      var location = getLocation(this$1.base);

      if (this$1.current === START && location === initLocation) {
        return;
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if (History$$1) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create(History$$1 && History$$1.prototype);
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go(n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL(push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };

  return HTML5History;
}(History);

function getLocation(base) {
  var path = decodeURI(window.location.pathname);

  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }

  return (path || '/') + window.location.search + window.location.hash;
}
/*  */


var HashHistory =
/*@__PURE__*/
function (History$$1) {
  function HashHistory(router, base, fallback) {
    History$$1.call(this, router, base); // check history fallback deeplinking

    if (fallback && checkFallback(this.base)) {
      return;
    }

    ensureSlash();
  }

  if (History$$1) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  HashHistory.prototype.constructor = HashHistory; // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early

  HashHistory.prototype.setupListeners = function setupListeners() {
    var this$1 = this;
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;

      if (!ensureSlash()) {
        return;
      }

      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }

        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go(n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL(push) {
    var current = this.current.fullPath;

    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };

  return HashHistory;
}(History);

function checkFallback(base) {
  var location = getLocation(base);

  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true;
  }
}

function ensureSlash() {
  var path = getHash();

  if (path.charAt(0) === '/') {
    return true;
  }

  replaceHash('/' + path);
  return false;
}

function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#'); // empty path

  if (index < 0) {
    return '';
  }

  href = href.slice(index + 1); // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708

  var searchIndex = href.indexOf('?');

  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');

    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else {
      href = decodeURI(href);
    }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href;
}

function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
/*  */


var AbstractHistory =
/*@__PURE__*/
function (History$$1) {
  function AbstractHistory(router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if (History$$1) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create(History$$1 && History$$1.prototype);
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace(location, onComplete, onAbort) {
    var this$1 = this;
    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go(n) {
    var this$1 = this;
    var targetIndex = this.index + n;

    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }

    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/';
  };

  AbstractHistory.prototype.ensureURL = function ensureURL() {// noop
  };

  return AbstractHistory;
}(History);
/*  */


var VueRouter = function VueRouter(options) {
  if (options === void 0) options = {};
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;

  if (this.fallback) {
    mode = 'hash';
  }

  if (!inBrowser) {
    mode = 'abstract';
  }

  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break;

    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break;

    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break;

    default:
      if ("development" !== 'production') {
        assert(false, "invalid mode: " + mode);
      }

  }
};

var prototypeAccessors = {
  currentRoute: {
    configurable: true
  }
};

VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current;
};

VueRouter.prototype.init = function init(app
/* Vue component instance */
) {
  var this$1 = this;
  "development" !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(VueRouter)` " + "before creating root instance.");
  this.apps.push(app); // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639

  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);

    if (index > -1) {
      this$1.apps.splice(index, 1);
    } // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused


    if (this$1.app === app) {
      this$1.app = this$1.apps[0] || null;
    }
  }); // main app previously initialized
  // return as we don't need to set up new history listener

  if (this.app) {
    return;
  }

  this.app = app;
  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };

    history.transitionTo(history.getCurrentLocation(), setupHashListener, setupHashListener);
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};

VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};

VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};

VueRouter.prototype.onReady = function onReady(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError(errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back() {
  this.go(-1);
};

VueRouter.prototype.forward = function forward() {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;

  if (!route) {
    return [];
  }

  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key];
    });
  }));
};

VueRouter.prototype.resolve = function resolve(to, current, append) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};

VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);

  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties(VueRouter.prototype, prototypeAccessors);

function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);

    if (i > -1) {
      list.splice(i, 1);
    }
  };
}

function createHref(base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path;
}

VueRouter.install = install;
VueRouter.version = '3.0.6';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

var _default = VueRouter;
exports.default = _default;
},{}],"assets/images/Intro.mp4":[function(require,module,exports) {
module.exports = "/Intro.ce954824.mp4";
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"components/Home.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = {
  data: function data() {
    return {};
  }
};
exports.default = _default;
        var $ca6720 = exports.default || module.exports;
      
      if (typeof $ca6720 === 'function') {
        $ca6720 = $ca6720.options;
      }
    
        /* template */
        Object.assign($ca6720, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "big-container video__container" }, [
    _c(
      "div",
      { staticClass: "container__button" },
      [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "router-link",
          { staticClass: "button button--home", attrs: { to: "/intro" } },
          [_vm._v("Commencer")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "video",
      { staticClass: "video", attrs: { autoplay: "", loop: "" } },
      [
        _c("source", {
          attrs: { src: "/Intro.ce954824.mp4" }
        })
      ]
    )
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-ca6720",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$ca6720', $ca6720);
          } else {
            api.reload('$ca6720', $ca6720);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./../assets/images/Intro.mp4":[["Intro.ce954824.mp4","assets/images/Intro.mp4"],"assets/images/Intro.mp4"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"components/Intro.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = {
  data: function data() {
    return {
      message: "intro"
    };
  }
};
exports.default = _default;
        var $0c4d4b = exports.default || module.exports;
      
      if (typeof $0c4d4b === 'function') {
        $0c4d4b = $0c4d4b.options;
      }
    
        /* template */
        Object.assign($0c4d4b, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "big-container" }, [
    _c(
      "div",
      { staticClass: "container__intro" },
      [
        _vm._m(0),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _vm._m(2),
        _vm._v(" "),
        _c("router-link", { staticClass: "button", attrs: { to: "/map" } }, [
          _vm._v("\n      Se rendre à Pripyat\n      "),
          _c("img", {
            attrs: { src: "/map-min.7ca13b0b.png", alt: "map" }
          })
        ])
      ],
      1
    ),
    _vm._v(" "),
    _c("p", { staticClass: "disclaimer__intro" }, [
      _vm._v(
        "Ce site à été réalisé à des fins pédagogiques dans le cadre du cursus Bachelor de l’école HETIC. Les contenus présentés ne sont en aucun cas exploités à des fins commerciales et ne seront pas publiés."
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v(
        "Pendant 15 ans, seuls les 56 premiers décès ont étés reconnus par les autorités. "
      ),
      _c("span", [_vm._v("Tchernobyl")]),
      _vm._v(
        " est une catastrophe dont l'ampleur est encore constituée de zones d’ombres"
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("Découvrez les "),
      _c("span", [_vm._v("témoignages")]),
      _vm._v(" poignants des "),
      _c("span", [_vm._v("habitants de Prypiat")]),
      _vm._v(
        "  et les acteurs majeures, au premier rang de la catastrophe. À travers leurs récits, vous serez "
      ),
      _c("span", [_vm._v("plongez dans l’histoire")]),
      _vm._v(" qu’ils nous racontent, l’histoire qu’ils ont vécu.")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v(
        "Immergez vous dans la ville de Prypiat et allez à leur rencontre à fin de receuillir les différents témoignages en cliquant sur la "
      ),
      _c("span", [_vm._v("carte")]),
      _vm._v(".")
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-0c4d4b",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$0c4d4b', $0c4d4b);
          } else {
            api.reload('$0c4d4b', $0c4d4b);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./../assets/images/map-min.png":[["map-min.7ca13b0b.png","assets/images/map-min.png"],"assets/images/map-min.png"],"./../assets/images/bg__intro-min.png":[["bg__intro-min.4cd81d6c.png","assets/images/bg__intro-min.png"],"assets/images/bg__intro-min.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"assets/images/igor.mp4":[function(require,module,exports) {
module.exports = "/igor.1b54c3dc.mp4";
},{}],"assets/images/outroIgor.mp4":[function(require,module,exports) {
module.exports = "/outroIgor.fe28a8be.mp4";
},{}],"assets/images/*.mp4":[function(require,module,exports) {
module.exports = {
  "Intro": require("./Intro.mp4"),
  "igor": require("./igor.mp4"),
  "outroIgor": require("./outroIgor.mp4")
};
},{"./Intro.mp4":"assets/images/Intro.mp4","./igor.mp4":"assets/images/igor.mp4","./outroIgor.mp4":"assets/images/outroIgor.mp4"}],"data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mp4 = require('../app/assets/images/*.mp4');

var _default = {
  "steps": [{
    "id": 1,
    "background__1": "https://i.goopics.net/OKPj7.png",
    "title": "Igor Kostine",
    "profession": "Photographe",
    "texte__1": "Surnommé << l'Homme légendaire >> par le Washington Post, Igor Kostine est un témoin capital de la catastrophe de Tchernobyl. Le 26 avril 1986, quelques heures seulement après l'explosion, il survole la centrale.",
    "texte__2": "Surpris par l'ampleur de la catastrophe et par le silence des autorités, Igor Kostine décide de rester sur place et de vivre au milieu des 800 000 << liquidateurs >> qui se succéderont sur le site de l'accident.",
    "texte__3": "Lui-même irradié, il n'aura de cesse, vingt années durant, de photographier la centrale et la zone interdite qui l'entoure. Son histoire se confond avec celle de Tchernobyl. Il a vu l'évacuation des villages, le désespoir et le courage des populations, la construction du sarcophage, les hommes déplaçant à mains nues des blocs radioactifs, les cimetières de machines, les jardins et les vergers contaminés redevenus des terres sauvages où l'homme n'a plus sa place...",
    "background__2": "https://i.goopics.net/jv1my.png",
    "sentence__1": "<< Le soir, quand je développais la pellicule, je la trouvais mouchetée de tâches à cause de la radiation. >>",
    "sentence__2": "<< Igor, pour utiliser de manière plus efficace la main-d’œuvre, prends une photo panoramique du toit pour que les soldats l’étudient et sachent où exactement aller quand ils sortent de l’ascenseur afin qu’ils ne fassent pas de mouvements inutiles. >>",
    "sentence__3": "-Nikolaï Tarakanov",
    "sentence__4": ", Général de Division ayant mené l’operation de décontamination du toit.",
    "sentence__5": "<< À six heures du matin, nous avons embarqué dans un hélicoptère militaire à l’aide duquel les soldats devaient s’approcher du tuyau. >>",
    "background__3": "https://i.goopics.net/4vxj8.png",
    "sentence__6": "<< J’ai survolé 50 fois le réacteur numéro 4 en hélicoptère. J’ai pris des photos à toutes les étapes de la liquidation de cette catastrophe. J’ai photographié des gens descendant dans la mine, les soldats « liquidateurs » travaillant sur le toit de la centrale.” Personne n’avait jamais vu une chose pareille. >>",
    "sentence__7": "<< Au début, le Japon et l’Allemagne avaient envoyé des robots, mais à cause de l’irradiation, ils se sont bloqués. Je les ai photographiés depuis l’hélicoptère pendant qu’ils s’écroulaient. Après cela, des milliers de soldats ont dû nettoyer le graphite radioactif et le toit du troisième bloc de la centrale d’une surface de 250 mètres carrés. >>",
    "background__slider": "https://i.goopics.net/K8wm3.png",
    "image__slider": "https://i.goopics.net/VvmDV.png",
    "image__slider__2": "https://i.goopics.net/qvpGk.png",
    "image__slider__3": "https://i.goopics.net/kjVky.png",
    "image__slider__4": "https://i.goopics.net/aOjKZ.png",
    "image__slider__5": "https://i.goopics.net/gE1Ko.png",
    "video__1": mp4.igor,
    "video__2": mp4.outroIgor
  }, {
    "id": 2,
    "background__1": "https://i.goopics.net/aOg1Z.png",
    "title": "Yuri Korneev",
    "profession": "Opérateur turbine de la centrale",
    "texte__1": "<< Au moment où la turbine a cessé de fonctionner, il y a eu une explosion soudaine dans la zone du corridor de la tuyauterie. Je l'ai vu de mes propres yeux, entendu de mes propres oreilles. J'ai vu des morceaux du mur en béton armé commencer à s'effriter et le toit en béton armé de notre Turbine 7 a commencé à tomber. >>",
    "background__2": "https://i.goopics.net/eQmA5.png",
    "sentence__2": "<< C'était tellement inattendu. Il était difficile de comprendre ce qui se passait. L'explosion et l'effondrement du toit n'ont pris qu'une minute, peut-être même moins. Immédiatement après, Boris Rogoshin, chef de quart, et l’ingénieur en chef adjoint (maintenant décédé) se sont précipités dans la salle des turbines depuis le centre de contrôle. On m'a ordonné de m'occuper de Turbine 8 et de ne faire attention à rien d'autre. >>",
    "background__3": "https://i.goopics.net/dR7EL.png",
    "sentence__6": "<< J'étais complètement dans le noir. . . Pendant que j'étais occupé avec la turbine, un électricien, Baranov - qui est décédé plus tard à l'hôpital de Moscou - s'est précipité et a commencé à pomper l'hydrogène qui a refroidi le générateur à turbine. Ses actions ont empeché une autre explosion. >>",
    "background__slider": "https://i.goopics.net/K8wm3.png",
    "image__slider": "https://i.goopics.net/dRXaO.png",
    "image__slider__2": "https://i.goopics.net/NvKQY.png",
    "image__slider__3": "https://i.goopics.net/kjrwb.png",
    "image__slider__4": "https://i.goopics.net/VvQbZ.png",
    "image__slider__5": "https://i.goopics.net/dRXaE.png",
    "video__2": mp4.outroIgor,
    "image__bg": "https://i.goopics.net/K8DmD.png"
  }]
};
exports.default = _default;
},{"../app/assets/images/*.mp4":"assets/images/*.mp4"}],"components/Sound.vue":[function(require,module,exports) {

        var $9c9556 = exports.default || module.exports;
      
      if (typeof $9c9556 === 'function') {
        $9c9556 = $9c9556.options;
      }
    
        /* template */
        Object.assign($9c9556, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("audio", { attrs: { autoplay: "", loop: "" } }, [
    _c("source", { attrs: { src: _vm.step.soundAmbient, type: "audio/mpeg" } })
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$9c9556', $9c9556);
          } else {
            api.reload('$9c9556', $9c9556);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"assets/images/ambiance.mp3":[function(require,module,exports) {
module.exports = "/ambiance.d940f3b5.mp3";
},{}],"components/Map.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("../data.js"));

var _Sound = _interopRequireDefault(require("./Sound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//
//
//
//
//
//
//
//
var _default = {
  methods: {
    kostin: function kostin(event) {
      var kostin = document.querySelector('.kostin');
      var routerKostin = document.querySelector('.router_igor');
      var yuri = document.querySelector('.yuri');
      var routerYuri = document.querySelector('.router_yuri');
      var tatiana = document.querySelector('.tatiana');
      var routerTatiana = document.querySelector('.router_tatiana');
      var liquidateur = document.querySelector('.liquidateur');
      var routerLiquidateur = document.querySelector('.router_yuri');

      if (kostin.style.opacity == 0) {
        kostin.style.opacity = '1';
        routerKostin.style.display = 'block';
        routerKostin.style.position = 'absolute';
        routerKostin.style.right = '30px';
        routerKostin.style.bottom = '21px';
        yuri.style.opacity = '0';
        routerYuri.style.display = 'none';
        tatiana.style.opacity = '0';
        routerTatiana.style.display = 'none';
        liquidateur.style.opacity = '0';
        routerLiquidateur.style.display = 'none';
      } else {
        kostin.style.opacity = '0';
        routerKostin.style.display = 'none';
      }
    },
    yuri: function yuri() {
      var yuri = document.querySelector('.yuri');
      var routerYuri = document.querySelector('.router_yuri');
      var kostin = document.querySelector('.kostin');
      var routerKostin = document.querySelector('.router_igor');
      var tatiana = document.querySelector('.tatiana');
      var routerTatiana = document.querySelector('.router_tatiana');
      var liquidateur = document.querySelector('.liquidateur');
      var routerLiquidateur = document.querySelector('.router_liquidateur');

      if (yuri.style.opacity == 0) {
        yuri.style.opacity = '1';
        routerYuri.style.display = 'block';
        routerYuri.style.position = 'absolute';
        routerYuri.style.right = '27px';
        routerYuri.style.bottom = '21px';
        routerYuri.style.zIndex = '10';
        kostin.style.opacity = '0';
        routerKostin.style.display = 'none';
        tatiana.style.opacity = '0';
        routerTatiana.style.display = 'none';
        liquidateur.style.opacity = '0';
        routerLiquidateur.style.display = 'none';
      } else {
        yuri.style.opacity = '0';
        routerYuri.style.display = 'none';
      }
    },
    tatiana: function tatiana() {
      var tatiana = document.querySelector('.tatiana');
      var routerTatiana = document.querySelector('.router_tatiana');
      var yuri = document.querySelector('.yuri');
      var routerYuri = document.querySelector('.router_yuri');
      var kostin = document.querySelector('.kostin');
      var routerKostin = document.querySelector('.router_igor');
      var liquidateur = document.querySelector('.liquidateur');
      var routerLiquidateur = document.querySelector('.router_yuri');

      if (tatiana.style.opacity == 0) {
        tatiana.style.opacity = '1';
        routerTatiana.style.display = 'block';
        routerTatiana.style.position = 'absolute';
        routerTatiana.style.right = '27px';
        routerTatiana.style.bottom = '20px';
        yuri.style.opacity = '0';
        routerYuri.style.display = 'none';
        kostin.style.opacity = '0';
        routerKostin.style.display = 'none';
        liquidateur.style.opacity = '0';
        routerLiquidateur.style.display = 'none';
      } else {
        tatiana.style.opacity = '0';
        routerTatiana.style.display = 'none';
      }
    },
    liquidateur: function liquidateur() {
      var liquidateur = document.querySelector('.liquidateur');
      var routerLiquidateur = document.querySelector('.router_liquidateur');
      var tatiana = document.querySelector('.tatiana');
      var routerTatiana = document.querySelector('.router_tatiana');
      var yuri = document.querySelector('.yuri');
      var routerYuri = document.querySelector('.router_yuri');
      var kostin = document.querySelector('.kostin');
      var routerKostin = document.querySelector('.router_igor');

      if (liquidateur.style.opacity == 0) {
        liquidateur.style.opacity = '1';
        routerLiquidateur.style.display = 'block';
        routerLiquidateur.style.position = 'absolute';
        routerLiquidateur.style.right = '29px';
        routerLiquidateur.style.bottom = '13px';
        yuri.style.opacity = '0';
        routerYuri.style.display = 'none';
        tatiana.style.opacity = '0';
        routerTatiana.style.display = 'none';
        kostin.style.opacity = '0';
        routerKostin.style.display = 'none';
      } else {
        liquidateur.style.opacity = '0';
        routerLiquidateur.style.display = 'none';
      }
    }
  },
  mounted: function mounted() {
    var audio = new Audio(require('../assets/images/ambiance.mp3'));
    audio.play();
    audio.loop = true;
  }
};
exports.default = _default;
        var $d58708 = exports.default || module.exports;
      
      if (typeof $d58708 === 'function') {
        $d58708 = $d58708.options;
      }
    
        /* template */
        Object.assign($d58708, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "big-container" }, [
    _c("section", { staticClass: "maps" }, [
      _c(
        "svg",
        {
          attrs: {
            width: "100%",
            height: "100vh",
            viewBox: "0 0 1920 1080",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          }
        },
        [
          _c("g", { attrs: { "clip-path": "url(#clip0)" } }, [
            _c("rect", {
              attrs: { width: "1920", height: "1080", fill: "none" }
            }),
            _vm._v(" "),
            _c("g", { attrs: { "clip-path": "url(#clip1)" } }, [
              _c("rect", {
                attrs: {
                  width: "1920",
                  height: "1410",
                  transform: "translate(0 -117)",
                  fill: "white"
                }
              }),
              _vm._v(" "),
              _c("g", { attrs: { filter: "url(#filter0_f)" } }, [
                _c("rect", {
                  attrs: {
                    width: "1920",
                    height: "1080",
                    fill: "url(#pattern0)",
                    "fill-opacity": "0.1"
                  }
                })
              ]),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1795.38 742.418L1957.22 817.34L1995.68 833.634L2004.72 720.638L2000.07 709.428L1997.65 694.375L1990.39 686.845L1966.74 674.216L1939.59 654.587L1882.33 628.769L1858.04 620.5L1814.01 714.456L1798.66 711.709L1795.38 742.418Z",
                  fill: "#DFDDCE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M878.656 232.995L883.761 318.037L1049.78 308.089L1043.47 202.781L910.004 210.792L878.656 232.995Z",
                  fill: "#F0F0D8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M693.188 514.858L722.277 557.989L696.12 575.638L730.601 626.779L780.649 615.046L814.794 543.351L763.57 467.375L693.188 514.858Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M873.75 97.3076L932.847 180.341L1008.14 168.522L1029.64 153.211L950.815 42.4375L873.75 97.3076Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M273.188 -60.9147L375.585 130.769L422.872 105.496L320.475 -86.1875L273.188 -60.9147Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M443.594 390.308L502.102 471.261L526.036 471.304L559.313 450.858L563.042 340.444L545.711 316.469L443.594 390.308Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M333.812 217.798L374.145 280.499L415.051 254.18L409.895 246.169L481.812 199.883L438.856 133.094L382.161 169.576L389.941 181.667L333.812 217.798Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1288.78 570.196L1349.48 656.348L1412.37 612.013L1351.68 525.875L1288.78 570.196Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M825.219 733.61L862.64 789.993L930.886 744.683L879.569 667.344L833.436 682.304L825.219 733.61Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M974.688 5.2781L1018.55 68.159L1083.12 23.0996L1039.25 -39.7812L974.688 5.2781Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M681.594 682.208L720.779 744.25L776.297 745.813L782.55 721.049L741.106 656.906L719.997 657.946L681.594 682.208Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M565.656 433.725L602.188 445.099L658.123 407.233L618.938 349.344L566.854 384.607L565.656 433.725Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M242.688 54.8976L295.539 161.389L335.168 141.961L284.655 33.9062L242.688 54.8976Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M701.594 215.562L740.972 272.218L826.054 213.059L817.801 201.197L732.16 194.312L701.594 215.562Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M105.031 348.739L135.562 394.279L167.964 405.345L207.084 379.111L161.382 310.938L105.031 348.739Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M382.375 453.619L424.356 516.091L481.151 477.917L439.17 415.438L382.375 453.619Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M420 539.636L451.635 584.459L466.011 586.245L518.769 550.15L484.869 500.594H475.289L420 539.636Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M921.75 249.706L924.683 296.249L1003.2 291.301L1000.26 244.75L921.75 249.706Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1561 667.523L1564.65 678.883L1588.83 710.252L1637.98 680.288L1624.31 631.062L1561 667.523Z",
                  fill: "#AACBAF"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1561 667.523L1564.65 678.883L1588.83 710.252L1637.98 680.288L1624.31 631.062L1561 667.523Z",
                  fill: "url(#pattern1)"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M722.25 537.734L745.976 572.38L781.146 548.276L788.596 559.162L802.183 549.847L791.571 534.363L777.891 543.729L761.32 519.532L782.064 505.318L764.382 479.5L738.863 496.984L752.551 516.972L722.25 537.734Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1231.47 1064.13L1261.59 1108.58L1303.23 1080.35L1273.11 1035.91L1231.47 1064.13Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1530.91 738.617L1531.21 761.502L1554.1 790.281L1595.35 764.241L1582.19 738.882L1547.15 727.25L1530.91 738.617Z",
                  fill: "#EBDBE8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M722.25 537.734L745.976 572.38L781.146 548.276L788.596 559.162L802.183 549.847L791.571 534.363L777.891 543.729L761.32 519.532L782.064 505.318L764.382 479.5L738.863 496.984L752.551 516.972L722.25 537.734ZM784.286 545.171L790.768 540.789L795.995 548.52L789.513 552.902L784.286 545.171ZM747.554 499.502L763.586 488.493L773.366 502.729L757.341 513.745L747.554 499.502ZM733.744 537.791L751.217 525.786L766.311 547.752L748.837 559.758L733.744 537.791Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M902.188 275.738L903.715 283.218L907.508 290.576L912.584 297.798L919.855 302.13L928.23 303.672L1003.48 299.441L1013.49 296.601L1019.43 290.247L1025.44 277.474L1023.58 261.524L1020.72 254.855L1015.52 248.02L1009.58 242.347L1015.58 237.858L1011.87 233.031L1005.68 237.922L917.524 242.383L909.415 247.97L904.597 256.719L902.188 266.602V275.738ZM908.92 276.47L909.487 267.441L912.176 256.54L916.32 251.577L921.124 248.479L1000.15 243.703L1005.68 246.392L1012.19 252.251L1015.52 257.379L1018.29 262.987L1019.18 269.255L1018.86 277.237L1015.44 284.151L1011.37 288.948L1003.07 293.18L928.007 297.447L921.611 296.414L915.101 290.06L911.358 283.469L908.92 276.47Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1310.25 573.12L1312.35 579.366L1316.3 583.963L1321.27 586.703L1326.48 587.599L1330.91 587.033L1335.22 585.276L1358.58 569.125L1363.76 564.277L1366.55 556.138L1365.45 549.052L1360.05 541.888L1354.96 539.277L1349.66 538.531L1344.21 539.607L1339.83 542.002L1316.48 558.153L1311.65 564.163L1310.25 573.12Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1001.72 799.387L1022.92 830.197L1027.6 836.458L1031.47 838.638L1041.89 836.293L1046.22 828.569L1044.47 819.776L1020.93 788.73L1012.5 786.5L1004.64 789.907L1002.24 794.159L1001.72 799.387Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M486.531 382.843L500.061 401.969L531.431 379.752L517.908 360.625L486.531 382.843Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M669.188 537.697L686.023 561.027L698.858 551.754L707.512 563.745L717.844 556.279L715.127 552.514L708.609 557.218L703.841 550.628L706.3 548.856L688.282 523.906L669.188 537.697Z",
                  fill: "#B5D0D0",
                  stroke: "#2C8D8D",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M757.031 591.075L772.978 603.252L794.022 575.677L778.076 563.5L757.031 591.075Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1078.47 958.067L1086.24 969.312L1093.75 964.127L1088.82 956.991L1098.44 950.35L1103.37 957.472L1110.75 952.373L1105.82 945.244L1114.86 938.991L1119.79 946.119L1126.71 941.336L1118.94 930.083L1110.89 935.656L1106.05 928.656L1099.18 933.404L1104.02 940.411L1094.76 946.8L1089.92 939.801L1083.3 944.384L1088.14 951.376L1078.47 958.067Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1297.28 708.798L1305.1 720.266L1312.23 715.396L1307.37 708.26L1316.42 702.093L1321.28 709.229L1327.7 704.84L1322.84 697.704L1332.71 690.977L1337.58 698.105L1344.3 693.53L1336.47 682.055L1328.84 687.269L1324.38 680.75L1316.71 685.985L1321.47 692.963L1312.6 699.009L1307.84 692.038L1300.44 697.087L1304.88 703.606L1297.28 708.798Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M452.812 538.033L453.91 546.94L464.227 545.678L463.518 539.841L479.98 537.818L481.041 546.446L475.477 547.12L476.739 557.39L484.899 556.378L484.304 551.516L498.393 549.795L497.691 544.05L486.835 545.384L485.652 535.703L491.66 534.964L490.442 525.01L483.02 525.92L483.68 531.342L465.324 533.587L464.17 524.156L458.068 524.902L459.567 537.201L452.812 538.033Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1360.22 800.54L1367.31 811.268L1374.77 806.334L1369.86 798.912L1378.91 792.923L1383.83 800.353L1391.11 795.534L1386.2 788.111L1395.4 782.03L1400.31 789.452L1407.21 784.891L1400.11 774.141L1391.88 779.598L1386.99 772.219L1379.99 776.844L1384.64 783.873L1375.28 790.076L1370.63 783.048L1363.45 787.803L1368.32 795.175L1360.22 800.54Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M716.031 671.658L720.685 678.464L727.668 673.68L733.691 682.494L726.521 687.608L731.375 694.406L738.409 689.393L745.106 699.197L738.381 703.787L743.457 711.209L753.51 704.332L747.731 695.869L754.815 690.82L749.53 683.391L742.575 688.339L736.997 680.163L743.694 675.394L738.187 667.67L731.641 672.332L726.349 664.594L716.031 671.658Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M290.031 22.6951L301.812 45.4435L317.041 37.5476L305.139 14.5625L300.206 17.1156L299.352 15.4733L295.638 17.3953L296.613 19.2814L290.031 22.6951Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M395.812 172.35L400.81 179.629L407.722 174.882L412.541 181.896L405.378 186.808L410.346 194.037L427.906 181.982L422.944 174.745L417.854 178.238L413.042 171.231L418.657 167.373L413.659 160.094L395.812 172.35Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M419.875 156.522L424.729 163.751L431.813 159.003L436.546 166.067L429.462 170.808L434.409 178.202L452.069 166.368L447.114 158.982L441.909 162.474L437.177 155.403L442.741 151.674L437.901 144.438L419.875 156.522Z",
                  fill: "#F0F0D8",
                  stroke: "#A52A2A",
                  "stroke-width": "0.3"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M872.094 463.461L888.729 486.174L899.462 478.306L882.827 455.594L872.094 463.461Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M748.375 603.007L764.4 614.64L770.366 606.421L754.333 594.781L748.375 603.007Z",
                  fill: "#AAE0CB",
                  stroke: "#28C98A",
                  "stroke-width": "0.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M303.75 49.233L308.418 57.4876L322.966 49.2617L318.291 41L303.75 49.233Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1035.91 850.285L1040.86 856.502L1054.74 845.444L1049.78 839.219L1038.29 848.391L1035.91 850.285Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1378 576.867L1386.46 588.757L1385.7 589.295L1388.75 593.584L1393.58 590.141L1390.6 585.953L1389.85 586.491L1381.32 574.5L1378 576.867Z",
                  fill: "#FBECD7"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1533.62 737.544L1535.45 740.147L1548.87 730.774L1547.04 728.156L1533.62 737.544Z",
                  fill: "#CDEBB0"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M696.531 198.494L699.356 202.61L704.82 198.859L702.002 194.75L696.531 198.494Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M538.469 153.431L541.287 157.548L546.757 153.804L543.94 149.688L538.469 153.431Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M880.281 528.902L884.662 534.747L887.874 532.338L883.493 526.5L880.281 528.902Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M806.75 130.982L809.69 135.629L814.15 132.796L811.21 128.156L806.75 130.982Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1138.47 500.852L1142.2 506.984L1145.5 504.975L1141.77 498.844L1138.47 500.852Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M817.438 126.026L819.868 129.16L824.45 125.603L822.019 122.469L817.438 126.026Z",
                  fill: "#E2CBDE"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M980.562 490.858L980.649 494.056L984.678 493.949L984.585 490.75L980.562 490.858Z",
                  fill: "#B5E3B5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1055.88 437.856L1061.87 436.808L1067.48 433.287L1074.78 430.684L1081.04 430.031L1086.38 430.555L1099.63 435.776L1103.16 440.595L1116.06 444.253L1129.35 444.511L1143.95 451.941L1145.26 462.11",
                  stroke: "white",
                  "stroke-width": "2.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1038 594.178L1040.74 598.409L1046.02 594.981L1043.28 590.75L1038 594.178Z",
                  fill: "#B5D0D0"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1052.31 584.17L1055.17 588.057L1058.89 585.332L1056.03 581.438L1052.31 584.17Z",
                  fill: "#B5D0D0"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M980.562 490.858L980.649 494.056L984.678 493.949L984.585 490.75L980.562 490.858Z",
                  fill: "url(#pattern2)"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1055.88 437.856L1061.87 436.808L1067.48 433.287L1074.78 430.684L1081.04 430.031L1086.38 430.555L1099.63 435.776L1103.16 440.595L1116.06 444.253L1129.35 444.511L1143.95 451.941L1145.26 462.11",
                  stroke: "#B5D0D0",
                  "stroke-width": "2"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M273.188 -60.9147L375.585 130.769L422.872 105.496L320.475 -86.1875L273.188 -60.9147Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1_1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M289.062 868.882L294.964 873.558L289.844 880.019L368.967 942.728L373.592 936.898L378.733 940.978L382.827 935.808L377.686 931.727L389.051 917.384L394.163 921.436L398.357 916.15L393.252 912.098L407.679 893.882L413.121 898.192L416.828 893.509L411.4 889.199L415.831 883.598L336.708 820.875L332.041 826.763L327.387 823.077L324.225 827.064L328.886 830.758L313.757 849.848L308.558 845.732L305.081 850.121L310.272 854.237L298.247 869.413L292.346 864.737L289.062 868.882Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.kostin }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M722.25 537.734L745.976 572.38L781.146 548.276L788.596 559.162L802.183 549.847L791.571 534.363L777.891 543.729L761.32 519.532L782.064 505.318L764.382 479.5L738.863 496.984L752.551 516.972L722.25 537.734ZM784.286 545.171L790.768 540.789L795.995 548.52L789.513 552.902L784.286 545.171ZM747.554 499.502L763.586 488.493L773.366 502.729L757.341 513.745L747.554 499.502ZM733.744 537.791L751.217 525.786L766.311 547.752L748.837 559.758L733.744 537.791Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M261.156 913.869L324.455 963.698L339.569 944.485L276.271 894.656L261.156 913.869Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M398.562 939.033L419.076 955.643L463.216 901.109L442.702 884.5L435.754 893.077L431.244 889.427L426.182 895.681L430.692 899.338L409.82 925.113L406.256 922.23L401.172 928.512L404.743 931.388L398.562 939.033Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M985.25 628.331L999.576 649.387L994.191 653.051L1008.5 674.093L1013.88 670.428L1016.18 673.813L1035.61 660.589L1033.46 657.44L1036.48 655.396L1024.46 637.711L1023.62 638.285L1021.42 635.05L1022.26 634.484L1015.13 623.992L1024.71 617.466L1014.7 602.742L1010.17 605.819L1008.03 602.656L991.008 614.231L995.74 621.188L985.25 628.331ZM1001.07 637.919L1009.36 632.44L1013.19 638.256L1004.91 643.721L1001.07 637.919Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M896.812 515.558L918.531 547.149L922.711 544.266L927.157 550.735L909.525 562.87L906.722 564.799L914.63 576.295L942.924 556.824L938.335 550.154L948.495 543.162L960.276 560.317L967.51 555.339L944.845 522.379L937.618 527.363L946.014 539.569L935.868 546.561L934.872 545.113L930.555 548.089L926.268 541.842L930.29 539.074L908.557 507.469L896.812 515.558Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1001.84 563.086L1012.81 579.071L1029.66 567.511L1031.93 570.81L1064.58 548.391L1062.41 545.214L1051.35 529.099L1047.51 531.739L1040.76 521.906L1033.14 527.142L1039.89 536.959L1015.53 553.691L1006.55 559.866L1001.84 563.086Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M726.906 1095.21L770.917 1122.45L784.081 1101.18L740.071 1073.94L726.906 1095.21Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M585.219 638.444L587.8 642.195L589.306 641.169L594.82 649.209L598.175 646.892L597.207 645.472L604.306 640.588L606.822 644.253L658.67 608.61L655.221 603.604L659.229 600.843L658.555 599.868L663.574 596.418L663.94 596.963L671.956 591.455L671.454 590.71L676.474 587.267L677.054 588.099L680.869 585.482L683.701 589.598L684.547 589.017L688.182 594.295L687.788 594.575L693.029 602.199L693.625 601.797L697.418 607.319L696.701 607.807L698.916 611.034L706.38 605.906L688.57 580.002L680.998 585.202L675.936 577.844L649.729 595.845L653.056 600.685L648.947 603.504L649.765 604.694L644.71 608.158L644.251 607.498L636.572 612.777L637.174 613.666L632.119 617.144L631.646 616.456L623.794 621.849L624.397 622.731L619.399 626.173L618.926 625.478L610.852 631.036L611.433 631.889L606.493 635.296L605.783 634.263L600.405 637.942L594.884 629.903L591.242 632.405L592.124 633.696L585.219 638.444Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.yuri }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1 unuse-block",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M910.562 107.204L914.571 112.906L911.186 115.28L925.297 135.36L928.674 132.993L932.618 138.602L967.056 114.397L963.12 108.789L966.454 106.444L952.336 86.3563L949.002 88.7014L945.001 83L910.562 107.204ZM919.633 109.341L939.007 95.7225L953.118 115.81L933.751 129.422L919.633 109.341Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M533.625 972.233L549.493 982.252L583.787 927.87L567.92 917.844L533.625 972.233Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M914.781 222.218L915.47 234.259L1003.53 229.175L1002.83 216.897L968.93 218.855L968.694 214.781L943.025 216.259L943.275 220.576L914.781 222.218Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1817.5 730.917L1824.2 733.893L1818.18 747.448L1822.21 749.241L1828.23 735.686L1887.39 761.97L1889.5 757.216L1825.27 728.68L1867.96 632.58L1862.29 630.062L1817.5 730.917Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M536.438 176.144L543.715 186.421L537.47 190.839L544.884 201.309L600.532 161.923L593.118 151.452L584.664 157.433L577.386 147.156L570.087 152.32L577.365 162.604L550.477 181.63L543.206 171.353L536.438 176.144Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M422.375 843.327L474.23 885.123L483.25 873.921L431.402 832.125L422.375 843.327Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M359.188 795.746L388.141 819.075L390.722 821.169L413.315 839.371L421.948 828.656L367.828 785.031L359.188 795.746Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M750.25 -12.4128L753.892 -6.84042L759.277 -10.3545L776.435 15.9295L784.71 10.5293L782.286 6.81436L801.746 -5.89377L779.519 -39.9375L771.775 -34.8887L775.632 -28.9864L750.25 -12.4128ZM767.552 -15.7548L779.268 -23.4069L791.45 -4.75348L779.734 2.91299L767.552 -15.7548Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M505.062 428.534L509.4 434.795L508.225 435.605L524.587 459.264L552.12 440.209L535.758 416.558L534.238 417.605L529.907 411.344L505.062 428.534ZM519.188 436.301L532.431 427.136L540.935 439.421L527.692 448.586L519.188 436.301Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M777.969 948.186L811.446 969.406L829.278 941.251L836.728 945.97L842.17 937.399L833.373 931.82L816.401 921.062L810.851 929.812L820.861 936.152L808.514 955.637L783.346 939.687L777.969 948.186Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M449.938 334.056L454.448 340.339L457.545 338.108L458.047 338.818L466.465 332.78L465.927 332.034L469.082 329.782L471.885 325.357L472.366 321.606L473.613 321.764L474.976 311.243L474.237 311.15L474.667 307.851L475.198 307.148L478.253 305.04L478.697 305.678L487.294 299.726L486.85 299.08L493.826 294.239L494.278 294.885L502.861 288.94L502.416 288.301L509.099 283.676L509.543 284.328L518.212 278.318L517.767 277.673L524.307 273.148L524.751 273.786L534.804 266.822L530.043 259.938L470.803 300.916L471.606 302.071L470.623 302.752L469.247 304.61L468.394 306.603L467.304 306.417L464.307 323.722L449.938 334.056Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M349.906 403.154L354.402 409.436L357.514 407.22L358.016 407.93L366.433 401.913L365.91 401.174L369.065 398.922L371.883 394.512L372.37 390.761L373.632 390.926L375.009 380.398L374.278 380.298L374.708 377.013L375.253 376.31L378.307 374.202L378.752 374.847L387.37 368.909L386.926 368.264L393.91 363.459L394.354 364.104L402.966 358.173L402.514 357.528L409.204 352.924L409.655 353.569L418.331 347.595L417.887 346.942L424.462 342.424L424.899 343.07L434.959 336.149L430.219 329.25L370.872 370.064L371.668 371.226L370.678 371.907L369.302 373.75L368.441 375.744L367.351 375.564L364.304 392.862L349.906 403.154Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1505.94 698.501L1532.48 736.883L1548.51 725.782L1542.44 717.004L1521.97 687.406L1505.94 698.501Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M964.938 850.495L976.589 867.449L967.884 873.43L974.087 882.459L1019.11 851.499L1013.04 842.678L982.641 863.584L975.793 853.629L989.911 843.919L984.964 836.719L964.938 850.495Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M813.062 660.458L822.749 674.156L831.031 668.282L822.592 656.363L836.337 646.631L843.65 656.972L867.857 639.832L859.977 628.688L842.89 640.786L836.244 631.413L815.594 646.029L821.552 654.448L813.062 660.458Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M870.625 62.5877L875.379 68.7769L877.544 67.113L877.666 67.278L884.234 62.2148L883.962 61.8706L887.482 59.1597L890.121 55.2512L891.017 50.5896L891.605 50.7115L893.512 40.7501L892.68 40.5852L894.172 32.8542L895.011 33.0119L896.975 22.8067L895.9 22.5916L896.473 19.5795L897.327 18.3818L900.166 16.3594L900.797 17.2415L909.193 11.2604L908.648 10.5074L912.427 7.81082L914.843 11.2102L917.941 9.00131L918.479 9.73999L926.732 3.85925L926.208 3.12058L932.977 -1.72027L933.507 -0.981597L942.112 -7.13486L941.581 -7.87353L944.765 -10.1613L940.398 -16.25L910.434 5.21469L907.91 1.69342L892.838 12.4867L893.405 13.2756L892.408 14.3729L891.096 16.6534L890.759 18.3459L889.841 18.1667L882.793 53.2216L870.625 62.5877Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M760.562 138.256L765.202 144.524L767.389 142.903L767.51 143.075L774.164 138.127L773.899 137.783L777.463 135.136L780.166 131.285L781.148 126.631L781.736 126.76L783.815 116.849L782.976 116.669L784.604 108.931L785.45 109.11L787.594 98.9553L786.533 98.733L787.164 95.7209L788.039 94.5448L790.921 92.5726L791.53 93.4762L800.027 87.6457L799.504 86.8639L803.318 84.2463L805.684 87.6815L808.825 85.5229L809.341 86.2759L817.687 80.5457L817.171 79.7927L824.033 75.081L824.549 75.8412L833.268 69.8313L832.752 69.0783L835.978 66.8623L831.719 60.6875L801.375 81.6143L798.916 78.05L783.658 88.5708L784.203 89.3668L783.184 90.4498L781.836 92.7088L781.471 94.3942L780.553 94.1934L772.881 129.126L760.562 138.256Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1011.03 525.404L1015.91 532.533L1016.98 534.082L1018.92 536.9L1033.14 527.14L1040.77 521.905L1044.44 519.373L1040.2 513.191L1055.82 502.756L1056.1 504.399L1056.79 506.077L1058.04 507.712L1059.6 508.91L1061.85 509.77L1064.31 509.871L1066.65 509.196L1068.44 508.006L1069.83 506.356L1070.64 504.549L1070.97 502.218L1070.58 499.938L1069.74 498.202L1068.57 496.804L1066.65 495.491L1064.46 494.839L1061.7 494.946L1059.24 495.993L1055.35 490.062L1033.88 504.191L1036.56 507.884L1011.03 525.404Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M839.062 88.3983L862.645 122.758L865.915 120.52L875.86 135.007L849.345 153.215L854.959 161.384L884.944 140.794L879.43 132.762L881.876 131.084L871.787 116.396L869.105 118.239L845.551 83.9375L839.062 88.3983Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1885.53 778.662L1971.72 815.74L1975.16 807.75L1888.96 770.688L1885.53 778.662Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M732.625 233.234L737.379 239.789L746.134 233.442L749.267 237.76L740.476 244.143L745.144 250.583L754.243 243.985L758.473 249.815L749.475 256.334L753.103 261.354L763.163 254.061L749.539 235.271L762.733 225.704L772.455 239.108L761.614 246.961L765.558 252.404L787.097 236.792L783.139 231.32L774.119 237.86L770.161 232.403L779.389 225.704L775.252 219.996L766.138 226.601L762.56 221.667L771.882 214.904L767.486 208.844L756.279 216.969L759.348 221.2L746.019 230.861L742.527 226.048L732.625 233.234Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M669.188 537.697L686.023 561.027L698.858 551.754L707.512 563.745L717.844 556.279L715.127 552.514L708.609 557.218L703.841 550.628L706.3 548.856L688.282 523.906L669.188 537.697Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1781.75 546.721L1809.03 586.028L1822.22 576.87L1794.94 537.562L1781.75 546.721Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M272.469 979.164L300.397 1001.05L313.475 984.349L285.533 962.469L272.469 979.164Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M234.969 949.674L262.71 972.336L275.975 956.1L248.234 933.438L234.969 949.674Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M340.875 815.365L351.042 823.606L349.264 825.8L352.856 828.705L354.764 826.345L393.425 857.664L391.425 860.131L394.601 862.698L396.738 860.066L405.994 867.575L411.179 861.171L386.721 841.348L388.227 839.498L384.785 836.715L383.208 838.659L379.178 835.396L376.597 833.309L373.671 830.935L375.356 828.848L371.793 825.958L369.979 828.195L346.131 808.875L340.875 815.365Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M877.188 795.977L881.339 802.13L946.609 758.111L949.499 762.399L959.551 755.622L952.517 745.188L877.188 795.977Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M801.812 252.339L807.692 260.831L865.627 220.756L859.747 212.25L801.812 252.339Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1494.47 588.978L1494.5 591.101L1501.95 591.187L1504.43 591.201V589.746L1504.44 518.969H1494.6L1494.47 588.978Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M573.219 391.981L588.713 413.804L594.356 409.781L587.265 399.783L599.899 390.804L606.933 400.716L612.389 396.836L605.377 386.953L617.272 378.512L624.485 388.66L630.179 384.615L614.827 363L609.335 366.901L613.228 372.395L582.504 394.232L578.331 388.352L573.219 391.981Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M394.406 458.324L409.155 479.552L414.748 475.665L407.549 465.302L419.954 456.674L426.55 466.155L431.82 462.505L424.765 452.357L436.854 443.959L444.698 455.24L451.76 450.327L436.502 428.375L430.071 432.85L434.107 438.652L403.383 460.009L399.669 454.659L394.406 458.324Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M652.781 292.542L666.613 313.397L691.249 297.088L682.028 283.147L678.35 285.585L673.883 278.844L652.781 292.542Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.tatiana }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M676.312 740.947L678.836 744.626L679.984 743.845L686.437 753.232L679.747 757.829L682.508 761.845L683.956 760.841L690.854 770.874L683.791 775.722L686.508 779.703L687.591 778.95L694.274 788.674L687.247 793.501L689.929 797.395L691.356 796.413L697.099 804.775L700.913 802.15L700.046 800.888L706.599 796.398L703.853 792.404L702.641 793.243L695.787 783.253L702.72 778.484L700.067 774.618L699.279 775.163L692.41 765.166L698.784 760.784L696.332 757.22L695.084 758.073L688.193 748.054L695.213 743.228L692.983 739.979L691.492 740.997L685.82 732.75L682.371 735.131L683.146 736.25L676.312 740.947Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M400.875 556.691L403.463 560.607L404.439 559.968L411.092 570.016L404.517 574.369L407.199 578.414L408.404 577.618L414.9 587.421L408.296 591.789L411.014 595.884L412.111 595.16L418.535 604.863L412.032 609.173L414.67 613.153L415.846 612.379L421.403 620.777L425.168 618.288L424.135 616.725L430.853 612.278L428.337 608.463L426.989 609.359L420.378 599.369L427.168 594.873L424.744 591.215L423.21 592.226L416.492 582.064L423.633 577.331L421.152 573.595L419.833 574.47L413.172 564.408L419.897 559.954L417.467 556.282L415.853 557.351L410.11 548.688L406.525 551.061L407.393 552.374L400.875 556.691Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M652.656 646.384L655.23 650.135L656.528 649.238L661.081 655.872L664.874 653.262L664.042 652.057L673.894 645.272L678.72 652.301L682.061 650.013L681.129 648.636L691.131 641.765L696.014 648.872L699.413 646.535L698.538 645.272L708.426 638.481L713.144 645.351L716.392 643.114L715.302 641.529L723.713 635.748L721.268 632.184L719.834 633.167L715.166 626.375L711.38 628.964L712.018 629.896L702.847 636.193L698.302 629.574L694.63 632.098L695.398 633.224L685.617 639.944L680.928 633.124L677.2 635.691L677.938 636.767L667.893 643.673L663.49 637.254L660.149 639.556L660.931 640.69L652.656 646.384Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M809.25 525.878L814.499 533.53L818.005 531.12L817.474 530.339L822.558 526.846L823.096 527.621L827.276 524.752L829.742 528.338L830.775 527.628L834.675 533.308L833.923 533.838L839.107 541.383L839.659 540.996L843.523 546.633L842.964 547.013L848.012 554.364L848.578 553.976L852.307 559.413L851.748 559.793L856.86 567.222L857.62 566.706L861.435 572.257L860.395 572.967L862.933 576.646L870.641 571.353L834.747 519.115L827.312 524.214L822.293 516.906L809.25 525.878Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M868.844 710.567L873.985 718.219L875.655 717.107L878.093 720.743L880.882 718.95L891.817 735.266L888.841 737.26L891.889 741.814L889.967 743.097L894.907 750.47L901.482 746.059L896.671 738.88L900.816 736.098L905.591 743.241L911.8 739.081L906.301 730.87L905.154 731.637L889.594 708.437L890.634 707.741L885.242 699.688L879.656 703.431L884.382 710.488L878.667 714.318L873.884 707.189L868.844 710.567Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M833.219 456.638L876.792 520.071L884.084 515.065L840.504 451.625L833.219 456.638Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M894.094 650.148L899.17 657.678L902.827 655.211L902.182 654.264L907.882 650.413L908.52 651.36L912.32 648.8L914.916 652.651L916.02 651.905L919.706 657.37L919.06 657.807L924.137 665.345L924.811 664.9L928.475 670.329L927.772 670.802L932.806 678.261L933.501 677.787L937.394 683.568L936.728 684.012L941.668 691.335L942.328 690.897L946.056 696.426L944.952 697.172L948.236 702.049L955.872 696.893L919.892 643.557L912.198 648.757L907.179 641.312L894.094 650.148Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M561.656 666.081L563.908 669.373L565.062 668.577L571.666 678.194L564.309 683.235L566.869 686.95L568.203 686.04L574.921 695.829L568.339 700.354L570.927 704.119L571.859 703.481L578.607 713.299L572.11 717.767L574.498 721.245L575.695 720.42L581.604 729.026L585.404 726.416L584.465 725.039L591.62 720.112L589.197 716.584L587.799 717.545L580.693 707.196L586.996 702.864L584.723 699.558L583.274 700.555L576.52 690.723L583.533 685.91L580.93 682.124L579.553 683.07L572.863 673.339L579.933 668.483L577.244 664.561L575.516 665.758L570.296 658.156L567.299 660.215L568.224 661.57L561.656 666.081Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M198.781 170.159L206.36 181.146L210.124 178.549L214.814 185.327L210.784 188.116L209.307 185.972L199.907 192.47L203.678 197.927L213.014 191.473L218.033 198.73L223.54 194.929L216.599 184.882L230.481 175.286L237.256 185.097L241.895 181.891L233.492 169.714L231.384 171.17L228.1 166.401L232.653 163.252L233.449 164.407L241.092 159.121L237.213 153.499L228.064 159.817L223.267 152.875L217.503 156.855L225.454 168.387L211.766 177.832L203.987 166.558L198.781 170.159Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M126.875 343.291L134.461 354.278L138.225 351.674L142.915 358.459L138.885 361.241L137.408 359.104L128.008 365.595L131.779 371.052L141.115 364.605L146.134 371.863L151.641 368.054L144.7 358.007L158.581 348.411L165.357 358.229L169.996 355.016L161.593 342.846L159.485 344.295L156.201 339.526L160.754 336.385L161.55 337.539L169.193 332.261L165.314 326.631L156.165 332.942L151.368 326L145.603 329.987L153.555 341.512L139.867 350.957L132.088 339.691L126.875 343.291Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1011.34 5.82205L1018.92 16.8018L1022.69 14.2129L1027.38 20.99L1023.35 23.7726L1021.87 21.6283L1012.47 28.1258L1016.24 33.5906L1025.58 27.129L1030.6 34.3938L1036.1 30.5929L1029.16 20.5382L1043.04 10.9426L1049.82 20.7534L1054.46 17.5548L1046.05 5.37023L1043.95 6.83325L1040.66 2.05694L1045.22 -1.0914L1046.01 0.0632287L1053.65 -5.22226L1049.78 -10.8448L1040.63 -4.52661L1035.84 -11.4688L1030.07 -7.48132L1038.02 4.04348L1024.33 13.4957L1016.55 2.21472L1011.34 5.82205Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1140.19 647.738L1148.58 659.966L1166.58 686.164L1174.21 680.921L1153.1 650.205L1174.28 635.64L1168.99 627.938L1140.19 647.738Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M318.125 195.393L328.672 211.235L335.728 206.531L325.18 190.703L339.693 181.036L341.528 183.79L370.711 164.34L365.384 156.344L336.201 175.793L334.401 173.09L319.702 182.886L324.98 190.818L318.125 195.393Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M606.812 498.555L610.125 503.202L607.537 505.053L619.92 522.422L622.078 520.887L624.602 524.423L626.896 522.788L624.372 519.252L637.465 509.915L630.223 499.767L634.31 496.848L632.926 494.905L628.832 497.816L625.247 492.789L635.794 485.273L632.31 480.375L606.812 498.555Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1123.66 647.41L1137.5 667.555L1148.57 659.953L1140.17 647.726L1168.97 627.925L1163.52 620L1123.66 647.41Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1324.91 613.369L1329.95 620.741L1346.45 609.425L1358.97 627.863L1365.95 622.821L1353.95 605.315L1371.71 593.138L1366.17 585.062L1324.91 613.369Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M939.688 609.651L963.342 643.537L970.77 638.345L952.006 611.458L955.448 609.049L956.609 610.72L979.009 595.071L973.76 587.562L948.155 605.441L947.36 604.287L939.688 609.651Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1267.28 722.573L1276.22 722.602L1276.41 649.365L1267.47 649.344L1267.28 722.573Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M527.406 1048.26L556.904 1116.32L564.985 1112.82L535.494 1044.75L527.406 1048.26Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M661.5 361.985L667.917 371.76L669.108 370.979L672.764 376.544L665.816 381.098L668.003 384.44L669.143 383.68L675.102 392.766L679.103 390.141L677.934 388.37L686.739 382.589L691.887 390.442L695.673 387.961L694.662 386.426L703.316 380.746L708.716 388.972L712.236 386.67L711.032 384.82L717.972 380.266L715.599 376.63L714.158 377.584L708.651 369.193L705.217 371.438L706.529 373.446L697.666 379.262L692.016 370.663L688.295 373.101L689.428 374.83L680.68 380.567L674.894 371.746L677.303 370.161L668.799 357.188L661.5 361.985Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M450.125 141.134L488.894 197.603L496.652 192.275L457.883 135.812L450.125 141.134Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M622.094 815.142L631.766 821.84L628.977 825.863L631.193 827.398L633.982 823.375L640.077 827.599L637.725 830.984L643.733 835.15L655.478 818.182L652.868 816.375L654.431 814.109L643.138 806.285L644.414 804.427L633.946 797.177L632.655 799.027L629.034 796.531L627.486 798.769L631.501 801.544L622.094 815.142Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M507.438 734.851L533.394 751.16L526.202 762.62L538.025 770.05L546.737 756.18L541.833 753.096L546.25 746.061L513.367 725.406L507.438 734.851Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1423.09 910.949L1442.75 911.114L1443.01 879.415L1423.36 879.25L1423.09 910.949Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1078.47 958.067L1086.24 969.312L1093.75 964.127L1088.82 956.991L1098.44 950.35L1103.37 957.472L1110.75 952.373L1105.82 945.244L1114.86 938.991L1119.79 946.119L1126.71 941.336L1118.94 930.083L1110.89 935.656L1106.05 928.656L1099.18 933.404L1104.02 940.411L1094.76 946.8L1089.92 939.801L1083.3 944.384L1088.14 951.376L1078.47 958.067Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1297.28 708.798L1305.1 720.266L1312.23 715.396L1307.37 708.26L1316.42 702.093L1321.28 709.229L1327.7 704.84L1322.84 697.704L1332.71 690.977L1337.58 698.105L1344.3 693.53L1336.47 682.055L1328.84 687.269L1324.38 680.75L1316.71 685.985L1321.47 692.963L1312.6 699.009L1307.84 692.038L1300.44 697.087L1304.88 703.606L1297.28 708.798Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1563.03 569.02L1563.07 578.243L1627.94 577.934L1627.9 568.719L1563.03 569.02Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1396.53 908.525L1405.04 908.554L1405.21 838.803L1396.71 838.781L1396.53 908.525Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.liquidateur }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M603.188 458.867L608.142 466.153L663.711 428.38L658.756 421.094L603.188 458.867Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M931.781 953.574L940.135 953.646L940.715 883.134L932.355 883.062L931.781 953.574Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1822.31 752.626L1881.24 776.866L1884.73 768.396L1825.8 744.156L1822.31 752.626Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M452.812 538.033L453.91 546.94L464.227 545.678L463.518 539.841L479.98 537.818L481.041 546.446L475.477 547.12L476.739 557.39L484.899 556.378L484.304 551.516L498.393 549.795L497.691 544.05L486.835 545.384L485.652 535.703L491.66 534.964L490.442 525.01L483.02 525.92L483.68 531.342L465.324 533.587L464.17 524.156L458.068 524.902L459.567 537.201L452.812 538.033Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M498.312 578.916L503.26 586.088L557.717 548.515L552.777 541.344L498.312 578.916Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1360.22 800.54L1367.31 811.268L1374.77 806.334L1369.86 798.912L1378.91 792.923L1383.83 800.353L1391.11 795.534L1386.2 788.111L1395.4 782.03L1400.31 789.452L1407.21 784.891L1400.11 774.141L1391.88 779.598L1386.99 772.219L1379.99 776.844L1384.64 783.873L1375.28 790.076L1370.63 783.048L1363.45 787.803L1368.32 795.175L1360.22 800.54Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1432.34 720.012L1432.69 792.022L1440.56 791.986L1440.22 719.969L1432.34 720.012Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1147.38 1042.74L1152.04 1049.56L1159.03 1044.77L1165.09 1053.65L1158.09 1058.44L1162.81 1065.33L1169.8 1060.55L1176.46 1070.29L1169.47 1075.07L1174.54 1082.49L1184.85 1075.43L1179.03 1066.9L1186.14 1062.03L1181 1054.5L1173.88 1059.36L1168.3 1051.19L1175.01 1046.6L1169.65 1038.77L1162.95 1043.36L1157.71 1035.69L1147.38 1042.74Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M716.031 671.658L720.685 678.464L727.668 673.68L733.691 682.494L726.521 687.608L731.375 694.406L738.409 689.393L745.106 699.197L738.381 703.787L743.457 711.209L753.51 704.332L747.731 695.869L754.815 690.82L749.53 683.391L742.575 688.339L736.997 680.163L743.694 675.394L738.187 667.67L731.641 672.332L726.349 664.594L716.031 671.658Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1531.22 870.426L1536.29 877.734L1588.51 841.488L1583.44 834.188L1531.22 870.426Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M965.375 974.422L973.219 974.494L973.8 902.627L965.956 902.562L965.375 974.422Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1501.69 643.853L1510.91 643.888L1511.12 597.653L1516.12 597.682L1516.17 587.161L1506.8 587.125L1506.79 589.757L1504.4 589.743V591.198L1501.92 591.184L1501.69 643.853Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M672.688 166.579L678.216 174.754L725.001 143.113L719.48 134.938L672.688 166.579Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1709.53 628.687L1725.03 651.026L1731.04 646.852L1745.2 667.27L1753.6 661.439L1738.92 640.283L1733.47 644.07L1718.49 622.469L1709.53 628.687Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1106.28 742.485L1146.42 800.891L1152.89 796.451L1112.75 738.031L1106.28 742.485Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M897.406 931.313L905.057 931.377L905.652 858.815L897.994 858.75L897.406 931.313Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1288.22 1018.17L1327.59 1075.46L1334.17 1070.94L1294.79 1013.66L1288.22 1018.17Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M434.094 244.35L438.919 251.501L492.072 215.549L487.246 208.406L434.094 244.35Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1262.25 461.049L1269.65 472.158L1273.38 469.669L1276.81 474.826L1286.12 468.615L1286.15 468.658L1294.74 462.928L1280.04 440.875L1271.45 446.598L1275.29 452.357L1262.25 461.049Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1433.16 606.372L1433.49 675.765L1441.34 675.722L1441.01 606.344L1433.16 606.372Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1170.16 834.925L1209.25 891.81L1215.69 887.393L1176.58 830.5L1170.16 834.925Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1897.16 765.913L1974.84 797.454L1994.14 749.921L1990.86 748.594L1973.22 792.025L1898.82 761.811L1897.16 765.913Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M847.875 724.929L852.715 732.215L854.644 730.931L857.304 734.947L860.308 732.954L871.45 749.735L868.446 751.729L871.465 756.269L869.529 757.545L874.297 764.731L880.736 760.442L875.975 753.278L880.177 750.488L884.945 757.681L891.24 753.5L885.683 745.138L884.464 745.941L882.084 742.363L876.125 746.322L864.947 729.475L870.418 725.839L868.037 722.246L869.543 721.242L864.624 713.812L858.795 717.685L863.556 724.864L858.064 728.514L853.296 721.321L847.875 724.929Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1285.06 1125.3L1289.32 1131.06L1319.23 1108.91L1317.8 1106.99L1348.64 1084.17L1344.38 1078.41L1315.57 1099.73L1317 1101.66L1285.06 1125.3Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M724.219 389.537L726.778 393.187L728.585 391.918L735.727 402.116L728.722 407.021L731.045 410.342L732.364 409.424L739.398 419.478L730.995 425.366L733.526 428.988L735.246 427.783L740.101 434.718L744.059 431.943L743.012 430.444L750.942 424.886L748.475 421.372L747.256 422.225L741.398 413.863L747.966 409.266L745.5 405.752L744.388 406.526L737.519 396.708L744.087 392.111L741.592 388.547L740.359 389.415L734.178 380.594L730.6 383.097L731.525 384.423L724.219 389.537Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M73.5 346.816L77.881 353.314L134.332 315.139L129.944 308.656L73.5 346.816Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1410.06 435.064L1447.43 447.191L1454.17 426.394L1468.79 431.141L1471.45 422.916L1451.28 416.375L1443.16 441.418L1419.46 433.723L1422.34 424.866L1414.23 422.234L1410.06 435.064Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M439.156 609.333L441.537 612.797L442.827 611.908L447.617 618.872L451.274 616.347L450.292 614.927L459.814 608.38L464.653 615.415L468.267 612.919L467.335 611.571L477.531 604.55L482.385 611.6L485.97 609.133L484.895 607.569L493.062 601.961L490.645 598.454L489.426 599.293L484.651 592.344L481.46 594.538L482.192 595.593L471.738 602.778L466.941 595.8L463.535 598.146L464.567 599.644L454.723 606.407L450.062 599.63L446.448 602.104L447.481 603.61L439.156 609.333Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M713.188 792.285L715.776 796.05L717.246 795.039L722.014 801.974L725.9 799.306L724.818 797.729L734.87 790.822L739.717 797.865L743.159 795.491L741.854 793.583L751.412 787.021L756.352 794.193L759.786 791.833L759.084 790.808L767.394 785.085L765.322 782.058L764.167 782.847L759.27 775.719L755.785 778.121L756.388 779.011L747.267 785.271L742.435 778.229L738.62 780.854L739.337 781.894L728.912 789.058L724.129 782.094L720.523 784.576L721.77 786.383L713.188 792.285Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1299.19 888.611L1339.35 947.06L1345.41 942.893L1305.25 884.438L1299.19 888.611Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1584.09 811.194L1589.93 819.607L1631.13 791.006L1625.29 782.594L1584.09 811.194Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1171.47 698.167L1211.74 756.795L1217.67 752.722L1177.39 694.094L1171.47 698.167Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M558.562 505.638L561.108 509.152L562.162 508.399L568.701 517.442L561.954 522.333L564.715 526.156L565.604 525.517L572.451 534.998L564.456 540.771L567.066 544.386L568.142 543.619L573.053 550.41L576.638 547.814L575.398 546.093L583.715 540.076L581.299 536.741L579.858 537.788L574.122 529.856L580.919 524.944L578.388 521.437L577.183 522.312L570.336 512.838L577.212 507.861L574.71 504.397L573.534 505.25L567.661 497.125L564.593 499.341L565.51 500.61L558.562 505.638Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M216.812 85.544L230.472 112.337L245.436 104.699L231.762 77.9062L216.812 85.544Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1225.84 465.374L1233.75 476.77L1242.8 470.495L1245.05 473.736L1243.22 475.006L1251.36 486.739L1266.1 476.512L1257.97 464.772L1248.05 471.664L1245.8 468.415L1247.63 467.139L1239.73 455.75L1225.84 465.374Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M946 383.733L955.278 395.602L963.61 389.091L961.33 386.172L969.454 379.81L972.064 383.145L981.392 375.852L972.723 364.75L963.739 371.771L960.656 367.827L947.183 378.362L949.334 381.116L946 383.733Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M502.094 217.175L509.328 227.717L533.951 210.807L526.702 200.257L517.51 206.576L510.225 195.969L502.459 201.304L509.751 211.911L502.094 217.175Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1229.84 787.306L1271.83 848.415L1277.41 844.578L1235.43 783.469L1229.84 787.306Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1806.16 478.035L1807.12 491.087L1841.41 488.534L1845.34 488.247L1844.93 482.696L1844.37 475.188L1840.99 475.446L1806.16 478.035Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M945.312 803.893L949.342 809.752L1007.4 769.828L1003.37 763.969L945.312 803.893Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M598.125 715.456L600.455 718.841L602.061 717.736L606.894 724.772L610.157 722.527L609.117 721.021L618.754 714.394L623.665 721.545L627.3 719.049L626.332 717.636L636.744 710.479L641.311 717.134L644.143 715.183L643.44 714.158L651.944 708.306L649.255 704.404L647.979 705.279L643.584 698.875L639.97 701.364L640.744 702.504L631.015 709.188L626.297 702.31L622.719 704.777L623.672 706.169L613.878 712.903L608.945 705.717L605.625 707.997L606.693 709.568L598.125 715.456Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1342.03 639.809L1347.39 647.619L1389.31 618.861L1383.69 610.656L1365.94 622.834L1358.96 627.875L1342.03 639.809Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1532.91 748.661L1550.26 773.661L1560.89 766.282L1556.11 759.39L1561.67 755.524L1553.39 743.583L1547.81 747.456L1543.53 741.281L1532.91 748.661Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M882.156 846.299L886.05 851.972L944.888 811.517L940.988 805.844L882.156 846.299Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1232.44 925.86L1272.52 984.187L1278.23 980.264L1238.14 921.938L1232.44 925.86Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1606.97 737.229L1636.07 779.176L1643.96 773.697L1614.86 731.75L1606.97 737.229Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1155.16 999.49L1162.1 999.548L1162.74 929.158L1155.79 929.094L1155.16 999.49Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M543.719 257.763L548.802 265.509L592.548 236.808L587.471 229.062L543.719 257.763Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1333.59 815.781L1340.47 815.796L1340.66 745.421L1333.77 745.406L1333.59 815.781Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1015.88 753.547L1019.65 759.027L1078.25 718.736L1074.48 713.25L1015.88 753.547Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1471.97 711.973L1472.23 765.639L1480.99 765.596L1480.74 711.938L1471.97 711.973Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M383.25 286.56L388.248 293.947L431.591 264.644L426.601 257.25L383.25 286.56Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M577.25 303.125L598.237 333.691L603.256 330.241L612.513 343.731L618.715 339.471L608.813 325.056L605.113 327.602L584.757 297.969L577.25 303.125Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M774.844 454.476L787.126 472.354L804.815 460.184L792.54 442.312L774.844 454.476Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1218.47 1092.28L1224.92 1092.34L1225.57 1020.53L1219.11 1020.47L1218.47 1092.28Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M393.938 422.115L400.491 431.696L433.459 409.098L426.899 399.531L393.938 422.115Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1090.44 907.481L1096.91 907.545L1097.56 836.245L1091.09 836.188L1090.44 907.481Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1495.91 852.435L1520.32 887.612L1522.73 891.09L1524.67 893.873L1532.14 888.68L1503.38 847.25L1495.91 852.435Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1498.12 751.955L1508.79 767.216L1527.14 754.379L1524.2 750.177L1528.31 747.294L1523.73 740.76L1519.61 743.636L1516.46 739.125L1498.12 751.955Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1603.09 709.756L1612.39 723.324L1613.14 724.443L1633.95 710.172L1623.57 695.219L1603.09 709.756Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1847.5 705.569L1895.48 726.137L1898.89 718.169L1850.91 697.594L1847.5 705.569Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1854.94 688.148L1902.91 708.716L1906.33 700.756L1858.35 680.188L1854.94 688.148Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1463.16 875.017L1491.22 915.464L1498.76 910.229L1497.63 908.601L1495.21 905.109L1470.7 869.781L1463.16 875.017Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1464.56 809.204L1492.63 849.645L1500.17 844.41L1499.47 843.406L1496.71 839.432L1472.11 803.969L1464.56 809.204Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1906.94 731.03L1954.66 751.491L1958.08 743.523L1910.35 723.062L1906.94 731.03Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M290.031 22.6951L301.812 45.4435L317.041 37.5476L305.139 14.5625L300.206 17.1156L299.352 15.4733L295.638 17.3953L296.613 19.2814L290.031 22.6951Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1914.34 713.617L1962.07 734.077L1965.48 726.11L1917.76 705.656L1914.34 713.617Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1870.38 652.199L1918.36 672.767L1921.76 664.849L1873.77 644.281L1870.38 652.199Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1862.66 670.3L1910.64 690.868L1913.99 683.037L1866.01 662.469L1862.66 670.3Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1839.66 723.858L1887.64 744.426L1890.98 736.631L1843 716.062L1839.66 723.858Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M316.062 526.082L326.366 540.798L319.074 545.904L330.403 562.069L339.437 555.737L330.647 543.172L337.43 538.424L334.762 534.609L324.602 520.094L316.062 526.082Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M351.5 505.835L359.48 517.238L361.811 520.558L354.511 525.671L357.086 529.329L365.833 541.829L374.875 535.489L366.084 522.939L372.846 518.206L360.011 499.875L351.5 505.835Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1899.06 749.296L1946.79 769.756L1950.14 761.946L1902.41 741.5L1899.06 749.296Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M923.531 386.408L933.627 401.095L927.654 405.205L940.08 423.284L948.548 417.468L938.295 402.544L944.167 398.506L931.899 380.656L923.531 386.408Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M395.812 172.35L400.81 179.629L407.722 174.882L412.541 181.896L405.378 186.808L410.346 194.037L427.906 181.982L422.944 174.745L417.854 178.238L413.042 171.231L418.657 167.373L413.659 160.094L395.812 172.35Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M419.875 156.522L424.729 163.751L431.813 159.003L436.546 166.067L429.462 170.808L434.409 178.202L452.069 166.368L447.114 158.982L441.909 162.474L437.177 155.403L442.741 151.674L437.901 144.438L419.875 156.522Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1091.38 242.05L1093.34 283.631L1103.7 283.129L1101.72 241.562L1091.38 242.05Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1257.69 1050.32L1264.99 1060.81L1269.75 1057.49L1282.78 1076.18L1278.01 1079.5L1279.51 1081.65L1278.29 1082.51L1283.11 1089.42L1288.47 1085.69L1283.66 1078.78L1288.71 1075.26L1293.53 1082.16L1297.86 1079.14L1291.62 1070.17L1287.57 1072.99L1275.48 1055.64L1279.46 1052.86L1271.48 1041.41L1267.94 1043.88L1272.42 1050.31L1266.64 1054.35L1261.82 1047.44L1257.69 1050.32Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1102.91 1072.75L1147.43 1104.19L1151.98 1097.75L1107.45 1066.31L1102.91 1072.75Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1471.69 676.104L1471.88 695.848L1486.24 695.704L1486.09 679.733L1492.77 679.675L1492.82 684.968L1505.8 684.846L1505.72 675.781L1471.69 676.104Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1188.12 687.694L1192.66 694.299L1235.68 664.73L1231.14 658.125L1188.12 687.694Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1224.03 762.57L1228.46 769.074L1272.22 739.255L1267.79 732.75L1224.03 762.57Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M227.438 870.307L254.204 892.582L261.811 883.431L235.052 861.156L227.438 870.307Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M541.438 101.433L544.585 106.094L545.847 105.233L549.425 110.526L548.507 111.15L551.21 115.145L554.2 113.129L556.846 117.024L558.252 116.07L562.267 122.001L561.758 122.338L566.77 129.732L567.738 129.072L571.316 134.35L570.262 135.075L573.18 139.385L580.228 134.608L561.686 107.242L558.201 109.608L549.138 96.2188L541.438 101.433Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1252.34 781.731L1256.66 788.007L1301.09 757.477L1296.78 751.188L1252.34 781.731Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1318.56 878.325L1322.88 884.6L1367.31 854.064L1363 847.781L1318.56 878.325Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M990.969 1076.02L1002.84 1082.14L1016.76 1055.12L1004.88 1049L990.969 1076.02Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M350.781 983.804L368.757 998.85L379.727 985.734L361.759 970.688L350.781 983.804Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M684.375 234.809L714.862 279.215L720.907 275.063L690.419 230.656L684.375 234.809Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1219.5 594.594L1223.59 600.461L1268.11 569.436L1264.02 563.562L1219.5 594.594Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1681.81 706.189L1687 713.669L1721.99 689.386L1716.8 681.906L1681.81 706.189Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1235.66 1064.83L1240.6 1071.89L1242.27 1070.71L1244.96 1074.52L1250.23 1070.81L1263.39 1089.57L1260.03 1091.93L1261.74 1094.38L1258.32 1096.78L1262.96 1103.39L1268.32 1099.64L1263.51 1092.78L1268.19 1089.49L1272.75 1095.99L1278.31 1092.1L1273.51 1085.26L1272.53 1085.95L1271.35 1084.28L1266 1088.04L1251.42 1067.28L1256.74 1063.54L1255.26 1061.43L1256.52 1060.54L1251.47 1053.34L1245.92 1057.24L1250.95 1064.41L1245.47 1068.25L1240.63 1061.35L1235.66 1064.83Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1030.94 953.999L1060.93 998.004L1066.84 993.974L1036.84 949.969L1030.94 953.999Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1175.91 624.987L1179.99 630.854L1223.6 600.46L1219.52 594.594L1175.91 624.987Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1495.81 787.664L1520.33 822.992L1522.7 826.405L1524.56 829.102L1530.6 824.906L1501.84 783.469L1495.81 787.664Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1288.22 856.786L1292.08 862.395L1336.02 832.195L1332.17 826.594L1288.22 856.786Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M976.75 983.659L1021.84 1013.53L1025.46 1008.06L980.378 978.188L976.75 983.659Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M538.375 620.451L540.863 624.072L541.853 623.391L547.66 631.839L551.167 629.437L550.349 628.246L557.354 623.434L558.208 624.682L559.764 623.606L565.435 631.846L568.992 629.408L568.11 628.117L574.936 623.427L572.311 619.612L571.214 620.365L565.485 612.031L561.879 614.505L562.768 615.804L555.77 620.609L554.759 619.138L553.382 620.092L547.904 612.117L544.255 614.62L545.093 615.832L538.375 620.451Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1514.69 515.408L1514.74 525.728L1548.83 525.563L1548.79 515.25L1514.69 515.408Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1354.31 949.182L1358.28 954.948L1399.46 926.648L1395.5 920.875L1354.31 949.182Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.liquidateur }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1400.38 824.665L1405.75 832.489L1436.13 811.598L1430.77 803.781L1400.38 824.665Z",
                  fill: "#090909",
                  stroke: "#330002",
                  "stroke-width": "0.75"
                },
                on: { click: _vm.liquidateur }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M758.438 810.585L760.94 814.35L762.668 813.203L769.107 822.92L762.094 827.567L764.625 831.39L766.074 830.429L771.953 839.3L775.71 836.804L774.334 834.717L781.368 830.056L778.937 826.405L777.101 827.617L770.627 817.85L777.116 813.54L769.236 801.656L764.654 804.704L765.464 805.923L758.438 810.585Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1075.62 1053.59L1078.32 1057.45L1080.14 1056.18L1085.28 1063.55L1088.35 1061.41L1087.28 1059.86L1097.31 1052.87L1102.1 1059.73L1105.3 1057.48L1104.36 1056.14L1113.1 1050.04L1110.87 1046.85L1109.37 1047.88L1104.67 1041.12L1101.34 1043.45L1101.95 1044.34L1091.74 1051.47L1086.6 1044.08L1082.55 1046.91L1083.43 1048.15L1075.62 1053.59Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M648.219 176.05L664.961 200.441L674.462 193.915L657.719 169.531L648.219 176.05Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M627.062 557.125L629.594 560.812L630.841 559.951L636.835 568.672L640.643 566.054L639.445 564.311L646.687 559.334L647.562 560.604L648.666 559.851L654.546 568.421L657.937 566.09L656.776 564.405L663.795 559.571L661.35 556.021L660.088 556.882L654.668 549L651.154 551.417L651.8 552.349L644.744 557.197L643.941 556.028L642.349 557.125L636.821 549.086L633.724 551.223L634.347 552.127L627.062 557.125Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M582.844 588.778L585.332 592.399L586.694 591.467L592.366 599.707L595.743 597.384L594.775 595.978L601.895 591.087L602.676 592.242L603.859 591.424L609.796 600.059L613.812 597.305L612.815 595.863L619.698 591.123L617.117 587.365L615.504 588.476L609.961 580.394L606.548 582.739L607.509 584.145L600.446 588.993L599.285 587.293L597.729 588.369L592.222 580.344L588.816 582.675L589.749 584.037L582.844 588.778Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1422.06 968.359L1427.29 975.961L1423.54 978.536L1430.32 988.404L1445.14 978.22L1433.13 960.75L1422.06 968.359Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M791.25 294.202L800.535 296.088L807.662 260.868L798.241 259.656L791.25 294.202Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M880.062 428.024L884.788 434.78L917.634 411.034L912.737 404.25L880.062 428.024Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M578.688 289.142L584.746 297.97L610.573 280.227L604.515 271.406L578.688 289.142Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1114.06 514.526L1123.32 528.051L1126.28 532.376L1132.76 541.85L1134.24 544.008L1141.98 538.709L1140.71 536.837L1139.04 534.413L1131.07 522.752L1121.81 509.219L1114.06 514.526Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M760.219 351.841L762.635 355.19L763.883 354.301L769.655 362.326L773.441 359.594L772.494 358.281L778.947 353.634L779.901 354.953L781.586 353.741L786.548 360.641L789.616 358.425L788.541 356.933L797.124 350.751L794.75 347.466L793.323 348.492L788.225 341.406L784.454 344.117L785.58 345.688L777.542 351.475L776.416 349.912L775.204 350.78L769.569 342.948L766.321 345.279L767.346 346.706L760.219 351.841Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M602.844 203.753L620.726 229.807L629.467 223.812L611.57 197.75L602.844 203.753Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M662.406 209.684L680.826 236.506L689.28 230.697L670.867 203.875L662.406 209.684Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1471.75 581.192L1471.94 623.533L1479.82 623.49L1479.67 591.376L1479.64 589.253L1479.6 581.156L1471.75 581.192Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1080.19 310.035L1080.44 314.086L1082.55 313.965L1083.16 323.861L1087.6 323.575L1087.49 321.688L1095.47 321.186L1095.22 317.149L1092.84 317.299L1092.11 305.782L1100.61 305.251L1100.34 300.991L1099.21 301.063L1098.57 290.75L1093.89 291.037L1094 292.851L1085.08 293.396L1085.32 297.255L1087.44 297.126L1088.22 309.533L1080.19 310.035Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1121.19 306.121L1121.45 310.18L1123.55 310.044L1124.17 319.941L1128.61 319.668L1128.49 317.775L1136.47 317.28L1136.22 313.228L1133.84 313.379L1133.12 301.861L1141.62 301.323L1141.35 297.085L1140.21 297.149L1139.56 286.844L1134.9 287.131L1135.01 288.931L1126.08 289.49L1126.33 293.356L1128.44 293.219L1129.21 305.619L1121.19 306.121Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M565.25 464.962L567.337 468.046L568.857 467.02L573.417 473.769L576.88 471.424L575.948 470.047L585.871 463.341L591.536 471.732L595.078 469.337L594.311 468.211L601.165 463.571L598.556 459.72L597.186 460.645L591.722 452.562L588.159 454.972L588.926 456.112L580.637 461.721L576.098 455.008L572.356 457.547L573.567 459.333L565.25 464.962Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1150.72 518.334L1154.5 523.863L1156.16 526.287L1184.05 507.211L1178.6 499.25L1150.72 518.334Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M673.812 447.555L676.143 451.005L678.115 449.671L684.044 458.449L675.261 464.387L677.405 467.564L679.14 466.402L683.944 473.502L687.479 471.114L686.604 469.816L694.678 464.365L692.247 460.772L690.806 461.748L684.869 452.955L693.215 447.318L690.77 443.704L689.472 444.586L685.041 438.031L681.528 440.405L682.424 441.732L673.812 447.555Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1538.66 534.098L1538.83 570.516L1547.73 570.466L1547.56 534.062L1538.66 534.098Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M413.344 839.343L420.751 845.31L422.349 843.323L431.377 832.121L442.096 818.818L434.697 812.844L421.977 828.628L413.344 839.343Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1140.06 865.721L1151.46 882.316L1160.91 875.818L1159.37 873.574L1164.71 869.909L1157.04 858.75L1151.71 862.408L1149.52 859.223L1140.06 865.721Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M844.781 442.097L849.592 449.053L880.015 428.026L875.204 421.062L844.781 442.097Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1104.03 547.646L1110.51 557.12L1132.78 541.88L1126.29 532.406L1104.03 547.646Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M110.438 389.27L129.195 415.453L136.938 409.895L118.181 383.719L110.438 389.27Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M626.781 292.969L634.317 304.595L652.766 292.618L645.23 281L626.781 292.969Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M738.188 303.361L740.511 306.639L742.231 305.427L747.695 313.151L751.094 310.755L749.516 308.525L757.884 302.608L760.436 306.208L764.359 303.44L763.642 302.436L768.295 299.144L768.919 300.041L773.257 296.978L768.08 289.656L753.015 300.313L748.305 293.658L745.035 295.974L746.232 297.66L738.188 303.361Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M481.125 127.249L485.893 134.65L490.36 131.76L489.822 130.928L496.806 126.417L497.344 127.249L505.231 122.157L504.686 121.325L511.44 116.965L511.978 117.789L516.381 114.949L511.605 107.562L481.125 127.249Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1272.16 545.749L1281.92 559.963L1295.34 550.74L1290.6 543.834L1292.6 542.457L1287.59 535.156L1272.16 545.749Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M486.312 653.507L503.205 678.098L511.48 672.411L494.587 647.812L486.312 653.507Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1270 585.231L1288.61 612.326L1296.04 607.219L1277.43 580.125L1270 585.231Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1591.91 531.254L1608.45 531.569L1608.79 513.698L1592.25 513.375L1591.91 531.254Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M610.375 236.979L628.946 264.031L636.288 258.996L617.717 231.938L610.375 236.979Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M500.125 91.5725L505.209 99.4398L509.554 96.6357L509.052 95.8612L514.386 92.4188L514.831 93.1073L523.199 87.6999L522.754 87.0114L528.017 83.6049L528.519 84.3794L532.506 81.8048L527.415 73.9375L500.125 91.5725Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M950.031 15.6072L967.433 40.9374L975.22 35.5945L957.825 10.25L950.031 15.6072Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M807.656 153.687L826.887 181.692L833.906 176.866L814.676 148.875L807.656 153.687Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1272.97 637.879L1277.48 644.441L1307.31 623.937L1302.81 617.375L1272.97 637.879Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M743.469 316.174L761.272 341.34L768.894 335.939L751.098 310.781L747.699 313.177L743.469 316.174Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M833.531 882.22L844.86 899.152L848.402 896.785L849.621 898.607L854.102 895.609L850.661 890.46L854.64 887.792L852.733 884.945L845.541 874.188L833.531 882.22Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M735.844 163.927L754.472 191.057L761.649 186.123L743.021 159L735.844 163.927Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M314.75 446.843L333.271 473.945L340.448 469.046L321.927 441.938L314.75 446.843Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M70.9688 377.494L87.1877 400.745L95.4334 394.993L79.2144 371.75L70.9688 377.494Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M291.156 471.999L309.512 498.864L316.689 493.959L298.326 467.094L291.156 471.999Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M858.125 593.628L874.401 617.308L882.489 611.758L866.213 588.062L858.125 593.628Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1841.44 488.556L1841.9 494.774L1847.09 494.387L1847.3 497.205L1863.72 495.979L1862.63 481.406L1844.95 482.719L1845.37 488.27L1841.44 488.556Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M271.344 502.304L289.061 528.237L296.239 523.332L278.521 497.406L271.344 502.304Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M943.781 718.107L960.445 741.974L968.11 736.639L951.453 712.75L943.781 718.107Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1051.84 932.643L1056.03 938.603L1085.82 917.654L1081.64 911.688L1051.84 932.643Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1656.38 734.233L1661.61 741.778L1685.18 725.42L1679.94 717.875L1656.38 734.233Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M962.688 1039.57L983.969 1050.63L989.024 1040.89L967.742 1029.84L962.688 1039.57Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1542.44 717.018L1548.51 725.796L1554.23 733.247L1564.66 725.667L1552.87 709.438L1542.44 717.018Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M785.219 1037.56L802.248 1049.1L809.332 1038.63L792.31 1027.09L785.219 1037.56Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M830.875 772.85L849.195 799.708L855.756 795.24L837.443 768.375L830.875 772.85Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1035.25 1023.78L1039.22 1029.54L1069.58 1008.67L1065.62 1002.91L1035.25 1023.78Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M784.406 837.225L788.249 842.827L819.26 821.584L815.417 815.969L784.406 837.225Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1593.06 624.768L1597.87 634.521L1619.13 624.022L1614.26 614.562L1593.06 624.768Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1505.69 984.545L1517.37 1002.22L1527.32 995.647L1515.64 977.969L1509.4 982.121L1505.69 984.545Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1495.22 905.076L1497.64 908.569L1505.21 903.312L1509.67 909.716L1519.63 902.803L1515.17 896.377L1522.72 891.134L1520.31 887.656L1512.76 892.899L1511.51 891.106L1501.55 898.026L1502.79 899.819L1495.22 905.076Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1117.97 1027.17L1121.79 1032.78L1152.31 1011.9L1148.49 1006.31L1117.97 1027.17Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1189.16 939.05L1192.9 944.5L1223.87 923.208L1220.12 917.75L1189.16 939.05Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1337.09 732.968L1340.92 738.534L1371.21 717.707L1367.39 712.156L1337.09 732.968Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M198.531 467.864L213.388 489.156L221.211 483.699L206.361 462.406L198.531 467.864Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M891.312 986.973L917.498 1004.13L921.814 997.537L895.636 980.375L891.312 986.973Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1229.97 912.017L1234.97 919.282L1246.24 911.529L1240.76 903.54L1247.3 899.036L1242.29 891.75L1231.01 899.495L1236.52 907.513L1229.97 912.017Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1126.78 848.114L1130.62 853.708L1160.57 833.125L1156.72 827.531L1126.78 848.114Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M557.719 985.716L565.039 990.356L580.176 966.46L572.848 961.812L557.719 985.716Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M652.156 322.971L659.836 334.704L674.377 325.18L666.59 313.469L652.156 322.971Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1108.94 822.026L1112.67 827.47L1142.9 806.686L1139.17 801.25L1108.94 822.026Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M799.812 1054.39L808.983 1060.15L820.878 1041.22L811.708 1035.47L799.812 1054.39Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1233.91 1007.58L1237.63 1013.01L1267.94 992.165L1264.21 986.75L1233.91 1007.58Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1230.34 398.09L1244.6 398.542L1244.64 397.28L1248.51 397.402L1248.89 385.074L1230.77 384.5L1230.34 398.09Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1403 711.039L1406.68 716.382L1437.19 695.405L1433.53 690.062L1403 711.039Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M843.25 970.231L849.976 974.663L856.393 964.924L863.334 969.5L868.231 962.077L854.579 953.062L843.25 970.231Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M705.719 439.787L710.967 447.325L732.334 432.444L727.086 424.906L705.719 439.787Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M825.25 834.314L828.742 839.42L860.556 817.676L857.064 812.562L825.25 834.314Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1167.75 808.827L1173.4 817.046L1168.15 820.653L1172.99 827.688L1183.08 820.753L1177.9 813.223L1184.38 808.762L1179.08 801.031L1167.75 808.827Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1171.78 915.446L1175.43 920.739L1205.81 899.855L1202.16 894.562L1171.78 915.446Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1883.28 639.327L1923.82 656.711L1925.85 651.971L1885.31 634.594L1883.28 639.327Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1062.38 545.211L1064.55 548.388L1070.58 546.029L1075.32 545.118L1080.31 544.853L1085.28 545.52L1089.71 546.861L1093.48 548.446L1096.94 550.289L1100.11 552.541L1103.69 555.746L1106.89 559.368L1110.47 557.123L1103.99 547.65L1102.39 548.776L1098.77 546.208L1094.68 544.021L1090.47 542.271L1085.89 541.145L1080.45 540.844L1074.63 541.231L1068.92 542.228L1062.38 545.211Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M334.75 534.629L337.417 538.445L339.64 541.622L357.121 529.373L354.547 525.715L361.846 520.602L359.516 517.281L334.75 534.629Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1496.69 839.445L1499.46 843.418L1507.06 838.125L1510.52 843.102L1521.54 835.436L1517.7 829.906L1522.72 826.414L1520.35 823L1496.69 839.445Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1448.81 460.849L1459.7 464.743L1465.99 447.144L1455.09 443.25L1453.19 448.593L1451.4 453.613L1448.81 460.849Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M358.625 234.88L362.834 241.019L366.505 238.487L367.179 239.456L381.233 229.795L380.566 228.827L384.136 226.382L379.928 220.25L358.625 234.88Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M384.031 216.419L388.24 222.543L391.926 220.012L392.585 220.98L406.646 211.327L405.979 210.359L409.543 207.913L405.334 201.781L384.031 216.419Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M622.906 971.431L630.234 975.096L641.362 952.828L634.042 949.156L622.906 971.431Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1645.66 755.246L1648.6 759.492L1650.83 757.936L1655.43 764.584L1662.41 759.736L1660.99 757.677L1664.71 755.096L1657.46 744.625L1653.67 747.257L1654.81 748.899L1645.66 755.246Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M999.719 935.072L1002.46 938.551L1003.4 937.819L1008.65 944.474L1012.32 941.584L1011.33 940.329L1019.22 934.097L1016.43 930.547L1015.44 931.329L1009.58 923.906L1006.12 926.631L1007.77 928.733L999.719 935.072Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M746 756.3L748.352 759.879L750.094 758.746L756.01 767.775L759.86 765.257L758.662 763.436L765.653 758.853L763.294 755.253L761.81 756.228L755.866 747.156L752.231 749.544L753.457 751.409L746 756.3Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1369.75 985.759L1372.37 989.481L1373.96 988.362L1378.93 995.426L1382.47 992.937L1381.44 991.46L1389.8 985.579L1387.6 982.467L1386.71 983.084L1381.77 976.062L1377.98 978.723L1378.56 979.555L1369.75 985.759Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M659.75 669.063L662.389 672.807L663.615 671.939L669.48 680.251L672.957 677.798L671.882 676.271L678.937 671.287L676.356 667.622L675.345 668.339L669.573 660.156L665.615 662.946L666.547 664.266L659.75 669.063Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1495.94 927.022L1502.63 936.819L1515.04 928.328L1514.01 926.915L1511.61 923.408L1508.34 918.531L1500.36 923.996L1495.94 927.022Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M630.625 684.663L633.063 688.242L634.941 686.965L640.857 695.65L644.506 693.155L643.646 691.892L650.451 687.267L647.733 683.272L646.485 684.118L640.964 676L637.465 678.388L638.218 679.493L630.625 684.663Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1415 948.769L1417.58 952.441L1419.04 951.408L1424 958.415L1427.66 955.826L1426.74 954.513L1434.8 948.826L1432.54 945.62L1431.47 946.373L1426.4 939.188L1422.96 941.611L1423.68 942.644L1415 948.769Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1069.44 146.131L1074.94 154.629L1089.44 145.241L1083.94 136.75L1069.44 146.131Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1403 1005.9L1405.42 1009.32L1406.7 1008.41L1411.73 1015.51L1415.44 1012.88L1414.46 1011.5L1422.7 1005.64L1420.45 1002.46L1419.31 1003.28L1414.38 996.344L1410.79 998.897L1411.48 999.872L1403 1005.9Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1027.12 923.276L1029.51 926.632L1030.79 925.729L1036.68 934.041L1040.75 931.158L1039.77 929.766L1046.33 925.119L1043.75 921.462L1042.25 922.516L1036.32 914.125L1032.93 916.535L1034.17 918.277L1027.12 923.276Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M850.688 890.453L854.129 895.603L858.732 902.494L862.612 899.898L861.651 898.464L868.075 894.168L865.451 890.252L864.089 891.163L857.714 881.625L852.76 884.938L854.667 887.785L850.688 890.453Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M648.969 751.165L651.191 754.284L652.568 753.309L657.853 760.739L661.273 758.301L660.333 756.974L668.536 751.143L666.127 747.751L665.123 748.461L660.147 741.469L656.576 744.022L657.394 745.162L648.969 751.165Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1416.91 558.963L1419.47 562.685L1420.61 561.903L1425.46 568.96L1429.05 566.493L1428.02 564.987L1436.52 559.142L1434.22 555.786L1432.71 556.826L1427.83 549.719L1424.79 551.813L1425.59 552.996L1416.91 558.963Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M845.562 874.181L852.754 884.939L857.709 881.625L864.262 877.236L861.688 873.4L860.613 874.124L855.579 866.594L851.994 868.982L852.403 869.599L845.562 874.181Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M532.344 494.195L534.839 497.594L536.366 496.461L542.368 504.615L545.372 502.399L544.454 501.152L551.718 495.802L549.287 492.488L548.132 493.334L542.131 485.188L538.682 487.726L539.535 488.895L532.344 494.195Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1626.25 725.636L1638.81 743.666L1645.16 739.241L1632.6 721.219L1626.25 725.636Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M885.562 166.962L893.407 178.386L903.452 171.487L895.608 160.062L885.562 166.962Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M371.844 569.31L374.368 573.125L375.271 572.537L379.903 579.537L383.761 576.991L382.635 575.291L390.536 570.07L387.869 566.04L386.571 566.9L382.133 560.188L378.77 562.418L379.831 564.024L371.844 569.31Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M533.562 677.503L535.821 680.888L537.176 679.984L541.772 686.855L545.773 684.165L544.863 682.803L552.943 677.395L550.577 673.86L549.301 674.72L544.863 668.094L541.622 670.26L542.475 671.536L533.562 677.503Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1389.75 531.452L1392.06 534.823L1393.28 533.977L1397.67 540.352L1401.65 537.613L1401.06 536.745L1409.02 531.273L1406.13 527.078L1404.65 528.096L1400.16 521.562L1397.05 523.7L1398.33 525.557L1389.75 531.452Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1539.31 651.384L1542.78 658.62L1561.21 649.806L1557.74 642.562L1549.04 646.736L1539.31 651.384Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1358.09 513.375L1360.48 516.86L1361.69 516.035L1366.47 522.985L1370.37 520.303L1369.48 519.019L1376.9 513.92L1374.61 510.592L1373.73 511.202L1368.97 504.281L1365.74 506.504L1366.5 507.602L1358.09 513.375Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M712.781 996.786L727.007 1006.46L732.327 998.651L718.094 988.969L712.781 996.786Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M625.844 313.391L633.523 324.686L643.289 318.038L635.61 306.75L625.844 313.391Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1308.53 520.723L1310.79 524L1312.15 523.075L1316.71 529.73L1320.48 527.141L1319.82 526.195L1327.55 520.895L1325.39 517.754L1324.26 518.528L1319.42 511.5L1315.82 513.974L1316.63 515.158L1308.53 520.723Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M303.75 49.233L308.418 57.4876L322.966 49.2617L318.291 41L303.75 49.233Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M843.469 43.5724L854.769 59.4504L861.358 54.7602L850.065 38.875L843.469 43.5724Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1210.59 766.115L1218.24 777.331L1229.06 769.966L1228.48 769.113L1224.05 762.608L1220.32 765.147L1217.69 761.281L1210.59 766.115Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1049.09 283.307L1050.46 304.012L1057.94 303.524L1056.58 282.812L1049.09 283.307Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1511.56 923.389L1513.96 926.896L1520.5 918.598L1522.69 921.338L1526.94 917.365L1525.57 915.307L1528.61 912.653L1529.55 914.353L1533.25 911.333L1532.15 909.419L1535.85 906.406L1534.34 902.562L1522.69 912.438L1521.87 910.38L1517.89 913.664L1519 915.307L1511.56 923.389Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M372.438 253.988L379.163 263.777L389.796 256.477L383.071 246.688L372.438 253.988Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1288.53 994.327L1297.4 1007.24L1305.43 1001.72L1301.72 996.307L1296.56 988.812L1288.53 994.327Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M920.438 500.946L929.579 514.773L937.108 509.796L927.959 495.969L920.438 500.946Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M721.156 591.778L729.983 604.859L737.798 599.574L728.972 586.5L721.156 591.778Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1848.06 595.52L1854.72 604.24L1866.44 595.29L1861.71 589.094L1858.19 591.79L1856.26 589.266L1848.06 595.52Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1758.47 579.523L1762.79 585.748L1773.32 578.44L1765.51 567.188L1758.94 571.749L1762.43 576.776L1758.47 579.523Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M732.094 122.586L742.404 137.589L748.893 133.128L738.59 118.125L732.094 122.586Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1035.91 850.285L1040.86 856.502L1054.74 845.444L1049.78 839.219L1038.29 848.391L1035.91 850.285Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M880.688 969.541L894.806 978.291L899.072 971.399L884.954 962.656L880.688 969.541Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1597.03 713.871L1607.08 728.551L1613.14 724.406L1612.38 723.287L1603.09 709.719L1597.03 713.871Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1044.72 268.246L1045.02 279.505L1056.59 279.197L1056.28 267.938L1044.72 268.246Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M607.656 838.232L615.429 843.065L622.85 831.146L615.085 826.312L607.656 838.232Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1606.78 601.033L1614.25 614.573L1621.51 610.564L1614.04 597.031L1606.78 601.033Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M260.781 150.886L267.012 160.174L276.204 154.006L269.973 144.719L260.781 150.886Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M587.938 354.063L593.315 362.08L603.612 355.174L598.241 347.156L587.938 354.063Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1800.59 731.268L1810.27 735.571L1807.01 742.893L1811 744.671L1815.76 733.957L1804.52 728.958L1808.52 719.951L1806.1 718.875L1800.59 731.268Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M462.094 441.753L469.594 452.848L476.377 448.265L473.53 443.919L468.87 437.156L462.094 441.753Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1840.06 462.732L1840.95 474.608L1841.01 475.49L1844.39 475.232L1849.51 474.852L1848.57 462.094L1840.06 462.732Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1341.09 953.383L1346.97 962.146L1354.47 957.126L1352.38 954L1353.74 953.089L1349.96 947.438L1341.09 953.383Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M828.688 343.54L850.851 352.44L852.5 348.338L830.329 339.438L828.688 343.54Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                staticClass: "block1",
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1569.72 521.206L1569.77 532.789L1578.77 532.753L1578.72 521.156L1569.72 521.206Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1130.91 150.91L1138.74 150.975L1138.87 137.829L1131.03 137.75L1130.91 150.91Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M691.219 854.723L698.841 859.607L704.699 850.478L697.077 845.594L691.219 854.723Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M422.719 1017.27L427.272 1021.06L437.776 1008.45L433.223 1004.66L422.719 1017.27Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1914.88 498.505L1917.51 503.554L1919.39 502.571L1920.99 505.662L1927.28 502.385L1921.87 492L1915.55 495.285L1916.72 497.551L1914.88 498.505Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1891.28 1060.29L1899.83 1067L1905.23 1060.11L1896.69 1053.41L1891.28 1060.29Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1070.5 793.89L1077.12 803.844L1083.57 799.548L1076.95 789.594L1070.5 793.89Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1056.78 773.546L1063.41 783.5L1069.86 779.211L1063.23 769.25L1056.78 773.546Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1057.09 788.265L1063.72 798.219L1070.17 793.93L1063.54 783.969L1057.09 788.265Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M185.594 66.3153L190.441 75.997L198.07 72.1817L193.23 62.5L185.594 66.3153Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1378 576.867L1386.46 588.757L1385.7 589.295L1388.75 593.584L1393.58 590.141L1390.6 585.953L1389.85 586.491L1381.32 574.5L1378 576.867Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1382.06 1069.08L1383.54 1071.28L1388.29 1068.08L1392.6 1074.5L1396.98 1071.56L1396.38 1070.67L1389.46 1060.34L1384.08 1063.94L1385.83 1066.55L1382.06 1069.08Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M927.594 1002L938.062 1008.24L941.733 1002.1L931.258 995.844L927.594 1002Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M341.5 992.229L348.921 998.095L354.636 990.859L347.215 985L341.5 992.229Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1020.47 1022.16L1029.36 1027.13L1033.41 1019.86L1024.52 1014.91L1020.47 1022.16Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M845.219 317.275L849.894 320.079L857.853 306.818L853.178 304L845.219 317.275Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1067.88 997.197L1074 1006.18L1080.26 1001.92L1074.13 992.938L1067.88 997.197Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M994.031 426.718L996.569 430.72L1011.07 421.526L1008.54 417.531L994.031 426.718Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1084.28 699.904L1090.45 708.883L1096.59 704.652L1090.43 695.688L1084.28 699.904Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1675.84 433.737L1680.68 435.466L1685.99 420.649L1681.15 418.906L1675.84 433.737Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M993.188 548.122L998.135 555.337L1001.52 553.021L997.626 547.355L1016.97 534.08L1015.9 532.531L993.188 548.122Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1555.59 775.537L1559.5 780.844L1569.13 773.745L1565.22 768.438L1555.59 775.537Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M400.438 510.562L407.235 519.046L411.716 515.453L404.912 506.969L400.438 510.562Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1277.38 859.564L1281.17 864.943L1288.7 859.629L1284.9 854.25L1277.38 859.564Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M941.438 1015.18L944.929 1017.27L952.243 1005.01L948.751 1002.91L941.438 1015.18Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M934.719 66.862L940.864 75.1954L945.216 71.9754L939.078 63.6562L934.719 66.862Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1139.03 534.408L1140.69 536.832L1156.12 526.268L1154.47 523.844L1139.03 534.408Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M424.844 990.97L431.455 996.22L435.054 991.687L428.436 986.438L424.844 990.97Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M448.469 366.787L451.287 371.104L458.944 366.099L456.127 361.781L448.469 366.787Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1680.88 683.228L1684.84 688.162L1690.25 683.795L1686.29 678.875L1680.88 683.228Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M941 1027.06L948.507 1031.03L950.759 1026.77L943.259 1022.78L941 1027.06Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M350.469 131.224L353.416 135.892L359.561 131.998L356.621 127.344L350.469 131.224Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M774.312 278.283L779.038 284.451L783.117 281.331L778.4 275.156L774.312 278.283Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M806.125 843.814L809.803 848.97L814.937 845.298L811.259 840.156L806.125 843.814Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M868.031 722.284L870.412 725.877L878.084 720.792L875.646 717.156L873.975 718.268L869.537 721.28L868.031 722.284Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M440 372.306L443.148 377.032L448.776 373.281L445.621 368.562L440 372.306Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1026.78 480.05L1032.46 480.717L1033.23 474.198L1027.55 473.531L1026.78 480.05Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M536.188 516.153L541.286 522.572L544.734 519.832L539.636 513.406L536.188 516.153Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M823.688 1023.1L828.943 1026.71L832.12 1022.08L826.864 1018.47L823.688 1023.1Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1455.09 1067.75L1457.64 1070.55L1464.58 1064.23L1462.04 1061.44L1455.09 1067.75Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1858.22 466.803L1858.9 474.785L1863.23 474.42L1862.56 466.438L1858.22 466.803Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M500.281 518.831L505.035 524.798L508.505 522.022L503.759 516.062L500.281 518.831Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M696.531 198.494L699.356 202.61L704.82 198.859L702.002 194.75L696.531 198.494Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M538.469 153.431L541.287 157.548L546.757 153.804L543.94 149.688L538.469 153.431Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1479.62 589.289L1479.65 591.412L1494.46 591.154L1494.43 589.031L1479.62 589.289Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M564.188 282.81L568.69 289.322L571.903 287.091L567.4 280.594L564.188 282.81Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M940.812 38.0176L943.293 41.5031L949.151 37.3292L946.671 33.8438L940.812 38.0176Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M499 566.093L503.015 571.508L506.672 568.797L502.664 563.375L499 566.093Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M329.812 99.1274L332.164 103.832L337.341 101.25L334.997 96.5312L329.812 99.1274Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M233.406 365.932L236.891 370.923L240.87 368.148L237.393 363.156L233.406 365.932Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M668.969 418.215L672.805 423.895L676.361 421.492L672.525 415.812L668.969 418.215Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M880.281 528.902L884.662 534.747L887.874 532.338L883.493 526.5L880.281 528.902Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M806.75 130.982L809.69 135.629L814.15 132.796L811.21 128.156L806.75 130.982Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M888.062 232.066L888.299 236.691L894.494 236.383L894.272 231.75L888.062 232.066Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1063.19 292.763L1063.33 297.26L1069.58 297.073L1069.43 292.562L1063.19 292.763Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1138.47 500.852L1142.2 506.984L1145.5 504.975L1141.77 498.844L1138.47 500.852Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1002.09 322.199L1006.44 326.896L1009.42 324.135L1005.07 319.438L1002.09 322.199Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1502.66 979.893L1505.69 984.554L1509.4 982.13L1506.37 977.469L1502.66 979.893Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1368.28 558.94L1372.7 563.68L1375.48 561.077L1371.07 556.344L1368.28 558.94Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M846.844 988.346L850.042 990.712L853.641 985.828L850.45 983.469L846.844 988.346Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M817.438 126.026L819.868 129.16L824.45 125.603L822.019 122.469L817.438 126.026Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M641.406 330.687L645.35 336.152L647.91 334.301L643.966 328.844L641.406 330.687Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M960.969 495.503L964.36 500.932L966.949 499.318L963.557 493.875L960.969 495.503Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M683.75 894.74L686.202 897.021L688.246 894.819L685.793 892.531L683.75 894.74Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M355.375 777.169L358.58 779.601L360.064 777.643L356.866 775.219L355.375 777.169Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M881.719 1014.44L884.028 1016.39L885.662 1014.45L883.346 1012.5L881.719 1014.44Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M886.562 1017.57L888.871 1019.51L890.506 1017.57L888.197 1015.62L886.562 1017.57Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M1477.62 1043.87L1478.36 1045.48L1480.33 1044.59L1479.59 1042.97L1477.62 1043.87Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M376.594 833.312L379.175 835.399L390.719 821.157L388.138 819.062L376.594 833.312Z",
                  fill: "#D9D0C9",
                  stroke: "#B9A99C",
                  "stroke-width": "0.75"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1408.29 492.733L1407.45 496.398L1405.12 499.338L1401.72 500.966H1397.97L1394.58 499.338L1392.24 496.398L1391.41 492.733L1392.24 489.068L1394.58 486.135L1397.97 484.5H1401.72L1405.12 486.135L1407.45 489.068L1408.29 492.733Z",
                  fill: "#BBBBBB"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M970.812 570.615L985.655 596.44L1002.4 584.277L1009.33 595.795L1015.94 591.205L1032.9 617.13L1025.97 622.896L1048.26 657.133L1057.23 650.944L1044.94 632.599L1076.62 611.486L1104.14 592.388L1105.85 577.772L1144.99 550.14L1146.49 551.954L1110.01 577.342L1107.66 596.117L1049.75 634.729L1055.41 642.948L1112.57 601.137L1118.22 576.489L1187.87 527.851L1184.88 524.537L1202.69 511.313L1198.53 507.906L1181.14 519.524L1177.95 515.795L1164.62 524.645L1166.64 530.081L1111.82 566.14L1106.93 559.341L1103.73 555.719L1100.15 552.514L1096.97 550.262L1093.52 548.419L1089.75 546.834L1085.32 545.493L1080.35 544.826L1075.35 545.091L1070.61 546.002L1064.58 548.361L1031.93 570.78L1029.66 567.481L1012.82 579.042L1001.85 563.056L998.145 555.311L993.198 548.096L990.774 545.658L983.281 545.959L979.467 550.355L983.281 561.844L970.812 570.615Z",
                  stroke: "#808080"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M978.25 498.734L986.661 516.075L993.702 514.605L997.674 502.7L1001.64 479.306L1008.53 469.079L1014.37 440.665L1018.35 431.894L1027.53 426.258L1021.26 416.232L1018.14 411.85L1023.63 406.378L1015.81 394.344L1011.87 396.395L1008.95 399.737L1006.23 406.414L1003.31 417.063L999.13 432.318L997.674 438.794L988.274 446.933L982.839 455.912L980.337 466.569L980.967 473.253V484.326L978.25 498.734Z",
                  stroke: "#808080"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M365.719 953.656L400.351 984.401",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M439.334 871.296L381.729 825.986L347.656 793.656",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M387.107 712.094L377.951 752.721L347.679 793.678L276.156 882.714L348.231 942.174L365.776 953.677L376.782 953.24L439.357 871.318L456.479 885.353",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M230.094 52.0038L280.414 22.3706L301.243 11.2188",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M999.875 745.844L1014.79 769.259L1024.42 768.743L1037.83 767.366L1067.76 813.809L1087.53 813.121",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M884.682 946.781L829.5 1033.21",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1240.5 1176.58L1285.18 1141.46L1287.24 1137.64L1286.19 1134.49L1284.19 1129.78L1282.72 1125.9L1283.04 1124.12L1285.45 1121.28L1364.22 1057L1370.32 1051.47",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M230.755 126.687L260.411 108.851L230.102 52.0228L218.723 33.7423L208.556 15.3614L192 -17.75",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M250.844 918.344L327.694 973.042L348.208 942.168",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M258.452 907.217L213.969 869.386L230.847 849.844L276.12 882.683",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M519.643 851.281L415.697 970.366L400.411 984.43L391.032 1001.14L383.955 1008.71L377.115 1014.08L369.787 1019.71L362.71 1020.68L352.449 1017.26L340.489 1012.13L330.473 1007.73L323.396 1005.54L313.135 1005.79L306.79 1008.23L300.437 1006.76L228.656 947.474L250.869 918.358L258.491 907.256L276.159 882.722",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M919.344 606.844L970.826 570.598L983.295 561.827L984.614 560.902L986.736 559.403L994.229 554.125",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1116.84 632.985L1118.67 599.249L1122.15 593.211L1199.09 538.656L1215.65 565.234",
                  stroke: "#BBBBBB",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1251.06 878.484L1257.28 874.576L1263.86 870.438",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1454.56 490.562L1459.24 491.33L1464.75 492.513L1611.23 494.557L1614.1 495.002L1637.3 506.182L1645.03 507.502L1745.51 500.882L1774.42 499.663L1778.04 500.316L1812.53 513.519L1839.57 521.659L1842.35 523.158L1844.39 525.617L1851.73 543.69L1855.45 552.081L1856.45 558.435L1854.82 563.928",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1525.25 1032.62L1526.37 1025.05L1517.24 1013.97L1456.79 1055.44L1433.51 1072.45L1410.72 1089.08",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1472.46 1080.47L1469.3 1076.14L1464.97 1072.97L1459.9 1071.26L1454.54 1071.16L1449.4 1072.68L1444.97 1075.69L1441.64 1079.89L1439.62 1085.56L1439.65 1091.59L1441.71 1097.25L1445.56 1101.87L1450.75 1104.92L1455.84 1106L1461.04 1105.54L1465.86 1103.57L1469.89 1100.27L1472.77 1095.91L1474.25 1090.91L1474.16 1085.55L1472.46 1080.47Z",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1433.5 1072.47L1441.63 1079.9",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M813.344 449.995L942.629 354.347L949.391 351.586L987.816 350.094L1066.17 344.909L1091.12 343.26L1121.68 340.47L1190.41 334.188L1213.67 350.123L1252.65 374.535L1284.95 393.382L1318.66 413.054L1379.95 449.206L1454.57 490.565",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M205.25 80.875L230.754 126.673L292.102 215.752L375.233 337.641",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M707.75 956.149L732.824 937.001L797.499 887.61L934.693 791.41L999.863 745.891L1011.11 738.031",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1033.67 -111.438L932.201 -39.3626L823.3 33.4653L708.449 110.273L619.79 169.569L375.222 337.65L278.21 407.301L262.529 424.348L234.787 499.155L227.811 515.026L183.312 585.674",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M545 70.5312L619.814 169.543",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.94 167.156L1078.03 177.383L1051.26 180.904L990.669 184.175L934.533 191.992L929.278 193.741L893.169 214.209L886.852 217.788L854.335 240.723L850.42 244.187L831.606 267.724L830.021 271.46L823.761 295.113L819.18 331.752L814.749 352.772L808.231 383.639L796.156 428.376",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.72 492.857L1363.5 489.917L1365.94 483.197L1364.5 476.642L1358.44 469.492L1350.64 468.531L1342.67 472.217L1316.72 492.857Z",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1399.84 492.75L1454.55 490.562",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1454.57 490.562L1458.1 513.583L1460.07 539.516L1459.39 548.753L1458.26 651.788L1457.98 668.72L1457.76 696.747L1457.46 783.079L1456.37 970.832L1456.84 987.815L1455.88 994.291L1447.79 1007.95L1444.29 1012.66L1429.56 1030.56L1395.31 1065.53",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1363.47 489.969L1399.84 492.78L1423.34 509.167L1460.05 539.546",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.7 492.875L1257.6 535.202L1215.65 565.251L1116.84 633.001L1107.5 639.771",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1854.84 563.969L1851.82 569.297L1817.92 609.444L1725.64 714.171L1699.99 741.051L1646.63 795.756L1571.16 881.127L1465.52 1002.41L1409.06 1065.62L1401.88 1075.59",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1370.33 1051.47L1363 1079.26L1364.26 1094.79L1370.59 1113.91",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M860.63 1052.78L856.378 1060.16L841.643 1090.4L836.689 1103.48L828.091 1132.95L819.222 1141.29L808.531 1138.16",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M-212.969 111.281L-182.732 154.053L-139.632 217.192L31.2186 444.726L41.2138 456.76L51.2879 469.024L183.291 585.677L302.574 694.715L353.676 734.933L377.904 752.712L505.239 839.926L519.593 851.265L673.673 938.658L707.732 956.128L799.417 1014.76L829.481 1033.17L860.607 1052.77L1004.98 1142.31L1130.13 1219.69L1202.45 1264.41",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1276.5 1199.5L1240.5 1176.58L1096.17 1084.7L1058.96 1061.02L1003.23 1025.53L970.095 1003.51L963.699 999.258L939.915 983.437L884.684 946.726L840.429 919.703L797.501 887.581L722.365 838.793L614.755 768.919L574.043 743.152L508.802 700.129L454.99 664.658L227.81 515.022L175.525 481.76L135.824 457.893L55.7758 396.239L52.75 393.75",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M673.686 938.688L648.138 986.723L639.62 1002.74L593.638 1089.18L524.625 1251.43",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M796.144 428.375L705.829 491.256L684.24 508.841L454.981 664.666L387.072 712.085L353.688 734.933",
                  stroke: "#BBBBBB",
                  "stroke-width": "5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M619.781 169.562L706.827 297.304L796.146 428.365",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1011.12 738.015L1108.8 669.72L1114.92 664.893L1122.28 659.938",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M796.156 428.375L813.35 450.005L893.785 570.187L919.325 606.884L922.28 611.079L994.526 713.942L1011.11 738.01",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1093.72 648.875L1108.79 669.737L1251.05 878.525L1367.37 1049.46L1370.33 1051.5L1376.34 1052.44L1382 1052.84L1387.99 1054.37",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.51 639.812L1093.72 648.877L1085.65 653.697L994.531 713.967",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1387.97 1054.34L1391.38 1059.56L1395.29 1065.53L1396.81 1067.79L1397.99 1069.62L1398.59 1070.59L1401.84 1075.56L1410.7 1089.09L1465.16 1172.37L1470.81 1180.99",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1387.98 1054.38L1382.86 1041.26L1326.35 960.198L1281.38 895.711L1272.05 882.285L1263.84 870.481L1259.24 863.797L1211.57 792.604L1153.1 705.304L1123.56 661.205L1122.26 659.958L1107.5 639.812",
                  stroke: "#8F8F8F",
                  "stroke-width": "9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M970.812 570.615L985.655 596.44L1002.4 584.277L1009.33 595.795L1015.94 591.205L1032.9 617.13L1025.97 622.896L1048.26 657.133L1057.23 650.944L1044.94 632.599L1076.62 611.486L1104.14 592.388L1105.85 577.772L1144.99 550.14L1146.49 551.954L1110.01 577.342L1107.66 596.117L1049.75 634.729L1055.41 642.948L1112.57 601.137L1118.22 576.489L1187.87 527.851L1184.88 524.537L1202.69 511.313L1198.53 507.906L1181.14 519.524L1177.95 515.795L1164.62 524.645L1166.64 530.081L1111.82 566.14L1106.93 559.341L1103.73 555.719L1100.15 552.514L1096.97 550.262L1093.52 548.419L1089.75 546.834L1085.32 545.493L1080.35 544.826L1075.35 545.091L1070.61 546.002L1064.58 548.361L1031.93 570.78L1029.66 567.481L1012.82 579.042L1001.85 563.056L998.145 555.311L993.198 548.096L990.774 545.658L983.281 545.959L979.467 550.355L983.281 561.844L970.812 570.615Z",
                  fill: "#DDDDE8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d:
                    "M978.25 498.734L986.661 516.075L993.702 514.605L997.674 502.7L1001.64 479.306L1008.53 469.079L1014.37 440.665L1018.35 431.894L1027.53 426.258L1021.26 416.232L1018.14 411.85L1023.63 406.378L1015.81 394.344L1011.87 396.395L1008.95 399.737L1006.23 406.414L1003.31 417.063L999.13 432.318L997.674 438.794L988.274 446.933L982.839 455.912L980.337 466.569L980.967 473.253V484.326L978.25 498.734Z",
                  fill: "#DDDDE8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M814.75 352.762L835.063 350.252L845.022 339.889L847.84 336.956L874.427 294.715L890.331 267.599L893.055 263.03L902.319 247.525L910.4 231.36L912.487 213.625",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M814.75 352.762L835.063 350.252L845.022 339.889L847.84 336.956L874.427 294.715L890.331 267.599L893.055 263.03L902.319 247.525L910.4 231.36L912.487 213.625",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M321.906 428.719L380.357 514.269L399.982 542.748",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M321.906 428.719L380.357 514.269L399.982 542.748",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M736.469 280.23L802.857 235.988L861.567 197.513L846.854 178.113L916.325 134.969",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M736.469 280.23L802.857 235.988L861.567 197.513L846.854 178.113L916.325 134.969",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1058.94 1060.98L1141.69 1001.95L1146.37 928.847L1198.84 889.719",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1058.94 1060.98L1141.69 1001.95L1146.37 928.847L1198.84 889.719",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M934.719 791.406L970.147 841.02",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M934.719 791.406L970.147 841.02",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M722.356 838.781L717.38 851.604L712.095 873.327L694.607 875.285L692.256 877.329L684.497 884.034L678.625 895.968L679.22 906.668L691.438 900.637L695.511 889.621L692.256 877.329",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M722.356 838.781L717.38 851.604L712.095 873.327L694.607 875.285L692.256 877.329L684.497 884.034L678.625 895.968L679.22 906.668L691.438 900.637L695.511 889.621L692.256 877.329",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M893.777 570.189L912.155 555.817L889.375 517.348L913.058 502.417L931.005 526.255L955.893 493.969",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M893.777 570.189L912.155 555.817L889.375 517.348L913.058 502.417L931.005 526.255L955.893 493.969",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1382.88 1041.25L1376.08 1045.67L1370.34 1051.49",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1382.88 1041.25L1376.08 1045.67L1370.34 1051.49",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1114.91 664.875L1257.26 874.581L1376.07 1045.64L1378.9 1049.75",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1114.91 664.875L1257.26 874.581L1376.07 1045.64L1378.9 1049.75",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.81 818.5L1378.18 833.783L1381.11 924.64L1326.36 960.154",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.81 818.5L1378.18 833.783L1381.11 924.64L1326.36 960.154",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1259.25 863.792L1316.45 826.973L1316.81 818.539L1320.96 719.75",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1259.25 863.792L1316.45 826.973L1316.81 818.539L1320.96 719.75",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1211.56 792.577L1289.95 740.468L1320.94 719.728L1365.59 689.844",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1211.56 792.577L1289.95 740.468L1320.94 719.728L1365.59 689.844",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M845.031 339.834L874.178 327.506L905.72 311.865L912.875 311.054L917.185 310.567L979.221 307.698L1014.41 303L1025.88 295.958L1033.71 280.324L1033.18 264.675L1027.71 247.729L1020.67 236.778L1007.89 229.219",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M845.031 339.834L874.178 327.506L905.72 311.865L912.875 311.054L917.185 310.567L979.221 307.698L1014.41 303L1025.88 295.958L1033.71 280.324L1033.18 264.675L1027.71 247.729L1020.67 236.778L1007.89 229.219",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M614.75 768.908L694.791 712.718L718.961 695.75",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M614.75 768.908L694.791 712.718L718.961 695.75",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1699.96 740.988L1679.39 707.281L1647.86 731.27L1636.09 714.223L1609.91 730.345",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1699.96 740.988L1679.39 707.281L1647.86 731.27L1636.09 714.223L1609.91 730.345",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1091.1 343.25L1085.99 500.409L1085.91 541.122",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1091.1 343.25L1085.99 500.409L1085.91 541.122",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1257.59 535.219L1311.18 611.934L1365.59 689.846L1384.64 717.12",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1257.59 535.219L1311.18 611.934L1365.59 689.846L1384.64 717.12",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1311.22 611.903L1369.91 573.312L1395.25 611.788",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1311.22 611.903L1369.91 573.312L1395.25 611.788",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M694.781 712.75L730.732 767.068L718.672 773.91",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M694.781 712.75L730.732 767.068L718.672 773.91",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1168.2 695.219L1153.09 705.281",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1168.2 695.219L1153.09 705.281",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1458 668.732L1526.28 669.119L1532.05 672.368L1771.64 549.719",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1458 668.732L1526.28 669.119L1532.05 672.368L1771.64 549.719",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1051.25 180.875L1058.53 264.69L1060.75 288.005L1066.17 344.89",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1051.25 180.875L1058.53 264.69L1060.75 288.005L1066.17 344.89",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1060.75 288.017L1108.7 284.517L1106.54 260.406",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1060.75 288.017L1108.7 284.517L1106.54 260.406",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1108.72 284.562H1114.58L1121.7 340.508",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1108.72 284.562H1114.58L1121.7 340.508",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M933.531 7.96875L951.457 33.2918",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M933.531 7.96875L951.457 33.2918",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M870.062 82.7077L901.468 63.9323L905.383 27.314L933.519 7.96493L955.431 -7.10983L932.199 -39.375",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M870.062 82.7077L901.468 63.9323L905.383 27.314L933.519 7.96493L955.431 -7.10983L932.199 -39.375",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M684.269 508.835L655.875 465.719",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M684.269 508.835L655.875 465.719",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M823.289 33.4688L848.808 72.8266L825.146 88.7907L803.241 103.571L795.29 137.723L759.396 159.646L733.067 145.698L708.438 110.277",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M823.289 33.4688L848.808 72.8266L825.146 88.7907L803.241 103.571L795.29 137.723L759.396 159.646L733.067 145.698L708.438 110.277",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M846.829 178.14L833.407 157.026L860.388 139.033L825.125 88.7812",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M846.829 178.14L833.407 157.026L860.388 139.033L825.125 88.7812",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M176.781 841.406L214.002 869.411",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M176.781 841.406L214.002 869.411",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M987.812 350.062L1015.78 394.333L1018.99 399.403L1023.61 406.367L1085.99 500.387L1130.58 447.905",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M987.812 350.062L1015.78 394.333L1018.99 399.403L1023.61 406.367L1085.99 500.387L1130.58 447.905",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M183.303 585.625L157.59 590.975L135.435 586.184L131.24 623.319L128.25 671.24L132.437 716.765L136.03 753.9L135.901 759.989L135.435 783.247L153.991 815.003L176.749 841.351",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M183.303 585.625L157.59 590.975L135.435 586.184L131.24 623.319L128.25 671.24L132.437 716.765L136.03 753.9L135.901 759.989L135.435 783.247L153.991 815.003L176.749 841.351",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1010.11 582.29L990.565 567.689L985.352 563.256L984.599 560.904L983.523 557.519L983 548.397L983.28 545.944L986.65 516.067L1009.2 431.191L1019 399.406",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1010.11 582.29L990.565 567.689L985.352 563.256L984.599 560.904L983.523 557.519L983 548.397L983.28 545.944L986.65 516.067L1009.2 431.191L1019 399.406",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M135.906 760.065L119.4 734.72L70.4066 676.243L44.3359 641.468L13.5113 606.685L-7.03125 574.291L-2.29177 560.062",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M135.906 760.065L119.4 734.72L70.4066 676.243L44.3359 641.468L13.5113 606.685L-7.03125 574.291L-2.29177 560.062",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M368.719 560.37L399.974 542.771L464.068 500.107L492.44 480.263L476.716 455.406",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M368.719 560.37L399.974 542.771L464.068 500.107L492.44 480.263L476.716 455.406",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M135.913 760.05L115.45 744.2L95.7031 751.315L49.8642 745.778L28.5258 737.875L-26.7849 745.778L-70.2433 755.266L-146.104 806.637L-180.083 840.616L-274.909 910.962L-330.75 945.687",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M135.913 760.05L115.45 744.2L95.7031 751.315L49.8642 745.778L28.5258 737.875L-26.7849 745.778L-70.2433 755.266L-146.104 806.637L-180.083 840.616L-274.909 910.962L-330.75 945.687",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1252.52 416.219L1142.78 509.034",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1252.52 416.219L1142.78 509.034",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M55.7812 396.268L74.6173 366.656L143.085 317.781",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M55.7812 396.268L74.6173 366.656L143.085 317.781",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1436.78 449.438L1446.31 466.527L1454.6 490.574",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1436.78 449.438L1446.31 466.527L1454.6 490.574",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1252.56 416.262L1284.99 393.406",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1252.56 416.262L1284.99 393.406",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1571.56 728.625L1594.24 736.937L1646.63 795.694",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1571.56 728.625L1594.24 736.937L1646.63 795.694",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M939.915 983.437L952.499 958.939L954.607 884.784L922.75 837.344",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M939.915 983.437L952.499 958.939L954.607 884.784L922.75 837.344",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1135.69 441.936L1213.68 350.125",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1135.69 441.936L1213.68 350.125",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M724.467 152.375L685.942 178.3L683.812 200.339L717.692 252.104L736.47 280.295L706.829 297.342",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M724.467 152.375L685.942 178.3L683.812 200.339L717.692 252.104L736.47 280.295L706.829 297.342",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1020.46 840.5L1033.13 858.558L980.397 896.037L982.971 970.665L963.719 999.266",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1020.46 840.5L1033.13 858.558L980.397 896.037L982.971 970.665L963.719 999.266",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M912.871 311.11L902.847 304.103L894.501 291.582L891.375 280.114L893.06 263.031",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M912.871 311.11L902.847 304.103L894.501 291.582L891.375 280.114L893.06 263.031",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M840.414 919.688L833.344 931.815",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M840.414 919.688L833.344 931.815",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M733.093 145.719L724.489 152.367L723.844 157.573L738.829 178.959",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M733.093 145.719L724.489 152.367L723.844 157.573L738.829 178.959",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.94 167.143L1162.55 164.332L1194.87 153.725L1240.31 149.688L1291.32 164.332L1335.63 186.758L1353.62 207.878",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.94 167.143L1162.55 164.332L1194.87 153.725L1240.31 149.688L1291.32 164.332",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M234.781 499.187L245.974 490.76L273.902 458.961L295.556 429.515L319.016 400.29L339.81 374.25",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M234.781 499.187L245.974 490.76L273.902 458.961L295.556 429.515L319.016 400.29L339.81 374.25",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1190.43 334.193L1154.03 271.312L1137.91 245.746L1123.15 218.25L1107.96 167.152L1098.36 129.536L1094.4 90.1427L1094.11 48.6907L1096.83 5.24494L1091.17 -18.4501L1086.5 -36.3433L1080.73 -50.579L1072.43 -58.7045L1055.54 -67.92L1046.52 -78.3261L1041.71 -92.3108L1033.69 -111.438",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1190.43 334.193L1154.03 271.312L1137.91 245.746L1123.15 218.25L1107.96 167.152L1098.36 129.536L1094.4 90.1427L1094.11 48.6907L1096.83 5.24494L1091.17 -18.4501L1086.5 -36.3433L1080.73 -50.579L1072.43 -58.7045L1055.54 -67.92L1046.52 -78.3261L1041.71 -92.3108L1033.69 -111.438",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "7 5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M705.844 491.281L726.888 507.389L735.944 524.436",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M705.844 491.281L726.888 507.389L735.944 524.436",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1567.81 762.663L1571.01 759.673L1560.34 741.858L1563.97 735.454L1571.54 728.634L1549.46 698.549L1532.02 672.344L1514.38 683.402L1489.21 700.578L1477.69 701.432L1457.75 696.734",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1567.81 762.663L1571.01 759.673L1560.34 741.858L1563.97 735.454L1571.54 728.634L1549.46 698.549L1532.02 672.344L1514.38 683.402L1489.21 700.578L1477.69 701.432L1457.75 696.734",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "7 5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1003.23 1025.53L997.721 1040.06L986.908 1060.47L978.125 1078.07",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1003.23 1025.53L997.721 1040.06L986.908 1060.47L978.125 1078.07",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1049.51 1105.23L1060.42 1083.11L1036.93 1059.97L1027.12 1054.68L997.721 1040.03L962.852 1019.03L951 1040.88L984.521 1059.13L986.908 1060.44",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1049.51 1105.23L1060.42 1083.11L1036.93 1059.97L1027.12 1054.68L997.721 1040.03L962.852 1019.03L951 1040.88L984.521 1059.13L986.908 1060.44",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M2017.11 834.836L1995.65 833.638L1957.19 817.344L1879.05 781.135L1829.43 761.377L1810.38 754.327L1803.34 751.724L1772.72 752.47L1745.42 742.817L1734.71 722.758L1725.62 714.188",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M2017.11 834.836L1995.65 833.638L1957.19 817.344L1879.05 781.135L1829.43 761.377L1810.38 754.327L1803.34 751.724L1772.72 752.47L1745.42 742.817L1734.71 722.758L1725.62 714.188",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1281.38 895.723L1378.16 833.839L1457.45 783.128L1500.76 777.799L1505.31 772.471L1540.72 766.074L1530.9 750.282L1530.16 742.242L1523.44 729.219",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1281.38 895.723L1378.16 833.839L1457.45 783.128L1500.76 777.799L1505.31 772.471L1540.72 766.074L1530.9 750.282L1530.16 742.242L1523.44 729.219",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1583.72 1106.95L1551.91 1059.5L1525.25 1032.66",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1583.72 1106.95L1551.91 1059.5L1525.25 1032.66",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M648.154 986.65L579.938 951.781",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M648.154 986.65L579.938 951.781",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "7 5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M508.812 700.117L524.185 678.875",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M508.812 700.117L524.185 678.875",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M574.062 743.156L558.13 760.648L536.562 794.448",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M574.062 743.156L558.13 760.648L536.562 794.448",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M175.533 481.759L189.701 458.501L224.09 434.821L240.373 422.148L227.553 403.438L190.605 429.843L162.096 446.883L141.281 412.036",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M175.533 481.759L189.701 458.501L224.09 434.821L240.373 422.148L227.553 403.438L190.605 429.843L162.096 446.883L141.281 412.036",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M639.625 1002.68L656.102 1017.73L706.329 1064.19L729.102 1041.11L683.399 997.812",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M639.625 1002.68L656.102 1017.73L706.329 1064.19L729.102 1041.11L683.399 997.812",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "7 5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M732.832 936.947L717.244 915.554L709.594 901.103L712.11 873.312",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M732.832 936.947L717.244 915.554L709.594 901.103L712.11 873.312",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M799.443 1014.78L808.951 1000.7L807.438 989.832L792.502 975.948L777.875 957.094",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M799.443 1014.78L808.951 1000.7L807.438 989.832L792.502 975.948L777.875 957.094",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1027.1 1054.72L1009.38 1089.55L1016.22 1093.91L1010.71 1110.25",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1027.1 1054.72L1009.38 1089.55L1016.22 1093.91L1010.71 1110.25",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "5 4 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1829.44 761.312L1817.97 770.815L1801.55 789.597L1799.11 792.387L1787.5 822.709L1764.57 878.382L1743.76 931.624L1715.4 997.101L1691.27 1058.5L1677.55 1088.68L1658.39 1139.82L1640.44 1183.86",
                  stroke: "white",
                  "stroke-opacity": "0.4",
                  "stroke-width": "3.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1829.44 761.312L1817.97 770.815L1801.55 789.597L1799.11 792.387L1787.5 822.709L1764.57 878.382L1743.76 931.624L1715.4 997.101L1691.27 1058.5L1677.55 1088.68L1658.39 1139.82L1640.44 1183.86",
                  stroke: "#996600",
                  "stroke-opacity": "0.8",
                  "stroke-width": "1.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 8"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M365.719 953.656L400.351 984.401",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M439.334 871.296L381.729 825.986L347.656 793.656",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M387.107 712.094L377.951 752.721L347.679 793.678L276.156 882.714L348.231 942.174L365.776 953.677L376.782 953.24L439.357 871.318L456.479 885.353",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M230.094 52.0038L280.414 22.3706L301.243 11.2188",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M999.875 745.844L1014.79 769.259L1024.42 768.743L1037.83 767.366L1067.76 813.809L1087.53 813.121",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M884.682 946.781L829.5 1033.21",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1240.5 1176.58L1285.18 1141.46L1287.24 1137.64L1286.19 1134.49L1284.19 1129.78L1282.72 1125.9L1283.04 1124.12L1285.45 1121.28L1364.22 1057L1370.32 1051.47",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M230.755 126.687L260.411 108.851L230.102 52.0228L218.723 33.7423L208.556 15.3614L192 -17.75",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M250.844 918.344L327.694 973.042L348.208 942.168",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1817.91 609.406L1858 620.451L1882.29 628.719L1939.56 654.537L1966.7 674.166L1990.36 686.795L1997.61 694.326L2000.04 709.379L2004.68 720.588L2009.39 778.069L2017.11 834.782L2023.42 881.182",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M258.452 907.217L213.969 869.386L230.847 849.844L276.12 882.683",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M519.643 851.281L415.697 970.366L400.411 984.43L391.032 1001.14L383.955 1008.71L377.115 1014.08L369.787 1019.71L362.71 1020.68L352.449 1017.26L340.489 1012.13L330.473 1007.73L323.396 1005.54L313.135 1005.79L306.79 1008.23L300.437 1006.76L228.656 947.474L250.869 918.358L258.491 907.256L276.159 882.722",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M919.344 606.844L970.826 570.598L983.295 561.827L984.614 560.902L986.736 559.403L994.229 554.125",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1116.84 632.985L1118.67 599.249L1122.15 593.211L1199.09 538.656L1215.65 565.234",
                  stroke: "white",
                  "stroke-width": "0.9",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1251.06 878.484L1257.28 874.576L1263.86 870.438",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1454.56 490.562L1459.24 491.33L1464.75 492.513L1611.23 494.557L1614.1 495.002L1637.3 506.182L1645.03 507.502L1745.51 500.882L1774.42 499.663L1778.04 500.316L1812.53 513.519L1839.57 521.659L1842.35 523.158L1844.39 525.617L1851.73 543.69L1855.45 552.081L1856.45 558.435L1854.82 563.928",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1525.25 1032.62L1526.37 1025.05L1517.24 1013.97L1456.79 1055.44L1433.51 1072.45L1410.72 1089.08",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1472.46 1080.47L1469.3 1076.14L1464.97 1072.97L1459.9 1071.26L1454.54 1071.16L1449.4 1072.68L1444.97 1075.69L1441.64 1079.89L1439.62 1085.56L1439.65 1091.59L1441.71 1097.25L1445.56 1101.87L1450.75 1104.92L1455.84 1106L1461.04 1105.54L1465.86 1103.57L1469.89 1100.27L1472.77 1095.91L1474.25 1090.91L1474.16 1085.55L1472.46 1080.47Z",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1433.5 1072.47L1441.63 1079.9",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M813.344 449.995L942.629 354.347L949.391 351.586L987.816 350.094L1066.17 344.909L1091.12 343.26L1121.68 340.47L1190.41 334.188L1213.67 350.123L1252.65 374.535L1284.95 393.382L1318.66 413.054L1379.95 449.206L1454.57 490.565",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M205.25 80.875L230.754 126.673L292.102 215.752L375.233 337.641",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M707.75 956.149L732.824 937.001L797.499 887.61L934.693 791.41L999.863 745.891L1011.11 738.031",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1033.67 -111.438L932.201 -39.3626L823.3 33.4653L708.449 110.273L619.79 169.569L375.222 337.65L278.21 407.301L262.529 424.348L234.787 499.155L227.811 515.026L183.312 585.674",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M545 70.5312L619.814 169.543",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.94 167.156L1078.03 177.383L1051.26 180.904L990.669 184.175L934.533 191.992L929.278 193.741L893.169 214.209L886.852 217.788L854.335 240.723L850.42 244.187L831.606 267.724L830.021 271.46L823.761 295.113L819.18 331.752L814.749 352.772L808.231 383.639L796.156 428.376",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.72 492.857L1363.5 489.917L1365.94 483.197L1364.5 476.642L1358.44 469.492L1350.64 468.531L1342.67 472.217L1316.72 492.857Z",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1399.84 492.75L1454.55 490.562",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1454.57 490.562L1458.1 513.583L1460.07 539.516L1459.39 548.753L1458.26 651.788L1457.98 668.72L1457.76 696.747L1457.46 783.079L1456.37 970.832L1456.84 987.815L1455.88 994.291L1447.79 1007.95L1444.29 1012.66L1429.56 1030.56L1395.31 1065.53",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1363.47 489.969L1399.84 492.78L1423.34 509.167L1460.05 539.546",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1316.7 492.875L1257.6 535.202L1215.65 565.251L1116.84 633.001L1107.5 639.771",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1854.84 563.969L1851.82 569.297L1817.92 609.444L1725.64 714.171L1699.99 741.051L1646.63 795.756L1571.16 881.127L1465.52 1002.41L1409.06 1065.62L1401.88 1075.59",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1370.33 1051.47L1363 1079.26L1364.26 1094.79L1370.59 1113.91",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M860.63 1052.78L856.378 1060.16L841.643 1090.4L836.689 1103.48L828.091 1132.95L819.222 1141.29L808.531 1138.16",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M-212.969 111.281L-182.732 154.053L-139.632 217.192L31.2186 444.726L41.2138 456.76L51.2879 469.024L183.291 585.677L302.574 694.715L353.676 734.933L377.904 752.712L505.239 839.926L519.593 851.265L673.673 938.658L707.732 956.128L799.417 1014.76L829.481 1033.17L860.607 1052.77L1004.98 1142.31L1130.13 1219.69L1202.45 1264.41",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1276.5 1199.5L1240.5 1176.58L1096.17 1084.7L1058.96 1061.02L1003.23 1025.53L970.095 1003.51L963.699 999.258L939.915 983.437L884.684 946.726L840.429 919.703L797.501 887.581L722.365 838.793L614.755 768.919L574.043 743.152L508.802 700.129L454.99 664.658L227.81 515.022L175.525 481.76L135.824 457.893L55.7758 396.239L52.75 393.75",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M673.686 938.688L648.138 986.723L639.62 1002.74L593.638 1089.18L524.625 1251.43",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M796.144 428.375L705.829 491.256L684.24 508.841L454.981 664.666L387.072 712.085L353.688 734.933",
                  stroke: "white",
                  "stroke-width": "3.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M619.781 169.562L706.827 297.304L796.146 428.365",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1011.12 738.015L1108.8 669.72L1114.92 664.893L1122.28 659.938",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M796.156 428.375L813.35 450.005L893.785 570.187L919.325 606.884L922.28 611.079L994.526 713.942L1011.11 738.01",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1093.72 648.875L1108.79 669.737L1251.05 878.525L1367.37 1049.46L1370.33 1051.5L1376.34 1052.44L1382 1052.84L1387.99 1054.37",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1107.51 639.812L1093.72 648.877L1085.65 653.697L994.531 713.967",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1387.97 1054.34L1391.38 1059.56L1395.29 1065.53L1396.81 1067.79L1397.99 1069.62L1398.59 1070.59L1401.84 1075.56L1410.7 1089.09L1465.16 1172.37L1470.81 1180.99",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1387.98 1054.38L1382.86 1041.26L1326.35 960.198L1281.38 895.711L1272.05 882.285L1263.84 870.481L1259.24 863.797L1211.57 792.604L1153.1 705.304L1123.56 661.205L1122.26 659.958L1107.5 639.812",
                  stroke: "white",
                  "stroke-width": "7.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M217.812 1587.92L521.577 1562.79L603.74 1556.09L729.089 1545.72L751.99 1544.18L859.235 1535.34L930.047 1529.5L999.239 1523.88L1095.63 1515.83L1498.62 1483.14L1529.67 1480.63L1684.29 1467.67L1793.92 1459.62L1915.04 1449.63L2037.9 1439.03L2850.09 1374.13L2913.72 1369.08L2977.32 1361.86L3164.88 1345.36L3225.61 1329.06L3295.01 1302.46L3372.97 1263.52L3421.43 1232.08L3559.99 1141.46L3695.94 1052.59",
                  stroke: "white",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1407.09 492.786L1406.26 496.2L1403.93 498.832L1400.64 500.08L1397.15 499.657L1394.26 497.656L1392.62 494.543V491.029L1394.26 487.917L1397.15 485.923L1400.64 485.5L1403.93 486.741L1406.26 489.373L1407.09 492.786Z",
                  fill: "white"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1130.59 447.94L1135.69 441.938",
                  stroke: "black",
                  "stroke-width": "4",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1107.03 445.048L1110.68 437.625",
                  stroke: "black",
                  "stroke-width": "4",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1130.59 447.94L1135.69 441.938",
                  stroke: "white",
                  "stroke-width": "3",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1107.03 445.048L1110.68 437.625",
                  stroke: "white",
                  "stroke-width": "3",
                  "stroke-linejoin": "round"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1130.59 447.94L1135.69 441.938",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "1 3 2 4"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M1107.03 445.048L1110.68 437.625",
                  stroke: "#FA8072",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-dasharray": "2 3.5"
                }
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d:
                    "M1655.04 552.656C1648.02 552.656 1642.19 558.329 1642.19 565.508C1642.19 572.687 1648.02 578.359 1655.04 578.359C1662.06 578.359 1667.89 572.687 1667.89 565.508C1667.89 558.329 1662.06 552.656 1655.04 552.656ZM1655.04 554.6C1661.26 554.6 1666.16 559.563 1666.16 565.508C1666.16 571.453 1661.26 576.416 1655.04 576.416C1648.81 576.416 1643.92 571.453 1643.92 565.508C1643.92 559.563 1648.81 554.6 1655.04 554.6ZM1651.35 556.371V561.85H1645.82V569.165H1651.35V574.644H1658.72V569.165H1664.26V561.85H1658.72V556.371H1651.35Z",
                  fill: "#FF000B"
                }
              }),
              _vm._v(" "),
              _c("rect", {
                attrs: {
                  x: "46",
                  y: "63",
                  width: "100",
                  height: "100",
                  fill: "#C4C4C4"
                }
              })
            ])
          ]),
          _vm._v(" "),
          _c("defs", [
            _c(
              "filter",
              {
                attrs: {
                  id: "filter0_f",
                  x: "-4",
                  y: "-4",
                  width: "1928",
                  height: "1088",
                  filterUnits: "userSpaceOnUse",
                  "color-interpolation-filters": "sRGB"
                }
              },
              [
                _c("feFlood", {
                  attrs: { "flood-opacity": "0", result: "BackgroundImageFix" }
                }),
                _vm._v(" "),
                _c("feBlend", {
                  attrs: {
                    mode: "normal",
                    in: "SourceGraphic",
                    in2: "BackgroundImageFix",
                    result: "shape"
                  }
                }),
                _vm._v(" "),
                _c("feGaussianBlur", {
                  attrs: { stdDeviation: "2", result: "effect1_foregroundBlur" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "pattern",
              {
                attrs: {
                  id: "pattern0",
                  patternContentUnits: "objectBoundingBox",
                  width: "1",
                  height: "1"
                }
              },
              [
                _c("use", {
                  attrs: {
                    "xlink:href": "#image0",
                    transform:
                      "translate(0 -0.147559) scale(0.000365898 0.000650486)"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "pattern",
              {
                attrs: {
                  id: "pattern1",
                  patternContentUnits: "objectBoundingBox",
                  width: "1",
                  height: "1"
                }
              },
              [
                _c("use", {
                  attrs: { "xlink:href": "#image1", transform: "scale(0.0625)" }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "pattern",
              {
                attrs: {
                  id: "pattern2",
                  patternContentUnits: "objectBoundingBox",
                  width: "1",
                  height: "1"
                }
              },
              [
                _c("use", {
                  attrs: {
                    "xlink:href": "#image2",
                    transform: "scale(0.00195312)"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c(
              "pattern",
              {
                attrs: {
                  id: "pattern3",
                  patternContentUnits: "objectBoundingBox",
                  width: "1",
                  height: "1"
                }
              },
              [
                _c("use", {
                  attrs: { "xlink:href": "#image3", transform: "scale(0.0625)" }
                })
              ]
            ),
            _vm._v(" "),
            _c("clipPath", { attrs: { id: "clip0" } }, [
              _c("rect", {
                attrs: { width: "1920", height: "1080", fill: "white" }
              })
            ]),
            _vm._v(" "),
            _c("clipPath", { attrs: { id: "clip1" } }, [
              _c("rect", {
                attrs: {
                  width: "1920",
                  height: "1410",
                  fill: "white",
                  transform: "translate(0 -117)"
                }
              })
            ]),
            _vm._v(" "),
            _c("image", {
              attrs: {
                id: "image1",
                width: "16",
                height: "16",
                "xlink:href":
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAOklEQVQ4jWNgGAV4Qcf2vv8d2/v+41PDiE8zMr/CswirWiby3DbEDMAZTMQagDcSMI0nFG24YmMkAwAn+A6lC4LFfQAAAABJRU5ErkJggg=="
              }
            }),
            _vm._v(" "),
            _c("image", {
              attrs: {
                id: "image2",
                width: "512",
                height: "512",
                "xlink:href":
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABmJLR0QA/wD/AP+gvaeTAAAgAElEQVR4nO3dQW4cR5bw8aBgyYAgL3UAX0AC6G0fQLObc8yCkLSwz6BvQRIE2H2NXs7se+OFChgD2nYfwDs3QAxFwfUtqLRLpapiVlVGxPu//P8AoqFuNBkV9eLly4jIyFIkSZIkSZIkSZIkSZIkSUjni4tl7zaor0e9GyBFQUyIxDarr6vF1fNd/9Z8pC4ATI7tEfucmBCJbc6IFu+X7y9ffCqffr7+cP2slFKuP1w/+1Q+/Xz5/vJF77apvZ0FAC24BybH9qh9TkyIxDZnQ4331z+8/qWUR/9z+39370op5ePtx/93Uk7++/6/19xsLACowV2KybEHcp8TEyKxzZmQ472UUu5ubn8sJ7//RymlLMvy1cebjz/1bpP6+KoAoAc3PTkSZ13ofU5MiMQ2Z0GO9/PFxfLx0ye/lXLy/f1/c/L946dPfoucdyK37SHR2/5VAUAO7gExOZJnXUph9nkp3IRIa/M6Uls3ocb729M3J9t+erdtHTknUtq+8Ut/94933z1++vh/7xPM8l93N3cvf/rLT/9u3bhD7EosEYO8lPtZl99Pfv/7t99+++L29uO/v/32yXe3t7e/PFo++k9C4UXsc/Vxtbh6fnZ69uv54mL59vTNyfDv3u3ah/FeHzknktr+VbAa3H2cLy7/Vpbl93Ky/K+TUv5WSilvTt/8V+92aV6GC3ON390rMdb8TKqHnBNbtf3Y2P5qCYA0RZRJjylF+jSsptNiyrL18iJlGlabUZdZSqnf9qliO/U5ADVNefFsvaZrYtSqlht/WyV1+mbmuWudE0n5fMrY9q5+T/Q1TNL6lNppMWXZenmRPIVMRFxqoebzqWLbGYA9ZLiryPCUB1nUZZcWd+atlxfJU8jrosZNKdwZRXI+nyq2LQD2kOXiaWJsL3KSzPBY4bosnyly3JTCvohS8/mUsR1uuib6NBL5EclS8jzlQZq6c9lFh6DEDXmphZ7PjxUm4RMSepaLJx0lMa4iJ0n1Q4gb6kXUfB6kACAmdPVFSIyrqElSfUWPGy+ibGG+IFpCV1/RE+Mqk6QOYdyotjBBREro6svEKEnHC5EsTeiSJEmSJEmSJElotINYSmG2Wf0YL6KY5CRAA14PiX6i2SbENqsf40U0RxUABnwM0Qsw4nGhxDarH+Olr+g5MKqDCwADvj9KAUY8c5vY5uwiJ3njpQ9KDozq4ALAgO+LVoARX0BEbHNGlCSfIV4iF1nraDkwoqOWADIE/IAU+KWwCjDim9mIbc6IkuTp8UIpslaRcmBUBx+yk+XwHsJLiLbx9ETtK/rbNjfxmPC6yO9iyZgDW47Rg2cA3p6+Odn2M2UDa6LcXWxCv+NQW8Q7vEGmmcaIqHfS2XJgjzGKuVjX4t2FsiPf4WWZaYwu4500Sa8xOvsBZOBrDix0tY1FVgw9xug3NX95dF8H/h9TSAa+Urm7uf3xc6FblmX56u7m7mXvNikGc904tdfme4xRv3gpudZ3eMSNhtI2LTaK1xyjjkdJ1Q2bloZkRtpoGB11Yxvd5fvLF+eL839ef7h+dr64WN7/5/k/CRvFx4zHSd4FoHxMONoH+YmayMhPb2RAfUJi7HgMXwCQL0TEtptw2iDGxi7URBlZlqKKHuvEx1DHjsewBQD5QkRtOzXhkBIMNTbGICbKyOhFVYZYJ581MGY8htwYQH5umdz2UliPi9FOcaTHxi6kR8lIm6KojylnjnWCseMx7CAgXYjWkdtOSTjUBEOODTpawUgqqjYx1uMLew4A+bllattJ5yK8/uH1L+eLy/vp0RPO9Cg1Nug+L2/9/frD9Yvb24/l+sP1s9vb258v31+GLRijjbl9GevxhQwwcuVLbjsNZbZiYGz05R1pO8Y6g1+EkEww2hetYJRqM1FKSs+CUZIkSZIkSZIkHYFwQIw0GHUSoEHdB7nfqW2ntlt9ZTj1TvOzswAwqPsg9zu17cR2W6zEQD1Cm8I4r2drAWBQ90Hud2rbae0mFiuZUc7sp11IM8R59D7fWgBQgnqb6B2/DbnfqW0ntZtWrKyjjsuHRH4REvFCSo9zSp/vXAKIHNTbUDp+F2K/D6htp7SbVKysyjAut4n8xjjqhZQa56Ww+nzrARjEgzOoL4hZRez3AbXttHbTTrTLMC7JqEcg0+J8FaXPwyW3Y1E6XjoErVgZOC77IV5IqXE+oPR5+I7cF6XjpTlxXPZBv5ASkfo8VGOORep4aS4cl4rsfHGxNA41GxE2J0lST8NG1CEfZtqYOtaokwBr8ULUVuad2JpelvGZ5XNoOqSd+vvaJ967FABeiNrLHPCaVpbxmeVzaHrkxwy3OSTem697+EhQP+7E1kOyjM8sn0P1ZNqYemi8N58ByFh5UVAOu1E/WcZnls8xICxjENo4iHx40yEOjfcuSwCZLkSUgMkU8MQ2l8Jpd5bxmeFzEJYxCG1c9/b0zcm2n95tO9Qh8d68AMhyIaIFfYaAp/X5gNTuLOMzw+cg7NshtHEODo13TPKPxPXF9qh9Tm23YiDs2yG0UZt1fQyQKtv6IgG1z6ntVgyEZQxCG7WZBcCBDPr2qH1Obbf6IixjENqo7VwCOIBHm7ZH7XNquyVJkiRJkiRJkiQdpPdeCTcBSpLUUJSzQSwAwHpXj1JLxrvGihwrkQ5PmnUBEDlIdolSPe6L2t8ZkPueFO/kfs6AECuRzgaZZQFACJJtIlWPY5H7uxR2Uqf3PSXe6f08IMc6JVZKiXM2yOwKAFKQbBKpehyD3N/0pE7u+wEh3jP0Mz3WS2HESimxDk+a5CCS88XFknSoCf3satp7rIn9neUMf2LfryPEO7mfs8R6KYxYieSoGQBq1Rhl+uUQkarHsYj9TbmbeAix71dR4p3cz1linRIrkRx8106tGj2atS1yf9PvJsh9T5Khn+mxrsMcFZzkaS9plwxJXRrDWNdB3v3j3Xfni/N/ni8ulueL83+++8e773q3SSJzulJzYay3saufD94D4HqLNB3qfhppX8Z6G2P6GTO9Q3vSYB2l/ZR2ZkLdTyPtixrrtLw4tp/DnwNArxYp7ae0cxvyzBN1Fza5z1dl+RwEtFin5sWx/Ry6AKAfsEFpP6Wdm1AH6DrSY2RZ+jzL56ChxDo5L5Yyrp/DT2nQnzSgtJ/SzlXU6cR1pF3YWfqc+Dlo09CbkGK9FGZeLGV8P3/TpjmHu7u5/fHz86llWZav7m7uXvZu0z4o7ae0c9XrH17/cr64vJ/mOok/nbhNxMS3TZY+J32Oq8XV87PTs1+3/ZuEFOulMPNiKeP7OfQSAP1JA0r7Ke3chDKdmEmWPid8Dvo0NBk5L46FqsakVbTpxAyy9Dnpc1CnoRVfqECXJH3JY3pViwWAJAVFmqmQJEmSJEmSJEmSJEmak0iPEYY+B0CSpAwiHj09qgCIVLFIysX80of93k7UA512FgARK5Z9GOBSXPT8QkXsd3ouj/oWxK0FQNSKZQxigG9DDHxim6mofU3OL2S0fs+UyyMePb21AIhasTyEFuDbEAOf2GYqel9T8wsdqd+z5PJS4r5XYOdJUtQjKOlnZxNfVUps8yrSq1bpfT2g5hc6Ur/Tc3l0W2cAolYsY0ScatkHqUofENtcCvNOmtrXq8j5hdDGbWj9Ts/l0SHuePaR5exsUpU+oLWZfCdN6+uWas3mXC2unp+dnv06/P7h31P/Hd3LkssjsxMDIgZ+7TbXSurEKUZifLRQ8wJNLhaV2zG5cbbJ4hCkdeIsat91eSedQ4sLNLFYVF5T5EZPAhyBuE6cQe1dwLT10N4i90uLfREt1qMj93F2pL6fKjd2LQAIHZ7pUZR10fu/dlJ/e/rmZNvPFL9/k+h9vgmlAK55ga5dLFL6OCNi30+VG7sUAKQOz7Djeh2p/7PsAib1+SpKAVz7Al2zWKT0cUbkvp8iNzZfzyZupsm0Tkzq/yyb3Uh9volr3/Vl62PSfili30+VG7t8QaQOz3IRWkXq/yzIfZ6pAI4qSx8TH5XM0veH6HIBm3OHR2D/t0ft84wFcDRZ+pg405Wl7w/V/APOvcN7s//bs881F+SZrjky+UiSJkGd6ZorCwBJ0tGc6ZIkSZIkSZIkSZIkSYIgnmUuSZK+NPpdANSzzLOxANM+yPFCbrvao8ZLz3aPKgDIL0zIwgJM+yDHC7ntao8aLxHaPfrZTE946od4xKb6IccLue1qjxovUdo9egkgy2tZiTK+kpgs+lQjOV7IbVd71HiJ0u5RBUDtd23rYRZg/UWYshuLHC/ktq+j5khSu6nxEqHdowqAt6dvTrb91G5gKW2CMXLAZy3ASO0n7YMhxwu57atIxeIqWrup8UJtd1ND8A2dUiMYW/wNfalFn9cYSOeLy7+dv7+8Pl9cLC8WF3+9WFz8deq/Ib7L95cvzhfn/7z+cP3sfHGxvP/P83/WLBaniPce7VZfo/cAtNbijot0V5dF7T6veQcTYcouKu9c/tRyfXfKeI+yLh1ZtjgPWwC0CMbafyNbsEyhZp/XLC6cstuMNmXcSotisUa8W+RuljXOQ7+iscW7pWv8javF1fOz07NfzxcXy7enb06Gf0/VZrqa36uPq7YT5VGmaFq+FnfKeG/b7vvcOOXvrCVznIf9AloEY42/kSVYag3Q2t9ri6KxBlJCXGXB1Rct3qk3R6Q43yeX4BIOASlY1lEHaClt72CmQu7vUngXIGqhtQkt3sk3R4Q4PySXhAuSDAjBsgl5gBLR+5t0AaIXWlkQb44IcX5oLgnR+EwIwbILcYCS2d/10QutTKg3RwSH5JJv2jRtPggX+V3ubm5//DxAy7IsX93d3L3s3abM7O/6Xv/w+pfzxeX9kycnPt7Wy9c3R388SYPPmxEckkvsdP2BPntBY3+3452nMjs0l5hkJKVmoSVJkiRJkiRJkiRJkiRJkqT5mfsbzyRJymbn64CzvgJRyspiXXNhrB9vawFQ893qkqZlsd6eF6A+qLEeMV62FgD3x2Q+uj8+s3h8psaJGORjUNtdisV6a9QLUAbEWI8cLzuXAO5ubn8sJ7//RymlLMvy1cebjz+1adZhyEl8FfFzRA7yXajtXkUt1olxTrwAZUKL9ejxsrUAOF9cLB8/ffLb/dnZpay8uCHcoM2QxEvhfo7oQb4Ntd2bkIp1apyXwrsAZUSK9ejxgj8HO8urPlt9juF96FP9vj9/L/O1ttR2ryKddZ9hvNJeLFRrzPdAivVB5HgJ2WH7ypDES6n7Oa4WV8/PTs9+HZLB8O8pfncpsYN8F2q7ycjjtfYFaMqLde0xr4dFL1i6NGDqijRLEq/1OWrfdUUP8m2o7abLMl6nNPXFuvVMS6ZZhjlp+oXVqEh7JfGpA77+nQX3rovO5Pgni66v1bpYtxjzzjKwNRtwGdb+SuEGvHdd7VFjZRsLmXpqXKxrj/ksOX3Odj4GOKXouyHHoO4aJz3RkQU1VjYh79ofRI/1qXe2txjzGXL63DWt5jPchTqVrrEyxAr9Lo8wC0NeFsmQ0zPZd5auWXCRg3yVAR8DYTo6S6xQCxl68RJdlpy+DSHHDA4tdBEfLorsAU9AuKMrJVeskAsZavGifig5ZnBMoYtKRJo37+jaoxcy5OJF7VFzzKGFbvgBLK3yjk5j0YsX9UHMMYcWut+0aJw0lbub2x8/B3pZluWru5u7l73bpJi8yOsQtBzzdaH7xxMfD44BB4gwvKOTVJM5RpIkSZIkSZIkSZIkSdoh+nnsisE4kdpo9jIgzVeGl8moPuNEcxKh0J11ARDhC8gu01vxVI9xoqlEz+uRCt1ZFgCRvoDsfGVoHJETY6Y4idzPmRHyerRC9+gCgBbs0b6AYxH6f+p3nfdG6PNVhMRYCj9OKP2cESWvRyt0Dy4AqMEe7Qs4FKX/zxcXy8dPn/x2f0Z1KSvHVKIuoqVw+nwVJTHS44TSz1mR8nqkQvegow2pb0wa0N8QRu9/InKfE19uQpS1n4fX4vZux0MIeT3aUcMHzQCQqq119DuNUtj9T9Wqz2vEYaQ7jsyy9XPtGa8pY52S19+evjnZ9tOjPQe/DbD2G5NqVZ2ESnYM2hurMqjZ51eLq+dnp2e/bvv3oY55U5jG69HPNe/MPy9p/P36w/WL29uP5frD9bPb29ufL99fHj3jVSPWjeXDHNRpNacxhmAYgnuqRJhJtGmkOajZ5+TlBbXXKkfWWNIw1mMJdbHIGByU9TP1lXX9OCrquGyZI2utqRvr7W2L91DnAGRa2ybuGF8Vbe0su2zrx1HRx2XLvSi11tSN9XYeivdwFTBhJ+dDyDMZLsG055JOG+RxuYqcI431dsbEe6gOzxQcxGmuLAlS2oY4LldlypGq76F4P/gpgBoyBTBxl/7rH17/cr64vJ9ePIm/BENdx82C2P/EcbmK1t/q66F4D7UHIAvKM6mbENbn6Ou4dNT+J49L9UONjzHxbjWpPxCmF12m6Mv+11zMYT9UiKQu7YO+jktn/yu7uRS6LgEIh7BMkZn9r+wyPZK+iwWAUFzH7cv+11zModB1CUCSpBWE/VCSJEmSpuB0tqQ5SLkHwASuQ1Cfb5fEEen6lKoAMIHrUJ/ff/7z9YfrZ6WUcv3h+tmn8unny/eXL3q3bQ4iJcXM7Od+Il6f0hQAJnAdYy6P/UQTMSlmlKmfiUVM1OvT1gKA1slZEjit3zOZw2M/kURNitlk6WdyERP1+vRVAUDuZHICJ/f7JrRCxufb24uaFHchxgOxn9dlKGIiXp++KADInUxO4OR+X0ctZN6evjnZ9tO7besIMT1WxKS4CTWuB5R+3oZexES9Pn2V3Dznu48M/T6X87N7yfZyEsphK/S4pvTzQ9794913n19t+30py3/d3dy9/OkvP/27d7vIvvry7eTtar7/PEu/ZyhkIqJfhOiM676yFDHRfLP6j687+Y9pill38vqd1tR3Xpn6/e7m9sfPhUxZluWru5u7l73blMHrH17/cr64vJ8CPeFNgdIZ133R8iCFnfoA77zGs0qvq+UsUc3ZLhrjejzjhsUvagSn/9Rbq4tQtn0GasO4YbIAGCHL+vwmVuwaONsVB2lcGjdcaU4CrCXq4xvHoj/WpOnRH7XKgDgujRsuRIWpadErdtLd0YDS5myzXZR+L4U9LulxQ4qTKXWdAaDfRVNRK3bi3RGpzZlmu0j9PqCOS3LcEONkl337vEvF44aR/mgVO/HuiNjmDMj9ThuXZOQ4WXfoNbV5AZCp06mojzURn8YgtjkDYr9TxyUZMU7WHXNN/WbX/1iDB5r0R00mxMNYiG3OgNjv1HFJRoyTdcdcU7vsAaC/mELtEdcZiW3OwH7XGJni5NBravOK02kuSZKm4TVVkiRJkiRJkiQpB+JGFUlSHAc9BeDFp59sJ1dJGRFzJLHNOs5eBYAXn74u31+++FQ+/Xz94fpZKaVcf7h+9ql8+vny/eWL3m3LyqSofRBzJLHNmfTMMaMLgOwXH0Kip54VTpQtKRLiexNSu4k5ktjmLCLkmNEFQNaLT4QvYR8eolRfpqRIi+8Bsd3EHElscwZRcsxeSwDZLj5RvoSxMpxcRWhrlqRIi+8Btd2lMHMksc10UXLM6FOCsp42lOFlEAS0N0BmeSsbNb6J7SbmSGKbxxjyTO927BIhx4TuoBYifAnZ0d4AmSkpUuOb2m71RbnRiJJjUMlsalG+hDkg3tHRUeOb2m71RbvRiAAzmAhTOtuQ2z4V7+gk1eaNxn66vA54H8TdwANy26eUYfOipPjc0Lif0Hel5CkdctulfTnLpd5aLh1liffQMwBRHpU4BLntdM4stJNhlosSL5R2rmvV7renb062/Uz1NzLE+6rQBUAp7CkdUtupyWUVdXBS+578vH4pnHihtHMdtd3b0ON9k9AFAHntmNL2LIOUODjpfU+e5aLEC6Wd66jt3oUc79vg1zB0uGz7FEg7gLP0PfnpDkq8UNq5jtruXSjxPnaPQugZANWVraIlLblk6HvKLNc2lHihtHMdtd3bEOJ931lFZwBmjlLRPoR4eEyWvieixAulneuo7SY7ZFbRL2LGHKT92PeSprbvsouJRpKkBPadVbQAkCQJzllFSZIkSZIkKb1IjyRJii3lOQAmQc0N/VRBtUfKk6S2kuxdAET+IkyCmqOMx66qHlKeJLWVaHQBEP2LMAlqrjKcKkgV+YZoE1KeJLWValQBQPgiMiVBWlLZJMNnIMl27Gp00W+ItiHlSVJbqUYVAJQvgp4EqUllVYbPQEM4ozwTwg3RLqQ8SWor0ejDAaKfW04/BCHD2+EyfAZpDOqb7kh5ktRWqlGd6BfRBjWprKJ9hrGvzdT0avR9q+8z+g2RNMaoJYC3p29Otv3UbuCcZJjuonwGlyr6qdH3Lb9Pl1w0BiEevIAH0WqWpeYdEmWmyKWKfmr0vd+nIrlaXD0/Oz37dci1w797t2uTMElZdZGCsgXaUkUmNfre71OHmPqGiFaMpjwJUF+i71quocdSBWFKsIUafU9ZelIMtZaMWj8xd2xOsQA4EiGpUx7jHGOK/m69hpthv8FUfVOj712T1z5q3xC1KEanyikuARyINqVO37VM6+8BbUpwHbXfpV1qLRm12Ac1ZU4JUQDQHsWiJXXK5rxtaP29jro+Te939UHI5/QboqlyStclAOrUKG1Knf4YJ62/11HXp+n9ngVlKYOSzzMsGU2VU7pdAOh3F/QKkoba3/TZF2q/Z0BafqHnc5Ipc0rXBESdGqUndRr7uw/7vR/iBZWaz+es6yD27kKSNqNdUM3nPN32AGRYh5GkWkh7R8znTE7jSVIwLr9IkiRJkiRJkiRJ+3FziqRaaPmF1l5NY3YvA6KcViUdw4TeBy2/0Nqrac2qAPC1uMrOhN4PLb/Q2qvpze5xEtrhGtsQXrihtoinx2VDyy+09mpas5oBKIV1uMYm3uFpG1/e0x8tv9Daq2nNqgCgn1aVZcqO0t9EJvR+aPmF1t4xyG3Hs/PrO19c/u38/eX1+eJiebG4+OvF4uKvvds01jBbMcQJdfYiapyfLy6W2356t20qmT6LppMht/SI7UlmAJyWbod6h5dh9iJ6nL89fXOy7ad3244Vve/VDz23tI7t1ULj6MTgxqN2Wp0PXmuDIXnDkXHej32vh1BzS8vYvlpcPT87Pft1yO9Xi6vnj46tktx41E7tO7zalSh19qKUdnFOneKu2W5zjB5CzS2tYnvbLMmjKf5Qq86nJkeC2tNoGTYc1Yxz6hR3q3ZTE7y+VGO803NLi9jeVmgcfefYYlp609TF2enZr1P8bv2JOo3WQs04p05xt2q3r8blM4dv1jK23/3j3XePnz7+3/tCafmvu5u7lyfRD5ShJkeiTQHy019++nfvdu0jejxvQy2+qO1eRY0ZCnIOzxIb2wqNR9E/HHn9jzIFVQp/Go06hT6gTnFT210KP2YoiDk8W2xs2zsW+uI/oN2ZOt3VFvkOoxTuFDe13aVwY4Z6R0rK4dTYOET4QKIlmTkFTyQZpqLVFilmyDcVtBxeCis2jhGy8+nmEjyRkO4wFAMlZrypaI8SG8eyAKhgLsETBfEOQ33RYsabinZosXGMVB8mgjkFj6Q2vKlQDV6QJCkwbyokSZIkSZIkSZIkSSSUEyelTB71boB2MzEqs2xHrkok6QsA6gXUxKjsar+CWrtRc6Omk7YAIF9ATYyaA+JLYtYRL6Lk3KhppSwA6BdQUmIkJsBNsnwOGurbBKkXUVpuzDAuI3+GlAUA6QK6TfTESE2A67J8jshJZhvqK6hpF9FVlNyYYVwSPkPaU6TIR2dGP/kry8tJMnwO8lviyMhn80fPjRnGJeUzbLyYUN85PYh+Ac2AnABXkT8HJclkFP0iug0lN5LH5aD2Z5jiOv3N6j/W7x6odxORAjmru5vbHz8nwLIsy1d3N3cva/yd2sVoq89RyvSf5fUPr385X1zeT+ee1JvOpd8QTO3ri+gfSxfhc0/09g1ajstaan2GKa/Tf+wBaL2uFX2dT9u1WLttsX7Wag265mepuVeEsIbZw9vTNyfbfnq3LQPq3pBVtT7D1NfpLwK2xbSLa5Z6SKap7ZqfpeZ0bqbvQMpkyuv0F0mi9rqWSUVjZVgDHFA/C7XdUmZTXqf/WAJoMe1CeQRlH6RpKZLoj0Hug/pZqO2mM6f0Qej3qa/Tf2wCbLV+lWFzRyl5NkxGRN5ktY76WajtJsuWUyibR0n9PnV/Nv1yKI+gPMSlDElTypRTSPu8MvX7ITAX3WhcH5VYot+RZsgpxAtqhn4/VMqjgFvIsD5KWPOSjkV5nDFDTiHu88rQ74eyADgA/TlVSkKUjkU5t5+eU1aRLqiZ+v0QYafDVAdxik46xpyneFvLss9rLvxCZsiEqDmhntsv1eYSwAyRpuikY8x9ilfaxRmAmXGKTpIkSZKkyJyy1JwY71J97gEIzkf2NCfGu9SOa76B+cie5sR41yGin/AYmTMAgRFP1crOqel6jHftI+NsUev8YgHwWdTEnvWRvaj9vU2WZBO937PGO0n0GCmFc8LjWL3yy+wLgMiJPeMzzJH7e5sMyYbQ7xnjnYQQI4NMs0U988vk6yak9RjXHNsi9zf59ERyv6sNYoxkOuGxV36ZbAaAVD0OMlWRBOT+Jk9Nk/s9A8IMBi1Gss0Wtcgvm/pmkgKgxRRGrS+WnNiJWvb3VDHTMtkY53nQbopIMfL29M3Jtp/ebdtX7fyyKw4n66xaUxhXi6vnZ6dnvw5LC8O/j2+xx+K21qq/a8ZMLcZ5LrQpdWMkp4ficLIvtsZ6DG0QqT9izBDbvIq076el2uu69ntb1P7eFYeTLAHUmsKgrUupP2LMENtcCm+Ku7VaU+r2e1v0/t4Vh+GrmUw7PdUGMWZobabPWtRWa0rdfm+L3t8PxWHoAoC8LkWdLqIjxgyxzaWwH40kj2xz9+kAABK4SURBVE9yvxNl7u9vejdgF+IAXd+8RdiANiAnxQGx/cQ2l3I/tfh51qIsy/LV3c3dy95tegh5fA6I/U7OLcT+Hmv2JwFOiXpiHH2NS+0Rn8Omjs9VtH6n5xZaf+8LWZFFRpsuoq9xSfugjU8yc0t8zgBMjHSYRincHejSIWjjk8zcEp8FwISo00UmRc0BdXySmVticwlg5qg70CXFZm6RJEmSJEmSJEmSJEkKwh2yEgtxzBLbLNFtfQyQfoKT+jGZ90Ecs8Q2S1lsLAAyHJmp9kzm/RDHLLHN6subi2ltLAAyneBkwLRhMu+LOGaJbVYf3lzUsXUJgH6CkwHTFj2ZZygUiWOW2Ga1Rb65iJ5XNhYA9CMzyQEzoPT1KmIyz1IoEscssc0DQhuzIN5cUPJK2uMYqW/9Gt5PPrw/m/K+cuKxn76tTPuijs9S7sdo1LH4kHf/ePfd46eP//e+WFz+6+7m7uVPf/np373btQkpr3QLhtrBSAqYASlwsqAWimqPOj7JRUspzJsLSl5p3nktgpEYMANK4GTRslAk34HpHm18UosWOsoNaNNklCkYayVzSuBk0KpQpN+B6U/E8dmqaLHAvUe6AW3eGFoFva5mMicFjsbJVPQS1LwIUcdn7aIlW4FLLWQOaXfzD0msoAdZkjk1wKnoRe8gctxkuwhNpXbRkiUnlsKNoWPa3XQwUyvoVeRkTg3wTSJfjNaRi95S4sdNposQETknDqgxdGy7EQk0Emoypwb4uugXo3X0opcSNxkuQpsQCl1qTlxHjaFj2h06sKKhJ3NqgA8oF6NsCHGT5SI0oBS69Jy4ihpDx7Qb9QXpONQAX0W4GGUTPW4yXYRKsdDtgRpDx7Y77AfTtKgBvi76xSibLHFDY6GrFhzAwvBipLmw0FULJk1JCsRCV5IkSZIkSZIkSZK0atc6sqQYeo/TRz3/uKRpXS2unu/6t5RZ7wvqWFHG6SQFAKXTFQM5XiK3/fL95YtP5dPP1x+un5VSyvWH62efyqefL99fvujdNqmmKBfUMSKN06MKAFKnqz9yvBDafn9K3KP/uf2/u3ellPLx9uP/Oykn/+3pccos0gV1jEjj9OACgNbp6oscL6S2393c/lhOfv+PUkpZluWrjzcff+rdpjmKPFOUTaQL6lhRxunBBQCx03dxwNZFjhdK288XF8vHT5/8dn96XCmlnHz/+OmT34ztdggzRRlFuaCOEWmcfnPM//nu5vbHz8dVlmVZvrq7uXs5VcNaWX/LVtS3bmVAjhdC2z0lrq/PM0V/v/5w/eL29mO5/nD97Pb29ufL95e+xKeiry+cf1xQQ46JSG06uCEZjqv0rVvtkOOF3Ha1le0lPsPriHu3Q3XM/ovNNmClrAgXoywv8RlmQoc+d2Y0p9mfA0BaO9rGNV5lRllXj7S2ewzSplcdJ3Q1XRt9ardVlU6481JOLZbpjO+vOTM6D2FnAFpUzW9P35xs+5ni99f8DC2qdMqdl/poMUZrPoFhfG/XYmaUNjOSUbgCIMOgbPEZaj+a5jSgtmk9RmtcjIzv7WovZRBzfNZiJdS0V4Zd+S0/Q+0NR04D1kebfm49Rmsu0xnf7dFyPHEz5D45JdQMAOXAlV1afYYWG44ybJCMingXVEr7MVpzmc74bo+U42mzRIfklHB3Hhkeo8nwGegbJCOj3QWtM777os0arSPFD2WW6NCcEiqIyINykOEzqD5KYllnfPdDnI5eR4uf7MVKuA6XjkW4QyIlFvVHnzUimkOxEu5DSIei3CHREotioM4aqb5Dc4rJRil4h6TsnDXS1CwAlIZ3SMrKWSPVcNTrgKVICK/slQ7hRV41GFRKwTskSaog6zGI0kOMfUlZ7TwJkHpamXQscuxbtEgaY2sBQDsGcWDy07GosU8uWiS1t7UAIJ3ZXIrJT9OhxX4pzKLFYr0v+7+PSP2+cwmA8rIMYvJTbJTYH5CKFov1vuz/PiL2+9bd0bRd1T4DrqnQYn9AOCjGA5v6sv/7iNrvYZPZvgjJT6qFVLSQi3XCeyYeQu5/soj9nuIgoK+T38n3j58++e18cREu+T2EnGDIbacj9TvxwKb190pEfc/EGMT+z5BbIvb7zj0AFG9P35xs+5ny79TcvBFxfWgsctvV1vniYvn46ZPf7mfqSlkp1sNsjFqXaY8Rrf+z5Jao/Y6uqFqp/Za5lutDU1fSUde2pClFnL7NztxSX4oZgJpaVP8tdnDXqqRJu8+lQ9GeCsmgdW7pfTfegwXAA1oFYc0EU7uIMTkqs6jTt3PQIrdkWWY4hEsAI9R+wqDFDu5aU5ik3efaT4aNV0T2+70WuWXuywwpngKoqcUTBi0Ge60dqC0TlYmxjQw73omxkqHfS5mu71t8f69/eP3L+eLyfob3ZH5LmC4BPKDVEwY10acw5zxF1xp9xzs1Vuj9Xgq37+e8hIm5iGme5j5F1wN1xzs9Vqj9Xgq37+e+hNntAxKn6NQHOTFuEzn+yadqkmOF3O+lsPs+k31yS/MlAOo0kfrJNEUXPf7py0XUWKH3eyncvs/ikNzS9A6EOk2kfjJN0Rn/dWWKFRr7vq9Dc0vzL8ZpIs2Z8S+phkNyS/PHACO+EEFqxfiXVMMhuaXpDIDTRJoz419SDeYWSZIkSZI0MdKjKZIk6Wt7nQMQ/RnmfVjEaB/Gi+bCWG8jQj+PLgAynFVdSq4iRvUZL5oLY72NSP281+5A+jPMHsSifdDjJfJxw4qFHuubRIz/aP281xIA/ajH+w5+dP/qx8J/9WOEKaTMqPES6Q7jWMZ4G9RY3yRy/Efr59EFQIazqkvhFzGlxA7wfUWPH1q8uFSnQ9FifRNC/Efq51DTI7VlOCwh2hTSoa4WV8/PTs9+Habphn/3btcqary4VBdLxKnoddRY3yRy/EfrZ9QXq3uRA3yMbAk+GvprZUvhx3gpjCI3owzx30rz1wHPSa3p7UhTSIeItg6WSY+luhq/mx7jhKnojLIsVbfiDEAFNSv/aFNIh7JK56sV51liPMMshnLDDCYKp7cfliXBz5lx/jCLXEVnsq3Ayl9zYJxvZ5Ergm96NyAj+jvfCbuW1Z9xvl3L8UMcr8Q2Z+QmwImRN6Fkevaa0N9kxnl/xM9BbDPR2HGIqMCsFuvLsqZLfvTKOK8vS5wTPwexzasI43Pf/Bd6BsBqsZ0Mj+ZRH70yztvJEOelMD8Hsc2lcMbnIfkvbAFATeZk9GeviQnGOG+PHucD4uegtZk0Pg/Jf6GnM9xl3E6WXcvER6+M83ayxDnxcxDbXAprfO6b/8J2einMZK5+qAnGOJfioozPQ/Jf2KRITebSPoxzKS7HpyRJkiRJkiRJkiRJkiQlRTj2ODu/g+OEPQhojrIEc5bPIW1CORkuM/J3ECk/ji4AIjU6G3Iwr8ryOVQfNZ+QTobLivodRMyPDxYAERv9EFJyoQbzuiyfgy567BPzySricdPZEL+DqPlxZwEQtdHbEJMLMZg3yfI5qAixT8sn29DOs8+I9h1EzY87C4Cojd6EnFxowbxNls9BQ4l9Uj7Z5nxxsXz89Mlv98fCllLKyfePnz75LfrMSybU7yBifnzwKEPKOcilsF7aMMhy1GSWz0FFiX1SPsmI8E77jKLmx51/OGqjtzG5aK4IsU/LJ5lcLa6en52e/ToUAMO/e7dLfaUZdCYXzZWx/yXvcr90+f7yxe8nv//922+/fXF7+/Hf33775Lvb29tfHi0f/eeUyy/2u6TJ1V7bo/9+3Rs2Pg79HXEjZC/ni8u/nb+/vD5fXCwvFhd/vVhc/HWq322/c3kQ0MyQLka1d7bTf7/+RNkIuUvNsVlrA1qGfp8zC4CZoF2MaicW+u/Xl8hPGNQemzV3zZP7nW6K78/1miNQ1rxarQFOrfbOdvrv15cIGyHXUcfmKmK/k025obPbDABpKnod7W6aWqXXfm6W/vtbizxmqc+GU8fmgNrvVFPPLDa/e6U/jkKt2GlVeu2d7fTf3xJ9zEZHG5vqa8qZxaaJiHrxXEeb2s10MVJbWcZsVI7NuKIu8U5ZMDb/cLSL5yZW7JqTDGNWGivyjNfUBWPzAoB+8bRi19zQx6w01txmvJpesLx4SiyOWc3NnGa8HMCSJH02pxkvCwBJkoozXpIkSZIkSQmRTqwitVWSajMnHme2LwMiHedLaqsk1WZOnMYsNzWQnvUktVWaQtQT2Maitz86c+J0ZjkDQHoBB6mtiokyTUq/q6O3n8KcOJ1ZFgClsN7URmrrLpQLURakC9LUbzlrjd5+miw5sbdZFgCkV1iS2roN6UKUBe2CRL+ro7d/l2i5JkNOHPRu8zc9/3gvpPU5Uls3+Xwh+vv1h+sXt7cfy/WH62e3t7c/X76/dL2uotc/vP7lfHF5f0E6YVyQ7m5uf/x8AltZluWru5u7l73btA96+9etvwQnyktx6DmxlDh9i+9IxZfxbG3CRi/Skab0E9jo7V/nRrt6IvXtZIFJSIjqg3QhekiLV4VOMZayXZC0Xa3cm7FwjyJK3x69B6Dl+m7v9RLtr8d6Xa3fXXtdfcqx9Pb0zcm2n+Nbmgs1r9TOvW60qydK3x5VALTaaOQmsnamToYtL0S146TmRi/apr0MyHmldrxk2mgXTaSboqOTcO2pjEjrJZm1mNquqVWc1FzOiDItOAcZ8orxooc8lNePXgKoPZWR+fGaKDLcfbaIk9qVe5RpwTnIkFfI8eJMQn1j8jpio1GmTWRRZbibIMeJm/baM17ao8800jyU18MGyoAW6NSnIcjJsBRenGRAjfVSjJceiMsu5Bgv5eG8jv1g0ZArW5Oh9kGOdfVFmWnMEONj8rrJfQLEylY6hLGuYxBmGucU4xYAE6FUttKxjHUdgjTTOJcYn+W7AGrIdg64tI2xrkNEu8jvMpcYx3whkZEqW+kYxrqyM8YlSZIkSZIkSZJUm8dmai6Mdamdo98FoHrIbyuT9mGsS+25ozGoOR1GoXkz1jUnkY4XdgYgqAxvK5PGMNY1BxFnuSwAAqO87tN1Wx2LEuul5Ih3+megtT/qK9e3FgC0Ds6m9rvnpxCxot1XpP6cK0Ksl5Ij3umfgdr+qLNcX61DZHgLkuqjr9tmivNIa4pZtYr3mt8lfczS2x/xRUhfzAC0nKaoXd1Hu3vIJmpFO0bU6bh9Ue+GiGrHe4vvkjxmS2G3P+os1xcFQIsOrh3oJsV2Wq7bTjlQeiSSqQd6liKGpFa8t/wuSXstNqG2/+3pm5NtPz3b9dUegJodXDvQTYrttKpoaxV0rRJJrfaT74aIasZ7q+8y6l3oWPT2R/RF9dHiLUi137M8l/c4z0GtNb9Wb/uqvWYZcU1Rh/G7VA/Npx9qB7oD6WGkTWP0gq5W+31l6XjR493vsr/oMVLLNy3/2NeB/scUziSBXvv37/q7hOBZ3+lO2Pl+d3P74+eCrizL8tXdzd3L3m3aR632E+KtN0q8Z/wuzYkM4b+gyEiPkhEfoaHfGdHbP6Ak81XEeM/AnMiCGtSREIOHPp2utkjJfBPjvS1zYl+HFOoeBXwg4i5s6iM0ai/DEzXGe1vmxD6OedLIGYAjkDYcZpmOVjvkuyPjvQ9zYlvHzrogPmREGYJH2oWUzNWfObGPYwp1vxRJXzGZSwzHFOoOZEmSgCzUJUmSJEmSJEmSJEmS1Jyv7pRicmzOjycBqoljTqvSPHlBasOxOV8WAEC0xJjhWNkBre+JvCC1k2lsan8WACDUxEg8I3wdte9psl2QoheMGcamDmcB8Fn0gUpPjOSXbtD7niTLBYlUMJLHZgY9rz2zLwAoA5WcGM8XF8vHT5/8dn9UZSmlnHz/+OmT36IXXQNy36+i9Df9gkQqGOljkyzCtWfyowIPeSdxL7T3V/tyln7IfX+1uHp+dnr26zA2h3/3btcmWY42Jb9JkY5wDYpy7Zmsk0hJZhVloGZJjETkvo+SaOaGXDBS0a5BEa49kyQvcpJxoCq7CIkmqhp3i+SCkYp4DYpw7ZlkDwB1jbT2+hd1HY3abqIWfU1fU6+h5vrr29M3J9t+pvob+lLLa9AUYzbK3ovJNgESk0ytgRphc8chqO0mFiyt+rp1oiF8F6RNeusI/dtL7WvQlGO2ZZG4K2YmKQBqJBlqoFOTC7Hd1IKlZV+3SjSk74I4Y0nq301q5/PahW7W/BhuSoq2kWMT6porqd3ENb9VpL5+CPG7iLD+OhaxfwcZ8vmANGbHxkyocwCIVdYmxOWQUljtJt7FrSL19UNo30WU9dexaP07yJLPB6QxOzZmws0AkKqsTag7gIntJt3FrSL29UOo3wUFtX/p+XxAHLNjYiZcw6mBrraIAzIrv4u6yP1rPu9jbMyECh5yoEuS/mQ+lyRJkiRJiuD/A8liuPEn9/YKAAAAAElFTkSuQmCC"
              }
            }),
            _vm._v(" "),
            _c("image", {
              attrs: {
                id: "image3",
                width: "16",
                height: "16",
                "xlink:href":
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAXklEQVQ4jaXOyQ2AMBAEwV5HRwROggSd3fKwkIXwscf8qzWitd68E2l4pnqVDAYoGdwDCTweBDEizR6YYPuDBbYFNvgcOOB9wIDXASOeBxz4H3DibyCARyCIeyCBAR4oTTI24fHFggAAAABJRU5ErkJggg=="
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "kostin" }, [
        _c("img", {
          staticClass: "kostin__picture",
          attrs: {
            src: "/Igor__Kostin.0b70b8c7.jpg",
            alt: "Photo d'Igor Kostin"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "kostin__info" },
          [
            _c("h3", { staticClass: "info__name" }, [_vm._v("Igor Kostin")]),
            _vm._v(" "),
            _c("span", { staticClass: "info__job" }, [_vm._v("Photographe")]),
            _vm._v(" "),
            _c(
              "router-link",
              { staticClass: "router_igor", attrs: { to: "/temoignage/1" } },
              [
                _c(
                  "svg",
                  {
                    staticClass: "kostin__story",
                    attrs: {
                      width: "16",
                      height: "19",
                      viewBox: "0 0 16 19",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d: "M15.75 9.09327L0 18.1865V0L15.75 9.09327Z",
                        fill: "white"
                      }
                    })
                  ]
                )
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "yuri" }, [
        _c("img", {
          staticClass: "yuri__picture",
          attrs: {
            src: "/chernobylworker.2ad1d57b.jpg",
            alt: "Photo de Yuri Korneev"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "yuri__info" },
          [
            _c("h3", { staticClass: "info__name" }, [_vm._v("Yuri Korneev")]),
            _vm._v(" "),
            _c("span", { staticClass: "info__job job--yuri" }, [
              _vm._v("Opérateur turbine de la centrale")
            ]),
            _vm._v(" "),
            _c(
              "router-link",
              { staticClass: "router_yuri", attrs: { to: "/temoignage/2" } },
              [
                _c(
                  "svg",
                  {
                    staticClass: "yuri__story",
                    attrs: {
                      width: "16",
                      height: "19",
                      viewBox: "0 0 16 19",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d: "M15.75 9.09327L0 18.1865V0L15.75 9.09327Z",
                        fill: "white"
                      }
                    })
                  ]
                )
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "tatiana" }, [
        _c("img", {
          staticClass: "tatiana__picture",
          attrs: {
            src: "/fille_pripyat.7634132a.png",
            alt: "Petite fille dans Prypiat"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "tatiana__info" },
          [
            _c("h3", { staticClass: "info__name" }, [_vm._v("Tatiana")]),
            _vm._v(" "),
            _c("span", { staticClass: "info__job job--tatiana" }, [
              _vm._v("Petite fille de Prypiat")
            ]),
            _vm._v(" "),
            _c(
              "router-link",
              { staticClass: "router_tatiana", attrs: { to: "/temoignage/4" } },
              [
                _c(
                  "svg",
                  {
                    staticClass: "tatiana__story",
                    attrs: {
                      width: "16",
                      height: "19",
                      viewBox: "0 0 16 19",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d: "M15.75 9.09327L0 18.1865V0L15.75 9.09327Z",
                        fill: "white"
                      }
                    })
                  ]
                )
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "liquidateur" }, [
        _c("img", {
          staticClass: "liquidateur__picture",
          attrs: {
            src: "/liquidateur.8ecb220c.png",
            alt: "Photo de liquidateurs"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "liquidateur__info" },
          [
            _c("h3", { staticClass: "info__name" }, [_vm._v("Liquidateur")]),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "router_liquidateur",
                attrs: { to: "/temoignage/3" }
              },
              [
                _c(
                  "svg",
                  {
                    staticClass: "liquidateur__story",
                    attrs: {
                      width: "16",
                      height: "19",
                      viewBox: "0 0 16 19",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d: "M15.75 9.09327L0 18.1865V0L15.75 9.09327Z",
                        fill: "white"
                      }
                    })
                  ]
                )
              ]
            )
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-d58708",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$d58708', $d58708);
          } else {
            api.reload('$d58708', $d58708);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../data.js":"data.js","./Sound":"components/Sound.vue","../assets/images/ambiance.mp3":"assets/images/ambiance.mp3","./../assets/images/Igor__Kostin.jpg":[["Igor__Kostin.0b70b8c7.jpg","assets/images/Igor__Kostin.jpg"],"assets/images/Igor__Kostin.jpg"],"./../assets/images/chernobylworker.jpg":[["chernobylworker.2ad1d57b.jpg","assets/images/chernobylworker.jpg"],"assets/images/chernobylworker.jpg"],"./../assets/images/fille_pripyat.png":[["fille_pripyat.7634132a.png","assets/images/fille_pripyat.png"],"assets/images/fille_pripyat.png"],"./../assets/images/liquidateur.png":[["liquidateur.8ecb220c.png","assets/images/liquidateur.png"],"assets/images/liquidateur.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"components/Temoignage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = _interopRequireDefault(require("../data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      step: this.getStep()
    };
  },
  watch: {
    "$route.params.id": function $routeParamsId(to, from) {
      this.step = this.getStep();
    }
  },
  methods: {
    getStep: function getStep() {
      var _this = this;

      return _data.default.steps.find(function (step) {
        return step.id === parseInt(_this.$route.params.id, 10);
      });
    }
  }
};
exports.default = _default;
        var $77c20f = exports.default || module.exports;
      
      if (typeof $77c20f === 'function') {
        $77c20f = $77c20f.options;
      }
    
        /* template */
        Object.assign($77c20f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "big-container" }, [
    _c("div", { staticClass: "container" }, [
      _c(
        "section",
        {
          staticClass: "section__1",
          style: { backgroundImage: "url(" + _vm.step.background__1 + ")" }
        },
        [
          _c("div", { staticClass: "container__text" }, [
            _vm.$route.params.id
              ? _c("h1", { staticClass: "texte__title__left " }, [
                  _vm._v(_vm._s(_vm.step.title))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("h2", [_vm._v(_vm._s(_vm.step.profession))])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", { staticClass: "big__texte " }, [
                  _vm._v(_vm._s(_vm.step.texte__1))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", { staticClass: "big__texte " }, [
                  _vm._v(_vm._s(_vm.step.texte__2))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", { staticClass: "big__texte " }, [
                  _vm._v(_vm._s(_vm.step.texte__3))
                ])
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "section",
        {
          staticClass: "section__2",
          style: { backgroundImage: "url(" + _vm.step.image__bg + ")" }
        },
        [
          _c(
            "video",
            {
              staticClass: "video",
              attrs: { autoplay: "", muted: "", loop: "" },
              domProps: { muted: true }
            },
            [_c("source", { attrs: { src: _vm.step.video__1 } })]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "section",
        {
          staticClass: "section__3",
          style: { backgroundImage: "url(" + _vm.step.background__2 + ")" }
        },
        [
          _c("div", { staticClass: "container__text" }, [
            _vm.$route.params.id
              ? _c("h1", { staticClass: "texte__title__right " }, [
                  _vm._v(_vm._s(_vm.step.sentence__1))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", [_vm._v(_vm._s(_vm.step.sentence__2))])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", [
                  _c("span", [_vm._v(_vm._s(_vm.step.sentence__3))]),
                  _vm._v(
                    "\n          " + _vm._s(_vm.step.sentence__4) + "\n        "
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", [_vm._v(_vm._s(_vm.step.sentence__5))])
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "section",
        {
          staticClass: "section__4",
          style: { backgroundImage: "url(" + _vm.step.background__slider + ")" }
        },
        [
          _c(
            "carousel-3d",
            {
              staticStyle: { "margin-top": "90px" },
              attrs: { width: 1200, height: 800 }
            },
            [
              _c("slide", { attrs: { index: 0 } }, [
                _c("img", {
                  staticClass: "image__slider",
                  attrs: { src: _vm.step.image__slider }
                })
              ]),
              _vm._v(" "),
              _c("slide", { attrs: { index: 1 } }, [
                _c("img", {
                  staticClass: "image__slider",
                  attrs: { src: _vm.step.image__slider__2 }
                })
              ]),
              _vm._v(" "),
              _c("slide", { attrs: { index: 2 } }, [
                _c("img", {
                  staticClass: "image__slider",
                  attrs: { src: _vm.step.image__slider__3 }
                })
              ]),
              _vm._v(" "),
              _c("slide", { attrs: { index: 3 } }, [
                _c("img", {
                  staticClass: "image__slider",
                  attrs: { src: _vm.step.image__slider__4 }
                })
              ]),
              _vm._v(" "),
              _c("slide", { attrs: { index: 4 } }, [
                _c("img", {
                  staticClass: "image__slider",
                  attrs: { src: _vm.step.image__slider__5 }
                })
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "section",
        {
          staticClass: "section__5",
          style: { backgroundImage: "url(" + _vm.step.background__3 + ")" }
        },
        [
          _c("div", { staticClass: "container__text" }, [
            _vm.$route.params.id
              ? _c("p", { staticClass: "big__texte " }, [
                  _vm._v(_vm._s(_vm.step.sentence__6))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.$route.params.id
              ? _c("p", { staticClass: "big__texte " }, [
                  _vm._v(_vm._s(_vm.step.sentence__7))
                ])
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c("section", { staticClass: "section__6" }, [
        _c(
          "video",
          { staticClass: "video", attrs: { autoplay: "", loop: "" } },
          [_c("source", { attrs: { src: _vm.step.video__2 } })]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "buttons" },
          [
            _c(
              "router-link",
              { staticClass: "button", attrs: { to: "/map" } },
              [_vm._v("Map")]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              { staticClass: "button", attrs: { to: "/map" } },
              [_vm._v("Map")]
            ),
            _vm._v(" "),
            _c(
              "router-link",
              { staticClass: "button", attrs: { to: "/map" } },
              [_vm._v("Map")]
            )
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-77c20f",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$77c20f', $77c20f);
          } else {
            api.reload('$77c20f', $77c20f);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../data.js":"data.js","_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"../node_modules/vue-hot-reload-api/dist/index.js","vue":"../node_modules/vue/dist/vue.common.js"}],"router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("./components/Home.vue"));

var _Intro = _interopRequireDefault(require("./components/Intro.vue"));

var _Map = _interopRequireDefault(require("./components/Map.vue"));

var _Temoignage = _interopRequireDefault(require("./components/Temoignage.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueRouter.default);

var router = new _vueRouter.default({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [{
    path: '/',
    name: 'home',
    component: _Home.default
  }, {
    path: '/intro',
    name: 'intro',
    component: _Intro.default
  }, {
    path: '/map',
    name: 'map',
    component: _Map.default
  }, {
    path: '/temoignage/:id',
    name: 'temoignage',
    component: _Temoignage.default
  }, {
    path: '*',
    redirect: {
      name: 'home'
    }
  }]
});
var _default = router;
exports.default = _default;
},{"vue":"../node_modules/vue/dist/vue.common.js","vue-router":"../node_modules/vue-router/dist/vue-router.esm.js","./components/Home.vue":"components/Home.vue","./components/Intro.vue":"components/Intro.vue","./components/Map.vue":"components/Map.vue","./components/Temoignage.vue":"components/Temoignage.vue"}],"assets/scss/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../font/ProductSansBold.ttf":[["ProductSansBold.86aced2f.ttf","assets/font/ProductSansBold.ttf"],"assets/font/ProductSansBold.ttf"],"./../font/ProductSansRegular.ttf":[["ProductSansRegular.f1a73bd0.ttf","assets/font/ProductSansRegular.ttf"],"assets/font/ProductSansRegular.ttf"],"./../font/Typingrad.otf":[["Typingrad.98b4c478.otf","assets/font/Typingrad.otf"],"assets/font/Typingrad.otf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _vueCarousel3d = _interopRequireDefault(require("vue-carousel-3d"));

var _router = _interopRequireDefault(require("./router"));

require("./assets/scss/styles.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vueCarousel3d.default);

new _vue.default({
  router: _router.default
}).$mount('#root');
},{"vue":"../node_modules/vue/dist/vue.common.js","vue-carousel-3d":"../node_modules/vue-carousel-3d/dist/vue-carousel-3d.min.js","./router":"router.js","./assets/scss/styles.scss":"assets/scss/styles.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53162" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map