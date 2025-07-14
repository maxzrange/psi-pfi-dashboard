import { useConfirmationModal } from "@stores/modalStore";
import { AnimatePresence } from "motion/react";
import ModalContainer from "./ModalContainer";
import { Flex, Text } from "@aws-amplify/ui-react";
import ModalFooter from "./ModalFooter";

const ConfirmationModal = () => {
  const confirmationModal = useConfirmationModal();

  return (
    <AnimatePresence>
      {confirmationModal.show && (
        <ModalContainer
          width="480px"
          title={confirmationModal.data?.title}
          onClose={confirmationModal.hideModal}
        >
          <Flex direction="column" padding="18px 24px">
            <Text>
              {confirmationModal.data?.subTitle
                .split("|")
                .map((data, index) => (
                  <Text as="span" fontWeight={index === 1 ? 700 : 400}>
                    {data}
                  </Text>
                ))}
            </Text>
          </Flex>

          <ModalFooter onClose={confirmationModal.hideModal} />
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
