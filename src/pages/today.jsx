import { useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import UserContext from "../UserContext";

export default function Today() {
    const { userData } = useContext(UserContext);

    console.log(userData);

    return <PageContainer></PageContainer>;
}
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    font-size: 24px;
    text-align: center;
    color: #293845;
`;
