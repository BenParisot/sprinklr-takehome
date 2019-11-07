import React from 'react';
import Landing from './pages/Landing';
import DataDisplay from './pages/DataDisplay';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/:zip" component={DataDisplay} />
       </Switch>
    </Router>
  );
}

export default App;
