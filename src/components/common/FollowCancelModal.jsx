import React from "react";
import "./FollowCancelModal.css";

const FollowCancelModal = ({ isOpen, onClose, user, onUnfollow }) => {
    if (!isOpen) return null;

    return (
        <div className="followcanclemodal-overlay">
            <div className="followcanclemodal_div">
                <div className="followcanclemodal_header">
                    <img src={user.profileImageUrl || "https://via.placeholder.com/150"} alt="프로필" />
                </div>
                <div className="followcanclemodal_body">
                    <p>
                        생각이 바뀌면 {user.name}님의 팔로우를 다시 요청할 수 있습니다.
                    </p>
                </div>
                <div className="followcanclemodal_footer">
                    <button
                        className="followcanclemodal_cancel-btn"
                        onClick={() => {
                            onUnfollow(user.id);
                            onClose();
                        }}
                    >
                        팔로우 취소
                    </button>
                </div>
                <div className="followcanclemodal_footer">
                    <button
                        className="followcanclemodal_close-btn"
                        onClick={onClose}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FollowCancelModal;