import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { ChefHat } from 'lucide-react';

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100 selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                MenuMatrix AI
              </span>
            </div>
            {analysisData && (
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400">
                Analysis Mode
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {!analysisData ? (
          <FileUpload onDataReceived={setAnalysisData} />
        ) : (
          <Dashboard
            analysisResult={analysisData}
            onReset={() => setAnalysisData(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
