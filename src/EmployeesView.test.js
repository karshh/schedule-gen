import React from 'react';
import ReactDOM from 'react-dom';
import EmployeesView from './EmployeesView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmployeesView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
