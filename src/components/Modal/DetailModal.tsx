import { useDetailModal } from "@stores/modalStore";
import ModalContainer from "./ModalContainer";
import { AnimatePresence, motion } from "motion/react";
import {
  Button,
  Flex,
  Text,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { MdOutlineClose } from "react-icons/md";
import Map, { Marker } from "react-map-gl/maplibre";
// import { MapType } from "types/formType";

const DetailModal = () => {
  const detailModal = useDetailModal();

  const MotionFlex = motion.create(Flex);

  return (
    <AnimatePresence>
      {detailModal.show && (
        <ModalContainer>
          <MotionFlex
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            direction="column"
            width="calc(100% - 88px)"
            maxHeight="calc(100dvh - 48px)"
            backgroundColor="white"
            borderRadius={8}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              padding="18px 24px"
              style={{ borderBottom: "1px solid #E5E5E5" }}
            >
              <Text>{detailModal.data?.title}</Text>

              <Button variation="link" onClick={() => detailModal.hideModal()}>
                <MdOutlineClose color="#A3A3A3" />
              </Button>
            </Flex>

            <Flex direction="column" overflow="auto" padding="18px 36px">
              {detailModal.data?.data.map((item, index) => {
                if (item.type === "textarea")
                  return (
                    <TextAreaField
                      key={index.toString()}
                      value={item.value as string}
                      label={item.label}
                      disabled
                    />
                  );

                if (item.type === "map")
                  return (
                    <Flex direction="column">
                      <Text>{item.label}</Text>

                      <Map
                        key={index.toString()}
                        initialViewState={{
                          latitude: 1.2868,
                          longitude: 103.8545,
                          zoom: 15,
                        }}
                        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
                        style={{ width: "100%", height: 450 }}
                      >
                        <Marker
                          latitude={1.2868}
                          longitude={103.8545}
                          color="red"
                        />
                      </Map>
                    </Flex>
                  );

                return (
                  <TextField
                    key={index.toString()}
                    value={item.value as string}
                    label={item.label}
                    disabled
                  />
                );
              })}
            </Flex>
          </MotionFlex>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
