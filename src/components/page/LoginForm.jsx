import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import facebook_logo from "/src/assets/facebook.png";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate("/userinfo");
        } catch (error) {
            console.error("로그인 실패:", error.message);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h1>Petstagram</h1>
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="전화번호, 사용자 이름 또는 이메일"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={handleLogin}>
                            로그인
                        </button>
                    </form>
                    <div className="or-separator">
                        <div className="line"></div>
                        <div className="or-text">또는</div>
                        <div className="line"></div>
                    </div>
                    <div className="facebook-login">
                        <img src={facebook_logo} alt="Facebook 로고" />
                        <a href="#">Facebook으로 로그인</a>
                    </div>

                    <div className="forgot-password">
                        <a href="#">비밀번호를 잊으셨나요?</a>
                    </div>
                </div>
            </div>
            <div className="signup-section">
                <div className="signup-box">
                    <p>
                        계정이 없으신가요?{" "}
                        <Link to="/signup" className="signup-link">
                            가입하기
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
