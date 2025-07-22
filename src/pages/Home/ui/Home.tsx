import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomeStyled = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;
`;
const Th = styled.th`
  border: 1px solid #fff;
  padding: 8px;
`;
const Td = styled.td`
  border: 1px solid #fff;
  padding: 8px;
`;
const DeleteButton = styled.button`
  background: #c00;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
`;
const EditButton = styled.button`
  background: #0077cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
  margin-left: 8px;
`;

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

const fetchUsers = async (): Promise<UserGetDto[]> => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
    withCredentials: true,
  });
  return res.data as UserGetDto[];
};

const deleteUser = async (id: string) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`, {
    withCredentials: true,
  });
};

const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<UserGetDto[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <HomeStyled>Loading...</HomeStyled>;
  if (isError) return <HomeStyled>Error loading users</HomeStyled>;

  return (
    <HomeStyled>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: UserGetDto) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.fullName}</Td>
                <Td>{user.email}</Td>
                <Td>
                  {user.id !== "1" ? (
                    <>
                      <DeleteButton
                        onClick={() => mutation.mutate(user.id)}
                        disabled={mutation.status === "pending"}
                      >
                        {mutation.status === "pending" ? "..." : "Удалить"}
                      </DeleteButton>
                      <EditButton
                        onClick={() => navigate(`/user/edit?id=${user.id}`)}
                      >
                        Редактировать
                      </EditButton>
                    </>
                  ) : (
                    <>You cannot delete or edit the admin</>
                  )}
                </Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </HomeStyled>
  );
};

export default Home;
