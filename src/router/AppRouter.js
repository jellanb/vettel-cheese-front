import React from 'react';
import {Fragment} from 'react';
import {Routes, Route} from 'react-router-dom';
import { SignIn, SignUp } from "../auth/pages";
import {AppRoutes} from "../routes/Routes";
import PrivateRoute from "./PrivateRoute";


export const AppRouter = () => {
    return (
        <Fragment>
            <Routes>
                {/*<Route path="singin/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/singin" element={<SignIn/>} />
                            <Route path="/singup" element={<SignUp/>} />
                        </Routes>
                    </PublicRoute>
                }/>*/}
                <Route path="/singin" element={<SignIn/>} />
                <Route path="/singup" element={<SignUp/>} />
                <Route path="/*" element={
                    <PrivateRoute>
                        <AppRoutes/>
                    </PrivateRoute>
                }/>
            </Routes>
        </Fragment>
    )
}