import React from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// redux
import { selectCurrentUser } from 'redux/user/user.selectors'
import { checkUserSession } from 'redux/user/user.actions'
// middleware
import PrivateRoute from 'middleware/private-route'
// page
import HomePage from 'pages/home/homepage.component'
import ContentPage from 'pages/content/content.page'
import PeopleDetailed from 'pages/content/content-detailed.page'
// component
import NavBarComponent from 'components/ui/nav-bar/nav-bar.component'
import Header from 'components/ui/header/header.component'

import 'App.css'

const App = ({ currentUser }) => (
  <div>
    <Header />
    <NavBarComponent />

    <Switch>
      <PrivateRoute
        exact
        path="/"
        isAuthenticated={currentUser}
        component={<HomePage />}
      />
      <PrivateRoute
        exact
        path="/:query"
        isAuthenticated={currentUser}
        component={<ContentPage />}
      />

      <PrivateRoute
        exact
        path="/:query/:id"
        isAuthenticated={currentUser}
        component={<PeopleDetailed />}
      />
      <PrivateRoute
        exact
        path="/:query/page/:page"
        isAuthenticated={currentUser}
        component={<ContentPage />}
      />
    </Switch>
  </div>
)
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
