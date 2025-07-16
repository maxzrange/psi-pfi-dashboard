import { Text, TextField } from "@aws-amplify/ui-react";
import { Control, useController, useWatch } from "react-hook-form";
import { InputType } from "types/formType";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const TextInput = ({ inputData, control }: Props) => {
  const password = useWatch({ control, name: "password" });

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: {
      ...inputData.rules,
      validate:
        inputData.type === "confirm"
          ? (val) => val === password || "Password confirmation failed!"
          : undefined,
    },
  });

  return (
    <TextField
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
      type={inputData.type}
      isRequired={inputData.required}
      hasError={!!error}
      errorMessage={error?.message as string}
    />
  );
};

export default TextInput;
