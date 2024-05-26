import { useState, useEffect, useCallback } from "react";
import PostService from "../service/PostService";

const usePost = (isLoggedIn, profileInfo) => {
    const [postList, setPostList] = useState([]);
    const [postUserList, setPostUserList] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            const posts = await PostService.getPostList();
            setPostList(posts);
        } catch (error) {
            console.error("게시글을 가져오는 중 오류 발생:", error);
        }
    }, []);

    const fetchUserPosts = useCallback(async () => {
        if (isLoggedIn && profileInfo.id) {
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
    }, [isLoggedIn, profileInfo.id]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchPosts();
        }
    }, [isLoggedIn, fetchPosts]);

    useEffect(() => {
        if (isLoggedIn && profileInfo.id) {
            fetchUserPosts();
        }
    }, [isLoggedIn, profileInfo.id, fetchUserPosts]);

    return {
        postList,
        postUserList,
        setPostList,
        fetchPosts,
        fetchUserPosts,
    };
};

export default usePost;
