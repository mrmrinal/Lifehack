import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, KeyboardAvoidingView, Alert } from 'react-native';
import Inputs from '../components/Inputs';
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react';
import { signUp } from '../firebase/FirebaseApi';
import { HOMEPAGE_ROUTE } from '../AppConstants';
export default function Signup({ navigation }) {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSignup = async () => {
    try {
      await signUp(name, email, password, (userCred) => {

      console.info('sign up successful');
      navigation.navigate(HOMEPAGE_ROUTE);
      })
    } catch (e) {
      if (e.message.toLowerCase().startsWith("firebase")) {
        Alert.alert("Incorrect Sign Up Details", e.message);
      } else {
        console.error(e)
      }
    }
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView 
          enabled={true}
          behavior={"position"}
          >
      <View style={{marginTop: 30}}>
        <Image 
          source={require('../assets/fridge.png')}
          resizeMode="center"
          style={styles.image} 
          />
          <Text style={styles.textBody}>Create your own account!</Text>
          <View style={{marginTop: 20}} />
          <View style={{marginLeft: 20}}>
            <Input autoCompleteType={"name"} placeholder="Name" onChangeText={setName}/>
            <Input autoCompleteType={"email"} placeholder="Email" onChangeText={setEmail} />  
            <Input secureTextEntry autoCompleteType={"password"} placeholder="Password" onChangeText={setPassword} />
          </View>
          <View style={{marginTop: 20, width: 300, marginLeft: 30}}>
          <Button 
            onPress={onSignup}
            title="Create an account!"
          />
          </View>
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
  image: {
    width: 400,
    height: 250,
    marginVertical: 10
  },
  textTitle: {
    fontSize: 40,
    marginVertical: 10,
    marginLeft: 40
  },
  textBody: {
    fontSize: 16,
    marginLeft: 60
  }

});
function e(e: any) {
  throw new Error('Function not implemented.');
}

