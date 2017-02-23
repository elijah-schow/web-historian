var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var qs = require('qs');
var utils = require('../helpers/http-helpers.js');

var actions = {
  'GET': function(request, response) {
    var urlObject = url.parse(request.url);
    var path = urlObject.pathname === '/' ? '/index.html' : urlObject.pathname;
    utils.serveAssets(response, path);
  },
  'POST': function(request, response) {
    var data = '';
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      var requestUrl = '/' + qs.parse(data).url;
      archive.isUrlArchived( requestUrl, function(exists) {
        if (exists) {
          utils.serveAssets(response, requestUrl);
        } else {
          archive.addUrlToList(requestUrl);
          utils.serveAssets(response, '/loading.html');
        }
      });
    });
  }
};

exports.handleRequest = function (request, response) {
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.respond(response, "Not found", 404);
  }
};
