import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function SignUp() {
    const [signupEmail, setEmail] = useState("");
    const [signupPass, setPassword] = useState("");
    const [signupImage, setImage] = useState("");
    const [signupName, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const signupInfo = {
        email: "",
        name: "",
        image: "",
        password: "",
    };

    const navigate = useNavigate();

    function requestLogin() {
        setLoading(true);
        signupInfo.email = signupEmail;
        signupInfo.password = signupPass;
        signupInfo.name = signupName;
        signupInfo.image = signupImage;
        console.log(signupInfo);
        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            signupInfo
        );
        promise
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                if (error.response) {
                    if (error.response.status === 409) {
                        setError("Esse email já está em uso.");
                    } else {
                        setError(error.response.data.error);
                    }
                } else if (error.request) {
                    setError("Sem resposta da rede.");
                } else {
                    setError("Ocorreu um erro inesperado.");
                }
            });
    }
    function errorAlert() {
        if (error) {
            alert(`Error: ${error}`);
        }
    }

    useEffect(() => {
        errorAlert();
    }, [error]);

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
                    value={signupEmail}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={loading}
                />
                <input
                    data-test="password-input"
                    type="password"
                    placeholder="senha"
                    value={signupPass}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                />
                <input
                    data-test="user-name-input"
                    type="text"
                    placeholder="nome"
                    value={signupName}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading}
                />
                <input
                    data-test="user-image-input"
                    type="text"
                    placeholder="foto"
                    value={signupImage}
                    onChange={(event) => setImage(event.target.value)}
                    disabled={loading}
                />
                <button
                    data-test="signup-btn"
                    onClick={requestLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ThreeDots color="#FFFFFF" height={10} width={40} />
                    ) : (
                        "Cadastrar"
                    )}
                </button>
                <Link to={`/`} className="signup-text" data-test="login-link">
                    Já tem uma conta? Faça login!
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
