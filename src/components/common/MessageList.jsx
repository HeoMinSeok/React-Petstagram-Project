import React from "react";
import "./MessageList.css";

const MessageList = () => {
    const messages = [
        { id: 1, user: "User_Name", text: "text · 00분", image: "" },
    ];

    return (
        <div className="messagelist">
            <div className="title_div">
                <h2 className="title_section">메시지</h2>
                <img className="message_edit" src="../src/assets/message/message_edit.png" alt="edit icon" />
            </div>

            {messages.map((message) => (
                <div key={message.id} className="message_item">
                    <div className="post-ellipse" />
                    <img className="ellipse" />
                    <div className="message_info">
                        <div className="user_name">{message.user}</div>
                        <div className="message_text">{message.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
