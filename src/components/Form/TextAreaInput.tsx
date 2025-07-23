import { TextAreaField } from "@aws-amplify/ui-react";
import { Control, useController } from "react-hook-form";
import { InputType } from "types/formType";
import Label from "./Label";

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
      label={<Label label={inputData.label} required={inputData.required} />}
      rows={6}
      isRequired={inputData.required}
      hasError={!!error}
      errorMessage={error?.message as string}
    />
  );
};

export default TextAreaInput;
