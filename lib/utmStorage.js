"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var UTMStorage = /*#__PURE__*/function () {
  function UTMStorage() {
    _classCallCheck(this, UTMStorage);

    try {
      var ls = window.localStorage;
      this.setItem = ls.setItem;
      this.getItem = ls.getItem;
      this.removeItem = ls.removeItem;
      this.setItem('test', 'test');
      this.removeItem('test');
    } catch (e) {
      this.prefixToAvoidBuiltIns = '_utm_unique_';
      this.localMockedStorage = {};
      this.setItem = this.setLocalItem;
      this.getItem = this.getLocalItem;
    }
  }

  _createClass(UTMStorage, [{
    key: "setLocalItem",
    value: function setLocalItem(key, value) {
      this.localMockedStorage[this.prefixToAvoidBuiltIns + key] = value;
    }
  }, {
    key: "getLocalItem",
    value: function getLocalItem(key) {
      return this.localMockedStorage[this.prefixToAvoidBuiltIns + key];
    }
  }]);

  return UTMStorage;
}();

var _default = UTMStorage;
exports["default"] = _default;