import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserService from "../service/UserService";

const useUserProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated());
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                UserService.logout();
                setIsLoggedIn(false);
                return;
            } else {
                setIsLoggedIn(true);
                fetchProfileInfo();
            }
        }
    }, [isLoggedIn]);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response);
        } catch (error) {
            console.error("프로필 정보를 가져오는 중 오류 발생:", error);
        }
    };

    return { isLoggedIn, setIsLoggedIn, profileInfo };
};

export default useUserProfile;
