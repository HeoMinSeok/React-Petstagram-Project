import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import { AllUserProvider } from "./contexts/AllUserContext";
import { NavProvider } from "./contexts/NavContext";
import { ModalProvider } from "./contexts/ModalContext";

/* 컴포넌트 */
import LoginForm from "./components/page/LoginForm";
import SignUp from "./components/page/SignUp";
import Feed from "./components/page/Feed";
import FriendFeed from "./components/page/FriendFeed";
import ExploreFeed from "./components/page/ExploreFeed";
import MyFeed from "./components/page/MyFeed";
import Message from "./components/page/Message";
import HomeNav from "./components/common/HomeNav";
import FriendNav from "./components/common/FriendNav";
import SearchNav from "./components/common/SearchNav";
import NotificationNav from "./components/common/NotificationNav";

/* Hook */
import useUser from "./components/hook/useUser";
import usePost from "./components/hook/usePost";
import useNav from "./components/hook/useNav";
import useAllUserProfile from "./components/hook/useAllUserProfile";
import useFollowStatus from "./components/hook/useFollowStatus";
import useFollowList from "./components/hook/useFollowList";

const AppContent = () => {
    const { isLoggedIn, setIsLoggedIn, profileInfo } = useUser();
    const { allUserProfiles } = useAllUserProfile();
    const { postList, postUserList, fetchPosts, fetchUserPosts } = usePost(
        isLoggedIn,
        profileInfo
    );

    const { handleFollow, handleUnfollow, isFollowing } = useFollowStatus();
    const { followers, followings, fetchFollowings } = useFollowList();
    const { navState, handleNavClick } = useNav();

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
                                            <Feed
                                                isFollowing={isFollowing}
                                                handleFollow={handleFollow}
                                                handleUnfollow={handleUnfollow}
                                                myFollowers={followers}
                                                myFollowings={followings}
                                            />
                                            <FriendNav
                                                isFollowing={isFollowing}
                                                handleFollow={handleFollow}
                                                handleUnfollow={handleUnfollow}
                                            />
                                        </>
                                    )}
                                    <div className="main-container">
                                        <HomeNav />
                                        {navState.search && <SearchNav />}
                                        {navState.notification && (
                                            <NotificationNav />
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
                                    <ExploreFeed postList={postList} />
                                    <div className="main-container">
                                        <HomeNav />
                                        {navState.search && <SearchNav />}
                                        {navState.notification && (
                                            <NotificationNav />
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
                    path="/messages"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <Message />
                                    <div className="main-container">
                                        <HomeNav />
                                        {navState.search && <SearchNav />}
                                        {navState.notification && (
                                            <NotificationNav
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
                                    <MyFeed postUserList={postUserList} />
                                    <div className="main-container">
                                        <HomeNav />
                                        {navState.search && <SearchNav />}
                                        {navState.notification && (
                                            <NotificationNav
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
                    path="/friendfeed/:userId"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <FriendFeed
                                        isFollowing={isFollowing}
                                        handleFollow={handleFollow}
                                        handleUnfollow={handleUnfollow}
                                        myFollowings={followings}
                                        myFetchFollowList={fetchFollowings}
                                    />
                                    <div className="main-container">
                                        <HomeNav />
                                        {navState.search && <SearchNav />}
                                        {navState.notification && (
                                            <NotificationNav />
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

const App = () => (
    <UserProvider>
        <AllUserProvider>
            <NavProvider>
                <ModalProvider>
                    <AppContent />
                </ModalProvider>
            </NavProvider>
        </AllUserProvider>
    </UserProvider>
);

export default App;
