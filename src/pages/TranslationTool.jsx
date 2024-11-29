import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Type, Video } from 'lucide-react';
import { FileUpload } from '../components/FileUpload';
import { TextInput } from '../components/TextInput';
import { TranslationResult } from '../components/TranslationResult';
import { ExampleTranslations } from '../components/ExampleTranslations';
import { translateText, generateAudio, extractTextFromFile, transcribeAudio } from '../services/api';

function TranslationTool() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [audioUrl, setAudioUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleTranslation = async (text) => {
    try {
      setLoading(true);
      setError(undefined);

      const translation = await translateText(text);
      console.log(translation)
      setOriginalText(translation.original_text);
      setTranslatedText(translation.haoussa_text);

      const audio = await generateAudio(translation.haoussa_text);
      setAudioUrl(`http://localhost:5000/${audio.file_path}`);
      console.log(audio.file_path)
    } catch (err) {
      setError('An error occurred during translation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      setLoading(true);
      setError(undefined);

      let text = '';
      if (activeTab === 'pdf') {
        text = await extractTextFromFile(file);
      } else if (activeTab === 'audio' || activeTab === 'video') {
        console.log('oui')
        const result = await transcribeAudio(file);
        text = result.text.slice(0,2000);
      }
      // console.log(text.slice(0,2000))
      setInputText(text.slice(0,2000));
      await handleTranslation(text.slice(0,2000));
    } catch (err) {
      setError('An error occurred while processing the file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'pdf', icon: FileText, label: 'PDF' },
    { id: 'audio', icon: Mic, label: 'Audio' },
    { id: 'video', icon: Video, label: 'Video' }
  ];

  return (
    <div className="max-w-5xl mx-auto">
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
  );
}

export default TranslationTool;
