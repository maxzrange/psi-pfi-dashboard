import { Button } from "@aws-amplify/ui-react";
import { MouseEvent } from "react";

interface FormActionsProps {
  formOnSubmit: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const FormActions = (props: FormActionsProps) => {
  const { formOnSubmit, isLoading, isDisabled } = props;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    formOnSubmit();
  };

  return (
    <>
      <Button>Preview</Button>

      <Button
        type="submit"
        variation="primary"
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText="Loading..."
        isDisabled={isDisabled}
      >
        Save
      </Button>
    </>
  );
};

export default FormActions;
