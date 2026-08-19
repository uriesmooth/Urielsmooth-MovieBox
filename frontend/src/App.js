import React, { useState } from 'react';

export default function App() {
  const [url, setUrl] = useState('');
  const [action, setAction] = useState('download');
  const [format, setFormat] = useState('mp4');
  const [startTime, setStartTime] = useState('0');
  const [duration, setDuration] = useState('10');
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const handleProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultUrl(null);

    try {
      const response = await fetch('http://localhost:5000/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, action, format, startTime, duration })
      });
      const data = await response.json();
      if (data.success) {
        setResultUrl(`http://localhost:5000${data.downloadUrl}`);
      } else {
        alert(data.error || 'Processing failed');
      }
    } catch (err) {
      console.log(err);
      alert('Network error connecting to backend service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Smooth-Moviebox
        </h1>
        <p className="text-slate-400 text-center mb-6 text-sm">
          GPU-Accelerated Media Download & Conversion Pipeline
        </p>

        <form onSubmit={handleProcess} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Media URL</label>
            <input 
              type="url" 
              required
              placeholder="https://www.youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Toolkit Action</label>
              <select 
                value={action} 
                onChange={(e) => setAction(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="download">Download & Merge</option>
                <option value="trim">GPU Trim Segment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Target Format</label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="mp4">MP4</option>
                <option value="webm">WEBM</option>
                <option value="mkv">MKV</option>
                <option value="mp3">MP3 (Audio)</option>
              </select>
            </div>
          </div>

          {action === 'trim' && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Start Time (sec)</label>
                <input 
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Duration (sec)</label>
                <input 
                  type="number"
                  value={duration}
                  onChange={(e) => setType => setDuration(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-lg font-medium text-sm shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? 'Processing on GPU Engine...' : 'Run GPU Task'}
          </button>
        </form>

        {resultUrl && (
          <div className="mt-6 p-4 bg-slate-950 border border-indigo-500/40 rounded-lg text-center">
            <p className="text-sm text-indigo-400 mb-2">Render Complete!</p>
            <a 
              href={resultUrl} 
              download 
              className="inline-block px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Download Processed File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
