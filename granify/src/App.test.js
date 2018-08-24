import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';

import Stats from './components/Stats'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('test component', (t)=> {
  var wrapper = shallow(<Stats ref="stats"/>);
  console.log("wrapper", wrapper)
})
