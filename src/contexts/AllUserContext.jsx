import React, { createContext, useState, useEffect, useCallback } from "react";
import useUser from "../components/hook/useUser";
import UserService from "../components/service/UserService";
import BasicImage from "../assets/basic-profile.jpeg";

const AllUserContext = createContext();

export const AllUserProvider = ({ children }) => {
    const { isLoggedIn } = useUser();
    const [allUserProfiles, setAllUserProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <AllUserContext.Provider
            value={{ allUserProfiles, loading, error, fetchAllUsers }}
        >
            {children}
        </AllUserContext.Provider>
    );
};

export { AllUserContext };
