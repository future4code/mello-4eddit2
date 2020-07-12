import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import {
  AppContainer,
  PostContainer,
  PostHeader,
  PostFooter,
  PostText,
  IconImage,
  CommentContainer,
  CommentInputContainer,
  Input,
  Button
} from "./styles";
import upIcon from "../../images/up.svg";
import downIcon from "../../images/down.svg";
import UpVoteIcon from "@material-ui/icons/ThumbUpOutlined";
import UpVoteFilledIcon from "@material-ui/icons/ThumbUp";
import DownVoteIcon from "@material-ui/icons/ThumbDownOutlined";
import DownVoteFilledIcon from "@material-ui/icons/ThumbDown";
const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";

function FeedPage() {
  const [post, setPost] = useState([]);
  const [textComment, setTextComment] = useState("");
  const [token, setToken] = useState(null);

  const handleInputChange = (event) => {
    setTextComment(event.target.value);
  };

  const params = useParams();
  const postId = params.id;

  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    getDetails();
    if (token === null) {
      history.push("/login");
    }
  }, [history, token]);

  const getDetails = () => {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${baseUrl}/posts/${postId}`, axiosConfig)
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((e) => {});
  };

  const createComment = () => {
    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };
    const body = {
      text: textComment,
    };
    axios
      .post(`${baseUrl}/posts/${postId}/comment`, body, axiosConfig)
      .then(() => {
        setTextComment("");
        getDetails();
      });
  };

  const handleVote = (commentId, userVote) => {
    let vote = null;

    if (userVote === "upvote") {
      vote = 1;
    } else if (userVote === "downvote") {
      vote = -1;
    }

    const axiosConfig = {
      headers: {
        Authorization: token,
      },
    };

    const body = {
      direction: vote,
    };

    axios
      .put(
        `${baseUrl}/posts/${postId}/comment/${commentId}/vote`,
        body,
        axiosConfig
      )
      .then(() => {
        getDetails();
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <AppContainer>
      <Button onClick={goBack}>VOLTAR</Button>
      <PostContainer>
        <PostHeader>
          <p>@{post.username}</p>
        </PostHeader>
        <PostText>
          <p>{post.text}</p>
        </PostText>
        <PostFooter>
          <div>
            <UpVoteFilledIcon style={{ height: 12, width: 12 }} onClick={handleVote} />
            {post.votesCount}
            <DownVoteFilledIcon style={{ height: 12, width: 12 }} />
          </div>
          <span>
            {post.commentsCount}{" "}
            {post.commentsCount === 0 || post.commentsCount === 1 ? (
              <span>Comentário</span>
            ) : (
              <span>Comentários</span>
            )}{" "}
          </span>
        </PostFooter>
      </PostContainer>

      <CommentInputContainer>
        <Input
          placeholder="escreva um comentario"
          value={textComment}
          onChange={handleInputChange}
        />
        <Button onClick={createComment}>COMENTAR</Button>
      </CommentInputContainer>

      {post.comments ? (
        post.comments.map((comment) => {
          return (
            <div>
              <CommentContainer>
                <PostHeader>@{comment.username}</PostHeader>
                <PostText>
                  <p>{comment.text}</p>
                </PostText>
                <PostFooter>
                  <IconImage>
                    <UpVoteFilledIcon style={{ height: 12, width: 12 }} 
                      onClick={() => handleVote(comment.id, "upvote")}
                    />
                    {comment.votesCount}
                    <DownVoteFilledIcon style={{ height: 12, width: 12 }}
                      src={downIcon}
                      onClick={() => handleVote(comment.id, "downvote")}
                    />
                  </IconImage>
                </PostFooter>
              </CommentContainer>
            </div>
          );
        })
      ) : (
        <p>Carregando comentarios...</p>
      )}
    </AppContainer>
  );
}

export default FeedPage;
