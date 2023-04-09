import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "screens/OnboardingScreen/OnboardingScreen";
import { OnboardingHeader } from "screens/OnboardingScreen";
import HomeScreen from "screens/HomeScreen";
import ProfileScreen from "screens/ProfileScreen";
import { useContext } from "react";
import UserContext from "context/UserContext";
import Avatar from "components/Avatar";

const Stack = createNativeStackNavigator();

const NavigationRoot: React.FC = () => {
  const { user } = useContext(UserContext);

  const renderHeaderRight = () => {
    return <Avatar firstName={user.firstName} lastName={user.lastName} navigateTo="Profile" />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: OnboardingHeader }}>
        {!!user.email ? (
          <Stack.Group screenOptions={{ headerRight: renderHeaderRight }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Group>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoot;
