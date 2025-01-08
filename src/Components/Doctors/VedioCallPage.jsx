import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';

const VideoCallPage = ({ id }) => {
  const [messagesList, setMessagesList] = useState([]); // To store chat messages
  const navigate = useNavigate();
  const [externalApi, setExternalApi] = useState(null); // Store externalApi when ready

  // Function to handle new chat messages
  const handleChatMessage = (message) => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      { from: message.from, text: message.message },
    ]);
  };

  // This function handles the end of the video call
  const handleCallEnd = () => {
    console.log("Call ended.");
    // Optional: You can choose to display a message or perform any action here
    // Example: Navigate to another page if needed
    // navigate("/end-call");
  };

  useEffect(() => {
    // Make sure externalApi is set before adding listeners
    if (externalApi) {
      // Listen for the chat message event
      externalApi.addListener('message', (message) => {
        console.log('Received message:', message);  // Debugging
        handleChatMessage(message);
      });

      // Listen for the hangup event (when user clicks 'End Call')
      externalApi.addListener('hangup', () => {
        console.log("Hangup event triggered");
        handleCallEnd();
      });

      // Listen for the user left event
      externalApi.addListener('userLeft', () => {
        console.log("User has left the conference.");
        handleCallEnd();
      });

      // Cleanup function to remove listeners when the component unmounts
      return () => {
        externalApi.removeListener('message');
        externalApi.removeListener('hangup');
        externalApi.removeListener('userLeft');
        console.log("Event listeners cleaned up");
      };
    }
  }, [externalApi]); // Re-run the effect when externalApi is set

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Video Consultation</h1>
      <div className="video-call-container bg-gray-100 p-4 rounded shadow">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={`consultation-${id}`}
          userInfo={{ displayName: 'doctor' }}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableClosePage: false,  // Disable close page
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'hangup',  // Include the hangup button
              'chat',
              'raisehand',
            ],
          }}
          onApiReady={(api) => {
            console.log("Jitsi API is ready", api);
            setExternalApi(api); // Save the externalApi when it's ready
          }}
          getIFrameRef={(iframe) => {
            iframe.style.height = "600px";
            iframe.style.width = "100%";
          }}
        />
      </div>

      {/* Display chat messages after the call ends */}
      <div className="chat-messages mt-4 p-4 bg-white rounded shadow-lg">
        <h2 className="font-semibold text-xl mb-2">Chat Messages</h2>
        <ul className="list-none">
          {messagesList.length === 0 ? (
            <li>No messages yet</li>
          ) : (
            messagesList.map((msg, index) => (
              <li key={index} className="mb-2">
                <strong>{msg.from}:</strong> {msg.text}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default VideoCallPage;
