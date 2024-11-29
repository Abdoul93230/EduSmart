import React from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Basic Mathematics',
    description: 'Learn fundamental mathematics concepts in Hausa',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    category: 'Mathematics',
    level: 'Beginner',
    duration: '6 weeks',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Introduction to Science',
    description: 'Discover basic scientific principles and concepts',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
    category: 'Science',
    level: 'Beginner',
    duration: '8 weeks',
    rating: 4.7
  },
  {
    id: 3,
    title: 'History of Nigeria',
    description: 'Learn about Nigerian history and cultural heritage',
    image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd',
    category: 'History',
    level: 'Intermediate',
    duration: '10 weeks',
    rating: 4.9
  },
  // Add more courses here
];

function Courses() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Courses</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-600">{course.category}</span>
                <span className="text-sm text-gray-500">{course.level}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star size={16} className="mr-1" />
                  <span>{course.rating}</span>
                </div>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="block text-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Course
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Courses;