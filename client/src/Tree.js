var tree = {};

function setTree(obj) {

    // Sorts folders before files
    function sort(a, b) {
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
    }

    // Sorts children
    function walk(arr) {
        // Sort every subfolder
        arr.map(x => {
            if (x.isDir) walk(x.children);
        });
        arr.sort(sort);
    }

    // Sort everyone
    walk(obj);

    tree = obj;
}

export { tree, setTree };