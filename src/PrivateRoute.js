import { Redirect, Route } from 'react-router-dom';
import React from 'react'
import { useAuth } from './context/AuthContext';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth()
    console.log("🚀 ~ file: PrivateRoute.js ~ line 8 ~ PrivateRoute ~ currentUser", currentUser)
    return (
        <Route 
        {...rest}
        render={props => {
          return currentUser ? <Component {...props}/> : <Redirect to="/login" />
        }}
        ></Route>

    )
}
export default PrivateRoute