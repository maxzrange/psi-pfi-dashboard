import useHelper from "@hooks/useHelper";
import { LoginInput, RegisterInput, TokenDTO } from "@interfaces/authInterface";
import { login, logout, register } from "@services/authService";
import { useMutation } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helpers/generator";
import { jwtDecode } from "jwt-decode";

const useAuthModel = () => {
  const { auth, nav, onMutate, onSettled, onSuccess, onError } = useHelper();

  const useRegister = () =>
    useMutation({
      mutationKey: ["register"],
      mutationFn: (body: RegisterInput) => register(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => onError(error.message),
      onSuccess: (res) => {
        onSuccess(res.message);
        nav("/login");
      },
    });

  const useLogin = () =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: (body: LoginInput) => login(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => onError(error.message),
      onSuccess: (res) => {
        const decoded: TokenDTO = jwtDecode(res.data.access_token);
        localStorage.setItem(
          "@token",
          generateEncryption(res.data.access_token)
        );
        auth.setToken(res.data.access_token, decoded.sub);
        onSuccess(res.message);
      },
    });

  const useLogout = () =>
    useMutation({
      mutationKey: ["logout"],
      mutationFn: () => logout(auth.token),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (error) => onError(error.message),
      onSuccess: (res) => {
        localStorage.removeItem("@token");
        auth.resetToken();
        onSuccess(res.message);
      },
    });

  return {
    useRegister,
    useLogin,
    useLogout,
  };
};

export default useAuthModel;
