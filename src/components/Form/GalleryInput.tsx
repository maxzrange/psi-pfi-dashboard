import { Button, DropZone, Flex } from "@aws-amplify/ui-react";
import Label from "./Label";
import { InputType } from "types/formType";
import { Control, useController } from "react-hook-form";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const GalleryInput = ({ inputData, control }: Props) => {
  const [preview, setPreview] = useState<
    {
      name: string;
      preview?: string | ArrayBuffer | null;
    }[]
  >([]);

  const { field } = useController({
    name: inputData.name,
    control,
  });

  return (
    <Flex direction="column">
      <Label label={inputData.label} required={inputData.required} />

      <DropZone
        onDropComplete={({ acceptedFiles }) => {
          const newPreviews: {
            name: string;
            preview?: string | ArrayBuffer | null;
          }[] = [];

          acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              newPreviews.push({
                name: file.name,
                preview: e.target?.result,
              });

              if (newPreviews.length === acceptedFiles.length) {
                setPreview((prev) => [...prev, ...newPreviews]);
                field.onChange([...field.value, ...newPreviews]);
              }
            };

            reader.readAsDataURL(file);
          });
        }}
      >
        Drag Image Here
      </DropZone>

      <Flex>
        {preview.map((item, index) => (
          <Flex position="relative">
            <img
              key={index.toString()}
              src={item.preview! as string}
              alt={`Preview ${index}`}
              width={133}
              height={100}
              style={{
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
                objectFit: "cover",
              }}
            />

            <Button
              width="18px"
              height="18px"
              padding="0"
              margin="0"
              borderRadius="50%"
              position="absolute"
              style={{ zIndex: 999 }}
              top={5}
              right={5}
              variation="primary"
              colorTheme="overlay"
            >
              <IoIosClose width="7.71px" height="7.71px" />
            </Button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default GalleryInput;
