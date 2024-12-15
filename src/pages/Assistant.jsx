import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Upload,
  MessageSquare,
  Building2,
  Car,
  GraduationCap,
  Heart,
  FileText,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() && !selectedFile) return;

    setShowPrompts(false);
    setInput(""); // Clear input immediately after sending

    const userMessage = {
      type: "user",
      content: messageText,
      file: selectedFile ? selectedFile.name : null,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", messageText);

      if (selectedFile) {
        if (selectedFile.type.startsWith("image/")) {
          formData.append("image", selectedFile);
        } else {
          formData.append("document", selectedFile);
        }
      }

      const response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1/bot/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to get response");

      const result = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          type: "assistant",
          content: result,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content:
            "Sorry, there was an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setSelectedFile(null); // Clear selected file after sending
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            content:
              "Sorry, this file type is not supported. Please upload an image, PDF, or DOCX file.",
          },
        ]);
        return;
      }

      setShowPrompts(false);
      setSelectedFile(file);
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: `File uploaded: ${file.name}. I can help analyze this document and answer any specific questions about it.`,
        },
      ]);
    }
  };

  const handlePromptClick = (prompt) => {
    handleSendMessage(prompt.text); // Auto-submit when prompt is clicked
    setShowPrompts(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              {message.file && (
                <div className="text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {message.file}
                </div>
              )}
              <div className="markdown-content text-sm leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-2" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-4 mb-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-4 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-gray-100 px-1 rounded" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border p-3 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showPrompts && (
        <div className="bg-white border-t p-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Suggested Questions:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
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
      )}

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

      <div className="bg-white border-t p-4">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf,.docx"
            />
            <Upload className="w-6 h-6 text-gray-500 hover:text-blue-600" />
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or question here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading}
            className={`p-2 ${
              isLoading ? "text-gray-400" : "text-blue-600 hover:text-blue-800"
            }`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
