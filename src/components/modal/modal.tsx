import React, { FC } from 'react';
import { modalProps } from './types';
import ReactModal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

ReactModal.setAppElement('#root');

export const Modal: FC<modalProps> = (props) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <ReactModal
      {...restProps}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};
