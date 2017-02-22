var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');

exports.handleRequest = function (request, response) {
  var path = url.parse(request.url).pathname;
  if (path === '/' && request.method === 'GET') {
    fs.readFile('./web/public/index.html', function(error, data) {
      if (error) {
        console.log('index.html failed to load\n', error);
        response.statusCode = 500;
        response.end();
      } else {
        response.statusCode = 200;
        response.end(data);
      }
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
};
