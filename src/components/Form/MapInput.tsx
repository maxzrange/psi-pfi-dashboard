import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { InputType } from "types/formType";
import { Control, useController } from "react-hook-form";
import { Flex, SearchField, Text, TextField } from "@aws-amplify/ui-react";
import useOneMapController from "@controllers/oneMapController";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const MapInput = ({ inputData, control }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  const { getDroneQueryService } = useOneMapController();

  return (
    <Flex direction="column" width="100%" height={450} gap="small">
      <Text>
        {inputData.label}
        {inputData.required && (
          <Text as="span" fontSize="0.8rem" color="red" marginLeft={5}>
            (required)
          </Text>
        )}
      </Text>

      <SearchField label="Search" placeholder="Search address..." />

      <Map
        initialViewState={{
          latitude: field.value?.lat ?? 1.3521,
          longitude: field.value?.lng ?? 103.8198,
          zoom: 9,
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
        style={{ width: "100%", height: "100%" }}
        onClick={(e) => {
          const location = e.lngLat;
          getDroneQueryService(location);
          field.onChange({ lat: location.lat, lng: location.lng });
        }}
      >
        <Source
          id="onemap"
          type="raster"
          tiles={[
            "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png",
          ]}
        >
          <Layer id="onemap-layer" type="raster" />

          {field.value && (
            <Marker
              latitude={field.value.lat}
              longitude={field.value.lng}
              color="red"
            />
          )}
        </Source>
      </Map>

      <Flex>
        <TextField
          value={field.value?.lat ?? ""}
          label={<Text>Latitude</Text>}
          disabled={true}
          isRequired={inputData.required}
          hasError={!!error}
          errorMessage={error?.message as string}
        />

        <TextField
          value={field.value?.lng ?? ""}
          label={<Text>Longitude</Text>}
          disabled={true}
          isRequired={inputData.required}
          hasError={!!error}
          errorMessage={error?.message as string}
        />
      </Flex>
    </Flex>
  );
};

export default MapInput;
