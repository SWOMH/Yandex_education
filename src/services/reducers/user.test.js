import { userReducer, initialState } from './user'; // Импортируем initialState
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SET_IS_AUTH_CHECKED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
} from '../actions/user';

describe('userReducer', () => {
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockError = 'Something went wrong';

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_REQUEST', () => {
    const action = {
      type: REGISTER_REQUEST,
    };

    const expectedState = {
      ...initialState,
      registerRequest: true,
      registerFailed: false,
      error: ''
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      registerRequest: false,
      registerFailed: false,
      error: ''
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle REGISTER_FAILED', () => {
    const action = {
      type: REGISTER_FAILED,
      error: mockError,
    };

    const expectedState = {
      ...initialState,
      registerRequest: false,
      registerFailed: true,
      error: mockError,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_USER', () => {
    const action = {
      type: SET_USER,
      user: mockUser,
    };

    const expectedState = {
      ...initialState,
      user: mockUser,
      error: ''
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_REQUEST', () => {
    const action = {
      type: LOGIN_REQUEST,
    };

    const expectedState = {
      ...initialState,
      loginRequest: true,
      loginFailed: false,
      error: '',
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      loginRequest: false,
      loginFailed: false,
      error: '',
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILED', () => {
    const action = {
      type: LOGIN_FAILED,
      error: mockError,
    };

    const expectedState = {
      ...initialState,
      loginRequest: false,
      loginFailed: true,
      error: mockError,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle SET_IS_AUTH_CHECKED', () => {
    const action = {
      type: SET_IS_AUTH_CHECKED,
      isAuthChecked: true,
    };

    const expectedState = {
      ...initialState,
      isAuthChecked: true,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_REQUEST', () => {
    const action = {
      type: EDIT_PROFILE_REQUEST,
    };

    const expectedState = {
      ...initialState,
      editProfileRequest: true,
      editProfileFailed: false,
      error: '',
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_SUCCESS', () => {
    const action = {
      type: EDIT_PROFILE_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      editProfileRequest: false,
      editProfileFailed: false,
      error: '',
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle EDIT_PROFILE_FAILED', () => {
    const action = {
      type: EDIT_PROFILE_FAILED,
      error: mockError,
    };

    const expectedState = {
      ...initialState,
      editProfileRequest: false,
      editProfileFailed: true,
      error: mockError,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});