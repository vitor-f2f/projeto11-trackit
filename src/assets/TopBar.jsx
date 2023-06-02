import React, { useContext } from "react";
import styled from "styled-components";
import UserContext from "../UserContext";

export default function TopBar() {
    const { userData } = useContext(UserContext);
    return (
        <>
            <TopContainer>
                <span>TrackIt</span>
                <img src={userData.userImage} alt="" />
            </TopContainer>
        </>
    );
}

const TopContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #126ba5;
    font-family: "Playball";
    font-size: 39px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    span {
        margin-left: 18px;
    }
    img {
        margin-right: 18px;
        border-radius: 50px;
        height: 51px;
        width: 51px;
    }
`;
