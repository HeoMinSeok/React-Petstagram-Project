import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Button from "../ui/Button";
import UserService from "../service/UserService";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        name: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await UserService.signup(userData);
            setUserData({
                name: "",
                email: "",
                password: "",
            });
            alert("회원가입 완료");
            navigate("/");
        } catch (error) {
            setErrorMessage(error.response.data);
        }
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="email"
                                placeholder="휴대폰 번호 또는 이메일 주소"
                                value={userData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="사용자 이름"
                                value={userData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* <div className="form-group">
                              <input
                                  type="text"
                                  placeholder="사용자 이름"
                                  value={userId}
                                  onChange={(e) => setUserId(e.target.value)}
                              />
                          </div> */}
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={userData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button type="submit">가입</Button>
                    </form>
                </div>
            </div>
            <div className="login-section">
                <div className="login-box">
                    <p>
                        계정이 있으신가요?
                        <a href="/" className="login-link">
                            로그인
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignUp;
