import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { loadResponse } from '../../redux/search/search.actions'
import { showResults } from '../../redux/search/search.selectors'
import ContentComponent from '../../components/content/content.component'

const ContentPage = ({ loadResponse }) => {
  const { query, page } = useParams()
  const { pathname } = useLocation()
  useEffect(() => {
    return loadResponse(query, page, pathname)
  }, [query, page, pathname])

  return <ContentComponent />
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
