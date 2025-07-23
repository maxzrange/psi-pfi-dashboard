import { PasswordField, TextField } from "@aws-amplify/ui-react";
import { Control, useController, useWatch } from "react-hook-form";
import { InputType } from "types/formType";
import Label from "./Label";
import { ChangeEvent } from "react";

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

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (inputData.type === "number") {
      const regex = /^(\d+)?(\.\d{0,2})?$/;

      if (value === "" || regex.test(value)) {
        field.onChange(value);
      }
    } else {
      field.onChange(value);
    }
  };

  if (inputData.type === "password" || inputData.type === "confirm")
    return (
      <PasswordField
        {...field}
        name={inputData.name}
        label={<Label label={inputData.label} required={inputData.required} />}
        type="text"
        isRequired={inputData.required}
        hasError={!!error}
        errorMessage={error?.message as string}
      />
    );

  return (
    <TextField
      {...field}
      name={inputData.name}
      label={<Label label={inputData.label} required={inputData.required} />}
      type={inputData.type === "date" ? "date" : "text"}
      inputMode={
        inputData.type === "phone"
          ? "tel"
          : inputData.type === "number"
          ? "numeric"
          : "text"
      }
      onChange={onHandleChange}
      isRequired={inputData.required}
      hasError={!!error}
      errorMessage={error?.message as string}
    />
  );
};

export default TextInput;
