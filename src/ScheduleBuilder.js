import axios from 'axios';
import Variables from './Variables';



function constraintsCheck(empID, shiftcache, schedule, day) {

    // listing out all constraints of employees.
    // this should allow abstraction in checking if employee meets shift requirements in features.
    var ALREADYSCHEDULED = shiftcache.includes(empID);
    var REQUESTEDTIMEOFF = schedule[empID].timeoffrequests.includes(day);


    if (ALREADYSCHEDULED || REQUESTEDTIMEOFF) return true;

    shiftcache.push(empID);
    return false;

}

function buildSchedule(genericConstraintValues, specificConstraintValues, weeklySchedule, employeeIDList) {
    var EMPLOYEES_PER_SHIFT = genericConstraintValues['EMPLOYEES_PER_SHIFT'];
    Object.keys(weeklySchedule).forEach((key) => {

        var sched = weeklySchedule[key].schedules;
        for (var i = 1; i <= 7; i++) {
            var shiftcache = [];
            for (var j = EMPLOYEES_PER_SHIFT; j > 0; j--) {
                var empID;
                do {
                    empID = employeeIDList[parseInt(Math.random() * employeeIDList.length, 10)] + "";
                } while (constraintsCheck(empID, shiftcache, sched, i));
                
                sched[empID].schedule.push(i);
            }
        }
    });

}

function axiosErrorMsg(err, msgEnd) {
    console.log(err.message + " :Failed to get " + msgEnd + ".");
}

function ScheduleBuilder(app) {


	var weeklySchedule = {}; // generic data which will be filtered upon employee choice.
    var employeeIDList = []; // need this for options tab.

    var rules = {}; 

    // Schedule constraints. Dummy values for generic ones to be replaced later.
    var genericConstrantValues = {};
    genericConstrantValues['EMPLOYEES_PER_SHIFT'] = 0;
    genericConstrantValues['MIN_SHIFTS'] = 0;
    genericConstrantValues['MAX_SHIFTS'] = 0;

    // specific to employee, that is.
    var specificConstraintaValues = {};
    specificConstraintaValues['EMPLOYEES_PER_SHIFT'] = [];
    specificConstraintaValues['MIN_SHIFTS'] = [];
    specificConstraintaValues['MAX_SHIFTS'] = [];

    var PROMISES = [
        axios.get(Variables.RULE_DEFINITIONS_URL).catch(err => axiosErrorMsg(err, "Rule Definitions")),
        axios.get(Variables.EMPLOYEES_URL).catch(err => axiosErrorMsg(err, "Employee Data")),
        axios.get(Variables.TIME_OFF_REQUESTS_URL).catch(err => axiosErrorMsg(err, "Time Off Requests")),
        axios.get(Variables.SHIFT_RULES_URL).catch(err => axiosErrorMsg(err, "Shift Rules")),
        axios.get(Variables.WEEKS_URL).catch(err => axiosErrorMsg(err, "Weekly data"))
    ];

    // push in a weekly schedule template.
    for (var index = Variables.WEEK_START; index <= Variables.WEEK_END; index++) 
        weeklySchedule[(index + "")] = { "schedules": {} };

    Promise.all(PROMISES).then(([ruleDef, employees, timeoff, shiftRules, weeks]) => {

         // A dictionary with name keys just so adding values in the next step gets less messy.
        ruleDef.data.forEach((index) => rules[(index.id + "")] =  index.value);
        

        shiftRules.data.forEach((index) => {
            if (index.hasOwnProperty('employee_id')) {
                specificConstraintaValues[rules[(index.rule_id + "")]].push({
                    'employee_id' : index.employee_id,
                    'value' : index.value
                });
            } else {
                genericConstrantValues[rules[(index.rule_id + "")]] = index.value
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
        buildSchedule(genericConstrantValues, specificConstraintaValues, weeklySchedule, employeeIDList);

        app.setState({
        	'data': weeklySchedule,    
        	'employeeData': employees.data 
        });

        console.log( weeklySchedule);
        console.log( employees.data );
    })
    .catch((err) => app.setState({ 'data': {}, 'employeeData': []}));

}

export default ScheduleBuilder;

