import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { InputType } from "types/formType";
import { Control } from "react-hook-form";
import { Autocomplete, Flex, Text } from "@aws-amplify/ui-react";
import { Reuleaux } from "ldrs/react";
import GeoJSONLayer from "./GeoJSONLayer";
import useMapInput from "@hooks/useMapInput";
import MapDetail from "./MapDetail";

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
      <Text>
        {inputData.label}
        {inputData.required && (
          <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
            (required)
          </Text>
        )}
      </Text>

      <Autocomplete
        label="searchAddress"
        options={searchAddress.finalData}
        placeholder="Search address..."
        isLoading={searchAddress.isLoading}
        onChange={(e) => debouncedSearch(e.target.value)}
        onSelect={onSelect}
        onFocus={onHideDetail}
      />

      {retrieveTheme.isLoading ? (
        <Flex
          flex={1}
          backgroundColor="rgba(23, 23, 23, 0.3)"
          alignItems="center"
          justifyContent="center"
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
      ) : (
        <Flex flex={1} position="relative">
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
      )}
    </Flex>
  );
};

export default MapInput;
