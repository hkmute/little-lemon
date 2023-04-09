import { StyleSheet } from "react-native";
import colors from "./colors";

const fonts = StyleSheet.create({
  Headline: {
    color: colors.highlightBlack,
    fontFamily: "Markazi",
    fontSize: 24,
  },
  Leading: {
    color: colors.highlightBlack,
    fontFamily: "Markazi",
    fontSize: 20,
  },
  Paragraph: {
    color: colors.highlightBlack,
    fontFamily: "Karla",
    fontSize: 16,
  },
});

export default fonts;
