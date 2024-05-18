import React, { useState, useEffect } from "react";
import "./SearchNav.css";

const SearchNav = ({ allUserProfiles }) => {
    const userProfilesArray = Array.isArray(allUserProfiles.userEntityList)
        ? allUserProfiles.userEntityList
        : [];
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const getSearchUsers = () => {
        if (searchText === "") {
            return [];
        }
        return userProfilesArray.filter(
            (user) =>
                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                (user.name &&
                    user.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    };

    const searchResults = getSearchUsers();

    return (
        <div className="search-nav-container">
            <div className="search-nav-title">
                <h2>검색</h2>
                <input
                    type="text"
                    placeholder="검색"
                    value={searchText}
                    onChange={handleSearchChange}
                />
            </div>

            <div>
                {/* 실시간 검색 목록 */}
                <div className={`search-members ${searchText ? "" : "hidden"}`}>
                    {searchResults.map((user) => (
                        <div key={user.email} className="search-item">
                            <div className="search-icon-wrapper">
                                <img alt="" className="menu-icon" />
                            </div>
                            <div>{user.email}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={`search-recent-members ${
                    searchText ? "hidden" : ""
                }`}
            >
                <div className="recent-searches">
                    <span>최근 검색 항목</span>
                    <span>모두 지우기</span>
                </div>
                <div className="search-item">
                    <div className="search-icon-wrapper">
                        <img alt="" className="menu-icon" />
                    </div>
                    <div>User_Name</div>
                </div>
            </div>
        </div>
    );
};

export default SearchNav;
