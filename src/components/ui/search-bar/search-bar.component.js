import React, { useEffect, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from 'redux/user/user.selectors'
import {
  launchSearch,
  searchFailure
} from 'redux/search/search.actions'

import IconSearch from 'components/ui/svg/icon-search.component'

import './search-bar.styles.css'

const SearchBar = ({ handleChange, onClick, label, ...otherProps }) => (
  <section className="search-bar-component">
    <input
      className="search-bar-input"
      onChange={handleChange}
      {...otherProps}
      type="search"
      placeholder="Recherche...."
    ></input>
    <button type="button" onClick={onClick} className="search-button">
      <IconSearch />
    </button>
  </section>
)
const SearchBarComponent = ({ setLoading, launchSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    launchSearch(query.toLowerCase())

    setTimeout(() => {
      document.location.href = `/${query}`
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

  return (
    <section className="search-bar-section">
    <span className="base-url-search">https://swapi.dev/api/</span>{' '}
    <form onSubmit={handleSubmit} >
        <SearchBar
          name="query"
          label="Recherche..."
          handleChange={debouncedChangeHandler}
          onClick={handleSubmit}
          required
        />
      </form>
    </section>

  )
}
SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query })),
  searchFailure: () => dispatch(searchFailure({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarComponent)
