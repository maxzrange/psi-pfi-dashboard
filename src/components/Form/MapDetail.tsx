import {
  Button,
  Flex,
  SwitchField,
  Text,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { IconContext } from "react-icons";
import { MdFilterAlt, MdMenu } from "react-icons/md";
import { MapType } from "types/formType";
import { AnimatePresence, motion } from "motion/react";
import { useOneTheme } from "@stores/pageStore";
import { useState } from "react";

type Props = {
  detailData?: MapType;
  show: boolean;
  onClick: () => void;
};

const MapDetail = ({ detailData, show, onClick }: Props) => {
  const [showFilter, setShowFilter] = useState(false);

  const oneTheme = useOneTheme();

  const MotionFlex = motion.create(Flex);

  return (
    <Flex
      direction="column"
      alignItems="end"
      position="absolute"
      top={14}
      right={14}
      gap={10}
      style={{ zIndex: 9 }}
    >
      <Button
        variation="primary"
        width={40}
        height={40}
        borderRadius="50%"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px"
        alignItems="center"
        justifyContent="center"
        display="flex"
        onClick={onClick}
        style={{ zIndex: 2 }}
      >
        <IconContext.Provider value={{ color: "white", size: "24px" }}>
          <Flex>
            <MdMenu />
          </Flex>
        </IconContext.Provider>
      </Button>

      <Button
        variation="primary"
        width={40}
        height={40}
        borderRadius="50%"
        boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px"
        alignItems="center"
        justifyContent="center"
        display="flex"
        onClick={() => setShowFilter(!showFilter)}
        style={{ zIndex: 2 }}
      >
        <IconContext.Provider value={{ color: "white", size: "24px" }}>
          <Flex marginTop={3}>
            <MdFilterAlt />
          </Flex>
        </IconContext.Provider>
      </Button>

      <AnimatePresence>
        {show && (
          <MotionFlex
            direction="column"
            backgroundColor="white"
            position="absolute"
            top={45}
            padding="14px"
            borderRadius={8}
            boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px"
            width={400}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ease: "easeInOut" }}
            style={{
              originX: 1,
              originY: 0,
            }}
          >
            <Flex>
              <TextField
                value={detailData?.lat ?? ""}
                label={<Text>Latitude</Text>}
                disabled
              />

              <TextField
                value={detailData?.lng ?? ""}
                label={<Text>Longitude</Text>}
                disabled
              />
            </Flex>

            <TextField
              value={detailData?.area ?? ""}
              label={<Text>Area</Text>}
              disabled
            />

            <TextAreaField
              value={detailData?.description ?? ""}
              label={<Text>Decription</Text>}
              rows={3}
              disabled
            />
          </MotionFlex>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFilter && (
          <MotionFlex
            direction="column"
            backgroundColor="white"
            position="absolute"
            top={95}
            padding="14px"
            borderRadius={8}
            boxShadow="rgba(13, 26, 38, 0.25) 0px 4px 12px 0px"
            width={400}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ ease: "easeInOut" }}
            style={{
              originX: 1,
              originY: 0,
            }}
          >
            {oneTheme.data.map((item, index) => (
              <SwitchField
                key={index.toString()}
                isChecked={item.active}
                label={<Text width="310px">{item.label}</Text>}
                onChange={(e) => {
                  e.preventDefault();
                  oneTheme.onClick(item.value);
                }}
              />
            ))}
          </MotionFlex>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default MapDetail;
