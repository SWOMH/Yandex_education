import { FC, ReactNode } from "react";
import { DELETE_INGREDIENT } from "../services/actions/constructor";

export interface IIngredient {
    _id: string;
    name: string;
    type: 'bun' | 'main' | 'sauce';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uniqueId?: string;
}

export interface IUser {
    email: string;
    name: string;
}

export interface IOrder {
    number: number;
    name?: string;
    success: boolean;
}

export interface ILocationState {
    from?: { pathname: string };
    background?: Location;
}

export interface IIngredientDetails {
    titleClassName?: string;
}

export interface IIngredientsItem {
    setActiveTab: (tab: string) => void;
}

export interface IBurgerTab {
    activeTab: string;
    onTabClick?: (tab: string) => void;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm extends ILoginForm {
    name: string;
}

export interface IResetPasswordForm {
    password: string;
    token: string;
}

export interface IForgotPasswordForm {
    email: string;
    password?: string;
}

export interface IFormEvent {
    target: HTMLInputElement;
} 

export interface LocationState {
    from?: { pathname: string };
}

export interface IModalProps {
    children: ReactNode;
    onClose: () => void;
}

export interface IModalOverlay {
    onClose: () => void;
}

export interface IHeaderButtonProps {
    icon: FC<{ type: 'secondary' | 'primary' | 'error' | 'success' | 'disabled' }>;
    text: string;
    to?: string;
}

export interface IActiveTab {
    activeTab: string;
    onTabClick?: (value: string) => void;
}

export interface IhandleDelete {
    index: number;
    ingredientId: string;
}

export interface IDraggableConstructorElementProps {
    item: IIngredient;
    index: number;
    handleClose: (index: number, id: string) => void;
}

export interface IOrderDetails {
    order: {
        order: {    
            number: number;
        }
    };
}

export interface IDroppedIngredient {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
}

export interface IConstructorState {
    buns: IIngredient[];
    ingredients: IIngredient[];
    counts: { [key: string]: number };
}