import { Text } from "@aws-amplify/ui-react";

type Props = {
  label: string;
  required: boolean;
};

const Label = ({ label, required }: Props) => {
  return (
    <Text>
      {label}
      {required && (
        <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
          (required)
        </Text>
      )}
    </Text>
  );
};

export default Label;
