import React from 'react';
import styled from 'styled-components';

const MoreModalContainer = styled.div`
    width: 300px;
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    z-index: 10;
    text-align: center;
`;

const MoreOption = styled.div`
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    &:last-child {
        border-bottom: none;
    }
    &:hover {
        background-color: #f0f0f0;
    }
    &.moreoption-remove {
        color: red;
    }
    &.moreoption-unfollow {
        color: red;
    }
`;

const MoreModal = ({ options }) => {

    if (!Array.isArray(options)) {
        options = [];
    }

    return (
        <MoreModalContainer onClick={(e) => e.stopPropagation()}>
            {options.map((option, index) => (
                <MoreOption
                    key={index}
                    className={option.className}
                    onClick={option.onClick}
                >
                    {option.label}
                </MoreOption>
            ))}
        </MoreModalContainer>
    );
};

export default MoreModal;