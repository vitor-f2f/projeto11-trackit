import { useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../UserContext";
import checkMark from "../assets/check.svg";

export default function Today() {
    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const userToken = userData.userToken;
    const tokenObj = {
        headers: { Authorization: `Bearer ${userToken}` },
    };
    function requestToday() {
        setLoading(true);
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            tokenObj
        );
        promise
            .then((res) => {
                setLoading(false);
                const habitsArr = res.data;
                setUserData({ ...userData, habits: habitsArr });
            })
            .catch((error) => {
                setLoading(false);
                alert(`Erro: ${error}`);
            });
    }
    useEffect(() => {
        requestToday();
    }, []);
    console.log(userData.habits);

    function toggleHabit(habitId, done) {
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${
                done ? "uncheck" : "check"
            }`,
            {},
            tokenObj
        );
        requestToday();
        promise
            .then((res) => {
                console.log("Sucesso:", res.data);
                requestToday();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <TodayContainer>
            <>
                <DayInfo data-test="today">
                    {dayjs().locale("pt-br").format("dddd, DD/MM")}
                </DayInfo>
                <DayProgress data-test="today-counter">
                    Nenhum hábito concluído ainda
                </DayProgress>
            </>
            <HabitsContainer data-test="today-habit-container">
                {userData.habits
                    ? userData.habits.map((h) => (
                          <HabitsItem key={h.id} done={h.done}>
                              <div className="text-container">
                                  <div
                                      className="title"
                                      data-test="today-habit-name"
                                  >
                                      {h.name}
                                  </div>
                                  <div
                                      className="current"
                                      data-test="today-habit-sequence"
                                  >
                                      Sequência atual:{" "}
                                      <span>
                                          {h.currentSequence}{" "}
                                          {h.currentSequence == 1
                                              ? `dia`
                                              : `dias`}
                                      </span>
                                  </div>
                                  <div
                                      className="record"
                                      data-test="today-habit-record"
                                  >
                                      Seu recorde:{" "}
                                      <span>
                                          {h.highestSequence}{" "}
                                          {h.highestSequence == 1
                                              ? `dia`
                                              : `dias`}
                                      </span>
                                  </div>
                              </div>
                              <button
                                  onClick={() => toggleHabit(h.id, h.done)}
                                  data-test="today-habit-check-btn"
                              >
                                  <img src={checkMark} alt="" />
                              </button>
                          </HabitsItem>
                      ))
                    : "..."}
            </HabitsContainer>
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

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
`;

const HabitsItem = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;
    color: #666666;
    padding: 13px;
    .title {
        font-size: 20px;
        padding-bottom: 7px;
        line-height: 25px;
    }
    .current,
    .record {
        font-size: 13px;
        line-height: 16px;
        span {
            color: ${(props) => (props.done ? "#8FC549" : "#666666")};
        }
    }
    .record {
    }

    button {
        height: 69px;
        width: 69px;
        cursor: pointer;
        background-color: ${(props) => (props.done ? "#8FC549" : "#ebebeb")};
    }
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
