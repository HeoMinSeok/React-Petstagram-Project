import React from "react";
import searchIcon from "../../assets/homenav/menu-search.png";
import "./SearchNav.css";

const SearchNav = ({ toggleSearch }) => {
  return (
    <div className="search-nav-container">
      <h2>검색</h2>
      <input type="text" placeholder="검색" />
      <div className="recent-searches">
        <span>최근 검색 항목</span>
        <span>모두 지우기</span>
      </div>
      <div className="search-item">
        <div className="search-icon-wrapper">
          <img alt="프로필" className="menu-icon" />
        </div>
        <div>User_Name</div>
      </div>
    </div>
  );
};

export default SearchNav;
