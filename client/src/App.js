import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as configs from './Configs';
import FolderView from './FolderView';
import { setTree } from './Tree';

class App extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    fetch(configs.url('/tree'))
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
            <p>
              My data is: {/*JSON.stringify(tree)*/}
            </p>
            <Link to={{
              pathname: '/folder',
              search: `?path=1.Animations`,
            }}>Folder</Link>
          </header>

          <this.Body loaded={this.state.loaded} />
        </div>
      </Router>
    );
  }

  Body(props) {
    const loaded = props.loaded;

    if (loaded) {
      return (
        <div>
          <Route exact path="/" component={FolderView} />
          <Route path="/folder/:folder(.*)" component={FolderView} />
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default App;
