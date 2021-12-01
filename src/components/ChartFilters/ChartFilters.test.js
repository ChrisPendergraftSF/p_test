import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import ChartFilters from './ChartFilters';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux'
import store from "../../redux/reduxconfig"
Enzyme.configure({ adapter: new Adapter() });

describe('<ChartFilters />', () => {

    let component;

    beforeEach(() => {
        component = shallow(<Provider store={store}><ChartFilters /></Provider>);
    });

    test('It should mount', () => {
        expect(component.length).toBe(1);
    });
});
