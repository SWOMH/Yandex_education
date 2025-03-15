// user.test.js
import { userReducer } from './user';
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
  // Моковые данные для тестов
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockError = 'Something went wrong';

  // Тест на начальное состояние
  it('should return the initial state', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  // Тест на обработку REGISTER_REQUEST
  it('should handle REGISTER_REQUEST', () => {
    const action = {
      type: REGISTER_REQUEST,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: true,
      registerFailed: false,
      error: null,
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку REGISTER_SUCCESS
  it('should handle REGISTER_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      user: mockUser,
      isAuthChecked: true,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку REGISTER_FAILED
  it('should handle REGISTER_FAILED', () => {
    const action = {
      type: REGISTER_FAILED,
      error: mockError,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: true,
      error: mockError,
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку SET_USER
  it('should handle SET_USER', () => {
    const action = {
      type: SET_USER,
      user: mockUser,
    };

    const expectedState = {
      user: mockUser,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку LOGIN_REQUEST
  it('should handle LOGIN_REQUEST', () => {
    const action = {
      type: LOGIN_REQUEST,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: null,
      loginRequest: true,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку LOGIN_SUCCESS
  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      user: mockUser,
      isAuthChecked: true,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку LOGIN_FAILED
  it('should handle LOGIN_FAILED', () => {
    const action = {
      type: LOGIN_FAILED,
      error: mockError,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: mockError,
      loginRequest: false,
      loginFailed: true,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку SET_IS_AUTH_CHECKED
  it('should handle SET_IS_AUTH_CHECKED', () => {
    const action = {
      type: SET_IS_AUTH_CHECKED,
      isAuthChecked: true,
    };

    const expectedState = {
      user: null,
      isAuthChecked: true,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку EDIT_PROFILE_REQUEST
  it('should handle EDIT_PROFILE_REQUEST', () => {
    const action = {
      type: EDIT_PROFILE_REQUEST,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: null,
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: true,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку EDIT_PROFILE_SUCCESS
  it('should handle EDIT_PROFILE_SUCCESS', () => {
    const action = {
      type: EDIT_PROFILE_SUCCESS,
      user: mockUser,
    };

    const expectedState = {
      user: mockUser,
      isAuthChecked: true,
      registerRequest: false,
      registerFailed: false,
      error: '',
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: false,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  // Тест на обработку EDIT_PROFILE_FAILED
  it('should handle EDIT_PROFILE_FAILED', () => {
    const action = {
      type: EDIT_PROFILE_FAILED,
      error: mockError,
    };

    const expectedState = {
      user: null,
      isAuthChecked: false,
      registerRequest: false,
      registerFailed: false,
      error: mockError,
      loginRequest: false,
      loginFailed: false,
      editProfileRequest: false,
      editProfileFailed: true,
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
});