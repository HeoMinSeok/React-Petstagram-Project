import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/page/LoginForm";
import SignUp from "./components/page/SignUp";
import HomeNav from "./components/common/HomeNav";
import SearchNav from "./components/common/SearchNav";
import Feed from "./components/page/Feed";
import ExploreFeed from "./components/page/ExploreFeed";
import FriendNav from "./components/common/FriendNav";
import MockData from "./mockdata";
import useUserProfile from "./components/hook/useUserProfile";
import useAllUserProfile from "./components/hook/useAllUserProfile";

const App = () => {
    const { isLoggedIn, setIsLoggedIn, profileInfo } = useUserProfile();
    const { allUserProfiles } = useAllUserProfile();

    const [navState, setNavState] = useState({
        home: true,
        search: false,
        explore: false,
        messages: false,
        friends: false,
    });

    const handleNavClick = (menu) => {
        setNavState((prevState) => ({
            home: false,
            search: menu === "search" ? !prevState.search : false,
            explore: false,
            messages: false,
            friends: false,
            [menu]: menu !== "search" || !prevState.search,
        }));
    };

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
                                    {!navState.explore && (
                                        <>
                                            {MockData.map((data, index) => (
                                                <Feed
                                                    key={index}
                                                    username={data.username}
                                                    postdate={data.postdate}
                                                />
                                            ))}
                                            <FriendNav
                                                setIsLoggedIn={setIsLoggedIn}
                                                profileInfo={profileInfo}
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        </>
                                    )}
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                        />
                                        {navState.search && <SearchNav />}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/explore"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <ExploreFeed />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                        />
                                    </div>
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
