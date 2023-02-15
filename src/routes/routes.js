import {Fragment} from "react";
import { Route, Routes} from "react-router-dom";
import Dashboard from "../pages/MainPage";
import React from 'react';

export const AppRoutes = () => {
    return (
        <Fragment>
            <Routes>
                <Route path="/main" element={<Dashboard/>} />
            </Routes>
        </Fragment>
    )
}