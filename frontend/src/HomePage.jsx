import { useNavigate } from "react-router-dom";
import { Hospital, Brain, Shield, Zap, ChevronRight, Microscope, Activity, CheckCircle, Droplets, AlertTriangle, Stone } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <Hospital className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">KIDNEY SCAN AI</span>
          </div>
          <button
            onClick={() => navigate("/classifier")}
            className="bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 hover:scale-105 flex items-center gap-2"
          >
            Launch App <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">

        {/* background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-sky-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-100 h-100 rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-75 h-75 rounded-full bg-cyan-600/8 blur-3xl pointer-events-none" />

        {/* grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wider">
            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
            AI-POWERED MEDICAL IMAGING
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
            Detect Kidney
            <br />
            <span className="bg-linear-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Conditions Instantly
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Upload a kidney CT scan and get an instant AI diagnosis — identifying
            <strong className="text-slate-300"> Cysts</strong>,
            <strong className="text-slate-300"> Tumors</strong>,
            <strong className="text-slate-300"> Stones</strong>, and
            <strong className="text-slate-300"> Normal</strong> tissue with confidence scores.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/classifier")}
              className="bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/25 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Analyzing
            </button>
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              How it Works
            </button>
          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "4", label: "Conditions Detected" },
              { value: "128px", label: "Input Resolution" },
              { value: "VGG16", label: "Model Architecture" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Activity className="w-6 h-6" />,
                title: "Upload CT Scan",
                desc: "Upload any kidney CT scan image in JPG, PNG, or GIF format directly from your device.",
              },
              {
                step: "02",
                icon: <Brain className="w-6 h-6" />,
                title: "AI Analysis",
                desc: "Our VGG16 deep learning model processes the image and analyzes patterns across 128×128 pixels.",
              },
              {
                step: "03",
                icon: <Shield className="w-6 h-6" />,
                title: "Instant Result",
                desc: "Receive instant classification results with confidence scores for all four kidney conditions.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-sky-500/40 transition-all duration-300 group">
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                  {step}
                </div>
                <div className="w-12 h-12 bg-linear-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 rounded-xl flex items-center justify-center text-sky-400 mb-5">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section className="py-24 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Detection Classes</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">What We Detect</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "Cyst",
                color: "from-sky-700 to-sky-500",
                border: "border-sky-500/30",
                glow: "group-hover:shadow-sky-500/10",
                icon: <Droplets className="w-6 h-6" />,
                desc: "A fluid-filled sac that forms on or within the kidney. Usually benign and often requires monitoring rather than immediate treatment.",
              },
              {
                name: "Normal",
                color: "from-emerald-800 to-emerald-600",
                border: "border-emerald-500/30",
                glow: "group-hover:shadow-emerald-500/10",
                icon: <CheckCircle className="w-6 h-6" />,
                desc: "Healthy kidney tissue showing no signs of abnormality. Regular screening is still recommended for high-risk individuals.",
              },
              {
                name: "Stone",
                color: "from-stone-600 to-stone-400",
                border: "border-stone-500/30",
                glow: "group-hover:shadow-stone-500/10",
                icon: <Stone className="w-6 h-6" />,
                desc: "Hard mineral and salt deposits that form inside the kidney. Can cause severe pain and may require medical intervention.",
              },
              {
                name: "Tumor",
                color: "from-rose-900 to-rose-700",
                border: "border-rose-500/30",
                glow: "group-hover:shadow-rose-500/10",
                icon: <AlertTriangle className="w-6 h-6" />,
                desc: "Abnormal tissue growth in the kidney. Early detection is critical for effective treatment and improved patient outcomes.",
              },
            ].map(({ name, color, border, glow, icon, desc }) => (
              <div key={name} className={`group bg-slate-900 border ${border} rounded-2xl p-6 hover:shadow-xl ${glow} transition-all duration-300`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-xl`}>
                    {icon}
                  </div>
                  <h3 className="text-xl font-black text-white">{name}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATASET ── */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">Training Data</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">Dataset Overview</h2>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Kidney Colorized CT Dataset</h3>
                <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                  A medical imaging dataset featuring enhanced CT scans labeled across four categories, supporting research and development in kidney disease detection and classification.
                </p>
                <div className="space-y-3">
                  {[
                    "12,446 unique CT scan images",
                    "Lossless JPG format, DICOM anonymized",
                    "Coronal and axial plane coverage",
                    "Enhanced/colorized CT format License: MIT",
                    <a
                  href="https://www.kaggle.com/datasets/shuvokumarbasakbd/kidney-colorized-ct-normal-cyst-tumor-stone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
                >
                  View dataset on Kaggle
                </a>
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Normal", count: "5,077", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
                  { label: "Cyst", count: "3,709", color: "bg-sky-500/10 border-sky-500/30 text-sky-400" },
                  { label: "Tumor", count: "2,283", color: "bg-rose-500/10 border-rose-500/30 text-rose-400" },
                  { label: "Stone", count: "1,377", color: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
                ].map(({ label, count, color }) => (
                  <div key={label} className={`border rounded-xl p-5 ${color}`}>
                    <p className="text-2xl font-black">{count}</p>
                    <p className="text-xs font-semibold mt-1 opacity-80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Analyze
            <span className="bg-linear-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"> Your Scan?</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg">Get instant AI-powered kidney condition classification in seconds.</p>
          <button
            onClick={() => navigate("/classifier")}
            className="bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold px-10 py-5 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/25 flex items-center gap-3 mx-auto"
          >
            <Zap className="w-6 h-6" />
            Start Free Analysis
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <Hospital className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-400">KIDNEY SCAN AI</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Microscope className="w-3 h-3" />
            Powered by TensorFlow · VGG16 Transfer Learning
          </div>
          <p className="text-xs text-slate-500">Developed by <span className="text-slate-300 font-semibold">Muhammad Fahad</span></p>
        </div>
      </footer>

    </div>
  );
}