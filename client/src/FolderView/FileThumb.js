import React, { Component } from 'react';
import { img } from '../Server';
import { Col} from 'react-materialize';

var style = {
    marginBottom: '4px',
    marginTop: '4px',
}

class FileThumb extends Component {
    render() {
        return (
            <Col s={this.props.s} m={this.props.m} style={style}>
                <img className="responsive-img z-depth-1" src={img(this.props.src)} alt="" />
            </Col>
        );
    }
}

export default FileThumb;