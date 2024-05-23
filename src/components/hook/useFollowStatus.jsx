import { useState, useEffect } from 'react';
import UserService from '../service/UserService';

const useFollowStatus = (allUserProfiles, profileInfo) => {
    const [followedUsers, setFollowedUsers] = useState({});

    /* 팔로우 상태 useEffect */
    useEffect(() => {
        const fetchFollowStatus = async (userId) => {
            try {
                const token = localStorage.getItem('token');
                const status = await UserService.getFollowStatus(userId, token);
                setFollowedUsers(prevState => ({
                    ...prevState,
                    [userId]: status
                }));
            } catch (error) {
                console.error("팔로우 상태 가져오기 중 오류 발생:", error);
            }
        };

        allUserProfiles.forEach(user => {
            if (user.email !== profileInfo.email) {
                fetchFollowStatus(user.id);
            }
        });
    }, [allUserProfiles, profileInfo.email]);

    const handleFollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await UserService.follow(userId, token);
            setFollowedUsers(prevState => ({
                ...prevState,
                [userId]: true
            }));
        } catch (error) {
            console.error("팔로우 중 오류 발생:", error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await UserService.unfollow(userId, token);
            setFollowedUsers(prevState => ({
                ...prevState,
                [userId]: false
            }));
        } catch (error) {
            console.error("언팔로우 중 오류 발생:", error);
        }
    };

    const isFollowing = (userId) => followedUsers[userId] === true;

    return {
        followedUsers,
        handleFollow,
        handleUnfollow,
        isFollowing,
    };
};

export default useFollowStatus;