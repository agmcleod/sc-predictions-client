import React, { ReactType, FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

interface AdminRouteProps {
  component: ReactType
  accessToken: string
  path: string | string[]
}

export const ProtectedRoute: FC<AdminRouteProps> = ({
  component: Component,
  accessToken,
  ...rest
}) => (
  <Route
    {...rest}
    exact
    render={(props) => {
      if (!accessToken) {
        return <Redirect to='/' />
      }

      return <Component {...props} />
    }}
  />
)
