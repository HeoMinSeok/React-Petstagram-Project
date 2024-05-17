import "./HomeNav.css";
import HomeNavItem from "./HomeNavItem";
import homeIcon from "../../assets/homenav/menu-home-click.png";
import messageIcon from "../../assets/homenav/menu-message.png";
import searchIcon from "../../assets/homenav/menu-search.png";
import profileIcon from "../../assets/homenav/menu-profile.png";
import questIcon from "../../assets/homenav/menu-quest.png";
import createIcon from "../../assets/homenav/menu-create.png";

const HomeNav = () => {
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
                />
                <HomeNavItem
                    text="프로필"
                    imgSrc={profileIcon}
                    imgAlt="Profile"
                />
            </div>
        </div>
    );
};

export default HomeNav;
