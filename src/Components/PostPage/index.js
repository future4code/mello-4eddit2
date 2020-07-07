import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import { AppContainer, PostContainer, PostHeader, PostFooter, PostText, IconImage, CommentContainer, CommentInputContainer, Input } from './styles'
import upIcon from '../../images/up.svg'
import downIcon from '../../images/down.svg'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

function FeedPage() {

  const history = useHistory()
  const goBack = () => {
    history.push("/")
  }

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      history.push('/login')
    }
  }, [history]);


  const [post, setPost] = useState([])
  const [textComment, setTextComment] = useState("")

  const handleInputChange = (event) => {
    setTextComment(event.target.value)
  }

  // const { id } = useParams()
  // const token = window.localStorage.getItem(token)

  const getDetails = () => {
    const axiosConfig = {
      headers: {
        // auth: token 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    axios
      .get(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT`, axiosConfig)
      .then(response => {
        setPost(response.data.post)
      })
      .catch(e => {
        alert(e)
      })
  }
  const handleLike = () => {
    const axiosConfig = {
      headers: {
        // auth: token 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    const body = {
      direction: 1
    }
    axios
      .put(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT/vote`, body, axiosConfig)
      .then(() => {
        getDetails()
      })
      .catch(e => {
        alert(e)
      })
  }
  const handleDeslike = () => {
    const axiosConfig = {
      headers: {
        // auth: token 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    const body = {
      direction: -1
    }
    axios
      .put(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT/vote`, body, axiosConfig)
      .then(() => {
        getDetails()
      })
      .catch(e => {
        alert(e)
      })
  }
  const createComment = () => {
    const axiosConfig = {
      headers:
      {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    const body = {
      text: textComment
    }
    axios
      .post(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT/comment`, body, axiosConfig)
      .then(() => {
        setTextComment("")
        getDetails()
      })
  }
  const handleCommentLike = (commentId) => {
    const axiosConfig = {
      headers: {
        // auth: token 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    const body = {
      direction: 1
    }
    axios
      .put(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT/comment/${commentId}/vote`, body, axiosConfig)
      .then(() => {
        getDetails()
      })
  }
  const handleCommentDeslike = (commentId) => {
    const axiosConfig = {
      headers: {
        // auth: token 
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV5dEdONkVTcGlVdDgweFgwbzBWIiwidXNlcm5hbWUiOiJkYXJ2YXMiLCJlbWFpbCI6InBlZHJvLmRhcnZhc0BnbWFpbC5jb20iLCJpYXQiOjE1OTQwNTU4NDR9.UShsvQabwdkTtCWi8bFwOw7SvsYiPqdizHjhRXLuHT4"
      }
    }
    const body = {
      direction: -1
    }
    axios
      .put(`${baseUrl}/posts/3sXeMd3YXxKMgd1vfGiT/comment/${commentId}/vote`, body, axiosConfig)
      .then(() => {
        getDetails()
      })
      .catch(e => {
        alert(e)
      })
  }

  useEffect(() => {
    getDetails()
  }, [])

  return (
    <AppContainer>
      <button onClick={goBack}>VOLTAR</button>
      <PostContainer>
        <PostHeader>
          <p>@{post.username}</p>
        </PostHeader>
        <PostText>
          <p>{post.text}</p>
        </PostText>
        <PostFooter>
          <div>
            <IconImage src={upIcon} onClick={handleLike}></IconImage>
            {post.votesCount}
            <IconImage src={downIcon} onClick={handleDeslike}></IconImage>
          </div>
          <span>{post.commentsCount} {post.commentsCount === 0 || post.commentsCount === 1 ? (<span>Comentário</span>) : (<span>Comentários</span>)} </span>
        </PostFooter>
      </PostContainer>

      <CommentInputContainer>
        <Input placeholder="escreva um comentario" value={textComment} onChange={handleInputChange} />
        <button onClick={createComment}>COMENTAR</button>
      </CommentInputContainer>

      {post.comments ? (post.comments.map(comment => {
        return (
          <div>
            <CommentContainer>
              <PostHeader>@{comment.username}</PostHeader>
              <PostText>
                <p>{comment.text}</p>
              </PostText>
              <PostFooter>
                <IconImage src={upIcon} onClick={() => handleCommentLike(comment.id)} />
                {comment.votesCount}
                <IconImage src={downIcon} onClick={() => handleCommentDeslike(comment.id)} />
              </PostFooter>
            </CommentContainer>
          </div>)
      })) :
        (<p>Carregando comentarios...</p>)
      }

    </AppContainer>
  );
}

export default FeedPage;
