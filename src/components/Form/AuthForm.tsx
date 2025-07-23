import { Button, Flex } from "@aws-amplify/ui-react";
import Logo from "@components/Logo";
import FormFields from "./FormFields";
import { useForm } from "react-hook-form";
import { AuthFormType } from "types/formType";
import { Link } from "react-router-dom";
import { Reuleaux } from "ldrs/react";
import { useLoading } from "@stores/pageStore";

type Props = {
  formData: AuthFormType<any>;
  isLogin?: boolean;
  onSubmit?: (data: any) => void;
};

const AuthForm = ({ formData, isLogin = false, onSubmit }: Props) => {
  const loading = useLoading((state) => state.show);

  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  return (
    <>
      <Flex direction="column" alignItems="center" gap={14}>
        <Logo />

        <h1 style={{ textAlign: "center" }}>{formData.title}</h1>

        <p className="body-sm reg" style={{ textAlign: "center" }}>
          {formData.subTitle}
        </p>
      </Flex>

      <Flex direction="column" gap={24} width="100%">
        <Flex direction={{ base: "column", medium: "row" }}>
          {formData.inputs.map((input, index) => (
            <Flex
              key={index.toString()}
              width={{ base: "100%", medium: "460px" }}
            >
              <FormFields control={control} inputData={input} />
            </Flex>
          ))}
        </Flex>

        {isLogin && (
          <Link
            to="/forgot"
            className="body-sm reg"
            style={{ alignSelf: "end", color: "#737373" }}
          >
            Forgot Password?
          </Link>
        )}
      </Flex>

      <Flex direction="column" width="100%">
        <Button
          variation="primary"
          width="100%"
          maxWidth={460}
          alignSelf="center"
          onClick={handleSubmit((data) => {
            if (onSubmit) onSubmit(data);
          })}
          disabled={loading}
        >
          {loading ? (
            <Reuleaux
              size="14"
              stroke="2"
              strokeLength="0.15"
              bgOpacity="0.1"
              speed="1.2"
              color="#007EB9"
            />
          ) : (
            <p className="body-sm med">{formData.buttonLabel}</p>
          )}
        </Button>

        {isLogin && (
          <p
            className="body-sm reg"
            style={{ textAlign: "center", color: "#737373" }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="body-sm semi"
              style={{
                color: "#047D95",
                textDecoration: "none",
              }}
            >
              Register here
            </Link>
          </p>
        )}
      </Flex>
    </>
  );
};

export default AuthForm;
