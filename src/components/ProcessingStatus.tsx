import React from 'react';
import { CheckCircle, Clock, Film } from 'lucide-react';

type Step = {
  id: number;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
};

export function ProcessingStatus({ currentStep }: { currentStep: number }) {
  const steps: Step[] = [
    {
      id: 1,
      name: 'Frame Extraction',
      description: 'Converting video into individual frames',
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming',
    },
    {
      id: 2,
      name: 'Scene Analysis',
      description: 'AI categorizing scenes by content type',
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming',
    },
    {
      id: 3,
      name: 'Trailer Generation',
      description: 'Creating personalized trailer',
      status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="relative">
            {step.id !== steps.length && (
              <div
                className={`absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 transition-colors duration-500
                  ${step.status === 'completed' ? 'bg-blue-400' : 'bg-gray-700'}`}
                aria-hidden="true"
              />
            )}
            
            <div className="relative flex items-start group">
              <span className="h-9 flex items-center transform transition-transform duration-300 group-hover:scale-110">
                {step.status === 'completed' ? (
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                ) : step.status === 'current' ? (
                  <Clock className="h-8 w-8 text-blue-400 animate-pulse" />
                ) : (
                  <Film className="h-8 w-8 text-gray-600" />
                )}
              </span>
              <div className="ml-4 min-w-0 flex flex-col">
                <span className={`text-sm font-medium ${
                  step.status === 'completed' ? 'text-blue-400' :
                  step.status === 'current' ? 'text-blue-400' :
                  'text-gray-500'
                }`}>
                  {step.name}
                </span>
                <span className="text-sm text-gray-500">{step.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}