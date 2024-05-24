import React from "react";
import "./Notification.css";

const NotificationNav = () => {
    return (
        <div className="notification-container">
            <div className="notification-title">
                <h2>알림</h2>
            </div>

            <div className="notification-recent">
                <div className="notification-date">
                    <h4>오늘</h4>
                </div>
                {/* 댓글이 달릴 때 */}
                <div className="notification-list">
                    <div className="notification-type">
                        <div className="notification-list-wrapper">
                            <img
                                src="src/assets/7bok.jpeg"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-comment">
                            Jiho님이 게시글에 댓글을 다셨습니다.
                        </div>
                        <div className="notification-post-image-wrapper">
                            <img src="src/assets/mock.png" className="notification-post-image"/>
                        </div>
                    </div>
                </div>

                {/* 좋아요 받았을 때 */}
                <div className="notification-list">
                    <div className="notification-type">
                        <div className="notification-list-wrapper">
                            <img
                                src="src/assets/basic-profile.jpeg"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-like">
                            junmo님이 게시글에 좋아요를 다셨습니다.
                        </div>
                        <div className="notification-post-image-wrapper">
                            <img src="src/assets/mock.png" className="notification-post-image"/>
                        </div>
                    </div>
                </div>

                {/* 팔로우 당했을 떄 */}
                <div className="notification-list">
                    <div className="notification-type">
                        <div className="notification-list-wrapper">
                            <img
                                src="src/assets/IMG_0710.jpg"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-follow">
                            minddo님이 팔로우하셨습니다.
                        </div>
                        <div className="notification-follow-btn">
                            <button>팔로우</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationNav;
