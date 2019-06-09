import { CardContent, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import * as React from 'react';

import { useStyles } from './styles';

/**
 * Generic content block to show some content with features like
 * edit, delete content.
 */
const ContentBlock: React.FunctionComponent<ContentBlockProps> = (props: ContentBlockProps): JSX.Element => {
  const classes = useStyles();
  const {
    id,
    type = 'base',
    content,
    editable,
    deletable,
    onEditContent,
    onDeleteContent,
    overrideStyles,
  } = props;

  const onEditContentHandler = () => {
    if (onEditContent) {
      onEditContent({ content, id });
    }
  };

  const onDeleteContentHandler = () => {
    if (onDeleteContent) {
      onDeleteContent({ content, id });
    }
  };

  const editButton = editable && (
    <IconButton size="small" color="primary" onClick={onEditContentHandler}>
      <EditIcon />
    </IconButton>
  );

  const deleteButton = deletable && (
    <IconButton size="small" color="primary" onClick={onDeleteContentHandler}>
      <DeleteIcon />
    </IconButton>
  );

  const toolbar = (editable || deletable) && (
    <div className={classes.toolbar}>
      {editButton}
      {deleteButton}
    </div>
  );

  return (
    <CardContent className={classNames(classes.content, classes[type])} style={overrideStyles}>
      {toolbar}
      <Typography variant="body2" align="justify" className={classes.contentText}>
        {content}
      </Typography>
    </CardContent>
  );
};

export interface ContentBlockData {
  /** Unique ID for content, usefule when edit/delete */
  id: string;
  /** Content to show */
  content: string;
  /** Whether content editable or not */
  editable?: boolean;
  /** Whether content deletable or not */
  deletable?: boolean;
  /**
   * Type of content.
   * base content shown like main content and
   * sub content shown like its child, like comment of something, little right shifted.
   * Default is base.
   */
  type?: 'base' | 'sub';
  /** Override styles */
  overrideStyles?: React.CSSProperties;
}

interface ContentBlockProps extends ContentBlockData {
  /** If content is editable, provide click handler for that */
  onEditContent?(data: ContentBlockData): void;
  /** If content is deletable, provide click handler for that */
  onDeleteContent?(data: ContentBlockData): void;
}

export {
  ContentBlock,
};
