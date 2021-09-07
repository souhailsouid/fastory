import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { store } from '../../redux/store';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { launchSearch, searchFailure } from '../../redux/search/search.actions';

import List from '../content/list.component';
import PaginationComponent from '../ui/pagination/pagination.component';
import Spinner from '../ui/spinner/spinner';
import SearchBar from '../ui/search-bar/search-bar.component.js';
import Card from '../ui/card/card.component';
import ContentComponent from '../content/content.component';
const HomeComponent = ({ launchSearch }) => {
  const [query, setQuery] = useState('');

  const [isLoading, setLoading] = useState(false);
  const search = store.getState().search.search;
  const data =
    store.getState().search.search && store.getState().search.search.data;
  const { error } = store.getState().search;

  function dataToMap() {
    if (search && data.hasOwnProperty('results')) return data.results;
    return [data];
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    launchSearch(query);
    setQuery('');
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 300),
    [query]
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const results =
    search &&
    query !== '' &&
    error === null &&
    dataToMap().map((list) => (
      <List key={list.name || list.title} list={list} params={query} />
    ));

  if (isLoading) return <Spinner />;

  return (
    <div>
      <article className="app-bar">
        <section>
          <form onSubmit={handleSubmit}>
            <span
              style={{
                color: 'white',
                fontSize: '18px',
                fontWeigth: '800',
              }}
            >
              https://swapi.dev/api/{' '}
            </span>{' '}
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

      <article className="peoples-container">
        {error && <span>Pas de donnée trouvée...</span>}
      </article>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query })),
  searchFailure: () => dispatch(searchFailure({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
