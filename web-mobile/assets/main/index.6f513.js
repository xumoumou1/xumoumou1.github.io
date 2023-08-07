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
    cc._RF.push(module, "c0653N/8PVCrpoInnHGTTzJ", "BundleLoader");
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
  Helloworld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b90/rohdEk4SdmmEZANaD", "Helloworld");
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
    var Helloworld = function(_super) {
      __extends(Helloworld, _super);
      function Helloworld() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        _this.progressBar = null;
        return _this;
      }
      Helloworld.prototype.start = function() {
        this.label.string = this.text;
        this.progressBar.node.active = false;
      };
      Helloworld.prototype.onClickTestScene = function() {
        var _this = this;
        cc.assetManager.loadBundle("Test", function(err, bundle) {
          err ? _this.label.string = err.message : cc.director.loadScene("test");
        });
      };
      Helloworld.prototype.testThirdPartyBundle = function(name) {
        var _this = this;
        this.progressBar.node.active = true;
        this.progressBar.progress = 0;
        BundleLoader_1.downloadZipBundle(name, function(percent) {
          console.log(name, percent);
          _this.progressBar.progress = percent;
        }, function(err) {
          console.error("\u7f13\u5b58\u5931\u8d25", err);
        });
      };
      Helloworld.prototype.onClickTestManualScene = function() {
        var _this = this;
        this.progressBar.node.active = true;
        this.progressBar.progress = 0;
        BundleLoader_1.downloadZipBundle("TestManual", function(percent) {
          console.log("downloadZipBundle", "TestManual");
          _this.progressBar.progress = percent;
          1 === percent && cc.assetManager.loadBundle("TestManual", function(err, bundle) {
            err ? _this.label.string = err.message : cc.director.loadScene("test-manual");
          });
        }, function(err) {
          console.error("\u7f13\u5b58\u5931\u8d25", err);
        });
      };
      Helloworld.prototype.onClickAAADB = function() {
        var _this = this;
        var bd_name = "aaa_bd";
        this.progressBar.node.active = true;
        this.progressBar.progress = 0;
        BundleLoader_1.downloadZipBundle(bd_name, function(percent) {
          console.log("downloadZipBundle", bd_name);
          _this.progressBar.progress = percent;
          1 === percent && cc.assetManager.loadBundle(bd_name, function(err, bundle) {
            err ? _this.label.string = err.message : cc.director.loadScene("aaa_bd");
          });
        }, function(err) {
          console.error("\u7f13\u5b58\u5931\u8d25", err);
        });
      };
      __decorate([ property(cc.Label) ], Helloworld.prototype, "label", void 0);
      __decorate([ property ], Helloworld.prototype, "text", void 0);
      __decorate([ property(cc.ProgressBar) ], Helloworld.prototype, "progressBar", void 0);
      Helloworld = __decorate([ ccclass ], Helloworld);
      return Helloworld;
    }(cc.Component);
    exports.default = Helloworld;
    cc._RF.pop();
  }, {
    "./BundleLoader": "BundleLoader"
  } ]
}, {}, [ "BundleLoader", "Helloworld" ]);