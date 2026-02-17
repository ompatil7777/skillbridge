import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import UploadZone from './components/UploadZone.jsx';
import JobInput from './components/JobInput.jsx';
import ResultsDashboard from './components/ResultsDashboard.jsx';

function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysis, setAnalysis] = useState<any>(null);
  const [resumePreview, setResumePreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and provide a job description');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription);

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, get the text to see the actual error
        const text = await response.text();
        throw new Error(`Server error: ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setAnalysis(data.analysis);
      setResumePreview(data.resumeText);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResumeFile(null);
    setJobDescription('');
    setAnalysis(null);
    setError(null);
    setResumePreview('');
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1729] to-[#0a0f1e]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">AI-Powered Career Analysis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            SkillBridge
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Know the Gap. Bridge It Fast.
          </p>
        </div>

        {!analysis ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <UploadZone onFileSelect={setResumeFile} selectedFile={resumeFile} />
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <JobInput value={jobDescription} onChange={setJobDescription} />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !resumeFile || !jobDescription.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing with AI...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Analyze My Resume
                </span>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Your Analysis</h2>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all border border-gray-700"
              >
                Analyze Another
              </button>
            </div>

            {resumePreview && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full px-6 py-4 flex items-center justify-between text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                >
                  <span className="font-medium">Resume Preview</span>
                  {showPreview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {showPreview && (
                  <div className="px-6 py-4 border-t border-gray-800">
                    <pre className="text-sm text-gray-400 whitespace-pre-wrap font-mono">
                      {resumePreview}...
                    </pre>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <ResultsDashboard analysis={analysis} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
