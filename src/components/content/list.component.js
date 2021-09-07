import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import './content.styles.css';

const List = ({ list: { name, title }, params }) => {
  const { query } = useParams();

  const url = params ? params : `${query}/${name || title}`;

  return (
    <Link className="list-name" to={`/${url}`}>
      <article className="list">{name || title}</article>
    </Link>
  );
};
List.propTypes = {
  name: PropTypes.string,
};

export default List;
