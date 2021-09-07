import React from 'react';
import PropTypes from 'prop-types';

const Character = ({ name }) => (
  <article className="Character">
    {name}

  </article>
);

Character.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Character;
