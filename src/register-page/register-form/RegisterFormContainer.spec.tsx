import 'jest-dom/extend-expect';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, waitForElement } from 'react-testing-library';
import {
  mockGrecaptcha,
  mockResponse,
  setValidInputData,
} from '../../test-utils/test-utils.lib';
import RegisterFormContainer from './RegisterFormContainer';

mockGrecaptcha();

const validData = {
  breakfast: '1',
  camping: '1',
  club: 'Club',
  dinner: '1',
  email: 'foo@bar.ch',
  firstName: 'Foo',
  lastName: 'Bar',
  locality: 'Lausanne',
  no: '1',
  npa: '1018',
  picknick: '1',
  sleeping: '1',
  street: 'Rue de Lausanne',
  vegetarian: '1',
};

const ContainerWithRouter = () => {
  return (
    <BrowserRouter>
      <RegisterFormContainer />
    </BrowserRouter>
  );
};

describe('RegisterFormContainer', () => {
  it('should add errors to all fields when the form is empty', () => {
    const wrapper = render(<RegisterFormContainer />);

    expect(wrapper.queryByTestId('validation-error')).not.toHaveClass(
      'visible'
    );
    wrapper.queryByText('register.form.submit').click();
    expect(wrapper.queryByTestId('validation-error')).toHaveClass('visible');
  });

  it('should send the form to the backend if valid', async () => {
    mockResponse('success');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(validData, wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    // Should have been redirected.
  });

  it('should handle backend error', async () => {
    mockResponse('error');
    const wrapper = render(<ContainerWithRouter />);

    // Set data in the fields.
    setValidInputData(validData, wrapper);

    // Submit the form!
    wrapper.queryByText('register.form.submit').click();

    // First wait for the loader to be displayed
    await waitForElement(() => wrapper.queryByTestId('loader'));

    // Wait for the loader to be dismissed
    await wait(() =>
      expect(wrapper.queryByTestId('loader')).not.toBeInTheDocument()
    );

    expect(wrapper.queryByTestId('backend-error')).toHaveClass('visible');
  });
});