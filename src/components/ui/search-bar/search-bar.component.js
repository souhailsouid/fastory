import React from 'react'

import PropTypes from 'prop-types'
import IconSearch from '../svg/icon-search.component'
import './search-bar.styles.css'

const SearchBar = ({ handleChange, onClick, label, ...otherProps }) => (
  <section className="search-bar-component">
    <input
      className="search-bar-input"
      onChange={handleChange}
      {...otherProps}
      placeholder="Recherche...."
    ></input>
    <button type="button" onClick={onClick} className="search-button">
      <IconSearch />
    </button>
  </section>
)

SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default SearchBar
