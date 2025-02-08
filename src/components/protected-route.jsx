import { React } from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ onlyUnAuth = false, element }) => {
  const { isAuthChecked, user } = useSelector((state) => state.user);
  const location = useLocation();

  // if (!isAuthChecked) {
  //   return <p>Загрузка...</p>;
  // }

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
export const OnlyUnAuth = ({element}) => (<ProtectedRouteElement onlyUnAuth={true} element={element} />)