import React, { useState } from "react";
import "./HomeNav.css";
import HomeNavItem from "./HomeNavItem";
import homeIcon from "../../assets/homenav/menu-home-click.png";
import messageIcon from "../../assets/homenav/menu-message.png";
import searchIcon from "../../assets/homenav/menu-search.png";
import profileIcon from "../../assets/homenav/menu-profile.png";
import questIcon from "../../assets/homenav/menu-quest.png";
import createIcon from "../../assets/homenav/menu-create.png";
import { UploadModal } from "./UploadModal";

const HomeNav = ({ profileInfo }) => {
    // 모달의 열림/닫힘 상태를 관리하는 상태
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달을 열기 위한 함수
    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="div-wrapper">
            <h2 className="pethome">Petstagram</h2>
            <div className="frame-8">
                <HomeNavItem text="홈" imgSrc={homeIcon} imgAlt="Home" />
                <HomeNavItem text="검색" imgSrc={searchIcon} imgAlt="Search" />
                <HomeNavItem text="탐색 탭" imgSrc={questIcon} imgAlt="Quest" />
                <HomeNavItem
                    text="메시지"
                    imgSrc={messageIcon}
                    imgAlt="Message"
                />
                <HomeNavItem
                    text="만들기"
                    imgSrc={createIcon}
                    imgAlt="Create"
                    onClick={openModal}
                />
                <HomeNavItem
                    text="프로필"
                    imgSrc={profileIcon}
                    imgAlt="Profile"
                />
            </div>
            {isModalOpen && (
                <UploadModal
                    onClose={() => setIsModalOpen(false)}
                    profileInfo={profileInfo}
                />
            )}
        </div>
    );
};

export default HomeNav;
