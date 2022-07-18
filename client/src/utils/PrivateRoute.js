import React from "react";
import {Navigate, useLocation} from "react-router";

function RequireAuth({access,children}) {
    let location = useLocation();

    if (!access) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth
