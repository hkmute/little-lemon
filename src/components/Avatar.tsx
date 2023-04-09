import { useNavigation } from "@react-navigation/native";
import { Image, Text, StyleSheet, Pressable, View } from "react-native";
import colors from "styles/colors";
import fonts from "styles/fonts";

type Props = {
  firstName?: string;
  lastName?: string;
  image?: string;
  navigateTo?: string;
  scale?: number;
};

const Avatar: React.FC<Props> = ({
  firstName,
  lastName,
  image,
  navigateTo,
  scale = 1,
}) => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    if (!!navigate) {
      navigate(navigateTo);
    }
  };

  if (!!image) {
    return (
      <Pressable onPress={handlePress}>
        <Image
          source={{ uri: image }}
          style={{
            width: 30 * scale,
            height: 30 * scale,
            borderRadius: 15 * scale,
          }}
        />
      </Pressable>
    );
  }
  return (
    <View style={{ width: 30 * scale, height: 30 * scale }}>
      <Pressable
        style={[
          styles.container,
          {
            transform: [
              {
                scale,
              },
              {
                translateX: (30 / 4) * (scale - 1),
              },
              {
                translateY: (30 / 4) * (scale - 1),
              },
            ],
          },
        ]}
        onPress={handlePress}
      >
        {!!firstName && <Text style={styles.text}>{firstName[0]}</Text>}
        {!!lastName && <Text>{lastName[0]}</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryLightOrange,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  text: {
    ...fonts.Paragraph,
    fontWeight: "bold",
  },
});

export default Avatar;
