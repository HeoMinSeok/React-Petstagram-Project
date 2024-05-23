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
import FriendFeed from "./components/page/FriendFeed";
import Message from "./components/page/Message";
import FriendNav from "./components/common/FriendNav";
import useUserProfile from "./components/hook/useUserProfile";
import useAllUserProfile from "./components/hook/useAllUserProfile";
import PostService from "./components/service/PostService";
import MyFeed from "./components/page/MyFeed";
import NotificationNav from "./components/common/NotificationNav";
import useFollowStatus from "./components/hook/useFollowStatus";
import useFollowCounts from "./components/hook/useFollowCounts";

const App = () => {
    const { isLoggedIn, setIsLoggedIn, profileInfo, fetchProfileInfo } =
        useUserProfile();
    const { allUserProfiles, loading, error, fetchAllUsers } =
        useAllUserProfile();

    // postSuccess -> 글 등록시 렌더링 시키기 위해
    const [postSuccess, setPostSuccess] = useState(false);
    const [postList, setPostList] = useState([]);
    const [postUserList, setPostUserList] = useState([]);

    const { handleFollow, handleUnfollow, isFollowing } = useFollowStatus(
        allUserProfiles,
        profileInfo
    );

    // 모든 게시물 목록을 가져오는 useEffect
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
            setPostSuccess(false);
        }
    }, [isLoggedIn, postSuccess]);

    // 현재 로그인한 사용자가 작성한 게시물을 가져오는 useEffect
    useEffect(() => {
        const fetchUserPosts = async () => {
            if (isLoggedIn && profileInfo.id) {
                try {
                    const postUserList = await PostService.getPostsByUserId(
                        profileInfo.id
                    );
                    setPostUserList(postUserList);
                } catch (error) {
                    console.error(
                        "사용자가 작성한 게시물을 가져오는 중 오류 발생:",
                        error
                    );
                }
            }
        };

        if (isLoggedIn && profileInfo.id) {
            fetchUserPosts();
        }
    }, [isLoggedIn, profileInfo.id, postSuccess]);

    const [navState, setNavState] = useState({
        home: true,
        search: false,
        explore: false,
        messages: false,
        notification: false,
        profile: false,
    });

    const handleNavClick = (menu) => {
        setNavState((prevState) => ({
            home: false,
            search: menu === "search" ? !prevState.search : false,
            explore: false,
            messages: false,
            notification:
                menu === "notification" ? !prevState.notification : false,
            profile: false,
            [menu]:
                (menu !== "search" && menu !== "notification") ||
                (!prevState.search && !prevState.notification),
        }));
    };

    // useEffect(() => {
    //     if (!loading && !error && isLoggedIn) {
    //         console.log("All user profiles loaded successfully.");
    //     }
    // }, [allUserProfiles, loading, error, isLoggedIn]);

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

                {/* 홈 라우트 */}
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
                                                    postId={post.id}
                                                    postLikesCount={
                                                        post.postLikesCount
                                                    }
                                                    images={post.imageList}
                                                    allUserProfiles={
                                                        allUserProfiles
                                                    }
                                                    isFollowing={isFollowing}
                                                    handleFollow={handleFollow}
                                                    handleUnfollow={
                                                        handleUnfollow
                                                    }
                                                />
                                            ))}
                                            <FriendNav
                                                setIsLoggedIn={setIsLoggedIn}
                                                profileInfo={profileInfo}
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                                fetchAllUsers={fetchAllUsers}
                                                isFollowing={isFollowing}
                                                handleFollow={handleFollow}
                                                handleUnfollow={handleUnfollow}
                                            />
                                        </>
                                    )}
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                            setPostSuccess={setPostSuccess}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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

                {/* 탐색 탭 라우트 */}
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
                                            setPostSuccess={setPostSuccess}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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

                {/* 메시지 라우트 */}
                <Route
                    path="/messages"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <Message />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                            setPostSuccess={setPostSuccess}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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

                {/* 프로필 라우트 */}
                <Route
                    path="/profile"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <MyFeed
                                        images={postUserList.flatMap(
                                            (post) => post.imageList
                                        )}
                                        profileInfo={profileInfo}
                                        postSuccess={postSuccess}
                                        setPostSuccess={setPostSuccess}
                                        fetchProfileInfo={fetchProfileInfo}
                                        allUserProfiles={allUserProfiles}
                                    />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                            setPostSuccess={setPostSuccess}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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

                {/* 친구 피드 라우트 */}
                <Route
                    path="/friendfeed/:userId"
                    element={
                        isLoggedIn ? (
                            <div className="app">
                                <div className="div">
                                    <FriendFeed />
                                    <div className="main-container">
                                        <HomeNav
                                            profileInfo={profileInfo}
                                            handleNavClick={handleNavClick}
                                            navState={navState}
                                            setPostSuccess={setPostSuccess}
                                        />
                                        {navState.search && (
                                            <SearchNav
                                                allUserProfiles={
                                                    allUserProfiles
                                                }
                                            />
                                        )}
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
            </Routes>
        </Router>
    );
};

export default App;
