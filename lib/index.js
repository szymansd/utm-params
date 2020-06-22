"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("url-polyfill");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var allowedParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_name", "utm_term", "initial_utm_source", "initial_utm_medium", "initial_utm_campaign", "initial_utm_content", "initial_utm_name", "initial_utm_term"];

function checkIfInitialParamsExist(params) {
  return Object.keys(params).find(function (k) {
    return k.includes("initial");
  });
}

;

var UTMParams = /*#__PURE__*/function () {
  function UTMParams() {
    _classCallCheck(this, UTMParams);
  }

  _createClass(UTMParams, null, [{
    key: "parse",

    /**
     * Get utm params allowed by GA
     *
     * @return {Object}
     */
    value: function parse() {
      var urlSearch = new URL(window.location);
      var urlParams = new URLSearchParams(urlSearch.search);
      var parsedParams = {};
      allowedParams.forEach(function (key) {
        var paramValue = urlParams.get(key);

        if (paramValue) {
          parsedParams[key] = paramValue;
        }
      });
      return parsedParams;
    }
    /**
     * Save UTM params in localStorage
     *
     * @param {Object} params
     * @return {Boolean}
     */

  }, {
    key: "save",
    value: function save(params) {
      if (!params || !allowedParams.some(function (key) {
        return !!params[key];
      })) {
        return false;
      }

      try {
        var paramsToSave = {};
        var initialParams = {};

        _extends(paramsToSave, params);

        if (window.localStorage.getItem("utmSavedParams")) {
          var existingParams = {};

          try {
            existingParams = JSON.parse(window.localStorage.getItem("utmSavedParams"));
          } catch (e) {
            existingParams = {};
          }

          if (checkIfInitialParamsExist(existingParams)) {
            Object.keys(existingParams).forEach(function (k) {
              if (k.includes('initial_')) {
                initialParams[k] = existingParams[k];
              }
            });
          }
        } else {
          Object.keys(paramsToSave).forEach(function (k) {
            initialParams['initial_' + k] = paramsToSave[k];
          });
        }

        _extends(paramsToSave, initialParams);

        window.localStorage.setItem("utmSavedParams", JSON.stringify(paramsToSave));
        return true;
      } catch (e) {
        throw new Error(e);
        return false;
      }
    }
    /**
     * Reads UTM params from localStorage
     *
     * @return {Object}
     */

  }, {
    key: "get",
    value: function get() {
      var savedParams = window.localStorage.getItem("utmSavedParams");

      if (savedParams) {
        return JSON.parse(savedParams);
      }

      return null;
    }
  }]);

  return UTMParams;
}();

var _default = UTMParams;
exports["default"] = _default;