import { StyleSheet, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/HomePage';
import FoodInput from './src/pages/FoodInput';
import FoodItems from './src/pages/FoodItems';
import Signup from './src/pages/Signup';
import Login from './src/pages/Login';


type RootStackParamList = {
  Home: { userId: string };
  Foodinput: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
StatusBar.setBarStyle('dark-content', true)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Foodinput" component={FoodInput}/>
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