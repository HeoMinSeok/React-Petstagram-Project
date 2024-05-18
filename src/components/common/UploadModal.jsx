import "./UploadModal.css";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

// 삭제 확인 모달 스타일
const DeleteConfirmModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const DeleteConfirmContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;
`;

const DeleteConfirmTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const DeleteConfirmMessage = styled.p`
    font-size: 14px;
    margin-bottom: 20px;
`;

const DeleteConfirmActions = styled.div`
    display: flex;
    justify-content: space-around;
`;

const DeleteConfirmButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &.delete {
        background-color: #e74c3c;
        color: #fff;
    }
    &.cancel {
        background-color: #95a5a6;
        color: #fff;
    }
`;

// 이모지 선택창 스타일
const EmojiPickerModal = styled.div`
    position: relative;
    top: 30px;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: ;
    width: 250px;
`;

const EmojiButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin: 5px;
    display: inline-block !important;
`;

const EmojiTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

const EmojiList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const UploadModal = ({ onClose, profileInfo }) => {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [text, setText] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const maxTextLength = 2200;

    useEffect(() => {
        // 모달이 나타날 때 body 요소에 overflow: hidden을 적용하여 스크롤을 막음
        document.body.style.overflow = "hidden";
        // 모달이 닫힐 때 body 요소에 overflow: auto로 스크롤을 가능하게 함
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        onClose();
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleEmojiButtonClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emoji) => {
        setText(text + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="post-frame-container">
            <button className="post-close-modal" onClick={handleDeleteClick}>
                ✕
            </button>
            <div className="post-frame">
                <div className="post-header">
                    <div className="post-text-wrapper">새 게시물 만들기</div>
                    <div className="post-text-wrapper-2">공유하기</div>
                </div>
                <div className="post-content">
                    <div className="post-image-section">
                        {selectedImage && (
                            <div className="img_section">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="selected-image"
                                />
                            </div>
                        )}
                        {!selectedImage && (
                            <div className="img_section">
                                <img
                                    className="image_file"
                                    src="../src/assets/postmodal/photo.png"
                                    alt="포스트 모달 이미지"
                                />
                                <br />
                                사진과 동영상을 끌어다 놓으세요
                            </div>
                        )}
                        {!selectedImage && (
                            <div className="post-file-div">
                                <div
                                    className="file_section"
                                    onClick={handleFileButtonClick}
                                >
                                    컴퓨터에서 선택
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="post-details-section">
                        <div className="post-user-info">
                            <div className="post-ellipse" />
                            <div className="post-text-wrapper-3">
                                {profileInfo.email}
                            </div>
                        </div>
                        <div className="post-textarea-section">
                            <textarea
                                className="post-input-wrapper"
                                placeholder="문구를 입력하세요..."
                                value={text}
                                onChange={handleTextChange}
                            />
                            <div className="post-counter">
                                <img
                                    className="post-uil-smile"
                                    alt="Uil smile"
                                    src="../src/assets/postmodal/smile.png"
                                    onClick={handleEmojiButtonClick}
                                />
                                <div className="post-text-wrapper-5">
                                    {text.length}/{maxTextLength}
                                </div>
                            </div>
                        </div>
                        <div className="post-options">
                            <div className="post-option">
                                <div className="post-text-wrapper-6">
                                    위치 추가
                                </div>
                                <img
                                    className="post-icon"
                                    alt="Frame"
                                    src="../src/assets/postmodal/location.png"
                                />
                            </div>
                            <div className="post-option">
                                <div className="post-text-wrapper-6">
                                    접근성
                                </div>
                                <img
                                    className="post-icon"
                                    alt="Frame"
                                    src="../src/assets/postmodal/under.png"
                                />
                            </div>
                            <div className="post-option">
                                <div className="post-text-wrapper-6">
                                    고급 설정
                                </div>
                                <img
                                    className="post-icon"
                                    alt="Frame"
                                    src="../src/assets/postmodal/under.png"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  이모지 선택창*/}
            {showEmojiPicker && (
                <EmojiPickerModal>
                    <EmojiTitle>최고 인기 이모티콘</EmojiTitle>
                    <EmojiList>
                        {["🐥", "🐣", "🐤", "🐧", "🐦", "🐰", "🐹"].map(
                            (emoji) => (
                                <EmojiButton
                                    key={emoji}
                                    onClick={() => handleEmojiClick(emoji)}
                                >
                                    {emoji}
                                </EmojiButton>
                            )
                        )}
                    </EmojiList>
                </EmojiPickerModal>
            )}

            {/* 삭제 확인 이중 모달 */}
            {showDeleteConfirm && (
                <DeleteConfirmModal>
                    <DeleteConfirmContent>
                        <DeleteConfirmTitle>
                            게시물을 삭제하시겠어요?
                        </DeleteConfirmTitle>
                        <DeleteConfirmMessage>
                            지금 나가면 수정 내용이 저장되지 않습니다.
                        </DeleteConfirmMessage>
                        <DeleteConfirmActions>
                            <DeleteConfirmButton
                                className="delete"
                                onClick={handleConfirmDelete}
                            >
                                삭제
                            </DeleteConfirmButton>
                            <DeleteConfirmButton
                                className="cancel"
                                onClick={handleCancelDelete}
                            >
                                취소
                            </DeleteConfirmButton>
                        </DeleteConfirmActions>
                    </DeleteConfirmContent>
                </DeleteConfirmModal>
            )}
        </div>
    );
};
