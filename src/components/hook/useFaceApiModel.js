import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";

/* 모델 로드 훅 */
const useFaceApiModels = (modelUrl) => {
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
            await faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);
            setIsModelLoaded(true);
        };

        loadModels();
    }, [modelUrl]);

    return isModelLoaded;
};

export default useFaceApiModels;
