import useOneMapController from "@controllers/oneMapController";
import { useSearch } from "@stores/pageStore";
import { useCallback, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import { MapLayerMouseEvent, MapRef } from "react-map-gl/maplibre";
import { InputType } from "types/formType";
import debounce from "lodash.debounce";
import { ComboBoxOption } from "@aws-amplify/ui-react";

const useMapInput = (inputData: InputType, control: Control<any, any>) => {
  const [showDetail, setShowDetail] = useState(false);

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
    "prohibited_areas",
    "restricted_areaspoly",
    "tra_poly",
    "drone_no_fly",
    "mha_uav_2015",
  ]);

  const onFly = (lng: number, lat: number) => {
    const map = mapRef.current?.getMap();

    map?.flyTo({
      center: [lng, lat],
      zoom: 15,
      essential: true,
    });

    field.onChange({
      lat: lat,
      lng: lng,
      area: "-",
      description: "-",
    });
  };

  const onMark = (e: MapLayerMouseEvent) => {
    const location = e.lngLat;

    onFly(location.lng, location.lat);

    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: retrieveTheme.finalData.map((_, index) => `theme-fill-${index}`),
    });

    if (features && features?.length > 0) {
      const feature = features[0];

      field.onChange({
        lat: location.lat,
        lng: location.lng,
        area: feature.properties.name,
        description: feature.properties.description,
      });
    } else {
      field.onChange({
        lat: location.lat,
        lng: location.lng,
        area: "-",
        description: "-",
      });
    }

    setShowDetail(true);
  };

  const onSelect = (option: ComboBoxOption) => {
    const location = option.id.split("|").map((item) => Number(item));

    onFly(location[1], location[0]);

    const map = mapRef.current?.getMap();

    map?.once("moveend", () => {
      const point = mapRef.current?.project([location[1], location[0]]);

      const features = mapRef.current?.queryRenderedFeatures(point, {
        layers: retrieveTheme.finalData.map(
          (_, index) => `theme-fill-${index}`
        ),
      });

      if (features && features?.length > 0) {
        const feature = features[0];

        field.onChange({
          lat: location[0],
          lng: location[1],
          area: feature.properties.name,
          description: feature.properties.description,
        });
      } else {
        field.onChange({
          lat: location[0],
          lng: location[1],
          area: "-",
          description: "-",
        });
      }

      setShowDetail(true);
    });
  };

  const onDetail = () => setShowDetail(!showDetail);

  const onHideDetail = () => setShowDetail(false);

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

  return {
    showDetail,
    mapRef,
    field,
    error,
    searchAddress,
    retrieveTheme,
    onMark,
    onSelect,
    onDetail,
    onHideDetail,
    debouncedSearch,
  };
};

export default useMapInput;
