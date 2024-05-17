import "./Feed.css";
import commentIcon from "../../assets/feed/feed-comment.png";
import heartIcon from "../../assets/feed/feed-heart.png";
import shareIcon from "../../assets/feed/feed-share.png";
import bookmarkIcon from "../../assets/feed/feed-save.png";
import mock1 from "../../assets/7bok1.jpeg";
import mock2 from "../../assets/7bok2.jpeg";
import mock3 from "../../assets/7bok3.jpeg";

const Feed = ({ profileimg, username, postdate, postimg }) => {
    return (
        <div className="feed">
            <div className="feed-frame">
                <div className="feed-info">
                    <img className="feed-profile-img" src={mock1} />
                    <div className="feed-writer-name">{username}</div>
                    <div className="feed-writer-date">{postdate}</div>
                    <div className="feed-more">
                        <button className="more-btn">
                            <div className="ellipse" />
                            <div className="ellipse" />
                            <div className="ellipse" />
                        </button>
                    </div>
                </div>
                <img className="feed-post-photo" src={mock2} />
                <div className="feed-active">
                    <div className="feed-active-btn">
                        <img
                            className="heart_img"
                            alt="좋아요"
                            src={heartIcon}
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
                    <div className="feed-heart-count">좋아요 000개</div>
                    <div>
                        {/* 작성자 아이디 추가하기 */}
                        <p className="feed-post-content">
                            꽁꽁 얼어붙은 한강 위로 강아지가 걸어갑니다...
                            <span className="feed-post-more">더 보기</span>
                        </p>
                    </div>

                    <div className="feed-comment-more">
                        <span>댓글 0개 모두 보기</span>
                    </div>
                    <div className="feed-comment">
                        <input
                            type="text"
                            className="feed-comment-input"
                            placeholder="댓글 달기..."
                        />
                        <button type="submit" className="feed-comment-regi">
                            게시
                        </button>
                        {/* <span style={{ fontSize: 18 }}>☺︎</span> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
