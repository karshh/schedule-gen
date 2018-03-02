import React, { Component } from 'react';
import axios from 'axios';
import Variables from './Variables';

class Employees extends Component {

	constructor(props) {
		super(props);
		this.state = {Employees: []};
	}

	componentDidMount() {
	    axios.get(Variables.BASE_URL + '/employees')
	    .then((results) => this.setState({Employees: results.data}));
	}

	render() {
		return (
			<div>
				<select>
					<option value=''>- Select Employee -</option>
					{this.state.Employees.map((employee) => (
						<option value={employee.id}>{employee.name}</option>
					))}
				</select>
			</div>

			);
	}
}


export default Employees;