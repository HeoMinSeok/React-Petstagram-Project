import React, { useState, useEffect } from "react";
import "./MyFeed.css";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { UploadModal } from "../common/UploadModal";
import FollowListModal from "../common/FollowListModal";
import useFollowStatus from "../hook/useFollowStatus";
import useFollowCounts from "../hook/useFollowCounts";
import useFollowList from "../hook/useFollowList";

const MyFeed = ({
    images,
    profileInfo,
    postSuccess,
    setPostSuccess,
    fetchProfileInfo,
    allUserProfiles,
}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUploadModal, setIsUploadModal] = useState(false);
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [isFollowerModalOpen, setFollowerModalOpen] = useState(false);
    const [isFollowingModalOpen, setFollowingModalOpen] = useState(false);

    const { handleFollow, handleUnfollow } = useFollowStatus(allUserProfiles, profileInfo);
    const { followersCount, followingsCount } = useFollowCounts(profileInfo.id);
    const { followers, followings } = useFollowList();

    useEffect(() => {
        if (postSuccess || isUpdateProfile) {
            setPostSuccess(false);
            setIsUpdateProfile(false);
            fetchProfileInfo();
        }
    }, [postSuccess, isUpdateProfile, setPostSuccess, fetchProfileInfo]);

    const handleFollowerButtonClick = (userId) => {
        // 팔로워 삭제 로직
        console.log("팔로워 삭제", userId);
    };

    const handleFollowingButtonClick = (userId) => {
        // 팔로잉 취소 로직
        handleUnfollow(userId);
    };

    const getImageUrl = (image) => {
        return `http://localhost:8088/uploads/${image.imageUrl}`;
    };

    return (
        <div className="myfeed-frame">
            <div className="myfeed-user-info">
                <div className="myfeed-user-avatar">
                    <img src={profileInfo.profileImageUrl} alt="User Avatar" />
                </div>
                <div className="myfeed-user-main">
                    <div className="myfeed-user-header">
                        <h2 className="myfeed-user-name">
                            {profileInfo.email}
                        </h2>
                        <div className="myfeed-user-actions">
                            <button
                                className="myfeed-edit-btn"
                                onClick={() => setModalOpen(true)}
                            >
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
                            <span className="myfeed-stat-number">
                                {images.length}
                            </span>
                        </div>
                        <div
                            className="myfeed-user-stat"
                            onClick={() => setFollowerModalOpen(true)}
                        >
                            <span className="myfeed-stat-label">팔로워</span>
                            <span className="myfeed-stat-number">
                                {followersCount}
                            </span>
                        </div>
                        <div
                            className="myfeed-user-stat"
                            onClick={() => setFollowingModalOpen(true)}
                        >
                            <span className="myfeed-stat-label">팔로우</span>
                            <span className="myfeed-stat-number">
                                {followingsCount}
                            </span>
                        </div>
                    </div>

                    <div className="myfeed-user-bio">
                        <span className="myfeed-user-profile">
                            {profileInfo.name}
                        </span>
                        {profileInfo.bio}
                    </div>
                </div>
            </div>
            <div className="myfeed-container">
                {images.length === 0 ? (
                    <div className="myfeed-empty">
                        <img src="/path/to/your/image.png" alt="No Photos" />
                        <p>사진을 공유하면 회원님의 프로필에 표시됩니다.</p>
                        <button
                            className="myfeed-upload-btn"
                            onClick={() => setIsUploadModal(true)}
                        >
                            첫 사진 공유하기
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
            {isModalOpen && (
                <ProfileUpdateModal
                    onClose={() => setModalOpen(false)}
                    profileInfo={profileInfo}
                    fetchProfileInfo={fetchProfileInfo}
                    setIsUpdateProfile={setIsUpdateProfile}
                />
            )}
            {isUploadModal && (
                <UploadModal
                    onClose={() => setIsUploadModal(false)}
                    profileInfo={profileInfo}
                    setPostSuccess={setPostSuccess}
                />
            )}

            {isFollowerModalOpen && (
                <FollowListModal
                    title="팔로워"
                    followList={followers}
                    onClose={() => setFollowerModalOpen(false)}
                    onButtonClick={handleFollowerButtonClick}
                    buttonLabel="삭제"
                />
            )}

            {isFollowingModalOpen && (
                <FollowListModal
                    title="팔로잉"
                    followList={followings}
                    onClose={() => setFollowingModalOpen(false)}
                    onButtonClick={handleFollowingButtonClick}
                    buttonLabel="팔로잉"
                />
            )}
        </div>
    );
};

export default MyFeed;
