import React, { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import {
  launchSearch,
  searchFailure,
} from '../../../redux/search/search.actions';
import './nav-bar.styles.css';
import SearchBar from '../search-bar/search-bar.component';
import List from '../../content/list.component';
import { store } from '../../../redux/store';
const categories = [
  'films',
  'people',
  'planets',
  'species',
  'starships',
  'vehicles',
];

const NavBarComponent = ({ currentUser, launchSearch, searchFailure }) => {
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

  const Links = categories.map((categorie) => {
    return (
      <Link className="link-style" to={`/${categorie}`} key={categorie}>
        {categorie}
      </Link>
    );
  });
  const results =
    search &&
    query !== '' &&
    error === null &&
    dataToMap().map((list) => (
      <List key={list.name || list.title} list={list} params={query} />
    ));

  return (
    currentUser && (
      <article className="nav-bar-article">
        <section className="nav-bar-section">{Links}</section>
        <section className="search-bar-section">
          <span className="base-url-search">https://swapi.dev/api/</span>{' '}
          <form>
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
    )
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  launchSearch: (query) => dispatch(launchSearch({ query })),
  searchFailure: () => dispatch(searchFailure({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
