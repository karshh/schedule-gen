import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('http://interviewtest.replicon.com/employees')
    .then((results) => this.setState({employees: results.data}));
    axios.get('http://interviewtest.replicon.com/employees/1')
    .then((results) => this.setState({employeesid: results.data}));
    axios.get('http://interviewtest.replicon.com/time-off/requests')
    .then((results) => this.setState({timeoffrequests: results.data}));
    axios.get('http://interviewtest.replicon.com/weeks/23')
    .then((results) => this.setState({week23: results.data}));
    axios.get('http://interviewtest.replicon.com/rule-definitions')
    .then((results) => this.setState({ruleDefinition: results.data}));
    axios.get('http://interviewtest.replicon.com/shift-rules')
    .then((results) => this.setState({shiftRules: results.data}));
     
    console.log('I was triggered during componentDidMount');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <pre>
        <h1> Employees </h1>
        <p>
            {JSON.stringify(this.state.employees, null, 4) }
        </p>
        <h1> Rule definition </h1>
        <p>
            {JSON.stringify(this.state.ruleDefinition, null, 4) }
        </p>
        <h1> Shift rules </h1>
        <p>
            {JSON.stringify(this.state.shiftRules, null, 4) }
        </p>
        <h1> Employee timeoff </h1>
        <p>
            {JSON.stringify(this.state.timeoffrequests, null, 4) }
        </p>
        <h1> Employee week 23 </h1>
        <p>
            {JSON.stringify(this.state.week23, null, 4) }
        </p>

        </pre>
      </div>
    );
  }
}

export default App;
