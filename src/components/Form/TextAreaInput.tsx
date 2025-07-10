import { Text, TextAreaField } from "@aws-amplify/ui-react";
import { Control, useController } from "react-hook-form";
import { InputType } from "types/formType";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const TextAreaInput = ({ inputData, control }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  return (
    <TextAreaField
      {...field}
      name={inputData.name}
      label={
        <Text>
          {inputData.label}
          {inputData.required && (
            <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
              (required)
            </Text>
          )}
        </Text>
      }
      rows={6}
      isRequired={inputData.required}
      hasError={!!error}
      errorMessage={error?.message as string}
    />
  );
};

export default TextAreaInput;
