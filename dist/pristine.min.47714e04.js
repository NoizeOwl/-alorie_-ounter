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
})({"pristine/pristine.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
!function (e, r) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Pristine = r();
}(this, function () {
  "use strict";

  var e = {
    en: {
      required: "This field is required",
      email: "This field requires a valid e-mail address",
      number: "This field requires a number",
      integer: "This field requires an integer value",
      url: "This field requires a valid website URL",
      tel: "This field requires a valid telephone number",
      maxlength: "This fields length must be < ${1}",
      minlength: "This fields length must be > ${1}",
      min: "Minimum value for this field is ${1}",
      max: "Maximum value for this field is ${1}",
      pattern: "Please match the requested format",
      equals: "The two fields do not match"
    }
  };
  function r(e) {
    var r = arguments;
    return this.replace(/\${([^{}]*)}/g, function (e, t) {
      return r[t];
    });
  }
  function t(e) {
    return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length;
  }
  var n = {
      classTo: "form-group",
      errorClass: "has-danger",
      successClass: "has-success",
      errorTextParent: "form-group",
      errorTextTag: "div",
      errorTextClass: "text-help"
    },
    i = ["required", "min", "max", "minlength", "maxlength", "pattern"],
    s = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    a = /-message(?:-([a-z]{2}(?:_[A-Z]{2})?))?/,
    o = "en",
    l = {},
    u = function u(e, r) {
      r.name = e, void 0 === r.priority && (r.priority = 1), l[e] = r;
    };
  function f(t, s, u) {
    var f = this;
    function c(e, r, t, n) {
      var i = l[t];
      if (i && (e.push(i), n)) {
        var s = "pattern" === t ? [n] : n.split(",");
        s.unshift(null), r[t] = s;
      }
    }
    function p(t) {
      for (var n = [], i = !0, s = 0; t.validators[s]; s++) {
        var a = t.validators[s],
          l = t.params[a.name] ? t.params[a.name] : [];
        if (l[0] = t.input.value, !a.fn.apply(t.input, l) && (i = !1, "function" == typeof a.msg ? n.push(a.msg(t.input.value, l)) : "string" == typeof a.msg ? n.push(r.apply(a.msg, l)) : a.msg === Object(a.msg) && a.msg[o] ? n.push(r.apply(a.msg[o], l)) : t.messages[o] && t.messages[o][a.name] ? n.push(r.apply(t.messages[o][a.name], l)) : e[o] && e[o][a.name] && n.push(r.apply(e[o][a.name], l)), !0 === a.halt)) break;
      }
      return t.errors = n, i;
    }
    function m(e) {
      if (e.errorElements) return e.errorElements;
      var r = function (e, r) {
          for (; (e = e.parentElement) && !e.classList.contains(r););
          return e;
        }(e.input, f.config.classTo),
        t = null,
        n = null;
      return (t = f.config.classTo === f.config.errorTextParent ? r : r.querySelector("." + f.config.errorTextParent)) && ((n = t.querySelector(".pristine-error")) || ((n = document.createElement(f.config.errorTextTag)).className = "pristine-error " + f.config.errorTextClass, t.appendChild(n), n.pristineDisplay = n.style.display)), e.errorElements = [r, n];
    }
    function d(e) {
      var r = m(e),
        t = r[0],
        n = r[1];
      t && (t.classList.remove(f.config.successClass), t.classList.add(f.config.errorClass)), n && (n.innerHTML = e.errors.join("<br/>"), n.style.display = n.pristineDisplay || "");
    }
    function h(e) {
      var r = function (e) {
        var r = m(e),
          t = r[0],
          n = r[1];
        return t && (t.classList.remove(f.config.errorClass), t.classList.remove(f.config.successClass)), n && (n.innerHTML = "", n.style.display = "none"), r;
      }(e)[0];
      r && r.classList.add(f.config.successClass);
    }
    return function (e, r, t) {
      e.setAttribute("novalidate", "true"), f.form = e, f.config = function (e, r) {
        for (var t in r) t in e || (e[t] = r[t]);
        return e;
      }(r || {}, n), f.live = !(!1 === t), f.fields = Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function (e) {
        var r = [],
          t = {},
          n = {};
        return [].forEach.call(e.attributes, function (e) {
          if (/^data-pristine-/.test(e.name)) {
            var s = e.name.substr(14),
              o = s.match(a);
            if (null !== o) {
              var l = void 0 === o[1] ? "en" : o[1];
              return n.hasOwnProperty(l) || (n[l] = {}), void (n[l][s.slice(0, s.length - o[0].length)] = e.value);
            }
            "type" === s && (s = e.value), c(r, t, s, e.value);
          } else ~i.indexOf(e.name) ? c(r, t, e.name, e.value) : "type" === e.name && c(r, t, e.value);
        }), r.sort(function (e, r) {
          return r.priority - e.priority;
        }), f.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function (e) {
          f.validate(e.target);
        }.bind(f)), e.pristine = {
          input: e,
          validators: r,
          params: t,
          messages: n,
          self: f
        };
      }.bind(f));
    }(t, s, u), f.validate = function (e, r) {
      r = e && !0 === r || !0 === e;
      var t = f.fields;
      !0 !== e && !1 !== e && (e instanceof HTMLElement ? t = [e.pristine] : (e instanceof NodeList || e instanceof (window.$ || Array) || e instanceof Array) && (t = Array.from(e).map(function (e) {
        return e.pristine;
      })));
      for (var n = !0, i = 0; t[i]; i++) {
        var s = t[i];
        p(s) ? !r && h(s) : (n = !1, !r && d(s));
      }
      return n;
    }, f.getErrors = function (e) {
      if (!e) {
        for (var r = [], t = 0; t < f.fields.length; t++) {
          var n = f.fields[t];
          n.errors.length && r.push({
            input: n.input,
            errors: n.errors
          });
        }
        return r;
      }
      return e.tagName && "select" === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors;
    }, f.addValidator = function (e, r, t, n, i) {
      e instanceof HTMLElement ? (e.pristine.validators.push({
        fn: r,
        msg: t,
        priority: n,
        halt: i
      }), e.pristine.validators.sort(function (e, r) {
        return r.priority - e.priority;
      })) : console.warn("The parameter elem must be a dom element");
    }, f.addError = function (e, r) {
      (e = e.length ? e[0] : e).pristine.errors.push(r), d(e.pristine);
    }, f.reset = function () {
      for (var e = 0; f.fields[e]; e++) f.fields[e].errorElements = null;
      Array.from(f.form.querySelectorAll(".pristine-error")).map(function (e) {
        e.parentNode.removeChild(e);
      }), Array.from(f.form.querySelectorAll("." + f.config.classTo)).map(function (e) {
        e.classList.remove(f.config.successClass), e.classList.remove(f.config.errorClass);
      });
    }, f.destroy = function () {
      f.reset(), f.fields.forEach(function (e) {
        delete e.input.pristine;
      }), f.fields = [];
    }, f.setGlobalConfig = function (e) {
      n = e;
    }, f;
  }
  return u("text", {
    fn: function fn(e) {
      return !0;
    },
    priority: 0
  }), u("required", {
    fn: function fn(e) {
      return "radio" === this.type || "checkbox" === this.type ? t(this) : void 0 !== e && "" !== e;
    },
    priority: 99,
    halt: !0
  }), u("email", {
    fn: function fn(e) {
      return !e || s.test(e);
    }
  }), u("number", {
    fn: function fn(e) {
      return !e || !isNaN(parseFloat(e));
    },
    priority: 2
  }), u("integer", {
    fn: function fn(e) {
      return !e || /^\d+$/.test(e);
    }
  }), u("minlength", {
    fn: function fn(e, r) {
      return !e || e.length >= parseInt(r);
    }
  }), u("maxlength", {
    fn: function fn(e, r) {
      return !e || e.length <= parseInt(r);
    }
  }), u("min", {
    fn: function fn(e, r) {
      return !e || ("checkbox" === this.type ? t(this) >= parseInt(r) : parseFloat(e) >= parseFloat(r));
    }
  }), u("max", {
    fn: function fn(e, r) {
      return !e || ("checkbox" === this.type ? t(this) <= parseInt(r) : parseFloat(e) <= parseFloat(r));
    }
  }), u("pattern", {
    fn: function fn(e, r) {
      var t = r.match(new RegExp("^/(.*?)/([gimy]*)$"));
      return !e || new RegExp(t[1], t[2]).test(e);
    }
  }), u("equals", {
    fn: function fn(e, r) {
      var t = document.querySelector(r);
      return t && (!e && !t.value || t.value === e);
    }
  }), f.addValidator = function (e, r, t, n, i) {
    u(e, {
      fn: r,
      msg: t,
      priority: n,
      halt: i
    });
  }, f.addMessages = function (r, t) {
    var n = e.hasOwnProperty(r) ? e[r] : e[r] = {};
    Object.keys(t).forEach(function (e, r) {
      n[e] = t[e];
    });
  }, f.setLocale = function (e) {
    o = e;
  }, f;
});
},{}],"../../../AppData/Roaming/nvm/v16.16.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58565" + '/');
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
      });

      // Enable HMR for CSS by default.
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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../../../AppData/Roaming/nvm/v16.16.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","pristine/pristine.min.js"], null)
//# sourceMappingURL=/pristine.min.47714e04.js.map