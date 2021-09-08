
import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { loadResponse } from 'redux/search/search.actions'
import { showResults } from 'redux/search/search.selectors'
import List from 'components/content/list.component'
import ContentDetailedComponent from 'components/content/content-detailed.component'

import Card from 'components/ui/card/card.component'
import SearchBarComponent from 'components/ui/search-bar/search-bar.component'
import Spinner from 'components/ui/spinner/spinner'

function isNumeric (value) {
  return !isNaN(value)
}
const ContentDetailed = ({ loadResponse, search }) => {
  const { query, id } = useParams()
  const { pathname } = useLocation()
  const page = id

  const [isLoading, setLoading] = useState(false)

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
  const result = () => {
    return data && data.results !== undefined
      ? showDataFiltered()
      : <ContentDetailedComponent
        key={`${data.name || data.title}`}
        content={data}
      />
  }
  if (isLoading) return <Spinner />
  return (
    <article>
     <SearchBarComponent setLoading={setLoading }/>
        {result()}
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  search: showResults
})

const mapDispatchToProps = (dispatch) => ({
  loadResponse: (query, page, pathname) =>
    dispatch(loadResponse({ query, page, pathname }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetailed)
