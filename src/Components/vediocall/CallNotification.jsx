import React from 'react';

const CallNotification = ({ callerId, onAccept, onReject }) => {
  return (
    <div className="call-notification">
      <h3>Incoming Call from: {callerId}</h3>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default CallNotification;