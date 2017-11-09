export default function(context) {
  
  var doc = context.document;
  var exports = NSMutableArray.alloc().init()
  var exportFolder= createTempFolderNamed()
  var assets=[];
  var selection = context.selection;
  var subject=""
  
  if (selection.count()>0){

    for (let i = 0; i < selection.count(); i ++) {
      var exportableLayer = selection.objectAtIndex(i);
      var requests = MSExportRequest.exportRequestsFromExportableLayer(exportableLayer)
      for (var j=0; j < requests.count(); j++) {
        var request = requests.objectAtIndex(j)
        
        var path = NSString.pathWithComponents([exportFolder, request.name() + '.' + request.format()])
        exports.addObject({ request: request, path: path })
      }

      for (var k=0; k < exports.count(); k++) {
        var currentExport = exports.objectAtIndex(k)
        var render
        if (currentExport.request.format() == "svg") {
          render = MSExportRendererWithSVGSupport.exporterForRequest_colorSpace(currentExport.request, NSColorSpace.sRGBColorSpace())
        } else {
          render = MSExporter.exporterForRequest_colorSpace(currentExport.request, NSColorSpace.sRGBColorSpace())
        }
        render.data().writeToFile_atomically(currentExport.path, true)
        
      }
      assets.push(currentExport.path)
      if(i>0){
        subject+=", "
      }
      subject+=request.name()
    }



    var textAttributedString = ""
    var shareItems = [textAttributedString];

    for(var i=0; i<assets.length; i++){
      var tempFileURL = NSURL.fileURLWithPath(assets[i]);
      shareItems.push(tempFileURL);
    }

    var mailShare = NSSharingService.sharingServiceNamed(NSSharingServiceNameComposeEmail);
    mailShare.subject=subject
    mailShare.performWithItems(shareItems);
  }else{
    doc.showMessage("Select a layer to send");
  }

}

var createTempFolderNamed = function(name) {
  var tempPath = getTempFolderPath(name);
  createFolderAtPath(tempPath);
  return tempPath;
}

var getTempFolderPath = function(withName) {
  var fileManager = NSFileManager.defaultManager(),
  cachesURL = fileManager.URLsForDirectory_inDomains(NSCachesDirectory, NSUserDomainMask).lastObject(),
  withName = (typeof withName !== 'undefined') ? withName : (Date.now() / 1000),
  folderName = NSString.stringWithFormat("%@", withName);
  return cachesURL.URLByAppendingPathComponent(folderName).path();
}

var createFolderAtPath = function(pathString) {
  var fileManager = NSFileManager.defaultManager();
  if (fileManager.fileExistsAtPath(pathString)) return true;
  return fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(pathString, true, null, null);
}

