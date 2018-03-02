import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import Variables from './Variables';
import Employees from './Employees';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var weeklySchedule = [];
    var shiftRules = {};
    var employeeRules = [];
    var rules = {};

    // set up rules ID.
    axios.get(Variables.BASE_URL + '/rule-definitions')
    .then((results) => {
        results.data.map((index) => {
            rules[index.value] = index.id;
        });

    });

    // push in weekly schedule template.
    [23, 24, 25, 26].map((index) => {
        weeklySchedule.push({
            "week": index,
            "schedule": []
        });

    });

    // push in employee shift template.
    axios.get(Variables.BASE_URL + '/employees')
    .then((results) => {
        results.data.map((index) => {
            weeklySchedule.map((schedIndex) => {
                schedIndex.schedule.push({"employeeid":index.id, "shift": []});
            });
        });
    });

    // assign random schedule.
    var EMPLOYEES_PER_SHIFT = rules["EMPLOYEES_PER_SHIFT"];
    


    console.log({"data": weeklySchedule});

    // set up employees.
    
        

    //     console.log(employees);
    // });

    // axios.get('http://interviewtest.replicon.com/employees/1')
    // .then((results) => employeeList = results.data);
    // axios.get('http://interviewtest.replicon.com/time-off/requests')
    // .then((results) => this.setState({timeoffrequests: results.data}));
    axios.get('http://interviewtest.replicon.com/weeks/23')
    .then((results) => this.setState({week23: results.data}));
    axios.get('http://interviewtest.replicon.com/shift-rules')
    .then((results) => this.setState({shiftRules: results.data}));
     
    // console.log('I was triggered during componentDidMount');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <pre>
        <Employees />
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
