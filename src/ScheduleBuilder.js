import axios from 'axios';
import Utils from './Utils';
import Variables from './Variables';

var ScheduleBuilder = function(app) {

	var weeklySchedule = {};
    var rules = {};
    var employeeIDList = [];

    var PROMISES = [
        axios.get(Variables.BASE_URL + '/rule-definitions'),
        axios.get(Variables.BASE_URL + '/employees'),
        axios.get(Variables.BASE_URL + '/time-off/requests'),
        axios.get(Variables.BASE_URL + '/shift-rules'),
        axios.get(Variables.BASE_URL + '/weeks')
    ];

    // push in weekly schedule template.
    for (var index = Variables.WEEK_START; index <= Variables.WEEK_END; index++) 
        weeklySchedule[(index + "")] = { "schedules": {} };

    Promise.all(PROMISES).then(([ruleDef, employees, timeoff, shiftRules, weeks]) => {
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

        Utils.buildSchedule(EMPLOYEES_PER_SHIFT, weeklySchedule, employeeIDList);

        app.setState({
        	'rules': rules, 
        	'data': weeklySchedule, 
        	'employeeData': employees.data // need this for options tab.
        });
    });

}

export default ScheduleBuilder;

