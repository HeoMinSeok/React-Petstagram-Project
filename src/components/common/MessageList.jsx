import React, { useState } from "react";
import "./MessageList.css";
import styled from "styled-components";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    background: white;
    padding: 0;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 580px;
    width: 90%;
    max-height: 100vh;
    height: 80%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    position: relative;
    margin-top: 30px;
`;

const Title = styled.h4`
    font-size: 17px;
    text-align: center;
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 30px;
`;

const CloseIcon = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    margin-bottom: 30px;
`;

const Body = styled.div`
    padding: 20px;
    flex-grow: 1;
    margin-top: 15px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const InputLabel = styled.label`
    margin-right: 10px;
    white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 함 */
`;

const InputField = styled.input`
    flex-grow: 1;
    padding: 10px;
`;

const MessageText = styled.p`
    margin-top: 30px;
    color: grey;
    font-size: 14px;
`;

const SelectButton = styled.button`
    width: calc(100% - 40px);
    padding: 10px;
    background-color: #d3e8ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px auto; /* 가운데 정렬을 위해 auto 사용 */
    font-size: 16px;
    text-align: center;
`;

const MessageList = ({ allUserProfiles }) => {
    const userProfilesArray = Array.isArray(allUserProfiles)
        ? allUserProfiles
        : [];
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOpen = () => {
        setShowModal(true);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const getSearchUsers = () => {
        if (searchText === "") {
            return [];
        }
        return userProfilesArray.filter(
            (user) =>
                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                (user.name &&
                    user.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    };

    const searchResults = getSearchUsers();

    const mockdata = [
        { id: 1, user: "User_Name", text: "text · 00분", image: "" },
    ];

    return (
        <div className="messagelist">
            <div className="Message_title_div">
                <h2 className="Message_title_section">메시지</h2>
                <img
                    className="Message_message_edit"
                    src="../src/assets/message/message_edit.png"
                    alt="edit icon"
                    onClick={handleOpen}
                />
            </div>

            {mockdata.map((message) => (
                <div key={message.id} className="Message_message_item">
                    <div className="Message_post-ellipse" />
                    <img className="Message_ellipse" />
                    <div className="Message_message_info">
                        <div className="Message_user_name">{message.user}</div>
                        <div className="Message_message_text">
                            {message.text}
                        </div>
                    </div>
                </div>
            ))}

            {showModal && (
                <Overlay>
                    <Content>
                        <Header>
                            <Title>새로운 메시지</Title>
                            <CloseIcon
                                src="../src/assets/message/message_close.png"
                                alt="Close"
                                onClick={handleOpen}
                            />
                        </Header>
                        <Body>
                            <InputContainer>
                                <InputLabel>받는 사람 :</InputLabel>
                                <InputField
                                    type="text"
                                    placeholder="검색..."
                                    value={searchText}
                                    onChange={handleSearchChange}
                                />
                            </InputContainer>
                            {searchText !== "" && (
                                <MessageText>
                                    {searchResults.length > 0
                                        ? searchResults.map((result, index) => (
                                              <div key={index}>
                                                  <input
                                                      type="checkbox"
                                                      checked={
                                                          selectedUser ===
                                                          result
                                                      }
                                                      onChange={() =>
                                                          handleUserSelect(
                                                              result
                                                          )
                                                      }
                                                  />
                                                  {result.email}
                                              </div>
                                          ))
                                        : "계정을 찾을 수 없습니다."}
                                </MessageText>
                            )}
                        </Body>
                        <SelectButton onClick={handleClose}>채팅</SelectButton>
                    </Content>
                </Overlay>
            )}
            {/* <CreateChatRoom show={showModal} onClose={handleClose} /> */}
        </div>
    );
};

export default MessageList;
