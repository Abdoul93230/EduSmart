import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Languages, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Courses',
      description: 'Learn various subjects in Hausa through our interactive courses'
    },
    {
      icon: Languages,
      title: 'Translation Tools',
      description: 'Translate content between English and Hausa instantly'
    },
    {
      icon: Video,
      title: 'Video Lessons',
      description: 'Watch educational videos with Hausa translations'
    },
    {
      icon: FileText,
      title: 'Study Materials',
      description: 'Access PDF materials and resources in Hausa'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"
        >
          Learn in Your Language
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Access quality education in Hausa language. Our platform makes learning accessible and enjoyable for everyone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/courses"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link
            to="/translation"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Try Translation
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <Icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured Courses */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Basic Mathematics',
              image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
              category: 'Mathematics',
              level: 'Beginner'
            },
            {
              title: 'Introduction to Science',
              image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
              category: 'Science',
              level: 'Beginner'
            },
            {
              title: 'History of Nigeria',
              image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd',
              category: 'History',
              level: 'Intermediate'
            }
          ].map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-blue-600">{course.category}</span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
                <Link
                  to={`/courses/${index + 1}`}
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;