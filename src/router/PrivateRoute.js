import {useContext} from "react";
import {AuthContext} from "../auth/context/AuthContext";
import {Navigate} from "react-router-dom";
import React from 'react';


export default function PrivateRoute({ children }) {
    const { logged } = useContext( AuthContext );

    return (logged)
    ? children
    : <Navigate to={"/singin"} />
}