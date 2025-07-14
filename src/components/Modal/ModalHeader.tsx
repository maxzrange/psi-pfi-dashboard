import { Button, Flex, Text } from "@aws-amplify/ui-react";
import { MdOutlineClose } from "react-icons/md";

type Props = {
  title?: string;
  onClose?: () => void;
};

const ModalHeader = ({ title, onClose }: Props) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      padding="18px 24px"
      style={{ borderBottom: "1px solid #E5E5E5" }}
    >
      <Text fontSize={18} fontWeight={700}>
        {title}
      </Text>

      <Button variation="link" onClick={onClose}>
        <MdOutlineClose color="#A3A3A3" />
      </Button>
    </Flex>
  );
};

export default ModalHeader;
