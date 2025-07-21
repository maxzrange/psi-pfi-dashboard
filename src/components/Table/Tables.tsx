import { ScrollView, Tabs, TabItem, Flex } from "@aws-amplify/ui-react";
import BasicTable from "./BasicTable";
import { FetchDataType, TableType } from "types/pageType";
import { PageHeader } from "@components/Header";

type Props = {
  tableData: TableType[];
  fetchData: FetchDataType[][];
};

const Tables = ({ tableData, fetchData }: Props) => {
  return (
    <>
      <Tabs defaultValue="tab1">
        {tableData.map((item, index) => (
          <TabItem key={index.toString()} title={item.title} value="tab1">
            <Flex
              direction="column"
              backgroundColor="var(--amplify-colors-white)"
              borderRadius="6px"
              maxWidth="100%"
              padding="1rem"
              minHeight="80vh"
              gap={14}
            >
              <PageHeader label={item.title} dest={item.addDest} />

              <ScrollView width="100%">
                <BasicTable
                  headerData={item.tableHeaders}
                  rowData={fetchData[index]}
                />
              </ScrollView>
            </Flex>
          </TabItem>
        ))}
      </Tabs>
    </>
  );
};

export default Tables;
