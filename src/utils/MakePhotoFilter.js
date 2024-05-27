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
            detections.forEach((detection) => {
                const { x, y, width, height } = detection.detection.box;

                // 캔버스 크기
                const canvasWidth = ctx.canvas.width;
                const canvasHeight = ctx.canvas.height;

                // 필터 크기
                const filterWidth = 300;
                const filterHeight = 300;

                // 필터 위치를 얼굴 좌측 하단에 배치
                const xPosition = x - filterWidth - 10;
                const yPosition = y + height + 10;

                // 필터가 캔버스 밖으로 나가지 않도록 조정
                const adjustedX = Math.max(
                    0,
                    Math.min(xPosition, canvasWidth - filterWidth)
                );
                const adjustedY = Math.max(
                    0,
                    Math.min(yPosition, canvasHeight - filterHeight)
                );

                ctx.drawImage(
                    image,
                    adjustedX,
                    adjustedY,
                    filterWidth,
                    filterHeight
                );
            });
        },
    },
    chilbok: {
        image: new Image(),
        draw: (detections, ctx, image) => {
            detections.forEach((detection) => {
                const { x, y, width, height } = detection.detection.box;

                // 필터 크기
                const filterWidth = width * 1.5;
                const filterHeight = filterWidth;

                // 필터 위치를 얼굴 위에 배치
                const xPosition = x + width / 2 - filterWidth / 2;
                const yPosition = y - filterHeight - 10;

                ctx.drawImage(
                    image,
                    xPosition,
                    yPosition,
                    filterWidth,
                    filterHeight
                );
            });
        },
    },
    sunglasses: {
        image: new Image(),
        draw: (detections, ctx, image) => {
            detections.forEach((detection) => {
                const leftEye = detection.landmarks.getLeftEye();
                const rightEye = detection.landmarks.getRightEye();

                // 양쪽 눈의 중심점 구하기
                const eyeMidpoint = {
                    x: (leftEye[0].x + rightEye[3].x) / 2,
                    y: (leftEye[0].y + rightEye[3].y) / 2,
                };

                // 선글라스 필터 크기 및 위치 설정
                const filterWidth =
                    Math.abs(rightEye[3].x - leftEye[0].x) * 2.5;
                const filterHeight = filterWidth * (2 / 3);
                const xPosition = eyeMidpoint.x - filterWidth / 2;
                const yPosition = eyeMidpoint.y - filterHeight / 2;

                ctx.drawImage(
                    image,
                    xPosition,
                    yPosition,
                    filterWidth,
                    filterHeight
                );
            });
        },
    },
    blackWhite: {
        image: null,
        draw: (detections, ctx) => {
            console.log("Applying black and white filter");
            const canvasWidth = ctx.canvas.width;
            const canvasHeight = ctx.canvas.height;
            const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const gray =
                    data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
                data[i] = gray; // red
                data[i + 1] = gray; // green
                data[i + 2] = gray; // blue
            }

            ctx.putImageData(imageData, 0, 0);
        },
    },
};

// Load images
filters.catEars.image.src = icons.catEars;
filters.kapibara.image.src = icons.kapibara;
filters.chilbok.image.src = icons.chilbok;
filters.sunglasses.image.src = icons.sunglasses;

export const drawFilter = (filterName, detections, ctx) => {
    const filter = filters[filterName];
    if (filter) {
        if (filterName === "blackWhite") {
            filter.draw(detections, ctx);
        } else if (filter.image.complete || filter.image === null) {
            filter.draw(detections, ctx, filter.image);
        }
    }
};
