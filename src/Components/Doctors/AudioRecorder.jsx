import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
  });

  const handleStart = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStop = () => {
    stopRecording();
    setIsRecording(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = mediaBlobUrl;
    link.download = "recording.wav"; // Set default name
    link.click();
  };

  return (
    <div>
      <h2>Record and Save Audio</h2>
      <button onClick={handleStart} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStop} disabled={!isRecording}>
        Stop Recording
      </button>

      {mediaBlobUrl && (
        <div>
          <audio src={mediaBlobUrl} controls />
          <button onClick={handleDownload}>Download Audio</button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
