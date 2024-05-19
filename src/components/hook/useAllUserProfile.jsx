import { useState, useEffect } from "react";
import UserService from "../service/UserService";
import useUserProfile from "./useUserProfile";

const useAllUserProfile = () => {
    const [allUserProfiles, setAllUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useUserProfile();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("로그인이 필요합니다.");
                const users = await UserService.getAllUsers(token);
                setAllUserProfiles(users);
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
