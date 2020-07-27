import styled from "styled-components"

export const AppContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
`
export const PostContainer = styled.div`
    width: 460px;
    background: rgba(4, 210, 255, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.72);
    border-radius: 11px;
    margin-top: 10px;
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
    height: 20px;
    cursor: pointer;
`
export const CommentContainer = styled.div`
    border: 1px solid gray;
    width: 300px;
    margin-top: 10px;
`
export const CommentInputContainer = styled.div`
    width: 402px;
    height: 150px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 11px;
    display: flex;
    flex-direction: column;
    align-content: center;
`
export const Input = styled.input`
    text-align: center;
    color: black;
`