import { Button, Flex, SearchField } from "@aws-amplify/ui-react";
import { To, useNavigate } from "react-router-dom";

type Props = {
  label?: string;
  dest?: To;
};

const PageHeader = ({ label, dest }: Props) => {
  const navigate = useNavigate();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <SearchField
        label="search"
        placeholder="Search here..."
        backgroundColor="#ffffff"
      />

      {label && dest ? (
        <Button onClick={() => navigate(dest)}>
          <p className="body-sm med">Add {label}</p>
        </Button>
      ) : null}
    </Flex>
  );
};

export default PageHeader;
