import { AuthForm } from "@components/Form";
import AuthContainer from "@containers/AuthContainer";
import { forgotForm } from "@utils/constants/form";

const Forgot = () => {
  return (
    <AuthContainer>
      <AuthForm formData={forgotForm} />
    </AuthContainer>
  );
};

export default Forgot;
