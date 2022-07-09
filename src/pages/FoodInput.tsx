import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FoodInput() {
    return (
        <View style={styles.container}>
            <Text>This is the food input screen</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });