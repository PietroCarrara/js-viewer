import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as server from './Server';
import FolderView from './FolderView/FolderView';
import { setTree } from './Tree';

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
      .catch(console.log)
      .then(() => this.setState({ loaded: true }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>JS Viewer</h1>
          </header>

          {this.body(this.state.loaded)}
        </div>
      </Router>
    );
  }

  body(loaded) {
    if (loaded) {
      return (
        <div>
          <Switch>
            <Route path="/" exact component={FolderView} />
            <Route path="/folder" exact component={FolderView} />
            <Route path="/folder/:folder(.*)" component={FolderView} />
          </Switch>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default App;
