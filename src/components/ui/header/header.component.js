import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomButtom from '../custom-button/custom-button.component';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { signOutStart } from '../../../redux/user/user.actions';
import './header.styles.css';

const Header = ({ currentUser, signOutStart }) => {
  const username = currentUser && currentUser.data.name;
  return (
    <header className="header">
      <Link className="" to="/">
        <img
          src="https://www.fastory.io/hubfs/logo-fastory-full_dark-1.svg"
          className="logo"
          alt="logo"
        />
      </Link>

      {currentUser ? (
        <section className="profile-header">
          <span className="name-style">Bonjour {username}!</span>{' '}
          <CustomButtom fastory onClick={signOutStart}>
            Se déconnecter
          </CustomButtom>
        </section>
      ) : null}
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
