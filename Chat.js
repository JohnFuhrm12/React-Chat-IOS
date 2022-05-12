import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, ScrollViewBase, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, {useState, useEffect, useRef} from "react";
import { TextInput, KeyboardAvoidingView, Alert, RefreshControl  } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import io from "socket.io-client";

let socket;

const Chat = ( {name, hasname} ) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [dbmessages, setDbmessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollpoint = useRef();
  const scrollpoint2 = useRef()
  const ENDPOINT = 'https://react-chat-jf12.herokuapp.com/'

  const socketRef = useRef();

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    console.log(socket);

    socketRef.current = io.connect('/');

    socket.on("your id", id => {
      setYourID(id);
    }, [])

    socket.on("message", (message) => {
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };

    // Emit message data to all users
    socket.emit("send message", messageObject);

    setMessage('');
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function handleLogout() {
    hasname('false')
  }

  return (
    <View style={styles.body}>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headertext}>React Chat</Text>
          <TouchableHighlight style={styles.sendbutton} title="Send" onPress={handleLogout} key={message.key}>
              <Text style={styles.sendbuttontext}>^</Text>
            </TouchableHighlight>
        </View>
        <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <KeyboardAwareScrollView style={styles.container}>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <View>
                <View style={styles.MyRow} key={index}> 
                    <Text style={styles.MyMessage}>{message.body}</Text>
                </View>
                <View>
                  <Text style={styles.myname}>{name}</Text>
                </View>
              </View>
            )
          }
          return (
            <View>
              <View style={styles.PartnerRow} key={index}>
                <Text style={styles.PartnerMessage}>{message.body}</Text>
                </View>
            </View>
          )
        })}
        </KeyboardAwareScrollView>
          <View style={styles.footer}>
            <Text style={styles.imgsend}>Send</Text>
              <TextInput
              onChange={(event) => setMessage(event.nativeEvent.text)}
              value={message}
              style={styles.textarea}
              placeholder="Say something..."
              placeholderTextColor="aqua"
              />
            <TouchableHighlight style={styles.sendbutton} title="Send" onPress={sendMessage} key={message.key}>
              <Text style={styles.sendbuttontext}>^</Text>
            </TouchableHighlight>
          </View>
          </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'rgb(67, 63, 63)',
  },

  page: {
    flex: 1,
    flexDirection: 'column',
  },

  header: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'aqua',
    width: '100%',
  },

  headertext: {
    color: 'aqua',
    fontSize: 35,
    paddingBottom: 30,
    paddingTop: 60,
  },

  container: {
    height: 660,
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderTopWidth: 3,
    borderTopColor: 'black',
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    width: '100%',
  },

  textarea: {
    flex: 1,
    color: 'aqua',
    fontSize: 25,
    borderLeftWidth: 3,
    borderLeftColor: 'black',
    borderRightWidth: 3,
    borderRightColor: 'black',
    maxWidth: '80%',
    height: 80,
  },

  MyRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: 10,
  },

  MyMessage: {
    minWidth: '0%',
    maxWidth: '60%',
    backgroundColor: 'black',
    color: 'aqua',
    padding: 5,
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'aqua',
    borderRadius: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
  },

  myname: {
    color: 'aqua',
  },

  PartnerRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  PartnerMessage: {
    minWidth: '0%',
    maxWidth: '60%',
    backgroundColor: 'black',
    color: 'aqua',
    padding: 5,
    fontSize: 25,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'aqua',
    borderRadius: 20,
    marginHorizontal: 10,
    overflow: 'hidden',
    textAlign: 'left',
  },

  sendbutton: {
    textAlign: 'center',
  },

  sendbuttontext: {
    color: 'aqua',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 10,
  },

});