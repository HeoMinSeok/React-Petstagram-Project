import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import Button from "../ui/Button";

const SignUp = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async () => {
        const userData = {
            email: userEmail,
            name: userName,
            id: userId,
            password: userPw,
        };

        axios
            .post("/api/users/signup", userData) 
            .then((response) => {
                console.log(response.data); 
                // 회원가입 성공 시 처리
            })
            .catch((error) => {
                console.error("Error during signup:", error);
                // 회원가입 실패 시 처리
            });
    };

    return (
        <>
            <div className="signup-container">
                <div className="signup-form">
                    <div className="signup-info">
                        <h1>Petstagram</h1>
                        <h4>반려견의 사진과 동영상을 보려면 가입하세요.</h4>
                    </div>
                    <div className="facebook-login">
                        <Button href="#" backgroundColor="#2593FF">
                            Facebook으로 로그인
                        </Button>
                    </div>
                    <div className="or-separator">
                        <div className="line"></div>
                        <div className="or-text">또는</div>
                        <div className="line"></div>
                    </div>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="휴대폰 번호 또는 이메일 주소"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="성명"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="사용자 이름"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={userPw}
                                onChange={(e) => setUserPw(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleSignUp}>가입</Button>
                    </form>
                </div>
            </div>
            <div className="login-section">
                <div className="login-box">
                    <p>
                        계정이 있으신가요?
                        <a href="#" className="login-link">
                            로그인
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
