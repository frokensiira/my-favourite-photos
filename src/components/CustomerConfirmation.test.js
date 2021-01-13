import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders signup password button', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/signup')

    await act(async () => {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    })

    expect(screen.getByLabelText('Lösenord'));
    
})

