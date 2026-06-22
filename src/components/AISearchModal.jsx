import { aiResponses, categories, suggestedQuestions } from "#constants";
import {
  Bot,
  ChevronRight,
  ArrowUp,
  Copy,
  ThumbsUp,
  ArrowRight,
  MessageSquare,
  Lightbulb,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return idCounter;
};

const AISearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    (text) => {
      const trimmedText = text.trim();
      if (!trimmedText || isThinking) return;

      const userMessage = {
        type: "user",
        content: trimmedText,
        id: generateId(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);

      setTimeout(() => {
        const filtered = aiResponses.filter(
          (item) =>
            item.text.toLowerCase().includes(trimmedText.toLowerCase()) ||
            item.desc.toLowerCase().includes(trimmedText.toLowerCase()) ||
            item.tag.toLowerCase().includes(trimmedText.toLowerCase()),
        );

        const aiMessage = {
          type: "ai",
          id: generateId(),
          content:
            filtered.length > 0
              ? `Found ${filtered.length} result${filtered.length > 1 ? "s" : ""}`
              : "No exact matches found. Here are some suggestions:",
          suggestions: filtered.length > 0 ? filtered : aiResponses,
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsThinking(false);
      }, 1500);
    },
    [isThinking],
  );

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      sendMessage(query);
      setQuery("");
    },
    [query, sendMessage],
  );

  const handleSuggestionClick = useCallback(
    (questionText) => {
      setQuery(questionText);
      setTimeout(() => {
        sendMessage(questionText);
        setQuery("");
      }, 50);
    },
    [sendMessage],
  );

  const handleResultClick = useCallback((item) => {
    const aiMessage = {
      type: "ai",
      id: generateId(),
      content: `📂 ${item.text}`,
      details: {
        title: item.text,
        description: item.desc,
        tag: item.tag,
        icon: item.icon,
        category: item.category,
      },
    };

    setMessages((prev) => [...prev, aiMessage]);
  }, []);

  const handleCategoryClick = useCallback(
    (category) => {
      const newCategory = selectedCategory === category ? null : category;
      setSelectedCategory(newCategory);

      const filtered = newCategory
        ? aiResponses.filter((item) => item.category === newCategory)
        : aiResponses;

      const aiMessage = {
        type: "ai",
        id: generateId(),
        content: newCategory
          ? `Showing ${filtered.length} items in ${newCategory}`
          : "Showing all items",
        suggestions: filtered,
      };

      setMessages((prev) => [...prev, aiMessage]);
    },
    [selectedCategory],
  );

  const handleClose = useCallback(() => {
    setMessages([]);
    setQuery("");
    setSelectedCategory(null);
    setIsThinking(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a1e24]/90 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="relative z-10 min-h-screen flex items-start justify-center pt-[8vh]">
        <div
          className="w-full max-w-4xl mx-4 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden"
          style={{ backgroundColor: "#252a32" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-[#3d434d] bg-[#1e222a]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2c313a] flex items-center justify-center ring-1 ring-[#4a5058]">
                <Bot size={20} className="text-[#d0d8e0]" />
              </div>
              <div>
                <h3 className="text-[#f0f2f5] font-semibold text-sm tracking-wide">
                  RESUME AI
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6abf9e]" />
                  <p className="text-xs text-[#a8b0b8]">Ready to help</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2c313a] border border-[#3d434d]">
                <span className="text-xs text-[#a8b0b8] font-mono">⌘</span>
                <span className="text-xs text-[#a8b0b8] font-mono">K</span>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-[#2c313a] flex items-center justify-center hover:bg-[#3d434d] transition-colors ring-1 ring-[#3d434d] hover:ring-[#4a5058]"
              >
                <span className="text-[#c8d0d8] text-sm">✕</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex h-[60vh]">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 custom-scrollbar">
                {/* Welcome State */}
                {messages.length === 0 && (
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#2c313a] flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-[#3d434d]">
                        <MessageSquare size={18} className="text-[#c8d0d8]" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="bg-[#2c313a] rounded-2xl px-5 py-4 border border-[#3d434d]">
                          <p className="text-[#e8ecf1] text-sm leading-relaxed">
                            Hello! I can help you navigate through my
                            professional portfolio. Ask me anything or browse by
                            category.
                          </p>
                        </div>

                        {/* Categories */}
                        <div className="flex gap-2 flex-wrap">
                          {categories.map((cat) => (
                            <button
                              key={cat.key}
                              onClick={() => handleCategoryClick(cat.key)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm ${
                                selectedCategory === cat.key
                                  ? "bg-[#3d434d] border-[#4a5058] text-[#f0f2f5]"
                                  : "bg-[#2c313a] border-[#3d434d] hover:bg-[#363c46] hover:border-[#4a5058] text-[#e8ecf1]"
                              }`}
                            >
                              <cat.icon size={14} className="text-[#c8d0d8]" />
                              <span className="font-medium">{cat.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Suggested Questions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestedQuestions.map((question, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(question.text)}
                          className="group relative p-4 rounded-2xl bg-[#2c313a] border border-[#3d434d] hover:border-[#4a5058] hover:bg-[#323842] transition-all text-left"
                        >
                          <div className="flex items-start gap-3">
                            <question.icon
                              size={16}
                              className={`${question.color} mt-0.5`}
                            />
                            <div className="flex-1">
                              <p className="text-sm text-[#e8ecf1] group-hover:text-[#f0f2f5] transition-colors leading-relaxed font-medium">
                                {question.text}
                              </p>
                            </div>
                            <ArrowRight
                              size={14}
                              className="text-[#7a828a] group-hover:text-[#c8d0d8] group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    {message.type === "user" ? (
                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-[#c8d0d8] rounded-2xl rounded-br-sm px-5 py-3 max-w-[75%]">
                          <p className="text-[#1a1e24] text-sm leading-relaxed font-medium">
                            {message.content}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#3d434d] flex items-center justify-center shrink-0 ring-1 ring-[#4a5058]">
                          <span className="text-xs text-[#f0f2f5] font-semibold">
                            Y
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#2c313a] flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-[#3d434d]">
                            <Bot size={14} className="text-[#c8d0d8]" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="bg-[#2c313a] rounded-2xl rounded-tl-sm px-5 py-3.5 border border-[#3d434d]">
                              <p className="text-[#e8ecf1] text-sm leading-relaxed">
                                {message.content}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                              <button className="p-1.5 rounded-lg hover:bg-[#363c46] transition-colors">
                                <Copy size={12} className="text-[#a8b0b8]" />
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-[#363c46] transition-colors">
                                <ThumbsUp
                                  size={12}
                                  className="text-[#a8b0b8]"
                                />
                              </button>
                            </div>

                            {/* Results */}
                            {message.suggestions && (
                              <div className="space-y-2">
                                {message.suggestions.map((item, j) => (
                                  <button
                                    key={j}
                                    onClick={() => handleResultClick(item)}
                                    className="w-full group relative p-4 rounded-xl bg-[#2c313a] border border-[#3d434d] hover:border-[#4a5058] hover:bg-[#323842] transition-all text-left"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-9 h-9 rounded-lg bg-[#262b33] flex items-center justify-center shrink-0 ring-1 ring-[#3d434d]">
                                          <item.icon
                                            size={16}
                                            className="text-[#c8d0d8]"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-sm text-[#f0f2f5] truncate">
                                              {item.text}
                                            </span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3d434d] text-[#c8d0d8] shrink-0 font-medium">
                                              {item.tag}
                                            </span>
                                          </div>
                                          <p className="text-sm text-[#b0b8c0] mt-0.5 truncate">
                                            {item.desc}
                                          </p>
                                        </div>
                                      </div>
                                      <ChevronRight
                                        size={14}
                                        className="text-[#6a727a] group-hover:text-[#c8d0d8] ml-2 shrink-0"
                                      />
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Thinking State */}
                {isThinking && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#2c313a] flex items-center justify-center shrink-0 mt-0.5 ring-1 ring-[#3d434d]">
                      <Bot size={14} className="text-[#c8d0d8]" />
                    </div>
                    <div className="bg-[#2c313a] rounded-2xl rounded-tl-sm px-5 py-3.5 border border-[#3d434d]">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#a8b0b8] animate-pulse" />
                          <div
                            className="w-1.5 h-1.5 rounded-full bg-[#a8b0b8] animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-1.5 h-1.5 rounded-full bg-[#a8b0b8] animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                        <span className="text-xs text-[#a8b0b8] font-medium">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-[#3d434d] px-6 py-4 bg-[#22272f]">
                <form onSubmit={handleSubmit} className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full bg-[#2c313a] text-[#f0f2f5] placeholder-[#7a828a] rounded-2xl pl-5 pr-12 py-3.5 outline-none border border-[#3d434d] focus:border-[#4a5058] focus:bg-[#323842] transition-all text-sm ring-1 ring-transparent focus:ring-[#4a5058]/40"
                  />
                  <button
                    type="submit"
                    disabled={!query.trim() || isThinking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#c8d0d8] hover:bg-[#dce0e5] disabled:bg-[#3d434d] disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-sm"
                  >
                    <ArrowUp size={14} className="text-[#1a1e24] font-bold" />
                  </button>
                </form>
              </div>
            </div>

            {/* Side Panel */}
            <div className="hidden lg:block w-80 border-l border-[#3d434d] bg-[#252a32]/60 p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#a8b0b8]">
                <Lightbulb size={14} />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Quick Tips
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#2c313a] border border-[#3d434d]">
                  <p className="text-sm text-[#d0d8e0] leading-relaxed">
                    Try asking about specific skills or technologies to get
                    detailed information.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#2c313a] border border-[#3d434d]">
                  <p className="text-sm text-[#d0d8e0] leading-relaxed">
                    You can browse by category using the buttons above or ask
                    naturally.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3d434d]">
                <h4 className="text-xs font-semibold text-[#a8b0b8] mb-3 uppercase tracking-wider">
                  Popular Topics
                </h4>
                <div className="space-y-2">
                  {["React", "TypeScript", "Node.js", "AWS", "Docker"].map(
                    (topic) => (
                      <button
                        key={topic}
                        onClick={() =>
                          handleSuggestionClick(`Tell me about ${topic}`)
                        }
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#363c46] text-sm text-[#c8d0d8] hover:text-[#f0f2f5] transition-colors font-medium"
                      >
                        {topic}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;
