import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Video, Headphones, Download } from 'lucide-react';

const resources = [
  {
    title: 'Mathematics Fundamentals',
    type: 'pdf',
    size: '2.5 MB',
    language: 'Hausa',
    downloads: 1234
  },
  {
    title: 'Introduction to Biology',
    type: 'video',
    duration: '45:00',
    language: 'Hausa',
    views: 5678
  },
  {
    title: 'History Audio Lecture',
    type: 'audio',
    duration: '30:00',
    language: 'Hausa',
    listens: 3456
  }
  // Add more resources
];

function Library() {
  const getIcon = (type) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'video':
        return Video;
      case 'audio':
        return Headphones;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Resource Library</h1>
        <div className="flex space-x-4">
          <select className="border rounded-lg px-4 py-2">
            <option>All Types</option>
            <option>PDF</option>
            <option>Video</option>
            <option>Audio</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>History</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const Icon = getIcon(resource.type);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-500">
                      {resource.type.toUpperCase()} • {resource.language}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{resource.size || resource.duration}</span>
                <div className="flex items-center space-x-1">
                  <Download size={16} />
                  <span>
                    {resource.downloads || resource.views || resource.listens}
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Download
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Library;