import { AuthForm } from "@components/Form";
import AuthContainer from "@containers/AuthContainer";
import useAuthController from "@controllers/authController";
import { registerForm } from "@utils/constants/form";

const Register = () => {
  const { registerService } = useAuthController();

  return (
    <AuthContainer>
      <AuthForm formData={registerForm} onSubmit={registerService} />
    </AuthContainer>
  );
};

export default Register;
