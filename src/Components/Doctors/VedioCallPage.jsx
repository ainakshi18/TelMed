import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useReactMediaRecorder } from 'react-media-recorder';

const VideoCallPage = ({ id }) => {
  const [messagesList, setMessagesList] = useState([]);
  const navigate = useNavigate();
  const [externalApi, setExternalApi] = useState(null);

  const { startRecording, stopRecording, mediaBlobUrl, status } = useReactMediaRecorder({
    audio: true,
  });

  const handleStartRecording = () => {
    console.log("Start recording");
    startRecording();
  };

  const handleStopRecording = () => {
    console.log("Stop recording, current status:", status);  // Check current status
    if (status === 'recording') {
      stopRecording();
      uploadAudio();  // Upload the audio after stopping the recording
    } else {
      console.log("Recording not in progress, cannot stop.");
    }
  };

  const uploadAudio = async () => {
    const formData = new FormData();
    formData.append('audio', mediaBlobUrl, 'recording.wav');  // Append the audio file

    try {
      const response = await fetch('https://api.worqhat.com/api/ai/speech-text', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer <your_token>', // Replace with your actual token
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Audio uploaded successfully');
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error uploading audio:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const handleChatMessage = (message) => {
    setMessagesList((prevMessages) => [
      ...prevMessages,
      { from: message.from, text: message.message },
    ]);
  };

  const handleCallEnd = () => {
    console.log("Call ended.");
  };

  useEffect(() => {
    if (externalApi) {
      externalApi.addListener('message', (message) => {
        console.log('Received message:', message);
        handleChatMessage(message);
      });

      externalApi.addListener('hangup', () => {
        console.log("Hangup event triggered");
        handleCallEnd();
      });

      externalApi.addListener('userLeft', () => {
        console.log("User has left the conference.");
        handleCallEnd();
      });

      return () => {
        externalApi.removeListener('message');
        externalApi.removeListener('hangup');
        externalApi.removeListener('userLeft');
        console.log("Event listeners cleaned up");
      };
    }
  }, [externalApi]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Video Consultation</h1>
      <div className="video-call-container bg-white p-6 rounded-lg shadow-lg mb-6">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName={`consultation-${id}`}
          userInfo={{ displayName: 'doctor' }}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableClosePage: false,
          }}
          interfaceConfigOverwrite={{
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'hangup',
              'chat',
              'raisehand',
            ],
          }}
          onApiReady={(api) => {
            console.log("Jitsi API is ready", api);
            setExternalApi(api);
          }}
          getIFrameRef={(iframe) => {
            iframe.style.height = "600px";
            iframe.style.width = "100%";
          }}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">Record and Save Audio</h2>
      {/* Start Recording Button */}
      <button
        onClick={handleStartRecording}
        disabled={status === 'recording'}
        className="px-4 py-2 bg-green-500 text-white rounded-md mb-2 w-full"
      >
        Start Recording
      </button>

      {/* Stop Recording Button */}
      <button
        onClick={handleStopRecording}
        disabled={status !== 'recording'}  // Disable when not recording
        className="px-4 py-2 bg-red-500 text-white rounded-md mb-2 w-full"
      >
        Stop Recording
      </button>

      {mediaBlobUrl && (
        <div className="mt-4">
          <audio src={mediaBlobUrl} controls className="w-full rounded-lg" />
          <button
            onClick={uploadAudio}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Upload Audio
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCallPage;
