"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MediaType = void 0;

var _reactNative = require("react-native");

let MediaType;
exports.MediaType = MediaType;

(function (MediaType) {
  MediaType["VIDEO"] = "video";
  MediaType["IMAGE"] = "image";
  MediaType["ALL"] = "all";
})(MediaType || (exports.MediaType = MediaType = {}));

const {
  MultipleImagePicker
} = _reactNative.NativeModules;
var _default = MultipleImagePicker;
exports.default = _default;
//# sourceMappingURL=index.d.js.map