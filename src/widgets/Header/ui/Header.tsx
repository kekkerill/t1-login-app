import styled from "styled-components";

const HeaderStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #000;
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  background-image: linear-gradient(to right, #fff 60%, #000 10%);
  background-position: bottom;
  background-size: 20px 3px;
  background-repeat: repeat-x;
`;
const Header = () => {
  return <HeaderStyled>T1 Login App</HeaderStyled>;
};

export default Header;
