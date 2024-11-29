import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About HausaLearn</h3>
            <p className="text-gray-600">
              Empowering education through local language learning, making knowledge accessible to everyone in Hausa.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">Courses</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Translation Tool</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Resources</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">Mathematics</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Science</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">History</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@hausalearn.com</li>
              <li>Phone: +234 123 456 789</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for education
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;