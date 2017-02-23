var path = require('path');
var fs = require('fs');
var archive = require('./archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset, callback) {
  var encoding = {'encoding': 'utf8'};
  console.log('serve assets');
  fs.readFile(archive.paths.archivedSites + asset, encoding, function(error, data) {
    console.log('read archive');
    if (error) {
      fs.readFile(archive.paths.siteAssets + asset, encoding, function(error, data) {
        console.log('read public');
        if(error){
          console.log('404 Not Found', asset);
          callback ? callback() : exports.respond(response, '', 404);
        } else {
          console.log('Static Resource:', asset);
          exports.respond(response, data);
        }
      });
    } else {
      console.log('Archived Site:', asset);
      exports.respond(response, data);
    }
  });
};

// As you progress, keep thinking about what helper functions you can put here!
exports.respond = function(response, body, statusCode){
  response.statusCode = statusCode || 200;
  response.end(body);
}

exports.escapeFileName = function( fileName, path) {
  var path = path ? path + '/' : '';
  return path + fileName.replace(/[^\w]/g, '_');
};

exports.httpify = function(url) {
  return url.match(/^http:\/\//) ? url : 'http://' + url;
};
