import { Flex } from "@aws-amplify/ui-react";
import { Control } from "react-hook-form";
import { InputType } from "types/formType";
import MapInput from "./MapInput";
import DropdownInput from "./DropdownInput";
import SuggestionInput from "./SuggestionInput";
import TextAreaInput from "./TextAreaInput";
import TextInput from "./TextInput";
import TabInput from "./TabInput";

interface FormFieldProps {
  inputData: InputType[];
  control: Control<any, any>;
}

const FormFields = (props: FormFieldProps) => {
  const { inputData, control } = props;

  return (
    <>
      <Flex direction="column" width="100%">
        {inputData.map((input, index) => {
          if (input.type === "dropdown")
            return (
              <DropdownInput
                key={index.toString()}
                inputData={input}
                control={control}
              />
            );

          if (input.type === "auto")
            return (
              <SuggestionInput
                key={index.toString()}
                inputData={input}
                control={control}
              />
            );

          if (input.type === "textarea")
            return (
              <TextAreaInput
                key={index.toString()}
                inputData={input}
                control={control}
              />
            );

          if (input.type === "map")
            return (
              <MapInput
                key={index.toString()}
                inputData={input}
                control={control}
              />
            );

          if (input.type === "tab")
            return (
              <TabInput
                key={index.toString()}
                tabData={input}
                control={control}
              />
            );

          return (
            <TextInput
              key={index.toString()}
              inputData={input}
              control={control}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default FormFields;
