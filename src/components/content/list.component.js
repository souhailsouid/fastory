import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

import 'components/content/content.styles.css'

const List = ({ list: { name, title, url }, params }) => {
  const { query } = useParams()

  const path = params || `${query}/${name || title}`
  console.log('list___query', query, url)
  const categories = url.split('api/').pop()
  categories.split('/').shift()

  console.log('categories', categories.split('/').shift(), query, query.includes(categories.split('/').shift()))

  return (
    <Link className="list-name" to={`/${path}`}>
      <article className="list">{name || title}</article>
    </Link>
  )
}
List.propTypes = {
  name: PropTypes.string
}

export default List
