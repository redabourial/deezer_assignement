import usersReducer, { addUser, } from './usersSlice';

describe('usersSlice reducers', () => {
  describe('addUser', () => {
    it('should add a user to the state', () => {
      const initialState = {
        data: {},
      };
      const user = { pk: 1, name: 'John Doe', };
      const action = { type: addUser.type, payload: user, };
      const nextState = usersReducer(initialState, action,);
      expect(nextState.data,).toEqual({
        [user.pk]: user,
      },);
    },);

    it('should overwrite user if already exists', () => {
      const initialState = {
        data: {
          1: { pk: 1, name: 'Jane Doe', },
        },
      };
      const user = { pk: 1, name: 'John Doe', };
      const action = { type: addUser.type, payload: user, };
      const nextState = usersReducer(initialState, action,);
      expect(nextState.data,).toEqual({
        [user.pk]: user,
      },);
    },);

    it('should overwrite user all existing users', () => {
      const initialState = {
        data: {
          1: { pk: 1, name: 'Jane Doe', },
          2: { pk: 2, name: 'Janice Doe', },
        },
      };
      const user = { pk: 1, name: 'John Doe', };
      const action = { type: addUser.type, payload: user, };
      const nextState = usersReducer(initialState, action,);
      expect(nextState.data,).toEqual({
        [user.pk]: user,
        2: {
          name: 'Janice Doe',
          pk: 2,
        },
      },);
    },);
  },);
},);
