var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var readline = require('readline');
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
//check isUrlInList to see if true or false

//if false add

//if true don't add

};

exports.isUrlArchived = function(url, callback) {
//


};

exports.downloadUrls = function(urls) {
 // downloads urls  
};
