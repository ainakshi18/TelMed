import React, { useRef, useState, useEffect, useCallback } from 'react';
import Peer from 'peerjs';

const Board = ({ isCaller }) => {
  const [peerId, setPeerId] = useState('');
  const [remoteId, setRemoteId] = useState('');
  const [callActive, setCallActive] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileProgress, setFileProgress] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [receivingFile, setReceivingFile] = useState([]);
  const [fileChunks, setFileChunks] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [receivedFiles, setReceivedFiles] = useState([]);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerInstance = useRef();
  const dataConnection = useRef();
  const localStream = useRef(null);
  const [call, setCall] = useState(null);

  // Reset all states
  const resetStates = () => {
    setMessages([]);
    setNewMessage('');
    setSelectedFile(null);
    setReceivingFile(null);
    setFileChunks([]);
    setRemoteId('');
    setCallActive(false);
    setIsAudioMuted(false);
    setIsVideoMuted(false);
  };

  const setupDataConnection = useCallback((conn) => {
    dataConnection.current = conn;
    conn.on('data', (data) => {
      if (data.type === 'message') {
        setMessages(prev => [...prev, { text: data.content, sender: 'remote' }]);
      } else if (data.type === 'file-start') {
        setFileChunks([]);
        setFileProgress(0);
        setIsTransferring(true);
        setReceivingFile({
          name: data.fileName,
          size: data.fileSize,
          type: data.fileType,
          totalChunks: Math.ceil(data.fileSize / 16384)
        });
      } else if (data.type === 'file-chunk') {
        setFileChunks(prevChunks => {
          const newChunks = [...prevChunks, data.chunk];
          const progress = (newChunks.length / receivingFile.totalChunks) * 100;
          setFileProgress(Math.round(progress));
          return newChunks;
        });
      } else if (data.type === 'file-end') {
        const fileBlob = new Blob(fileChunks, { type: receivingFile.type });
        const fileUrl = URL.createObjectURL(fileBlob);
        setReceivedFiles(prev => [...prev, { name: receivingFile.name, url: fileUrl, type: receivingFile.type, size: receivingFile.size }]);
        setFileProgress(100);
        setReceivingFile(null);
        setFileChunks([]);
      }
    });

    conn.on('close', () => {
      resetStates();
    });
  }, []);

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('connection', (conn) => {
      setupDataConnection(conn);
    });

    peer.on('call', (incomingCall) => {
      setIsReceivingCall(true);
      setCall(incomingCall);

      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }

          incomingCall.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });

          incomingCall.on('close', () => {
            endCall();
          });
        });
    });

    return () => {
      peer.disconnect();
      if (dataConnection.current) {
        dataConnection.current.close();
      }
      resetStates();
    };
  }, [setupDataConnection]);

  const startCall = () => {
    if (!remoteId) {
      alert('Please enter a valid remote ID.');
      return;
    }

    const conn = peerInstance.current.connect(remoteId);
    setupDataConnection(conn);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        localStream.current = mediaStream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }

        const newCall = peerInstance.current.call(remoteId, mediaStream);
        setCallActive(true);

        newCall.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });

        newCall.on('close', () => {
          endCall();
        });
      })
      .catch(error => {
        console.error('Error getting media stream:', error);
        alert('Failed to access camera/microphone. Please check permissions.');
      });
  };

  const acceptCall = () => {
    if (call) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          localStream.current = mediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = mediaStream;
          }
          call.answer(mediaStream);
          setCallActive(true);
          setIsReceivingCall(false);

          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });

          call.on('close', () => {
            endCall();
          });
        })
        .catch(error => {
          console.error('Error getting media stream:', error);
          alert('Failed to access camera/microphone. Please check permissions.');
        });
    }
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
      localStream.current = null;
    }
    setCallActive(false);
    setIsReceivingCall(false);

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (remoteVideoRef.current?.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    if (dataConnection.current) {
      dataConnection.current.close();
    }
    resetStates();
  };

  return (
    <div className="board">
      <h1>{isCaller ? 'Caller Board' : 'Receiver Board'}</h1>
      <div className="connection-controls">
        <h2>Your ID: {peerId}</h2>
        <input
          type="text"
          placeholder="Enter remote peer ID"
          value={remoteId}
          onChange={(e) => setRemoteId(e.target.value)}
        />
        {!callActive && !isReceivingCall && (
          <button onClick={startCall}>Call</button>
        )}

        {isReceivingCall && !callActive && (
          <div>
            <button onClick={acceptCall}>Accept Call</button>
            <button onClick={endCall}>Reject Call</button>
          </div>
        )}

        {callActive && (
          <div>
            <button onClick={endCall}>End Call</button>
          </div>
        )}
      </div>

      <div className="video-container">
        <video ref={localVideoRef} autoPlay muted />
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </div>
  );
};

export default Board;
