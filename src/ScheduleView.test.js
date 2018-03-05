import React from 'react';
import ReactDOM from 'react-dom';
import ScheduleView from './ScheduleView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScheduleView />, div);
  ReactDOM.unmountComponentAtNode(div);
});

