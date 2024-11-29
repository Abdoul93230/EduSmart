import { useState } from 'react';
import { translateText } from '../services/api';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'bot';
  translation?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const translation = await translateText(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: translation.original_text,
        translation: translation.haoussa_text,
        type: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error while translating. Please try again.',
        type: 'bot'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    inputText,
    loading,
    setInputText,
    sendMessage
  };
}