import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAllUserProfile from "../hook/useAllUserProfile";
import PostService from "../service/PostService";
import "./FriendFeed.css";

const FriendFeed = () => {
    const { userId } = useParams();
    const { allUserProfiles } = useAllUserProfile();
    const [userProfile, setUserProfile] = useState(null);
    const [postUserList, setPostUserList] = useState([]);

    const getImageUrl = (imageUrl) => {
        return `http://localhost:8088/uploads/${imageUrl}`;
    };

    useEffect(() => {
        const user = allUserProfiles.find(
            (profile) => profile.email === userId
        );
        setUserProfile(user);
    }, [userId, allUserProfiles]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (userProfile && userProfile.id) {
                try {
                    const postUserList = await PostService.getPostsByUserId(
                        userProfile.id
                    );
                    setPostUserList(postUserList);
                } catch (error) {
                    console.error(
                        "사용자가 작성한 게시물을 가져오는 중 오류 발생:",
                        error
                    );
                }
            }
        };

        fetchUserPosts();
    }, [userProfile]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="friendfeed-frame">
            <div className="friendfeed-user-info">
                <div className="friendfeed-user-avatar">
                    <img
                        src={userProfile.profileImageUrl || ""}
                        alt="User Avatar"
                    />
                </div>
                <div className="friendfeed-user-main">
                    <div className="friendfeed-user-header">
                        <h2 className="friendfeed-user-name">
                            {userProfile.name}
                        </h2>
                        <div className="friendfeed-user-actions">
                            <button className="friendfeed-follow-btn">
                                팔로우
                            </button>
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
                            <span className="friendfeed-stat-number">4</span>
                        </div>
                        <div className="friendfeed-user-stat">
                            <span className="friendfeed-stat-label">
                                팔로워
                            </span>
                            <span className="friendfeed-stat-number">0</span>
                        </div>
                        <div className="friendfeed-user-stat">
                            <span className="friendfeed-stat-label">
                                팔로우
                            </span>
                            <span className="friendfeed-stat-number">0</span>
                        </div>
                    </div>
                    <div className="friendfeed-user-bio">
                        <span className="friendfeed-user-profile">
                            {userProfile.name}
                        </span>
                        {userProfile.bio}
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
        </div>
    );
};

export default FriendFeed;
