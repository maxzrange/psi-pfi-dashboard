import { Flex, useTheme, View } from "@aws-amplify/ui-react";
import FormFields from "./FormFields";
import FormActions from "./FormActions";
import { FormType } from "types/formType";
import { useForm } from "react-hook-form";

type Props = {
  formData: FormType<any>;
  onSubmit?: (data: any) => Promise<void>;
};


const Form = ({ formData, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  const { tokens } = useTheme();

  const handleSubmitToApi = async (data: any) => {
  if (typeof onSubmit === "function") {
    await onSubmit(data); // ✅ use the destructured prop directly
  } else {
    console.log("Form submitted:", data);
  }
};
 
  return (
    <Flex flex={1} direction="column" gap={14}>
      <Flex alignItems="center" justifyContent="space-between">
        <h2>{formData.title}</h2>

        <Flex>
          <FormActions formOnSubmit={handleSubmit(handleSubmitToApi)} />
        </Flex>
      </Flex>

      <Flex
        direction={{ base: "column", large: "row" }}
        alignItems="flex-start"
        gap={tokens.space.xl}
        minHeight="100vh"
      >
        <View
          backgroundColor="var(--amplify-colors-white)"
          borderRadius="6px"
          width="100%"
          padding="1rem"
        >
          <br></br>
          <FormFields inputData={formData.inputs} control={control} />
        </View>
      </Flex>
    </Flex>
  );
};


export default Form;
