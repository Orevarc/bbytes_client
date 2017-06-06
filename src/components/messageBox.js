import React from 'react';
import FontAwesome from 'react-fontawesome';

class MessageBox extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
    type: React.PropTypes.string,
    visible: React.PropTypes.bool
  };

  getMessageBoxClass = (type) => {
    return "message-box is-" + type;
  };

  renderMessageBox = (messageClass, message) => {
    return (
      <div className={messageClass}>
        <div className="message">{message}</div>
      </div>
    );
  };

  render() {
    const visible = this.props.visible
    const message = this.props.message;
    const messageClass = this.getMessageBoxClass(this.props.type);
    return visible ? this.renderMessageBox(messageClass, message) : null;
  };
}

export default MessageBox;