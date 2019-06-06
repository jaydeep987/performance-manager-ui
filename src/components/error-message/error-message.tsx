import { IconButton, SnackbarContent, withStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import classNames from 'classnames';
import * as React from 'react';
import { StyledComponentProps } from '~types/styled';

import { Classes, styles } from './styles';

const ErrorMessage: React.FunctionComponent<ErrorMessageProps> =
(props: ErrorMessageProps): React.ReactElement | null => {
  const { message, onClose, classes } = props;
  const [ open, setOpen ] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const renderMessage = (
    <span className={classes.message}>
      <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  );

  const renderAction = [
    (
      <IconButton
        key="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>
    ),
  ];

  if (!open) {
    return null; // tslint:disable-line:no-null-keyword
  }

  return (
    <SnackbarContent
      className={classes.error}
      message={renderMessage}
      action={renderAction}
    >
      {message}
    </SnackbarContent>
  );
};

interface ErrorMessageProps extends StyledComponentProps<Classes> {
  /** Error message */
  message: string;
  /** On close error message handler */
  onClose?(): void;
}

const StyledErrorMessage = withStyles(styles)(ErrorMessage);

export {
  StyledErrorMessage as ErrorMessage,
};
