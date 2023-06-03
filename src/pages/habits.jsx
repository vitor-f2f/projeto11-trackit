import { useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../UserContext";
import plusSymbol from "../assets/plus.svg";
import deleteBtn from "../assets/dump.svg";

export default function Habits() {
    const { userData, setUserData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const userToken = userData.userToken;
    const tokenObj = {
        headers: { Authorization: `Bearer ${userToken}` },
    };

    function requestHabits() {
        setLoading(true);
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            tokenObj
        );
        promise
            .then((res) => {
                setLoading(false);
                const allHabitsArr = res.data;
                setUserData({ ...userData, allHabits: allHabitsArr });
            })
            .catch((error) => {
                setLoading(false);
                alert(`Erro: ${error}`);
            });
    }

    useEffect(() => {
        requestHabits();
    }, []);
    console.log(userData.allHabits);
    const diaLetra = ["D", "S", "T", "Q", "Q", "S", "S"];
    return (
        <HabitsContainer>
            <PageTitle>
                <span>Meus hábitos</span>
                <button className="new-habit">
                    <img
                        src={plusSymbol}
                        alt="mais"
                        data-test="habit-create-btn"
                    />
                </button>
            </PageTitle>

            <HabitsList>
                {userData.allHabits
                    ? userData.allHabits.map((h) => (
                          <HabitsItem data-test="habit-container" key={h.id}>
                              <div className="title" data-test="habit-name">
                                  {h.name}
                              </div>
                              <HabitsDays>
                                  {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                                      <Day
                                          key={n}
                                          active={h.days.includes(n)}
                                          data-test="habit-day"
                                      >
                                          {diaLetra[n]}
                                      </Day>
                                  ))}
                              </HabitsDays>
                              <button
                                  className="delete"
                                  data-test="habit-delete-btn"
                              >
                                  <img src={deleteBtn} alt="" />
                              </button>
                          </HabitsItem>
                      ))
                    : "..."}
            </HabitsList>
        </HabitsContainer>
    );
}

const HabitsContainer = styled.div`
    padding: 92px 18px;
    display: flex;
    flex-direction: column;
    font-size: 24px;
    text-align: left;
    color: #293845;
    min-height: 100vh;
    max-width: 100%;
    background-color: #f2f2f2;
`;

const PageTitle = styled.div`
    font-size: 23px;
    line-height: 29px;
    color: #126ba5;
    display: flex;
    justify-content: space-between;
    align-items: end;
    height: 35px;
    button {
        background-color: #52b6ff;
        border-radius: 5px;
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
        height: 35px;
        width: 40px;
    }
`;

const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
`;

const HabitsItem = styled.div`
    position: relative;
    background-color: white;
    border-radius: 5px;
    color: #666666;
    padding: 13px;
    .title {
        font-size: 20px;
        padding-bottom: 7px;
        line-height: 25px;
    }
    button.delete {
        position: absolute;
        top: 10px;
        right: 10px;
        height: 15px;
        width: 15px;
        background-color: none;
        cursor: pointer;
    }
`;

const HabitsDays = styled.div`
    display: flex;
    gap: 4px;
`;

const Day = styled.div`
    width: 28px;
    height: 28px;
    color: ${(props) => (props.active ? "#ffffff" : "#d4d4d4")};
    background-color: ${(props) => (props.active ? "#d4d4d4" : "#ffffff")};
    border: 1px solid ${(props) => (props.active ? "#ffffff" : "#d4d4d4")};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
