window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BundleLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5ec0pq3P5PMIEDHa7+E5la", "BundleLoader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.downloadZipBundle = void 0;
    var installCallbacks = {};
    var installErrorCallbacks = {};
    window.onBundleInstallProgress = function(bundleName, progress) {
      installCallbacks[bundleName] && installCallbacks[bundleName](progress);
    };
    window.onBundleInstallError = function(bundleName, error) {
      installErrorCallbacks[bundleName] && installErrorCallbacks[bundleName](error);
    };
    function downloadZipBundle(name, onCacheProgress, onCacheError) {
      installCallbacks[name] = onCacheProgress;
      installErrorCallbacks[name] = onCacheError;
      window.installBundle ? window.installBundle(name) : onCacheProgress(1);
    }
    exports.downloadZipBundle = downloadZipBundle;
    cc._RF.pop();
  }, {} ],
  LoadTool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "04512s0809HIa23E8siYKI5", "LoadTool");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BundleLoader_1 = require("./BundleLoader");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadTool = function(_super) {
      __extends(LoadTool, _super);
      function LoadTool() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LoadTool.downLoadBundle = function(bundleName, successFunc, failFunc) {
        BundleLoader_1.downloadZipBundle(bundleName, function(percent) {
          1 === percent && cc.assetManager.loadBundle(bundleName, function(bundle) {
            successFunc && successFunc();
          }, function() {
            failFunc && failFunc();
          });
        }, function(err) {
          failFunc && failFunc();
          cc.error("\u7f13\u5b58\u5931\u8d25", err);
        });
      };
      LoadTool = __decorate([ ccclass ], LoadTool);
      return LoadTool;
    }(cc.Component);
    exports.default = LoadTool;
    cc._RF.pop();
  }, {
    "./BundleLoader": "BundleLoader"
  } ],
  Test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1f7ffc8bzpGraZofy5rgl0b", "Test");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LoadTool_1 = require("./LoadTool");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Test = function(_super) {
      __extends(Test, _super);
      function Test() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sprite = null;
        _this._spriteFrameIndex = 0;
        _this._max = 7;
        _this._loadOver = false;
        _this._bundle = null;
        return _this;
      }
      Test.prototype.onLoad = function() {
        var self = this;
        LoadTool_1.default.downLoadBundle("bundle", function(bundle) {
          bundle && (self._bundle = bundle);
        });
      };
      Test.prototype.onClick = function() {
        var _this = this;
        var self = this;
        if (!self._bundle) {
          alert("bundle\u672a\u52a0\u8f7d\u5b8c\u6bd5  \u8bf7\u7b49\u5f85bundle\u52a0\u8f7d\u6210\u529f");
          return;
        }
        var index = this._spriteFrameIndex++ % this._max;
        self._bundle.loadBundle("bundle1", function(err, bundle) {
          if (err) {
            cc.error(err);
            return;
          }
          bundle.load("texture/" + index, cc.SpriteFrame, function(err, sf) {
            if (err) {
              cc.log(err);
              return;
            }
            _this.sprite.spriteFrame = sf;
          });
        });
      };
      __decorate([ property(cc.Sprite) ], Test.prototype, "sprite", void 0);
      Test = __decorate([ ccclass ], Test);
      return Test;
    }(cc.Component);
    exports.default = Test;
    cc._RF.pop();
  }, {
    "./LoadTool": "LoadTool"
  } ]
}, {}, [ "BundleLoader", "LoadTool", "Test" ]);