import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute} from '../../libs/shared/types';
import {useAppSelector} from '../../hooks';
import {selectAuthorizationStatus, selectUser} from '../../store';
import {Role} from '@1770169-guitar/models';

type PrivateRouteProps = PropsWithChildren<{
  appRoute?: string;
  isAdminOnly: boolean;
}>;

export const PrivateRoute = ({children, appRoute, isAdminOnly = false}: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectAuthorizationStatus);

  if (isAdminOnly) {
    const user = useAppSelector(selectUser);
    const isAdmin = user?.role === Role.admin;

    return isAuthenticated && isAdmin ? children : <Navigate to={appRoute || AppRoute.SignIn}/>;
  }

  return isAuthenticated ? children : <Navigate to={appRoute || AppRoute.SignIn}/>;
};
