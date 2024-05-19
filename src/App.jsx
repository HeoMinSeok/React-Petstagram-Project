import React from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import LoginForm from "./components/page/LoginForm";
import SignUp from "./components/page/SignUp";
import HomeNav from "./components/common/HomeNav";
import SearchNav from "./components/common/SearchNav";
import Feed from "./components/page/Feed";
import ExploreFeed from "./components/page/ExploreFeed";
import FriendNav from "./components/common/FriendNav";
import useUserProfile from "./components/hook/useUserProfile";
import useAllUserProfile from "./components/hook/useAllUserProfile";
import PostService from "./components/service/PostService";
import MyFeed from "./components/page/MyFeed";

const App = () => {
    const { isLoggedIn, setIsLoggedIn, profileInfo } = useUserProfile();
    const { allUserProfiles, loading, error } = useAllUserProfile();
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await PostService.getPostList();
                setPostList(posts);
            } catch (error) {
                console.error("게시글을 가져오는 중 오류 발생:", error);
            }
        };
        if (isLoggedIn) {
            fetchPosts();
        }
    }, [isLoggedIn]);

    const [navState, setNavState] = useState({
        home: true,
        search: false,
        explore: false,
        messages: false,
        profile: false,
    });

    const handleNavClick = (menu) => {
        setNavState((prevState) => ({
            home: false,
            search: menu === "search" ? !prevState.search : false,
            explore: false,
            messages: false,
            profile: false,
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
                                            {postList.map((post, index) => (
                                                <Feed
                                                    key={index}
                                                    writer={post.email}
                                                    postdate={post.regTime}
                                                    postContent={
                                                        post.postContent
                                                    }
                                                    images={post.imageList}
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
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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
                                    <ExploreFeed
                                        images={postList.flatMap(
                                            (post) => post.imageList
                                        )}
                                    />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/profile"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <MyFeed
                                        images={postList.flatMap(
                                            (post) => post.imageList
                                        )}
                                        profileInfo={profileInfo}
                                    />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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
