import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
    const [userEmail, setEmail] = useState("");
    const [userPass, setPassword] = useState("");
    const loginInfo = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();

    function requestLogin() {
        loginInfo.email = userEmail;
        loginInfo.password = userPass;
        console.log(loginInfo);
        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            loginInfo
        );
        promise.then((res) =>
            navigate("/sucesso", {
                state: {
                    userId: res.data.id,
                    userName: res.data.name,
                    userImage: res.data.image,
                    userEmail: { userEmail },
                    userToken: res.data.token,
                },
            })
        );
    }
    return (
        <PageContainer>
            <Logo>
                <img src={logo} alt="" />
            </Logo>

            <FormContainer>
                <input
                    data-test="email-input"
                    type="text"
                    placeholder="email"
                    value={userEmail}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    data-test="password-input"
                    type="password"
                    placeholder="senha"
                    value={userPass}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button data-test="login-btn" onClick={requestLogin}>
                    Entrar
                </button>
                <Link
                    to={`/cadastro`}
                    className="signup-text"
                    data-test="signup-link"
                >
                    Não tem uma conta? Cadastre-se!
                </Link>
            </FormContainer>
        </PageContainer>
    );
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

const Logo = styled.div`
    display: flex;
    margin-top: 68px;
    margin-bottom: 32px;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    .signup-text {
        font-size: 14px;
        color: #52b6ff;
        text-decoration: underline;
        margin-top: 19px;
    }
    button {
        background-color: #52b6ff;
    }
`;
