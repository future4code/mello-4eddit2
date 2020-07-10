import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Roboto Mono", monospace;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.span`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 430px;
  align-items: center;
`;

export const PostHeader = styled.div`
  height: 40px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.72);
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const PostHeaderWrapper = styled.span`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const UsernameText = styled.h3`
  font-size: 16px;
  line-height: 14px;
  font-weight: bold;
`;

export const PostContainer = styled.div`
  width: 460px;
  min-height: 180px;
  background: rgba(4, 210, 255, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.72);
  box-sizing: border-box;
  border-radius: 11px;
  margin-bottom: 25px;
  &:hover {
    transition-duration: 250ms;
    background-color: #eef;
  }
`;

export const PostTextContainer = styled.div`
  height: 50%;
  text-align: center;
  margin: 0 auto;
`;

export const PostTitleText = styled.h4`
  width: 390px;
  text-align: left;
  margin: 0 auto;
  margin-top: 4px;
`;

export const PostBottomContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: flex-end;
  padding: 0 10px;
  justify-content: space-between;
`;

export const VoteWrapper = styled.span`
  cursor: pointer;
  border-radius: 11px;

  &:active {
    background-color: rgba(4, 210, 255, 0.12);
    transform: scale(1.5);
  }
`;

export const CommentsText = styled.span`
  position: relative;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserInputContainer = styled.div`
  text-align: center;
  width: 460px;
  min-height: 260px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 11px;
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
`;

export const PostButton = styled.button`
  background-color: #fff;
  width: 25%;
  height: 30px;
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 51px;
  margin: 0 auto;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const UserInput = styled.input`
  min-height: 50px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
`;
