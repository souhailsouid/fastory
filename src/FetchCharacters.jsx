import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCharacters } from './actions'

const FetchCharacters = () => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const newValue = event.target.value

    setValue(newValue)
  }

  const handleSubmit = () => {
    fetchCharacters(value)
  }

  return (
    <div>
      <input
        onChange={handleChange}
        placeholder="Search Here"
        type="search"
        value={value}
      />
      <button onClick={handleSubmit} type="button">Search</button>
    </div>
  )
}

FetchCharacters.propTypes = {
  fetchCharacter: PropTypes.arrayOf.isRequired
}

export default connect(
  null,
  { fetchCharacters }
)(FetchCharacters)
