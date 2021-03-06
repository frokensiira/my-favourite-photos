import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders thank you text', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', '/confirmation')

    await act(async () => {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    })

    expect(screen.getByRole('heading', { name: 'Tack! Dina valda fotografier har nu skickats till fotografen!'})).toBeInTheDocument();
    
})

