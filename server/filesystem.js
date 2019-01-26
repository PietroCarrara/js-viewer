const fs = require('fs').promises;

class FSNode {
    /**
     * 
     * @param {string} name The node's name.
     * @param {boolean} isFile Is this node a directory? 
     * @param {Array} children If this node is a dir, who are it's children?
     */
    constructor(name, isDir = false, children) {
        this.name = name;
        this.isDir = isDir;
        if (this.isDir) {
            this.children = children;
        }
    }
}

class FileSystem {

    /**
     * Generates the file system tree (like the tree *nix command).
     * 
     * @param {string} dir What dir to use as root. Defaults to '.'.
     * @returns {Array} Array of FSNodes.
     */
    tree(dir = '.') {

        // Make sure dir ends with '/'
        if (!dir.endsWith('/')) {
            dir += '/';
        }

        var result = [];

        // Read the required dir
        return fs.readdir(dir)
        .then((files) => {
            var pendingPromises = [];
            for (let file of files) {
                // Check if the node is a dir or a file
                let statProm = fs.lstat(dir + file).then(async stat => {
                    if (stat.isFile()) {
                        result.push(new FSNode(file, false));
                    } else if (stat.isDirectory()) {
                        let children = await this.tree(dir + file);
                        result.push(new FSNode(file, true, children));
                    }
                });
                pendingPromises.push(statProm);
            }
            // Once everything has been resolved,
            // return the result
            return Promise.all(pendingPromises)
            .then(() => result);
        });
    }

    treeJson(dir = '.') {
        return this.tree(dir)
        .then((res) => JSON.stringify(res));
    }
}

module.exports.FSNode = FSNode;
module.exports.FileSystem = FileSystem;
