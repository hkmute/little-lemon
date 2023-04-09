import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import fonts from "styles/fonts";

type Props = RNTextInput["props"] & {
  containerStyle?: ViewStyle;
};

const TextInput: React.FC<Props> = ({ containerStyle, style, ...props }) => {
  return (
    <View style={containerStyle}>
      <RNTextInput {...props} style={[style, styles.defaultStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    ...fonts.Paragraph,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});

export default TextInput;
