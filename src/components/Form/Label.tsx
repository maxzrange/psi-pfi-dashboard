import { Text } from "@aws-amplify/ui-react";

type Props = {
  label: string;
  required: boolean;
};

const Label = ({ label, required }: Props) => {
  return (
    <p
      className="body-sm med"
      style={{ color: "var(--amplify-components-field-label-color)" }}
    >
      {label}
      {required && (
        <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
          (required)
        </Text>
      )}
    </p>
  );
};

export default Label;
