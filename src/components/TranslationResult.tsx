import React from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

interface TranslationResultProps {
  originalText: string;
  translatedText: string;
  audioUrl?: string;
}

export function TranslationResult({ originalText, translatedText, audioUrl }: TranslationResultProps) {
  console.log(audioUrl)
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h3 className="font-semibold text-gray-700 mb-3">Original Text:</h3>
        <p className="text-lg">{originalText}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 p-6 rounded-lg"
      >
        <h3 className="font-semibold text-gray-700 mb-3">Hausa Translation:</h3>
        <p className="text-lg font-medium text-blue-900">{translatedText}</p>
      </motion.div>

      {audioUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 p-6 rounded-lg"
        >
          <div className="flex items-center mb-3">
            <Volume2 className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-700">Hausa Audio:</h3>
          </div>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>
      )}
    </div>
  );
}
