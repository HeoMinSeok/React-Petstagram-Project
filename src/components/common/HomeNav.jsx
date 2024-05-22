import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { UploadModal } from "./UploadModal";
import "./HomeNav.css";

import homeIcon from "/src/assets/homenav/menu-home.png";
import homeIconFilled from "/src/assets/homenav/menu-home-filled.png";
import searchIcon from "/src/assets/homenav/menu-search.png";
import searchIconFilled from "/src/assets/homenav/menu-search-filled.png";
import exploreIcon from "/src/assets/homenav/menu-explore.png";
import exploreIconFilled from "/src/assets/homenav/menu-explore-filled.png";
import messageIcon from "/src/assets/homenav/menu-message.png";
import messageIconFilled from "../../assets/homenav/menu-message-filled.png";
import notiIcon from "/src/assets/homenav/menu-noti.png";
import notiIconFilled from "/src/assets/homenav/menu-noti-filled.png";
import createIcon from "/src/assets/homenav/menu-create.png";
import profileIcon from "/src/assets/homenav/menu-profile.png";

const HomeNav = ({ profileInfo, handleNavClick, navState, setPostSuccess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1100);
    const navigate = useNavigate();

    const openModal = () => {
        handleNavClick("none");
        setTimeout(() => {
            setIsModalOpen(true);
        }, 300);
    };

    const handleMenuClick = (menu, path) => {
        handleNavClick(menu);
        navigate(path);

        if (menu === "messages") {
            setIsCollapsed(true);
        }
    };

    // 화면 크기 감지
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1100) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="home-nav-container">
            <Sidebar className="sidebar-wrapper" collapsed={isCollapsed}>
                <Menu iconShape="square" className="menu-wrapper">
                    <MenuItem
                        icon={
                            <img
                                src={navState.home ? homeIconFilled : homeIcon}
                                alt="Home"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${navState.home ? "active" : ""}`}
                        onClick={() => handleMenuClick("home", "/")}
                    >
                        홈
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={
                                    navState.search
                                        ? searchIconFilled
                                        : searchIcon
                                }
                                alt="Search"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${
                            navState.search ? "active" : ""
                        }`}
                        onClick={() => handleNavClick("search")}
                    >
                        검색
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={
                                    navState.explore
                                        ? exploreIconFilled
                                        : exploreIcon
                                }
                                alt="Explore"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${
                            navState.explore ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("explore", "/explore")}
                    >
                        탐색
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={
                                    navState.messages
                                        ? messageIconFilled
                                        : messageIcon
                                }
                                alt="Messages"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${
                            navState.messages ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("messages", "/messages")}
                    >
                        메시지
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={
                                    navState.notification
                                        ? notiIconFilled
                                        : notiIcon
                                }
                                alt="Notifications"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${
                            navState.notification ? "active" : ""
                        }`}
                        onClick={() => handleNavClick("notification")}
                    >
                        알림
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={createIcon}
                                alt="Create"
                                className="menu-icon"
                            />
                        }
                        onClick={openModal}
                        className="menu-item"
                    >
                        만들기
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={profileInfo.profileImageUrl}
                                alt="Profile"
                                className="menu-item-profile"
                            />
                        }
                        className={`menu-item-profile ${
                            navState.profile ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("profile", "/profile")}
                    >
                        프로필
                    </MenuItem>
                </Menu>
                {isModalOpen && (
                    <UploadModal
                        onClose={() => setIsModalOpen(false)}
                        profileInfo={profileInfo}
                        setPostSuccess={setPostSuccess}
                    />
                )}
            </Sidebar>
        </div>
    );
};

export default HomeNav;
