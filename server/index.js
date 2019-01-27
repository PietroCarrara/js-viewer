const { FileSystem } = require('./filesystem');
const { Image } = require('./image');
const express = require('express');
const config = require('./config');

var fs = new FileSystem();
var router = express();

// Middleware to allow cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Returns the file system tree
router.get('/tree', async (req, res) => {
    fs.tree(config.target)
    .then((json) => res.json(json))
    .catch(err => res.status(500).json(err));
});

router.get('/img/', async (req, res) => {

    if (typeof req.query.path === 'undefined') {
        res.status(500).json({errno: -1, code: 'NO_IMG_PATH'});
        return;
    }

    new Image(config.target + req.query.path)
    .resize(500, 500)
    .jpeg()
    .toBuffer()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

router.listen(8000);
