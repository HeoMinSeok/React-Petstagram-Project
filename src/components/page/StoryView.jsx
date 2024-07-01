import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import "./StoryView.css";
import useStory from "../hook/useStory";
import GetRelativeTime from "../../utils/GetRelativeTime";

const StoryView = () => {
    const { id } = useParams();
    const userId = parseInt(id, 10);
    const navigate = useNavigate();
    const { stories, loading, error } = useStory();
    const mainSliderRef = useRef(null);
    const innerSliderRefs = useRef({});
    const [currentSlide, setCurrentSlide] = useState({});
    const [currentInnerSlide, setCurrentInnerSlide] = useState(0);
    const [innerSliderLength, setInnerSliderLength] = useState(0);
    const [activeUserId, setActiveUserId] = useState(userId);

    const getImageUrl = (image) =>
        `http://localhost:8088/uploads/${image.imageUrl}`;
    const getVideoUrl = (video) =>
        `http://localhost:8088/uploads/${video.videoUrl}`;
    const getProfileUrl = (user) =>
        `http://localhost:8088/uploads/${user.profileImage.imageUrl}`;

    useEffect(() => {
        if (!loading && !error && stories.length === 0) {
            navigate("/"); 
        }
    }, [loading, error, stories, navigate]);

    const groupedStories = stories.reduce((acc, story) => {
        const userId = story.user.id;
        if (!acc[userId]) {
            acc[userId] = [];
        }
        acc[userId].push(story);
        return acc;
    }, {});

    // 사용자별 스토리를 최신순으로 정렬
    const sortedUserIds = Object.keys(groupedStories)
        .map((userId) => {
            const userStories = groupedStories[userId];
            const latestStory = userStories.reduce((latest, story) => {
                return new Date(story.regTime) > new Date(latest.regTime)
                    ? story
                    : latest;
            }, userStories[0]);
            return {
                userId: userId,
                latestStoryTime: new Date(latestStory.regTime),
            };
        })
        .sort((a, b) => b.latestStoryTime - a.latestStoryTime) 
        .map((item) => item.userId); 

    useEffect(() => {
        if (activeUserId && groupedStories[activeUserId]) {
            setInnerSliderLength(groupedStories[activeUserId].length);
        }
    }, [activeUserId, groupedStories]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const initialSlideIndex = sortedUserIds.indexOf(id.toString());

    const handleNext = () => {
        if (currentInnerSlide < innerSliderLength - 1) {
            innerSliderRefs.current[activeUserId].slickNext();
        } else {
            if (mainSliderRef.current) {
                mainSliderRef.current.slickNext();
            }
        }
    };

    const handlePrev = () => {
        if (currentInnerSlide > 0) {
            innerSliderRefs.current[activeUserId].slickPrev();
        } else {
            if (mainSliderRef.current) {
                mainSliderRef.current.slickPrev();
            }
        }
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "0px",
        variableWidth: true,
        initialSlide: initialSlideIndex,
        afterChange: (current) => {
            setActiveUserId(sortedUserIds[current]);
            navigate(`/story-detail/${sortedUserIds[current]}`);
        },
    };

    const innerSettings = (userId) => ({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        beforeChange: (oldIndex, newIndex) => {
            setCurrentInnerSlide(newIndex);
            setCurrentSlide((prev) => ({
                ...prev,
                [userId]: newIndex,
            }));
        },
    });

    return (
        <div className="story-view-container">
            <Slider {...settings} ref={mainSliderRef}>
                {sortedUserIds.map((userId) => (
                    <div key={userId} className="story-user-slider">
                        <div className="story-slider-container">
                            <div className="story-user-info">
                                <img
                                    src={getProfileUrl(
                                        groupedStories[userId][0].user
                                    )}
                                    alt="프로필 이미지"
                                    className="story-profile-image"
                                />
                                <span className="story-username">
                                    {groupedStories[userId][0].user.email}
                                </span>
                                <span className="story-uploadtime">
                                    {GetRelativeTime(
                                        groupedStories[userId][0].regTime
                                    )}
                                </span>
                            </div>
                            <div className="story-progress-bar-container">
                                {groupedStories[userId].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`story-progress-bar ${
                                            index <= (currentSlide[userId] || 0)
                                                ? "active"
                                                : ""
                                        }`}
                                        style={{
                                            width: `${
                                                100 /
                                                groupedStories[userId].length
                                            }%`,
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="story-slider">
                                <Slider
                                    {...innerSettings(userId)}
                                    ref={(slider) =>
                                        (innerSliderRefs.current[userId] =
                                            slider)
                                    }
                                >
                                    {groupedStories[userId].map((story) => (
                                        <div
                                            key={story.id}
                                            className="story-slide"
                                        >
                                            <div className="story-media-container">
                                                {story.storyType === "video" ? (
                                                    <video
                                                        src={getVideoUrl(
                                                            story.videoList[0]
                                                        )}
                                                        className="story-media"
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src={getImageUrl(
                                                            story.imageList[0]
                                                        )}
                                                        alt="스토리 이미지"
                                                        className="story-media"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <div className="story-control-buttons">
                <button className="story-prev-arrow" onClick={handlePrev}>
                    {"＜"}
                </button>
                <button className="story-next-arrow" onClick={handleNext}>
                    {"＞"}
                </button>
            </div>
        </div>
    );
};

export default StoryView;
