import React from 'react';
import Button from '../components/Button';
import { Icons } from '../constants';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-midnight text-white px-4">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-action/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
           <div className="p-2 bg-action rounded-lg">
             <Icons.Sparkles />
           </div>
           <span className="text-xl font-bold font-heading tracking-wide">MATCHLYPRO</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight leading-tight">
          Beat the ATS. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-action to-yellow-200">
            Land the Interview.
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          High-performance AI CV optimization that tailors your resume to specific job descriptions using the X-Y-Z formula.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button onClick={onStart} className="w-full sm:w-auto text-lg px-8 py-4">
            Try Free Scan
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto">
            View Sample Report
          </Button>
        </div>

        <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
                { title: "AI Analysis", desc: "Deep semantic matching against JD requirements." },
                { title: "X-Y-Z Logic", desc: "Automated bullet point rewriting for impact." },
                { title: "ATS Check", desc: "Format validation for Greenhouse, Lever, etc." }
            ].map((item, i) => (
                <div key={i} className="p-6 bg-surface border border-gray-800 rounded-xl hover:border-action/30 transition-colors">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;