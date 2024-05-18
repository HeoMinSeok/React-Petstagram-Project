import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const openModal = () => {
        handleNavClick("none"); // 검색 상태 초기화
        setTimeout(() => {
            setIsModalOpen(true);
        }, 300);
    };

    const handleMenuClick = (menu, path) => {
        handleNavClick(menu);
        navigate(path);
    };

    return (
        <div className="home-nav-container">
            <Sidebar className="sidebar-wrapper">
                <div className="pethome">Petstagram</div>
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
                        onClick={() => handleMenuClick("friends", "/profile")}
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
