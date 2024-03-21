import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Home } from './index';
import { addUser } from "/src/redux/usersSlice";

jest.mock('axios');

const mockStore = configureStore();

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        axios.post.mockClear();
    })

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        axios.post.mockResolvedValue({
            data: { pk: 1, name: 'Test User', email: 'test@example.com' },
            status: 200,
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());

        expect(store.getActions()).toContainEqual(addUser({ pk: 1, name: 'Test User', email: 'test@example.com', "Time to create (frontend)": "0 s" }));
    });

    it('handles form submission error (status code 400)', async () => {
        axios.post.mockResolvedValue({ status: 400, data: { somekey: ['Invalid data'] } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Register'));


        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        await waitFor(() => expect(screen.getByText('Error : Invalid data')).toBeInTheDocument());
    });

    it('handles form submission error (exception)', async () => {
        axios.post.mockRejectedValue("some error");

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        await waitFor(() => expect(screen.getByText('Error : "some error"')).toBeInTheDocument());
    });

    it(`doesn't send request while loading`, async () => {
        axios.post.mockImplementation(new Promise((r) => {
            setTimeout(r({
                data: { pk: 1, name: 'Test User', email: 'test@example.com' },
                status: 200,
            }), 50)
        }));

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByText('Register'));
        fireEvent.click(screen.getByText('Register'));


        await waitFor(() => expect(axios.post).toHaveBeenCalled());
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});
