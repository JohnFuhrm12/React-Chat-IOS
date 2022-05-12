import { Button, Pressable, ScrollViewBase, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { TextInput, KeyboardAvoidingView, Alert, RefreshControl  } from 'react-native';
import React, {useState, useEffect, useRef} from "react";

export default function Login( {onNameSubmit, hasname} ) {
    const nameRef = useRef();
  
    function handleSubmit() {
      hasname('true')
    }
  
    return (
      <View style={styles.page}>
        <View style={styles.container}>
        <View style={styles.loginheader}>
            <Text style={styles.loginheadertext}>React Chat</Text>
          </View>
          <View style={styles.logincontainer}>
            <Text style={styles.label}>Enter Your Name:</Text>
            <TextInput
              onChange={(event) => onNameSubmit(event.nativeEvent.text)}
              style={styles.textarea}
              ref={nameRef}
            />
            <TouchableHighlight style={styles.sendbutton} title="Login" onPress={handleSubmit}>
                <Text style={styles.sendbuttontext}>Login</Text>
            </TouchableHighlight>
        </View>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'rgb(67, 63, 63)',
      alignItems: 'center',
    },

    container: {
      backgroundColor: 'black',
      borderWidth: 3,
      borderColor: 'aqua',
      borderRadius: 20,
      marginTop: '70%',
      padding: 30,
      alignItems: 'center',
    },

    loginheader: {
      textAlign: 'center',
    },

    loginheadertext: {
      color: 'aqua',
      fontSize: 55,
      marginTop: -20,
      marginBottom: 15,
    },

    logincontainer: {
      textAlign: 'center',
    },

    label: {
      color: 'aqua',
      fontSize: 25,
      marginBottom: 10,
      marginLeft: 30,
    },

    textarea: {
      backgroundColor: 'white',
      color: 'black',
      width: 240,
      height: 30,
      borderColor: 'aqua',
      borderWidth: 3,
      fontSize: 30,
    },

    sendbuttontext: {
      backgroundColor: 'rgb(67, 63, 63)',
      color: 'aqua',
      fontSize: 25,
      marginTop: 15,
      marginLeft: 50,
      padding: 10,
      paddingLeft: 30,
      borderColor: 'aqua',
      borderWidth: 3,
      borderRadius: 20,
      overflow: 'hidden',
      width: 130,
    },
  
  });