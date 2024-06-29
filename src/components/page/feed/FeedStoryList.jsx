import React from "react";
import "./FeedStoryList.css";
import useUser from "../../hook/useUser";
import useModal from "../../hook/useModal";
import { useNavigate } from "react-router-dom";

const FeedStoryList = ({ stories }) => {
    const { profileInfo, getProfileImageUrl } = useUser();
    const navigate = useNavigate();

    return (
        <div className="feed-story-list">
            <div
                className="feed-story-profile-wrapper"
                onClick={() => navigate("/story-upload")}
            >
                <img
                    src={getProfileImageUrl(profileInfo.profileImage)}
                    alt="프로필 이미지"
                    className="feed-story-profile-image"
                />
                <button className="feed-story-upload-btn">+</button>
            </div>
            {stories.map((story, index) => (
                <div key={index} className="feed-story-item">
                    <img
                        src={story.profileImage}
                        alt="스토리"
                        className="feed-story-image"
                    />
                    <span className="feed-story-username">
                        {story.username}
                    </span>
                </div>
            ))}
            {/* {isModalOpen("story-upload") && (
                <FeedStoryUpload
                    isOpen={isModalOpen("story-upload")}
                    onRequestClose={() => closeModal("story-upload")}
                />
            )} */}
        </div>
    );
};

export default FeedStoryList;
