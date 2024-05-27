import React, { useRef, useEffect, useState, useMemo } from "react";
import Webcam from "react-webcam";
import "./WebcamComponent.css";
import icons from "../assets/ImageList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { drawFilter } from "../utils/MakePhotoFilter";

import useFaceApiModels from "../components/hook/useFaceApiModel";
import useFaceDetection from "../components/hook/useFaceDetection";
import useCapture from "../components/hook/useCapture";

const WebcamComponent = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const captureCanvasRef = useRef(null);
    const sliderRef = useRef(null);
    const [filterIndex, setFilterIndex] = useState(0);
    const filters = useMemo(() => [
        "none",
        "catEars",
        "kapibara",
        "chilbok",
        "sunglasses",
        "blackWhite",
    ], []);

    const isModelLoaded = useFaceApiModels("/models");
    const previousDetections = useFaceDetection(webcamRef, canvasRef, filters, filterIndex, drawFilter); // 얼굴 인식 훅
    const capture = useCapture(
        webcamRef,
        captureCanvasRef,
        canvasRef,
        filters,
        filterIndex,
        onCapture
    ); // 캡처 훅

    const toggleMirror = () => {
        const video = webcamRef.current.video;
        video.style.transform =
            video.style.transform === "scaleX(-1)" ? "scaleX(1)" : "scaleX(-1)";
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        afterChange: (index) => {
            setTimeout(() => {
                setFilterIndex(index);
            }, 0);
        },
    };

    const handleClick = (index) => {
        setFilterIndex(index);
    };

    return (
        <div className="ipad-frame">
            <div className="webcam-container">
                <Webcam
                    className="webcam"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    mirrored
                />
                <canvas ref={canvasRef} className="webcam-canvas" />
                {/* canvasRef 설정 */}
                <canvas ref={captureCanvasRef} style={{ display: "none" }} />
                {/* captureCanvasRef 설정 */}
                <div className="webcam-top-bar">
                    <button onClick={toggleMirror}>
                        <img src={icons.transform}/>
                    </button>
                </div>
                <div className="webcam-bottom-bar">
                    <div
                        className="webcam-capture-button"
                        onClick={capture}
                    ></div>
                </div>
                <div className="webcam-slide-buttons">
                    <Slider {...sliderSettings} ref={sliderRef}>
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 0 ? "active" : ""
                            }`}
                            onClick={() => handleClick(0)}
                        >
                            <span>일반</span>
                        </div>
                        <img
                            className={`webcam-slide-button ${
                                filterIndex === 1 ? "active" : ""
                            }`}
                            onClick={() => handleClick(1)}
                            src={icons.catEars}
                            alt="고양이"
                        />

                        <img
                            className={`webcam-slide-button ${
                                filterIndex === 2 ? "active" : ""
                            }`}
                            onClick={() => handleClick(2)}
                            src={icons.kapibara}
                            alt="카피바라"
                        />

                        <img
                            className={`webcam-slide-button ${
                                filterIndex === 3 ? "active" : ""
                            }`}
                            onClick={() => handleClick(3)}
                            src={icons.chilbok}
                            alt="칠복"
                        />

                        <img
                            className={`webcam-slide-button sunglasses ${
                                filterIndex === 4 ? "active" : ""
                            }`}
                            onClick={() => handleClick(4)}
                            src={icons.sunglasses}
                            alt="선글라스"
                        />

                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 5 ? "active" : ""
                            }`}
                            onClick={() => handleClick(5)}
                        >
                            <span>흑백</span>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default WebcamComponent;
