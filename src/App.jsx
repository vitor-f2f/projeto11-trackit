import styled from "styled-components";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/signup";
import NavBar from "./assets/NavBar.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
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
            </Routes>
        </>
    );
}
