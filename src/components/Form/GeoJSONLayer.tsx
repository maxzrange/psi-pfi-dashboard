import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  sourceData: any;
  index: number;
};

const GeoJSONLayer = ({ sourceData, index }: Props) => {
  return (
    <Source id={`theme-${index}`} type="geojson" data={sourceData}>
      <Layer
        id={`theme-fill-${index}`}
        type="fill"
        paint={{
          "fill-color": "#ff0000",
          "fill-opacity": 0.3,
        }}
      />

      {/* <Layer
        id="theme-outline"
        type="line"
        paint={{
          "line-color": "#ff0000",
          "line-width": 1,
        }}
      /> */}
    </Source>
  );
};

export default GeoJSONLayer;
