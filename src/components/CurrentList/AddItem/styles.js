import styled from "styled-components";

export const Form = styled.form`
  grid-column: 2/3;
  margin: auto 0px;
`;

export const InputText = styled.input`
  font-size: 24px;
  padding: 5px 0px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 87%;
  border: 1px solid #000;
  text-align: center;
  &::placeholder {
    text-align: center;
  }
`;

export const InputNumber = styled.input`
  font-size: 24px;
  height: 36px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 10%;
  border: 1px solid #000;
  text-align: center;
`;

export const Button = styled.div`
  grid-column: 3/5;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f7ae48;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);

  & i {
    color: #ffffff;
  }

  &:hover {
    cursor: pointer;
  }
`;
