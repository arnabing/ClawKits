"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "agent",
    content:
      "Good morning! I'm Alfred, your Morning Briefing agent. I can help you with daily briefings, research, and more. What can I do for you today?",
    timestamp: new Date(Date.now() - 300000),
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const instance = useAppStore((s) => s.instance);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate agent response
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1500));

    const responses = [
      "I'll look into that for you. Let me gather some information and get back to you shortly.",
      "Great question! Based on my research, here's what I found...\n\nI've compiled the key points. Would you like me to go deeper on any specific area?",
      "I've noted that down. I'll include it in your next briefing. Is there anything else you'd like me to track?",
      "Let me research that topic. I'll cross-reference multiple sources and provide you with a comprehensive summary.\n\nIn the meantime, is there anything urgent you need help with?",
      "Done! I've updated your preferences. You'll see the changes reflected in tomorrow's briefing.",
    ];

    const agentMessage: Message = {
      id: `msg_${Date.now() + 1}`,
      role: "agent",
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, agentMessage]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Chat Header */}
      <div className="border-b border-surface-800 bg-surface-900/50 px-6 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Alfred</p>
              <p className="text-xs text-surface-500">
                {instance?.status === "RUNNING" ? "Online" : "Offline"} &middot; Morning Briefing Agent
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500">
              Connected via Web Chat
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-brand-600 text-white"
                    : "border border-surface-800 bg-surface-900 text-surface-200"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                <p
                  className={`mt-1 text-right text-[10px] ${
                    msg.role === "user" ? "text-brand-200" : "text-surface-600"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-surface-800 bg-surface-900 px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-surface-500" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-surface-500" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-surface-500" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-surface-800 bg-surface-900/50 px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="input flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
