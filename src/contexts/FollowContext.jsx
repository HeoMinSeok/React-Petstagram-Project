import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import UserService from "../components/service/UserService";
import useUser from "../components/hook/useUser";
import useAllUser from "../components/hook/useAllUser";

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
    const { allUserProfiles } = useAllUser();
    const { profileInfo } = useUser();
    const [followedUsers, setFollowedUsers] = useState({});

    const fetchFollowStatus = useCallback(async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const status = await UserService.getFollowStatus(userId, token);
            setFollowedUsers((prevState) => ({
                ...prevState,
                [userId]: status,
            }));
        } catch (error) {
            console.error("팔로우 상태 가져오기 중 오류 발생:", error);
        }
    }, []);

    useEffect(() => {
        allUserProfiles.forEach((user) => {
            if (user.email !== profileInfo.email) {
                fetchFollowStatus(user.id);
            }
        });
    }, [allUserProfiles, profileInfo.email, fetchFollowStatus]);

    const handleFollow = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await UserService.follow(userId, token);
            setFollowedUsers((prevState) => ({
                ...prevState,
                [userId]: true,
            }));
        } catch (error) {
            console.error("팔로우 중 오류 발생:", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await UserService.unfollow(userId, token);
            setFollowedUsers((prevState) => ({
                ...prevState,
                [userId]: false,
            }));
        } catch (error) {
            console.error("언팔로우 중 오류 발생:", error);
        }
    };

    const handleDeleteFollower = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await UserService.deleteFollower(userId, token);
            setFollowedUsers((prevState) => ({
                ...prevState,
                [userId]: false,
            }));
        } catch (error) {
            console.error("팔로워 삭제 중 오류 발생:", error);
        }
    };

    const isFollowing = (userId) => followedUsers[userId] === true;

    return (
        <FollowContext.Provider
            value={{
                fetchFollowStatus,
                followedUsers,
                handleFollow,
                handleUnfollow,
                handleDeleteFollower,
                isFollowing,
            }}
        >
            {children}
        </FollowContext.Provider>
    );
};

export { FollowContext };
