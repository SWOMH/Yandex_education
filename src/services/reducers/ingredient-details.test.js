import { ingredientDetailsReducer } from './ingredient-details';
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from '../actions/ingredient-details';

describe('ingredientDetailsReducer', () => {
  const mockIngredient = {
    _id: '123',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'image-url',
    image_mobile: 'image-mobile-url',
    image_large: 'image-large-url',
    __v: 0,
  };
  
  it('should return the initial state', () => {
    const initialState = {
      currentIngredient: null,
      isOpen: false,
    };

    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle OPEN_INGREDIENT_DETAILS', () => {
    const action = {
      type: OPEN_INGREDIENT_DETAILS,
      payload: mockIngredient,
    };

    const expectedState = {
      currentIngredient: mockIngredient,
      isOpen: true,
    };

    expect(ingredientDetailsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle CLOSE_INGREDIENT_DETAILS', () => {
    const initialState = {
      currentIngredient: mockIngredient,
      isOpen: true,
    };

    const action = {
      type: CLOSE_INGREDIENT_DETAILS,
    };

    const expectedState = {
      currentIngredient: null,
      isOpen: false,
    };

    expect(ingredientDetailsReducer(initialState, action)).toEqual(expectedState);
  });
});