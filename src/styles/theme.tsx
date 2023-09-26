import {
  ChakraTheme,
  extendTheme,
  ThemeComponentProps,
  ComponentStyleConfig,
} from "@chakra-ui/react";
import { Colors } from "@chakra-ui/theme";

export interface colorsProps extends Colors {
  primary: {
    1: {
      light: string;
      dark: string;
    };
    2: string;
    3: string;
  };
}
export interface ComponentsProps extends ThemeComponentProps<ChakraTheme> {
  Input: {
    fontFamily: string;
  };
}
export interface ThemeProps<T> extends ChakraTheme {
  components: ComponentsProps & T;
  colors: colorsProps;
}

interface fontsProps {
  primary: string;
  secundary: string;
  terciary: string;
}

let defaultFonts: fontsProps = {
  primary: "Nunito",
  secundary: "Arial",
  terciary: "sans-serif",
};

export const fonts = (newFonts?: fontsProps) => {
  defaultFonts = { ...defaultFonts, ...newFonts };
  return `${defaultFonts.primary}, ${defaultFonts.secundary}, ${defaultFonts.terciary}`;
};

export const theme = (
  colors?: colorsProps,
  extendComponents?: { [id: string]: any } & ComponentStyleConfig
) => {
  const themeSkeleton = extendTheme({
    components: {
      Text: {
        variants: {
          text: {
            fontFamily: "Nunito",
            fontSize: "19px",
          },
        },
      },
      ...extendComponents,
    },
    colors,
  });

  return themeSkeleton;
};
