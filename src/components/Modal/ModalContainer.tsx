import { Flex } from "@aws-amplify/ui-react";
import { motion } from "motion/react";
import { ReactNode } from "react";
import ModalHeader from "./ModalHeader";

type Props = {
  children: ReactNode;
  width: string;
  height?: string;
  title?: string;
  onClose?: () => void;
};

const ModalContainer = ({ children, width, height, title, onClose }: Props) => {
  const MotionFlex = motion.create(Flex);

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
      <MotionFlex
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        direction="column"
        width={width}
        height={height}
        maxHeight="calc(100dvh - 48px)"
        backgroundColor="white"
        borderRadius={8}
      >
        <ModalHeader title={title} onClose={onClose} />

        {children}
      </MotionFlex>
    </Flex>
  );
};

export default ModalContainer;
