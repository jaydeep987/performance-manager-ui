import { Button, TextField } from '@material-ui/core';
import { FormikProps, FormikValues } from 'formik';
import * as React from 'react';
import { WithTranslation } from 'react-i18next';
import { ErrorMessage } from '~components/error-message/error-message';
import { StyledComponentProps } from '~types/styled';

import { Classes } from './styles';

const LoginForm: React.FunctionComponent<LoginFormProps> = (props: LoginFormProps): JSX.Element => {
  const {
    classes,
    t,
    handleSubmit,
    handleChange,
    error,
  } = props;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <TextField
        className={classes.textbox}
        id="username"
        name="username"
        label={t('login.username')}
        placeholder={t('login.username')}
        required={true}
        onChange={handleChange('username')}
      />

      <TextField
        className={classes.textbox}
        type="password"
        name="password"
        label={t('login.password')}
        placeholder={t('login.password')}
        required={true}
        onChange={handleChange('password')}
      />

      <Button
        className={classes.loginButton}
        color="secondary"
        variant="contained"
        type="submit"
      >
        {t('login.loginButton')}
      </Button>
    </form>
  );
};

type LoginFormProps = StyledComponentProps<Classes> & WithTranslation & FormikProps<FormikValues>;

export {
  LoginForm,
};
