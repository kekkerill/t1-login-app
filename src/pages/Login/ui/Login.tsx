import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../shared/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CustomLink } from "../../../widgets/NavBar/ui/NavBar";
import LoginForm from "../../../widgets/LoginForm/ui/LoginForm";
import type { LoginInputs } from "../../../widgets/LoginForm/ui/LoginForm";
import type { AuthState } from "../../../shared/authStore";

const LoginStyled = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Login = () => {
  const login = useAuthStore((s: AuthState) => s.login);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: LoginInputs) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        data,
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: async () => {
      await login();
      navigate("/");
    },
    onError: (error: unknown) => {
      alert("Login failed");
      console.log(error);
    },
  });
  return (
    <LoginStyled>
      <CustomLink to="/">Back</CustomLink>
      <LoginForm
        onSubmit={(data: LoginInputs) => {
          mutation.mutate(data);
        }}
      />
    </LoginStyled>
  );
};

export default Login;
