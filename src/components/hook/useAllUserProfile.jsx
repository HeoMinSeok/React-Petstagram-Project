import { useState, useEffect, useCallback } from "react";
import UserService from "../service/UserService";
import useUserProfile from "./useUserProfile";
import BasicImage from "../../assets/basic-profile.jpeg";

const useAllUserProfile = () => {
    const [allUserProfiles, setAllUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useUserProfile();

    const getProfileImageUrl = (profileImage) => {
        if (profileImage && profileImage.imageUrl) {
            return `http://localhost:8088/uploads/${profileImage.imageUrl}`;
        }
        return BasicImage;
    };

    const fetchAllUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("로그인이 필요합니다.");
            const users = await UserService.getAllUsers(token);

            const usersWithProfileImageUrls = users.map((user) => ({
                ...user,
                profileImageUrl: getProfileImageUrl(user.profileImage),
            }));

            setAllUserProfiles(usersWithProfileImageUrls);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            fetchAllUsers();
        }
    }, [isLoggedIn, fetchAllUsers]);

    return { allUserProfiles, loading, error, fetchAllUsers };
};

export default useAllUserProfile;
