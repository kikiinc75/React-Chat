import React from "react";
import Chatkit from "@pusher/chatkit-client";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import NewRoomForm from "./components/NewRoomForm";
import { tokenUrl, instanceLocator } from "./config";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Iqbal",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            // console.log("Received message:", message)
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage.bind(this)}
        />
        <NewRoomForm createRoom={this.createRoom.bind(this)} />
      </div>
    );
  }
}

export default App;
