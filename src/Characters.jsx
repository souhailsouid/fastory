import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Character from './Character';

const Characters = ({ characters = [] }) => (
  <section className="Characters">
    {characters.name}
    {/* {characters.map(character => ( */}
    {/* <Character key={character.id} character={character} /> */}
    {/* ))} */}
  </section>
)

Characters.propTypes = {
  characters: PropTypes.arrayOf.isRequired
}

export default connect(
  ({ characters }) => ({ characters })
)(Characters)
