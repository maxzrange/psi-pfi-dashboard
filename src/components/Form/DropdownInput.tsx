import { SelectField } from "@aws-amplify/ui-react";
import { Control, useController } from "react-hook-form";
import { InputType } from "types/formType";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const DropdownInput = ({ inputData, control }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
  });

  return (
    <SelectField
      {...field}
      label={inputData.label}
      onChange={field.onChange}
      name={inputData.name}
      hasError={!!error}
      errorMessage={error?.message as string}
    >
      {inputData.items!.map((item, index) => (
        <option key={index.toString()} value={item.id}>
          {item.label}
        </option>
      ))}
    </SelectField>
  );
};

export default DropdownInput;
