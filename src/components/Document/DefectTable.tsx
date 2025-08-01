import { Image, Text, View } from "@react-pdf/renderer";

type Props = {
  images: string[];
  name: string;
  detail: string;
  observation: string;
  defect: string;
  withRecom?: boolean;
};

const DefectTable = ({
  images,
  name,
  detail,
  observation,
  defect,
  withRecom = true,
}: Props) => {
  return (
    <View style={{ borderWidth: 0.5, borderColor: "black" }} wrap={false}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {images.map((image, idx) => (
          <View
            key={idx.toString()}
            style={{
              width: "100%",
              height: 200,
              borderWidth: 0.5,
              borderColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={image} style={{ objectFit: "contain" }} />
          </View>
        ))}
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 600 }}>{name}</Text>
        </View>

        <View
          style={{
            width: "100%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 600 }}>{detail}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 600 }}>Observation</Text>
        </View>

        <View
          style={{
            width: "100%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 400 }}>{observation}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: "50%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 600 }}>
            Nature of defect
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            borderWidth: 0.5,
            borderColor: "black",
            paddingVertical: 5,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: 400 }}>{defect}</Text>
        </View>
      </View>

      {withRecom && (
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "50%",
              borderWidth: 0.5,
              borderColor: "black",
              paddingVertical: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: 600 }}>
              Recommendation
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              borderWidth: 0.5,
              borderColor: "black",
              paddingVertical: 5,
              paddingHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: 400 }}>N/A</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DefectTable;
