import React, { Component } from 'react';
import { IProps, IState } from './types';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './error-boundary.pcss';

class ErrorBoundaryComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  // parameters: error
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch( error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.container}>
            <p className={styles.description}>
              Что-то пошло не так
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundary = withStyles(styles)(ErrorBoundaryComponent);

export { ErrorBoundary };
