import io from "socket.io-client";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Chat from "../components/Chat";
import './Chat.css'

const storedToken = localStorage.getItem("authToken") 
const socket = io.connect(process.env.REACT_APP_WS_SERVER , {   
  headers: { Authorization: `Bearer ${storedToken}` }});


function ChatPage() {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const { user } = useContext(AuthContext);
  
    const joinRoom = (e) => {
      e.preventDefault()
      if (username !== "" && room !== "") {
        socket.emit("join_room", room);
        setShowChat(true);
      }
    };
    return(
        <div className="ChatPage container">
                 {!showChat ? (
        <div className="JoinChatContainer">
          <h3 className="mt-5">Hi! {user?.name} Join A Chat</h3>
          <div className="col">
          <form className="form card p-5 m-5">
          <lable className="form-label">
          Your name:
          <input
          className="form-control mt-2"
            type="text"
            name="username"
            placeholder="Your name..."
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          </lable>
          <lable className="form-label">
          Who do you wanna chat with?
          <input
          className="form-control mt-2"
            type="text"
            name="room"
            placeholder="Bob..."
            required
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          </lable>
          <button onClick={joinRoom} className="btn btn-warning mt-2">Chat</button>
          </form>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
        </div>
    )
}

export default ChatPage