import "./Feed.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hook/useUser";
import useAllUser from "../hook/useAllUser";
import usePost from "../hook/usePost";
import useLikeStatus from "../hook/useLikeStatus";
import icons from "../../assets/ImageList";
import GetRelativeTime from "../../utils/GetRelativeTime";
import CommentService from "../service/CommentService";

const Feed = ({ isFollowing, handleFollow, handleUnfollow }) => {
    const { postList = [] } = usePost();

    return (
        <div>
            {postList.map((post, index) => {
                return (
                    post &&
                    post.id && (
                        <FeedItem
                            key={post.id}
                            post={post}
                            isFollowing={isFollowing}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                    )
                );
            })}
        </div>
    );
};

const FeedItem = ({ post, isFollowing, handleFollow, handleUnfollow }) => {
    const { profileInfo } = useUser();
    const { allUserProfiles } = useAllUser();
    const { postLiked, postLikesCount, handleLikeClick } = useLikeStatus(
        post.id
    );
    const navigate = useNavigate();

    const uploadPostTime = GetRelativeTime(post.regTime);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const getImageUrl = (image) => {
        return `http://localhost:8088/uploads/${image.imageUrl}`;
    };

    const getProfileImageUrlForWriter = (email) => {
        const user = allUserProfiles.find((user) => user.email === email);
        if (user && user.profileImageUrl) {
            return user.profileImageUrl;
        }
        return icons.BasicImage;
    };

    const getUserIdByEmail = (email) => {
        const user = allUserProfiles.find((user) => user.email === email);
        return user ? user.id : null;
    };

    const writerId = getUserIdByEmail(post.email);
    const profileImageUrl = getProfileImageUrlForWriter(post.email);

    const handleUserClick = () => {
        if (profileInfo.email === post.email) {
            navigate(`/profile`);
        } else {
            navigate(`/friendfeed/${post.email}`);
        }
    };

    const fetchComments = async () => {
        try {
            const commentList = await CommentService.getCommentList(post.id);
            setComments(commentList);
        } catch (error) {
            console.log("댓글을 불러오는 중 오류가 발생했습니다.", error);
        }
    };

    const submitComment = async (e) => {
        e.preventDefault();
        if (commentText.trim() === "") return;

        const commentData = {
            commentContent: commentText,
            id: post.id,
        };

        try {
            await CommentService.createPost(commentData, post.id);
            setCommentText("");
            fetchComments();
        } catch (error) {
            console.log("댓글을 작성하는 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <div className="feed">
            <div className="feed-frame">
                <div className="feed-info">
                    <div className="feed-user-info" onClick={handleUserClick}>
                        <div>
                            <img
                                className="feed-profile-img"
                                src={profileImageUrl}
                                alt="프로필"
                            />
                        </div>
                        <div>
                            <div className="feed-writer-name">{post.email}</div>
                        </div>
                        <div>
                            <div className="feed-writer-date">
                                {"· " + uploadPostTime + " ·"}
                            </div>
                        </div>

                        {profileInfo.email !== post.email &&
                            writerId &&
                            (isFollowing(writerId) ? (
                                <button
                                    className="feed-user-following"
                                    onClick={(e) => {
                                        e.stopPropagation(); // 상위 div의 onClick 이벤트 전파를 막기 위해 사용
                                        handleUnfollow(writerId);
                                    }}
                                >
                                    팔로잉
                                </button>
                            ) : (
                                <button
                                    className="feed-user-follow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleFollow(writerId);
                                    }}
                                >
                                    팔로우
                                </button>
                            ))}
                    </div>

                    <div className="feed-more">
                        <button className="feed-more-btn">
                            <img
                                className="feed-more-img"
                                src={icons.moreIcon}
                                alt="더보기"
                            />
                        </button>
                    </div>
                </div>
                {post.imageList && post.imageList.length > 0 && (
                    <div className="feed-post-photos">
                        {post.imageList.map((image, index) => (
                            <img
                                key={index}
                                className="feed-post-photo"
                                src={getImageUrl(image)}
                                alt={`Post ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
                <div className="feed-active">
                    <div className="feed-active-btn">
                        <img
                            className={`heart_img ${postLiked ? "liked" : ""}`}
                            alt="좋아요"
                            src={
                                postLiked
                                    ? icons.heartFillIcon
                                    : icons.heartIcon
                            }
                            onClick={handleLikeClick}
                        />
                        <img
                            className="share_img"
                            alt="공유"
                            src={icons.postShareIcon}
                        />
                        <img
                            className="comment_img"
                            alt="댓글"
                            src={icons.commentIcon}
                        />
                    </div>
                    <img
                        className="bookmark-img"
                        alt="저장"
                        src={icons.bookmarkIcon}
                    />
                </div>
                <div className="feed-post-info">
                    <div className="feed-heart-count">
                        좋아요 {postLikesCount}개
                    </div>
                    <div>
                        <p className="feed-post-content">
                            {post.postContent}
                            <span className="feed-post-more"> 더 보기</span>
                        </p>
                    </div>

                    <div className="feed-comment-more">
                        <span>댓글 {comments.length}개 모두 보기</span>
                    </div>
                    <form className="feed-comment" onSubmit={submitComment}>
                        <input
                            type="text"
                            className="feed-comment-input"
                            placeholder="댓글 달기..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button type="submit" className="feed-comment-regi">
                            게시
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feed;
