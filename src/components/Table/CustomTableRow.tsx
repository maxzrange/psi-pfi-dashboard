import { Flex, TableCell, Text } from "@aws-amplify/ui-react";
import {
  IoIosCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { MdPendingActions } from "react-icons/md";
import { RowType } from "types/pageType";

type Props = {
  rowData: RowType[];
};

const CustomTableRow = ({ rowData }: Props) => {
  return (
    <>
      {rowData.map((row, index) => (
        <TableCell
          key={index.toString()}
          style={{ verticalAlign: row.type !== "text" ? "center" : "top" }}
        >
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            gap={5}
            color={
              row.type === "pending"
                ? "#CA8A04"
                : row.type === "failed"
                ? "#DC2626"
                : row.type === "success"
                ? "#16A34A"
                : "default"
            }
            style={{
              padding: row.type !== "text" ? "12px" : 0,
              backgroundColor:
                row.type === "pending"
                  ? "#FEF9C3"
                  : row.type === "failed"
                  ? "#FEE2E2"
                  : row.type === "success"
                  ? "#BBF7D0"
                  : "none",
              border:
                row.type !== "text"
                  ? `1px solid ${
                      row.type === "pending"
                        ? "#CA8A04"
                        : row.type === "failed"
                        ? "#DC2626"
                        : "#16A34A"
                    }`
                  : "none",
              borderRadius: row.type === "text" ? 0 : 100,
            }}
          >
            {row.type === "pending" ? (
              <MdPendingActions />
            ) : row.type === "failed" ? (
              <IoMdCloseCircleOutline />
            ) : row.type === "success" ? (
              <IoIosCheckmarkCircleOutline />
            ) : null}

            <Text
              marginTop={-3}
              color={
                row.type === "pending"
                  ? "#CA8A04"
                  : row.type === "failed"
                  ? "#DC2626"
                  : row.type === "success"
                  ? "#16A34A"
                  : "default"
              }
            >
              {row.value}
            </Text>
          </Flex>
        </TableCell>
      ))}
    </>
  );
};

export default CustomTableRow;
