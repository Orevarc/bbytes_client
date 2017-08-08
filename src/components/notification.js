import React from 'react';
import FontAwesome from 'react-fontawesome';

class Notification extends React.Component {

  static propTypes = {
    message: React.PropTypes.string,
    type: React.PropTypes.string,
    visible: React.PropTypes.bool
  };

  getNotificationClass = (type) => {
    return "notification is-" + type;
  };

  renderNotification = (messageClass, message) => {
    return (
      <div className={messageClass}>
        <button class="delete"></button>
        <div className="message">{message}</div>
      </div>
    );
  };

  render() {
    const visible = this.props.visible
    const message = this.props.message;
    const messageClass = this.getNotificationClass(this.props.type);
    return visible ? this.renderNotification(messageClass, message) : null;
  };
}

export default MessageBox;