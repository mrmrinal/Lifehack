import React, {useState, useRef, useEffect} from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, SafeAreaView, Platform, Modal, ImageBackground} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Camera } from 'expo-camera';
import { ShareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function FoodInput() {
    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState('Select the expiry date') 
    const [foodName, setFoodName] = useState('');

    const onChange = (event:Event, selectedDate:Date) => {
        const currentDate:Date = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDateText('Expiry Date: ' + fDate)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Add a new Food Item</Text>
            <View style={{marginTop:20, width:'100%', justifyContent:'center'}}>
                <TextInput
                  style={styles.input}
                  onChangeText={setFoodName}
                  value={foodName}
                  placeholder="Name of the food Item"
                />
                <Text style={styles.fieldTitle}>{dateText}</Text> 

                <DateTimePicker
                    testID='datePicker'
                    value={date}
                    onChange={onChange}
                    mode='date'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                />


                <View style={styles.viewPaired}>
                    <View style={styles.twoButtonContainer} > 
                      <Button title="Take a Picture" onPress={() => captureImage()}/>
                    </View>
                    <View style={styles.twoButtonContainer} >
                      <Button title="Upload a Picture" onPress = {() => uploadImage()}/>
                    </View>
                </View>
            </View>
        </View>
    )

}

const captureImage = () => {
    ImagePicker
    .requestCameraPermissionsAsync()
    .then(cameraRollPerm => {
      // only if user allows permission to camera roll
      if (cameraRollPerm.granted) {
        ImagePicker
        .launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        })
        .catch(console.error)
      } else {
          Alert.alert('Provide access to camera and photos in settings');
      }
    })
    .catch(console.error);
  };

const uploadImage = () => {
  ImagePicker
  .requestCameraPermissionsAsync()
  .then(cameraRollPerm => {
    // only if user allows permission to camera roll
    if (cameraRollPerm.granted) {
      ImagePicker
      .launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })
      .catch(console.error)
    } else {
        Alert.alert('We need permission to go further!');
    }
  })
  .catch(console.error);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }, 
    textTitle: {
        fontFamily: 'Foundation',
        fontSize: 35,
        marginTop: 100,
        alignSelf:'center'
    },
    fieldTitle: {
        fontFamily: 'Foundation',
        fontSize: 25,
        marginTop: 20,
        alignSelf:'center',
        color:'red'
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        width: '80%',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center'
    },  
    buttonContainer: {
        backgroundColor: '#fff',
        alignSelf: 'flex-end'
    },
    viewPaired: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    twoButtonContainer: {
        flex: 1,
    }, 
    modalView: {
        justifyContent: 'center',
        minHeight:500
    }
    
  });