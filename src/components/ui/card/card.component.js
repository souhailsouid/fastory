import React from 'react'
import PropTypes from 'prop-types'

import './card.styles.css'

const Card = ({ children }) => {
  return (
    <article className="card-article">
      <section className="card-section">{children}</section>
    </article>
  )
}
Card.propTypes = {
  name: PropTypes.string
}

export default Card
