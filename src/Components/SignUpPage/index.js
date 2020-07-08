import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useHistory } from "react-router-dom";

const Form = styled.div`
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  width: 600px;
  height: 500px;
  margin: auto;
`;

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const history = useHistory();

  const goToLoginPage = () => {
    history.push("/login");
  };

  const signUp = () => {
    const body = {
      email: email,
      password: password,
      username: username,
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup",
        body
      )
      .then(() => {
        alert("Conta criada com sucesso!");
        setEmail("");
        setUserName("");
        setPassword("");
        goToLoginPage();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form>
      <label>
        <strong>CADASTRO DE USUÁRIO</strong>
      </label>
      <input
        type="text"
        placeholder="Nome de usuário"
        value={username}
        onChange={handleUserName}
      />

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

      <button onClick={signUp}>Cadastrar</button>
    </Form>
  );
}

export default SignUp;
