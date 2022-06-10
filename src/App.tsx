import React from "react";
import "./App.css";
import Drawer from "./Components/Drawer/Drawer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginPage/Login";
import Homepage from "./Components/Homepage/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
