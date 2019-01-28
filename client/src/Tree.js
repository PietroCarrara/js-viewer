var tree = {};

function setTree(obj) {
    tree = obj;
}

const sortBy = {
    Name: function (nodes = tree) {
        for(var node of nodes) {
            if (node.isDir) {
                this.Name(node.children);
            }
        }

        nodes.sort((a, b) => a.name > b.name);
    }
}

export { sortBy, tree, setTree };