import React, { useState, useMemo, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../../redux/user/user.selectors'
import {
  launchSearch,
  searchFailure
} from '../../../redux/search/search.actions'
import './nav-bar.styles.css'
import SearchBar from '../search-bar/search-bar.component'

const categories = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles'
]

const NavBarComponent = ({ currentUser, launchSearch }) => {
  const [query, setQuery] = useState('')

  // eslint-disable-next-line no-unused-vars
  const [_isLoading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    launchSearch(query)

    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  const changeHandler = (event) => {
    setQuery(event.target.value)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  )

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

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
        <section className="search-bar-section">
          <span className="base-url-search">https://swapi.dev/api/</span>{' '}
          <form>
            <SearchBar
              name="query"
              type="text"
              label="Recherche..."
              handleChange={debouncedChangeHandler}
              onClick={handleSubmit}
              required
            />
          </form>
        </section>
      </article>
    )
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query })),
  searchFailure: () => dispatch(searchFailure({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent)
