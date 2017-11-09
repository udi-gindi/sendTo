var that = this;
function run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (context) {

  var doc = context.document;
  var exports = NSMutableArray.alloc().init();
  var exportFolder = createTempFolderNamed();
  var assets = [];
  var selection = context.selection;
  var subject = "";

  if (selection.count() > 0) {

    for (var _i = 0; _i < selection.count(); _i++) {
      var exportableLayer = selection.objectAtIndex(_i);
      var requests = MSExportRequest.exportRequestsFromExportableLayer(exportableLayer);
      for (var j = 0; j < requests.count(); j++) {
        var request = requests.objectAtIndex(j);

        var path = NSString.pathWithComponents([exportFolder, request.name() + '.' + request.format()]);
        exports.addObject({ request: request, path: path });
      }

      for (var k = 0; k < exports.count(); k++) {
        var currentExport = exports.objectAtIndex(k);
        var render;
        if (currentExport.request.format() == "svg") {
          render = MSExportRendererWithSVGSupport.exporterForRequest_colorSpace(currentExport.request, NSColorSpace.sRGBColorSpace());
        } else {
          render = MSExporter.exporterForRequest_colorSpace(currentExport.request, NSColorSpace.sRGBColorSpace());
        }
        render.data().writeToFile_atomically(currentExport.path, true);
      }
      assets.push(currentExport.path);
      if (_i > 0) {
        subject += ", ";
      }
      subject += request.name();
    }

    var textAttributedString = "";
    var shareItems = [textAttributedString];

    for (var i = 0; i < assets.length; i++) {
      var tempFileURL = NSURL.fileURLWithPath(assets[i]);
      shareItems.push(tempFileURL);
    }

    var mailShare = NSSharingService.sharingServiceNamed(NSSharingServiceNameComposeEmail);
    mailShare.subject = subject;
    mailShare.performWithItems(shareItems);
  } else {
    doc.showMessage("Select a layer to send");
  }
};

var createTempFolderNamed = function createTempFolderNamed(name) {
  var tempPath = getTempFolderPath(name);
  createFolderAtPath(tempPath);
  return tempPath;
};

var getTempFolderPath = function getTempFolderPath(withName) {
  var fileManager = NSFileManager.defaultManager(),
      cachesURL = fileManager.URLsForDirectory_inDomains(NSCachesDirectory, NSUserDomainMask).lastObject(),
      withName = typeof withName !== 'undefined' ? withName : Date.now() / 1000,
      folderName = NSString.stringWithFormat("%@", withName);
  return cachesURL.URLByAppendingPathComponent(folderName).path();
};

var createFolderAtPath = function createFolderAtPath(pathString) {
  var fileManager = NSFileManager.defaultManager();
  if (fileManager.fileExistsAtPath(pathString)) return true;
  return fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(pathString, true, null, null);
};

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = run.bind(this, 'default')
