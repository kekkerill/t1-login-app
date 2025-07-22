import styled from "styled-components";
import RegForm from "../../../widgets/RegForm/ui/RegForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FormPageStyled = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface UserCreateDto {
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  email: string;
  birthDate: string;
  telephone: string;
  employment: string;
  userAgreement: boolean;
}

const Create = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data: UserCreateDto) => {
      const birthDateISO = new Date(data.birthDate).toISOString();
      const newData = {
        name: data.name,
        surName: data.surname,
        password: data.password,
        fullName: data.fullname,
        email: data.email,
        birthDate: birthDateISO,
        telephone: data.telephone,
        employment: data.employment,
        userAgreement: data.userAgreement,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users`,
        newData,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/");
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err?.response?.data?.message || "Ошибка при создании пользователя");
      console.error(err?.response?.data);
    },
  });
  return (
    <FormPageStyled>
      <RegForm onSubmit={(data) => mutation.mutate(data)} />
    </FormPageStyled>
  );
};

export default Create;
