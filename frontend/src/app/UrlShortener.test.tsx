import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './store';
import { UrlShortener } from './UrlShortener';

const wrapper = mount(
    <Provider store={store}>
        <UrlShortener />
    </Provider>
);

it('renders', () => {
    expect(wrapper).toBeTruthy();
});

it('renders the input box', () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
});

it('renders the submit button', () => {
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
});
