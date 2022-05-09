import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../context/UserContext";

import Button from "./Button";
import Input from "./Input";

export default function NewEntry(){
    const { user } = useContext(UserContext);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    function postEntry(){
        axios.post("https://my-wallet-back-app.herokuapp.com/transactions", {value,description,type: user.transaction},{
            headers: { Authorization: `Bearer ${user.token}` }
        }).then(()=>{
            alert("Entrada postada com sucesso");
            navigate('/main-page');
        }).catch((e)=>console.log(e));
    }

    return(
        <Container>
            <Title>Nova {user.transaction==='deposit'?"entrada":"saída"}</Title>
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
            <Button onClick={postEntry}>
                Salvar {user.transaction==='deposit'?"entrada":"saída"}
            </Button>
        </Container>
    )
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #8C11BE;
`;

const Title = styled.h3`
    color: #FFFFFF;
    font-weigth: 700;
    font-size: 26px;
    text-align: left;
    width: 320px;
    margin-bottom: 40px;
`