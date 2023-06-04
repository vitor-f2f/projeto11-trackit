import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import UserContext from "../UserContext";
import plusSymbol from "../assets/plus.svg";
import deleteBtn from "../assets/dump.svg";

export default function Habits() {
    const { userData, setUserData } = useContext(UserContext);
    const [criandoNovo, setCriando] = useState(false);
    const [newName, setNewName] = useState("");
    const [newHabitDays, setNewDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const userToken = userData.userToken;
    const tokenObj = {
        headers: { Authorization: `Bearer ${userToken}` },
    };

    function requestHabits() {
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            tokenObj
        );
        promise
            .then((res) => {
                const allHabitsArr = res.data;
                setUserData({ ...userData, allHabits: allHabitsArr });
            })
            .catch((error) => {
                alert(`Erro: ${error}`);
            });
        return;
    }

    useEffect(() => {
        requestHabits();
    }, []);

    const diaLetra = ["D", "S", "T", "Q", "Q", "S", "S"];

    function selectDays(day) {
        if (newHabitDays.includes(day)) {
            setNewDays(newHabitDays.filter((id) => id !== day));
        } else {
            setNewDays([...newHabitDays, day]);
        }
    }

    function clickFunc() {
        setCriando(false);
        setNewName("");
        setNewDays([]);
    }
    const newHabitObj = {
        name: "",
        days: [],
    };
    function createNew() {
        setLoading(true);
        newHabitObj.name = newName;
        newHabitObj.days = newHabitDays;
        console.log("userData pre-criacao: ", userData);
        if (newHabitObj.name == "" || newHabitObj.days.length == 0) {
            alert("Complete as informações do novo hábito.");
            setLoading(false);
            return;
        }

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            newHabitObj,
            tokenObj
        );
        promise
            .then(() => {
                setLoading(false);
                clickFunc();
                requestHabits();
                console.log("userData pos-criacao: ", userData);
                return;
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                return;
            });
    }

    function deleteHabit(id) {
        if (window.confirm("Tem certeza de que quer deletar este hábito?")) {
            const promise = axios.delete(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
                tokenObj
            );
            promise
                .then(() => {
                    requestHabits();
                    return;
                })
                .catch((error) => {
                    console.log(error);
                    return;
                });
        } else {
            return;
        }
    }

    return (
        <HabitsContainer>
            <PageTitle>
                <span>Meus hábitos</span>
                <button
                    className="new-habit"
                    onClick={() => setCriando(true)}
                    data-test="habit-create-btn"
                >
                    <img src={plusSymbol} alt="mais" />
                </button>
            </PageTitle>

            <HabitsList>
                {criandoNovo && (
                    <NewHabitForm data-test="habit-create-container">
                        <input
                            data-test="habit-name-input"
                            type="text"
                            placeholder="nome do hábito"
                            value={newName}
                            onChange={(event) => setNewName(event.target.value)}
                            disabled={loading}
                        />
                        <HabitsDays>
                            {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                                <Day
                                    key={n}
                                    active={newHabitDays.includes(n)}
                                    onClick={() => selectDays(n)}
                                    data-test="habit-day"
                                    disabled={loading}
                                >
                                    {diaLetra[n]}
                                </Day>
                            ))}
                        </HabitsDays>
                        <NewHabitButtons>
                            <button
                                className="cancel"
                                disabled={loading}
                                onClick={clickFunc}
                                data-test="habit-create-cancel-btn"
                            >
                                Cancelar
                            </button>
                            <button
                                className="save"
                                disabled={loading}
                                onClick={createNew}
                                data-test="habit-create-save-btn"
                            >
                                {loading ? (
                                    <ThreeDots
                                        color="#FFFFFF"
                                        height={11}
                                        width={43}
                                    />
                                ) : (
                                    "Salvar"
                                )}
                            </button>
                        </NewHabitButtons>
                    </NewHabitForm>
                )}
                {userData.allHabits && userData.allHabits.length > 0 ? (
                    userData.allHabits.map((h) => (
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
                                onClick={() => deleteHabit(h.id)}
                            >
                                <img src={deleteBtn} alt="" />
                            </button>
                        </HabitsItem>
                    ))
                ) : (
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </p>
                )}
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

const NewHabitForm = styled.div`
    position: relative;
    background-color: white;
    border-radius: 5px;
    color: #666666;
    padding: 18px;
    margin-bottom: 25px;
    input {
        background-color: ${({ loading }) =>
            loading === "true" ? "#f2f2f2" : "#ffffff"};
        color: ${({ loading }) => (loading === "true" ? "#afafaf" : "#000000")};
        opacity: ${({ loading }) => (loading === "true" ? "0.7" : "1")};
        border-color: #d4d4d4;
        margin-bottom: 8px;
    }
`;

const NewHabitButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 29px;
    gap: 10px;
    button.save {
        opacity: ${({ loading }) => (loading === "true" ? "0.7" : "1")};
        text-decoration: none;
        background-color: #52b6ff;
        width: 84px;
        height: 35px;
        font-size: 16px;
    }
    button.cancel {
        opacity: ${({ loading }) => (loading === "true" ? "0.7" : "1")};
        color: #52b6ff;
        text-decoration: none;
        background-color: #ffffff;
        width: 84px;
        height: 35px;
        font-size: 16px;
    }
`;

const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    p {
        font-size: 18px;
        color: #666666;
    }
    > :last-child {
        margin-bottom: 15px;
    }
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
    background-color: ${(props) => (props.active ? "#cfcfcf" : "#ffffff")};
    border: 1px solid ${(props) => (props.active ? "#cfcfcf" : "#d4d4d4")};
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;
