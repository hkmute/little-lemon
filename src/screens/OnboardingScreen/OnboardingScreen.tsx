import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "components/Button";
import TextInput from "components/TextInput";
import UserContext from "context/UserContext";
import { useContext, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import fonts from "styles/fonts";
import { validateEmail } from "utils/helper";

const OnboardingScreen: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { setUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePress = async () => {
    const trimedFirstName = firstName.trim();
    const trimedEmail = email.trim();
    const newUser = { firstName: trimedFirstName, email: trimedEmail };
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const disabled = !firstName.trim() || !validateEmail(email);

  return (
    <View style={[{ paddingBottom: bottom }, styles.container]}>
      <Text style={styles.title}>Let us know you</Text>
      <View style={styles.formContent}>
        <Text style={fonts.Leading}>First Name</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          onChangeText={handleFirstNameChange}
        />
        <Text style={fonts.Leading}>Email</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          onChangeText={handleEmailChange}
        />
      </View>
      <Button title="Next" disabled={disabled} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    ...fonts.Headline,
    textAlign: "center",
  },
  formContent: {
    flex: 1,
  },
  inputContainer: {
    marginVertical: 8,
  },
});

export default OnboardingScreen;
