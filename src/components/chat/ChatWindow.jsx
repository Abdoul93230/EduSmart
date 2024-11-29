import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export function ChatWindow({ 
  isOpen, 
  messages, 
  inputText, 
  loading,
  onInputChange,
  onSendMessage,
  onFileSelect
}) {
  const [showUpload, setShowUpload] = useState(false);

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
            <ChatHeader />
            <ChatMessages messages={messages} loading={loading} />
            <ChatInput
              inputText={inputText}
              onInputChange={onInputChange}
              onSendMessage={onSendMessage}
              loading={loading}
              showUpload={showUpload}
              setShowUpload={setShowUpload}
              onFileSelect={onFileSelect}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}