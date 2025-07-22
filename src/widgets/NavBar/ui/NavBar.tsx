import styled from "styled-components";
import Button from "../../../shared/ui/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../shared/authStore";
import { useNavigate } from "react-router-dom";

const NavBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 15%;
  height: calc(100vh - 100px);
  background-color: #000;
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  background-image: linear-gradient(#fff 60%, #000 10%);
  background-position: right;
  background-size: 3px 20px;
  background-repeat: repeat-y;
`;
export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
const routes = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/user/create",
    text: "Create User",
  },
];
const NavBar = () => {
  const logout = useAuthStore((s) => s.logout);
  const isAuth = useAuthStore((s) => s.isAuth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <NavBarStyled>
      {routes.map((route) => (
        <CustomLink to={route.path} key={route.path}>
          <Button ButtonText={route.text} />
        </CustomLink>
      ))}
      {isAuth && <Button ButtonText="Logout" onClick={handleLogout} />}
    </NavBarStyled>
  );
};

export default NavBar;
