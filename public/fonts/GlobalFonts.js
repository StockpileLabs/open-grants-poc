import { Global } from "@mantine/core";
import pressStart from "@/public/fonts/PressStart2P-Regular.TTF";
import russo from "@/public/fonts/RussoOne-Regular.TTF";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "Russo One",
            src: `url('${russo}') format("ttf")`,
            fontStyle: "normal",
          },
        },
        {
            "@font-face": {
              fontFamily: "Press Start 2P",
              src: `url('${pressStart}') format("ttf")`,
              fontStyle: "normal",
            },
          },
      ]}
    />
  );
}
