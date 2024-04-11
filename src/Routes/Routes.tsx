import React from "react";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Betting from "../Pages/BettingPage/Betting";

export const router = createBrowserRouter([

    {
       path: "/",
       element: <App />,
       children: [
        {path: "", element: <HomePage/>},
        {path: "betting", element: <Betting />}
       ] 
    }
])