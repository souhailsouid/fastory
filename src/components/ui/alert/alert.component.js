import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconClose from '../svg/icon-close.component';
import './alert.styles.css';

const Alert = ({ isOpen, children, onClose, color, ...otherProps }) =>
  isOpen ? (
    <section className={`custom-alert-${color}`} {...otherProps}>
      {children}
      <button className="custom-button-close" onClick={onClose} type="button">
        <IconClose />
      </button>
    </section>
  ) : null;

Alert.propTypes = {
  isOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export const AlertFadelessExample = ({ color, message }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color={color} onClose={onDismiss} isOpen={visible}>
      {message}
    </Alert>
  );
};
