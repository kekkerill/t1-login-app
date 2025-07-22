import RegForm from "../../../widgets/RegForm/ui/RegForm";
import { FormPageStyled } from "../../Create/ui/Create";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

interface UserGetDto {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

interface UserPatchDto {
  name: string;
  surname: string;
  fullname: string;
  birthDate: string;
  telephone: string;
  employment: string;
  userAgreement: boolean;
}

const fetchUser = async (id: string): Promise<UserGetDto> => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data as UserGetDto;
};

const Edit = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<UserGetDto>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: async (data: UserPatchDto) => {
      const newData = {
        name: data.name,
        surName: data.surname,
        fullName: data.fullname,
        birthDate: data.birthDate
          ? new Date(data.birthDate).toISOString()
          : undefined,
        telephone: data.telephone,
        employment: data.employment,
        userAgreement: data.userAgreement,
      };
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
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
      alert(
        err?.response?.data?.message || "Ошибка при редактировании пользователя"
      );
      console.error(err?.response?.data);
    },
  });

  const initialValues = useMemo(() => {
    if (!user) return undefined;
    return {
      name: user.name,
      surname: user.surName,
      password: "",
      confirmPassword: "",
      fullname: user.fullName,
      email: user.email,
      birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
      telephone: user.telephone || "",
      employment: user.employment || "",
      userAgreement: !!user.userAgreement,
    };
  }, [user]);

  if (isLoading || !initialValues)
    return <FormPageStyled>Загрузка...</FormPageStyled>;

  return (
    <FormPageStyled>
      <RegForm
        onSubmit={(data) => mutation.mutate(data)}
        initialValues={initialValues}
        isEdit={true}
      />
    </FormPageStyled>
  );
};

export default Edit;
