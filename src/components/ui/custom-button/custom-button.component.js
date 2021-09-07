import React from 'react';

import PropTypes from 'prop-types';
import './custom-button.styles.css';

const CustomButtom = ({ children, fastory, ...otherProps }) => (
  <button
    type="button"
    className={`${fastory ? 'fastory' : ''} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

CustomButtom.propTypes = {
  fastory: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default CustomButtom;
