import "./Message.css";
import MessageList from "../common/MessageList";
import MessageRoom from "../common/MessageRoom";

const Message = () => {
    return (
        <div className="message-container">
            <MessageList />
            <MessageRoom />
        </div>
    );
};

export default Message;
