import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

export default function MainPage() {

    const { user, setUser } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    let total = 0;


    useEffect(() => {
        (async () => {
            try {
                const logedUser = await axios.get("http://localhost:5000/main-page", {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                axios.get("http://localhost:5000/transactions", {headers: {Authorization: `Bearer ${user.token}`}})
                .then((response) => {
                    setTransactions(response.data);
                }).catch(e => console.log(e));
                setUser({ ...logedUser, token: user.token });
            } catch (e) {
                alert("Erro ao receber dados");
                console.log(e.response);
            }
        })();
    }, [])

    transactions.forEach(trans => {
        if(trans.type === "deposit") total += parseFloat(trans.value)
        else total = total - parseFloat(trans.value)
    });

    function logOff() {
        setUser({});
        navigate('/');
    }


    function newEntry(type){
        setUser({...user, transaction: type});
        navigate('/new-entry');
    }

    function showTransaction(transaction){
        return(
            <div key ={transaction._id}><Date>{transaction.date}</Date><div><Description>{transaction.description}</Description> <Value type = {transaction.type}>{parseFloat(transaction.value).toFixed(2).replace(".", ",")}</Value></div></div>
        )
    }

  return transactions.length === 0 ? (
        <Container>
            <Header>Olá, {user.data?.name} <ion-icon name="exit-outline" onClick={logOff}></ion-icon></Header>
            <Box centered = 'center'><h3>Não há registros de entradas ou saídas</h3></Box>
            <Buttons>
                <Button onClick={() => newEntry('deposit')}><ion-icon name="add-circle-outline"></ion-icon><p>Nova</p> <p>Entrada</p></Button>
                <Button onClick={() => newEntry('withdraw')}><ion-icon name="remove-circle-outline"></ion-icon><p>Nova</p> <p>Saída</p></Button>
            </Buttons>
        </Container>
    ) : (
        <Container>
            <Header>Olá, {user.data?.name} <ion-icon name="exit-outline" onClick={logOff}></ion-icon></Header>
            <Box centered = 'left'>{transactions.map((transaction) => showTransaction(transaction))}<Total color = {total>0?'#03AC00':'#C70000'}><strong>SALDO</strong> {total>0?total.toFixed(2).replace(".", ","):(total*-1).toFixed(2).replace(".", ",")}</Total></Box>
            <Buttons>
                <Button onClick={() => newEntry('deposit')}><ion-icon name="add-circle-outline"></ion-icon><p>Nova</p> <p>Entrada</p></Button>
                <Button onClick={() => newEntry('withdraw')}><ion-icon name="remove-circle-outline"></ion-icon><p>Nova</p> <p>Saída</p></Button>
            </Buttons>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    min-width: 100%;
    background-color: #8C11BE;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.header`
    padding: 22px;
    font-size: 26px;
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    ion-icon{
        margin-left: 170px;
    }
`

const Box = styled.div`
    background: #FFFFFF;
    height: 446px;
    width: 326px;
    display: flex;
    justify-content: ${props => props.centered};
    align-items: ${props => props.centered};
    border-radius: 5px;
    flex-direction: column;
    font-size: 16px;
    padding: 23px 11px 11px 12px;
    position: relative;
    overflow: scroll;
    h3{
        width: 200px;
        text-align: center;
        color:#868686;
        font-size: 20px;
    }
    div{
        display: flex;
        flex-direction: row;
        width: 245px;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`

const Date = styled.span`
    color:#C6C6C6;
    padding-right: 9px;
`

const Description = styled.div`
    color: #000000;
`

const Value = styled.span`
    color: ${props => props.type==='deposit'?'#03AC00':'#C70000'};
    text-align: right;
`

const Total = styled.p`
    position: fixed;
    bottom: 148px;
    padding:8px 0px;
    rigth:10px;
    display:flex;
    width:300px;
    background:#FFFFFF;
    justify-content: space-between;
    color:${props => props.color};
    strong{
        font-weight: 700;
        color: #000000;
    }
`


const Buttons = styled.div`
    padding: 10px;
`

const Button = styled.button`
    height: 114px;
    width: 155px;
    padding: 10px;
    background: #A328D6;
    border: none;
    border-radius: 5px;
    margin: 5px;   
    color: #FFFFFF;
    text-align: left;
    font-size: 17px;
    font-family: 'Raleway', cursive;
    font-weight: 700;
    flex-direction: column;
    ion-icon {
        margin-bottom: 23px;
        font-size: 25px;
    }
    cursor: pointer;
`