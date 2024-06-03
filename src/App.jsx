import React, { Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

/* 컨텍스트 */
import { UserProvider } from "./contexts/UserContext";
import { AllUserProvider } from "./contexts/AllUserContext";
import { PostProvider } from "./contexts/PostContext";
import { NavProvider } from "./contexts/NavContext";
import { ModalProvider } from "./contexts/ModalContext";
import { FollowProvider } from "./contexts/FollowContext";
import { CommentProvider } from "./contexts/CommentContext";
import { ThemeProvider } from "./contexts/ThemeContext";

/* 컴포넌트 */
const LoginForm = lazy(() => import("./components/page/LoginForm"));
const SignUp = lazy(() => import("./components/page/SignUp"));
const Feed = lazy(() => import("./components/page/Feed"));
const FriendFeed = lazy(() => import("./components/page/FriendFeed"));
const ExploreFeed = lazy(() => import("./components/page/ExploreFeed"));
const MyFeed = lazy(() => import("./components/page/MyFeed"));
const Message = lazy(() => import("./components/page/Message"));
const HomeNav = lazy(() => import("./components/common/HomeNav"));
const FriendNav = lazy(() => import("./components/common/FriendNav"));
const SearchNav = lazy(() => import("./components/common/SearchNav"));
const NotificationNav = lazy(() =>
    import("./components/common/NotificationNav")
);

/* Hook */
import useUser from "./components/hook/useUser";
import useNav from "./components/hook/useNav";
import useTheme from "./components/hook/useTheme";
import Loading from "./components/ui/Loading";

const AppContent = () => {
    const { isLoggedIn, setIsLoggedIn } = useUser();
    const { navState } = useNav();
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    return (
        <Router>
            <Suspense
                fallback={
                    <div>
                        <Loading />
                    </div>
                }
            >
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
                                                <Feed />
                                                <FriendNav />
                                            </>
                                        )}
                                        <div className="main-container">
                                            <HomeNav
                                                toggleTheme={toggleTheme}
                                            />
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
                                        <ExploreFeed />
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
                        path="/profile"
                        element={
                            isLoggedIn ? (
                                <div className="app">
                                    <div className="div">
                                        <MyFeed />
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
                        path="/friendfeed/:userId"
                        element={
                            isLoggedIn ? (
                                <div className="app">
                                    <div className="div">
                                        <FriendFeed />
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
            </Suspense>
        </Router>
    );
};

const App = () => (
    <UserProvider>
        <AllUserProvider>
            <NavProvider>
                <PostProvider>
                    <CommentProvider>
                        <FollowProvider>
                            <ModalProvider>
                                <ThemeProvider>
                                    <AppContent />
                                </ThemeProvider>
                            </ModalProvider>
                        </FollowProvider>
                    </CommentProvider>
                </PostProvider>
            </NavProvider>
        </AllUserProvider>
    </UserProvider>
);

export default App;
