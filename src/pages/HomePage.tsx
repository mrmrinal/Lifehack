// This is where they will see the feed and stuff
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <Text>This is the home screen</Text>
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