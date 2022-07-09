import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import Inputs from '../components/Inputs';
import { Button } from 'react-native-elements';
import React from 'react';
export default function Signup() {
  return (
    <ScrollView>
      <View style={{marginTop: 30}}>
      <KeyboardAvoidingView 
          enabled={true}
          behavior={"position"}
          >
        <Image 
          source={require('../assets/fridge.png')}
          resizeMode="center"
          style={styles.image} 
          />
          <Text style={styles.textBody}>Create your own account!</Text>
          <View style={{marginTop: 20}} />
          <View style={{marginLeft: 20}}>
          <Inputs name="Name" icon="address-book"/>
          <Inputs name="Email" icon="user"/>
          <Inputs name="Password" icon="lock" pass={true} />
          <Inputs name="Confirm Password" icon="lock" pass={true} />
          </View>
          <View style={{marginTop: 20, width: 300, marginLeft: 30}}>
          <Button 
          title="Create an account!"
          />
          </View>
        </KeyboardAvoidingView>
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
    fontSize: 40,
    marginVertical: 10,
    marginLeft: 40
  },
  textBody: {
    fontSize: 16,
    marginLeft: 60
  }

});
