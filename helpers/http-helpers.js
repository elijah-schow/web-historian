var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(response, asset) {
  fs.readFile(asset, function(error, data) {
    if (error) {
      console.log('Failed to load\n', asset, '\n', error);
      response.statusCode = 500;
      response.end();
    } else {
      response.statusCode = 200;
      response.end(data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
