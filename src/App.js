import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Calender from './calender';
// import CalDay from './components/calender_day';

class App extends Component {

  render() {
    return (

      <BrowserRouter>
        <div>
          <Route exact path="/" component={Calender}></Route>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
