import styled from "styled-components";

export const Flex = styled.div``;

export const Title = styled.h3`
  font-size: 24px;
  margin: auto;
  grid-column: 2/3;
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
