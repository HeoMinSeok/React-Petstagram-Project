import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FindPassword.css";
import icons from "../../assets/ImageList";
import useAllUser from "../hook/useAllUser";

const FindPassword = () => {
    const { allUserProfiles } = useAllUser();
    const [step, setStep] = useState(1);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPhone, setConfirmPhone] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        if (confirmEmail.trim() !== "" && confirmPhone.trim() !== "") {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    }, [confirmEmail, confirmPhone]);

    const isPhoneNumberValid = (phoneNumber) => {
        const phoneRegex = /^\d{10,11}$/;
        return phoneRegex.test(phoneNumber);
    };

    const removeHyphens = (phoneNumber) => {
        return phoneNumber ? phoneNumber.replace(/-/g, "") : "";
    };

    const sendVerificationCode = async () => {
        if (!isPhoneNumberValid(confirmPhone)) {
            alert(
                "올바른 전화번호 형식이 아닙니다. 10자리 또는 11자리 숫자를 입력하세요."
            );
            return;
        }

        const user = allUserProfiles.find(
            (user) =>
                user.email === confirmEmail &&
                removeHyphens(user.phone) === confirmPhone
        );

        if (!user) {
            alert(
                "입력한 사용자 이메일과 전화번호가 일치하지 않습니다."
            );
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8088/api/sms/send-one",
                {
                    from: confirmPhone,
                    to: confirmPhone,
                },
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                setVerificationCode(response.data.verificationCode);
                setStep(2);
            } else {
                console.error("인증 코드 오류", response.data);
            }
        } catch (error) {
            console.error("인증 코드 전송 오류", error);
        }
    };

    const checkSMS = () => {
        if (inputCode === verificationCode) {
            setStep(3);
        } else {
            /* SweetAlert 커스텀하기 */
            alert("유효하지 않은 코드입니다.");
        }
    };

    const resetPassword = async () => {
        /* 미구현 */
    };

    return (
        <div className="find-password-container">
            {step === 1 && (
                <div className="reset-box">
                    <div className="image-section">
                        <img
                            src={icons.lockIcon}
                            className="lock-image"
                            alt="Lock Icon"
                        />
                    </div>
                    <h2>로그인에 문제가 있나요?</h2>
                    <p>
                        이메일 주소 또는 사용자 이름과 가입하신 번호를
                        입력하시면 계정에 다시 액세스할 수 있도록 인증 문자를
                        보내드립니다.
                    </p>
                    <form className="find-password-form">
                        <input
                            type="text"
                            placeholder="사용자 이메일"
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            className="input-field find-password"
                        />
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={confirmPhone}
                            onChange={(e) => setConfirmPhone(e.target.value)}
                            className="input-field find-password"
                        />
                        <button
                            type="button"
                            onClick={sendVerificationCode}
                            className={`reset-button find-password ${
                                isButtonEnabled ? "enabled" : "disabled"
                            }`}
                            disabled={!isButtonEnabled}
                        >
                            인증 코드 보내기
                        </button>
                    </form>
                    <div className="extra-options">
                        <div className="or-separator">
                            <div className="line"></div>
                            <div className="or-text">또는</div>
                            <div className="line"></div>
                        </div>
                        <Link to="/signup" className="signup-link">
                            새 계정 만들기
                        </Link>
                    </div>
                    <Link to="/login" className="back-to-login">
                        로그인으로 돌아가기
                    </Link>
                </div>
            )}
            {step === 2 && (
                <div className="find-password-step">
                    <h2>인증 코드 입력</h2>
                    <input
                        type="text"
                        placeholder="인증 코드"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="input-field find-password"
                    />
                    <button
                        onClick={checkSMS}
                        className="reset-button find-password"
                    >
                        인증 코드 확인
                    </button>
                </div>
            )}
            {step === 3 && (
                <div className="find-password-step">
                    <h2>비밀번호 재설정</h2>
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field find-password"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input-field find-password"
                    />
                    <button
                        onClick={resetPassword}
                        className="reset-button find-password"
                    >
                        비밀번호 변경
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindPassword;
