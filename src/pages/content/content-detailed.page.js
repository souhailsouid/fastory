import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadResponse } from '../../redux/search/search.actions';
import { showResults } from '../../redux/search/search.selectors';

import ContentDetailedComponent from '../../components/content/content-detailed.component';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { store } from '../../redux/store';

function isNumeric(value) {
  return !isNaN(value);
}
const ContentDetailed = ({ loadResponse }) => {
  let { query, id } = useParams();
  const { pathname } = useLocation();

  const [renderList, setList] = useState([]);
  const [state, setState] = useState([]);
  const { data } = store.getState().search && store.getState().search.search;

  function dataToMap() {
    if (data.hasOwnProperty('results')) return setState(data.results);
    return setState([data]);
  }

  const filterTheResult = () => {
    data !== null &&
      data.results &&
      setList(
        data.results.filter((result) =>
          result.name ? result.name === id : result.title === id
        )
      );
  };

  const renderDataWithContext = async () => {
    if (isNumeric(id)) {
      return loadResponse(query, id, pathname);
    }
    if (isNaN(id)) return filterTheResult();
  };

  useEffect(() => {
    renderDataWithContext();
    dataToMap();
  }, [data, state]);

  function dataToMap() {
    if (data.hasOwnProperty('results')) return renderList;
    if (isNumeric(id)) return [data];
    if (isNaN(id)) return renderList;
    return data;
  }

  return dataToMap().map((content) => (
    <ContentDetailedComponent
      key={`${content.name || content.title}`}
      content={content}
    />
  ));
};

const mapStateToProps = createStructuredSelector({
  search: showResults,
});

const mapDispatchToProps = (dispatch) => ({
  loadResponse: (query, page, pathname) =>
    dispatch(loadResponse({ query, page, pathname })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentDetailed);