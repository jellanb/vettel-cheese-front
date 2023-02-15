import {AuthContext} from "./AuthContext";
import AuthReducer from './AuthReducer'
import {useReducer} from "react";
import {types} from "../types/types";
import React from 'react';

const initialState = {
    logged: false
};

const init = () => {
    const name = JSON.parse( localStorage.getItem('name') );
    return {
        logged: !!name,
        name: name,
    };
};

export default function AuthProvider({ children }){
    const [ authState, dispatch ] = useReducer( AuthReducer, initialState, init );
    const login = (name) =>{
        const action = {
            type: types.login,
            payload: name,
        };
        localStorage.setItem('name', JSON.stringify(name));
        dispatch(action);
    };

    const logout = () => {
        localStorage.removeItem('name');
        const action = { type: types.logout };
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState,
            //Methods
            login,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}