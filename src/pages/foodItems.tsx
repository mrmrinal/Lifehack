// This is where they will see the feed and stuff
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

  const foodItems = [

    {
      id: 1,
      name: "Meji milk",
      expiry_date: "16th July 2022",
    },
    {
      id: 2,
      name: "Tomatoes",
      expiry_date: "05th August 2022",
    },
    {
      id: 3,
      name: "Nutella",
      expiry_date: "23rd November 2023",
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
    return (
        <View style={styles.container}>
            <Text>This is the home screen</Text>
            <FlatList data = {foodItems} renderItem = {({item}) => (
                <Item name = {item.name} expiry_date = {item.expiry_date} />
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

