import { useState } from "react";
import API from "../../services/api";

const starterMessages = [
  {
    role: "assistant",
    content:
      "Hi, I am your Ollama inventory assistant. Ask me about stock, sales, forecasts, or restocking.",
  },
];

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await API.post("/chat", { message: trimmedMessage });
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: res.data.response || "I could not generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: "Something went wrong while talking to the Ollama agent.",
        },
      ]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages(starterMessages);
    setMessage("");
  };

  return (
    <div className="flex min-h-[620px] flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Ollama Agent
          </p>
          <h2 className="text-xl font-bold text-slate-950">Inventory Chatbot</h2>
        </div>
        <button
          type="button"
          onClick={clearChat}
          className="self-start rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:self-auto"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/70 p-4 sm:p-5">
        {messages.map((item, index) => {
          const isUser = item.role === "user";

          return (
            <div
              key={`${item.role}-${index}`}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%] ${
                  isUser
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-700"
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-75">
                  {isUser ? "You" : "Ollama AI"}
                </p>
                <p className="whitespace-pre-wrap">{item.content}</p>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              Ollama AI is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about stock availability, revenue, best-selling products..."
            rows="2"
            className="min-h-12 min-w-0 flex-1 resize-none rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!message.trim() || isLoading}
            className="rounded-md bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:self-end"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
