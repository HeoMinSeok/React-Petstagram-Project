import "./FriendNav.css";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserService from "../service/UserService";

const FriendNav = ({ setIsLoggedIn }) => {
    const [profileInfo, setProfileInfo] = useState({});

    // 로드 될때마다 토큰과 로그인 유지
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // 토큰 만료 시 로그아웃 처리
                alert("세션이 만료되었습니다. 다시 로그인해주세요."); // 알림 표시
                UserService.logout();
                setIsLoggedIn(false);
                return;
            }
        }
        fetchProfileInfo();
    }, [setIsLoggedIn]);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.userEntity);
        } catch (error) {
            console.error("프로필 정보를 가져오는 중 오류 발생:", error);
        }
    };

    const handleLogout = () => {
        const confirmDelete = window.confirm("로그아웃 하시겠습니까?");
        if (confirmDelete) {
            // 로컬 스토리지에서 토큰 삭제 및 로그아웃 처리
            UserService.logout();
            setIsLoggedIn(false);
        }
    };

    return (
        <div className="frame-11">
            <div className="frame-12">
                <div className="ellipse-3" />
                <div className="frame-13">
                    <div className="frame-14">
                        <div className="text-wrapper-8">
                            {profileInfo.email}
                        </div>
                        <div className="text-wrapper-9">{profileInfo.name}</div>
                    </div>
                </div>
                <div className="frame-15">
                    <div className="text-wrapper-10" onClick={handleLogout}>
                        로그아웃
                    </div>
                </div>
            </div>
            <div className="frame-16">
                <div className="frame-17">
                    <div className="frame-18">
                        <div className="text-wrapper-8">회원님을 위한 추천</div>
                    </div>
                </div>
                <div className="frame-19">
                    <div className="text-wrapper-11">모두 보기</div>
                </div>
            </div>
            <div className="frame-20">
                <div className="frame-21">
                    <div className="ellipse-3" />
                    <div className="frame-13">
                        <div className="frame-14">
                            <div className="text-wrapper-8">User_Name</div>
                            <div className="text-wrapper-9">text</div>
                        </div>
                    </div>
                    <div className="frame-15">
                        <div className="text-wrapper-10">User_Name</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendNav;
