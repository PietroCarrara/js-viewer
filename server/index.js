const { FileSystem } = require('./filesystem.js');
const express = require('express');

var fs = new FileSystem();
var router = express();

const TARGET_PATH = process.argv[2];

// Returns the file system tree
router.get('/tree', async (req, res) => {
    fs.tree(TARGET_PATH)
    .then((json) => res.json(json))
    .catch(err => res.status(500).json(err));
});

router.listen(8000);