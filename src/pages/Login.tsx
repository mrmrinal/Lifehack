import React, { useState } from 'react';
import {Button, ScrollView, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Platform, TouchableOpacity, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { HOMEPAGE_ROUTE, SIGNUP_ROUTE } from '../AppConstants';
import Inputs from '../components/Inputs';
import { login } from '../firebase/FirebaseApi';

export default function Login({ navigation }) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onPressLogin = async () => {
    try {
      await login(email, password, (userCred) => {
        console.info('login successful');
        const user = userCred.user;
        navigation.navigate(HOMEPAGE_ROUTE);
      })
    } catch (e) {
      Alert.alert("Incorrect Login Details", "Try again")
    }
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView 
          enabled={true}
          behavior={"position"}
          >
        <Image 
          source={require('../assets/fooders.png')}
          resizeMode="center"
          style={styles.image}
          />
          <View style={styles.container}>
            <Text style={styles.textTitle}>Welcome Back !</Text>
          </View>
          <View style={{marginTop: 20}} />
          <View style={{marginLeft: 20}}>
          <Input autoCompleteType={"email"} placeholder="Email" onChangeText={setEmail}/>
          <Input secureTextEntry autoCompleteType={"password"} placeholder="Password" onChangeText={setPassword} />
          </View>
          <View style={[styles.container]}>
            <Button
              onPress={() => onPressLogin()}
              title="Login"
              />
          </View>
          <View style={[styles.container, {marginTop:'6%'}]}>
            <Button onPress={() => navigation.navigate(SIGNUP_ROUTE)}
              title="Or create an account here!"
              />
          </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    height: '8%',
    marginBottom: '10%',
    borderWidth: 1, 
    borderColor: '#dfdfdf',
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10
  },
  textTitle: {
    fontSize: 40
  },
  textBody: {
    fontSize: 16
  },
  textInput: {
    height: '20%',
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginTop: '2%'
  },
  inputView: {
    borderRadius: 30,
    width: "60%",
    height: 45,
    marginBottom: 20,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
}

});
