import { Autocomplete, Flex, Text } from "@aws-amplify/ui-react";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { InputType } from "types/formType";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const SuggestionInput = ({ inputData, control }: Props) => {
  const [sugg, setSugg] = useState("");

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: {
      ...inputData.rules,
      validate: () => sugg === "" || "Customer not registered!",
    },
  });

  return (
    <Flex direction="column" gap="small">
      <Text>
        {inputData.label}
        {inputData.required && (
          <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
            (required)
          </Text>
        )}
      </Text>

      <Autocomplete
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
        options={inputData.items!}
        onSelect={(option) => {
          field.onChange(option);
          setSugg("");
        }}
        onChange={(e) => setSugg(e.target.value)}
        onClear={() => field.onChange(null)}
        isRequired={inputData.required}
        hasError={!!error}
        errorMessage={error?.message as string}
      />
    </Flex>
  );
};

export default SuggestionInput;
