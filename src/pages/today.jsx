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
                const todayHabitsArr = res.data;
                setUserData({ ...userData, todayHabits: todayHabitsArr });
            })
            .catch((error) => {
                setLoading(false);
                alert(`Erro: ${error}`);
            });
    }

    useEffect(() => {
        requestToday();
        console.log(userData);
    }, []);

    function toggleHabit(habitId, done) {
        const promise = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/${
                done ? "uncheck" : "check"
            }`,
            {},
            tokenObj
        );

        promise
            .then((res) => {
                console.log("Sucesso: ", res.data);
                requestToday();
            })
            .catch((error) => {
                console.log("Erro: ", error);
            });
    }

    const calculatePct = () => {
        if (!userData.todayHabits || userData.todayHabits.length === 0) {
            return 0;
        }

        const completedHabits = userData.todayHabits.filter(
            (habit) => habit.done
        );
        const percentage = Math.round(
            (completedHabits.length / userData.todayHabits.length) * 100
        );

        return percentage;
    };

    const donePct = calculatePct();

    useEffect(() => {
        setUserData({ ...userData, donepct: donePct });
    }, [userData.todayHabits]);
    const dataDDDD = dayjs()
        .locale("pt-br")
        .format("dddd")
        .replace(/-feira$/, "");

    const dataDDMM = dayjs().locale("pt-br").format("DD/MM");

    return (
        <TodayContainer>
            <>
                <TodayInfo data-test="today">
                    {dataDDDD}, {dataDDMM}
                </TodayInfo>
                <TodayProgress
                    data-test="today-counter"
                    pctFeitos={userData.donepct}
                >
                    {userData.donepct === 0
                        ? "Nenhum hábito concluído ainda"
                        : `${userData.donepct}% dos hábitos concluídos`}
                </TodayProgress>
            </>
            <TodayList>
                {userData.todayHabits
                    ? userData.todayHabits.map((h) => (
                          <TodayItem
                              data-test="today-habit-container"
                              key={h.id}
                              done={h.done}
                              currentSequence={h.currentSequence}
                              highestSequence={h.highestSequence}
                          >
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
                                          {h.currentSequence === 1
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
                                          {h.highestSequence === 1
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
                          </TodayItem>
                      ))
                    : "..."}
            </TodayList>
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

const TodayList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
    > :last-child {
        margin-bottom: 15px;
    }
`;

const TodayItem = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 5px;
    color: #666666;
    padding: 13px;
    font-size: 13px;
    line-height: 16px;
    .title {
        font-size: 20px;
        padding-bottom: 7px;
        line-height: 25px;
    }
    .current span {
        color: ${(props) => (props.done ? "#8FC549" : "#666666")};
    }
    .record span {
        color: ${(props) =>
            props.done && props.currentSequence === props.highestSequence
                ? "#8FC549"
                : "#666666"};
    }

    button {
        height: 69px;
        min-width: 69px;
        cursor: pointer;
        background-color: ${(props) => (props.done ? "#8FC549" : "#ebebeb")};
    }
`;

const TodayInfo = styled.div`
    color: #126ba5;
    font-size: 23px;
    text-transform: capitalize;
`;

const TodayProgress = styled.div`
    color: ${(props) => (props.pctFeitos > 0 ? "#8FC549" : "#bababa")};
    font-size: 18px;
    line-height: 30px;
`;
