import { useState } from 'react';
import { translateText, extractTextFromFile, transcribeAudio } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setLoading(true);
    try {
      let text = '';
      const fileType = file.type.split('/')[0];
      
      if (file.type === 'application/pdf') {
        text = await extractTextFromFile(file);
      } else if (fileType === 'audio' || fileType === 'video') {
        const result = await transcribeAudio(file);
        text = result.text;
      }

      const translation = await translateText(text);
      
      const userMessage = {
        id: Date.now().toString(),
        text: `Uploaded ${file.name}`,
        type: 'user',
        fileUrl: URL.createObjectURL(file),
        fileType
      };

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: translation.original_text,
        translation: translation.haoussa_text,
        type: 'bot'
      };

      setMessages(prev => [...prev, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error while processing your file. Please try again.',
        type: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const translation = await translateText(inputText);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: translation.original_text,
        translation: translation.haoussa_text,
        type: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
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
    sendMessage,
    handleFileUpload
  };
}