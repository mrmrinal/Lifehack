import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Platform,
  Modal,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Camera } from "expo-camera";
import { ShareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../firebase/FirebaseApi";
import { addFoodItemToUser } from "../firebase/FirebaseApi";
import { getCurrentUserUid } from "../firebase/FirebaseApi";
import { HOMEPAGE_ROUTE } from "../AppConstants";

export default function FoodInput({ navigation }) {
  const [date, setDate] = useState<Date>(new Date());
  const [dateText, setDateText] = useState("Select the expiry date");
  const [foodName, setFoodName] = useState<string>("");
  const [image, setImage] = useState("");

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate: Date = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setDateText("Expiry Date: " + fDate);
  };

  const captureImage = () => {
    ImagePicker.requestCameraPermissionsAsync()
      .then(async (cameraRollPerm) => {
        // only if user allows permission to camera roll
        if (cameraRollPerm.granted) {
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
          }).catch(console.error);
          if (!result?.cancelled && result.uri) {
            setImage(result.uri);
          }
        } else {
          Alert.alert("Provide access to camera and photos in settings");
        }
      })
      .catch(console.error);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }).catch(console.error);

    if (result?.uri && !result?.cancelled) {
      setImage(result.uri);
    }
  };

  const submit = async () => {
    if (image !== "" && foodName !== "") {
      let url = await uploadImage(image);
      url = url ? url : "";
      const uid = getCurrentUserUid();
      if (uid && foodName !== "") {
        addFoodItemToUser(uid, {
          expiry: date,
          name: foodName,
          quantity: 1,
          photoUrl: url,
        });
      }
      navigation.navigate(HOMEPAGE_ROUTE)
    } else {
      Alert.alert("Fields Empty" + image + foodName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Add a new Food Item</Text>
      <View style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
        <TextInput
          style={styles.input}
          onChangeText={setFoodName}
          value={foodName}
          placeholder="Name of the food Item"
        />
        <Text style={styles.fieldTitle}>{dateText}</Text>

        <DateTimePicker
          testID="datePicker"
          value={date}
          onChange={onChange}
          minimumDate={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />

        <View style={styles.viewPaired}>
          <View style={styles.twoButtonContainer}>
            <Button title="Take a Picture" onPress={() => captureImage()} />
          </View>
          <View style={styles.twoButtonContainer}>
            <Button title="Upload a Picture" onPress={() => pickImage()} />
          </View>
        </View>
        <View style={{ width: 300, alignSelf: "center" }}>
          <Button onPress={submit} title="Submit Details" />
        </View>
        <View style={{ width: 300, alignSelf: "center" }}>
          <Button onPress={() => navigation.navigate(HOMEPAGE_ROUTE)} title="Back to Home" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 35,
    marginTop: 100,
    alignSelf: "center",
  },
  fieldTitle: {
    fontSize: 25,
    marginTop: 20,
    alignSelf: "center",
    color: "red",
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  viewPaired: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  twoButtonContainer: {
    flex: 1,
  },
  modalView: {
    justifyContent: "center",
    minHeight: 500,
  },
});
