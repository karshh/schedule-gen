import React, { Component } from 'react';
import ScheduleView from './ScheduleView';

class EmployeesView extends Component {

	constructor(props) {
		super(props);
		this.state = {Employees: [], 
			'value':'', 
			'valueName':'',
			'valueSchedule':{},
			'data': []
		};
    	this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {

		var employeeSchedule = [];
		var valueName = '';

		if (e.target.value !== '') {
			valueName = e.target.options[e.target.selectedIndex].text;
			var info = this.props.scheduleInfo;
			Object.keys(info).forEach((key) => {
				var dat = {};
				dat.start_date = (info[key].start_date);
				var schedInfo = info[key].schedules[e.target.value];
				for (var i = 1; i <= 7; i++) {
					var daysched = '';
					if (schedInfo.schedule.indexOf(i) >= 0) daysched = 'WORK';
					if (schedInfo.timeoffrequests.indexOf(i) >= 0) daysched = 'TIME-OFF REQUEST';
					dat[('day'+i)] = daysched;

				}
				employeeSchedule.push(dat);
			});
		}

		this.setState({
			'value': e.target.value,
			'valueName': valueName,
			'valueSchedule': employeeSchedule
		});
	}


	componentDidMount() {
		if (this.props && this.props.hasOwnProperty('employeeData'))
			this.setState({'data' : this.props.employeeData});
	}


	render() {
		return (
			<div>
				<select id='employeeSelector' value={this.state.value} onChange={this.handleChange}>
					<option value=''>- Select Employee -</option>
					{this.state.data.map((employee) => (
						<option name={employee.name} key={employee.id} value={employee.id}>{employee.name}</option>
					))}
				</select>
				{ this.state && 
					this.state.valueName !== '' && 
					<div>
						<p> Employee : {this.state.valueName} </p> 
						<ScheduleView employeeSchedule={this.state.valueSchedule} />
					</div>}
			</div>

			);
	}
}


export default EmployeesView;