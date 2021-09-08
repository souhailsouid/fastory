
import React from 'react'

import { Route, Redirect } from 'react-router-dom'

// import { Router } from 'react-router-dom/cjs/react-router-dom.min'

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
