import { StatusBar } from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import Inputs from '../components/Inputs';
import Signup from './Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function Login({ navigation }) {
  return (
    <ScrollView>
      <View>
        <Image 
          source={require('../assets/fooders.png')}
          resizeMode="center"
          style={styles.image} 
          />
          <Text style={styles.textTitle}>Welcome back!</Text>
          <Text style={styles.textBody}>Log in to your existing account!</Text>
          <View style={{marginTop: 20}} />
          <View style={{marginLeft: 20}}>
          <Inputs name="Email" icon="user"/>
          <Inputs name="Password" icon="lock" pass={true} />
          </View>
          <View style={{marginTop: 20, width: 300, marginLeft: 30}}>
          <Button 
          title="Login"
          />
          </View>
          <View style={{marginTop: 20, width: 300, marginLeft: 30}} >
          <Button onPress={() => navigation.navigate('Signup')}
          title="Or create an account here!"
          />
          </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 40,
    marginVertical: 10,
    marginLeft: 40
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
    marginLeft: 60
  }

});
