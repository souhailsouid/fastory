
import React from 'react'

import { Route } from 'react-router-dom'
import SignInPage from 'pages/sign-in/sign-in.page'

function PrivateRoute ({ component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      component={() => (isAuthenticated ? component : <SignInPage />)}
    />
  )
}

export default PrivateRoute
