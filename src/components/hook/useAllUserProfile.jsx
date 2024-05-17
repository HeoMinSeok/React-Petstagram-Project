import { useState, useEffect } from "react";
import UserService from "../service/UserService";

const useAllUserProfile = () => {
    const [allUserProfiles, setAllUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        fetchAllUsers();
    }, []);

    return { allUserProfiles, loading, error };
};

export default useAllUserProfile;
