import React, { useEffect, useState } from "react";
import "./ExploreFeed.css";

const ExploreFeed = ({ images }) => {
    console.log("ExploreFeed rendered");

    const getImageUrl = (image) => {
        return `http://localhost:8088/uploads/${image.imageUrl}`; // 이미지 URL 구성
    };

    return (
        <div className="explore">
            <div className="explore-frame">
                <div className="grid-container">
                    {images.map((image, index) => (
                        <div key={index} className="grid-item">
                            <img
                                src={getImageUrl(image)}
                                alt={`grid-${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreFeed;
