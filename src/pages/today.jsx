import { useLocation } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../UserContext";

export default function Today() {
    const currentDay = dayjs();
    const { userData } = useContext(UserContext);
    console.log(userData);

    return (
        <TodayContainer>
            <>
                <DayInfo>
                    {dayjs().locale("pt-br").format("dddd, DD/MM")}
                </DayInfo>
                <DayProgress>Nenhum hábito concluído ainda</DayProgress>
            </>
        </TodayContainer>
    );
}
const TodayContainer = styled.div`
    padding: 100px 18px;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    text-align: left;
    color: #293845;
    min-height: 100vh;
    max-width: 100%;
    background-color: #f2f2f2;
`;

const DayInfo = styled.div`
    color: #126ba5;
    font-size: 23px;
    text-transform: capitalize;
`;

const DayProgress = styled.div`
    color: #bababa;
    font-size: 18px;
    line-height: 30px;
`;
