import React from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from 'redux/user/user.selectors'

import './nav-bar.styles.css'

const categories = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles'
]

const NavBarComponent = ({ currentUser }) => {
  const Links = categories.map((categorie) => {
    return (
      <Link className="link-style" to={`/${categorie}`} key={categorie}>
        {categorie}
      </Link>
    )
  })

  return (
    currentUser && (
      <article className="nav-bar-article">
        <section className="nav-bar-section">{Links}</section>
      </article>
    )
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps, null)(NavBarComponent)
