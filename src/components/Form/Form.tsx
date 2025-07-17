import { Flex, useTheme, View } from "@aws-amplify/ui-react";
import FormFields from "./FormFields";
import FormActions from "./FormActions";
import { FormType } from "types/formType";
import { useForm } from "react-hook-form";

type Props = {
  formData: FormType<any>;
};

const Form = ({ formData }: Props) => {
  const { control, handleSubmit } = useForm({
    defaultValues: formData.defaultValues,
  });

  const { tokens } = useTheme();

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <h2>{formData.title}</h2>

        <Flex>
          <FormActions
            formOnSubmit={handleSubmit((data) => console.log(data))}
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

        {/* <View
          backgroundColor="var(--amplify-colors-white)"
          borderRadius="6px"
          width={{ base: "100%", large: "30%" }}
          padding="1rem"
          minHeight="40vh"
        ></View> */}
      </Flex>
    </>
  );
};

export default Form;
