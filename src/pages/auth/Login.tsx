import { AuthForm } from "@components/Form";
import AuthContainer from "@containers/AuthContainer";
import { useAuth } from "@stores/authStore";
import { loginForm } from "@utils/constants/form";
import { generateEncryption } from "@utils/helpers/generator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const setAuth = useAuth((state) => state.setToken);

  const nav = useNavigate();

  return (
    <AuthContainer>
      <AuthForm
        formData={loginForm}
        isLogin
        onSubmit={(data) => {
          console.log(data);
          localStorage.setItem("@token", generateEncryption("This is Token"));
          setAuth("This is Token");
          nav("/");
          toast.success("Login success!");
        }}
      />
    </AuthContainer>
  );
};

export default Login;
