import React from 'react';
import { Languages } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex items-center gap-2">
        <Languages className="w-6 h-6" />
        <div>
          <h2 className="text-xl font-semibold">Hausa Translator</h2>
          <p className="text-sm opacity-80">Ask me to translate anything to Hausa</p>
        </div>
      </div>
    </div>
  );
}