import React, { Component } from 'react';

class ScheduleView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			'header': []
		}

		this.state.header.push('Start Date');
		for (var i = 1; i <= 7; i++) this.state.header.push('Day ' + i);


	}

	componentDidMount() {
	}


	render() {
		var row = this.props.employeeSchedule.map
		return (

			<div align="center">
				<table class="ScheduleTable">
					<thead>
					<tr>
						{this.state.header.map(title => <th key={title}>{title}</th>)}
					</tr>

					</thead>
					<tbody>
				      	{this.props.employeeSchedule.map(( listValue, index ) => {
				          return (
				            <tr key={index}>
				              <td>{listValue.start_date}</td>
				              <td>{listValue.day1}</td>
				              <td>{listValue.day2}</td>
				              <td>{listValue.day3}</td>
				              <td>{listValue.day4}</td>
				              <td>{listValue.day5}</td>
				              <td>{listValue.day6}</td>
				              <td>{listValue.day7}</td>
				            </tr>
				          );
				        })}
			      	</tbody>
				</table>
			</div>

			);
	}
}


export default ScheduleView;