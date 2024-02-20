import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductNumberInput from '../ProductNumberInput';


test('Renders ProductNumberInput component', () => {

    render(<ProductNumberInput />);

    const inputElement = screen.getByLabelText('Quantity Input');

    expect(inputElement).toBeInTheDocument();
});