import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements'

const Submit = () => {
    return (
        <TouchableOpacity>
            <Text style={styles.submitText}>LOG IN</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 50,
        borderColor: 'blue',
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 0,
        backgroundColor: "#0148a4"
    },
    submitText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        marginVertical: 10
    }
});

export default Submit