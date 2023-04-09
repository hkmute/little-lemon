import Avatar from "components/Avatar";
import Button from "components/Button";
import TextInput from "components/TextInput";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import fonts from "styles/fonts";
import CheckBox from "components/CheckBox";
import LogoutButton from "components/LogoutButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import UserContext from "context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { user, setUser } = useContext(UserContext);

  const [avatar, setAvatar] = useState(user.avatar);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone || "");
  const [orderStatuses, setOrderStatuses] = useState(
    user.orderStatuses || false
  );
  const [passwordChanges, setPasswordChanges] = useState(
    user.passwordChanges || false
  );
  const [specialOffers, setSpecialOffers] = useState(
    user.specialOffers || false
  );
  const [newsletter, setNewsletter] = useState(user.newsletter || false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const updatedUser = {
      ...user,
      avatar,
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      orderStatuses,
      passwordChanges,
      specialOffers,
      newsletter,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleRest = () => {
    setAvatar(user.avatar);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhoneNumber(user.phone || "");
    setOrderStatuses(user.orderStatuses || false);
    setPasswordChanges(user.passwordChanges || false);
    setSpecialOffers(user.specialOffers || false);
    setNewsletter(user.newsletter || false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ paddingBottom: bottom }}>
        <Text style={fonts.Headline}>Personal Information</Text>
        <Text style={fonts.Leading}>Avatar</Text>
        <View style={styles.row}>
          <Avatar
            scale={2}
            firstName={user.firstName}
            lastName={user.lastName}
            image={avatar}
          />
          <Button title="Change" style={styles.button} onPress={pickImage} />
          <Button title="Remove" variant="outlined" style={styles.button} />
        </View>
        <Text style={fonts.Leading}>First Name</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={fonts.Leading}>Last Name</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Text style={fonts.Leading}>Email</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={fonts.Leading}>Phone Number</Text>
        <TextInput
          containerStyle={styles.inputContainer}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <View style={styles.emailNotificationContainer}>
          <Text style={fonts.Headline}>Email Notification</Text>
          <CheckBox
            label="Order statuses"
            checked={orderStatuses}
            handlePress={() => setOrderStatuses((checked) => !checked)}
          />
          <CheckBox
            label="Password changes"
            checked={passwordChanges}
            handlePress={() => setPasswordChanges((checked) => !checked)}
          />
          <CheckBox
            label="Special offers"
            checked={specialOffers}
            handlePress={() => setSpecialOffers((checked) => !checked)}
          />
          <CheckBox
            label="Newsletter"
            checked={newsletter}
            handlePress={() => setNewsletter((checked) => !checked)}
          />
        </View>
        <LogoutButton />
        <View style={[styles.row, { justifyContent: "space-around" }]}>
          <Button
            title="Discard changes"
            variant="outlined"
            onPress={handleRest}
          />
          <Button title="Save changes" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    marginLeft: 16,
  },
  emailNotificationContainer: {
    marginBottom: 16,
  },
});

export default ProfileScreen;
