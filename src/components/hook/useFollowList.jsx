import { useState, useEffect, useCallback } from "react";
import UserService from "../service/UserService";
import BasicImage from "../../assets/basic-profile.jpeg";

const useFollowList = (userId) => {
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const token = localStorage.getItem("token");

    const getProfileImageUrl = (profileImage) => {
        if (profileImage && profileImage.imageUrl) {
            return `http://localhost:8088/uploads/${profileImage.imageUrl}`;
        }
        return BasicImage;
    };

    const fetchFollowers = useCallback(async () => {
        try {
            let response;
            if (userId) {
                // 다른 사용자의 팔로워 리스트 가져오기
                response = await UserService.getFollowersByUserId(userId, token);
            } else {
                // 현재 사용자의 팔로워 리스트 가져오기
                response = await UserService.getFollowers(token);
            }

            const followersWithProfileImageUrls = response.map((follower) => ({
                ...follower,
                profileImageUrl: getProfileImageUrl(follower.profileImage),
            }));

            setFollowers(followersWithProfileImageUrls);
        } catch (error) {
            console.error("팔로워 목록을 가져오는 데 실패했습니다:", error);
        }
    }, [userId, token]);

    const fetchFollowings = useCallback(async () => {
        try {
            let response;
            if (userId) {
                // 다른 사용자의 팔로잉 리스트 가져오기
                response = await UserService.getFollowingsByUserId(userId, token);
            } else {
                // 현재 사용자의 팔로잉 리스트 가져오기
                response = await UserService.getFollowings(token);
            }

            const followingsWithProfileImageUrls = response.map((following) => ({
                ...following,
                profileImageUrl: getProfileImageUrl(following.profileImage),
            }));

            setFollowings(followingsWithProfileImageUrls);
        } catch (error) {
            console.error("팔로잉 목록을 가져오는 데 실패했습니다:", error);
        }
    }, [userId, token]);


    useEffect(() => {
        fetchFollowers();
        fetchFollowings();
    }, [fetchFollowers, fetchFollowings]);

    return { fetchFollowers, fetchFollowings, followers, followings };
};

export default useFollowList;
