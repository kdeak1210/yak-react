import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, ProfileInfo } from './components/layout';
import { Provider } from 'react-redux';
import store from './stores/store';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

// react-router-dom is for v4 and install react-router as a dependency

class App extends Component{
  render(){
    return(
      <Provider store={ store.configureStore() }>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/profile/:username' component={ProfileInfo} />
          </Switch>
        </BrowserRouter>
      </Provider>   
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));