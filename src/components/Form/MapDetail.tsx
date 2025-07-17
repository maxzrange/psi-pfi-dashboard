import {
  Button,
  Flex,
  Text,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { IconContext } from "react-icons";
import { MdMenu } from "react-icons/md";
import { MapType } from "types/formType";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  detailData?: MapType;
  show: boolean;
  onClick: () => void;
};

const MapDetail = ({ detailData, show, onClick }: Props) => {
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
      >
        <IconContext.Provider value={{ color: "white", size: "24px" }}>
          <Flex>
            <MdMenu />
          </Flex>
        </IconContext.Provider>
      </Button>

      <AnimatePresence>
        {show && (
          <MotionFlex
            direction="column"
            backgroundColor="white"
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
    </Flex>
  );
};

export default MapDetail;
