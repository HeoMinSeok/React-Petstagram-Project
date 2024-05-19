import React from "react";
import "./MyFeed.css";
import mock1 from "../../assets/7bok1.jpeg";

const MyFeed = ({ images, profileInfo }) => {
    const getImageUrl = (image) => {
        return `http://localhost:8088/uploads/${image.imageUrl}`; // 이미지 URL 구성
    };

    return (
        <div className="myfeed-frame">
            <div className="myfeed-user-info">
                <div className="myfeed-user-avatar">
                    <img src={mock1} alt="User Avatar" />
                </div>
                <div className="myfeed-user-main">
                    <div className="myfeed-user-header">
                        <h2 className="myfeed-user-name">
                            {profileInfo.email}
                        </h2>
                        <div className="myfeed-user-actions">
                            <button className="myfeed-edit-btn">
                                프로필 편집
                            </button>
                            <button className="myfeed-story-btn">
                                보관된 스토리 보기
                            </button>
                            <button className="myfeed-settings-btn">
                                <span>⚙️</span>
                            </button>
                        </div>
                    </div>
                    <div className="myfeed-user-stats">
                        <div className="myfeed-user-stat">
                            <span className="myfeed-stat-label">게시물</span>
                            <span className="myfeed-stat-number">4</span>
                        </div>
                        <div className="myfeed-user-stat">
                            <span className="myfeed-stat-label">팔로워</span>
                            <span className="myfeed-stat-number">0</span>
                        </div>
                        <div className="myfeed-user-stat">
                            <span className="myfeed-stat-label">팔로우</span>
                            <span className="myfeed-stat-number">0</span>
                        </div>
                    </div>

                    <div className="myfeed-user-bio">
                        <span className="myfeed-user-profile">
                            {profileInfo.name}
                        </span>
                        나는 지호
                    </div>
                </div>
            </div>
            <div className="myfeed-container">
                <div className="myfeed-grid-container">
                    {images.map((image, index) => (
                        <div key={index} className="myfeed-grid-item">
                            <img
                                src={getImageUrl(image)}
                                alt={`grid-${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyFeed;
