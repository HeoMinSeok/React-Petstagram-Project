import "./FriendNav.css";
import UserService from "../service/UserService";

const FriendNav = ({ setIsLoggedIn, profileInfo, allUserProfiles }) => {
    const userProfilesArray = Array.isArray(allUserProfiles) ? allUserProfiles : [];

    const handleLogout = () => {
        const confirmDelete = window.confirm("로그아웃 하시겠습니까?");
        if (confirmDelete) {
            // 로컬 스토리지에서 토큰 삭제 및 로그아웃 처리
            UserService.logout();
            setIsLoggedIn(false);
        }
    };

    return (
        <div className="friendnav">
            <div className="friendnav-user-info">
                <img className="ellipse-3" src={profileInfo.profileImageUrl}/>
                <div className="friendnav-user-profile">
                    <div className="friendnav-user-profile-wrapper">
                        <div className="friendnav-user-email">
                            {profileInfo.email}
                        </div>
                        <div className="friendnav-user-name">
                            {profileInfo.name}
                        </div>
                    </div>
                </div>
                <div className="friendnav-logout">
                    <div
                        className="friendnav-logout-btn"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </div>
                </div>
            </div>
            <div className="friendnav-recommend">
                <div className="friendnav-recommend-wrapper">
                    <div className="friendnav-recommend-text">
                        <div className="text-wrapper-8">회원님을 위한 추천</div>
                    </div>
                </div>
                <div className="frame-19">
                    <div className="text-wrapper-11">모두 보기</div>
                </div>
            </div>
            <div className="frame-20">
            {allUserProfiles
                    .filter(user => user.email !== profileInfo.email)
                    .map((user) => (
                        <div key={user.email} className="frame-21">
                            <img src={user.profileImageUrl} className="ellipse-3" alt="프로필 이미지" />
                            <div className="frame-13">
                                <div className="frame-14">
                                    <div className="text-wrapper-8">{user.email}</div>
                                    <div className="text-wrapper-9">회원님을 위한 추천</div>
                                </div>
                            </div>
                            <div className="frame-15">
                                <div className="text-wrapper-10">팔로우</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FriendNav;
