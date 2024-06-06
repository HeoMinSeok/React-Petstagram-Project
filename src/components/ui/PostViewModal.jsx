import React, { useState, useEffect } from "react";
import "./PostViewModal.css";
import GetRelativeTime from "../../utils/GetRelativeTime";
import icons from "../../assets/ImageList";

import useLikeStatus from "../hook/useLikeStatus";
import useComment from "../hook/useComment";
import useModal from "../hook/useModal";
import useAllUser from "../hook/useAllUser";

import PageEditModal from "./PageEditModal";
import EmojiPicker from "./EmojiPicker";
import MoreModal from "./MoreModal";

const PostViewModal = ({ post, deletePost, onClose, modalType }) => {
    const { allUserProfiles } = useAllUser();
    const { openModal, closeModal, isModalOpen, toggleModal } = useModal();
    const { postLiked, postLikesCount, handleLikeClick, likedUsers } =
        useLikeStatus(post.id);

    const [currentPost, setCurrentPost] = useState(post);
    const [commentText, setCommentText] = useState("");
    const [replyingToCommentId, setReplyingToCommentId] = useState(null); // 대댓글 작성 시 답글 대상 댓글 ID
    const [replyingToEmail, setReplyingToEmail] = useState(""); // 대댓글 작성 시 답글 대상 이메일
    const [showReplies, setShowReplies] = useState({}); // 답글 숨기기/보기 상태

    const {
        commentList,
        commentLikes,
        commentLiked,
        fetchAllComments,
        submitComment,
        deleteComment,
        handleCommentLikeClick,
        fetchReplyComments,
        replyComments,
        replyCommentLikes,
        replyCommentLiked,
        submitReplyComment,
        deleteReplyComment,
        handleReplyCommentLikeClick,
    } = useComment();

    // ModalType 결정
    const getModalOptions = () => {
        switch (modalType) {
            case "myfeed":
                return [
                    {
                        label: "삭제",
                        className: "moreoption-remove",
                        onClick: async () => {
                            try {
                                await deletePost(currentPost.id);
                                closeModal("more");
                                onClose();
                            } catch (error) {
                                console.error(
                                    "게시글 삭제 중 오류가 발생했습니다.",
                                    error
                                );
                            }
                        },
                    },
                    {
                        label: "수정",
                        className: "moreoption-edit",
                        onClick: () => {
                            closeModal("more");
                            openModal("edit");
                        },
                    },
                    {
                        label: "취소",
                        className: "moreoption-cancel",
                        onClick: () => {
                            closeModal("more");
                        },
                    },
                ];
            case "feed":
            case "explorefeed":
                return [
                    {
                        label: "이 계정 정보",
                        className: "moreoption-account",
                        onClick: () => {
                            console.log("추후 작성");
                        },
                    },
                    {
                        label: "팔로우 취소",
                        className: "moreoption-unfollow",
                        onClick: () => {
                            console.log("추후 작성");
                        },
                    },
                    {
                        label: "취소",
                        className: "moreoption-cancel",
                        onClick: () => {
                            closeModal("more");
                        },
                    },
                ];
            default:
                return [];
        }
    };

    // 댓글 또는 대댓글 작성
    const handleDivClick = async () => {
        if (commentText.trim() !== "") {
            if (replyingToCommentId) {
                await submitReplyComment(replyingToCommentId, commentText);
                setReplyingToCommentId(null);
                setReplyingToEmail("");
            } else {
                await submitComment(currentPost.id, commentText);
            }
            setCommentText("");
            await fetchAllComments();
        }
    };

    // 답글 달기 클릭 시
    const handleReplyClick = (commentId, email) => {
        setReplyingToCommentId(commentId);
        setReplyingToEmail(email);
        setCommentText(`@${email} `);
        document.querySelector(".postview-likes-input").focus();
    };

    // 답글 보기/숨기기 토글
    const toggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));

        if (!showReplies[commentId]) {
            fetchReplyComments(commentId);
        }
    };

    // 이모지 클릭
    const handleEmojiClick = (emoji) => {
        setCommentText(commentText + emoji);
        closeModal("emojiPicker");
    };

    // 게시물 업데이트 핸들러
    const handleUpdatePost = (updatedPost) => {
        setCurrentPost(updatedPost);
    };

    // 사용자 프로필 이미지 가져오기
    const getUserProfileImage = (email) => {
        if (!allUserProfiles) return "";
        const user = allUserProfiles.find((user) => user.email === email);
        return user ? user.profileImageUrl : "";
    };

    // 댓글 옵션
    const getCommentOptions = (commentId) => [
        {
            label: "삭제",
            className: "moreoption-remove",
            onClick: async () => {
                try {
                    await deleteComment(commentId);
                    closeModal(`commentmore-${commentId}`);
                    await fetchAllComments();
                } catch (error) {
                    console.error("댓글 삭제 중 오류가 발생했습니다.", error);
                }
            },
        },
        {
            label: "취소",
            className: "commentoption-cancel",
            onClick: () => closeModal(`commentmore-${commentId}`),
        },
    ];

    // 대댓글 옵션을 반환하는 함수
    const getReplyCommentOptions = (replyCommentId) => [
        {
            label: "삭제",
            className: "moreoption-remove",
            onClick: async () => {
                try {
                    await deleteReplyComment(replyCommentId);
                    closeModal(`replycommentmore-${replyCommentId}`);
                    await fetchAllComments();
                } catch (error) {
                    console.error("대댓글 삭제 중 오류가 발생했습니다.", error);
                }
            },
        },
        {
            label: "취소",
            className: "commentoption-cancel",
            onClick: () => closeModal(`replycommentmore-${replyCommentId}`),
        },
    ];

    // 현재 게시물이 없을 경우 null 반환
    if (!currentPost) return null;

    // 댓글 가져오기
    const postComments =
        commentList.find((c) => c.postId === currentPost.id)?.comments || [];

    return (
        <>
            <div className="postview-modal-overlay" onClick={onClose}>
                <div
                    className="postview-modal-container"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="postview-content">
                        <div className="postview-img-section">
                            {currentPost.imageList &&
                                currentPost.imageList[0] && (
                                    <img
                                        src={`http://localhost:8088/uploads/${
                                            currentPost.imageList[0].imageUrl
                                        }?${new Date().getTime()}`}
                                        alt=""
                                        className="postview-image"
                                    />
                                )}
                        </div>

                        <div className="postview-details-section">
                            <div className="postview-header-section">
                                <img
                                    src={getUserProfileImage(currentPost.email)}
                                    alt=""
                                    className="postview-profile-img"
                                />
                                <div className="postview-username">
                                    {currentPost.email}
                                </div>
                                <img
                                    src={icons.moreIcon}
                                    alt="more-icon"
                                    className="postview-more-icon"
                                    onClick={() => openModal("more")}
                                />
                                {isModalOpen("more") && (
                                    <MoreModal options={getModalOptions()} />
                                )}
                            </div>

                            <div className="postview-body-section">
                                <div className="postview-content-section">
                                    <img
                                        src={getUserProfileImage(
                                            currentPost.email
                                        )}
                                        alt=""
                                        className="postview-content-profile-img"
                                    />
                                    <div className="postview-content-details">
                                        <div className="postview-content-username-caption">
                                            <div className="postview-content-username">
                                                {currentPost.email}
                                            </div>
                                            <div className="postview-caption">
                                                {currentPost.postContent}
                                            </div>
                                        </div>
                                        <div className="postview-content-date">
                                            {GetRelativeTime(
                                                currentPost.regTime
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="postview-comments-section">
                                    {postComments.map((comment) => (
                                        <div key={comment.id}>
                                            <div className="postview-comments">
                                                <img
                                                    src={getUserProfileImage(
                                                        comment.commentEmail
                                                    )}
                                                    alt="댓글 사용자 이미지"
                                                    className="postview-comments-profile-img"
                                                />
                                                <div className="postview-comments-details">
                                                    <div className="postview-comments-header">
                                                        <div className="postview-comments-name">
                                                            {
                                                                comment.commentEmail
                                                            }
                                                        </div>
                                                        <div className="postview-comments-content">
                                                            {
                                                                comment.commentContent
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="postview-comments-footer">
                                                        <div className="postview-comments-date">
                                                            {GetRelativeTime(
                                                                comment.commentRegTime
                                                            )}
                                                        </div>
                                                        {commentLikes[
                                                            comment.id
                                                        ] > 0 && (
                                                            <div className="postview-comments-likes">
                                                                좋아요{" "}
                                                                {
                                                                    commentLikes[
                                                                        comment
                                                                            .id
                                                                    ]
                                                                }
                                                                개
                                                            </div>
                                                        )}

                                                        {/* {isModalOpen("likelist") && (
                                                            <LikeListModal
                                                                title="좋아요"
                                                                onClose={() => closeModal("likelist")}
                                                            >

                                                            </LikeListModal>
                                                        )} */}
                                                        <div
                                                            className="postview-comments-reply"
                                                            onClick={() =>
                                                                handleReplyClick(
                                                                    comment.id,
                                                                    comment.commentEmail
                                                                )
                                                            }
                                                        >
                                                            답글 달기
                                                        </div>
                                                        <img
                                                            src={
                                                                icons.moreIcon2
                                                            }
                                                            alt="더보기"
                                                            className="postview-comments-more-icon"
                                                            onClick={() =>
                                                                openModal(
                                                                    `commentmore-${comment.id}`
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <img
                                                    src={
                                                        commentLiked[comment.id]
                                                            ? icons.heartFillIcon
                                                            : icons.heartIcon
                                                    }
                                                    alt="heart-icon"
                                                    className="postview-heart"
                                                    onClick={() =>
                                                        handleCommentLikeClick(
                                                            comment.id
                                                        )
                                                    }
                                                />
                                                {isModalOpen(
                                                    `commentmore-${comment.id}`
                                                ) && (
                                                    <MoreModal
                                                        options={getCommentOptions(
                                                            comment.id
                                                        )}
                                                    />
                                                )}
                                            </div>
                                            {comment.replyCommentList &&
                                                comment.replyCommentList
                                                    .length > 0 && (
                                                    <div
                                                        className="postview-toggle-replies"
                                                        onClick={() =>
                                                            toggleReplies(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        <img
                                                            src={icons.lineIcon}
                                                            alt="line-icon"
                                                            className="postview-toggle-replies-line-icon"
                                                        />
                                                        {showReplies[comment.id]
                                                            ? "답글 숨기기"
                                                            : `답글 보기 (${comment.replyCommentList.length}개)`}
                                                    </div>
                                                )}
                                            {showReplies[comment.id] && (
                                                <div className="postview-reply-comments-section">
                                                    {(
                                                        replyComments[
                                                            comment.id
                                                        ] || []
                                                    ).map((reply) => (
                                                        <div
                                                            className="postview-reply-comment"
                                                            key={reply.id}
                                                        >
                                                            <img
                                                                src={getUserProfileImage(
                                                                    reply.replyCommentEmail
                                                                )}
                                                                alt="대댓글 사용자 이미지"
                                                                className="postview-reply-comments-profile-img"
                                                            />
                                                            <div className="postview-reply-comments-details">
                                                                <div className="postview-reply-comments-header">
                                                                    <div className="postview-reply-comments-name">
                                                                        {
                                                                            reply.replyCommentEmail
                                                                        }
                                                                    </div>
                                                                    <div className="postview-reply-comments-content">
                                                                        {
                                                                            reply.replyCommentContent
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="postview-reply-comments-footer">
                                                                    <div className="postview-reply-comments-date">
                                                                        {GetRelativeTime(
                                                                            reply.replyCommentRegTime
                                                                        )}
                                                                    </div>

                                                                    {replyCommentLikes[
                                                                        reply.id
                                                                    ] > 0 && (
                                                                        <div className="postview-reply-comments-likes">
                                                                            좋아요{" "}
                                                                            {
                                                                                replyCommentLikes[
                                                                                    reply
                                                                                        .id
                                                                                ]
                                                                            }
                                                                            개
                                                                        </div>
                                                                    )}

                                                                    <div
                                                                        className="postview-comments-reply"
                                                                        onClick={() =>
                                                                            handleReplyClick(
                                                                                comment.id,
                                                                                reply.replyCommentEmail
                                                                            )
                                                                        }
                                                                    >
                                                                        답글
                                                                        달기
                                                                    </div>
                                                                    <img
                                                                        src={
                                                                            icons.moreIcon2
                                                                        }
                                                                        alt="더보기 이모티콘"
                                                                        className="postview-reply-comments-more-icon"
                                                                        onClick={() =>
                                                                            openModal(
                                                                                `replycommentmore-${reply.id}`
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <img
                                                                src={
                                                                    replyCommentLiked[
                                                                        reply.id
                                                                    ]
                                                                        ? icons.heartFillIcon
                                                                        : icons.heartIcon
                                                                }
                                                                alt="heart-icon"
                                                                className="postview-heart"
                                                                onClick={() =>
                                                                    handleReplyCommentLikeClick(
                                                                        reply.id
                                                                    )
                                                                }
                                                            />
                                                            {isModalOpen(
                                                                `replycommentmore-${reply.id}`
                                                            ) && (
                                                                <MoreModal
                                                                    options={getReplyCommentOptions(
                                                                        reply.id
                                                                    )}
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="postview-image-section">
                                    <div className="postview-icons-left">
                                        <img
                                            src={
                                                postLiked
                                                    ? icons.heartFillIcon
                                                    : icons.heartIcon
                                            }
                                            alt="heart-icon"
                                            className="postview-like-icon"
                                            onClick={handleLikeClick}
                                        />
                                        <img
                                            src={icons.commentIcon2}
                                            alt="댓글"
                                            className="postview-comment-icon"
                                            onClick={() =>
                                                document
                                                    .querySelector(
                                                        ".postview-likes-input"
                                                    )
                                                    .focus()
                                            }
                                        />
                                    </div>
                                    <img
                                        src={icons.bookMarkIcon2}
                                        alt="mark-icon"
                                        className="postview-mark-icon"
                                    />
                                </div>

                                <div className="postview-likes-section">
                                    {postLikesCount > 1 ? (
                                        <>
                                            <span className="postview-likes-text">
                                                <strong>
                                                    {likedUsers[0]?.email}
                                                </strong>
                                                님 외 {postLikesCount - 1} 명이
                                                좋아합니다
                                            </span>
                                        </>
                                    ) : postLikesCount === 1 ? (
                                        <>
                                            <span className="postview-likes-text">
                                                좋아요 1개
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="postview-likes-text">
                                                가장 먼저 좋아요를 눌러보세요
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="postview-likes-date">
                                    {GetRelativeTime(currentPost.regTime)}
                                </div>

                                <div className="postview-likes-input-section">
                                    <img
                                        src={icons.smileIcon}
                                        alt="smile-icon"
                                        className="postview-likes-input-icon"
                                        onClick={() =>
                                            toggleModal("emojiPicker")
                                        }
                                    />

                                    <div className="postview-likes-form">
                                        <input
                                            placeholder="댓글 달기 ..."
                                            className="postview-likes-input"
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                        />

                                        <div
                                            onClick={handleDivClick}
                                            className="postview-likes-post"
                                        >
                                            게시
                                        </div>
                                    </div>
                                </div>
                                {isModalOpen("emojiPicker") && (
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen("edit") && (
                <PageEditModal
                    onClose={() => closeModal("edit")}
                    allUserProfiles={allUserProfiles}
                    post={currentPost}
                    onUpdatePost={handleUpdatePost}
                />
            )}
        </>
    );
};

export default PostViewModal;
