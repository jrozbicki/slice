import styled from "styled-components";

export const CheckboxContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  overflow: hidden;
  background-color: #2fde2c;
  transition: width 0.3s ease;

  & input[type="checkbox"] {
    display: none;
  }
`;

export const TrashContainer = styled.div`
  grid-column: 3/4;
  margin: auto 0px;
  overflow: hidden;
  color: red;

  & i {
    transform: translate(-100%, 0%);
    transition: transform 0.3s ease;
  }
`;

export const ListItem = styled.div`
  position: relative;
  grid-column: 2/4;
  display: grid;
  grid-template-columns: 7fr 1fr 1fr;

  &${props => props.hover} ${CheckboxContainer} {
    width: 36px;
  }
  &:hover ${TrashContainer} i {
    transform: translate(30%, 0%);
  }
`;

export const Checkbox = styled.span`
  position: absolute;
  top: 18%;
  left: 20%;
  height: 64%;
  width: 60%;
  background-color: #2fde2c;
  border: 3px solid #fff;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: #79f579;
  }

  &:after {
    content: "";
    position: absolute;
    display: ${props => props.display};
    left: 25%;
    width: 30%;
    height: 65%;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const ItemName = styled.div`
  grid-column: 1/2;
  position: relative;
  font-size: 24px;
  padding: 5px 0px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 100%;
  border: 1px solid #000;
  text-align: center;
  background-color: #e0e0e0;
`;

export const ItemQuantity = styled.div`
  grid-column: 2/3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 36px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 100%;
  border: 1px solid #000;
`;
