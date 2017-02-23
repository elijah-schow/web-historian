var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var readline = require('readline');
var http = require('http');
var URL = require('url');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.escapeFileName = function( fileName, path) {
  var path = path ? path + '/' : '';
  return path + fileName.replace(/[^\w]/g, '_');
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // read sites from a file
  var urlList = [];
  var lineReader = readline.createInterface({
    input: fs.createReadStream(exports.paths.list)
  });
  // store each site in an array - each line in the file contains a seperate url
  lineReader.on('line', function (line) {
    urlList.push(line);
  });
  // invoke the callback function an pass in the array of urls
  lineReader.on('close', function () {
    callback(urlList);
  }); 

};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urlList) {
    callback(
      _.contains(urlList, url)
    );
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, '\n' + url, callback);
};

exports.isUrlArchived = function(url, callback) {
  // WARNING: concatenating a path with untrusted user input is extremely dangerous
  //    Does no protect against injection or directory traversal
  //    Ensure that the url does not contain command characters before passing it to this function
  fs.exists(exports.escapeFileName(url, exports.paths.archivedSites), callback);
};

exports.downloadUrls = function(urls) {
  urls.forEach(function (url) {
    var data = '';
    request('http://' + url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        fs.writeFile(exports.escapeFileName(url, exports.paths.archivedSites), body); 
      } else {
        console.log('ERROR', error);
      }
    });
  });
};