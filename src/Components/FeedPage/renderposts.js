import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  UsernameText,
  PostHeader,
  PostHeaderWrapper,
  PostContainer,
  PostTextContainer,
  PostTitleText,
  PostBottomContainer,
  VoteWrapper,
  CommentsText,
} from "./styles";

import editIcon from "../../images/edit.svg";
import UpVoteIcon from "@material-ui/icons/ThumbUpOutlined";
import UpVoteFilledIcon from "@material-ui/icons/ThumbUp";
import DownVoteIcon from "@material-ui/icons/ThumbDownOutlined";
import DownVoteFilledIcon from "@material-ui/icons/ThumbDown";

function RenderPosts(props) {
  const { posts, selectValue, getPosts, token, baseUrl } = props;
  const history = useHistory();

  const axiosConfig = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    getPosts();
  }, [token]);

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

  const userVote = (postId, userVote) => {
    let vote = 0;
    const u = userVote;

    if (u === "upvote") {
      vote = 1;
    } else if (u === "downvote") {
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

  const goToPostDetails = (postId) => {
    history.push(`/post/${postId}`);
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
              <PostHeaderWrapper>
                <UsernameText>@{post.username}</UsernameText>
                <img src={editIcon} />
              </PostHeaderWrapper>
            </PostHeader>

            <PostTextContainer>
              <PostTitleText>{post.title}</PostTitleText>
              <p>{post.text}</p>
            </PostTextContainer>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper onClick={() => userVote(post.id, "upvote")}>
                  {post.userVoteDirection === 1 ? (
                    <UpVoteFilledIcon style={{ height: 12, width: 12 }} />
                  ) : (
                    <UpVoteIcon style={{ height: 12, width: 12 }} />
                  )}
                </VoteWrapper>
                <span
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                  }}
                >
                  {post.votesCount}{" "}
                </span>
                <VoteWrapper onClick={() => userVote(post.id, "downvote")}>
                  {post.userVoteDirection === -1 ? (
                    <DownVoteFilledIcon style={{ height: 12, width: 12 }} />
                  ) : (
                    <DownVoteIcon style={{ height: 12, width: 12 }} />
                  )}
                </VoteWrapper>
              </span>
              <CommentsText onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <CommentsText>{post.commentsCount} comentário</CommentsText>
                ) : (
                  <CommentsText>{post.commentsCount} comentários</CommentsText>
                )}
              </CommentsText>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    } else if (selectValue === "DECRESCENTE") {
      return posts.sort(orderByUpvotesDesc).map((post) => {
        return (
          <PostContainer>
            <PostHeader>
              <PostHeaderWrapper>
                <UsernameText>@{post.username}</UsernameText>
                <img src={editIcon} />
              </PostHeaderWrapper>
            </PostHeader>

            <PostTextContainer>
              <PostTitleText>{post.title}</PostTitleText>
              <p>{post.text}</p>
            </PostTextContainer>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper onClick={() => userVote(post.id, "upvote")}>
                  {post.userVoteDirection === 1 ? (
                    <UpVoteFilledIcon style={{ height: 12, width: 12 }} />
                  ) : (
                    <UpVoteIcon style={{ height: 12, width: 12 }} />
                  )}
                </VoteWrapper>
                <span
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                  }}
                >
                  {post.votesCount}{" "}
                </span>
                <VoteWrapper onClick={() => userVote(post.id, "downvote")}>
                  {post.userVoteDirection === -1 ? (
                    <DownVoteFilledIcon style={{ height: 12, width: 12 }} />
                  ) : (
                    <DownVoteIcon style={{ height: 12, width: 12 }} />
                  )}
                </VoteWrapper>
              </span>
              <CommentsText onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <CommentsText>{post.commentsCount} comentário</CommentsText>
                ) : (
                  <CommentsText>{post.commentsCount} comentários</CommentsText>
                )}
              </CommentsText>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    } else {
      return posts.map((post) => {
        return (
          <PostContainer>
            <PostHeader>
              <PostHeaderWrapper>
                <UsernameText>@{post.username}</UsernameText>
                <img src={editIcon} />
              </PostHeaderWrapper>
            </PostHeader>

            <PostTextContainer>
              <PostTitleText>{post.title}</PostTitleText>
              <p>{post.text}</p>
            </PostTextContainer>
            <PostBottomContainer>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: 20,
                }}
              >
                <VoteWrapper>
                  {post.userVoteDirection === 1 ? (
                    <UpVoteFilledIcon
                      style={{ height: 12, width: 12 }}
                      onClick={() => userVote(post.id, "upvote")}
                    />
                  ) : (
                    <UpVoteIcon
                      style={{ height: 12, width: 12 }}
                      onClick={() => userVote(post.id, "upvote")}
                    />
                  )}
                </VoteWrapper>
                <span
                  style={{
                    marginLeft: 6,
                    marginRight: 6,
                  }}
                >
                  {post.votesCount}{" "}
                </span>
                <VoteWrapper>
                  {post.userVoteDirection === -1 ? (
                    <DownVoteFilledIcon
                      style={{ height: 12, width: 12 }}
                      onClick={() => userVote(post.id, "downvote")}
                    />
                  ) : (
                    <DownVoteIcon
                      style={{ height: 12, width: 12 }}
                      onClick={() => userVote(post.id, "downvote")}
                    />
                  )}
                </VoteWrapper>
              </span>
              <CommentsText onClick={() => goToPostDetails(post.id)}>
                {post.commentsCount === 1 ? (
                  <CommentsText>{post.commentsCount} comentário</CommentsText>
                ) : (
                  <CommentsText>{post.commentsCount} comentários</CommentsText>
                )}
              </CommentsText>
            </PostBottomContainer>
          </PostContainer>
        );
      });
    }
  }

  return <div>{orderPostsBy()}</div>;
}

export default RenderPosts;
