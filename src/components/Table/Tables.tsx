import { View, Heading, ScrollView, Button, Flex } from "@aws-amplify/ui-react";
import BasicTable from "./BasicTable";
import { TableType } from "types/pageType";
import { useNavigate } from "react-router-dom";

type Props = {
  tableData: TableType;
};

const Tables = ({ tableData }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>{tableData.title}</h2>
      </div>

      <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Heading color="#333"> {tableData.subTitle} </Heading>
          {tableData.addDest && (
            <Button onClick={() => navigate(tableData.addDest!)}>
              Add {tableData.title}
            </Button>
          )}
        </Flex>

        <br></br>
        <ScrollView width="100%">
          <BasicTable headerData={tableData.tableHeaders} />
        </ScrollView>
      </View>
    </>
  );
};

export default Tables;
