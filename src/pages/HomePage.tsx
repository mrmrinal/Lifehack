// This is where they will see the feed and stuff
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is the home screen</Text>
        </SafeAreaView>
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