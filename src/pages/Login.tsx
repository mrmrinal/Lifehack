import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Inputs from '../components/Inputs';
import { Button } from 'react-native-elements';
export default function Login() {
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
          <View style={{marginTop: 20, width: 300, marginLeft: 30}}>
          <Button 
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
