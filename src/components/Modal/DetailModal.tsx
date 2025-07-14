import { useDetailModal } from "@stores/modalStore";
import ModalContainer from "./ModalContainer";
import { AnimatePresence } from "motion/react";
import { Flex, Text, TextAreaField, TextField } from "@aws-amplify/ui-react";
import Map, { Marker } from "react-map-gl/maplibre";

const DetailModal = () => {
  const detailModal = useDetailModal();

  return (
    <AnimatePresence>
      {detailModal.show && (
        <ModalContainer
          width="calc(100% - 88px)"
          title={detailModal.data?.title}
          onClose={detailModal.hideModal}
        >
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
                  <Flex key={index.toString()} direction="column">
                    <Text>{item.label}</Text>

                    <Map
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
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
