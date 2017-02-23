// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(urlList) {
  urlList.forEach(function(site) {
    console.log('SITE*****', site);
    archive.isUrlArchived(site, function(exists) {
      if (exists) {
        console.log('IT EXISTS!!>>>', site);
      } else {
        archive.downloadUrls([site]);
        console.log('IT DOESNT EXIST', site);
      }
    });
  });
});
