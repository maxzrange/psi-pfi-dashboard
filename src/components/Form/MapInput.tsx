import Map, {
  MapRef,
  // Layer,
  Marker,
  // Source
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { InputType } from "types/formType";
import { Control, useController } from "react-hook-form";
import { Autocomplete, Flex, Text, TextField } from "@aws-amplify/ui-react";
import useOneMapController from "@controllers/oneMapController";
import { useSearch } from "@stores/pageStore";
import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const MapInput = ({ inputData, control }: Props) => {
  const search = useSearch();

  const mapRef = useRef<MapRef>(null);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  const { useSearchAddressService } = useOneMapController();

  const { finalData, isLoading } = useSearchAddressService();

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value) {
        search.changeSearch(value);
      } else {
        search.resetSearch();
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (!field.value?.lat || !field.value?.lng) return;

    const map = mapRef.current?.getMap();

    map?.flyTo({
      center: [Number(field.value.lng), Number(field.value.lat)],
      zoom: 15,
      essential: true,
    });
  }, [field.value]);

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

      <Autocomplete
        label="searchAddress"
        options={finalData}
        placeholder="Search address..."
        isLoading={isLoading}
        onChange={(e) => debouncedSearch(e.target.value)}
        onSelect={(option) => {
          const location = option.id.split("|");
          field.onChange({ lat: location[0], lng: location[1] });
        }}
      />

      <Map
        ref={mapRef}
        initialViewState={{
          latitude: field.value?.lat ?? 1.3521,
          longitude: field.value?.lng ?? 103.8198,
          zoom: 12,
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILER_KEY}`}
        style={{ width: "100%", height: "100%" }}
        onClick={(e) => {
          const location = e.lngLat;
          field.onChange({ lat: location.lat, lng: location.lng });
        }}
      >
        {/* <Source
          id="onemap"
          type="raster"
          tiles={[
            "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png",
          ]}
        >
          <Layer id="onemap-layer" type="raster" /> */}

        {field.value && (
          <Marker
            latitude={field.value.lat}
            longitude={field.value.lng}
            color="red"
          />
        )}
        {/* </Source> */}
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
