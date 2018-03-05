import React from 'react';
import ReactDOM from 'react-dom';
import EmployeesView from './EmployeesView';
// import ShallowRenderer from 'react-test-renderer/shallow';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmployeesView />, div);
  ReactDOM.unmountComponentAtNode(div);
});


// it('renders data correctly', () => {
// 	const renderer = new ShallowRenderer();

// 	const expectedNode = `<div>
// 	    <select id="employeeSelector">
// 	    	<option value="">- Select Employee -</option>
// 	    	<option name="Matt" value="1">Matt</option>
// 	    	<option name="Nick" value="2">Nick</option>
// 		</select>
// 	</div>
// 	`;

//   	const testJSON = [
//   		{'id': 1, 'name': 'Matt'},
//   		{'id': 10, 'name': 'Nick'}
//   	];

//   	renderer.render(<EmployeesView employeeData={testJSON} />);
//   	const result = renderer.getRenderOutput();	

//   	expect(result.type).toBe('div');
// });