import { useAuth } from "@stores/authStore";
import { useEffect, useState } from "react";

const usePrepare = () => {
  const [isPreparing, setIsPreparing] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    setIsPreparing(true);
    auth.checkIsLoggedIn();

    const timeout = setTimeout(() => {
      setIsPreparing(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return {
    isPreparing,
    isLoggedIn: auth.token !== "",
  };
};

export default usePrepare;
