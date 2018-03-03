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
    var weeklySchedule = {};
    var rules = {};
    var employeeIDList = [];

    var promises = [
        axios.get(Variables.BASE_URL + '/rule-definitions'),
        axios.get(Variables.BASE_URL + '/employees'),
        axios.get(Variables.BASE_URL + '/time-off/requests'),
        axios.get(Variables.BASE_URL + '/shift-rules'),
        axios.get(Variables.BASE_URL + '/weeks')
    ];

    // push in weekly schedule template.
    for (var index = Variables.WEEK_START; index <= Variables.WEEK_END; index++) 
        weeklySchedule[(index + "")] = { "schedules": {} };

    Promise.all(promises).then(([ruleDef, employees, timeoff, shiftRules, weeks]) => {
        
        //
        // Adding rules.
        //
        ruleDef.data.forEach((index) => {
            rules[(index.id + "")] = {
                'name': index.value,
                'generic': [],
                'specific': []
            };
        });

        shiftRules.data.forEach((index) => {
            if (index.hasOwnProperty('employee_id')) {
                rules[(index.rule_id + "")].specific.push({
                    'employee_id' : index.employee_id,
                    'value' : index.value
                });
            } else {
                // if there are multiple generic values for a rule, for now let's place them all in an
                // array, and make a decision later which one we'll choose to be the correct generic value.
                rules[(index.rule_id + "")].generic.push(index.value);
            }

        });

        //  Adding employee data.
        employees.data.forEach((index) => {
            Object.keys(weeklySchedule).forEach((key) => {
                weeklySchedule[key].schedules[(index.id + "")] = {
                    'name': index.name,
                    'schedule': [],
                    'timeoffrequests': []
                }

            });

            employeeIDList.push(index.id);
        });


        // Adding week data.
        weeks.data.forEach((index) => {
            Object.keys(weeklySchedule).forEach((key)  => {
                if (key === index.id) {
                    weeklySchedule[key].start_date = index.start_date;
                }
            })
        });


        // Adding timeoff data.
        timeoff.data.forEach((index) => {
            weeklySchedule[(index.week + "")].schedules[(index.employee_id + "")].timeoffrequests = index.days;
        });


        // Algorithm to set up shifts [FEATURE1].

        var EMPLOYEES_PER_SHIFT = 2; //change this to get its actual value from JSON later.

        Object.keys(weeklySchedule).forEach((key) => {
            for (var i = 1; i <= 7; i++) {
                for (var j = EMPLOYEES_PER_SHIFT; j > 0; j--) {
                    var empID = employeeIDList[parseInt(Math.random() * employeeIDList.length, 10)] + "";
                    weeklySchedule[key].schedules[empID].schedule.push(i);
                    console.log("Added " + i + " to " + empID + "'s schedule");
                }
            }
        });


        this.setState({'rules': rules, 'data': weeklySchedule});
        console.log(this.state);
    });
    


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
            {JSON.stringify(this.state, null, 4) }
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
