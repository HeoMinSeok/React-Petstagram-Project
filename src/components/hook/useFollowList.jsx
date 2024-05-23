import { useState, useEffect } from "react";
import UserService from "../service/UserService";
import BasicImage from "../../assets/basic-profile.jpeg";

const useFollowList = () => {
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const token = localStorage.getItem("token");

    const getProfileImageUrl = (profileImage) => {
        if (profileImage && profileImage.imageUrl) {
            return `http://localhost:8088/uploads/${profileImage.imageUrl}`;
        }
        return BasicImage;
    };

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await UserService.getFollowers(token);

                const followersWithProfileImageUrls = response.map((follower) => ({
                    ...follower,
                    profileImageUrl: getProfileImageUrl(follower.profileImage),
                }));

                setFollowers(followersWithProfileImageUrls);
            } catch (error) {
                console.error("팔로워 목록을 가져오는 데 실패했습니다:", error);
            }
        };

        fetchFollowers();
    }, [token]);

    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await UserService.getFollowings(token);

                const followingsWithProfileImageUrls = response.map((following) => ({
                    ...following,
                    profileImageUrl: getProfileImageUrl(following.profileImage),
                }));

                setFollowings(followingsWithProfileImageUrls);
            } catch (error) {
                console.error("팔로잉 목록을 가져오는 데 실패했습니다:", error);
            }
        };

        fetchFollowings();
    }, [token]);

    return { followers, followings };
};

export default useFollowList;
