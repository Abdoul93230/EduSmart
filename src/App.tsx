import React, { useState } from 'react';
import { FileText, Mic, Type, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUpload } from './components/FileUpload';
import { TextInput } from './components/TextInput';
import { TranslationResult } from './components/TranslationResult';
import { Header } from './components/Header';
import { ExampleTranslations } from './components/ExampleTranslations';
import { translateText, generateAudio, extractTextFromFile, transcribeAudio } from './services/api';
import type { InputTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<InputTab>('text');
  const [inputText, setInputText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [audioUrl, setAudioUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleTranslation = async (text: string) => {
    try {
      setLoading(true);
      setError(undefined);

      const translation = await translateText(text);
      setOriginalText(translation.original_text);
      setTranslatedText(translation.haoussa_text);

      const audio = await generateAudio(translation.haoussa_text);
      setAudioUrl(`${audio.file_path}`);
    } catch (err) {
      setError('An error occurred during translation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setError(undefined);

      let text = '';
      if (activeTab === 'pdf') {
        text = await extractTextFromFile(file);
      } else if (activeTab === 'audio' || activeTab === 'video') {
        const result = await transcribeAudio(file);
        text = result.text;
      }

      setInputText(text);
      await handleTranslation(text);
    } catch (err) {
      setError('An error occurred while processing the file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'text' as const, icon: Type, label: 'Text' },
    { id: 'pdf' as const, icon: FileText, label: 'PDF' },
    { id: 'audio' as const, icon: Mic, label: 'Audio' },
    { id: 'video' as const, icon: Video, label: 'Video' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex flex-wrap gap-4 mb-6">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === id
                    ? 'bg-blue-500 text-white shadow-md scale-105'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'text' ? (
                <div className="space-y-4">
                  <TextInput value={inputText} onChange={setInputText} />
                  <button
                    onClick={() => handleTranslation(inputText)}
                    disabled={loading || !inputText}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                  >
                    {loading ? 'Processing...' : 'Translate to Hausa'}
                  </button>
                </div>
              ) : (
                <FileUpload
                  onFileSelect={handleFileUpload}
                  accept={
                    activeTab === 'pdf'
                      ? { 'application/pdf': ['.pdf'] }
                      : activeTab === 'video'
                      ? { 'video/*': ['.mp4', '.mov', '.avi'] }
                      : { 'audio/*': ['.mp3', '.wav', '.m4a'] }
                  }
                  title={`Upload ${activeTab.toUpperCase()} File`}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {translatedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <TranslationResult
                originalText={originalText}
                translatedText={translatedText}
                audioUrl={audioUrl}
              />
            </motion.div>
          )}
        </motion.div>

        {!translatedText && <ExampleTranslations />}
      </div>
    </div>
  );
}

export default App;
