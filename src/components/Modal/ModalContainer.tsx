import { Flex } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ModalContainer = ({ children }: Props) => {
  return (
    <Flex
      position="absolute"
      backgroundColor="rgba(23, 23, 23, 0.3)"
      width="100%"
      height="100dvh"
      alignItems="center"
      justifyContent="center"
      style={{
        zIndex: 999,
      }}
    >
      {children}
    </Flex>
  );
};

export default ModalContainer;
