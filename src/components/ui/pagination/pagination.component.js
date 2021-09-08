import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { launchSearch } from 'redux/search/search.actions'
import { showResults } from 'redux/search/search.selectors.js'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './pagination.styles.css'
const PaginationComponent = ({ result }) => {
  const { query } = useParams()

  const removeBaseUrl = (url) =>
    url && url.split(`https://swapi.dev/api/${query}/?page=`).pop()

  const previousPage = result && removeBaseUrl(result.data.previous)
  const nextPage = result && removeBaseUrl(result.data.next)

  const makeStyles = () => {
    if (previousPage === null) return 'pagination-next-page'
    return 'pagination'
  }

  return (
    <footer className={makeStyles()}>
      {previousPage && (
        <Link className="pagination-link" to={`/${query}/page/${previousPage}`}>
          Précédent
        </Link>
      )}
      {nextPage && (
        <Link className="pagination-link" to={`/${query}/page/${nextPage}`}>
          Suivant
        </Link>
      )}
    </footer>
  )
}

const mapStateToProps = createStructuredSelector({
  result: showResults
})

const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginationComponent)
