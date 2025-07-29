import { mockDefectData } from "@data/mock";
import { DefectDTO, DefectInput } from "@interfaces/defectInterface";
import { useConfirmationModal } from "@stores/modalStore";
import { generateEncryption } from "@utils/helpers/generator";
import { useNavigate } from "react-router-dom";
import { FetchDataType } from "types/pageType";

const useDefectController = () => {
  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const nav = useNavigate();

  const useGetDefectsService = () => {
    const defect: DefectDTO[] = mockDefectData(10);

    let finalData: FetchDataType[][] = [];

    if (defect)
      finalData = [
        defect.map((item) => ({
          id: 0,
          row: [
            { type: "text", value: item.name },
            { type: "text", value: item.created_at },
          ],
          functions: [
            {
              type: "edit",
              onClick: () => {
                const data = mockDefectData(1);

                const defaultValues: DefectInput = {
                  name: data[0].name,
                  defectType: {
                    id: "1",
                    label: "Cracked",
                  },
                };

                nav(
                  `/defect/form?data=${encodeURIComponent(
                    generateEncryption(JSON.stringify(defaultValues))
                  )}`
                );
              },
            },
            {
              type: "delete",
              onClick: () => {
                const data = mockDefectData(1);

                showConfirmationModal({
                  title: "Delete Defect",
                  subTitle: `Are you sure you want to delete |"${data[0].name}"|? This action cannot be undo!`,
                });
              },
            },
          ],
        })),
        [],
      ] as FetchDataType[][];

    return {
      finalData,
    };
  };

  return {
    useGetDefectsService,
  };
};

export default useDefectController;
