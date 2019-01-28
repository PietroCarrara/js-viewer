import React from 'react';
import { Link } from 'react-router-dom';
import { tree } from '../Tree';
import FileThumb from './FileThumb';
import Animated from 'animated/lib/targets/react-dom';

class FolderView extends React.Component {

    constructor() {
        super(...arguments);

        this.state = {
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1)
        }

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

        this.state.scale.setValue(0);
        this.state.opacity.setValue(0)

        Animated.spring(this.state.scale, { toValue: 1, duration: 500}).start();
        Animated.spring(this.state.opacity , { toValue: 1, duration: 500}).start();

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
            this.path += encodeURIComponent(node.name) + '/';
        }
    }

    files() {
        var res = [];

        for (var file of this.folder) {
            if (file.isDir) {
                res.push(
                    <Link key={file.name} to={'/folder' + this.path + encodeURIComponent(file.name) + '/'}>
                        FOLDER: {file.name}<br />
                    </Link>);
            } else {
                res.push(<FileThumb src={this.path + encodeURIComponent(file.name)} />);
            }
        }

        return res;
    }

    render() {
        return (
            <Animated.div style={{opacity: this.state.opacity, transform: [{scale: this.state.scale}]}}>
            <div>
                <h2>{decodeURIComponent(this.path)}</h2>
                {this.files()}
            </div>
            </Animated.div>
        );
    }
}

export default FolderView;