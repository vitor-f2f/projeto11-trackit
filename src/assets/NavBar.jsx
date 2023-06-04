import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UserContext from "../UserContext";

export default function NavBar() {
    const { userData } = useContext(UserContext);
    const donepct = userData.donepct || 0;

    return (
        <>
            <NavContainer data-test="menu">
                <Link
                    to={`/habitos`}
                    className="bar-text"
                    data-test="habit-link"
                >
                    Hábitos
                </Link>
                <BarButton>
                    <Link to={`/hoje`} data-test="today-link">
                        <ProgBar>
                            <CircularProgressbar
                                value={donepct}
                                text="Hoje"
                                strokeWidth={10}
                                styles={{
                                    root: { width: "79px", height: "79px" },
                                    path: {
                                        stroke: "#FFFFFF",
                                        strokeLinecap: "round",
                                    },
                                    trail: { stroke: "#52b6ff" },
                                    text: { fill: "#FFFFFF", fontSize: "24px" },
                                }}
                            ></CircularProgressbar>
                        </ProgBar>
                    </Link>
                </BarButton>
                <Link
                    to={`/historico`}
                    className="bar-text"
                    data-test="history-link"
                >
                    Histórico
                </Link>
            </NavContainer>
        </>
    );
}

const NavContainer = styled.div`
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: white;
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    .bar-text {
        cursor: pointer;
        color: #52b6ff;
        padding-left: 36px;
        padding-right: 31px;
        text-decoration: none;
    }
`;

const BarButton = styled.button`
    cursor: pointer;
    width: 91px;
    height: 91px;
    margin-bottom: 42px;
    border-radius: 91px;
    background-color: #52b6ff;
    color: white;
    border: none;
    padding: 0;
    position: relative;

    a {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const ProgBar = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
