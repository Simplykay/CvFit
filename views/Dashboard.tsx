import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import ScoreGauge from '../components/ScoreGauge';
import { Icons, INITIAL_JD_PLACEHOLDER, INITIAL_RESUME_PLACEHOLDER } from '../constants';
import { analyzeResume } from '../services/geminiService';
import { getHistory, saveScan, clearHistory } from '../services/storageService';
import { AnalysisState, HistoryItem } from '../types';

const Dashboard: React.FC = () => {
  const [resumeText, setResumeText] = useState(INITIAL_RESUME_PLACEHOLDER);
  const [jdText, setJdText] = useState(INITIAL_JD_PLACEHOLDER);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null,
  });

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jdText.trim()) return;

    setAnalysis({ isLoading: true, result: null, error: null });
    try {
      const result = await analyzeResume(resumeText, jdText);
      setAnalysis({ isLoading: false, result, error: null });
      
      const updatedHistory = saveScan(resumeText, jdText, result);
      setHistory(updatedHistory);
    } catch (err: any) {
      setAnalysis({ 
        isLoading: false, 
        result: null, 
        error: err.message || "Something went wrong during analysis." 
      });
    }
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setResumeText(item.resumeText);
    setJdText(item.jdText);
    setAnalysis({
      isLoading: false,
      result: item.result,
      error: null
    });
    // Scroll to results on mobile/desktop
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
      clearHistory();
      setHistory([]);
  };

  return (
    <div className="min-h-screen bg-midnight text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-midnight/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-action"><Icons.Sparkles /></div>
            <span className="font-heading font-bold text-xl tracking-wide">MatchlyPro</span>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-sm text-gray-400">Credits: 3 Free</span>
             <div className="h-8 w-8 rounded-full bg-surfaceLight flex items-center justify-center text-xs font-bold border border-gray-700">JD</div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Resume Input */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading">Resume Content</h2>
              <button className="text-xs text-action hover:text-actionHover font-medium flex items-center gap-1">
                <Icons.Upload /> Upload PDF
              </button>
            </div>
            <textarea
              className="w-full h-64 bg-midnight border border-gray-700 rounded-lg p-4 text-sm text-gray-300 focus:ring-2 focus:ring-action focus:border-transparent outline-none resize-none font-mono"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2 text-right">Supported: Plain Text (Paste), PDF (Parsing simulated)</p>
          </div>

          {/* JD Input */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 shadow-xl">
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold font-heading">Job Description</h2>
              <span className="px-2 py-1 rounded bg-action/10 text-action text-xs font-bold">Target Role</span>
            </div>
            <textarea
              className="w-full h-48 bg-midnight border border-gray-700 rounded-lg p-4 text-sm text-gray-300 focus:ring-2 focus:ring-action focus:border-transparent outline-none resize-none font-mono"
              placeholder="Paste the Job Description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            isLoading={analysis.isLoading}
            className="w-full py-4 text-lg shadow-lg shadow-action/20"
          >
            {analysis.result ? 'Re-Analyze Match' : 'Analyze Match'}
          </Button>

          {analysis.error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              Error: {analysis.error}
            </div>
          )}

          {/* Recent Scans History */}
          {history.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold font-heading flex items-center gap-2 text-gray-200">
                        <Icons.Clock /> Recent Scans
                    </h3>
                    <button 
                        onClick={handleClearHistory} 
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-900/20 transition-colors"
                    >
                        <Icons.Trash /> Clear
                    </button>
                </div>
                <div className="space-y-3">
                    {history.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => loadHistoryItem(item)}
                            className="bg-surface p-4 rounded-lg border border-gray-800 hover:border-action/50 cursor-pointer transition-all group shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 mr-4">
                                    <p className="text-xs text-gray-500 mb-1">{new Date(item.timestamp).toLocaleDateString()} &bull; {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                    <p className="text-sm font-medium text-gray-200 truncate">{item.jdText.slice(0, 40)}{item.jdText.length > 40 ? '...' : ''}</p>
                                </div>
                                <div className={`text-xs font-bold px-2 py-1 rounded-md border ${item.result.matchScore >= 80 ? 'bg-green-500/10 text-green-400 border-green-500/20' : item.result.matchScore < 50 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-action/10 text-action border-action/20'}`}>
                                    {item.result.matchScore}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )}
        </div>

        {/* Right Column: Analysis Results */}
        <div className="lg:col-span-7">
          {!analysis.result && !analysis.isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl bg-surface/50 min-h-[500px]">
              <div className="w-16 h-16 text-gray-700 mb-4"><Icons.Sparkles /></div>
              <p className="text-lg font-medium">Ready to Optimize</p>
              <p className="text-sm">Paste your info and hit Analyze</p>
            </div>
          )}

          {analysis.isLoading && (
             <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action"></div>
                <p className="text-gray-400 animate-pulse">Analyzing Keywords & Formatting...</p>
             </div>
          )}

          {analysis.result && (
            <div className="space-y-6 animate-fade-in pb-10">
              
              {/* Top Row: Score & Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Score Card */}
                <div className="bg-surface rounded-xl p-6 border border-gray-800 shadow-lg flex flex-col items-center justify-center">
                   <h3 className="w-full text-left text-sm uppercase tracking-wider text-gray-400 mb-2 font-bold">ATS Match Score</h3>
                   <ScoreGauge score={analysis.result.matchScore} />
                   <p className="text-center text-sm text-gray-400 mt-2 px-4">{analysis.result.summary}</p>
                </div>

                {/* Missing Keywords */}
                <div className="bg-surface rounded-xl p-6 border border-gray-800 shadow-lg">
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4 font-bold">Missing Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.result.missingKeywords.length > 0 ? (
                        analysis.result.missingKeywords.map((kw, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                {kw}
                            </span>
                        ))
                    ) : (
                        <span className="text-green-400 text-sm flex items-center gap-2">
                            <Icons.Check /> No major keywords missing!
                        </span>
                    )}
                  </div>
                  
                  <h3 className="text-sm uppercase tracking-wider text-gray-400 mt-6 mb-4 font-bold">ATS Formatting</h3>
                  <ul className="space-y-2">
                     {analysis.result.atsCompatibilityCheck.length > 0 ? (
                        analysis.result.atsCompatibilityCheck.map((issue, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                <span className="mt-0.5"><Icons.Alert /></span>
                                {issue}
                            </li>
                        ))
                     ) : (
                        <li className="flex items-center gap-2 text-xs text-green-400">
                             <Icons.Check /> Document formatting looks clean.
                        </li>
                     )}
                  </ul>
                </div>
              </div>

              {/* Optimization Recommendations */}
              <div className="bg-surface rounded-xl p-6 border border-gray-800 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold font-heading text-white">X-Y-Z Bullet Point Optimization</h3>
                     <span className="text-xs text-action bg-action/10 px-2 py-1 rounded border border-action/20">High Impact Changes</span>
                </div>

                <div className="space-y-6">
                  {analysis.result.contentOptimization.map((opt, idx) => (
                    <div key={idx} className="bg-midnight rounded-lg p-4 border border-gray-700">
                      <div className="mb-3">
                        <span className="text-xs uppercase text-gray-500 font-bold mb-1 block">Original</span>
                        <p className="text-sm text-red-300/80 line-through decoration-red-500/50">{opt.original}</p>
                      </div>
                      <div className="mb-3 relative">
                         <div className="absolute -left-2 top-0 bottom-0 w-1 bg-action rounded-full"></div>
                         <div className="pl-4">
                            <span className="text-xs uppercase text-action font-bold mb-1 block flex items-center gap-1">
                                <Icons.Sparkles /> Optimized
                            </span>
                            <p className="text-sm text-white font-medium leading-relaxed">{opt.improved}</p>
                         </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-800">
                         <p className="text-xs text-gray-400 italic">
                           <span className="font-bold text-gray-500">Why:</span> {opt.reasoning}
                         </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;