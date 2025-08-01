import { Button } from "@aws-amplify/ui-react";
import { useLoading } from "@stores/pageStore";
import { Reuleaux } from "ldrs/react";
import { MouseEvent } from "react";

interface FormActionsProps {
  formOnSubmit: () => void;
  formOnPreview?: () => void;
}

const FormActions = ({ formOnSubmit, formOnPreview }: FormActionsProps) => {
  const loading = useLoading((state) => state.show);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formOnSubmit();
  };

  return (
    <>
      <Button onClick={formOnPreview}>Preview</Button>

      <Button
        type="submit"
        variation="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <Reuleaux
            size="14"
            stroke="2"
            strokeLength="0.15"
            bgOpacity="0.1"
            speed="1.2"
            color="#007EB9"
          />
        ) : (
          <p className="body-sm med">Save</p>
        )}
      </Button>
    </>
  );
};

export default FormActions;
