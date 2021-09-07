import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import HomeComponent from '../../components/home/home.component';

const HomePage = ({ currentUser }) => {
  //   const username = currentUser && currentUser.data.name;
  return <HomeComponent />;
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomePage);
