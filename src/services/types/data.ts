import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngredientsActions } from '../actions/ingredients';
import { TWsActions } from '../actions/ws-actions';
import { TOrderActions } from '../actions/order'
import { IIngredient, IOrder, IUser } from '../../utils/types';
import { RootState } from '../root-r'
import { TConstructorActions } from '../actions/constructor'
import { TUserActions } from '../actions/user'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { TIngredientDetailsActions } from '../actions/ingredient-details';


export type TApplicationActions = 
  | TIngredientsActions 
  | TWsActions
  | TConstructorActions
  | TOrderActions
  | TIngredientDetailsActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
  >
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch>(); 





