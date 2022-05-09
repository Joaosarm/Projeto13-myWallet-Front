import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Button from "./Button";
import Input from "./Input";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    try {
      await axios.post("http://localhost:5000/sign-up", {name,email,password,confirmPassword});
      alert("Cadastro feito com sucesso!");
      navigate("/");
    } catch(e) {
      alert("Ops, ocorreu um erro!", e.response);
      console.error("o erro foi..",  e.response);
    }
  }

  return (
    <Container>
        <Title>MyWallet</Title>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
        <Input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder="Confirme a Senha" />
        <Button onClick={register}>Cadastrar</Button>
        <StyledLink to="/">Já possui uma conta? Faça login</StyledLink>
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
    padding: 28px;
`

const StyledLink = styled(Link)`
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    margin-top: 32px;
`;