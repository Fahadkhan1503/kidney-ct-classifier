import { useState, useEffect, version } from "react";
import { useNavigate } from 'react-router-dom'
import {
  Hospital,
  Camera,
  Search,
  Loader,
  AlertCircle,
  Microscope,
  BarChart3,
} from "lucide-react";
import "./App.css";

const API_URL = "http://localhost:8000";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      if (response.ok) {
        const data = await response.json();
        setApiStatus(data);
      }
    } catch (err) {
      console.error("API connection failed:", err);
    }
  };
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getClassColor = (className) => {
    const colors = {
      Cyst:   "from-sky-700 to-sky-500",
      Normal: "from-emerald-800 to-emerald-600",
      Stone:  "from-stone-600 to-stone-400",
      Tumor:  "from-rose-900 to-rose-700",
      // Cyst: "from-blue-500 to-cyan-500",
      // Normal: "from-emerald-500 to-teal-500",
      // Stone: "from-amber-500 to-orange-500",
      // Tumor: "from-red-500 to-pink-500",
    };
    return colors[className] || "from-slate-500 to-gray-500";
  };

  const getClassBgColor = (className) => {
    const colors = {
      Cyst: "bg-blue-50 border-blue-200",
      Normal: "bg-emerald-50 border-emerald-200",
      Stone: "bg-amber-50 border-amber-200",
      Tumor: "bg-red-50 border-red-500",
    };
    return colors[className] || "bg-slate-50 border-slate-200";
  };
return (
    <div className="min-h-screen w-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-linear-to-r from-slate-900 to-slate-800 border-b border-slate-700 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
              <Hospital className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">KIDNEY SCAN AI</h1>
              <p className="text-xs md:text-sm text-slate-400">Advanced CT Classification System</p>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm flex items-center gap-2 bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white transition-all duration-200"
            >
              <span>←</span>
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm flex items-center gap-2 ${
              apiStatus
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                : "bg-red-500/20 text-red-300 border border-red-500/50"
            }`}>
              <span className={`w-2 h-2 rounded-full shrink-0 ${apiStatus ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`}></span>
              <span className="hidden sm:inline">{apiStatus ? "API ONLINE" : "API OFFLINE"}</span>
              <span className="sm:hidden">{apiStatus ? "ON" : "OFF"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 overflow-auto md:overflow-hidden">

        {/* Left Panel - Upload */}
        <div className="w-full md:w-1/3 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-linear-to-r from-sky-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Upload Scan</h2>
            <p className="text-sm text-sky-100">CT Image Analysis</p>
          </div>

          <div className="flex-1 p-6 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              {/* Upload Zone */}
              <label
                htmlFor="fileInput"
                className="border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-sky-500 hover:bg-sky-500/5 transition-all duration-300 flex flex-row justify-start items-center gap-3 group px-4 py-3"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  disabled={loading}
                />
                {!preview && <Camera className="w-8 h-8 text-sky-400 shrink-0" />}
                <div className="overflow-hidden">
                  <p className="text-slate-300 font-semibold text-sm truncate">
                    {file ? file.name : "Drop image here"}
                  </p>
                  {!file && <p className="text-xs text-slate-500">or click to browse</p>}
                </div>
              </label>

              {/* Preview */}
              {preview && (
                <div className="rounded-xl overflow-hidden border border-slate-600 bg-black flex items-center justify-center">
                  <img src={preview} alt="Preview" className="w-full object-contain max-h-52 md:max-h-64" />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Analyze Button */}
              <button
                type="submit"
                disabled={!file || loading || !apiStatus}
                className="w-full bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze
                  </>
                )}
              </button>

              {/* Clear Button */}
              <button
                type="button"
                disabled={!file}
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                  setPrediction(null)
                  setError(null)
                  document.getElementById('fileInput').value = ''
                }}
                className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-600 text-slate-300 hover:text-white font-semibold py-3 rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
              >
                <span>✕</span> Clear
              </button>

            </form>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 md:overflow-hidden">

          {prediction ? (
            <div className="flex-1 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col">
              <div className={`bg-linear-to-r ${getClassColor(prediction.predicted_class)} px-6 py-4`}>
                <h2 className="text-2xl font-bold text-white">DIAGNOSIS</h2>
                <p className="text-sm text-white/80">AI Classification Result</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {/* Main Result */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Predicted Condition</p>
                  <div className={`bg-linear-to-br ${getClassColor(prediction.predicted_class)} p-5 md:p-6 rounded-xl text-white shadow-lg`}>
                    <p className="text-4xl md:text-5xl font-black mb-4">{prediction.predicted_class}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>CONFIDENCE SCORE</span>
                        <span className="font-bold">{prediction.confidence}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-white h-3 rounded-full transition-all duration-700"
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Probability Distribution */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Classification Breakdown</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(prediction.all_probabilities).map(([className, probability]) => (
                      <div key={className} className={`${getClassBgColor(className)} border rounded-lg p-3 md:p-4`}>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">{className}</p>
                        <div className="space-y-2">
                          <p className="text-xl md:text-2xl font-black text-slate-900">{probability}%</p>
                          <div className="w-full bg-slate-300 rounded-full h-2 overflow-hidden">
                            <div
                              className={`bg-linear-to-r ${getClassColor(className)} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${probability}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reference Guide */}
                <div className="bg-slate-800 rounded-lg p-4 space-y-3 border border-slate-700">
                  <p className="text-base md:text-xl font-semibold text-slate-400 uppercase tracking-wider">Condition Reference</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300">
                    <div className="flex gap-2"><span className="text-blue-400">●</span><span><strong>Cyst:</strong> Benign fluid-filled sac</span></div>
                    <div className="flex gap-2"><span className="text-emerald-400">●</span><span><strong>Normal:</strong> Healthy kidney tissue</span></div>
                    <div className="flex gap-2"><span className="text-amber-400">●</span><span><strong>Stone:</strong> Calcified deposit formation</span></div>
                    <div className="flex gap-2"><span className="text-red-400">●</span><span><strong>Tumor:</strong> Malignant tissue growth</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-48 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 border-dashed flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 md:w-24 md:h-24 text-slate-600 mb-4 mx-auto" />
                <p className="text-lg md:text-xl font-bold text-slate-400">Ready for Analysis</p>
                <p className="text-sm text-slate-500 mt-2">Upload a CT scan to begin</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 px-4 py-3 text-xs text-slate-400 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Microscope className="w-4 h-4 shrink-0" />
              <p className="truncate hidden sm:block">Powered by TensorFlow | Model: VGG16 Transfer Learning | Input: 128×128 RGB</p>
              <p className="truncate sm:hidden">VGG16 | TensorFlow</p>
            </div>
            <p className="text-slate-300 font-semibold whitespace-nowrap">Muhammad Fahad</p>
          </div>

        </div>
      </div>
    </div>
  );
  
}

export default App;
