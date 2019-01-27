import React from 'react';
import { tree } from './Tree';

class FolderView extends React.Component {

    constructor() {
        super(...arguments);

        // By default, display the root folder
        this.folder = tree;
        this.path = '/';

        // If there was an folder in the url, use that as root
        if (typeof this.props.match.params.folder !== 'undefined') {
            for (var name of this.props.match.params.folder.split('/')) {
                var node = this.folder.find((x) => x.name === name);

                if (node == null || typeof node.children === 'undefined') {
                    console.log('Invalid path!');
                    break;
                }

                this.folder = node.children;
                this.path += node.name + '/';
            }
        }
    }

    files() {
        var res = [];

        for (var file of this.folder) {
            if (file.isDir) {
                res.push(<div>FOLDER: {file.name}<br/></div>);
            } else {
                res.push(<div>FILE: {file.name}<br/></div>);
            }
        }

        return res;
    }

    render() {
        return (
            <div>
                <h2>{this.path}</h2>
                {this.files()}
            </div>
        );
    }
}

export default FolderView;