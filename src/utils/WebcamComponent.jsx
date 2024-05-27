import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./WebcamComponent.css";
import icons from "../assets/ImageList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { drawFilter } from "../utils/MakePhotoFilter";

const WebcamComponent = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const captureCanvasRef = useRef(null);
    const sliderRef = useRef(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [previousDetections, setPreviousDetections] = useState([]);
    const [filterIndex, setFilterIndex] = useState(0);
    const filters = ["none", "catEars", "kapibara", "grayScale"];

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            setIsModelLoaded(true);
        };

        loadModels();
    }, []);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            setIsModelLoaded(true);
        };

        loadModels();
    }, []);

    useEffect(() => {
        if (isModelLoaded) {
            const interval = setInterval(async () => {
                if (
                    webcamRef.current &&
                    webcamRef.current.video.readyState === 4
                ) {
                    const video = webcamRef.current.video;
                    const displaySize = {
                        width: video.videoWidth,
                        height: video.videoHeight,
                    };
                    faceapi.matchDimensions(canvasRef.current, displaySize);

                    const detections = await faceapi
                        .detectAllFaces(
                            video,
                            new faceapi.TinyFaceDetectorOptions()
                        )
                        .withFaceLandmarks();

                    const resizedDetections = faceapi.resizeResults(
                        detections,
                        displaySize
                    );

                    if (!arraysEqual(resizedDetections, previousDetections)) {
                        const ctx = canvasRef.current.getContext("2d");
                        ctx.clearRect(
                            0,
                            0,
                            canvasRef.current.width,
                            canvasRef.current.height
                        );

                        if (filters[filterIndex] !== "none") {
                            drawFilter(
                                filters[filterIndex],
                                resizedDetections,
                                ctx
                            );
                        }
                        setPreviousDetections(resizedDetections);
                    }
                }
            }, 500); // 감지 주기를 300ms로 설정

            return () => clearInterval(interval);
        }
    }, [isModelLoaded, previousDetections, filterIndex]);

    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (
                arr1[i].detection.box.x !== arr2[i]?.detection.box.x ||
                arr1[i].detection.box.y !== arr2[i]?.detection.box.y ||
                arr1[i].detection.box.width !== arr2[i]?.detection.box.width ||
                arr1[i].detection.box.height !== arr2[i]?.detection.box.height
            ) {
                return false;
            }
        }
        return true;
    };

    const capture = useCallback(() => {
        const video = webcamRef.current.video;
        const canvas = captureCanvasRef.current;
        const ctx = canvas.getContext("2d");

        // 캔버스 크기를 비디오 크기와 동일하게 설정
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 비디오 그리기
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // 캔버스에 그려진 필터를 캡처 캔버스에 복사
        if (filters[filterIndex] !== "none") {
            ctx.drawImage(canvasRef.current, 0, 0);
        }

        // 최종 이미지를 캡처
        const imageSrc = canvas.toDataURL("image/jpeg");
        onCapture(imageSrc);
    }, [onCapture, filterIndex]);

    const toggleMirror = () => {
        const video = webcamRef.current.video;
        video.style.transform =
            video.style.transform === "scaleX(-1)" ? "scaleX(1)" : "scaleX(-1)";
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            sliderRef.current.slickPrev();
        } else {
            sliderRef.current.slickNext();
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        afterChange: (index) => setFilterIndex(index),
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
                <canvas ref={captureCanvasRef} style={{ display: "none" }} />
                <div className="webcam-top-bar">
                    <button onClick={toggleMirror}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                </div>
                <div className="webcam-bottom-bar">
                    <div
                        className="webcam-capture-button"
                        onClick={capture}
                    ></div>
                </div>
                <div className="webcam-slide-buttons" onWheel={handleWheel}>
                    <Slider {...sliderSettings} ref={sliderRef}>
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 0 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(0)}
                        >
                            <span>일반</span>
                        </div>
                        <img
                            className={`webcam-slide-button ${
                                filterIndex === 1 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(1)}
                            src={icons.catEars}
                            alt="필터"
                        />

                        {/* 필터를 추가할 수 있는 곳 */}
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 2 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(2)}
                        >
                            필터2
                        </div>
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 3 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(3)}
                        >
                            필터3
                        </div>
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 4 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(4)}
                        >
                            필터4
                        </div>
                        <div
                            className={`webcam-slide-button ${
                                filterIndex === 5 ? "active" : ""
                            }`}
                            onClick={() => setFilterIndex(5)}
                        >
                            필터5
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default WebcamComponent;
