import { ingredientsReducer } from './ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

describe('ingredientsReducer', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Test Ingredient 1',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 50,
      image: 'image-url-1',
      image_mobile: 'image-mobile-url-1',
      image_large: 'image-large-url-1',
      __v: 0,
    },
    {
      _id: '2',
      name: 'Test Ingredient 2',
      type: 'main',
      proteins: 15,
      fat: 10,
      carbohydrates: 25,
      calories: 150,
      price: 75,
      image: 'image-url-2',
      image_mobile: 'image-mobile-url-2',
      image_large: 'image-large-url-2',
      __v: 0,
    },
  ];

  it('should return the initial state', () => {
    const initialState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
    };

    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action = {
      type: GET_INGREDIENTS_REQUEST,
    };

    const expectedState = {
      ingredients: [],
      ingredientsRequest: true,
      ingredientsFailed: false,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: mockIngredients,
    };

    const expectedState = {
      ingredients: mockIngredients,
      ingredientsRequest: false,
      ingredientsFailed: false,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action = {
      type: GET_INGREDIENTS_FAILED,
    };

    const expectedState = {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true,
    };

    expect(ingredientsReducer(undefined, action)).toEqual(expectedState);
  });
});