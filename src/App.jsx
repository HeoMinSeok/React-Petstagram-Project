import React from "react";
import "./App.css";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import LoginForm from "./components/page/LoginForm";
import SignUp from "./components/page/SignUp";
import UserService from "./components/service/UserService";
import HomeNav from "./components/common/HomeNav";
import Feed from "./components/page/Feed";
import FriendNav from "./components/common/FriendNav";
import MockData from "./mockdata";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated);

    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/" />
                        ) : (
                            <LoginForm setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/" />
                        ) : (
                            <SignUp setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                />
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    {MockData.map((data, index) => (
                                        <Feed
                                            key={index}
                                            username={data.username}
                                            postdate={data.postdate}
                                        />
                                    ))}
                                    <HomeNav />
                                    <FriendNav setIsLoggedIn={setIsLoggedIn} />
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
