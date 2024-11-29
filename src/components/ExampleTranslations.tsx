import React from 'react';
import { motion } from 'framer-motion';

const examples = [
  {
    original: "Hello, how are you?",
    hausa: "Sannu, yaya kake/kike?",
    context: "Greeting"
  },
  {
    original: "Welcome to our community",
    hausa: "Barka da zuwa ga al'ummarmu",
    context: "Welcome"
  },
  {
    original: "Thank you very much",
    hausa: "Na gode sosai",
    context: "Gratitude"
  }
];

export function ExampleTranslations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {examples.map((example, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-sm text-blue-600 mb-2">{example.context}</div>
          <div className="mb-2">
            <div className="text-gray-600 text-sm">English:</div>
            <div className="font-medium">{example.original}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Hausa:</div>
            <div className="font-medium text-green-700">{example.hausa}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}