import { Flex, useTheme, View } from "@aws-amplify/ui-react";
import FormFields from "./FormFields";
import FormActions from "./FormActions";
import { FormType } from "types/formType";
import { useForm } from "react-hook-form";

type Props = {
  formData: FormType<any>;
  onSubmit?: (body: any) => void;
  onPreview?: (data?: any) => void;
};

const Form = ({ formData, onSubmit, onPreview }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  const { tokens } = useTheme();

  return (
    <Flex flex={1} direction="column" gap={14}>
      <Flex alignItems="center" justifyContent="space-between">
        <h2>{formData.title}</h2>

        <Flex>
          <FormActions
            formOnSubmit={handleSubmit((data) => {
              if (onSubmit) onSubmit(data);
            })}
            formOnPreview={handleSubmit((data) => {
              if (onPreview) onPreview(data);
            })}
          />
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
