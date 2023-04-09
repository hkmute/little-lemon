import { useContext } from "react";
import Button from "./Button";
import UserContext, { defaultUser } from "context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(defaultUser);
  };

  return (
    <Button
      title="Log out"
      color="yellow"
      style={{ marginBottom: 32 }}
      onPress={handleLogout}
    />
  );
};

export default LogoutButton;
