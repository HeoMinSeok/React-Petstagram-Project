import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import petstagramIcon from "../../assets/petlogo.png";
import homeIcon from "../../assets/homenav/menu-home-click.png";
import messageIcon from "../../assets/homenav/menu-message.png";
import searchIcon from "../../assets/homenav/menu-search.png";
import profileIcon from "../../assets/homenav/menu-profile.png";
import questIcon from "../../assets/homenav/menu-quest.png";
import createIcon from "../../assets/homenav/menu-create.png";
import { UploadModal } from "./UploadModal";
import "./HomeNav.css";

const HomeNav = ({ profileInfo, handleNavClick, navState }) => {
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
                                src={homeIcon}
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
                                src={searchIcon}
                                alt="Search"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${navState.search ? "active" : ""}`}
                        onClick={() => handleNavClick("search")}
                    >
                        검색
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={questIcon}
                                alt="Quest"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${navState.explore ? "active" : ""}`}
                        onClick={() => handleMenuClick("explore", "/explore")}
                    >
                        탐색 탭
                    </MenuItem>
                    <MenuItem
                        icon={
                            <img
                                src={messageIcon}
                                alt="Message"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${navState.messages ? "active" : ""}`}
                        onClick={() => handleMenuClick("messages", "/messages")}
                    >
                        메시지
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
                                src={profileIcon}
                                alt="Profile"
                                className="menu-icon"
                            />
                        }
                        className={`menu-item ${navState.friends ? "active" : ""}`}
                        onClick={() => handleMenuClick("profile", "/profile")}
                    >
                        프로필
                    </MenuItem>
                </Menu>
                {isModalOpen && (
                    <UploadModal
                        onClose={() => setIsModalOpen(false)}
                        profileInfo={profileInfo}
                    />
                )}
            </Sidebar>
        </div>
    );
};

export default HomeNav;
