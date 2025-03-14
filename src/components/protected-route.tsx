import React, { ReactElement, FC } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useSelector } from '../services/types/data';

interface IProtectedRouteProps {
    onlyUnAuth?: boolean;
    element: ReactElement;
}

export const ProtectedRouteElement: FC<IProtectedRouteProps> = ({ onlyUnAuth = false, element }) => {

  const { user } = useSelector(state => state.user);
  const location = useLocation();

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{from: location}} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return element;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<({element: ReactElement})> = ({element}) => (<ProtectedRouteElement onlyUnAuth={true} element={element} />)