import { Text, StyleSheet, Pressable } from "react-native";
import colors from "styles/colors";
import fonts from "styles/fonts";

type Props = {
  label: string;
  onPress?: () => void;
  selected?: boolean;
};

const Chip: React.FC<Props> = ({ label, onPress, selected }) => {
  return (
    <Pressable
      style={[styles.container, selected && styles.active]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginRight: 16,
    marginVertical: 8,
  },
  label: {
    ...fonts.Paragraph,
  },
  active: {
    backgroundColor: colors.secondaryOrange,
  },
});

export default Chip;
