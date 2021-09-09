/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { loadResponse } from 'redux/search/search.actions'
import { showResults } from 'redux/search/search.selectors'
import List from 'components/content/list.component'
import ContentDetailedComponent from 'components/content/content-detailed.component'
import ContentDetailedWookieeComponent from 'components/content/content-detailed-wookiee.component'
import Card from 'components/ui/card/card.component'
import SearchBarComponent from 'components/ui/search-bar/search-bar.component'
import Spinner from 'components/ui/spinner/spinner'
import CustomButtom from 'components/ui/custom-button/custom-button.component'
import { launchSearch } from 'redux/search/search.sagas'

function isNumeric (value) {
  return !isNaN(value)
}
const ContentDetailed = ({ loadResponse, search }) => {
  const { query, id } = useParams()
  const { pathname } = useLocation()
  const history = useHistory()
  const page = id
  const isWookieeLanguage = pathname.includes('format=wookiee')

  function redirect () {
    setLoading(true)

    if (isWookieeLanguage) {
      return history.push(`/${query}/${id}`)
    } else {
      return history.push(`/${query}/${id}/format=wookiee`)
    }
  }

  const [isLoading, setLoading] = useState(false)

  const data = search && search.data

  const showDataFiltered = () => {
    const dataToMap =
      data &&
      data.results.filter((result) => {
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
      ? (
          showDataFiltered()
        )
      : (
      <ContentDetailedComponent
        key={`${data.name || data.title}`}
        content={data}
      />
        )
  }

  const displayLanguageButtonWithContext = isNumeric(id) && (
    <CustomButtom
      onClick={redirect}
      style={{
        margin: '1rem auto',
        backgroundColor: 'green'
      }}
    >
      {isWookieeLanguage ? ' Traduire en Humain' : 'Traduire en Wookie'}
    </CustomButtom>
  )

  const showContentWithContext = isNumeric(id) &&
    pathname.includes('format=wookiee')
    ? (
      <ContentDetailedWookieeComponent
        key={`${data.whrascwo}`}
        content={data}
      />
      )
    : result()
  if (isLoading) return <Spinner />
  return (
    <article>
      <section>
        <SearchBarComponent setLoading={setLoading} />
        {displayLanguageButtonWithContext}
      </section>
      <section>
        {showContentWithContext }

      </section>
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  search: showResults
})

const mapDispatchToProps = (dispatch) => ({
  loadResponse: (query, page, pathname) =>
    dispatch(loadResponse({ query, page, pathname })),
  launchSearch: (query) => dispatch(launchSearch({ query }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetailed)
