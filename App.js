import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ConnectedUsers from "./components/ConnectedUsers/ConnectedUsers";
import Messages from "./components/Messages/Messages";
import UsernameForm from "./components/UsernameForm/UsernameForm";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function App() {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketClient = useRef(null);
  useEffect(() => {
    socketClient.current = io.connect(process.env.EXPO_PUBLIC_API_URL);
    if (socketClient.current) {
      socketClient.current.on("username-submitted-successfully", () => {
        setConnected(true);
      });

      socketClient.current.on("username-taken", () => {
        Toast.error("username is taken");
      });

      socketClient.current.on("get-connected-users", (connectedUsers) => {
        setConnectedUsers(
          connectedUsers.filter((user) => user.username !== username)
        );
      });

      socketClient.current.on("receive-message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
    return () => {
      socketClient.current.disconnect();
      socketClient.current = undefined;
    };
  }, [username]);

  const handleConnection = () => {
    if (socketClient.current) {
      socketClient.current.emit("handle-connection", username);
    }
  };

  const handleSendMessage = (blob = undefined, sound = undefined) => {
    if (socketClient.current) {
      const now = new Date().toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sendMessage = blob ? "" : message;
      const time = now.toString();
      const voice_message = blob ? true : false;
      const file = blob
        ? new File([blob], "audio.mp3", { type: "video/mp4" })
        : null;
      const src = "";
      const messageToSend = {
        sendMessage,
        username,
        time,
        voice_message,
        file,
        src,
      };
      setMessages((prev) => [...prev, { ...messageToSend, sound }]);
      socketClient.current.emit("message", messageToSend);
      setMessage("");
    }
  };
  const leaveChat = () => {
    if (socketClient.current) {
      socketClient.current.emit("leaveChat");
      setConnected(false);
    }
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      {!connected ? (
        <View>
          <Image
            style={styles.image}
            source={require("./assets/logo.png")}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <UsernameForm
            username={username}
            setUsername={setUsername}
            handleConnection={handleConnection}
          />
        </View>
      ) : (
        <View>
          {/* <ConnectedUsers Users={connectedUsers} /> */}
          <Messages
            message={message}
            messages={messages}
            handleSendMessage={handleSendMessage}
            setMessage={setMessage}
            username={username}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 150,
    height: 120,
  },
});
