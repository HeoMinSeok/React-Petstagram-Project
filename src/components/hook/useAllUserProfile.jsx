import { useState, useEffect } from "react";
import UserService from "../service/UserService";
import useUserProfile from "./useUserProfile";

const useAllUserProfile = () => {
    const [allUserProfiles, setAllUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useUserProfile();

    const getProfileImageUrl = (profileImage) => {
        if (profileImage && profileImage.imageUrl) {
            return `http://localhost:8088/uploads/${profileImage.imageUrl}`;
        }
        return ""; // 기본 이미지 URL 또는 대체 이미지
    };


    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("로그인이 필요합니다.");
                const users = await UserService.getAllUsers(token);
                
                const usersWithProfileImageUrls = users.map(user => ({
                    ...user,
                    profileImageUrl: getProfileImageUrl(user.profileImage)
                }));
                
                setAllUserProfiles(usersWithProfileImageUrls);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (isLoggedIn) {
            setLoading(true);
            fetchAllUsers();
        }
    }, [isLoggedIn]);

    return { allUserProfiles, loading, error };
};

export default useAllUserProfile;
