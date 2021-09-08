import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import SignInPage from 'pages/sign-in/sign-in.page'
function PublicRoute ({ children, isAuthenticated, ...rest }) {
  return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            !isAuthenticated
              ? <SignInPage/>
              : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: location }
                }}
              />
                ))
        }
      />
  )
}

export default PublicRoute
