import React, { useState, useEffect } from "react";
import RenderPosts from "./renderposts";
import { useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "../Theme";

import {
  MainContainer,
  Header,
  UserInput,
  UserInputContainer,
  PostButton,
} from "./styles";

import axios from "axios";

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [inputPostValue, setInputPostValue] = useState("");
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [username, setUsername] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");
    setUsername(username);
    setToken(token);
    getPosts();

    if (token === null) {
      history.push("/login");
    }
  }, [history, token]);

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  const getPosts = () => {
    axios
      .get(`${baseUrl}/posts`, axiosConfig)
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(posts);

  const onInputPostChange = (event) => {
    setInputPostValue(event.target.value);
  };

  const onInputPostTitleChange = (event) => {
    setInputTitleValue(event.target.value);
  };

  const createNewPost = () => {
    const body = {
      text: inputPostValue,
      title: inputTitleValue,
    };

    axios
      .post(`${baseUrl}/posts`, body, axiosConfig)
      .then(() => {
        getPosts();
      })
      .catch((e) => {
        console.log(e);
      });

    setInputPostValue("");
    setInputTitleValue("");
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    history.push("/login");
    window.location.reload(true);
  };

  const onChangeSelect = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <MainContainer>
      <Header>
        <h4>Bem-vindo, @{username}</h4>
        <PostButton onClick={logout} style={{ marginTop: 25 }}>
          Logout
        </PostButton>
      </Header>
      <label> Filtrar posts por: </label>
      <select onChange={onChangeSelect}>
        <option value="" />
        <option value="DECRESCENTE">Mais votados</option>
        <option value="ASCENDENTE">Menos votados</option>
      </select>
      <UserInputContainer>
        <h3> Criar novo post </h3>
        <UserInput
          type="text"
          value={inputTitleValue}
          onChange={onInputPostTitleChange}
          placeholder="Título do post:"
        />

        <UserInput
          type="text"
          value={inputPostValue}
          onChange={onInputPostChange}
          placeholder="No que você está pensando?"
          style={{ minHeight: 100 }}
        />

        <PostButton onClick={createNewPost}>Postar</PostButton>
      </UserInputContainer>

      <RenderPosts
        posts={posts}
        selectValue={selectValue}
        getPosts={getPosts}
        token={token}
        baseUrl={baseUrl}
      />
    </MainContainer>
  );
}

export default FeedPage;
