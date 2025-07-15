import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute} from '../../libs/shared/types';

type PrivateRouteProps = PropsWithChildren<{
  appRoute?: string;
}>;

export const PrivateRoute = ({children, appRoute}: PrivateRouteProps) => {
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to={appRoute || AppRoute.SignIn}/>;
};
