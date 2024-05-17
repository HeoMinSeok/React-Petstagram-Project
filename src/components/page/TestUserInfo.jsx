// import React, { useState, useEffect } from "react";
// import UserService from "../service/UserService";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const TestUserInfo = ({ setIsLoggedIn }) => {
//     const [profileInfo, setProfileInfo] = useState({});
//     const navigate = useNavigate();

//     // 로드 될때마다 토큰과 로그인 유지
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             const currentTime = Date.now() / 1000; // 현재 시간을 초로 변환
//             if (decodedToken.exp < currentTime) {
//                 // 토큰 만료 시 로그아웃 처리
//                 alert("세션이 만료되었습니다. 다시 로그인해주세요."); // 알림 표시
//                 handleLogout(); // 로그아웃 처리
//                 return;
//             }
//         }
//         fetchProfileInfo();
//     }, []);

//     const fetchProfileInfo = async () => {
//         try {
//             const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//             const response = await UserService.getYourProfile(token);
//             setProfileInfo(response.userEntity);
//         } catch (error) {
//             console.error("프로필 정보를 가져오는 중 오류 발생:", error);
//         }
//     };

//     const handleLogout = () => {
//         const confirmDelete = window.confirm("로그아웃 하시겠습니까?");
//         if (confirmDelete) {
//             // 로컬 스토리지에서 토큰 삭제 및 로그아웃 처리
//             UserService.logout();
//             setIsLoggedIn(false);
//         }
//     };

//     return (
//         <div>
//             {profileInfo ? (
//                 <>
//                     <p>현재 로그인된 아이디: {profileInfo.name}</p>
//                     <button onClick={handleLogout}>로그아웃</button>
//                 </>
//             ) : (
//                 <p>
//                     로그인이 필요합니다.{" "}
//                     <Link to="/login">로그인하러 가기</Link>
//                 </p>
//             )}
//         </div>
//     );
// };

// export default TestUserInfo;
