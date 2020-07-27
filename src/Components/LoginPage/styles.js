import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: "Roboto Mono", monospace;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.span`
  display: flex;
  flex-direction: row;
  height: 100px;
  width: 430px;
  align-items: center;
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

  &:hover {
    text-decoration: underline;
  }
`;

export const UserInput = styled.input`
  min-height: 30px;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 20px;
`;

