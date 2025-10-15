"use client";

import { useState } from "react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");

        try {
           const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
              },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [
                        { 
                            role: "system", 
                            content: `You are a financial expert and mentor specializing in helping students understand money management, budgeting, investing, and financial independence. 
                            Your responses should be clear, educational, and encouraging, providing actionable advice in a friendly and approachable manner. 
                            Keep explanations simple but insightful, using examples relevant to students (like saving money on books, budgeting for college, or starting small investments). 
                            Avoid overly complex financial jargon unless you explain it clearly.`
                        },
                        ...updatedMessages
                    ],
                    max_tokens: 200,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                setMessages([...updatedMessages, { role: "assistant", content: data.choices[0].message.content }]);
            }
        } catch (error) {
            setMessages([...updatedMessages, { role: "assistant", content: "Error fetching response." }]);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-10">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
            >
                💬
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 h-96 bg-gray-900 text-white p-4 shadow-2xl rounded-xl flex flex-col border border-gray-700">
                    {/* Chat Messages */}
                    <div className="overflow-auto flex-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-600">
                        {messages.map((msg, i) => (
                            <div 
                                key={i} 
                                className={`p-3 rounded-lg max-w-[80%] ${
                                    msg.role === "user" 
                                        ? "bg-blue-500 text-white self-end ml-auto" 
                                        : "bg-gray-700 text-gray-300 self-start"
                                }`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <div className="flex items-center border-t border-gray-700 p-2">
                        <input 
                            className="flex-1 p-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask me about money..."
                        />
                        <button 
                            onClick={sendMessage}
                            className="ml-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
