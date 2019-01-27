import React from 'react';
import { Link } from 'react-router-dom';
import { tree } from './Tree';

class FolderView extends React.Component {

    constructor() {
        super(...arguments);

        if (typeof this.props.match.params.folder !== 'undefined') {
            this.navigate(this.props.match.params.folder);
        } else {
            this.navigate('');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params !== this.props.match.params) {
            this.navigate(nextProps.match.params.folder);
        }
    }

    navigate(url) {

        url = decodeURIComponent(url);

        // By default, display the root folder
        this.folder = tree;
        this.path = '/';

        // If there was an folder in the url, use that as root
        for (var name of url.split('/')) {
            if (name === '') continue;

            var node = this.folder.find((x) => x.name === name);

            if (node == null || typeof node.children === 'undefined') {
                console.log('Invalid path while navigating to %s!', name);
                break;
            }

            this.folder = node.children;
            this.path += node.name + '/';
        }
    }

    files() {
        var res = [];

        for (var file of this.folder) {
            if (file.isDir) {
                res.push(
                <Link key={file.name} to={this.props.location.pathname + encodeURIComponent(file.name) + '/'}>
                    FOLDER: {file.name}<br />
                </Link>);
            } else {
                res.push(<div key={file.name}>FILE: {file.name}<br /></div>);
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