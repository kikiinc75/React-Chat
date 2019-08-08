import React from "react";

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your rooms: </h3>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              // eslint-disable-next-line react/jsx-no-comment-textnodes
              <li key={room.id} className={"room " + active}>
                <a onClick={() => this.props.subscribeToRoom(room.id)} href='#'>
                  # {room.name}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="help-text">RoomList</div>
      </div>
    );
  }
}

export default RoomList;
