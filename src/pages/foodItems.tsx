// This is where they will see the feed and stuff
import { Unsubscribe } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { getFoodItemsByUser } from '../firebase/FirebaseApi';
import { FoodItem } from '../Interfaces';

  const foodItems = [

    {
      id: 1,
      name: "Meji milk",
      expiry: new Date("02-08-2022"),
      quantity: 2
    },
    {
      id: 2,
      name: "Tomatoes",
      expiry: new Date("02-10-2022"),
      quantity: 2
    },
    {
      id: 3,
      name: "Nutella",
      expiry: new Date("23-11-2023"),
      quantity: 1
    },
  
  ];  

  function Item({ name, expiry_date }){
    return(
      <View style = {styles.listItem}>
        <Text style = {styles.listName}>{name}</Text>
        <Text style = {styles.listExpiry}>{expiry_date}</Text>
      </View>
    );
  }

export default function FoodItems() {
  const [foodItemList, setFoodItemList] = useState<FoodItem[]>(foodItems)
  const [unsub, setUnsub] = useState<Unsubscribe>()
  useEffect(() => {
    async function work() {
      return await getFoodItemsByUser(foodItems => {
        if (foodItems?.foodItems) {
          setFoodItemList(foodItems.foodItems)
        }
      }).then(unsub => setUnsub(unsub))
    } 
    work()
    return unsub
  }, [])
  
    return (
        <View style={styles.container}>
            <Text>This is the home screen</Text>
            <FlatList data = {foodItemList} renderItem = {({item}) => (
                <Item name = {item.name} expiry_date = {item.expiry} />
            )}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    headerText: {
        textAlign:"left",
        fontWeight:"bold",
        marginTop: 100,
        marginLeft: 12,
        color: "black"
    },
    listItem: {
        backgroundColor:"skyblue",
        margin: 10,
        flexDirection:"row",
    },
    listName: {
        padding:5,
        alignItems: "flex-start",
    },
    listExpiry: {
        padding: 5,
        marginLeft: 170,
        alignItems:"flex-end",
    },
  });

