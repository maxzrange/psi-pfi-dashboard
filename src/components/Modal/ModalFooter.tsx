import { Button, Flex } from "@aws-amplify/ui-react";

type Props = {
  onSubmit?: () => void;
  onClose?: () => void;
};

const ModalFooter = ({ onSubmit, onClose }: Props) => {
  return (
    <Flex
      justifyContent="end"
      padding="14px 24px"
      style={{ borderTop: "1px solid #E5E5E5" }}
    >
      <Button variation="primary" onClick={onClose} colorTheme="overlay">
        Cancel
      </Button>

      <Button
        onClick={() => {
          if (onClose && onSubmit) {
            onSubmit();
            onClose();
          }
        }}
        colorTheme="info"
      >
        Confirm
      </Button>
    </Flex>
  );
};

export default ModalFooter;
