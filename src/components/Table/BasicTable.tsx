import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
} from "@aws-amplify/ui-react";
import { mockSongsData } from "@data/mock";
import { useNavigate } from "react-router-dom";

type Props = {
  headerData: string[];
};

const data = mockSongsData(10);

const BasicTable = ({ headerData }: Props) => {
  const navigate = useNavigate();

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
          {data?.map((item) => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate("/edit-form")}>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default BasicTable;
