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
  ContentAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68622NlRNJFN4QrXlFCQMe/", "ContentAdapter");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ContentAdapter = function(_super) {
      __extends(ContentAdapter, _super);
      function ContentAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ContentAdapter.prototype.onLoad = function() {
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        var realWidth = this.node.width * srcScaleForShowAll;
        var realHeight = this.node.height * srcScaleForShowAll;
        this.node.width = this.node.width * (cc.view.getCanvasSize().width / realWidth);
        this.node.height = this.node.height * (cc.view.getCanvasSize().height / realHeight);
      };
      ContentAdapter = __decorate([ ccclass ], ContentAdapter);
      return ContentAdapter;
    }(cc.Component);
    exports.default = ContentAdapter;
    cc._RF.pop();
  }, {} ],
  FlashLightCtrlComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3edcaOPDxJIn4R6DYnZ5Vxs", "FlashLightCtrlComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FlashLightCtrlComponent = function(_super) {
      __extends(FlashLightCtrlComponent, _super);
      function FlashLightCtrlComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._flashLightUBO = new FlashLightUBO();
        return _this;
      }
      FlashLightCtrlComponent.prototype.onEnable = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on("on_property_change", this._onPropertyChange, this);
      };
      FlashLightCtrlComponent.prototype.onDisable = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off("on_property_change", this._onPropertyChange, this);
      };
      FlashLightCtrlComponent.prototype._onTouchStart = function(event) {
        this._onTouchMove(event);
      };
      FlashLightCtrlComponent.prototype._onTouchMove = function(event) {
        var touchPointInWorldSpace = event.getLocation();
        var touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);
        this._flashLightUBO.lightCenterPoint = cc.v2(this.node.anchorX + touchPointInNodeSpace.x / this.node.width, 1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height));
        this._updateMaterial();
      };
      FlashLightCtrlComponent.prototype._onPropertyChange = function(localDiffusionUniform) {
        this._flashLightUBO.lightColor = localDiffusionUniform.lightColor;
        this._flashLightUBO.lightAngle = localDiffusionUniform.lightAngle;
        this._flashLightUBO.lightWidth = localDiffusionUniform.lightWidth;
        this._flashLightUBO.enableGradient = localDiffusionUniform.enableGradient;
        this._flashLightUBO.cropAlpha = localDiffusionUniform.cropAlpha;
        this._flashLightUBO.enableFog = localDiffusionUniform.enableFog;
        this._updateMaterial();
      };
      FlashLightCtrlComponent.prototype._updateMaterial = function() {
        var _this = this;
        this.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
          var material = renderComponent.getMaterial(0);
          material.setProperty("lightColor", _this._flashLightUBO.lightColor);
          material.setProperty("lightCenterPoint", _this._flashLightUBO.lightCenterPoint);
          material.setProperty("lightAngle", _this._flashLightUBO.lightAngle);
          material.setProperty("lightWidth", _this._flashLightUBO.lightWidth);
          material.setProperty("enableGradient", _this._flashLightUBO.enableGradient);
          material.setProperty("cropAlpha", _this._flashLightUBO.cropAlpha);
          material.setProperty("enableFog", _this._flashLightUBO.enableFog);
          renderComponent.setMaterial(0, material);
        });
      };
      FlashLightCtrlComponent = __decorate([ ccclass ], FlashLightCtrlComponent);
      return FlashLightCtrlComponent;
    }(cc.Component);
    exports.default = FlashLightCtrlComponent;
    var FlashLightUBO = function() {
      function FlashLightUBO() {
        this.lightColor = cc.Color.YELLOW;
        this.lightCenterPoint = cc.v2(.5, .5);
        this.lightAngle = 45;
        this.lightWidth = .5;
        this.enableGradient = true;
        this.cropAlpha = true;
        this.enableFog = false;
      }
      return FlashLightUBO;
    }();
    exports.FlashLightUBO = FlashLightUBO;
    cc._RF.pop();
  }, {} ],
  FlashLightEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6d3af93JoNEF4lgKl/V0HV8", "FlashLightEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var FlashLightCtrlComponent_1 = require("./FlashLightCtrlComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FlashLightEffectScene = function(_super) {
      __extends(FlashLightEffectScene, _super);
      function FlashLightEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._redSlider = null;
        _this._redSliderLabel = null;
        _this._greenSlider = null;
        _this._greenSliderLabel = null;
        _this._blueSlider = null;
        _this._blueSliderLabel = null;
        _this._alphaSlider = null;
        _this._alphaSliderLabel = null;
        _this._lightWidthSlider = null;
        _this._lightWidthSliderLabel = null;
        _this._lightAngleSlider = null;
        _this._lightAngleSliderLabel = null;
        _this._enableGradientToggle = null;
        _this._cropAlphaToggle = null;
        _this._enableFogToggle = null;
        _this._examplesParentNode = null;
        return _this;
      }
      FlashLightEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._redSlider = cc.find("Canvas/Content/Controller/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Controller/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Controller/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Controller/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Controller/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Controller/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Controller/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Controller/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._lightWidthSlider = cc.find("Canvas/Content/Controller/LightWidthSlider/Slider").getComponent(cc.Slider);
        this._lightWidthSliderLabel = cc.find("Canvas/Content/Controller/LightWidthSlider/ValueLabel").getComponent(cc.Label);
        this._lightAngleSlider = cc.find("Canvas/Content/Controller/LightAngleSlider/Slider").getComponent(cc.Slider);
        this._lightAngleSliderLabel = cc.find("Canvas/Content/Controller/LightAngleSlider/ValueLabel").getComponent(cc.Label);
        this._enableGradientToggle = cc.find("Canvas/Content/Controller/EnableGradientToggle/Toggle").getComponent(cc.Toggle);
        this._cropAlphaToggle = cc.find("Canvas/Content/Controller/CropAlphaToggle/Toggle").getComponent(cc.Toggle);
        this._enableFogToggle = cc.find("Canvas/Content/Controller/EnableFogToggle/Toggle").getComponent(cc.Toggle);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.addComponent(FlashLightCtrlComponent_1.default);
        });
      };
      FlashLightEffectScene.prototype.onEnable = function() {
        this._redSlider.node.on("slide", this._onPropertyChanged, this);
        this._greenSlider.node.on("slide", this._onPropertyChanged, this);
        this._blueSlider.node.on("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.on("slide", this._onPropertyChanged, this);
        this._lightWidthSlider.node.on("slide", this._onPropertyChanged, this);
        this._lightAngleSlider.node.on("slide", this._onPropertyChanged, this);
        this._enableGradientToggle.node.on("toggle", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.on("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.on("toggle", this._onPropertyChanged, this);
      };
      FlashLightEffectScene.prototype.onDisable = function() {
        this._redSlider.node.off("slide", this._onPropertyChanged, this);
        this._greenSlider.node.off("slide", this._onPropertyChanged, this);
        this._blueSlider.node.off("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.off("slide", this._onPropertyChanged, this);
        this._lightWidthSlider.node.off("slide", this._onPropertyChanged, this);
        this._lightAngleSlider.node.off("slide", this._onPropertyChanged, this);
        this._enableGradientToggle.node.off("toggle", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.off("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.off("toggle", this._onPropertyChanged, this);
      };
      FlashLightEffectScene.prototype.start = function() {
        this._onPropertyChanged();
      };
      FlashLightEffectScene.prototype._onPropertyChanged = function() {
        var _this = this;
        this._redSliderLabel.string = this._redSlider.progress.toFixed(2) + " | " + Math.round(255 * this._redSlider.progress);
        this._greenSliderLabel.string = this._greenSlider.progress.toFixed(2) + " | " + Math.round(255 * this._greenSlider.progress);
        this._blueSliderLabel.string = this._blueSlider.progress.toFixed(2) + " | " + Math.round(255 * this._blueSlider.progress);
        this._alphaSliderLabel.string = this._alphaSlider.progress.toFixed(2) + " | " + Math.round(255 * this._alphaSlider.progress);
        this._lightWidthSliderLabel.string = "" + this._lightWidthSlider.progress.toFixed(2);
        var angle = 180 * this._lightAngleSlider.progress;
        this._lightAngleSliderLabel.string = this._lightAngleSlider.progress.toFixed(2) + " | " + angle.toFixed(2);
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.emit("on_property_change", {
            lightColor: cc.color(Math.round(255 * _this._redSlider.progress), Math.round(255 * _this._greenSlider.progress), Math.round(255 * _this._blueSlider.progress), Math.round(255 * _this._alphaSlider.progress)),
            lightAngle: angle,
            lightWidth: _this._lightWidthSlider.progress,
            enableGradient: _this._enableGradientToggle.isChecked,
            cropAlpha: _this._cropAlphaToggle.isChecked,
            enableFog: _this._enableFogToggle.isChecked
          });
        });
      };
      FlashLightEffectScene = __decorate([ ccclass ], FlashLightEffectScene);
      return FlashLightEffectScene;
    }(cc.Component);
    exports.default = FlashLightEffectScene;
    cc._RF.pop();
  }, {
    "./FlashLightCtrlComponent": "FlashLightCtrlComponent"
  } ],
  GaussianBlurV1EffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f460djPUfdEdrpZFw3saPVi", "GaussianBlurV1EffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GaussianBlurV1EffectScene = function(_super) {
      __extends(GaussianBlurV1EffectScene, _super);
      function GaussianBlurV1EffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._blurSlider = null;
        _this._blurSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      GaussianBlurV1EffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._blurSlider = cc.find("Canvas/Content/Controller/BlurSlider/Slider").getComponent(cc.Slider);
        this._blurSliderLabel = cc.find("Canvas/Content/Controller/BlurSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      GaussianBlurV1EffectScene.prototype.onEnable = function() {
        this._blurSlider.node.on("slide", this._onSliderChanged, this);
      };
      GaussianBlurV1EffectScene.prototype.onDisable = function() {
        this._blurSlider.node.off("slide", this._onSliderChanged, this);
      };
      GaussianBlurV1EffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      GaussianBlurV1EffectScene.prototype._onSliderChanged = function() {
        this._blurSliderLabel.string = "" + this._blurSlider.progress.toFixed(2);
        this._updateRenderComponentMaterial({});
      };
      GaussianBlurV1EffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("textureSize", cc.v2(childNode.width, childNode.height));
            renderComponent.setMaterial(0, material);
          });
        });
      };
      GaussianBlurV1EffectScene = __decorate([ ccclass ], GaussianBlurV1EffectScene);
      return GaussianBlurV1EffectScene;
    }(cc.Component);
    exports.default = GaussianBlurV1EffectScene;
    cc._RF.pop();
  }, {} ],
  GlowInnerV1EffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eebe5Fr5bhMO7IsowoLW/Yp", "GlowInnerV1EffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GlowInnerEffectScene = function(_super) {
      __extends(GlowInnerEffectScene, _super);
      function GlowInnerEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._redSlider = null;
        _this._redSliderLabel = null;
        _this._greenSlider = null;
        _this._greenSliderLabel = null;
        _this._blueSlider = null;
        _this._blueSliderLabel = null;
        _this._alphaSlider = null;
        _this._alphaSliderLabel = null;
        _this._glowWidthSlider = null;
        _this._glowWidthSliderLabel = null;
        _this._glowThresholdSlider = null;
        _this._glowThresholdSliderLabel = null;
        _this._scrollView = null;
        return _this;
      }
      GlowInnerEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._redSlider = cc.find("Canvas/Content/Sliders/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Sliders/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Sliders/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Sliders/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Sliders/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Sliders/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._glowWidthSlider = cc.find("Canvas/Content/Sliders/GlowWidthSlider/Slider").getComponent(cc.Slider);
        this._glowWidthSliderLabel = cc.find("Canvas/Content/Sliders/GlowWidthSlider/ValueLabel").getComponent(cc.Label);
        this._glowThresholdSlider = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/Slider").getComponent(cc.Slider);
        this._glowThresholdSliderLabel = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/ValueLabel").getComponent(cc.Label);
        this._scrollView = cc.find("Canvas/Content/ScrollView").getComponent(cc.ScrollView);
      };
      GlowInnerEffectScene.prototype.onEnable = function() {
        this._redSlider.node.on("slide", this._onSliderChanged, this);
        this._greenSlider.node.on("slide", this._onSliderChanged, this);
        this._blueSlider.node.on("slide", this._onSliderChanged, this);
        this._alphaSlider.node.on("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.on("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.on("slide", this._onSliderChanged, this);
      };
      GlowInnerEffectScene.prototype.onDisable = function() {
        this._redSlider.node.off("slide", this._onSliderChanged, this);
        this._greenSlider.node.off("slide", this._onSliderChanged, this);
        this._blueSlider.node.off("slide", this._onSliderChanged, this);
        this._alphaSlider.node.off("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.off("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.off("slide", this._onSliderChanged, this);
      };
      GlowInnerEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      GlowInnerEffectScene.prototype._onSliderChanged = function() {
        this._redSliderLabel.string = this._redSlider.progress.toFixed(2) + " | " + Math.round(255 * this._redSlider.progress);
        this._greenSliderLabel.string = this._greenSlider.progress.toFixed(2) + " | " + Math.round(255 * this._greenSlider.progress);
        this._blueSliderLabel.string = this._blueSlider.progress.toFixed(2) + " | " + Math.round(255 * this._blueSlider.progress);
        this._alphaSliderLabel.string = this._alphaSlider.progress.toFixed(2) + " | " + Math.round(255 * this._alphaSlider.progress);
        var realGlowWidthProgress = .2 * this._glowWidthSlider.progress;
        this._glowWidthSliderLabel.string = "" + realGlowWidthProgress.toFixed(2);
        var realGlowThresholdProgress = this._glowThresholdSlider.progress;
        this._glowThresholdSliderLabel.string = "" + realGlowThresholdProgress.toFixed(2);
        this._updateRenderComponentMaterial({
          glowColor: cc.v4(this._redSlider.progress, this._greenSlider.progress, this._blueSlider.progress, this._alphaSlider.progress),
          glowColorSize: realGlowWidthProgress,
          glowThreshold: realGlowThresholdProgress
        });
      };
      GlowInnerEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._scrollView.content.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("glowColorSize", param.glowColorSize);
            material.setProperty("glowColor", param.glowColor);
            material.setProperty("glowThreshold", param.glowThreshold);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      GlowInnerEffectScene = __decorate([ ccclass ], GlowInnerEffectScene);
      return GlowInnerEffectScene;
    }(cc.Component);
    exports.default = GlowInnerEffectScene;
    cc._RF.pop();
  }, {} ],
  GlowInnerV2EffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c875cb7RxHba/HkXA34I9a", "GlowInnerV2EffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GlowInnerV2EffectScene = function(_super) {
      __extends(GlowInnerV2EffectScene, _super);
      function GlowInnerV2EffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._redSlider = null;
        _this._redSliderLabel = null;
        _this._greenSlider = null;
        _this._greenSliderLabel = null;
        _this._blueSlider = null;
        _this._blueSliderLabel = null;
        _this._alphaSlider = null;
        _this._alphaSliderLabel = null;
        _this._glowWidthSlider = null;
        _this._glowWidthSliderLabel = null;
        _this._glowThresholdSlider = null;
        _this._glowThresholdSliderLabel = null;
        _this._scrollView = null;
        return _this;
      }
      GlowInnerV2EffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._redSlider = cc.find("Canvas/Content/Sliders/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Sliders/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Sliders/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Sliders/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Sliders/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Sliders/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._glowWidthSlider = cc.find("Canvas/Content/Sliders/GlowWidthSlider/Slider").getComponent(cc.Slider);
        this._glowWidthSliderLabel = cc.find("Canvas/Content/Sliders/GlowWidthSlider/ValueLabel").getComponent(cc.Label);
        this._glowThresholdSlider = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/Slider").getComponent(cc.Slider);
        this._glowThresholdSliderLabel = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/ValueLabel").getComponent(cc.Label);
        this._scrollView = cc.find("Canvas/Content/ScrollView").getComponent(cc.ScrollView);
      };
      GlowInnerV2EffectScene.prototype.onEnable = function() {
        this._redSlider.node.on("slide", this._onSliderChanged, this);
        this._greenSlider.node.on("slide", this._onSliderChanged, this);
        this._blueSlider.node.on("slide", this._onSliderChanged, this);
        this._alphaSlider.node.on("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.on("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.on("slide", this._onSliderChanged, this);
      };
      GlowInnerV2EffectScene.prototype.onDisable = function() {
        this._redSlider.node.off("slide", this._onSliderChanged, this);
        this._greenSlider.node.off("slide", this._onSliderChanged, this);
        this._blueSlider.node.off("slide", this._onSliderChanged, this);
        this._alphaSlider.node.off("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.off("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.off("slide", this._onSliderChanged, this);
      };
      GlowInnerV2EffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      GlowInnerV2EffectScene.prototype._onSliderChanged = function() {
        this._redSliderLabel.string = this._redSlider.progress.toFixed(2) + " | " + Math.round(255 * this._redSlider.progress);
        this._greenSliderLabel.string = this._greenSlider.progress.toFixed(2) + " | " + Math.round(255 * this._greenSlider.progress);
        this._blueSliderLabel.string = this._blueSlider.progress.toFixed(2) + " | " + Math.round(255 * this._blueSlider.progress);
        this._alphaSliderLabel.string = this._alphaSlider.progress.toFixed(2) + " | " + Math.round(255 * this._alphaSlider.progress);
        var realGlowWidthProgress = 200 * this._glowWidthSlider.progress;
        this._glowWidthSliderLabel.string = "" + realGlowWidthProgress.toFixed(0);
        var realGlowThresholdProgress = this._glowThresholdSlider.progress;
        this._glowThresholdSliderLabel.string = "" + realGlowThresholdProgress.toFixed(2);
        this._updateRenderComponentMaterial({
          glowColor: cc.v4(this._redSlider.progress, this._greenSlider.progress, this._blueSlider.progress, this._alphaSlider.progress),
          glowRange: realGlowWidthProgress,
          glowThreshold: realGlowThresholdProgress
        });
      };
      GlowInnerV2EffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._scrollView.content.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            if (renderComponent instanceof cc.Sprite) {
              var spriteFrameRect = renderComponent.spriteFrame.getRect();
              var material = renderComponent.getMaterial(0);
              material.setProperty("spriteWidth", spriteFrameRect.width);
              material.setProperty("spriteHeight", spriteFrameRect.height);
              material.setProperty("glowRange", param.glowRange);
              material.setProperty("glowColor", param.glowColor);
              material.setProperty("glowThreshold", param.glowThreshold);
              renderComponent.setMaterial(0, material);
            } else {
              var material = renderComponent.getMaterial(0);
              material.setProperty("spriteWidth", childNode.width);
              material.setProperty("spriteHeight", childNode.height);
              material.setProperty("glowRange", param.glowRange);
              material.setProperty("glowColor", param.glowColor);
              material.setProperty("glowThreshold", param.glowThreshold);
              renderComponent.setMaterial(0, material);
            }
          });
        });
      };
      GlowInnerV2EffectScene = __decorate([ ccclass ], GlowInnerV2EffectScene);
      return GlowInnerV2EffectScene;
    }(cc.Component);
    exports.default = GlowInnerV2EffectScene;
    cc._RF.pop();
  }, {} ],
  GlowOutterEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88555WjoqZCYKep02MUX87W", "GlowOutterEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GlowOutterEffectScene = function(_super) {
      __extends(GlowOutterEffectScene, _super);
      function GlowOutterEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._redSlider = null;
        _this._redSliderLabel = null;
        _this._greenSlider = null;
        _this._greenSliderLabel = null;
        _this._blueSlider = null;
        _this._blueSliderLabel = null;
        _this._alphaSlider = null;
        _this._alphaSliderLabel = null;
        _this._glowWidthSlider = null;
        _this._glowWidthSliderLabel = null;
        _this._glowThresholdSlider = null;
        _this._glowThresholdSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      GlowOutterEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._redSlider = cc.find("Canvas/Content/Sliders/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Sliders/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Sliders/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Sliders/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Sliders/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Sliders/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Sliders/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._glowWidthSlider = cc.find("Canvas/Content/Sliders/GlowWidthSlider/Slider").getComponent(cc.Slider);
        this._glowWidthSliderLabel = cc.find("Canvas/Content/Sliders/GlowWidthSlider/ValueLabel").getComponent(cc.Label);
        this._glowThresholdSlider = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/Slider").getComponent(cc.Slider);
        this._glowThresholdSliderLabel = cc.find("Canvas/Content/Sliders/GlowThresholdSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      GlowOutterEffectScene.prototype.onEnable = function() {
        this._redSlider.node.on("slide", this._onSliderChanged, this);
        this._greenSlider.node.on("slide", this._onSliderChanged, this);
        this._blueSlider.node.on("slide", this._onSliderChanged, this);
        this._alphaSlider.node.on("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.on("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.on("slide", this._onSliderChanged, this);
      };
      GlowOutterEffectScene.prototype.onDisable = function() {
        this._redSlider.node.off("slide", this._onSliderChanged, this);
        this._greenSlider.node.off("slide", this._onSliderChanged, this);
        this._blueSlider.node.off("slide", this._onSliderChanged, this);
        this._alphaSlider.node.off("slide", this._onSliderChanged, this);
        this._glowWidthSlider.node.off("slide", this._onSliderChanged, this);
        this._glowThresholdSlider.node.off("slide", this._onSliderChanged, this);
      };
      GlowOutterEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      GlowOutterEffectScene.prototype._onSliderChanged = function() {
        this._redSliderLabel.string = this._redSlider.progress.toFixed(2) + " | " + Math.round(255 * this._redSlider.progress);
        this._greenSliderLabel.string = this._greenSlider.progress.toFixed(2) + " | " + Math.round(255 * this._greenSlider.progress);
        this._blueSliderLabel.string = this._blueSlider.progress.toFixed(2) + " | " + Math.round(255 * this._blueSlider.progress);
        this._alphaSliderLabel.string = this._alphaSlider.progress.toFixed(2) + " | " + Math.round(255 * this._alphaSlider.progress);
        var realGlowWidthProgress = .1 * this._glowWidthSlider.progress;
        this._glowWidthSliderLabel.string = "" + realGlowWidthProgress.toFixed(2);
        var realGlowThresholdProgress = this._glowThresholdSlider.progress;
        this._glowThresholdSliderLabel.string = "" + realGlowThresholdProgress.toFixed(2);
        this._updateRenderComponentMaterial({
          glowColor: cc.v4(this._redSlider.progress, this._greenSlider.progress, this._blueSlider.progress, this._alphaSlider.progress),
          glowColorSize: realGlowWidthProgress,
          glowThreshold: realGlowThresholdProgress
        });
      };
      GlowOutterEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("glowColorSize", param.glowColorSize);
            material.setProperty("glowColor", param.glowColor);
            material.setProperty("glowThreshold", param.glowThreshold);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      GlowOutterEffectScene = __decorate([ ccclass ], GlowOutterEffectScene);
      return GlowOutterEffectScene;
    }(cc.Component);
    exports.default = GlowOutterEffectScene;
    cc._RF.pop();
  }, {} ],
  GrayEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b2eeYO0iZEr7/PlbdSZuUf", "GrayEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GrayEffectScene = function(_super) {
      __extends(GrayEffectScene, _super);
      function GrayEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._grayLevelSlider = null;
        _this._grayLevelSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      GrayEffectScene.prototype.onLoad = function() {
        this._grayLevelSlider = cc.find("Canvas/Content/Sliders/GrayLevelSlider/Slider").getComponent(cc.Slider);
        this._grayLevelSliderLabel = cc.find("Canvas/Content/Sliders/GrayLevelSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      GrayEffectScene.prototype.onEnable = function() {
        this._grayLevelSlider.node.on("slide", this._onSliderChanged, this);
      };
      GrayEffectScene.prototype.onDisable = function() {
        this._grayLevelSlider.node.off("slide", this._onSliderChanged, this);
      };
      GrayEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      GrayEffectScene.prototype._onSliderChanged = function() {
        this._grayLevelSliderLabel.string = "" + this._grayLevelSlider.progress.toFixed(2);
        this._updateRenderComponentMaterial({
          grayLevel: this._grayLevelSlider.progress
        });
      };
      GrayEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("grayLevel", param.grayLevel);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      GrayEffectScene = __decorate([ ccclass ], GrayEffectScene);
      return GrayEffectScene;
    }(cc.Component);
    exports.default = GrayEffectScene;
    cc._RF.pop();
  }, {} ],
  LoadingStyleEffect1Scene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ed1dQP3bBHS7dzMbIxKbil", "LoadingStyleEffect1Scene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadingStyleEffect1Scene = function(_super) {
      __extends(LoadingStyleEffect1Scene, _super);
      function LoadingStyleEffect1Scene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LoadingStyleEffect1Scene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
      };
      LoadingStyleEffect1Scene = __decorate([ ccclass ], LoadingStyleEffect1Scene);
      return LoadingStyleEffect1Scene;
    }(cc.Component);
    exports.default = LoadingStyleEffect1Scene;
    cc._RF.pop();
  }, {} ],
  MosaicEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79bbepDSHNMFqIKaCT3E1AX", "MosaicEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MosaicEffectScene = function(_super) {
      __extends(MosaicEffectScene, _super);
      function MosaicEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._xMosaicCountSlider = null;
        _this._xMosaicCountSliderLabel = null;
        _this._yMosaicCountSlider = null;
        _this._yMosaicCountSliderLabel = null;
        _this._mosaicCountSlider = null;
        _this._mosaicCountSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      MosaicEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._xMosaicCountSlider = cc.find("Canvas/Content/Sliders/XMosaicCountSlider/Slider").getComponent(cc.Slider);
        this._xMosaicCountSliderLabel = cc.find("Canvas/Content/Sliders/XMosaicCountSlider/ValueLabel").getComponent(cc.Label);
        this._yMosaicCountSlider = cc.find("Canvas/Content/Sliders/YMosaicCountSlider/Slider").getComponent(cc.Slider);
        this._yMosaicCountSliderLabel = cc.find("Canvas/Content/Sliders/YMosaicCountSlider/ValueLabel").getComponent(cc.Label);
        this._mosaicCountSlider = cc.find("Canvas/Content/Sliders/MosaicCountSlider/Slider").getComponent(cc.Slider);
        this._mosaicCountSliderLabel = cc.find("Canvas/Content/Sliders/MosaicCountSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      MosaicEffectScene.prototype.onEnable = function() {
        this._xMosaicCountSlider.node.on("slide", this._onSliderChanged, this);
        this._yMosaicCountSlider.node.on("slide", this._onSliderChanged, this);
        this._mosaicCountSlider.node.on("slide", this._onSliderChangedTogether, this);
      };
      MosaicEffectScene.prototype.onDisable = function() {
        this._xMosaicCountSlider.node.off("slide", this._onSliderChanged, this);
        this._yMosaicCountSlider.node.off("slide", this._onSliderChanged, this);
        this._mosaicCountSlider.node.off("slide", this._onSliderChangedTogether, this);
      };
      MosaicEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      MosaicEffectScene.prototype._onSliderChangedTogether = function() {
        var mosaicCount = Math.round(300 * this._mosaicCountSlider.progress);
        this._mosaicCountSliderLabel.string = "" + mosaicCount;
        this._updateRenderComponentMaterial({
          xBlockCount: mosaicCount,
          yBlockCount: mosaicCount
        });
      };
      MosaicEffectScene.prototype._onSliderChanged = function() {
        var xMosaicCount = Math.round(300 * this._xMosaicCountSlider.progress);
        this._xMosaicCountSliderLabel.string = "" + xMosaicCount;
        var yMosaicCount = Math.round(300 * this._yMosaicCountSlider.progress);
        this._yMosaicCountSliderLabel.string = "" + yMosaicCount;
        this._updateRenderComponentMaterial({
          xBlockCount: xMosaicCount,
          yBlockCount: yMosaicCount
        });
      };
      MosaicEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("xBlockCount", param.xBlockCount);
            material.setProperty("yBlockCount", param.yBlockCount);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      MosaicEffectScene = __decorate([ ccclass ], MosaicEffectScene);
      return MosaicEffectScene;
    }(cc.Component);
    exports.default = MosaicEffectScene;
    cc._RF.pop();
  }, {} ],
  OldPhotoEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e14fjO8iNCUKvgKgzGwi7P", "OldPhotoEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OldPhotoEffectScene = function(_super) {
      __extends(OldPhotoEffectScene, _super);
      function OldPhotoEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._oldLevelSlider = null;
        _this._oldLevelSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      OldPhotoEffectScene.prototype.onLoad = function() {
        this._oldLevelSlider = cc.find("Canvas/Content/Sliders/OldLevelSlider/Slider").getComponent(cc.Slider);
        this._oldLevelSliderLabel = cc.find("Canvas/Content/Sliders/OldLevelSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      OldPhotoEffectScene.prototype.onEnable = function() {
        this._oldLevelSlider.node.on("slide", this._onSliderChanged, this);
      };
      OldPhotoEffectScene.prototype.onDisable = function() {
        this._oldLevelSlider.node.off("slide", this._onSliderChanged, this);
      };
      OldPhotoEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      OldPhotoEffectScene.prototype._onSliderChanged = function() {
        this._oldLevelSliderLabel.string = "" + this._oldLevelSlider.progress.toFixed(2);
        this._updateRenderComponentMaterial({
          oldLevel: this._oldLevelSlider.progress
        });
      };
      OldPhotoEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("oldLevel", param.oldLevel);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      OldPhotoEffectScene = __decorate([ ccclass ], OldPhotoEffectScene);
      return OldPhotoEffectScene;
    }(cc.Component);
    exports.default = OldPhotoEffectScene;
    cc._RF.pop();
  }, {} ],
  OutlineEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7c6344eoZ5EmJ9RoujQfiId", "OutlineEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var OutlineEffectScene = function(_super) {
      __extends(OutlineEffectScene, _super);
      function OutlineEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._widthSlider = null;
        _this._widthSliderLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      OutlineEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._widthSlider = cc.find("Canvas/Content/Sliders/WidthSlider/Slider").getComponent(cc.Slider);
        this._widthSliderLabel = cc.find("Canvas/Content/Sliders/WidthSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      OutlineEffectScene.prototype.onEnable = function() {
        this._widthSlider.node.on("slide", this._onSliderChanged, this);
      };
      OutlineEffectScene.prototype.onDisable = function() {
        this._widthSlider.node.off("slide", this._onSliderChanged, this);
      };
      OutlineEffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      OutlineEffectScene.prototype._onSliderChanged = function() {
        var outlineWidth = parseFloat((this._widthSlider.progress / 100).toFixed(4));
        this._widthSliderLabel.string = "" + outlineWidth;
        this._updateRenderComponentMaterial({
          outlineWidth: outlineWidth
        });
      };
      OutlineEffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("outlineWidth", param.outlineWidth);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      OutlineEffectScene = __decorate([ ccclass ], OutlineEffectScene);
      return OutlineEffectScene;
    }(cc.Component);
    exports.default = OutlineEffectScene;
    cc._RF.pop();
  }, {} ],
  PointLightCtrlComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ababaxBpzZMv60DJIli3Qbn", "PointLightCtrlComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PointLightCtrlComponent = function(_super) {
      __extends(PointLightCtrlComponent, _super);
      function PointLightCtrlComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._pointLightUBO = new PointLightUBO();
        return _this;
      }
      PointLightCtrlComponent.prototype.onEnable = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on("on_property_change", this._onPropertyChange, this);
      };
      PointLightCtrlComponent.prototype.onDisable = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off("on_property_change", this._onPropertyChange, this);
      };
      PointLightCtrlComponent.prototype._onTouchStart = function(event) {
        this._onTouchMove(event);
      };
      PointLightCtrlComponent.prototype._onTouchMove = function(event) {
        var touchPointInWorldSpace = event.getLocation();
        var touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);
        this._pointLightUBO.centerPoint = cc.v2(this.node.anchorX + touchPointInNodeSpace.x / this.node.width, 1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height));
        this._updateMaterial();
      };
      PointLightCtrlComponent.prototype._onPropertyChange = function(pointLightUBO) {
        this._pointLightUBO.centerColor = pointLightUBO.centerColor;
        this._pointLightUBO.radius = pointLightUBO.radius;
        this._pointLightUBO.cropAlpha = pointLightUBO.cropAlpha;
        this._pointLightUBO.enableFog = pointLightUBO.enableFog;
        this._updateMaterial();
      };
      PointLightCtrlComponent.prototype._updateMaterial = function() {
        var _this = this;
        this.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
          var material = renderComponent.getMaterial(0);
          material.setProperty("centerColor", _this._pointLightUBO.centerColor);
          material.setProperty("centerPoint", _this._pointLightUBO.centerPoint);
          material.setProperty("radius", _this._pointLightUBO.radius);
          material.setProperty("cropAlpha", _this._pointLightUBO.cropAlpha);
          material.setProperty("enableFog", _this._pointLightUBO.enableFog);
          renderComponent.setMaterial(0, material);
        });
      };
      PointLightCtrlComponent = __decorate([ ccclass ], PointLightCtrlComponent);
      return PointLightCtrlComponent;
    }(cc.Component);
    exports.default = PointLightCtrlComponent;
    var PointLightUBO = function() {
      function PointLightUBO() {
        this.centerColor = cc.Color.YELLOW;
        this.centerPoint = cc.v2(.5, .5);
        this.radius = .5;
        this.cropAlpha = true;
        this.enableFog = false;
      }
      return PointLightUBO;
    }();
    exports.PointLightUBO = PointLightUBO;
    cc._RF.pop();
  }, {} ],
  PointLightEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a21276gRhMeaD3pR82Ji/3", "PointLightEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var PointLightCtrlComponent_1 = require("./PointLightCtrlComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PointLightEffectScene = function(_super) {
      __extends(PointLightEffectScene, _super);
      function PointLightEffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._redSlider = null;
        _this._redSliderLabel = null;
        _this._greenSlider = null;
        _this._greenSliderLabel = null;
        _this._blueSlider = null;
        _this._blueSliderLabel = null;
        _this._alphaSlider = null;
        _this._alphaSliderLabel = null;
        _this._radiuSlider = null;
        _this._radiuSliderLabel = null;
        _this._cropAlphaToggle = null;
        _this._enableFogToggle = null;
        _this._examplesParentNode = null;
        return _this;
      }
      PointLightEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._redSlider = cc.find("Canvas/Content/Controller/ColorRedSlider/Slider").getComponent(cc.Slider);
        this._redSliderLabel = cc.find("Canvas/Content/Controller/ColorRedSlider/ValueLabel").getComponent(cc.Label);
        this._greenSlider = cc.find("Canvas/Content/Controller/ColorGreenSlider/Slider").getComponent(cc.Slider);
        this._greenSliderLabel = cc.find("Canvas/Content/Controller/ColorGreenSlider/ValueLabel").getComponent(cc.Label);
        this._blueSlider = cc.find("Canvas/Content/Controller/ColorBlueSlider/Slider").getComponent(cc.Slider);
        this._blueSliderLabel = cc.find("Canvas/Content/Controller/ColorBlueSlider/ValueLabel").getComponent(cc.Label);
        this._alphaSlider = cc.find("Canvas/Content/Controller/ColorAlphaSlider/Slider").getComponent(cc.Slider);
        this._alphaSliderLabel = cc.find("Canvas/Content/Controller/ColorAlphaSlider/ValueLabel").getComponent(cc.Label);
        this._radiuSlider = cc.find("Canvas/Content/Controller/RadiuSlider/Slider").getComponent(cc.Slider);
        this._radiuSliderLabel = cc.find("Canvas/Content/Controller/RadiuSlider/ValueLabel").getComponent(cc.Label);
        this._cropAlphaToggle = cc.find("Canvas/Content/Controller/CropAlphaToggle/Toggle").getComponent(cc.Toggle);
        this._enableFogToggle = cc.find("Canvas/Content/Controller/EnableFogToggle/Toggle").getComponent(cc.Toggle);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.addComponent(PointLightCtrlComponent_1.default);
        });
      };
      PointLightEffectScene.prototype.onEnable = function() {
        this._redSlider.node.on("slide", this._onPropertyChanged, this);
        this._greenSlider.node.on("slide", this._onPropertyChanged, this);
        this._blueSlider.node.on("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.on("slide", this._onPropertyChanged, this);
        this._radiuSlider.node.on("slide", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.on("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.on("toggle", this._onPropertyChanged, this);
      };
      PointLightEffectScene.prototype.onDisable = function() {
        this._redSlider.node.off("slide", this._onPropertyChanged, this);
        this._greenSlider.node.off("slide", this._onPropertyChanged, this);
        this._blueSlider.node.off("slide", this._onPropertyChanged, this);
        this._alphaSlider.node.off("slide", this._onPropertyChanged, this);
        this._radiuSlider.node.off("slide", this._onPropertyChanged, this);
        this._cropAlphaToggle.node.off("toggle", this._onPropertyChanged, this);
        this._enableFogToggle.node.off("toggle", this._onPropertyChanged, this);
      };
      PointLightEffectScene.prototype.start = function() {
        this._onPropertyChanged();
      };
      PointLightEffectScene.prototype._onPropertyChanged = function() {
        var _this = this;
        this._redSliderLabel.string = this._redSlider.progress.toFixed(2) + " | " + Math.round(255 * this._redSlider.progress);
        this._greenSliderLabel.string = this._greenSlider.progress.toFixed(2) + " | " + Math.round(255 * this._greenSlider.progress);
        this._blueSliderLabel.string = this._blueSlider.progress.toFixed(2) + " | " + Math.round(255 * this._blueSlider.progress);
        this._alphaSliderLabel.string = this._alphaSlider.progress.toFixed(2) + " | " + Math.round(255 * this._alphaSlider.progress);
        this._radiuSliderLabel.string = "" + this._radiuSlider.progress.toFixed(2);
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.emit("on_property_change", {
            centerColor: cc.color(Math.round(255 * _this._redSlider.progress), Math.round(255 * _this._greenSlider.progress), Math.round(255 * _this._blueSlider.progress), Math.round(255 * _this._alphaSlider.progress)),
            radius: _this._radiuSlider.progress,
            cropAlpha: _this._cropAlphaToggle.isChecked,
            enableFog: _this._enableFogToggle.isChecked
          });
        });
      };
      PointLightEffectScene = __decorate([ ccclass ], PointLightEffectScene);
      return PointLightEffectScene;
    }(cc.Component);
    exports.default = PointLightEffectScene;
    cc._RF.pop();
  }, {
    "./PointLightCtrlComponent": "PointLightCtrlComponent"
  } ],
  PreviewEffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d1a1PdC6BIEraFMdWacOzv", "PreviewEffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PreviewEffectScene = function(_super) {
      __extends(PreviewEffectScene, _super);
      function PreviewEffectScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PreviewEffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
      };
      PreviewEffectScene = __decorate([ ccclass ], PreviewEffectScene);
      return PreviewEffectScene;
    }(cc.Component);
    exports.default = PreviewEffectScene;
    cc._RF.pop();
  }, {} ],
  RoundCornerCropV1EffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2765jFqWZOUKFiCcevAVee", "RoundCornerCropV1EffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RoundCornerCropV1EffectScene = function(_super) {
      __extends(RoundCornerCropV1EffectScene, _super);
      function RoundCornerCropV1EffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._radiuSlider = null;
        _this._radiuLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      RoundCornerCropV1EffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._radiuSlider = cc.find("Canvas/Content/Controller/RadiusSlider/Slider").getComponent(cc.Slider);
        this._radiuLabel = cc.find("Canvas/Content/Controller/RadiusSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      RoundCornerCropV1EffectScene.prototype.onEnable = function() {
        this._radiuSlider.node.on("slide", this._onSliderChanged, this);
      };
      RoundCornerCropV1EffectScene.prototype.onDisable = function() {
        this._radiuSlider.node.off("slide", this._onSliderChanged, this);
      };
      RoundCornerCropV1EffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      RoundCornerCropV1EffectScene.prototype._onSliderChanged = function() {
        this._radiuLabel.string = "" + this._radiuSlider.progress.toFixed(2);
        this._updateRenderComponentMaterial({
          radius: this._radiuSlider.progress
        });
      };
      RoundCornerCropV1EffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var material = renderComponent.getMaterial(0);
            material.setProperty("radius", param.radius);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      RoundCornerCropV1EffectScene = __decorate([ ccclass ], RoundCornerCropV1EffectScene);
      return RoundCornerCropV1EffectScene;
    }(cc.Component);
    exports.default = RoundCornerCropV1EffectScene;
    cc._RF.pop();
  }, {} ],
  RoundCornerCropV2EffectScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24bbee6XR5C2bLd8hn++QNn", "RoundCornerCropV2EffectScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RoundCornerCropV2EffectScene = function(_super) {
      __extends(RoundCornerCropV2EffectScene, _super);
      function RoundCornerCropV2EffectScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._radiuSlider = null;
        _this._radiuLabel = null;
        _this._examplesParentNode = null;
        return _this;
      }
      RoundCornerCropV2EffectScene.prototype.onLoad = function() {
        cc.dynamicAtlasManager.enabled = false;
        this._radiuSlider = cc.find("Canvas/Content/Controller/RadiusSlider/Slider").getComponent(cc.Slider);
        this._radiuLabel = cc.find("Canvas/Content/Controller/RadiusSlider/ValueLabel").getComponent(cc.Label);
        this._examplesParentNode = cc.find("Canvas/Content/Examples");
      };
      RoundCornerCropV2EffectScene.prototype.onEnable = function() {
        this._radiuSlider.node.on("slide", this._onSliderChanged, this);
      };
      RoundCornerCropV2EffectScene.prototype.onDisable = function() {
        this._radiuSlider.node.off("slide", this._onSliderChanged, this);
      };
      RoundCornerCropV2EffectScene.prototype.start = function() {
        this._onSliderChanged();
      };
      RoundCornerCropV2EffectScene.prototype._onSliderChanged = function() {
        var radiusInPx = Math.floor(100 * this._radiuSlider.progress);
        this._radiuLabel.string = radiusInPx + "";
        this._updateRenderComponentMaterial({
          radiusInPx: radiusInPx
        });
      };
      RoundCornerCropV2EffectScene.prototype._updateRenderComponentMaterial = function(param) {
        this._examplesParentNode.children.forEach(function(childNode) {
          childNode.getComponents(cc.RenderComponent).forEach(function(renderComponent) {
            var xRadiux = param.radiusInPx / childNode.width;
            xRadiux = xRadiux >= .5 ? .5 : xRadiux;
            var yRadius = param.radiusInPx / childNode.height;
            yRadius = yRadius >= .5 ? .5 : yRadius;
            "Rectangle1" === childNode.name && cc.log(childNode.name + " : (" + xRadiux + ", " + yRadius + ")");
            var material = renderComponent.getMaterial(0);
            material.setProperty("xRadius", xRadiux);
            material.setProperty("yRadius", yRadius);
            renderComponent.setMaterial(0, material);
          });
        });
      };
      RoundCornerCropV2EffectScene = __decorate([ ccclass ], RoundCornerCropV2EffectScene);
      return RoundCornerCropV2EffectScene;
    }(cc.Component);
    exports.default = RoundCornerCropV2EffectScene;
    cc._RF.pop();
  }, {} ],
  use_reversed_rotateBy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9410FY+EVIW6NUy+NFLs5u", "use_reversed_rotateBy");
    "use strict";
    cc.RotateBy._reverse = true;
    cc._RF.pop();
  }, {} ]
}, {}, [ "use_reversed_rotateBy", "FlashLightCtrlComponent", "FlashLightEffectScene", "GaussianBlurV1EffectScene", "GlowInnerV1EffectScene", "GlowInnerV2EffectScene", "GlowOutterEffectScene", "GrayEffectScene", "LoadingStyleEffect1Scene", "MosaicEffectScene", "OldPhotoEffectScene", "OutlineEffectScene", "PointLightCtrlComponent", "PointLightEffectScene", "PreviewEffectScene", "RoundCornerCropV1EffectScene", "RoundCornerCropV2EffectScene", "ContentAdapter" ]);