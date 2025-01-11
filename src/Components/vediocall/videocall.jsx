import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useReactMediaRecorder } from 'react-media-recorder';
import Chatboat from './chatboat';

const VideoCallPage = ({ id }) => {
  const [messagesList, setMessagesList] = useState([]);
  const navigate = useNavigate();
  const [externalApi, setExternalApi] = useState(null);
  const [text, setText] = useState(''); // Current text
  const [allTranscripts, setAllTranscripts] = useState(''); // Cumulative text
  const [isListening, setIsListening] = useState(false);

  // Instantiate the SpeechRecognition object
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; // Keeps the recognition running
  recognition.interimResults = true; // Provides interim results
  recognition.lang = 'en-US'; // Set the language

  const { startRecording, stopRecording, mediaBlobUrl, status } = useReactMediaRecorder({
    audio: true,
  });

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText(currentTranscript);
      setAllTranscripts((prev) => prev + ' ' + currentTranscript); // Append new text
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const uploadAudio = async () => {
    if (!mediaBlobUrl) return; // Ensure mediaBlobUrl exists before attempting upload

    // Convert mediaBlobUrl to Blob
    const response = await fetch(mediaBlobUrl);
    const audioBlob = await response.blob();

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');  // Append the audio file
const api = "sk-2e554257d5534475a7e11ef58baf92da";
    try {
      const response = await fetch('https://api.worqhat.com/api/ai/speech-text', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${api} `, // Replace with your actual token
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
      <button onClick={startRecording} className="btn btn-primary">Start Recording</button>
      <button onClick={stopRecording} className="btn btn-secondary">Stop Recording</button>
      
      <h1>Audio to Text Converter</h1>
      <textarea
        rows="10"
        cols="50"
        value={allTranscripts}
        readOnly
        placeholder="Your transcribed text will appear here"
        style={{ marginBottom: '20px', fontSize: '16px', padding: '10px' }}
      ></textarea>
      {console.log(allTranscripts)}
      <Chatboat values={allTranscripts}/>
      <br />
      <button
        onClick={startListening}
        disabled={isListening}
        style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        Start Listening
      </button>
      <button
        onClick={stopListening}
        disabled={!isListening}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Stop Listening
      </button>

      <button onClick={uploadAudio} className="btn btn-success mt-4">Upload Audio</button>
    </div>
  );
};

export default VideoCallPage;