import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Segoe UI";
  align-items: center;
  justify-content: center;
`;

export const PostHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  border-bottom: 1px solid gray;
  font-weight: bold;
`;

export const PostContainer = styled.div`
  border: 1px solid gray;
  width: 500px;
  margin-top: 10px;
  text-align: center;
  border-bottom: 1px solid gray;

  &:hover {
    transition-duration: 250ms;
    background-color: #eef;
  }
`;

export const PostBottomContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid gray;
  justify-content: space-between;
`;

export const VoteWrapper = styled.span`
  cursor: pointer;
  border-radius: 10px;

  &:active {
    background-color: #961ec5;
    transition: all 0.7s;
  }
`;

export const UserInputContainer = styled.div`
  min-height: 200px;
  border-top: none;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
  margin-top: 25px;
  width: 500px;
  display: flex;
  flex-direction: column;
`;

export const PostButton = styled.button`
  background-color: #fff;
`;

export const UserInput = styled.input`
  min-height: 50px;
`;
