import React from "react";
import "./FeedStoryList.css";
import useUser from "../../hook/useUser";
import { useNavigate } from "react-router-dom";
import useStory from "../../hook/useStory";

const FeedStoryList = () => {
    const { profileInfo, getProfileImageUrl } = useUser();
    const { stories, loading, error } = useStory();
    const navigate = useNavigate();

    // 사용자별 스토리 그룹화
    const groupedStories = stories.reduce((acc, story) => {
        const userId = story.user.id;
        if (!acc[userId]) {
            acc[userId] = [];
        }
        acc[userId].push(story);
        return acc;
    }, {});

    // 사용자별 스토리를 최신순으로 정렬
    const sortedUsers = Object.keys(groupedStories)
        .map((userId) => {
            const userStories = groupedStories[userId];
            const latestStory = userStories.reduce((latest, story) => {
                return new Date(story.regTime) > new Date(latest.regTime)
                    ? story
                    : latest;
            }, userStories[0]);
            return {
                user: userStories[0].user,
                latestStoryTime: new Date(latestStory.regTime),
            };
        })
        .sort((a, b) => b.latestStoryTime - a.latestStoryTime) 
        .map((item) => item.user); 

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
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {sortedUsers.map((user) => (
                <div
                    key={user.id}
                    className="feed-story-item"
                    onClick={() => navigate(`/story-detail/${user.id}`)}
                >
                    <div className="feed-story-image-wrapper">
                        <img
                            src={getProfileImageUrl(user.profileImage)}
                            alt="스토리"
                            className="feed-story-image"
                        />
                    </div>
                    <span className="feed-story-username">{user.email}</span>
                </div>
            ))}
        </div>
    );
};

export default FeedStoryList;
