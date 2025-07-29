import { Flex, Placeholder } from "@aws-amplify/ui-react";

const TablePlaceholder = () => {
  const data = Array.from({ length: 10 }).fill(0);

  return (
    <Flex direction="column" gap={1}>
      {data.map((_, index) => (
        <Placeholder key={index.toString()} height={50} />
      ))}
    </Flex>
  );
};

export default TablePlaceholder;
