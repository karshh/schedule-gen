
var Utils = {
	buildSchedule: function(constraintValues, weeklySchedule, employeeIDList) {
		var EMPLOYEES_PER_SHIFT = constraintValues['EMPLOYEES_PER_SHIFT'];
	    Object.keys(weeklySchedule).forEach((key) => {

	    	var sched = weeklySchedule[key].schedules;
	        for (var i = 1; i <= 7; i++) {
	            var emp_scheduled = [];
	            for (var j = EMPLOYEES_PER_SHIFT; j > 0; j--) {
	                var empID;
	                do {
	                    empID = employeeIDList[parseInt(Math.random() * employeeIDList.length, 10)] + "";
	                } while (emp_scheduled.includes(empID) ||
	                			sched[empID].timeoffrequests.includes(i));
	                
	                emp_scheduled.push(empID);
	                sched[empID].schedule.push(i);
	            }
	        }
	    });

	}
}

export default Utils;
