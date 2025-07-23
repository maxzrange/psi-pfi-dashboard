import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  sourceData: any;
  index: number;
};

const GeoJSONLayer = ({ sourceData, index }: Props) => {
  return (
    <Source id={`theme-${index}`} type="geojson" data={sourceData.data}>
      <Layer
        id={`theme-fill-${index}`}
        type="fill"
        paint={{
          "fill-color": "#ff0000",
          "fill-opacity": sourceData.noColor ? 0 : 0.3,
        }}
      />
    </Source>
  );
};

export default GeoJSONLayer;
