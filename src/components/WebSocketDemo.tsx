import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { primaryColor, seconDaryColor } from '../theme/Theme';
import CustomeInput from '../ReusableCOmponent/CustomeInput';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { recieveMessage, sendMessage } from '../const/Const';
import { socket } from '../redux/Services/messageApi';
import { useSelector } from 'react-redux';
import { StoreState } from '../redux/store/Store';
import PushNotification from 'react-native-push-notification';

const WebSocketDemo = ({ notificationData }: any) => {
  const { presentUser }: any = useSelector((state: StoreState) => state.globle);

  const flatListRef = useRef<FlatList>(null);
  const [message, setmesage] = useState('');
  const [chat, setchat] = useState<any>([]);
  const [keyboarvisible, setkeyboarvisible] = useState(false);
  const isfocue = useIsFocused();

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setkeyboarvisible(true);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setkeyboarvisible(false);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const connectSoket = () => {
    // if (isfocue) {
    socket.on('connect', () => {
      // console.log('Connected:', socket.id);
    });

    // socket.emit(userName, {
    //   user: presentUser?.profile?.firstName,
    // });

    socket.on(recieveMessage, (data: any) => {
      setchat((prev: any) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.text,
          sender: data.sender,
          time: data.time,
        },
      ]);
    });
    // } else {

    // socket.off('connect');
    // socket.off(recieveMessage);
    // console.log('Of connection');
    // }
  };

  const sendmessage = () => {
    if (socket && message.trim()) {
      socket.emit(sendMessage, { text: message, sender: 'me' });
      setchat((prev: any) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: message,
          sender: 'me',
          time: Date.now(),
        },
      ]);
      setmesage('');
    }
  };

  useEffect(() => {
    // console.log(presentUser?.profile?.firstName);

    connectSoket();
    return () => {
      // socket.off('connect');
      // socket.off(recieveMessage);
    };
  }, []);

  useEffect(() => {
    if (notificationData?.sender && notificationData?.text) {
      setchat((prev: any) => {
        const exists = prev.some(
          (item: any) =>
            item.text === notificationData.text &&
            item.sender === notificationData.sender,
        );
        if (exists) {
          return prev;
        }

        return [
          ...prev,
          {
            id: Date.now().toString(),
            text: notificationData.text,
            sender: notificationData.sender,
            time: Date.now(),
          },
        ];
      });
    }
  }, [notificationData]);

  useFocusEffect(
    useCallback(() => {
      PushNotification.cancelAllLocalNotifications();
      console.log("Cansel all notification");
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboarvisible ? 200 : 0}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <FlatList
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        data={chat}
        keyExtractor={(_, index) => index.toString()}
        style={styles.chatList}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        // onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }: any) => {
          const isUser = item.sender === 'me';
          const isSystem = item.sender === 'system';
          const noUser = !isUser && !isSystem;

          return (
            <View
              style={[
                {
                  // flexDirection: 'row',
                  justifyContent: isUser
                    ? 'flex-end'
                    : isSystem
                    ? 'center'
                    : 'flex-start',
                  // alignItems: 'center',
                },
                styles.chatContainer,
              ]}
            >
              {noUser && (
                <Image
                  source={require('../assets/imge-2.jpg')}
                  style={[{}, styles.noUserImage]}
                />
              )}
              <View
                style={[
                  styles.messageBox,
                  isUser ? styles.userBox : styles.serverBox,
                  isSystem && styles.systemBox,
                ]}
              >
                {isSystem && <Text style={styles.systemLabel}>System</Text>}
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
              {isUser && (
                <Image
                  source={require('../assets/imge-6.jpg')}
                  style={[{}, styles.isUserImage]}
                />
              )}
            </View>
          );
        }}
      />

      <View style={styles.userAction}>
        <CustomeInput
          value={message}
          placeHolder="Enter Text"
          onChangeText={setmesage}
          width={300}
        />
        <TouchableOpacity style={styles.sendtButton} onPress={sendmessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default WebSocketDemo;

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ece6de',
    paddingBottom: 20,
  },

  noUserImage: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
    // borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    // borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    // marginBottom: 40,
    borderWidth: 1,
    marginBottom: 10,
  },

  isUserImage: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end',
    // borderRadius: 50,
    // borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    // marginBottom: 40,
    borderWidth: 1,
    resizeMode: 'stretch',
  },

  connectButton: {
    backgroundColor: primaryColor,
    marginHorizontal: 'auto',
    paddingVertical: 10,
    width: '70%',
    marginVertical: 10,
    borderRadius: 8,
  },

  connectText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
  },

  chatList: {
    flex: 1,
  },

  chatContent: {
    paddingVertical: 10,
  },

  userAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECE5DD',
  },

  sendtButton: {
    backgroundColor: primaryColor,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '13%',
    borderRadius: 8,
  },

  sendText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },

  messageBox: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 4,
    // borderRadius: 10,
  },

  userBox: {
    // backgroundColor: '#DCF8C6',
    backgroundColor: seconDaryColor,
    alignSelf: 'flex-end',
    marginEnd: 10,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
  },

  serverBox: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopRightRadius: 13,
    // borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    marginStart: 10,
  },

  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },

  systemBox: {
    backgroundColor: '#FFF9C4',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#F0E68C',
    borderRadius: 12,
  },

  systemLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
});
