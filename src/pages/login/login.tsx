import { Paper, withStyles } from '@material-ui/core';
import { Formik, FormikActions } from 'formik';
import * as React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RouterProps } from 'react-router';
import { RouteProps } from 'react-router-dom';
import { ResponseStatus } from '~common/constants';
import { userService } from '~services/user-service';
import { StyledComponentProps } from '~types/styled';
import { getApiErrorMessage } from '~utils/error-handle';

import { LoginForm } from './login-form';
import { Classes, styles } from './styles';

/**
 * The first screen to be displayed.
 * By which user will be authenticated and further access will be granted.
 */
class Login extends React.Component<LoginProps> {
  /**
   * Check whether user information is already in cookie, if yes, redirect to home
   */
  componentDidMount(): void {
    const { history } = this.props;

    if (userService.getUserInfo()) {
      history.push('/');
    }
  }

  /** Renders Login component */
  render(): JSX.Element {
    const { classes } = this.props;
    const initialValues: FormValues = {
      username: '',
      password: '',
    };

    return (
      <Paper className={classes.container}>
        <Formik
          render={(props) => <LoginForm {...this.props} {...props} />}
          onSubmit={this.onSubmit}
          initialValues={initialValues}
        />
      </Paper>
    );
  }

  /**
   * On submit call login api to authenticate
   */
  onSubmit = (values: FormValues, action: FormikActions<FormValues>) => {
    const { t, history } = this.props;

    // Call api to authenticate
    userService
      .authenticate({
        userName: values.username,
        password: values.password,
      })
      .then(() => {
        history.push('/');
        action.setSubmitting(false);
      })
      .catch((error) => {
        const message = getApiErrorMessage({
          error,
          translate: t,
          code: ResponseStatus.AUTH_FAILED,
          codeMessage: t('errorMessage.wrongLoginCredentials'),
        });

        action.setSubmitting(false);
        action.setError(message);
      });
  }
}

const WrappedLogin = withStyles(styles)(withTranslation()(Login));

interface FormValues {
  /** username field */
  username: string;
  /** password field */
  password: string;
}

type LoginProps = WithTranslation & StyledComponentProps<Classes> & RouteProps & RouterProps;

export {
  WrappedLogin as Login,
};
