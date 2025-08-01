import { Document, Page, Text, View } from "@react-pdf/renderer";
import { DocumentType } from "types/pageType";
import DefectTable from "./DefectTable";

type Props = {
  defectData: DocumentType[];
};

const DefectDocument = ({ defectData }: Props) => {
  return (
    <Document>
      <Page size="A4" style={{ padding: "24px" }}>
        {defectData.map((item, index) => (
          <View key={index.toString()} style={{ flex: 1, gap: 32 }}>
            <View style={{ gap: 14 }}>
              <Text style={{ fontWeight: 700, textDecoration: "underline" }}>
                {item.title}
              </Text>

              <DefectTable
                images={item.image}
                name={`Photograph 18${index + 1}`}
                detail={item.detail}
                observation={item.observation}
                defect={item.defect}
                withRecom={false}
              />
            </View>

            {item.table.map((table, index2) => (
              <DefectTable
                key={index2.toString()}
                images={table.images}
                name={`Photograph 18${index + 1}`}
                detail={table.detail}
                observation={table.observation}
                defect={table.defect}
              />
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default DefectDocument;
