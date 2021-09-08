
import React, { useEffect, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from 'redux/user/user.selectors'
import { launchSearch, searchFailure } from 'redux/search/search.actions'

import Spinner from 'components/ui/spinner/spinner'
import SearchBar from 'components/ui/search-bar/search-bar.component'

const HomeComponent = ({ launchSearch }) => {
  const [query, setQuery] = useState('')

  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    launchSearch(query)
    setQuery('')

    setTimeout(() => {
      alert('ddo')
      // <Redirect to="/somewhere/else" />

      setLoading(false)
    }, 600)
  }

  const changeHandler = (event) => {
    setQuery(event.target.value)
  }

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    []
  )

  useEffect(
    () => () => {
      debouncedChangeHandler.cancel()
    },
    [debouncedChangeHandler]
  )

  if (isLoading) return <Spinner />

  return (
    <div>
      <article className="app-bar">
        <section>
          <form onSubmit={handleSubmit}>
            <span
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeigth: '800'
              }}
            >
              https://swapi.dev/api/
            </span>
            <SearchBar
              name="query"
              type="text"
              label="Recherche..."
              handleChange={debouncedChangeHandler}
              onClick={handleSubmit}
              required
            />
          </form>
        </section>
      </article>

      {/* <article className="content-container">
        {error && <span>Pas de donnée trouvée...</span>}
      </article> */}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query })),
  searchFailure: () => dispatch(searchFailure({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
