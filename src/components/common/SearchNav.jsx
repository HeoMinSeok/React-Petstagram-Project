import React, { useState, useEffect } from "react";
import "./SearchNav.css";

const SearchNav = ({ allUserProfiles }) => {
    const userProfilesArray = Array.isArray(allUserProfiles)
        ? allUserProfiles
        : [];
    const [searchText, setSearchText] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        const storedSearches =
            JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(storedSearches);
    }, []);

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

    const handleSelectSearch = (user) => {
        const updatedSearches = [
            user,
            ...recentSearches.filter((u) => u.email !== user.email),
        ].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    // 검색 기록 전체 지우기
    const handleClearSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    // 검색 기록 선택 지우기
    const handleDeleteSearch = (userEmail) => {
        const updatedSearches = recentSearches.filter(
            (user) => user.email !== userEmail
        );
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
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
                        <div
                            key={user.email}
                            className="search-item"
                            onClick={() => handleSelectSearch(user)}
                        >
                            <div className="search-info">
                                <div className="search-icon-wrapper">
                                    <img
                                        src={user.profileImageUrl}
                                        alt="profile_image"
                                        className="search-profile-image"
                                    />
                                </div>
                                <div>{user.email}</div>
                            </div>
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
                    <span
                        onClick={handleClearSearches}
                        className="search-all-clear"
                    >
                        모두 지우기
                    </span>
                </div>
                {recentSearches.length === 0 ? (
                    <div className="no-recent-searches">
                        최근 검색 내역 없음
                    </div>
                ) : (
                    recentSearches.map((user) => (
                        <div key={user.email} className="search-item">
                            <div className="search-info">
                                <div className="search-icon-wrapper">
                                    <img
                                        src={user.profileImageUrl}
                                        alt="프로필"
                                        className="search-profile-image"
                                    />
                                </div>
                                <div>{user.email}</div>
                            </div>
                            <div>
                                <button
                                    className="search-delete-btn"
                                    onClick={() =>
                                        handleDeleteSearch(user.email)
                                    }
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchNav;
