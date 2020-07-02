import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { mount } from 'enzyme';
import App from "./App";

  const wrapper = mount(
    <Provider store={store}>
        <App />
    </Provider>
);

it('renders app', () => {
  expect(wrapper).toBeTruthy();
});
