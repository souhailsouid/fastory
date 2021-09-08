
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { loadResponse } from 'redux/search/search.actions'
import { showResults } from 'redux/search/search.selectors'
import List from 'components/content/list.component'
import ContentDetailedComponent from 'components/content/content-detailed.component'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import Card from 'components/ui/card/card.component'

function isNumeric (value) {
  return !isNaN(value)
}
const ContentDetailed = ({ loadResponse, search }) => {
  const { query, id } = useParams()
  const { pathname } = useLocation()
  const page = id

  const data = search && search.data
  const showDataFiltered = () => {
    const dataToMap = data && data.results.filter((result) => {
      return result.name === id || result.title === id
    })

    if (dataToMap.length) {
      return dataToMap.map((content) => (
        <ContentDetailedComponent
          key={`${content.name || content.title}`}
          content={content}
        />
      ))
    } else {
      return (
      <Card textAlign="center">
        {data.results.map((list) => (
        <List key={list.name || list.title} list={list} />

        ))}
        </Card>
      )
    }
  }
  useEffect(() => {
    if (isNumeric(id)) loadResponse(query, page, pathname)
  }, [])

  return data && data.results !== undefined
    ? showDataFiltered()
    : <ContentDetailedComponent
          key={`${data.name || data.title}`}
          content={data}
      />
}

const mapStateToProps = createStructuredSelector({
  search: showResults
})

const mapDispatchToProps = (dispatch) => ({
  loadResponse: (query, page, pathname) =>
    dispatch(loadResponse({ query, page, pathname }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetailed)
