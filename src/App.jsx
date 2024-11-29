import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Library from './pages/Library';
import { ChatButton } from './components/chat/ChatButton';
import { ChatWindow } from './components/chat/ChatWindow';
import { useChat } from './hooks/useChat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, inputText, loading, setInputText, sendMessage, handleFileUpload } = useChat();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 py-8 flex-grow"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        
        <ChatButton 
          isOpen={isChatOpen} 
          onClick={() => setIsChatOpen(!isChatOpen)} 
        />
        <ChatWindow 
          isOpen={isChatOpen}
          messages={messages}
          inputText={inputText}
          loading={loading}
          onInputChange={setInputText}
          onSendMessage={sendMessage}
          onFileSelect={handleFileUpload}
        />
      </div>
    </Router>
  );
}

export default App;