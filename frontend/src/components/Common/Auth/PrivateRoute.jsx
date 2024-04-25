/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}){
    const token=sessionStorage.getItem("token")
    const role=sessionStorage.getItem("role");

    return token  ?(role ? children: <Navigate to="/"/>) : <Navigate to='/login'/>
}