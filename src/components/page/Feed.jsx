import "./Feed.css";
import commentIcon from "../../assets/feed/feed-comment.png";
import heartIcon from "../../assets/feed/feed-heart.png";
import shareIcon from "../../assets/feed/feed-share.png";
import bookmarkIcon from "../../assets/feed/feed-save.png";
import moreIcon from "../../assets/feed/feed-more.png";
import BasicImage from "../../assets/basic-profile.jpeg";
import GetRelativeTime from "../../utils/GetRelativeTime";
import { useState, useEffect } from "react";
import CommentService from "../service/CommentService";
import PostService from "../service/PostService";

const Feed = ({
    writer,
    postdate,
    postContent,
    images,
    allUserProfiles,
    postId,
    postLikesCount,
}) => {
    const uploadPostTime = GetRelativeTime(postdate);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(postLikesCount);

    const getImageUrl = (image) => {
        return `http://localhost:8088/uploads/${image.imageUrl}`; 
    };

    const getProfileImageUrlForWriter = (email) => {
        const user = allUserProfiles.find((user) => user.email === email);
        if (user && user.profileImageUrl) {
            return user.profileImageUrl;
        }
        return BasicImage; 
    };

    const profileImageUrl = getProfileImageUrlForWriter(writer);

    // 좋아요 상태 및 개수 업데이트
    useEffect(() => {
        const updateLikeStatus = async () => {
            try {
                const { liked, likesCount } =
                    await PostService.getPostLikeStatus(postId); // 서버로부터 좋아요 상태와 개수를 받아옴
                setLiked(liked);
                setLikesCount(likesCount);
            } catch (error) {
                console.error(
                    "좋아요 정보를 불러오는 중 오류가 발생했습니다.",
                    error
                );
            }
        };

        updateLikeStatus();
        fetchComments(); 
    }, [postId]);

    // 좋아요 버튼 클릭 처리 함수
    const handleLikeClick = async () => {
        try {
            await PostService.togglePostLike(postId);

            // 좋아요 상태 반전
            const newLikesCount = !liked ? likesCount + 1 : likesCount - 1;
            setLiked(!liked);
            setLikesCount(newLikesCount);
        } catch (error) {
            console.error("좋아요 상태 변경 중 오류가 발생했습니다.", error);
        }
    };

    // 댓글 목록을 불로오는 함수
    const fetchComments = async () => {
        try {
            const commentList = await CommentService.getCommentList(postId);
            setComments(commentList);
        } catch (error) {
            console.log("댓글을 불로오는 중 오류가 발생했습니다.", error);
        }
    };

    // 댓글 작성하는 함수
    const submitComment = async (e) => {
        e.preventDefault();
        if (commentText.trim() === "") return; // 빈 댓글 방지

        const commentData = {
            commentContent: commentText,
            id: postId,
        };

        try {
            await CommentService.createPost(commentData, postId);
            setCommentText(""); // 댓글 입력 필드 비우기
            fetchComments(); // 댓글 작성 후 목록 새로고침
        } catch (error) {
            console.log("댓글을 작성하는 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <div className="feed">
            <div className="feed-frame">
                <div className="feed-info">
                    <img className="feed-profile-img" src={profileImageUrl} />
                    <div className="feed-writer-name">{writer}</div>
                    <div className="feed-writer-date">{uploadPostTime}</div>
                    <div className="feed-more">
                        <button className="more-btn">
                            <img className="ellipse" src={moreIcon}></img>
                        </button>
                    </div>
                </div>
                {images && images.length > 0 && (
                    <div className="feed-post-photos">
                        {images.map((image, index) => (
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
                            className="heart_img"
                            alt="좋아요"
                            src={heartIcon}
                            onClick={handleLikeClick}
                        />
                        <img className="share_img" alt="공유" src={shareIcon} />
                        <img
                            className="comment_img"
                            alt="댓글"
                            src={commentIcon}
                        />
                    </div>
                    <img
                        className="bookmark-img"
                        alt="저장"
                        src={bookmarkIcon}
                    />
                </div>
                <div className="feed-post-info">
                    <div className="feed-heart-count">
                        좋아요 {likesCount}개
                    </div>
                    <div>
                        {/* 작성자 아이디 추가하기 */}
                        <p className="feed-post-content">
                            {postContent}
                            <span className="feed-post-more"> 더 보기</span>
                        </p>
                    </div>

                    <div className="feed-comment-more">
                        <span>댓글 {comments.length}개 모두 보기</span>
                    </div>
                    <div className="feed-comments">
                        {comments.map((comment, index) => (
                            <div key={index} className="feed-comment-item">
                                <span>{comment.commentEmail}</span>:
                                {comment.commentContent}
                            </div>
                        ))}
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
                        {/* <span style={{ fontSize: 18 }}>☺︎</span> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feed;
