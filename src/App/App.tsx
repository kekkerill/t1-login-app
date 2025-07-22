import Header from "../widgets/Header/ui/Header";
import styled from "styled-components";
import NavBar from "../widgets/NavBar/ui/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/ui/Home";
import Create from "../pages/Create/ui/Create";
import Edit from "../pages/Edit/ui/Edit";
import Login from "../pages/Login/ui/Login";
import { useEffect } from "react";
import { useAuthStore } from "../shared/authStore";
import { useNavigate, useLocation } from "react-router-dom";

const AppStyled = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: #000;
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainLayout = () => {
  return (
    <>
      <Header />
      <AppStyled>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/create" element={<Create />} />
          <Route path="/user/edit" element={<Edit />} />
        </Routes>
      </AppStyled>
    </>
  );
};

const LoginLayout = () => {
  return (
    <LoginContainer>
      <Login />
    </LoginContainer>
  );
};

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const isAuth = useAuthStore((s) => s.isAuth);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    if (!isAuth && location.pathname !== "/login") {
      navigate("/login");
    }
    if (isAuth && location.pathname === "/login") {
      navigate("/");
    }
  }, [isAuth, location, navigate]);
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthGate>
        <Routes>
          <Route path="/login" element={<LoginLayout />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </AuthGate>
    </BrowserRouter>
  );
}

export default App;
