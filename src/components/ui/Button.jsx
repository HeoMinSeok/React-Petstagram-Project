import styled from "styled-components";

// 스타일을 적용한 버튼 컴포넌트 생성
const StyledButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${props => props.backgroundColor || "#7ab3f4"};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const Button = ({
    children,
    onClick,
    backgroundColor,
    color,
    borderStyle,
    borderColor,
}) => {
    return (
        <StyledButton
            onClick={onClick}
            backgroundColor={backgroundColor}
            color={color}
            borderStyle={borderStyle}
            borderColor={borderColor}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
