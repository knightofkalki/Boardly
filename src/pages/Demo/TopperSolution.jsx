import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { API_URL } from '../../shared/api';

const TopperSolution = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const { subject } = useParams();
  const year = 2024;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userClass = window.location.pathname.split('/')[2];
        setLoading(true);
        const response = await axios.get(`${API_URL}/free/year-wise-questions/${userClass}/${year}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = response.data;
        const subjectData = data.data.subjects.find(s => s.subjectName.toLowerCase() === subject.toLowerCase());
        if (subjectData) {
          const mappedData = subjectData.questions.map((question) => ({
            id: question.qid,
            question: question.question,
            answer: question.answer,
            hasVideoSolution: Boolean(question.videoSolution),
            videoUrl: question.videoSolution || null,
          }));
          setQuestions(mappedData);
          if (mappedData.length > 0) {
            setExpandedId(mappedData[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subject, year]);

  const isMobile = () => {
    return window.matchMedia('(pointer: coarse)').matches;
  };

  const handleVideoClick = (videoUrl) => {
    if (isMobile()) {
      const youtubeAppUrl = videoUrl.replace('https://youtu.be/', 'vnd.youtube://');
      const youtubePlayStoreUrl = 'https://play.google.com/store/apps/details?id=com.google.android.youtube';
      const youtubeAppStoreUrl = 'https://apps.apple.com/app/youtube/id544007664';

      window.location.href = youtubeAppUrl;
      setTimeout(() => {
        if (document.hidden) {
          return;
        }
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = youtubeAppStoreUrl;
        } else if (/Android/i.test(navigator.userAgent)) {
          window.location.href = youtubePlayStoreUrl;
        }
      }, 2500);
    } else {
      setCurrentVideoUrl(videoUrl);
      setShowVideo(true);
    }
  };

  const getEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      let videoId = '';
      let timestamp = parsedUrl.searchParams.get('t') || '';

      if (parsedUrl.hostname.includes('youtu.be')) {
        videoId = parsedUrl.pathname.split('/')[1];
      } else if (parsedUrl.pathname.includes('/live/')) {
        videoId = parsedUrl.pathname.split('/live/')[1];
      } else if (parsedUrl.pathname.includes('/embed/')) {
        videoId = parsedUrl.pathname.split('/embed/')[1];
      } else if (parsedUrl.pathname.includes('/shorts/')) {
        videoId = parsedUrl.pathname.split('/shorts/')[1];
      } else {
        videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
      }

      if (!videoId) return url;

      let embedUrl = `https://www.youtube.com/embed/${videoId.split('?')[0]}`;
      
      if (timestamp) {
        embedUrl += `?start=${timestamp.split('s')[0]}`;
      }

      return embedUrl;
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return url;
    }
  };

  const renderTextWithImages = (text) => {
    if (typeof text !== 'string') return '';
    const imageUrls = text.split(',').map(url => url.trim());
    return imageUrls.map((url, index) => (
      <img key={index} src={url} alt={`Question ${index + 1}`} className="my-4 max-w-full h-auto rounded-lg" />
    ));
  };

  const VideoPopup = ({ videoUrl, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg p-4 w-full max-w-3xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-200"
        >
          Close
        </button>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getEmbedUrl(videoUrl)}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 font-sans relative">
      <div className="flex items-start gap-4 mb-8">
        <button
          onClick={() => navigate(`/subject/${subject}/pyq`)}
          className="p-2 hover:bg-gray-100 rounded-full mt-1"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} CBSE {year} PYQ
          </h1>
          <h2 className="text-xl text-gray-600 font-medium">Solutions</h2>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 mt-12 w-16 border-t-4 border-orange-500 border-opacity-75"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg">
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full text-left p-6 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Question {item.id}</h3>
                    <div className="text-gray-800">
                      {renderTextWithImages(item.question)}
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t px-6 py-4 bg-white space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Answer</h4>
                        <div className="text-gray-700">{item.answer}</div>
                      </div>
                      {item.hasVideoSolution && (
                        <button
                          onClick={() => handleVideoClick(item.videoUrl)}
                          className="flex items-center justify-center px-4 py-2 border 
                          border-[#F85B2C] rounded-md text-sm font-medium text-[#F85B2C] 
                          bg-white hover:bg-orange-50 focus:outline-none"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          Video Solution
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showVideo && (
          <VideoPopup
            videoUrl={currentVideoUrl}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopperSolution;
