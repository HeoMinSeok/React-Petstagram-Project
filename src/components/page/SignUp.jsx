import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import Button from "../ui/Button";
import UserService from "../service/UserService";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
    });

    useEffect(() => {
        if (
            userData.email.trim() !== "" &&
            userData.name.trim() !== "" &&
            userData.phone.trim() !== "" &&
            userData.password.trim() !== ""
        ) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [userData.email, userData.name, userData.phone, userData.password]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            setUserData({ ...userData, [name]: formatPhoneNumber(value) });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, "");
        let formattedNumber = "";

        if (numbers.length <= 3) {
            formattedNumber = numbers;
        } else if (numbers.length <= 7) {
            formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(
                3,
                7
            )}-${numbers.slice(7, 11)}`;
        }

        return formattedNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userData);
        try {
            await UserService.signup(userData);
            setUserData({
                name: "",
                email: "",
                phone: "",
                password: "",
            });
            alert("회원가입 완료");
            navigate("/");
        } catch (error) {
            setErrorMessage(error.response?.data || "회원가입에 실패했습니다.");
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
                                placeholder="이메일 주소"
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
                        <div className="form-group">
                            <input
                                type="text"
                                name="phone"
                                placeholder="휴대폰 번호"
                                value={userData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
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
                        <button
                            type="submit"
                            className={`signup-submit ${
                                isButtonEnabled ? "enabled" : "disabled"
                            }`}
                        >
                            가입
                        </button>
                    </form>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </div>
                <div className="login-section">
                    <div className="login-box">
                        <p>
                            계정이 있으신가요?{" "}
                            <a href="/" className="login-link">
                                로그인
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
