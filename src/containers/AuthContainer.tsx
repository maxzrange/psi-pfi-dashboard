import { Flex } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthContainer = ({ children }: Props) => {
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
        minWidth={{ base: 0, medium: "460px" }}
        gap={48}
        padding="0 24px"
        overflow="auto"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default AuthContainer;
