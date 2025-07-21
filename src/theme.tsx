import { Theme } from "@aws-amplify/ui-react";

const theme: Theme = {
  name: "my-theme",
  tokens: {
    components: {
      tabs: {
        item: {
          paddingVertical: { value: "5px" },
          fontSize: { value: "18px" },
        },
      },
      field: {
        fontSize: { value: "14px" },
      },
      table: {
        header: {
          fontSize: { value: "12px" },
          fontWeight: { value: 500 },
        },
        data: {
          fontSize: { value: "14px" },
          fontWeight: { value: 400 },
        },
      },
      button: {
        fontSize: { value: "14px" },
      },
    },
    colors: {
      font: {
        primary: { value: "#0d1a26" },
        // ...
      },
      background: { secondary: "#f5f8fa" },
    },
  },
};

export default theme;
