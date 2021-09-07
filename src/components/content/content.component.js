import React from 'react';
import { connect } from 'react-redux';
import List from './list.component';
import { createStructuredSelector } from 'reselect';
import { showResults } from '../../redux/search/search.selectors';
import PaginationComponent from '../ui/pagination/pagination.component';
import './content.styles.css';
import Spinner from '../ui/spinner/spinner';

const ContentComponent = ({ search, searchResults }) => {
  const data = search && search.data;
  function dataToMap() {
    if (search && data.hasOwnProperty('results')) return data.results;
    return [data];
  }

  if (search && data === undefined) return <Spinner />;
  return (
    <article className="peoples-container">
      <section className="peoples-section">{searchResults}</section>
      <section className="peoples-section">
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
  );
};

const mapStateToProps = createStructuredSelector({
  search: showResults,
});

export default connect(mapStateToProps, null)(ContentComponent);
