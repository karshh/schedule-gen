import React, { Component } from 'react';
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
          <h1 className="App-title">TECHNICAL ASSESSMENT</h1>
        </header>

        <br />
        <Employees employeeData={this.state.employeeData} scheduleInfo={this.state.data}/>

      </div>
    );
  }
}

export default App;
