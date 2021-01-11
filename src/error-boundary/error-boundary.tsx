import React, { Component } from 'react';
import { IProps, IState } from './types';

import styles from './error-boundary.pcss';

export class ErrorBoundary extends Component<IProps, IState> {
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
