import React, { Component } from 'react';
import { img } from './Server';

class FileThumb extends Component {
    render() {
        return (
            <div>
                <img src={img(this.props.src)} />
            </div>
        );
    }
}

export default FileThumb;