
import React from 'react'

import { Route, Redirect } from 'react-router-dom'

function PrivateRoute ({ component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      component={() => (isAuthenticated
        ? component
        : <Redirect
                to={{
                  pathname: '/login'
                }}
              />)}
    />
  )
}

export default PrivateRoute
