import React from 'react';
import { Loader } from 'lucide-react';
import { Message } from './Message';

export function ChatMessages({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
            <Loader className="w-5 h-5 animate-spin text-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
}