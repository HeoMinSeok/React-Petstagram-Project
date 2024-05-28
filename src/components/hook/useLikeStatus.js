import { useState, useEffect, useCallback } from "react";
import usePost from "./usePost";

const useLikeStatus = (postId) => {
    const { updateLikeStatus, toggleLikeStatus } = usePost();
    const [postLiked, setPostLiked] = useState(false);
    const [postLikesCount, setPostLikesCount] = useState(0);

    const fetchLikeStatus = useCallback(async () => {
        const { postLiked, postLikesCount } = await updateLikeStatus(postId);
        setPostLiked(postLiked);
        setPostLikesCount(postLikesCount);
    }, [postId, updateLikeStatus]);

    useEffect(() => {
        fetchLikeStatus();
    }, [fetchLikeStatus]);

    const handleLikeClick = useCallback(async () => {
        const likeChange = await toggleLikeStatus(postId, postLiked);
        setPostLiked(!postLiked);
        setPostLikesCount((prevCount) => prevCount + likeChange);
    }, [postId, postLiked, toggleLikeStatus]);

    return { postLiked, postLikesCount, handleLikeClick };
};

export default useLikeStatus;
