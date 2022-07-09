import { StyleSheet, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';
import FoodInput from './src/pages/FoodInput';
import Signup from './src/pages/Signup';
import Login from './src/pages/Login';

type RootStackParamList = {
  Home: { userId: string };
  FoodInput: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
StatusBar.setBarStyle('dark-content', true)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={LOGIN_ROUTE} component={Login}/>
        <Stack.Screen name={SIGNUP_ROUTE} component={Signup}/>
        <Stack.Screen name={HOMEPAGE_ROUTE} component={HomePage}/>
        <Stack.Screen name={FOODINPUT_ROUTE} component={FoodInput}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});