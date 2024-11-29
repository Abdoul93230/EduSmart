import React from 'react';
import { Send, FileText, Mic, Video, Plus, Minus } from 'lucide-react';
import { FileUpload } from './FileUpload';

export function ChatInput({ 
  inputText, 
  onInputChange, 
  onSendMessage, 
  loading,
  showUpload,
  setShowUpload,
  onFileSelect 
}) {
  return (
    <div className="p-4 border-t">
      {showUpload && (
        <div className="mb-4">
          <FileUpload onFileSelect={onFileSelect} />
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {showUpload ? <Minus size={20} /> : <Plus size={20} />}
        </button>
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
  );
}