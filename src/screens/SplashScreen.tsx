import Logo from "assets/images/Logo.png";
import { View, Image, StyleSheet } from "react-native";
import colors from "styles/colors";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryOrange,
  },
});

export default SplashScreen;
