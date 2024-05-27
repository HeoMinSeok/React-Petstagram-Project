// src/utils/MakePhotoFilter.js

import icons from "../assets/ImageList";

const filters = {
    catEars: {
        image: new Image(),
        draw: (detections, ctx, image) => {
            detections.forEach((detection) => {
                const leftEye = detection.landmarks.getLeftEye();
                const rightEye = detection.landmarks.getRightEye();
                const eyeMidpoint = {
                    x: (leftEye[0].x + rightEye[3].x) / 2,
                    y: (leftEye[0].y + rightEye[3].y) / 2,
                };

                const foreheadY =
                    detection.detection.box.y -
                    detection.detection.box.height / 2;
                const filterWidth = Math.abs(rightEye[3].x - leftEye[0].x) * 2;
                const filterHeight = filterWidth * (2 / 5);

                ctx.drawImage(
                    image,
                    eyeMidpoint.x - filterWidth / 2,
                    foreheadY,
                    filterWidth,
                    filterHeight
                );
            });
        },
    },
    kapibara: {
        image: new Image(),
        draw: (detections, ctx, image) => {
            const canvasWidth = ctx.canvas.width;
            const canvasHeight = ctx.canvas.height;
            const filterWidth = 300; 
            const filterHeight = 300; 
            const x = canvasWidth - filterWidth - 10; 
            const y = canvasHeight - filterHeight - 10; 

            ctx.drawImage(image, x, y, filterWidth, filterHeight);
        },
    },
    grayScale: {
        image: null,
        draw: (detections, ctx) => {
            detections.forEach((detection) => {
                const { x, y, width, height } = detection.detection.box;
                const imageData = ctx.getImageData(x, y, width, height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const gray =
                        data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
                    data[i] = gray; // red
                    data[i + 1] = gray; // green
                    data[i + 2] = gray; // blue
                }

                ctx.putImageData(imageData, x, y);
            });
        },
    },
};

// Load images
filters.catEars.image.src = icons.catEars;
filters.kapibara.image.src = icons.kapibara;

export const drawFilter = (filterName, detections, ctx) => {
    const filter = filters[filterName];
    if (filter && (filter.image === null || filter.image.complete)) {
        filter.draw(detections, ctx, filter.image);
    }
};
