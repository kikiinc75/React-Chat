import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind()} className="send-message-form">
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange.bind(this)}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
