import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import "./StoryView.css";

const StoryView = ({ stories }) => {
    const { id } = useParams();
    const storyIndex = parseInt(id, 10);
    const navigate = useNavigate();
    const mainSliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        centerMode: true,
        centerPadding: "0px",
        variableWidth: true, 
        initialSlide: storyIndex,

        afterChange: (current) => {
            navigate(`/story-detail/${current}`);
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className="story-view-container">
            <Slider {...settings} ref={mainSliderRef}>
                {stories.map((story, index) => (
                    <div
                        key={index}
                        className={`story-slide ${
                            index === storyIndex ? "slick-center" : ""
                        }`}
                    >
                        <div className="story-media-wrapper">
                            {story.type === "video" ? (
                                <video
                                    src={story.content}
                                    className="story-media"
                                    controls
                                />
                            ) : (
                                <img
                                    src={story.content}
                                    alt="스토리 이미지"
                                    className="story-media"
                                />
                            )}
                        </div>
                        <div className="story-username">{story.username}</div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style, right: "calc(30%)", zIndex: 2 }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style, left: "calc(30% + 20px)", zIndex: 2 }}
            onClick={onClick}
        />
    );
};

export default StoryView;
