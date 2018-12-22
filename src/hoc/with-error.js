import React, { Component } from 'react';
import { Modal } from 'antd';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export default WrappedComponent => {
  class WithError extends Component {
    onError = () =>
      Modal.error({
        title: 'Oops, it seems an error occurred!',
        content: 'We are working on solving the issue.'
      });

    render() {
      return <WrappedComponent onError={this.onError} {...this.props} />;
    }
  }

  WithError.displayName = `WithError(${getDisplayName(WrappedComponent)})`;

  return WithError;
};
