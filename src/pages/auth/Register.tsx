import { AuthForm } from "@components/Form";
import AuthContainer from "@containers/AuthContainer";
import { registerForm } from "@utils/constants/form";

const Register = () => {
  return (
    <AuthContainer>
      <AuthForm formData={registerForm} />
    </AuthContainer>
  );
};

export default Register;
