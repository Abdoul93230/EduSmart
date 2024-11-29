import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'bot';
  translation?: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  inputText: string;
  loading: boolean;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
}

export function ChatWindow({ 
  isOpen, 
  messages, 
  inputText, 
  loading,
  onInputChange,
  onSendMessage 
}: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          <div className="flex flex-col h-full">
            <div className="bg-blue-600 text-white p-4">
              <h2 className="text-xl font-semibold">Hausa Translator</h2>
              <p className="text-sm opacity-80">Ask me to translate anything to Hausa</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.translation && (
                      <p className="mt-2 pt-2 border-t border-gray-200/20 text-sm">
                        {message.translation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                    <Loader className="w-5 h-5 animate-spin text-blue-600" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => onInputChange(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                />
                <button
                  onClick={onSendMessage}
                  disabled={!inputText.trim() || loading}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}