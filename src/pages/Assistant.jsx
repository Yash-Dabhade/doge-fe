import React, { useState } from "react";
import {
  Send,
  Upload,
  MessageSquare,
  Home,
  Building2,
  Car,
  GraduationCap,
  Briefcase,
  Heart,
  FileText,
  X,
} from "lucide-react";

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      content:
        "Hello! I'm here to help you with your relocation. You can ask me anything about moving to a new state, or try one of the suggested prompts below with document upload support.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Sample pre-made prompts that users can click on
  const suggestedPrompts = [
    {
      icon: <Building2 className="w-5 h-5" />,
      text: "What's the average cost of rent in different areas?",
      category: "Cost",
    },
    {
      icon: <Car className="w-5 h-5" />,
      text: "What's the public transportation system like?",
      category: "Transport",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      text: "Tell me about the school districts and education options.",
      category: "Education",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      text: "What's the healthcare system and insurance options?",
      category: "Healthcare",
    },
  ];

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { type: "user", content: input },
        { type: "assistant", content: `Let me help you with: ${input}` }, // In a real app, this would call an API
      ]);
      setInput("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessages([
        ...messages,
        {
          type: "system",
          content: `File uploaded: ${file.name}. I can help analyze this document and answer any specific questions about it.`,
        },
      ]);
    }
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt.text);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          Relocation Assistant
        </h1>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : message.type === "system"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-white text-gray-800 border"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts Section */}
      <div className="bg-white border-t p-4">
        <h2 className="text-sm font-semibold text-gray-600 mb-3">
          Suggested Questions:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              className="flex items-center gap-2 p-2 text-left text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              {prompt.icon}
              <span className="flex-1">{prompt.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Display */}
      {selectedFile && (
        <div className="bg-blue-50 p-3 mx-4 mb-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-800">{selectedFile.name}</span>
          </div>
          <button
            onClick={removeFile}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          {/* File Upload Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
            />
            <Upload className="w-6 h-6 text-gray-500 hover:text-blue-600" />
          </label>

          {/* Message Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or question here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
