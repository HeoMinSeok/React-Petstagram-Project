import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const TestUserInfo = () => {
    const { loggedInUserId } = useAuth();

    return (
        <div>
            {loggedInUserId ? (
                <p>현재 로그인된 아이디: {loggedInUserId}</p>
            ) : (
                <p>
                    로그인이 필요합니다.{" "}
                    <Link to="/">로그인하러 가기</Link>
                </p>
            )}
        </div>
    );
};

export default TestUserInfo;
