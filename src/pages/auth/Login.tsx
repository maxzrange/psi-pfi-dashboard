import { Button, Flex, Text } from "@aws-amplify/ui-react";
import FormFields from "@components/Form/FormFields";
import Logo from "@components/Logo";
import { useAuth } from "@stores/authStore";
import { loginForm } from "@utils/constants/form";
import { generateEncryption } from "@utils/helpers/generator";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const setAuth = useAuth((state) => state.setToken);

  const nav = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: loginForm.defaultValues,
  });

  return (
    <Flex
      width="100vw"
      height="100dvh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        width={460}
        maxHeight="calc(100dvh - 48px)"
        gap={64}
        padding="0 24px"
        overflow="auto"
      >
        <Flex direction="column" alignItems="center" gap={14}>
          <Logo />

          <h1 style={{ margin: 0, padding: 0, textAlign: "center" }}>
            Sign In
          </h1>

          <Text textAlign="center">
            Please input your registered email and password for signing in
          </Text>
        </Flex>

        <FormFields control={control} inputData={loginForm.inputs} />

        <Button
          variation="primary"
          width="100%"
          onClick={handleSubmit(() => {
            localStorage.setItem("@token", generateEncryption("This is Token"));
            setAuth("This is Token");
            nav("/");
            toast.success("Login success!");
          })}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
