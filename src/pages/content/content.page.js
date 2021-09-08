import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from 'redux/user/user.selectors'
import { showResults } from 'redux/search/search.selectors'

import { loadResponse } from 'redux/search/search.actions'

import ContentComponent from 'components/content/content.component'
import SearchBarComponent from 'components/ui/search-bar/search-bar.component'
import Spinner from 'components/ui/spinner/spinner'

const ContentPage = ({ loadResponse }) => {
  const { query, page } = useParams()
  const { pathname } = useLocation()

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    return loadResponse(query, page, pathname)
  }, [query, page, pathname])

  return isLoading
    ? <Spinner />
    : <article>
        <SearchBarComponent setLoading={setLoading }/>
        <ContentComponent query={query} />
      </article>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  search: showResults
})

const mapDispatchToProps = (dispatch) => ({
  loadResponse: (query, page, pathname) =>
    dispatch(loadResponse({ query, page, pathname }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage)
