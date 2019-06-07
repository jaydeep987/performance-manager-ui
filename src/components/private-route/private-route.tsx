import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { userService } from '~services/user-service';

/**
 * Extended Route component for routes which need to be restricted by some things like roles.
 * And even user login status is checked here, so only logged in user can see component.
 * Defined this component in src/components, because it can be reused by some components anytime!
 */
export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props: PrivateRouteProps): JSX.Element => {
  const {
    component: Component,
    render,
    roles,
    ...rest
  } = props;

  // tslint:disable-next-line:ban-ts-ignore
  // @ts-ignore need to use any type for compProps bcoz we dont know type of props, it's generic component
  const renderComponent = (compProps) => {
    const currentUser = userService.getUserInfo();

    /** If user is not exist in cookie itself, means user is not logged in */
    if (!currentUser) {
      return <Redirect to={{ pathname: '/login' }} />;
    }

    // if route is restricted by role
    if (roles && roles.indexOf(currentUser.role) === -1) {
      userService.removeUserInfo();

      return <Redirect to={{ pathname: '/login' }} />;
    }

    // user is authorised so return component
    // tslint:disable-next-line:ban-ts-ignore
    // @ts-ignore similar to above, it's generic component, typescript cannot identify as JSX component
    return Component ? <Component {...props} /> : render(compProps);
  };

  return (
    <Route
      {...rest}
      render={renderComponent}
    />
  );
};

interface PrivateRouteProps extends RouteProps {
  /** Roles for which this route is allowed to access */
  roles?: string[];
}
