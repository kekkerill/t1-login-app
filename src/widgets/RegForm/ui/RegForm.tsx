import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  background-color: #000;
`;

const FormColumns = styled.div`
  display: flex;
  gap: 20px;
`;

const FormCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

interface Inputs {
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

type RegFormProps = {
  onSubmit: (data: Inputs) => void;
  initialValues?: Partial<Inputs>;
  isEdit?: boolean;
};

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phonePattern = /^\+79\d{9}$/;

const RegForm = ({ onSubmit, initialValues, isEdit }: RegFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: initialValues,
  });

  const [isFullnameDirty, setIsFullnameDirty] = useState(false);
  const name = watch("name") || "";
  const surname = watch("surname") || "";
  const fullname = watch("fullname") || "";
  const password = watch("password") || "";

  useEffect(() => {
    if (!isFullnameDirty) {
      const autoFullname = `${name} ${surname}`.trim().slice(0, 130);
      setValue("fullname", autoFullname);
    }
  }, [name, surname, isFullnameDirty, setValue]);

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFullnameDirty(true);
    setValue("fullname", e.target.value);
  };

  const handleFormSubmit = (data: Inputs) => {
    onSubmit(data);
  };

  return (
    <CustomForm noValidate onSubmit={handleSubmit(handleFormSubmit)}>
      <FormColumns>
        <FormCol>
          <CustomLabel>Name</CustomLabel>
          <CustomInput
            maxLength={64}
            type="text"
            placeholder="Name"
            {...register("name", { required: true, maxLength: 64 })}
          />
          <div style={{ fontSize: "12px", color: "#aaa" }}>
            {name.length} / 64
          </div>
          {errors.name && (
            <span style={{ color: "red" }}>Name is required </span>
          )}

          <CustomLabel>Surname</CustomLabel>
          <CustomInput
            maxLength={64}
            type="text"
            placeholder="Surname"
            {...register("surname", { required: true, maxLength: 64 })}
          />
          <div style={{ fontSize: "12px", color: "#aaa" }}>
            {surname.length} / 64
          </div>
          {errors.surname && (
            <span style={{ color: "red" }}>Surname is required </span>
          )}

          <CustomLabel>Full name</CustomLabel>
          <CustomInput
            type="text"
            maxLength={130}
            placeholder="Full name"
            {...register("fullname", { required: true, maxLength: 130 })}
            value={fullname}
            onChange={handleFullnameChange}
          />
          <div style={{ fontSize: "12px", color: "#aaa" }}>
            {fullname.length} / 130
          </div>
          {errors.fullname && (
            <span style={{ color: "red" }}>Full name is required</span>
          )}

          {/* Email */}
          {!isEdit && (
            <>
              <CustomLabel>Email</CustomLabel>
              <CustomInput
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: emailPattern,
                })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>Enter a valid email</span>
              )}
            </>
          )}

          <CustomLabel>Telephone</CustomLabel>
          <CustomInput
            type="tel"
            placeholder="+79XXXXXXXXX"
            maxLength={12}
            minLength={12}
            {...register("telephone", {
              required: true,
              minLength: 12,
              maxLength: 12,
              pattern: phonePattern,
            })}
          />
          {errors.telephone && (
            <span style={{ color: "red" }}>
              Phone must start with +79 and contain 12 digits (e.g.
              +79XXXXXXXXX)
            </span>
          )}
        </FormCol>
        <FormCol>
          {/* Password */}
          {!isEdit && (
            <>
              <CustomLabel>Password</CustomLabel>
              <CustomInput
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>Password is required</span>
              )}

              <CustomLabel>Confirm Password</CustomLabel>
              <CustomInput
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span style={{ color: "red" }}>
                  {errors.confirmPassword.message ||
                    "Confirm password is required"}
                </span>
              )}
            </>
          )}

          <CustomLabel>Birth Date</CustomLabel>
          <CustomInput
            min="1920-01-01"
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                .toISOString()
                .split("T")[0]
            }
            type="date"
            {...register("birthDate")}
          />

          <CustomLabel>Employment</CustomLabel>
          <select {...register("employment")}>
            <option value="" hidden>
              Select employment
            </option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="other">Other</option>
          </select>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomLabel>User agreement</CustomLabel>
            <CustomInput type="checkbox" {...register("userAgreement")} />
          </div>
          <button type="submit">{isEdit ? "Confirm edit" : "Register"}</button>
        </FormCol>
      </FormColumns>
    </CustomForm>
  );
};

export default RegForm;
