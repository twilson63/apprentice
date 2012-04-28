module.exports = function(path, req) {
  var pathItems = path.split('/');
  req.resource = ""; req.resourceId = "";
  if (pathItems.length > 1) { req.resource = pathItems[1]; }
  if (pathItems.length > 2) { req.resourceId = pathItems[2]; }

}