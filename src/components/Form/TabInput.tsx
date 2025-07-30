import { Flex, TabItem, Tabs } from "@aws-amplify/ui-react";
import { Control } from "react-hook-form";
import { InputType } from "types/formType";
import TabInputRow from "./TabInputRow";

type Props = {
  tabData: InputType;
  control: Control<any, any>;
};

const TabInput = ({ tabData, control }: Props) => {
  return (
    <Flex direction="column">
      <Tabs defaultValue={tabData.tabData![0].name}>
        {tabData.tabData!.map((item, index) => {
          return (
            <TabItem
              key={index.toString()}
              title={item.title}
              value={item.name}
            >
              <Flex flex={1}>
                <Flex
                  direction="row"
                  width="100%"
                  padding={14}
                  style={{ borderBottom: "1px solid #E5E5E5" }}
                >
                  {item.inputs.map((item2, index2) => (
                    <p
                      key={index2.toString()}
                      className="body-sm med"
                      style={{ flex: 1 }}
                    >
                      {item2.label}
                    </p>
                  ))}

                  <Flex width={70} height="100%" />
                </Flex>
              </Flex>

              <TabInputRow
                name={tabData.name}
                rowData={item.inputs}
                defaultValues={item.defaultValues}
                control={control}
                tabIndex={index}
              />
            </TabItem>
          );
        })}
      </Tabs>
    </Flex>
  );
};

export default TabInput;
