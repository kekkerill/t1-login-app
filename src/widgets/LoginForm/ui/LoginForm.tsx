import { useForm } from "react-hook-form";
import styled from "styled-components";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  background-color: #000;
`;

const CustomLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
`;
const CustomInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  color: #000;
  border-radius: 5px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
interface LoginInputs {
  email: string;
  password: string;
}

type LoginFormProps = {
  onSubmit: (data: LoginInputs) => void;
};

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  return (
    <CustomForm noValidate onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <CustomLabel>Email</CustomLabel>
        <CustomInput
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: emailPattern })}
        />
        {errors.email && (
          <span style={{ color: "red" }}>Enter a valid email</span>
        )}
      </InputWrapper>
      <InputWrapper>
        <CustomLabel>Password</CustomLabel>
        <CustomInput
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        {errors.password && (
          <span style={{ color: "red" }}>Password is required</span>
        )}
      </InputWrapper>
      <button type="submit">Login</button>
    </CustomForm>
  );
};

export type { LoginInputs };
export default LoginForm;
