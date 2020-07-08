import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Segoe UI";
  align-items: center;
  justify-content: center;
`;

const Post = styled.div`
  border: 2.5px solid #e6ecf0;
  border-top: none;
  margin: 0 auto;
  width: 50%;

  &:hover {
    transition-duration: 250ms;
    background-color: #eef;
  }
`;

const PostBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInputContainer = styled.div`
  border-top: none;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
  border-bottom: 20px solid #e6ecf0;
  margin-top: 25px;

  width: 50%;
  display: flex;
  flex-direction: column;
`;

const PostButton = styled.button`
  background-color: #fff;
`;

const UserInput = styled.input``;

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [inputPostValue, setInputPostValue] = useState("");
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [token, setToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    getPosts();
  }, [history, token]);
  console.log(selectValue);

  const getPosts = () => {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(`${baseUrl}/posts`, axiosConfig)
      .then((response) => {
        console.log(response.data.posts);
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

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(`${baseUrl}/posts/`, body, axiosConfig)
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

    console.log(vote);

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(`${baseUrl}/posts/${postId}/vote`, body, axiosConfig)
      .then(() => {
        console.log(postId);
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
          <Post>
            <h3>@{post.username}</h3>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span>
                <button onClick={() => userVote(post.id, "upvote")}>
                  Gostei
                </button>
                Votos: {post.votesCount}{" "}
                <button onClick={() => userVote(post.id, "downvote")}>
                  Não gostei
                </button>
              </span>
              <span onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </Post>
        );
      });
    } else if (selectValue === "DECRESCENTE") {
      return posts.sort(orderByUpvotesDesc).map((post) => {
        return (
          <Post>
            <h3>@{post.username}</h3>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span>
                <button onClick={() => userVote(post.id)}>Gostei</button>
                Votos: {post.votesCount}{" "}
                <button onClick={() => userVote(post.id)}>Não gostei</button>
              </span>
              <span onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </Post>
        );
      });
    } else {
      return posts.map((post) => {
        return (
          <Post>
            <h3>@{post.username}</h3>
            <h4>{post.title}</h4>
            <p>{post.text}</p>
            <PostBottomContainer>
              <span>
                <button onClick={() => userVote(post.id)}>Gostei</button>
                Votos: {post.votesCount}{" "}
                <button onClick={() => userVote(post.id)}>Não gostei</button>
              </span>
              <span onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <span>{post.commentsCount} comentário</span>
                ) : (
                  <span>{post.commentsCount} comentários</span>
                )}
              </span>
            </PostBottomContainer>
          </Post>
        );
      });
    }
  }

  return (
    <MainContainer>
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
        <PostButton onClick={getPosts}>Update</PostButton>
        <PostButton onClick={logout}>Logout</PostButton>
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
