import {useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../context/UserContext";

import Button from "./Button";
import Input from "./Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext);

  const navigator = useNavigate();

  async function log() {
    try {
      const response = await axios.post("https://my-wallet-back-app.herokuapp.com/sign-in", {email,password});
      setUser({token: response.data});
      navigator("/main-page");
    } catch {
      alert("Email ou senha errado!");
    }
  }

  return (
    <Container>
        <Title>MyWallet</Title>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        <Button onClick={log}>Entrar</Button>
        <StyledLink to="/sign-up">Não possui uma conta? Cadastre-se</StyledLink>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #8C11BE;
`;

const Title = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #FFFFFF;
    padding: 24px;
`

const StyledLink = styled(Link)`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-top: 36px;
`;