import Map, { MapLayerMouseEvent, MapRef, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { InputType } from "types/formType";
import { Control, useController } from "react-hook-form";
import { Autocomplete, Flex, Text, TextField } from "@aws-amplify/ui-react";
import useOneMapController from "@controllers/oneMapController";
import { useSearch } from "@stores/pageStore";
import { useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { Reuleaux } from "ldrs/react";
import maplibregl from "maplibre-gl";
import GeoJSONLayer from "./GeoJSONLayer";

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

  const { useSearchAddressService, useRetrieveThemeService } =
    useOneMapController();

  const searchAddress = useSearchAddressService();
  const retrieveTheme = useRetrieveThemeService([
    "boundary_5km",
    "danger_areas",
    // "prohibited_areas",
    // "restricted_areaspoly",
    // "tra_poly",
    // "drone_no_fly",
    // "mha_uav_2015",
  ]);

  const onMark = (e: MapLayerMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: retrieveTheme.finalData.map((_, index) => `theme-fill-${index}`),
    });

    if (features && features?.length > 0) {
      const feature = features[0];

      const map = mapRef.current?.getMap();

      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `
          <strong>${feature.properties.name}</strong><br/>
          ${feature.properties.description}
        `
        )
        .addTo(map!);
    } else {
      const location = e.lngLat;
      field.onChange({ lat: location.lat, lng: location.lng });
    }
  };

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
    <Flex direction="column" width="100%" height={550} gap="small">
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
        onSelect={(option) => {
          const location = option.id.split("|");
          field.onChange({ lat: location[0], lng: location[1] });
        }}
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
      )}

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
