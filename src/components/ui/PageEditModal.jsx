import React, { useRef, useEffect, useState } from "react";
import "./PageEditModal.css";
import PostService from "../service/PostService";
import useModal from "../hook/useModal";
import EmojiPicker from "./EmojiPicker";
import Loading from "./Loading";
import icons from "../../assets/ImageList";

const PageEditModal = ({ onClose, post, allUserProfiles, onUpdatePost }) => {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [text, setText] = useState("");
    const { openModal, closeModal, isModalOpen, toggleModal } = useModal();
    const maxTextLength = 2200;

    const getUserProfileImage = (email) => {
        const user = allUserProfiles.find((user) => user.email === email);
        return user ? user.profileImageUrl : "";
    };

    useEffect(() => {
        if (post) {
            const imageUrl =
                post.imageList && post.imageList.length > 0
                    ? `http://localhost:8088/uploads/${post.imageList[0].imageUrl}`
                    : null;
            setSelectedImage(imageUrl);
            setText(post.postContent || "");
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [post]);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file);
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        if (newText.length <= maxTextLength) {
            setText(newText);
        }
    };

    const handleEmojiClick = (emoji) => {
        setText(text + emoji);
        closeModal("emojiPicker");
    };

    const handleSubmit = async () => {
        try {
            openModal("loading");
            const currentFile = fileInputRef.current
                ? fileInputRef.current.files[0]
                : null;
            const currentText = text;

            const postId = post.id;

            const updatedPost = {
                ...post,
                postContent: currentText,
            };

            const formData = new FormData();
            formData.append(
                "post",
                new Blob([JSON.stringify(updatedPost)], {
                    type: "application/json",
                })
            );
            if (currentFile) {
                const currentBreed = await PostService.classifyImage(
                    currentFile
                );
                console.log("Predictions: ", currentBreed);

                formData.append("breed", currentBreed);
                formData.append("file", currentFile);
            } else {
                formData.append("breed", post.breed);
                closeModal("loading");
            }

            const token = localStorage.getItem("token");
            const response = await PostService.updatePost(
                postId,
                formData,
                token
            );

            console.log("게시글이 성공적으로 업데이트되었습니다:", response);
            onUpdatePost(response.data);
            onClose();
        } catch (error) {
            console.error(
                "게시글 수정 중 오류 발생:",
                error.response ? error.response.data : error.message
            );
        } finally {
            closeModal("loading");
        }
    };

    return (
        <div className="pageedit-frame-container">
            {isModalOpen("loading") && <Loading />}
            <div className="pageedit-frame">
                <div className="pageedit-header">
                    <div className="pageedit-text-cancle" onClick={onClose}>
                        취소
                    </div>
                    <div className="pageedit-text-wrapper">정보 수정</div>
                    <div
                        className="pageedit-text-wrapper-2"
                        onClick={handleSubmit}
                    >
                        완료
                    </div>
                </div>
                <div className="pageedit-content">
                    <div
                        className="pageedit-image-section"
                        onClick={handleFileButtonClick}
                    >
                        {selectedImage && (
                            <div className="img_section">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="pageedit_selected-image"
                                />
                            </div>
                        )}

                        <div
                            className="pageedit-file-div"
                            style={{
                                display: selectedImage ? "none" : "block",
                            }}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="pageedit-details-section">
                        <div className="pageedit-user-info">
                            {post.imageList && post.imageList[0] && (
                                <img
                                    className="pageedit-ellipse"
                                    src={getUserProfileImage(post.email)}
                                />
                            )}
                            <div className="pageedit-text-wrapper-3">
                                {post.email}
                            </div>
                        </div>
                        <div className="pageedit-textarea-section">
                            <textarea
                                className="pageedit-input-wrapper"
                                placeholder="문구를 입력하세요..."
                                value={text}
                                onChange={handleTextChange}
                            />
                            <div className="pageedit-counter">
                                <img
                                    className="pageedit-uil-smile"
                                    alt="Uil smile"
                                    src={icons.smileIcon}
                                    onClick={() => toggleModal("emojiPicker")}
                                />
                                <div className="pageedit-text-wrapper-5">
                                    {text.length}/{maxTextLength}
                                </div>
                            </div>
                            {isModalOpen("emojiPicker") && (
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            )}
                        </div>
                        <div className="pageedit-options">
                            <div className="pageedit-option">
                                <div className="pageedit-text-wrapper-6">
                                    위치 추가
                                </div>
                                <img
                                    className="pageedit-icon"
                                    alt="Frame"
                                    src={icons.locationIcon}
                                />
                            </div>
                            <div className="pageedit-option">
                                <div className="pageedit-text-wrapper-6">
                                    접근성
                                </div>
                                <img
                                    className="pageedit-icon"
                                    alt="Frame"
                                    src={icons.underArrowIcon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageEditModal;
