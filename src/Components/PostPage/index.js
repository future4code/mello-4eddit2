import React, { useState, useEffect } from "react";
import { AppContainer, PostContainer, PostHeader, PostFooter, PostText, IconImage, CommentContainer, CommentInputContainer } from './styles'
import axios from 'axios'
import upIcon from '../../images/up.svg'
import downIcon from '../../images/down.svg'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"
function FeedPage() {
  const [count, setCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [comments, setComments] = useState([])

  const sumLike = () => {
    setCount(count + 1)
  }
  const subtractionLike = () => {
    setCount(count - 1)
  }
  const id = "EJOylTs3Xf1nvQGkmXTT"
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
        setCount(response.data.post.votesCount)
        setComments(response.data.post.comments)
        setCommentsCount(response.data.post.commentsCount)
      })
  }
  console.log(comments)
  useEffect(() => {
    getDetails()
  }, [])
  return (
    <AppContainer>
      <PostContainer>
        <PostHeader>
          <p>@usuario</p>
        </PostHeader>

        <PostText>
          <p>texto, texto, texto</p>
        </PostText>

        <PostFooter>
          <div>
            <IconImage src={upIcon} onClick={sumLike}></IconImage>
            {count}
            <IconImage src={downIcon} onClick={subtractionLike}></IconImage>
          </div>
          <span>{commentsCount} {commentsCount === 0 || commentsCount === 1 ? (<span>Comentário</span>) : (<span>Comentários</span>)} </span>
        </PostFooter>
      </PostContainer>

      <CommentInputContainer>
          <input placeholder="escreva um comentario!"/>
        
          <button>enviar comentário</button>
  
      </CommentInputContainer>

      {comments.length === 0 ? (<p>Carregando...</p>)
        :
        (comments.map(comment => {
          return (
            <div>
              <CommentContainer>
                <PostHeader>@{comment.username}</PostHeader>
                <PostText>
                  <p>{comment.text}</p>
                </PostText>
                <PostFooter>
                  <div>
                    <IconImage src={upIcon} onClick={sumLike} ></IconImage>
                    {comment.votesCount}
                    <IconImage src={downIcon} onClick={subtractionLike} ></IconImage>
                  </div>
                </PostFooter>
              </CommentContainer>
            </div>)
        }))
      }
    </AppContainer>
  );
}

export default FeedPage;
