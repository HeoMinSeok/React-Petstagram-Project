import "./Message.css";
import useAllUserProfile from "../hook/useAllUserProfile";
import MessageList from "../common/MessageList";
import MessageRoom from "../common/MessageRoom";

const Message = () => {
    const { allUserProfiles } = useAllUserProfile();

    return (
        <div className="message-container">
            <MessageList allUserProfiles={allUserProfiles} />
            <MessageRoom allUserProfiles={allUserProfiles} />
        </div>
    );
};

export default Message;
