import React, {
    createContext,
    useState,
    useCallback,
    useEffect,
    useContext,
} from "react";
import PostService from "../components/service/PostService";
import { UserContext } from "./UserContext";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const { isLoggedIn, profileInfo } = useContext(UserContext);
    const [postList, setPostList] = useState([]);
    const [postUserList, setPostUserList] = useState([]);
    const [postSuccess, setPostSuccess] = useState(false);

    const fetchPosts = useCallback(async () => {
        try {
            const posts = await PostService.getPostList();
            setPostList(posts);
        } catch (error) {
            console.error("게시글을 가져오는 중 오류 발생:", error);
        }
    }, []);

    const fetchUserPosts = useCallback(async () => {
        if (isLoggedIn && profileInfo && profileInfo.id) {
            try {
                const postUserList = await PostService.getPostsByUserId(
                    profileInfo.id
                );
                setPostUserList(postUserList);
            } catch (error) {
                console.error(
                    "사용자가 작성한 게시물을 가져오는 중 오류 발생:",
                    error
                );
            }
        }
    }, [isLoggedIn, profileInfo]);

    /* 특정 게시물 좋아요 상태 및 갯수 들고옴 */
    const updateLikeStatus = useCallback(async (postId) => {
        try {
            const { postLiked, postLikesCount } =
                await PostService.getPostLikeStatus(postId);
            return { postLiked, postLikesCount };
        } catch (error) {
            console.error(
                "좋아요 정보를 불러오는 중 오류가 발생했습니다.",
                error
            );
            return { postLiked: false, postLikesCount: 0 };
        }
    }, []);

    /* 좋아요 상태 토글 */
    const toggleLikeStatus = useCallback(async (postId, postLiked) => {
        try {
            await PostService.togglePostLike(postId);
            return postLiked ? -1 : 1;
        } catch (error) {
            console.error("좋아요 상태 변경 중 오류가 발생했습니다.", error);
            return 0;
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchPosts();
        }
    }, [isLoggedIn, fetchPosts]);

    useEffect(() => {
        if (isLoggedIn && profileInfo && profileInfo.id) {
            fetchUserPosts();
        }
    }, [isLoggedIn, profileInfo, fetchUserPosts, postSuccess]);

    useEffect(() => {
        if (postSuccess) {
            fetchPosts();
            setPostSuccess(false);
        }
    }, [postSuccess, fetchPosts]);

    return (
        <PostContext.Provider
            value={{
                postList,
                postUserList,
                setPostList,
                setPostSuccess,
                updateLikeStatus,
                toggleLikeStatus,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};

export { PostContext };
