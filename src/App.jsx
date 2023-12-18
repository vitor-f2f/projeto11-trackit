import React, { useState } from "react";
import UserContext from "./UserContext";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./pages/signup";
import Today from "./pages/today";
import Habits from "./pages/habits";
import History from "./pages/history";
import NavBar from "./components/NavBar.jsx";
import TopBar from "./components/TopBar.jsx";

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
    const hideNav = ["/", "/cadastro"].includes(location.pathname);

    return (
        <>
            {!hideNav && <TopBar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/hoje" element={<Today />} />
                <Route path="/habitos" element={<Habits />} />
                <Route path="/historico" element={<History />} />
            </Routes>
            {!hideNav && <NavBar />}
        </>
    );
}
