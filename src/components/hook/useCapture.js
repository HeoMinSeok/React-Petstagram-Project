import { useCallback } from "react";

const useCapture = (
    webcamRef,
    captureCanvasRef,
    canvasRef,
    filters,
    filterIndex,
    onCapture
) => {
    const capture = useCallback(() => {
        const video = webcamRef.current.video;
        const canvas = captureCanvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 비디오의 현재 변환 상태를 확인
        const isMirrored = video.style.transform === "scaleX(-1)";

        ctx.save();
        if (isMirrored) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                video,
                -video.videoWidth,
                0,
                video.videoWidth,
                video.videoHeight
            );
        } else {
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        }
        ctx.restore();

        if (filters[filterIndex] !== "none") {
            ctx.drawImage(canvasRef.current, 0, 0);
        }

        const imageSrc = canvas.toDataURL("image/jpeg");
        onCapture(imageSrc);
    }, [
        webcamRef,
        captureCanvasRef,
        canvasRef,
        filters,
        filterIndex,
        onCapture,
    ]);

    return capture;
};

export default useCapture;
