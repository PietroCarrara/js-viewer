import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Row, Col, Breadcrumb, MenuItem, Button, NavItem } from 'react-materialize';
import { tree } from '../Tree';
import FileThumb from './FileThumb';
import Animated from 'animated/lib/targets/react-dom';
import './FolderView.css';

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

        Animated.spring(this.state.scale, { toValue: 1, duration: 500 }).start();
        Animated.spring(this.state.opacity, { toValue: 1, duration: 500 }).start();

        url = decodeURIComponent(url);

        // By default, display the root folder
        this.folder = tree;
        this.path = '/';
        this.breadcumbs = [(
            <MenuItem>
                <Link to={'/folder' + this.path}>/</Link>
            </MenuItem>
        )];
        this.dropdown = [(
            <Link to={'/folder' + this.path}>
                <NavItem>/</NavItem>
            </Link>
        )];
        var lastName = '/';

        // If there was an folder in the url, use that as root
        for (var name of url.split('/')) {
            if (name === '') continue;

            var node = this.folder.find((x) => x.name === name);

            if (node == null || typeof node.children === 'undefined') {
                console.log('Invalid path while navigating to %s!', name);
                break;
            }

            lastName = node.name;
            this.folder = node.children;
            this.path += encodeURIComponent(node.name) + '/';
            this.breadcumbs.push(
                <MenuItem>
                    <Link to={'/folder' + this.path}>{node.name}</Link>
                </MenuItem>
            );
            this.dropdown.push(
                <Link to={'/folder' + this.path}>
                    <NavItem>{node.name}</NavItem>
                </Link>
            );
        }

        this.dropdown.pop();

        this.heading = (
            /* Force 15px font, as the default seems do mess icon alignment */
            <div style={{ fontSize: '15px' }}>
                <Row id="breadcumber-path">
                    <Col s={12}>
                        <Breadcrumb>
                            {this.breadcumbs}
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row id="dropdown-path">
                    <Col s={12} className="center-align">
                        <Dropdown trigger={
                            <Button>{lastName}</Button>
                        }>
                            {this.dropdown}
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        )
    }

    files() {
        var folders = [];
        var pics = [];
        const perLine = 4;

        var tmpLine = [];
        var picCount = 0;

        for (var file of this.folder) {
            if (file.isDir) {
                folders.push(
                    <Col s={12} m={4}>
                        <Link key={file.name} to={'/folder' + this.path + encodeURIComponent(file.name) + '/'}>
                            <Icon left tiny>folder</Icon> {file.name}<br />
                        </Link>
                    </Col>);
            } else {
                tmpLine.push(
                    <FileThumb s={12} m={12 / perLine} src={this.path + encodeURIComponent(file.name)} />
                );
                picCount++;
                if (picCount >= perLine) {
                    pics.push(
                        <Row style={{ margin: 0 }}>
                            {tmpLine}
                        </Row>
                    );
                    tmpLine = [];
                    picCount = 0;
                }
            }
        }

        // Put the last remaining pages on
        if (tmpLine.length > 0) {
            pics.push(
                <Row>
                    {tmpLine}
                </Row>
            );
        }

        return (
            <Row>
                <Row>
                    {folders}
                </Row>
                <Row>
                    {pics}
                </Row>
            </Row>
        );
    }

    render() {
        return (
            <Animated.div style={{ opacity: this.state.opacity, transform: [{ scale: this.state.scale }] }}>
                <h2>{this.heading}</h2>
                {this.files()}
            </Animated.div>
        );
    }
}

export default FolderView;