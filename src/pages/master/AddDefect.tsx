import { Form } from "@components/Form";
import useDefectController from "@controllers/defectController";
import useDefectTypeController from "@controllers/defectTypeController";
import { defectForm } from "@utils/constants/form";
import { generateDecryption } from "@utils/helpers/generator";
import { useSearchParams } from "react-router-dom";

const AddDefect = () => {
  const [searchParams] = useSearchParams();

  const { addDefectService, updateDefectService } = useDefectController();
  const { useGetDefectTypeDropdownService } = useDefectTypeController();

  const { finalData } = useGetDefectTypeDropdownService();

  return (
    <Form
      formData={{
        ...defectForm,
        inputs: defectForm.inputs.map((item) => {
          if (item.name === "defect_type_id") {
            return {
              ...item,
              items: [...item.items!, ...finalData],
            };
          }

          return item;
        }),
        defaultValues: searchParams.get("data")
          ? JSON.parse(
              generateDecryption(decodeURIComponent(searchParams.get("data")!))
            )
          : defectForm.defaultValues,
      }}
      onSubmit={(data) => {
        if (searchParams.get("data")) {
          const param = JSON.parse(
            generateDecryption(decodeURIComponent(searchParams.get("data")!))
          );

          updateDefectService({ body: data, name: param.name });
        } else {
          addDefectService(data);
        }
      }}
    />
  );
};

export default AddDefect;
