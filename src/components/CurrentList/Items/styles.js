import styled from "styled-components";

export const ListItem = styled.div`
  grid-column: 2/3;
  display: flex;
`;

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

  &:active &:after {
    display: block;
  }
`;

export const ItemName = styled.div`
  position: relative;
  font-size: 24px;
  padding: 5px 0px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 87%;
  border: 1px solid #000;
  text-align: center;
  background-color: #e0e0e0;

  &:hover ${CheckboxContainer} {
    width: 36px;
  }
`;

export const ItemQuantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 36px;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.75);
  width: 12%;
  border: 1px solid #000;
`;
