import styled from "styled-components"

export const AppContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-family: "Roboto Mono", monospace;
`
export const PostContainer = styled.div`
    width: 460px;
    background: rgba(4, 210, 255, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.72);
    border-radius: 11px;
    margin-top: 10px;
    font-family: "Roboto Mono", monospace;
`
export const PostHeader = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    border-bottom: 1px solid gray;
    font-weight: bold;
`
export const PostText = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid gray;
`
export const PostFooter = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
`
export const IconImage = styled.img`
    cursor: pointer;
`
export const CommentContainer = styled.div`
    font-family: "Roboto Mono", monospace;
    border: 1px solid gray;
    width: 300px;
    margin-top: 10px;
    border-radius: 11px;
`
export const CommentInputContainer = styled.div`
    text-align: center;
    width: 460px;
    min-height: 100px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 11px;
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
`
export const Input = styled.input`
    min-height: 50px;
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-family: "Roboto Mono", monospace;
`

export const Button = styled.button`
    background-color: #fff;
    width: 25%;
    height: 30px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 51px;
    margin: 0 auto;
    margin-bottom: 20px;
    font-family: "Roboto Mono", monospace;
        &:hover {
        transition-duration: 250ms;
        background-color: #eef;
  }
`