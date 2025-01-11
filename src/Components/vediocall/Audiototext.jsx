import React, { useState } from 'react';

const ATT = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; // Keeps the recognition running
  recognition.interimResults = true; // Provides interim results
  recognition.lang = 'en-US'; // Set the language

  const startListening = () => {
    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setText(currentTranscript);
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

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Audio to Text Converter</h1>
      <textarea
        rows="10"
        cols="50"
        value={text}
        readOnly
        placeholder="Your transcribed text will appear here"
        style={{ marginBottom: '20px', fontSize: '16px', padding: '10px' }}
      ></textarea>
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
    </div>
  );
};

export default ATT;