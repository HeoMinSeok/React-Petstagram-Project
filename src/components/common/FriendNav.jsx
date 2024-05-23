import "./FriendNav.css";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFollowStatus from "../hook/useFollowStatus";
import FollowCancelModal from "./FollowCancelModal";

const FriendNav = ({
    setIsLoggedIn,
    profileInfo,
    allUserProfiles,
    fetchAllUsers,
    isFollowing,
    handleFollow,
    handleUnfollow,
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleLogout = () => {
        const confirmDelete = window.confirm("로그아웃 하시겠습니까?");
        if (confirmDelete) {
            UserService.logout();
            setIsLoggedIn(false);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchAllUsers(); // 컴포넌트가 마운트될 때 fetchAllUsers 호출
    }, [fetchAllUsers]);

    return (
        <div className="friendnav">
            <MyProfile profileInfo={profileInfo} onLogout={handleLogout} />
            <Recommendation
                allUserProfiles={allUserProfiles}
                profileInfo={profileInfo}
                isFollowing={isFollowing}
                openModal={openModal}
                handleFollow={handleFollow}
                navigate={navigate}
            />
            {selectedUser && (
                <FollowCancelModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    user={selectedUser}
                    onUnfollow={handleUnfollow}
                />
            )}
        </div>
    );
};

const MyProfile = ({ profileInfo, onLogout }) => (
    <div className="friendnav-user-info">
        <img className="ellipse-3" src={profileInfo.profileImageUrl} />
        <div className="friendnav-user-profile">
            <div className="friendnav-user-profile-wrapper">
                <div className="friendnav-user-email">{profileInfo.email}</div>
                <div className="friendnav-user-name">{profileInfo.name}</div>
            </div>
        </div>
        <div className="friendnav-logout">
            <div className="friendnav-logout-btn" onClick={onLogout}>
                로그아웃
            </div>
        </div>
    </div>
);

const Recommendation = ({
    allUserProfiles,
    profileInfo,
    isFollowing,
    openModal,
    handleFollow,
    navigate,
}) => (
    <div>
        <div className="friendnav-recommend">
            <div className="friendnav-recommend-wrapper">
                <div className="friendnav-recommend-text">
                    <div className="text-wrapper-8">회원님을 위한 추천</div>
                </div>
            </div>
            <div className="frame-19">
                <div className="text-wrapper-11">모두 보기</div>
            </div>
        </div>

        <div className="frame-20">
            {allUserProfiles
                .filter(
                    (user) =>
                        user.email !== profileInfo.email &&
                        user.isRecommend === true
                )
                .slice(0, 5)
                .map((user) => (
                    <div key={user.email} className="frame-21">
                        <div
                            onClick={() => {
                                navigate(`/friendfeed/${user.email}`);
                            }}
                        >
                            <img
                                src={user.profileImageUrl}
                                className="ellipse-3"
                                alt="프로필 이미지"
                            />
                            <div className="frame-13">
                                <div className="frame-14">
                                    <div className="text-wrapper-8">
                                        {user.email}
                                    </div>
                                    <div className="text-wrapper-9">
                                        회원님을 위한 추천
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="frame-15">
                            {isFollowing(user.id) ? (
                                <button
                                    className="text-wrapper-10-1"
                                    onClick={() => openModal(user)}
                                >
                                    팔로잉
                                </button>
                            ) : (
                                <button
                                    className="text-wrapper-10-2"
                                    onClick={() => handleFollow(user.id)}
                                >
                                    팔로우
                                </button>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    </div>
);

export default FriendNav;
