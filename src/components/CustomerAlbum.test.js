import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders edit preview button', async () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', ':ownerId/review/:albumId')

    await act(async () => {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    })

    expect(screen.getByRole('button', { name: 'Förhandsgranska' })).toBeInTheDocument();
    
})