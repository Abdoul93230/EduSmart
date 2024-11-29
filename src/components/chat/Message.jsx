import React from 'react';
import { motion } from 'framer-motion';

export function Message({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
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
        {message.fileUrl && (
          <div className="mt-2">
            {message.fileType === 'audio' && (
              <audio controls className="w-full">
                <source src={message.fileUrl} type="audio/wav" />
              </audio>
            )}
            {message.fileType === 'video' && (
              <video controls className="w-full max-h-48 object-cover">
                <source src={message.fileUrl} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}