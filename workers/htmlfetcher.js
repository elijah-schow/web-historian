// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');

exports.unarchived = function () {
  console.log('worker is working!');
  archive.readListOfUrls(function(urlList) {
    urlList.forEach(function(site) {
      archive.isUrlArchived(site, function(exists) {
        if (exists) {
        } else {
          archive.downloadUrls([site]);
        }
      });
    });
  });
};
