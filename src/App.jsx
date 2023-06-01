import styled from "styled-components";
import React, { useState } from "react";
import UserContext from "./UserContext";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/signup";
import Today from "./pages/today";
import NavBar from "./assets/NavBar.jsx";

export default function App() {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

function AppContent() {
    const location = useLocation();
    const hideNav = ["/", "/signup"].includes(location.pathname);

    return (
        <>
            {!hideNav && <NavBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/hoje" element={<Today />} />
            </Routes>
        </>
    );
}