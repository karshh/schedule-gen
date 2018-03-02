import React, { Component } from 'react';
import axios from 'axios';
import Variables from './Variables';

class Employees extends Component {

	constructor(props) {
		super(props);
		this.state = {Employees: [], 
			value:'', 
			valueName:''};
    	this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
	    axios.get(Variables.BASE_URL + '/employees')
	    .then((results) => this.setState({Employees: results.data}));
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
					{this.state.Employees.map((employee) => (
						<option name={employee.name} key={employee.id} value={employee.id}>{employee.name}</option>
					))}
				</select>
				<p> Employee : {this.state.valueName} </p>
			</div>

			);
	}
}


export default Employees;