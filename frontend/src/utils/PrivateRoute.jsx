// import {Route, Redirect} from "react-router-dom"
// import {useContext} from "react"
// import AuthContext from "../context/AuthContext"


// const PrivateRoute = ({children, ...rest}) => {
//     let {user} = useContext(AuthContext)
//     return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>
// }

// export default PrivateRoute
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
