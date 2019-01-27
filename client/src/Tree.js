var tree = {};

function setTree(obj) {

    // Sort folders before files
    obj.sort((a, b) => {
        if (a.isDir === b.isDir) {
            if (a.name === b.name) {
                return 0;
            }
            else if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        }
        else {
            if (a.isDir) {
                return -1;
            } else {
                return 1;
            }
        }
    });

    tree = obj;
}

export { tree, setTree };