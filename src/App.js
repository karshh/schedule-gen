import React, { Component } from 'react';
import logo from './logo.svg';
import Employees from './Employees';
import ScheduleBuilder from './ScheduleBuilder';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    // Async init.
    this.state = {
        'employeeData': []
    };
  }


  componentDidMount() {
        ScheduleBuilder(this);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <br />
        <Employees employeeData={this.state.employeeData} scheduleInfo={this.state.data}/>

      </div>
    );
  }
}

export default App;
