import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  TableCell,
  Text,
} from "@aws-amplify/ui-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  MdDeleteOutline,
  MdDisabledByDefault,
  MdOutlineEdit,
} from "react-icons/md";
import { RowFuncType } from "types/pageType";
import { CiMenuKebab } from "react-icons/ci";

type Props = {
  funcData: RowFuncType[];
};

const CustomTableFunc = ({ funcData }: Props) => {
  return (
    <TableCell>
      <Menu
        menuAlign="end"
        trigger={
          <MenuButton width="32px" height="32px">
            <Flex>
              <CiMenuKebab size={18} />
            </Flex>
          </MenuButton>
        }
      >
        {funcData.map((func, index) => {
          const Icon = func.icon ?? MdDisabledByDefault;

          return (
            <MenuItem key={index.toString()} onClick={() => func.onClick()}>
              <Flex alignItems="center">
                {func.type === "detail" ? (
                  <AiOutlineExclamationCircle />
                ) : func.type === "edit" ? (
                  <MdOutlineEdit />
                ) : func.type === "custom" ? (
                  <Icon />
                ) : (
                  <MdDeleteOutline />
                )}

                <Text marginTop={-3}>
                  {func.type === "detail"
                    ? "Detail"
                    : func.type === "edit"
                    ? "Edit"
                    : func.type === "delete"
                    ? "Delete"
                    : func.label}
                </Text>
              </Flex>
            </MenuItem>
          );
        })}
      </Menu>
    </TableCell>
  );
};

export default CustomTableFunc;
