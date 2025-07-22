import { AuthForm } from "@components/Form";
import AuthContainer from "@containers/AuthContainer";
import useAuthController from "@controllers/authController";
import { loginForm } from "@utils/constants/form";

const Login = () => {
  const { loginService } = useAuthController();

  return (
    <AuthContainer>
      <AuthForm formData={loginForm} isLogin onSubmit={loginService} />
    </AuthContainer>
  );
};

export default Login;
