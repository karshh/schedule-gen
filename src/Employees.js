import React, { Component } from 'react';
import ScheduleView from './ScheduleView';

class Employees extends Component {

	constructor(props) {
		super(props);
		this.state = {Employees: [], 
			value:'', 
			valueName:''};
    	this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			value: e.target.value,
			valueName: e.target.value === '' ? '' : e.target.options[e.target.selectedIndex].text
		});

	}

	render() {
		return (
			<div>
				<select id='employeeSelector' value={this.state.value} onChange={this.handleChange}>
					<option value=''>- Select Employee -</option>
					{this.props.employeeData.map((employee) => (
						<option name={employee.name} key={employee.id} value={employee.id}>{employee.name}</option>
					))}
				</select>
				{ this.state && this.state.valueName !== '' && <p> Employee : {this.state.valueName} </p> }

				<ScheduleView employeeSchedule={this.props.scheduleInfo} />
			</div>

			);
	}
}


export default Employees;