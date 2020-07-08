import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const Form = styled.div`
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  width:600px;
  height: 500px;
  margin: auto;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login";

function LoginPage() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(token !== null) {
      history.push("/");
    }
  }, [history]);

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value)
  }

  const login = async() => {
    const loginBody = {
      email: email,
      password: password,
    }
    try {
      const response = await
      Axios
      .post(`${baseUrl}/login`.loginBody)

      window.localStorage.setItem("token".response.data.token);
      alert("Login efetuado com sucesso!")
      history.push("/")
    } catch(error) {
      console.log(error)
      alert("Erro ao logar, tente novamente...")
    }
  }

  return (
    <Form>
      <label>
        <strong>LOGIN</strong>
      </label>
        <input 
        type="email" 
        placeholder="E-mail" 
        value={email} 
        onChange={handleUpdateEmail}
        />

        <input 
        placeholder="Senha" 
        value={password} 
        onChange={handleUpdatePassword}
        />
        
        <button onClick={login}>Entrar</button>
        <button>Cadastrar</button>
    </Form>
  );
}

export default LoginPage;
