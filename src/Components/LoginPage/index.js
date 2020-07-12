import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Form,
  Label,
  UserInput,
  UserInputContainer,
  PostButton,
} from "./styles";


/* const Form = styled.div`
  display: grid;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  width: 600px;
  height: 500px;
  margin: auto;
`; */

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token !== null) {
      history.push("/");
    }
  }, [history]);

  const handleUpdateEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    const loginBody = {
      email: email,
      password: password,
    };
    try {
      const response = await Axios.post(`${baseUrl}/login`, loginBody);

      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("username", response.data.user.username);
      alert("Login efetuado com sucesso!");
      history.push("/");
    } catch (error) {
      console.log(error);
      alert("Erro ao logar, tente novamente...");
    }
    };


  return (
    <Form>
      <Label>
        <strong>LOGIN</strong>
      </Label>
      <UserInputContainer>
      <UserInput
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={handleUpdateEmail}
      />

      <UserInput
        placeholder="Senha"
        type="password"
        value={password}
        onChange={handleUpdatePassword}
      />

      <PostButton onClick={login}>Entrar</PostButton>
      <PostButton onClick={() => history.push("/signup")}>Cadastrar</PostButton>

      </UserInputContainer>
    </Form>
  );
}

export default LoginPage;
