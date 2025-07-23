import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { InputType } from "types/formType";
import { Control } from "react-hook-form";
import { Autocomplete, Flex } from "@aws-amplify/ui-react";
import { Reuleaux } from "ldrs/react";
import GeoJSONLayer from "./GeoJSONLayer";
import useMapInput from "@hooks/useMapInput";
import MapDetail from "./MapDetail";
import Label from "./Label";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const MapInput = ({ inputData, control }: Props) => {
  const {
    showDetail,
    mapRef,
    field,
    // error,
    searchAddress,
    retrieveTheme,
    onMark,
    onSelect,
    onDetail,
    onHideDetail,
    debouncedSearch,
  } = useMapInput(inputData, control);

  return (
    <Flex direction="column" width="100%" height={650} gap="small">
      <Autocomplete
        label={<Label label={inputData.label} required={inputData.required} />}
        labelHidden={false}
        options={searchAddress.finalData}
        placeholder="Search address..."
        isLoading={searchAddress.isLoading}
        onChange={(e) => debouncedSearch(e.target.value)}
        onSelect={onSelect}
        onFocus={onHideDetail}
      />

      <Flex flex={1} position="relative">
        {retrieveTheme.isLoading && (
          <Flex
            position="absolute"
            backgroundColor="rgba(23, 23, 23, 0.3)"
            justifyContent="center"
            alignItems="center"
            style={{ zIndex: 999, top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Flex
              backgroundColor="rgba(23, 23, 23, 0.9)"
              padding={20}
              borderRadius={10}
            >
              <Reuleaux
                size="37"
                stroke="5"
                strokeLength="0.15"
                bgOpacity="0.1"
                speed="1.2"
                color="white"
              />
            </Flex>
          </Flex>
        )}

        <Map
          ref={mapRef}
          initialViewState={{
            latitude: field.value?.lat ?? 1.3521,
            longitude: field.value?.lng ?? 103.8198,
            zoom: 9.5,
          }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
          style={{ width: "100%", height: "100%" }}
          onClick={onMark}
        >
          {retrieveTheme.finalData.map((item, index) => (
            <GeoJSONLayer
              key={index.toString()}
              sourceData={item}
              index={index}
            />
          ))}

          {field.value && (
            <Marker
              latitude={field.value.lat}
              longitude={field.value.lng}
              color="red"
            />
          )}
        </Map>

        <MapDetail
          detailData={field.value}
          show={showDetail}
          onClick={onDetail}
        />
      </Flex>
    </Flex>
  );
};

export default MapInput;
