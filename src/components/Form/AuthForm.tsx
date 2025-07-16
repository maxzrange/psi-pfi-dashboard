import { Button, Flex, Text } from "@aws-amplify/ui-react";
import Logo from "@components/Logo";
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";
import { AuthFormType } from "types/formType";
import { Link } from "react-router-dom";

type Props = {
  formData: AuthFormType<any>;
  isLogin?: boolean;
  onSubmit?: (data: any) => void;
};

const AuthForm = ({ formData, isLogin = false, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  return (
    <>
      <Flex direction="column" alignItems="center" gap={14}>
        <Logo />

        <h1 style={{ margin: 0, padding: 0, textAlign: "center" }}>
          {formData.title}
        </h1>

        <Text textAlign="center">{formData.subTitle}</Text>
      </Flex>

      <Flex direction="column" gap={24} width="100%">
        <FormFields control={control} inputData={formData.inputs} />

        {isLogin && (
          <Link to="/forgot" style={{ alignSelf: "end", color: "#737373" }}>
            Forgot Password?
          </Link>
        )}
      </Flex>

      <Flex direction="column" width="100%">
        <Button
          variation="primary"
          width="100%"
          onClick={handleSubmit((data) => {
            if (onSubmit) onSubmit(data);
          })}
        >
          {formData.buttonLabel}
        </Button>

        {isLogin && (
          <Text textAlign="center" color="#737373">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#047D95",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </Text>
        )}
      </Flex>
    </>
  );
};

export default AuthForm;
