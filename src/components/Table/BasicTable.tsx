import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import { FetchDataType } from "types/pageType";
import CustomTableRow from "./CustomTableRow";
import CustomTableFunc from "./CustomTableFunc";

type Props = {
  headerData: string[];
  rowData: FetchDataType[];
};

const BasicTable = ({ headerData, rowData }: Props) => {
  return (
    <>
      <Table caption="" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            {headerData.map((header, index) => (
              <TableCell key={index.toString()} as="th">
                {header}
              </TableCell>
            ))}

            <TableCell as="th"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rowData.map((item) => {
            return (
              <TableRow key={item.id}>
                <CustomTableRow rowData={item.row} />

                <CustomTableFunc funcData={item.functions} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default BasicTable;
