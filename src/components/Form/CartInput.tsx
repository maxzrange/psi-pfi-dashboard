import { Button, Flex } from "@aws-amplify/ui-react";
import { Control, useFieldArray } from "react-hook-form";
import { InputType } from "types/formType";
import Label from "./Label";
import { IoIosAddCircle } from "react-icons/io";
import FormFields from "./FormFields";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  cartData: InputType;
  control: Control;
};

const CartInput = ({ cartData, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: cartData.name,
    control,
  });

  return (
    <Flex
      direction="column"
      backgroundColor={cartData.cartData!.background}
      padding={cartData.cartData!.background ? "14px" : 0}
      borderRadius={8}
    >
      <Label label={cartData.label} required={cartData.required} />

      {fields.map((field, index) => (
        <Flex
          direction="column"
          key={field.id}
          border="1px solid #E2E8F0"
          padding={24}
          backgroundColor="white"
          borderRadius={8}
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <h2>
              {cartData.cartData!.title} {index + 1}
            </h2>

            <Button variation="warning" onClick={() => remove(index)}>
              <FaRegTrashAlt />
            </Button>
          </Flex>

          <FormFields
            inputData={cartData.cartData!.inputs.map((input) => ({
              ...input,
              name: `${cartData.name}.${index}.${input.name}`,
            }))}
            control={control}
          />
        </Flex>
      ))}

      <Flex
        alignItems="center"
        justifyContent="center"
        padding="12px 12px 0 12px"
        style={{ borderTop: "1px solid #E2E8F0" }}
      >
        <Button
          direction="row"
          variation="menu"
          alignItems="center"
          gap={8}
          onClick={() => append(cartData.cartData!.defaultValues)}
        >
          <IoIosAddCircle />

          <p className="body-sm med">Add Item</p>
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartInput;
