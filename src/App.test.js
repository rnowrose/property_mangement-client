import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {prop_form_test} from './test/PropertiesTest'
import PropForm from './components/properties/PropForm'

configure({adapter: new Adapter()});


describe('<App/>', () => {
  it('reders 1 App Component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  })
})

describe('Properties Values' , ()=>{

  it('insert properties Values', ()=>{
    prop_form_test();
  })
})

