import io from "socket.io-client";
import { useState } from "react";
import Chat from "../components/Chat";
const storedToken = localStorage.getItem("authToken") 
const socket = io.connect( process.env.REACT_APP_WS_SERVER , {                                     //process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${storedToken}` }});
console.log(socket)

function ChatPage() {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
  
    const joinRoom = () => {
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
    return(
        <div className="ChatPage">
                 {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
        </div>
    )
}

export default ChatPage