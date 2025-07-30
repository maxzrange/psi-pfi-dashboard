import { Button, Flex } from "@aws-amplify/ui-react";
import { Control, useFieldArray } from "react-hook-form";
import { InputType } from "types/formType";
import TextInput from "./TextInput";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  name: string;
  rowData: InputType[];
  defaultValues: any;
  control: Control<any, any>;
  tabIndex: number;
};

const TabInputRow = ({
  name,
  rowData,
  defaultValues,
  control,
  tabIndex,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: `${name}.${tabIndex}`,
    control,
  });

  return (
    <>
      <Flex direction="column" gap="0">
        {fields.map((field, index) => (
          <Flex
            key={field.id}
            flex={1}
            padding={14}
            alignItems="center"
            style={{ borderBottom: "1px solid #E5E5E5" }}
          >
            {rowData.map((row, index2) => (
              <TextInput
                flex={1}
                key={index2.toString()}
                inputData={{
                  ...row,
                  name: `${name}.${tabIndex}.${index}.${row.name}`,
                }}
                control={control}
                withLabel={false}
              />
            ))}

            <Flex
              width={70}
              height="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Button variation="warning" onClick={() => remove(index)}>
                <FaRegTrashAlt />
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Flex padding={12} alignItems="center" justifyContent="center">
        <Button
          direction="row"
          variation="menu"
          alignItems="center"
          gap={8}
          onClick={() => append(defaultValues)}
        >
          <IoIosAddCircle />

          <p className="body-sm med">Add Item</p>
        </Button>
      </Flex>
    </>
  );
};

export default TabInputRow;
