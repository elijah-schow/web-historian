var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var qs = require('qs');
var helpers = require('../helpers/http-helpers.js');

exports.handleRequest = function (request, response) {
  var path = url.parse(request.url).pathname;
  if (path === '/' && request.method === 'GET') {
    helpers.serveAssets(response, './web/public/index.html');
  } else if (path === '/' && request.method === 'POST') {
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      var requestUrl = archive.httpify(qs.parse(data).url);
      archive.isUrlArchived(requestUrl, function(exists) {
        if (exists) {
          console.log('EXISTS', requestUrl);
          helpers.serveAssets(response, archive.escapeFileName(requestUrl, './archives/sites'));
        } else {
          console.log('Doesn\'t exist', requestUrl);
          archive.addUrlToList(requestUrl);
          helpers.serveAssets(response, './web/public/loading.html');
        }
      });
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
};
