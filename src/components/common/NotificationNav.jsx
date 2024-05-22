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
                                src="댓글 단 사람"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-comment">Jiho님이 게시글에 댓글을 다셨습니다.</div>
                        <div className="notification-post-image">
                            <img src="게시글 사진" />
                        </div>
                    </div>
                </div>
                
                {/* 좋아요 받았을 때 */}
                <div className="notification-list">
                    <div className="notification-type">
                        <div className="notification-list-wrapper">
                            <img
                                src="댓글 단 사람"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-like">Jiho님이 게시글에 좋아요를 누르셨습니다.</div>
                        <div className="notification-post-image">
                            <img src="게시글 사진" />
                        </div>
                    </div>
                </div>

                {/* 팔로우 당했을 떄 */}
                <div className="notification-list">
                    <div className="notification-type">
                        <div className="notification-list-wrapper">
                            <img
                                src="댓글 단 사람"
                                className="notification-profile-image"
                            />
                        </div>
                        <div className="notification-follow">Jiho님이 팔로우하셨습니다.Jiho님이 팔로우하셨습니다</div>
                        <div className="notification-follow-btn">
                            <button  >팔로우</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationNav;
