import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./FriendFeed.css";

import useUser from "../hook/useUser";
import useAllUser from "../hook/useAllUser";
import useFollow from "../hook/useFollow";
import usePost from "../hook/usePost";
import useFollowCounts from "../hook/useFollowCounts";
import useFollowList from "../hook/useFollowList";
import useModal from "../hook/useModal";

import FriendFollowModal from "../common/FriendFollowListModal";

const FriendFeed = ({ myFollowings, myFetchFollowList }) => {
    const { profileInfo } = useUser();
    const { userId } = useParams();
    const { allUserProfiles } = useAllUser();
    const { isFollowing, handleFollow, handleUnfollow } = useFollow();
    const { openModal, closeModal, isModalOpen } = useModal();
    const { postUserList = [] } = usePost();

    const [friendProfile, setFriendProfile] = useState(null);

    const getImageUrl = (imageUrl) => {
        return `http://localhost:8088/uploads/${imageUrl}`;
    };

    useEffect(() => {
        const user = allUserProfiles.find(
            (profile) => profile.email === userId
        );
        setFriendProfile(user);
    }, [userId, allUserProfiles]);

    const { fetchFollowCounts, followersCount, followingsCount } =
        useFollowCounts(friendProfile ? friendProfile.id : null);

    const { fetchFollowers, fetchFollowings, followers, followings } =
        useFollowList(friendProfile ? friendProfile.id : null);

    const isCurrentlyFollowing = isFollowing(friendProfile?.id);

    useEffect(() => {
        fetchFollowCounts();
    }, [fetchFollowCounts, isCurrentlyFollowing]);

    if (!friendProfile) {
        return <div>Loading...</div>;
    }

    const handleFollowClick = () => {
        if (isFollowing(friendProfile.id)) {
            handleUnfollow(friendProfile.id);
        } else {
            handleFollow(friendProfile.id);
        }
        fetchFollowCounts();
    };

    return (
        <div className="friendfeed-frame">
            <div className="friendfeed-user-info">
                <div className="friendfeed-user-avatar">
                    <img
                        src={friendProfile.profileImageUrl || ""}
                        alt="User Avatar"
                    />
                </div>
                <div className="friendfeed-user-main">
                    <div className="friendfeed-user-header">
                        <h2 className="friendfeed-user-email">
                            {friendProfile.email}
                        </h2>
                        <div className="friendfeed-user-actions">
                            {profileInfo.email !== friendProfile.email && (
                                <button
                                    className={`friendfeed-follow-btn ${
                                        isFollowing(friendProfile.id)
                                            ? "following"
                                            : ""
                                    }`}
                                    onClick={handleFollowClick}
                                >
                                    {isFollowing(friendProfile.id)
                                        ? "팔로잉"
                                        : "팔로우"}
                                </button>
                            )}
                            <button className="friendfeed-dm-btn">
                                메시지 보내기
                            </button>
                            <button className="friendfeed-settings-btn">
                                <span>⚙️</span>
                            </button>
                        </div>
                    </div>
                    <div className="friendfeed-user-stats">
                        <div className="friendfeed-user-stat">
                            <span className="friendfeed-stat-label">
                                게시물
                            </span>
                            <span className="friendfeed-stat-number">
                                {postUserList.length}
                            </span>
                        </div>
                        <div
                            className="friendfeed-user-stat"
                            onClick={() => openModal("followerlist")}
                        >
                            <span className="friendfeed-stat-label">
                                팔로워
                            </span>
                            <span className="friendfeed-stat-number">
                                {followersCount}
                            </span>
                        </div>
                        <div
                            className="friendfeed-user-stat"
                            onClick={() => openModal("followinglist")}
                        >
                            <span className="friendfeed-stat-label">
                                팔로우
                            </span>
                            <span className="friendfeed-stat-number">
                                {followingsCount}
                            </span>
                        </div>
                    </div>
                    <div className="friendfeed-user-bio">
                        <span className="friendfeed-user-profile">
                            {friendProfile.name}
                        </span>
                        {friendProfile.bio}
                    </div>
                </div>
            </div>
            <div className="friendfeed-container">
                <div className="friendfeed-grid-container">
                    {postUserList.map((post, index) => (
                        <div key={index} className="friendfeed-grid-item">
                            {post.imageList.map((image, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={getImageUrl(image.imageUrl)}
                                    alt={`grid-${index}-${imgIndex}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* 모달 다시 만들기 */}
            {isModalOpen("followerlist") && (
                <FriendFollowModal
                    myFollowings={myFollowings}
                    profileInfo={profileInfo}
                    fetchFollowList={fetchFollowers}
                    onClose={closeModal("followerlist")}
                    title="팔로워"
                    followList={followers}
                    myFetchFollowList={myFetchFollowList}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                />
            )}

            {isModalOpen("followinglist") && (
                <FriendFollowModal
                    myFollowings={myFollowings}
                    profileInfo={profileInfo}
                    fetchFollowList={fetchFollowings}
                    onClose={closeModal("followinglist")}
                    title="팔로잉"
                    followList={followings}
                    myFetchFollowList={myFetchFollowList}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                />
            )}
        </div>
    );
};

export default FriendFeed;
