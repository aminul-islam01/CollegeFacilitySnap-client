import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <h2>loading</h2>
    }else if(user){
        return children;
    }else {
        return <Navigate to="/login" state={{ from: location }} replace ></Navigate>;
    }
};

export default PrivateRoute;