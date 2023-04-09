import { View, Text, StyleSheet } from "react-native";
import ExpoCheckbox from "expo-checkbox";
import fonts from "styles/fonts";
import colors from "styles/colors";

type Props = {
  label?: string;
  checked?: boolean;
  handlePress?: () => void;
};

const CheckBox: React.FC<Props> = ({ label, checked, handlePress }) => {
  return (
    <View style={styles.container}>
      <ExpoCheckbox
        color={colors.primaryGreen}
        value={checked}
        onValueChange={handlePress}
      />
      <Text style={styles.text} onPress={handlePress}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  text: {
    ...fonts.Paragraph,
    paddingLeft: 8,
  },
});
export default CheckBox;
