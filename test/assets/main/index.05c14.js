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
        this._isFBSuc = false;
        this._data = null;
      }
      FacebookSdk.prototype.init = function() {
        cc.log("\u5c1d\u8bd5\u521d\u59cb\u5316 fb sdk");
        if (!window.FB) return;
        FB.init({
          appId: "940773713487256",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v17.0"
        });
        this._isFBSuc = true;
        cc.log("init facebook sdk");
      };
      FacebookSdk.prototype.login = function() {
        var self = this;
        if (!self._checkSdk()) return;
        FB.login(function(response) {
          response.status === EStatus.connected && (self._data = response);
          response.authResponse ? self._sdkLoginSuccess(response.authResponse) : cc.log("User cancelled login or did not fully authorize.");
        }, {
          scope: "public_profile,email"
        });
      };
      FacebookSdk.prototype.facebookLoout = function() {
        var self = this;
        if (!this._checkSdk()) return;
        FB.logout(function(response) {
          cc.log(response);
        });
      };
      FacebookSdk.prototype.getState = function() {
        var self = this;
        if (!self._checkSdk()) return;
        FB.getLoginStatus(function(response) {
          console.log("status:" + response.status);
          "connected" === response.status;
        });
      };
      FacebookSdk.prototype._checkSdk = function() {
        var self = this;
        if (!self._isFBSuc) {
          cc.error("facebook \u6ca1\u6709\u521d\u59cb\u5316");
          return false;
        }
        return true;
      };
      FacebookSdk.prototype._sdkLoginSuccess = function(data) {
        cc.log("faceboock login success");
        cc.log(data);
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
        this._isGGSuc = false;
        this._client = null;
      }
      GoogleSdk.prototype.init = function() {
        cc.log("try init google sdk");
        var self = this;
        if (!window.google) return;
        self._isGGSuc = true;
        self._client = google.accounts.oauth2.initTokenClient({
           client_id: '550948425386-0dm4gski8f5evdgvts3klqpp54n07h5s.apps.googleusercontent.com',
            ux_mode: 'redirect',
            scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
//            redirect_uri: "https://localhost:8443",
            redirect_uri: "https://xumoumou1.github.io",
          callback: function(response) {
            self.handleCredentialResponse(response);
          }
        });
        cc.log("init google sdk");
      };
      GoogleSdk.prototype.login = function() {
        var self = this;
        if (!self.checkSdk()) return;
        self._client.requestAccessToken();
      };
      GoogleSdk.prototype.handleCredentialResponse = function(response) {
        var self = this;
        if (!self.checkSdk()) return;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + response.access_token);
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && 200 === xhr.status) {
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            self._sdkLoginSuccess(response, data);
          }
        };
        xhr.send();
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
        var self = this;
        if (!self._isGGSuc) {
          cc.error("google \u6ca1\u6709\u521d\u59cb\u5316");
          return false;
        }
        return true;
      };
      GoogleSdk.prototype._sdkLoginSuccess = function(response, responseText) {
        cc.log("google login success");
        cc.log(response, responseText);
        Global_1.globalClass.loginType = "facebook";
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
        this.label.string = "login success ,  login type : " + Global_1.globalClass.loginType;
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
      LoginScene.prototype.onLoad = function() {
        FacebookSdk_1.facebookSdk.init();
        GoogleSdk_1.googleSdk.init();
      };
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
