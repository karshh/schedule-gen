import axios from 'axios';
import Utils from './Utils';
import Variables from './Variables';

var ScheduleBuilder = function(app) {

	var weeklySchedule = {};
    var rules = {};
    var employeeIDList = [];

    // Generic constraints. Dummy values.
    var constrantValues = {}
    constrantValues['EMPLOYEES_PER_SHIFT'] = 0;
    constrantValues['MIN_SHIFTS'] = 0;
    constrantValues['MAX_SHIFTS'] = 0;

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
                'generic': 0, 
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
                // if there are multiple generic values for a rule, we'll just pick the last generic value 
                // for now.
                rules[(index.rule_id + "")].generic = index.value;
                constrantValues[rules[(index.rule_id + "")].name] = index.value
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
                if (parseInt(key,10) === index.id) {
                    weeklySchedule[key].start_date = index.start_date;
                }
            })
        });


        // Adding timeoff data.
        timeoff.data.forEach((index) => {
            weeklySchedule[(index.week + "")].schedules[(index.employee_id + "")].timeoffrequests = index.days;
        });

        // Algorithm to set up shifts [FEATURE1 & FEATURE2].
        Utils.buildSchedule(constrantValues, weeklySchedule, employeeIDList);

        app.setState({
        	'rules': rules, 
        	'data': weeklySchedule, // generic data which will be filtered upon employee choice.
        	'employeeData': employees.data // need this for options tab.
        });
    });

}

export default ScheduleBuilder;

