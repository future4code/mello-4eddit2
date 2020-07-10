import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import {
  MainContainer,
  PostHeader,
  PostContainer,
  PostBottomContainer,
  VoteWrapper,
  UserInput,
  UserInputContainer,
  PostButton,
} from "./styles";

import axios from "axios";

import UpVoteIcon from "@material-ui/icons/KeyboardArrowUp";
import DownVoteIcon from "@material-ui/icons/KeyboardArrowDown";

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

  const userVote = (postId, userVote) => {
    let vote = 0;

    if ((userVote = "upvote")) {
      vote = 1;
    } else if ((userVote = "downvote")) {
      vote = -1;
    }
    const body = {
      direction: vote,
    };

    axios
      .put(`${baseUrl}/posts/${postId}/vote`, body, axiosConfig)
      .then(() => {
        console.log("Voto computado!");

        getPosts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    history.push("/login");
    window.location.reload(true);
  };

  const goToPostDetails = (postId) => {
    history.push(`/post/${postId}`);
  };

  const orderByUpvotesDesc = (a, b) => {
    const postA = a.votesCount;
    const postB = b.votesCount;

    let comparison = 0;
    if (postA < postB) {
      comparison = 1;
    } else if (postA > postB) {
      comparison = -1;
    }

    return comparison;
  };

  const orderByUpvotesAsc = (a, b) => {
    const postA = a.votesCount;
    const postB = b.votesCount;

    let comparison = 0;
    if (postA > postB) {
      comparison = 1;
    } else if (postA < postB) {
      comparison = -1;
    }

    return comparison;
  };

  const onChangeSelect = (event) => {
    setSelectValue(event.target.value);
  };

  function orderPostsBy() {
    if (posts.length === 0) {
      return <div>Carregando...</div>;
    }
    if (selectValue === "ASCENDENTE") {
      return posts.sort(orderByUpvotesAsc).map((post) => {
        return (
          <PostContainer>
            <PostHeader>
              <h3>@{post.username}</h3>
            </PostHeader>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper onClick={() => userVote(post.id, "upvote")}>
                  <UpVoteIcon />
                </VoteWrapper>
                Votos: {post.votesCount}{" "}
                <VoteWrapper onClick={() => userVote(post.id, "downvote")}>
                  <DownVoteIcon />
                </VoteWrapper>
              </span>
              <span
                onClick={() => goToPostDetails(post.id)}
                style={{ cursor: "pointer" }}
              >
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    } else if (selectValue === "DECRESCENTE") {
      return posts.sort(orderByUpvotesDesc).map((post) => {
        return (
          <PostContainer>
            <PostHeader>
              <h3>@{post.username}</h3>
            </PostHeader>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper onClick={() => userVote(post.id, "upvote")}>
                  <UpVoteIcon />
                </VoteWrapper>
                Votos: {post.votesCount}{" "}
                <VoteWrapper onClick={() => userVote(post.id, "downvote")}>
                  <DownVoteIcon />
                </VoteWrapper>
              </span>
              <span
                onClick={() => goToPostDetails(post.id)}
                style={{ cursor: "pointer" }}
              >
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    } else {
      return posts.map((post) => {
        return (
          <PostContainer>
            <PostHeader>
              <h3>@{post.username}</h3>
            </PostHeader>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper onClick={() => userVote(post.id, "upvote")}>
                  <UpVoteIcon />
                </VoteWrapper>
                Votos: {post.votesCount}{" "}
                <VoteWrapper onClick={() => userVote(post.id, "downvote")}>
                  <DownVoteIcon />
                </VoteWrapper>
              </span>
              <span
                onClick={() => goToPostDetails(post.id)}
                style={{ cursor: "pointer" }}
              >
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    }
  }

  return (
    <MainContainer>
      <h4>Bem-vindo, @{username}</h4>{" "}
      <span>
        <PostButton onClick={logout}>Logout</PostButton>
      </span>
      <UserInputContainer>
        <UserInput
          type="text"
          value={inputPostValue}
          onChange={onInputPostChange}
          placeholder="No que você está pensando?"
        />
        <UserInput
          type="text"
          value={inputTitleValue}
          onChange={onInputPostTitleChange}
          placeholder="Título do post:"
        />
        <PostButton onClick={createNewPost}>Postar</PostButton>

        <select onChange={onChangeSelect}>
          <option value="" />
          <option value="DECRESCENTE">Mais votados</option>
          <option value="ASCENDENTE">Menos votados</option>
        </select>
      </UserInputContainer>
      {orderPostsBy()}
    </MainContainer>
  );
}

export default FeedPage;
