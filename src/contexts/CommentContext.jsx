import React, {
    createContext,
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import CommentService from "../components/service/CommentService";
import usePost from "../components/hook/usePost";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const { postList = [] } = usePost();
    const [commentList, setCommentList] = useState([]);
    const [commentSuccess, setCommentSuccess] = useState(false);

    /* 댓글 전체 조회 */
    const fetchAllComments = useCallback(async () => {
        try {
            const comments = await Promise.all(
                postList.map(async (post) => {
                    const postComments = await CommentService.getCommentList(
                        post.id
                    );
                    return { postId: post.id, comments: postComments };
                })
            );
            setCommentList(comments);
        } catch (error) {
            console.error("댓글 리스트 오류:", error);
        }
    }, [postList]);

    useEffect(() => {
        if (postList.length > 0) {
            fetchAllComments();
        }
    }, [postList, fetchAllComments]);

    /* 댓글 작성 */
    const submitComment = useCallback(async (postId, commentText) => {
        if (commentText.trim() === "") return;

        const commentData = {
            commentContent: commentText,
            id: postId,
        };

        try {
            await CommentService.createPost(commentData, postId);
            setCommentSuccess(true);
        } catch (error) {
            console.log("댓글을 작성하는 중 오류가 발생했습니다.", error);
        }
    }, []);

    useEffect(() => {
        if (commentSuccess) {
            fetchAllComments();
            setCommentSuccess(false);
        }
    }, [commentSuccess, fetchAllComments]);

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

    return (
        <CommentContext.Provider
            value={{
                commentList,
                setCommentList,
                setCommentSuccess,
                fetchAllComments,
                submitComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export { CommentContext };
