window.__require=function t(e,r,o){function n(i,f){if(!r[i]){if(!e[i]){var u=i.split("/");if(u=u[u.length-1],!e[u]){var p="function"==typeof __require&&__require;if(!f&&p)return p(u,!0);if(c)return c(u,!0);throw new Error("Cannot find module '"+i+"'")}i=u}var l=r[i]={exports:{}};e[i][0].call(l.exports,function(t){return n(e[i][1][t]||t)},l,l.exports,t,e,r,o)}return r[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<o.length;i++)n(o[i]);return n}({Test:[function(t,e,r){"use strict";cc._RF.push(e,"5f59f+lIHdCJbEentGI70Kh","Test");var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),c=this&&this.__decorate||function(t,e,r,o){var n,c=arguments.length,i=c<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,o);else for(var f=t.length-1;f>=0;f--)(n=t[f])&&(i=(c<3?n(i):c>3?n(e,r,i):n(e,r))||i);return c>3&&i&&Object.defineProperty(e,r,i),i};Object.defineProperty(r,"__esModule",{value:!0});var i=cc._decorator,f=i.ccclass,u=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.onClickBack=function(){cc.director.loadScene("helloworld")},c([f],e)}(cc.Component));r.default=u,cc._RF.pop()},{}]},{},["Test"]);