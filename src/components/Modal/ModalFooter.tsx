import { Button, Flex } from "@aws-amplify/ui-react";
import { useLoading } from "@stores/pageStore";

type Props = {
  onSubmit?: () => void;
  onClose?: () => void;
};

const ModalFooter = ({ onSubmit, onClose }: Props) => {
  const loading = useLoading((state) => state.show);

  return (
    <Flex
      justifyContent="end"
      padding="14px 24px"
      style={{ borderTop: "1px solid #E5E5E5" }}
    >
      <Button
        variation="primary"
        onClick={onClose}
        colorTheme="overlay"
        disabled={loading}
      >
        Cancel
      </Button>

      <Button
        onClick={() => {
          if (onClose && onSubmit) {
            onSubmit();
            onClose();
          }
        }}
        variation="primary"
        disabled={loading}
      >
        Confirm
      </Button>
    </Flex>
  );
};

export default ModalFooter;
