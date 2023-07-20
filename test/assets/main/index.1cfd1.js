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
  FacebookSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34397rXjoJG44A2oTc0vnGd", "FacebookSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.facebookSdk = void 0;
    var Global_1 = require("../util/Global");
    var EStatus;
    (function(EStatus) {
      EStatus["connected"] = "connected";
      EStatus["error"] = "error";
      EStatus["unknown"] = "unknown";
    })(EStatus || (EStatus = {}));
    var FacebookSdk = function() {
      function FacebookSdk() {
        this._isFBSuc = true;
        this._data = null;
      }
      FacebookSdk.prototype.init = function() {};
      FacebookSdk.prototype.login = function() {
        if (!this._checkSdk()) return;
        FB.login(function(response) {
          response.status === EStatus.connected && (this._data = response);
          response.authResponse ? this.sdkFacebookLoginSuccess() : cc.log("User cancelled login or did not fully authorize.");
        }, {
          scope: "public_profile,email"
        });
      };
      FacebookSdk.prototype.facebookLoout = function() {
        if (!this._checkSdk()) return;
        FB.logout(function(response) {
          cc.log(response);
        });
      };
      FacebookSdk.prototype.getState = function() {
        if (!this._checkSdk()) return;
        FB.getLoginStatus(function(response) {
          console.log("status:" + response.status);
          "connected" === response.status;
        });
      };
      FacebookSdk.prototype._checkSdk = function() {
        if (!this._isFBSuc) {
          cc.error("facebook \u6ca1\u6709\u521d\u59cb\u5316");
          return false;
        }
        return true;
      };
      FacebookSdk.prototype._sdkFacebookLoginSuccess = function(data) {
        Global_1.globalClass.loginType = "facebook";
        cc.director.loadScene("Hall");
      };
      return FacebookSdk;
    }();
    exports.facebookSdk = new FacebookSdk();
    cc._RF.pop();
  }, {
    "../util/Global": "Global"
  } ],
  Global: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a1fdHAflpF5oqON1ppwvY5", "Global");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.globalClass = void 0;
    var Global = function() {
      function Global() {
        this.loginType = "";
      }
      return Global;
    }();
    exports.globalClass = new Global();
    cc._RF.pop();
  }, {} ],
  GoogleSdk: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aba0eJZbfJHdrmCfPX+C+OV", "GoogleSdk");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.googleSdk = void 0;
    var Global_1 = require("../util/Global");
    var GoogleSdk = function() {
      function GoogleSdk() {
        this._isGGSuc = true;
      }
      GoogleSdk.prototype.init = function() {
        if (!window.google) return;
        this._isGGSuc = true;
      };
      GoogleSdk.prototype.handleCredentialResponse = function(response) {
        if (!this.checkSdk()) return;
        var responsePayload = this._decodeJWT(response.credential);
        cc.error("google init success");
        cc.error("google response : ");
        cc.log(response);
        cc.error("google responsePayload:");
        cc.log(responsePayload);
      };
      GoogleSdk.prototype.login = function() {
        if (!this.checkSdk()) return;
        google.accounts.id.initialize({
          client_id: "550948425386-0dm4gski8f5evdgvts3klqpp54n07h5s.apps.googleusercontent.com",
          callback: this.handleCredentialResponse.bind(this)
        });
        google.accounts.id.prompt();
      };
      GoogleSdk.prototype._decodeJWT = function(jwt) {
        var parts = jwt.split(".");
        var header = parts[0];
        var payload = parts[1];
        var signature = parts[2];
        var decodedHeader = JSON.parse(atob(header));
        var decodedPayload = JSON.parse(atob(payload));
        return {
          header: decodedHeader,
          payload: decodedPayload
        };
      };
      GoogleSdk.prototype.checkSdk = function() {
        if (!this._isGGSuc) {
          cc.error("google \u6ca1\u6709\u521d\u59cb\u5316");
          return false;
        }
        return true;
      };
      GoogleSdk.prototype.sdkGoogleLoginSuccess = function(data) {
        Global_1.globalClass.loginType = "google";
        cc.director.loadScene("Hall");
      };
      return GoogleSdk;
    }();
    exports.googleSdk = new GoogleSdk();
    cc._RF.pop();
  }, {
    "../util/Global": "Global"
  } ],
  HallScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9fbf6JxslNE8ptyw+7CANIi", "HallScene");
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
    var Global_1 = require("../util/Global");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var HallScene = function(_super) {
      __extends(HallScene, _super);
      function HallScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      HallScene.prototype.start = function() {
        this.text = "login success ,  login type : " + Global_1.globalClass.loginType;
      };
      __decorate([ property(cc.Label) ], HallScene.prototype, "label", void 0);
      __decorate([ property ], HallScene.prototype, "text", void 0);
      HallScene = __decorate([ ccclass ], HallScene);
      return HallScene;
    }(cc.Component);
    exports.default = HallScene;
    cc._RF.pop();
  }, {
    "../util/Global": "Global"
  } ],
  LoginScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6cb5JWVXVCJIzCG34vSpy3", "LoginScene");
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
    var FacebookSdk_1 = require("../sdk/FacebookSdk");
    var GoogleSdk_1 = require("../sdk/GoogleSdk");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoginScene = function(_super) {
      __extends(LoginScene, _super);
      function LoginScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LoginScene.prototype.clickLoginFb = function() {
        FacebookSdk_1.facebookSdk.login();
      };
      LoginScene.prototype.clickGoogleLogin = function() {
        GoogleSdk_1.googleSdk.login();
      };
      LoginScene = __decorate([ ccclass ], LoginScene);
      return LoginScene;
    }(cc.Component);
    exports.default = LoginScene;
    cc._RF.pop();
  }, {
    "../sdk/FacebookSdk": "FacebookSdk",
    "../sdk/GoogleSdk": "GoogleSdk"
  } ]
}, {}, [ "HallScene", "LoginScene", "FacebookSdk", "GoogleSdk", "Global" ]);