import React, { Component } from 'react';
import EmployeesView from './EmployeesView';
import ScheduleBuilder from './ScheduleBuilder';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 'employeeData': [] }; // Async init.
  }

  componentDidMount() {
        ScheduleBuilder(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Schedule Generator</h1>
        </header>

        <br />
        <EmployeesView employeeData={this.state.employeeData} scheduleInfo={this.state.data}/>

      </div>
    );
  }
}

export default App;
