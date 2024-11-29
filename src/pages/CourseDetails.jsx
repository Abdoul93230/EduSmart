import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, FileText, BookOpen, Clock, Star, Users } from 'lucide-react';
import ReactPlayer from 'react-player';

function CourseDetails() {
  const { id } = useParams();

  // This would normally come from an API
  const course = {
    id: parseInt(id),
    title: 'Basic Mathematics',
    description: 'Learn fundamental mathematics concepts in Hausa language. This course covers basic arithmetic, algebra, and geometry.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    instructor: 'Dr. Amina Hassan',
    duration: '6 weeks',
    rating: 4.8,
    students: 1234,
    modules: [
      {
        title: 'Introduction to Numbers',
        lessons: [
          { title: 'Understanding Numbers in Hausa', duration: '10:00', type: 'video' },
          { title: 'Counting Practice', duration: '15:00', type: 'exercise' },
          { title: 'Number Systems', duration: '12:00', type: 'video' }
        ]
      },
      {
        title: 'Basic Operations',
        lessons: [
          { title: 'Addition and Subtraction', duration: '20:00', type: 'video' },
          { title: 'Multiplication Tables', duration: '25:00', type: 'exercise' },
          { title: 'Division Concepts', duration: '18:00', type: 'video' }
        ]
      }
    ]
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="relative h-64">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>{course.students} students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt={course.instructor}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">Instructor</h3>
              <p className="text-gray-600">{course.instructor}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-8">{course.description}</p>

          <div className="space-y-6">
            {course.modules.map((module, moduleIndex) => (
              <motion.div
                key={moduleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: moduleIndex * 0.1 }}
                className="border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3 font-medium">
                  {module.title}
                </div>
                <div className="divide-y">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.type === 'video' ? (
                          <Play size={20} className="text-blue-600" />
                        ) : (
                          <FileText size={20} className="text-green-600" />
                        )}
                        <span>{lesson.title}</span>
                      </div>
                      <span className="text-gray-500">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Preview Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Course Preview</h2>
        <div className="aspect-w-16 aspect-h-9">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            width="100%"
            height="400px"
            controls
          />
        </div>
      </motion.div>
    </div>
  );
}

export default CourseDetails;