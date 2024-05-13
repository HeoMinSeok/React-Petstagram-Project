import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext";
import LoginForm from "./components/page/LoginForm";
import SignUp from "./components/page/SignUp";
import TestUserInfo from "./components/page/TestUserInfo";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginForm />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/userinfo" element={<TestUserInfo />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
