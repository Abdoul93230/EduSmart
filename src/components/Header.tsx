import React from 'react';
import { Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-4">
        <Languages className="h-12 w-12 text-blue-500 mr-4" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Hausa Translation Tool
        </h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Transform your content into Hausa with our advanced translation tool. 
        Support for text, PDF, audio, and video files with instant audio output.
      </p>
    </motion.div>
  );
}