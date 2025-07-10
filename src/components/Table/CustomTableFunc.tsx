import { Flex, Menu, MenuItem, TableCell, Text } from "@aws-amplify/ui-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { RowFuncType } from "types/pageType";

type Props = {
  funcData: RowFuncType[];
};

const CustomTableFunc = ({ funcData }: Props) => {
  return (
    <TableCell>
      <Menu menuAlign="end">
        {funcData.map((func, index) => (
          <MenuItem key={index.toString()} onClick={() => func.onClick()}>
            <Flex alignItems="center">
              {func.type === "detail" ? (
                <AiOutlineExclamationCircle />
              ) : func.type === "edit" ? (
                <MdOutlineEdit />
              ) : (
                <MdDeleteOutline />
              )}

              <Text marginTop={-3}>
                {func.type === "detail"
                  ? "Detail"
                  : func.type === "edit"
                  ? "Edit"
                  : "Delete"}
              </Text>
            </Flex>
          </MenuItem>
        ))}
      </Menu>
    </TableCell>
  );
};

export default CustomTableFunc;
