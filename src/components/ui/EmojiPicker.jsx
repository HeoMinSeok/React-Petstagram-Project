import React from "react";
import styled from "styled-components";

const EmojiPickerModal = styled.div`
    position: relative;
    top: 30px;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
    width: 250px;
`;

const EmojiButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
`;

const EmojiTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

const EmojiList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const EmojiPicker = ({ onEmojiClick }) => (
    <EmojiPickerModal>
        <EmojiTitle>최고 인기 이모티콘</EmojiTitle>
        <EmojiList>
            {["🐥", "🐣", "🐤", "🐧", "🐦", "🐰", "🐹"].map((emoji) => (
                <EmojiButton key={emoji} onClick={() => onEmojiClick(emoji)}>
                    {emoji}
                </EmojiButton>
            ))}
        </EmojiList>
    </EmojiPickerModal>
);

export default EmojiPicker;
