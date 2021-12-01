import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Chartholder from './Chartholder';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux'
import store from "../../redux/reduxconfig"
Enzyme.configure({ adapter: new Adapter() });

describe('<Chartholder />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Provider store={store}><Chartholder /></Provider>);
    });

    test('It should mount', () => {
        expect(component.length).toBe(1);
    });
});
