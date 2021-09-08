
import React from 'react'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { showResults } from 'redux/search/search.selectors'

import PaginationComponent from 'components/ui/pagination/pagination.component'
import Spinner from 'components/ui/spinner/spinner'
import List from 'components/content/list.component'
import 'components/content/content.styles.css'

const ContentComponent = ({ search, searchResults, query }) => {
  const data = search && search.data
  function dataToMap () {
    if (search && Object.prototype.hasOwnProperty.call(data, 'results')) return data.results
    return [data]
  }
  if (search && data === undefined) return <Spinner />

  return (
    <article className="content-container">
      <section className="content-section">{searchResults}</section>
      <section className="content-section">
        {search &&
          data !== undefined &&
          !searchResults &&
          dataToMap().map((list) => (
            <List key={list.name || list.title} list={list} />
          ))}
      </section>
      {data && (
        <section>
          {' '}
          <PaginationComponent />{' '}
        </section>
      )}
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  search: showResults
})

export default connect(mapStateToProps, null)(ContentComponent)
