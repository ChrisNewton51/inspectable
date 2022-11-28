import { NativeModules } from 'react-native';
export let MediaType;

(function (MediaType) {
  MediaType["VIDEO"] = "video";
  MediaType["IMAGE"] = "image";
  MediaType["ALL"] = "all";
})(MediaType || (MediaType = {}));

const {
  MultipleImagePicker
} = NativeModules;
export default MultipleImagePicker;
//# sourceMappingURL=index.d.js.map