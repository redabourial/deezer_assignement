import React from 'react';
import '@testing-library/jest-dom'
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addUser } from '/src/redux/usersSlice';
import Profile from './index';

jest.mock('axios');

describe('Profile Component', () => {
    const mockStore = configureStore([]);
    let store;

    beforeEach(() => {
        store = mockStore({
            users: {
                data: {
                    1: {
                        id: 1,
                        name: 'Test User',
                        email: 'test@example.com',
                    },
                },
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders user profile information', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/1']}>
                    <Routes>
                        <Route path="/users/:userId" element={<Profile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('User Info')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Test User')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('test@example.com')).toBeInTheDocument();
        });
    });

    it('fetches user data from API if user does not exist in store', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                id: 2,
                name: 'Another User',
                email: 'another@example.com',
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/2']}>
                    <Routes>
                        <Route path="/users/:userId" element={<Profile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('/api/users/2/');
            expect(store.getActions()).toContainEqual(addUser({ id: 2, name: 'Another User', email: 'another@example.com' }));
        });
    });

    it('displays error message if user data fetch fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('User not found'));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/3']}>
                    <Routes>
                        <Route path="/users/:userId" element={<Profile />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('User not found')).toBeInTheDocument();
        });
    });

    it('displays loading state while fetching user data', async () => {
        axios.get.mockImplementation(() => new Promise(() => {}));
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/users/3']}>
                    <Routes>
                        <Route path="/users/:userId" element={<Profile />} />
                    </Routes>
                </MemoryRouter>
            </Provider >
        );

        await waitFor(() => {
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });
});
