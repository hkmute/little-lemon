import { Pressable, PressableProps, Text, StyleSheet } from "react-native";
import colors from "styles/colors";
import fonts from "styles/fonts";

type Props = {
  children?: React.ReactNode;
  title?: string;
  color?: "green" | "yellow";
  variant?: "contained" | "outlined";
} & PressableProps;

const Button: React.FC<Props> = ({
  title,
  children,
  style,
  variant = "contained",
  color = "green",
  disabled = false,
  ...props
}) => {
  return (
    <Pressable
      style={StyleSheet.flatten([
        style,
        styles.containerStyle,
        color === "green" && { borderColor: colors.primaryGreen },
        color === "yellow" && { borderColor: colors.primaryYellow },
        variant === "contained" && color === "green" && styles.greenBackground,
        variant === "contained" &&
          color === "yellow" &&
          styles.yellowBackground,
        disabled && styles.disabledBackground,
      ])}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === "outlined" &&
            color === "green" && { color: colors.primaryGreen },
          variant === "outlined" &&
            color === "yellow" && { color: colors.primaryGreen },
          !disabled && color === "yellow" && styles.yellowBackgroundText,
        ]}
      >
        {title}
      </Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  greenBackground: {
    backgroundColor: colors.primaryGreen,
  },
  yellowBackground: {
    backgroundColor: colors.primaryYellow,
  },
  disabledBackground: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  text: {
    ...fonts.Paragraph,
    color: colors.highlightWhite,
  },
  yellowBackgroundText: {
    color: colors.highlightBlack,
  },
});

export default Button;
