import { DefectDocument } from "@components/Document";
import ModalContainer from "./ModalContainer";
import { PDFViewer } from "@react-pdf/renderer";
import { useDocumentModal } from "@stores/modalStore";
import { AnimatePresence } from "motion/react";

const DocumentModal = () => {
  const documentModal = useDocumentModal();

  return (
    <AnimatePresence>
      {documentModal.show && (
        <ModalContainer
          width="1000px"
          height="calc(100dvh - 48px)"
          title="Defect A"
          onClose={documentModal.hideModal}
        >
          <PDFViewer height={500}>
            <DefectDocument defectData={documentModal.data!} />
          </PDFViewer>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default DocumentModal;
