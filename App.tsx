import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Karla from "assets/fonts/Karla-Regular.ttf";
import Markazi from "assets/fonts/MarkaziText-Regular.ttf";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "screens/SplashScreen";
import { UserProvider } from "context/UserContext";
import NavigationRoot from "navigation/NavigationRoot";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initUser, setInitUser] = useState(null);
  const [fontsLoaded] = useFonts({
    Karla,
    Markazi,
  });

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        setInitUser(JSON.parse(user));
      }
      setTimeout(() => setIsReady(true), 1000);
    });
  }, []);

  if (!isReady || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <UserProvider initUser={initUser}>
      <StatusBar style="auto" />
      <NavigationRoot />
    </UserProvider>
  );
}
