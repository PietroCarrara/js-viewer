const { FileSystem } = require('./filesystem.js');

var fs = new FileSystem();

fs.treeJson().
then(console.log);

return;