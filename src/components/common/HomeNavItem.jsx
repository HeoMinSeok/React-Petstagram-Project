import "./HomeNavItem.css";

const HomeNavItem = ({ text, imgSrc, imgAlt, onClick}) => {
    return (
        <div className="frame-9" onClick={onClick}>
            <div className="frame-10">
                <div className="text-wrapper-6">{text}</div>
            </div>
            <div className="img-wrapper">
                <img className="img-2" alt={imgAlt} src={imgSrc} />
            </div>
        </div>
    );
};

export default HomeNavItem;
