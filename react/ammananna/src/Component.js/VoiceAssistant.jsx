import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMic, FiMicOff } from 'react-icons/fi';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript.toLowerCase();
        setTranscript(transcriptText);

        // Only process final results
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command) => {
    console.log('Voice command:', command);

    // Navigation commands
    if (command.includes('home') || command.includes('homepage') || command.includes('go home')) {
      speak('Opening home page');
      navigate('/');
    } else if (command.includes('collection') || command.includes('product') || command.includes('products') || command.includes('shop')) {
      speak('Opening products page');
      navigate('/collection');
    } else if (command.includes('cart') || command.includes('shopping cart') || command.includes('my cart')) {
      speak('Opening cart');
      navigate('/cart');
    } else if (command.includes('my order') || command.includes('my orders')) {
      speak('Opening my orders');
      navigate('/my-orders');
    } else if (command.includes('order history') || command.includes('all orders') || command.includes('order all')) {
      speak('Opening order history');
      navigate('/order-all');
    } else if (command.includes('checkout') || command.includes('check out')) {
      speak('Opening checkout');
      navigate('/checkout');
    } else if (command.includes('about') || command.includes('about us')) {
      speak('Opening about page');
      navigate('/about');
    } else if (command.includes('contact') || command.includes('contact us') || command.includes('cantact')) {
      speak('Opening contact page');
      navigate('/cantact');
    } else if (command.includes('login') || command.includes('sign in') || command.includes('log in')) {
      speak('Opening login page');
      navigate('/login');
    } else if (command.includes('register') || command.includes('sign up') || command.includes('registration')) {
      speak('Opening registration page');
      navigate('/registration');
    } else {
      speak('Sorry, I did not understand that command. Try saying home, products, cart, or contact');
    }

    setTranscript('');
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setTranscript('');
    } else {
      recognition.start();
      setIsListening(true);
      speak('Listening for your command');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Voice Assistant Button with Image */}
      <div className="relative group">
        <button
          onClick={toggleListening}
          className={`relative overflow-hidden rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isListening
              ? 'animate-pulse ring-4 ring-red-400'
              : 'ring-2 ring-purple-300'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice assistant'}
        >
          {/* Animated gradient background */}
          <div className={`absolute inset-0 ${
            isListening 
              ? 'bg-gradient-to-br from-red-500 via-pink-500 to-red-600' 
              : 'bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700'
          }`}></div>
          
          {/* AI Assistant Icon/Image */}
          <div className="relative p-4">
            {isListening ? (
              <div className="relative">
                <FiMicOff size={28} className="text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              </div>
            ) : (
              <div className="relative">
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white"
                >
                  <path 
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
                    fill="currentColor"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  <path 
                    d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" 
                    fill="currentColor" 
                    opacity="0.5"
                  />
                </svg>
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            )}
          </div>
        </button>

        {/* "Speak what you want" text - always visible */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-sm font-semibold">🎤 Speak what you want</p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-pink-600"></div>
          </div>
        </div>
      </div>

      {/* Permanent hint text below button */}
      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
        <p className="text-xs font-medium text-purple-700">
          Speak what you want
        </p>
      </div>
      
      {/* Transcript display */}
      {transcript && (
        <div className="absolute bottom-24 right-0 bg-white p-4 rounded-2xl shadow-2xl max-w-xs border-2 border-purple-200 animate-fade-in">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-purple-600">You said:</span> 
            <span className="ml-1">{transcript}</span>
          </p>
        </div>
      )}

      {/* Listening indicator */}
      {isListening && (
        <div className="absolute bottom-24 right-0 bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl shadow-2xl border-2 border-purple-300 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-6 bg-pink-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-5 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <p className="text-sm text-purple-700 font-bold">Listening...</p>
          </div>
          <p className="text-xs text-gray-600">
            Try: "Products", "Cart", "Orders"
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
