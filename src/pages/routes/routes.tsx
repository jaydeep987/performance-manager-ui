import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { PrivateRoute } from '~components/private-route/private-route';
import { RouteError } from '~pages/route-error/route-error';
import { userService } from '~services/user-service';

/**
 * Load module dynamically.
 * Handles exception, renders error page in that case
 */
// tslint:disable-next-line:no-any completed-docs
async function loadModule(loadingFactory: () => Promise<any>, moduleName: string): Promise<{default: any}> {
  try {
    return {
      default: (await loadingFactory())[moduleName],
    };
  } catch (err) {
    return {
      default: () => <div><RouteError errorText={err.message} /></div>,
    };
  }
}

const Dashboard = React.lazy(() => loadModule(() => import('~pages/dashboard/dashboard'), 'Dashboard'));
const Counter = React.lazy(() => loadModule(() => import('~pages/counter/counter'), 'Counter'));
const EmployeeManagement = React.lazy(
  () => loadModule(() => import('~pages/employee-management/employee-management'), 'EmployeeManagement'),
);

const routes: RoutePropsExtended[] = [
  {
    path: '/review',
    render: (props) => <Counter {...props} />,
    isPrivate: true,
    roles: ['admin'],
  },
  {
    path: '/employee',
    render: (props) => <EmployeeManagement {...props} />,
    isPrivate: true,
    roles: ['admin'],
  },
  {
    path: '/feedback',
    render: (props) => <Dashboard {...props} />,
    isPrivate: true,
    roles: ['normal'],
  },
  {
    path: '/assigned-to-you',
    render: (props) => <Counter {...props} />,
    isPrivate: true,
    roles: ['normal'],
  },
];

/**
 * First, default route to be shown immediately after login!
 */
export function getDefaultRoute(): string {
  return userService.isAdmin() ? '/employee' : '/feedback';
}

/**
 * Generates Routes from routes data
 */
function getRoutes(): JSX.Element[] {
  return routes.map((route: RoutePropsExtended) => {
    if (route.isPrivate) {
      return (
        <PrivateRoute
          roles={route.roles}
          key={route.path as string}
          exact={true}
          path={route.path}
          render={route.render}
        />
      );
    }

    return (
      <Route
        key={route.path as string}
        exact={true}
        path={route.path}
        render={route.render}
      />
    );
  });
}

/**
 * All Routes of app
 */
export const Routes: React.FunctionComponent = (): JSX.Element => (
  <React.Fragment>
    {getRoutes()}
  </React.Fragment>
);

export interface RoutePropsExtended extends RouteProps {
  /** Define routing paths */
  path: '/employee' | '/assigned-to-you' | '/review' | '/feedback';
  /** Is it private route ? */
  isPrivate?: boolean;
  /** Is it restricted to some roles ? */
  roles?: string[];
}
