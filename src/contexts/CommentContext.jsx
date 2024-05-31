import React, {
    createContext,
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import CommentService from "../components/service/CommentService";
import { UserContext } from "./UserContext";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);
    const [commentList, setCommentList] = useState([]);
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [currentPostIds, setCurrentPostIds] = useState(null);

    const fetchComments = useCallback(async (postIds) => {
        try {
            const comments = await Promise.all(
                postIds.map(async (postId) => {
                    const postComments = await CommentService.getCommentList(postId);
                    return postComments;
                })
            );
            setCommentList(comments.flat());
        } catch (error) {
            console.error("댓글 리스트 오류:", error);
        }
    }, []);

    /* 특정 댓글 좋아요 상태 및 갯수 들고옴 -> 추후 작성 */
    // const updateLikeStatus = useCallback(async (postId) => {
    //     try {
    //         const { postLiked, postLikesCount } =
    //             await PostService.getPostLikeStatus(postId);
    //         return { postLiked, postLikesCount };
    //     } catch (error) {
    //         console.error(
    //             "좋아요 정보를 불러오는 중 오류가 발생했습니다.",
    //             error
    //         );
    //         return { postLiked: false, postLikesCount: 0 };
    //     }
    // }, []);

    // /* 좋아요 상태 토글 */
    // const toggleLikeStatus = useCallback(async (postId, postLiked) => {
    //     try {
    //         await PostService.togglePostLike(postId);
    //         return postLiked ? -1 : 1;
    //     } catch (error) {
    //         console.error("좋아요 상태 변경 중 오류가 발생했습니다.", error);
    //         return 0;
    //     }
    // }, []);

    useEffect(() => {
        if (isLoggedIn && currentPostIds) {
            fetchComments(currentPostIds);
        }
    }, [isLoggedIn, currentPostIds, fetchComments]);

    useEffect(() => {
        if (commentSuccess && currentPostIds) {
            fetchComments(currentPostIds);
            setCommentSuccess(false);
        }
    }, [commentSuccess, currentPostIds, fetchComments]);

    return (
        <CommentContext.Provider
            value={{
                commentList,
                setCommentList,
                setCommentSuccess,
                setCurrentPostIds
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export { CommentContext };
