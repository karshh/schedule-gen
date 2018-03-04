import React, { Component } from 'react';

class ScheduleView extends Component {

	constructor(props) {
		super(props);
	}

	handleChange(e) {

	}

	componentDidMount() {

	}

	render() {
		return (
			<div>
				<pre>

            		{JSON.stringify(this.props.employeeSchedule, null, 10) }
				</pre>
			</div>

			);
	}
}


export default ScheduleView;