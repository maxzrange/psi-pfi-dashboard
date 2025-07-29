import { Flex } from "@aws-amplify/ui-react";
import { IoIosArrowDropdown } from "react-icons/io";
import { DetailItemType } from "types/pageType";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Props = {
  viewData: DetailItemType[];
};

const Accordion = ({ viewData }: Props) => {
  const [showData, setShowData] = useState(false);

  const MotionFlex = motion.create(Flex);

  const onHandleAccordion = () => setShowData(!showData);

  return (
    <Flex
      direction="column"
      backgroundColor="white"
      border="1px solid #E2E8F0"
      borderRadius={6}
      gap="0"
      style={{ boxShadow: "0px 2px 4px -2px rgba(0, 0, 0, 0.1)" }}
    >
      <Flex
        style={{ cursor: "pointer", borderBottom: "1px solid #E2E8F0" }}
        padding={14}
        onClick={onHandleAccordion}
      >
        <p className="body-sm med" style={{ flex: 1 }}>
          Project
        </p>

        <IoIosArrowDropdown />
      </Flex>

      <AnimatePresence>
        {showData && (
          <MotionFlex
            direction="column"
            overflow="hidden"
            initial={{ height: 0 }}
            animate={{ height: 190 }}
            exit={{ height: 0 }}
          >
            {viewData.map((item, index) => (
              <Flex
                key={index.toString()}
                padding={
                  index === 0
                    ? "13px 19px 6px 19px"
                    : index === viewData.length - 1
                    ? "6px 19px 13px 19px"
                    : "6px 19px"
                }
              >
                <Flex width={100} justifyContent="space-between">
                  <p className="body-sm reg">{item.label}</p>

                  <p className="body-sm reg">:</p>
                </Flex>

                <p className="body-sm bold" style={{ flex: 1 }}>
                  {item.value as string}
                </p>
              </Flex>
            ))}
          </MotionFlex>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default Accordion;
