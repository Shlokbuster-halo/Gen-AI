import React, { useState } from 'react';
import { Clapperboard, Scissors, Wand2 } from 'lucide-react';
import { VideoUpload } from './components/VideoUpload';
import { UserForm } from './components/UserForm';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const [step, setStep] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);

  const handleVideoProcessed = () => {
    setStep(1);
  };

  const handleUserFormSubmit = async () => {
    setStep(2);
    for (let i = 1; i <= 3; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setStep(3);
  };

  const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:3000/upload', {  // Updated URL
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message || result.error);
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
    handleVideoProcessed();
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <ParticleBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-3 bg-blue-900/30 rounded-2xl p-6 mb-4">
              <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              <Scissors className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-pulse" />
              <Wand2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Smart Trailer Generator
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Transform your videos into captivating trailers using AI-powered scene analysis
            </p>
          </div>
          <div className="mt-12">
            <div className="max-w-4xl mx-auto">
              {step === 0 && (
                <div className="glass-effect rounded-2xl p-8 shadow-xl">
                  <input type="file" accept="video/*" onChange={(e) => uploadVideo(e.target.files[0])} />
                </div>
              )}
              {step === 1 && (
                <div className="glass-effect rounded-2xl p-8 shadow-xl space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Video successfully uploaded!
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Please provide some information to personalize your trailer
                    </p>
                  </div>
                  <UserForm onSubmit={handleUserFormSubmit} />
                </div>
              )}
              {step === 2 && (
                <div className="glass-effect rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-8 text-center">
                    Generating your trailer
                  </h2>
                  <ProcessingStatus currentStep={processingStep} />
                </div>
              )}
              {step === 3 && (
                <div className="glass-effect rounded-2xl p-8 shadow-xl text-center space-y-6">
                  <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-900/50 mb-4">
                    <Wand2 className="w-12 h-12 text-green-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Your trailer is ready!
                  </h2>
                  <p className="text-gray-300">
                    We've created a personalized trailer based on your preferences
                  </p>
                  <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5">
                    Download Trailer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

