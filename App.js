import React, {useState, useEffect, useRef} from "react";
import Login from './Login';
import Chat from './Chat';
import useLocalStorage from "./useLocalStorage";
import { Button, Pressable, ScrollViewBase, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// Gets names from localstorage, if no name display login
const App = () => {
    const [name, setName] = useLocalStorage()
    const [hasname, setHasname] = useState('false')

    return (
        <>
        {hasname==='false' ? <Login onNameSubmit={setName} hasname={setHasname} /> : <Chat onNameSubmit={setName}  name={name} hasname={setHasname}/>}
        </>
    )
}

export default App;

