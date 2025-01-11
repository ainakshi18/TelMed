import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [step, setStep] = useState(1);
  const [patientDetails, setPatientDetails] = useState({
    gender: "",
    age: "",
    symptoms: "",
    timeOfInfection: "",
    requestType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDLx53IuSICoUg030HSExz1ypXRV69j0GE");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleInput = () => {
    const newMessages = [...messages];
    newMessages.push({ role: "user", text: userInput });

    if (step === 1) {
      setPatientDetails({ ...patientDetails, gender: userInput });
      newMessages.push({ role: "bot", text: "What is your age?" });
      setStep(2);
    } else if (step === 2) {
      setPatientDetails({ ...patientDetails, age: userInput });
      newMessages.push({ role: "bot", text: "How long have you had these symptoms?" });
      setStep(3);
    } else if (step === 3) {
      setPatientDetails({ ...patientDetails, timeOfInfection: userInput });
      newMessages.push({ role: "bot", text: "Please describe your symptoms." });
      setStep(4);
    } else if (step === 4) {
      setPatientDetails({ ...patientDetails, symptoms: userInput });
      newMessages.push({ role: "bot", text: "Would you like a diagnosis or remedies?" });
      setStep(5);
    } else if (step === 5) {
      setPatientDetails({ ...patientDetails, requestType: userInput });
      newMessages.push({ role: "bot", text: "Generating your response..." });

      const prompt = `I am a ${patientDetails.gender} of age ${patientDetails.age}. I am having ${patientDetails.symptoms} for the past ${patientDetails.timeOfInfection}. I want ${userInput}. Answer as a Medical Chatbot with primary diagnostic capabilities. Provide concise information based on my symptoms. If severity is high, recommend a doctor consultation. Avoid unnecessary disclaimers and provide actionable advice.`;

      setIsLoading(true);

      model
        .generateContent(prompt)
        .then((result) => {
          const response = result.response.text();
          newMessages.push({ role: "bot", text: response });
          setMessages(newMessages);
        })
        .catch((err) => {
          console.error("Error with Gemini API:", err);
          newMessages.push({
            role: "bot",
            text: "Sorry, I couldn't generate a response. Please try again.",
          });
          setMessages(newMessages);
        })
        .finally(() => {
          setIsLoading(false);
          setStep(1);
        });
    }

    setMessages(newMessages);
    setUserInput(""); // Clear input field
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 max-w-lg w-full rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-teal-800 mb-6">Medical ChatBot</h1>
        <div className="h-80 overflow-y-auto border border-gray-300 p-4 rounded-xl shadow-inner bg-gray-100">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`my-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.role === "user"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-center text-teal-500 animate-pulse">Generating response...</div>
          )}
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInput()}
            className="w-full p-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
            placeholder="Type your message..."
          />
        </div>

        <button
          onClick={handleInput}
          className="w-full mt-4 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-teal-300"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
