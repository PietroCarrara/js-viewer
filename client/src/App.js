import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import * as server from './Server';
import FolderView from './FolderView/FolderView';
import { setTree, sortBy as sortTreeBy } from './Tree';

class App extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    fetch(server.url('/tree'))
      .then(res => res.json())
      .then(setTree)
      .then(() => sortTreeBy.Name())
      .then(() => this.setState({ loaded: true }));
  }

  render() {
    return (
      <Router>
        <div className="App" style={{ width: '100%' }}>
          {this.body(this.state.loaded)}
        </div>
      </Router>
    );
  }

  body(loaded) {
    if (loaded) {
      return (
        <Row>
          <Col s={12}>
            <Switch>
              <Route path="/" exact component={FolderView} />
              <Route path="/folder" exact component={FolderView} />
              <Route path="/folder/:folder(.*)" component={FolderView} />
            </Switch>
          </Col>
        </Row>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default App;
