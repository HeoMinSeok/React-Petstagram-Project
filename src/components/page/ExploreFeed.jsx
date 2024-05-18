import React, { useEffect, useState } from "react";
import "./ExploreFeed.css";

const ExploreFeed = () => {
    // 다른 회원의 게시글을 보는 곳 ; 우선 전체 멤버들이 썼던 게시글의 이미지만 출력해보기
    const images = [
        // 이미지 URL 리스트 (예시)
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ];

    /* useEffect(() => {
        // axios 예시
        const fetchImages = async () => {
            const response = await fetch("https://example.com/api/images");
            const data = await response.json();
            setImages(data);
        };

        fetchImages();
    }, []); */

    return (
        <div className="explore">
            <div className="explore-frame">
                <div className="grid-container">
                    {images.map((image, index) => (
                        <div key={index} className="grid-item">
                            <img src={image.url} alt={`grid-${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreFeed;
