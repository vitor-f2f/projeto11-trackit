import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";
import UserContext from "../UserContext";
import plusSymbol from "../assets/plus.svg";
import deleteBtn from "../assets/dump.svg";
import HabitDays from "../components/HabitDays.jsx";

export default function Habits() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { userData, setUserData } = useContext(UserContext);
    const [newHabitFormOpen, setFormOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newHabitDays, setNewDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const userToken = userData.userToken;
    const tokenObj = {
        headers: { Authorization: `Bearer ${userToken}` },
    };

    function requestHabits() {
        const promise = axios.get(`${apiUrl}/habits`, tokenObj);
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

    function clickFunc() {
        setFormOpen(false);
        setNewName("");
        setNewDays([]);
    }

    function createNew() {
        setLoading(true);
        if (newName === "" || newHabitDays.length === 0) {
            alert("Complete as informações do novo hábito.");
            setLoading(false);
            return;
        }
        const newHabitObj = {
            name: newName,
            days: newHabitDays,
        };
        const promise = axios.post(`${apiUrl}/habits`, newHabitObj, tokenObj);
        promise
            .then(() => {
                setLoading(false);
                clickFunc();
                requestHabits();
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
            const promise = axios.delete(`${apiUrl}/habits/${id}`, tokenObj);
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
                    onClick={() => setFormOpen(true)}
                    data-test="habit-create-btn"
                >
                    <img src={plusSymbol} alt="mais" />
                </button>
            </PageTitle>

            <HabitsList>
                {newHabitFormOpen && (
                    <NewHabitForm data-test="habit-create-container">
                        <input
                            data-test="habit-name-input"
                            type="text"
                            placeholder="nome do hábito"
                            value={newName}
                            onChange={(event) => setNewName(event.target.value)}
                            disabled={loading}
                        />
                        <HabitDays activeDays={newHabitDays} setNewDays={setNewDays} loading={loading} />
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
                            <HabitDays activeDays={h.days} />
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