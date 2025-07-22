import styled, { keyframes } from "styled-components";

const dashRotate = keyframes`
  0% {
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0px;
  }
  100% {
    background-position: 100% 0%, 0% 100%, 0% 0%, 100% 100%;
  }
`;

const ButtonStyled = styled.div`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 200px;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #fff 50%, transparent 50%),
      linear-gradient(90deg, #fff 50%, transparent 50%),
      linear-gradient(0deg, #fff 50%, transparent 50%),
      linear-gradient(0deg, #fff 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 16px 4px, 16px 4px, 4px 16px, 4px 16px;
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0px;
    animation: ${dashRotate} 8s linear infinite;
  }
`;

type ButtonProps = {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  ButtonText,
  onClick = () => {},
  disabled = false,
}: ButtonProps) => {
  return (
    <ButtonStyled
      onClick={disabled ? undefined : onClick}
      style={{
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {ButtonText}
    </ButtonStyled>
  );
};

export default Button;
