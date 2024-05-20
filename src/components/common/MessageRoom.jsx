import React from "react";
import "./MessageRoom.css";

const MessageRoom = () => {
    return (
        <div className="messageroom">
            <div className="user_container">
                <img className="profile_image1" />
                <div className="user_name_one">User_Name</div>
                <img className="profile_detail" src="../src/assets/message/material-symbols_info-outline.png" alt="Info Icon" />
            </div>

            <div className="user_info">
                <img className="profile_image2" />
                <div className="user_name_two">User_Name</div>
                <div className="user_status">user_name • petstagram</div>
                <button className="profile_btn">프로필 보기</button>
            </div>

            <div className="text_section">
                <div className="text">text</div>
            </div>

            <div className="input_section">
                <img className="smile_icon" src="../src/assets/message/smile.png" alt="smile icon" />
                <input className="input_message" placeholder="메시지 입력 .." />
                <img className="mic_icon" src="../src/assets/message/bi_mic.png" alt="mic icon" />
                <img className="image_icon" src="../src/assets/message/mynaui_image.png" alt="image icon" />
            </div>
        </div>
    );
};

export default MessageRoom;
