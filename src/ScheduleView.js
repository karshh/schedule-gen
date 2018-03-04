import React, { Component } from 'react';

class ScheduleView extends Component {

	constructor(props) {
		super(props);
	}

	handleChange(e) {

	}

	componentDidMount() {

	}

	renderTableHeaders() {
		let tableHeader = [];
		tableHeader.push(<th>Start Date</th>);
		for(var i = 1; i <=7; i++) tableHeader.push(<th>Day {i}</th>); 

		return tableHeader;

	}

	// renderTableRows() {
	// 	let tableData = [];
	// 	var info = this.props.employeeSchedule;
	// 	Object.keys(info).forEach((key) => {
	// 		tableData.push(<tr>);
	// 		tableData.push(<td>{info[key].start_date}</td>);
	// 		tableData.push(</tr>);

	// 	});

	// 	console.log(tableData);
	// 	return tableData;

	// }

	render() {
		return (

			<div>
			<table>
				<tr>
					<th>Start Date</th>
					{[1,2,3,4,5,6,7].map(i => <th>Day {i}</th>)}
				</tr>

				<tr>
					
				</tr>
			</table>
				<pre>

            		{JSON.stringify(this.props.employeeSchedule, null, 10) }
				</pre>
			</div>

			);
	}
}


export default ScheduleView;