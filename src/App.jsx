import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Hero from './components/Hero';
import QuadrantExplainer from './components/QuadrantExplainer';
import HowItWorksModal from './components/HowItWorksModal';
import ResourcesModal from './components/ResourcesModal';
import { ChefHat } from 'lucide-react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-100 selection:bg-indigo-500/30">
      <div className="bg-mesh" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030712]/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => {
                setAnalysisData(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                MenuMatrix AI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setIsHowItWorksOpen(true)}
                className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                How it works
              </button>
              <button
                onClick={() => setIsResourcesOpen(true)}
                className="text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                Resources
              </button>
              {analysisData && (
                <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Live Analysis
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {!analysisData ? (
          <>
            <Hero />
            <div id="upload" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <FileUpload onDataReceived={setAnalysisData} />
            </div>
            <QuadrantExplainer />
          </>
        ) : (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <Dashboard
              analysisResult={analysisData}
              onReset={() => {
                setAnalysisData(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
      <ResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
      />

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-medium">
            © 2026 MenuMatrix AI. All rights reserved. Built for restaurant excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
