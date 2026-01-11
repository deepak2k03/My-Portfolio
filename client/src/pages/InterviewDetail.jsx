import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { interviewsAPI } from "../utils/api.js";
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Hash,
  AlertTriangle,
  Layers,
  Terminal,
  BookOpen,
  Star,
} from "lucide-react";

// --- Helper Components ---

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || "pending";
  const isOffer =
    s.includes("offer") || s.includes("selected") || s.includes("passed");
  const isRejected = s.includes("reject") || s.includes("failed");

  if (isOffer) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-sm dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]">
        <CheckCircle2 size={12} /> Offer Received
      </div>
    );
  }
  if (isRejected) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
        <XCircle size={12} /> Not Selected
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
      <Clock size={12} /> {status}
    </div>
  );
};

const DifficultyBar = ({ level }) => {
  const l = level?.toLowerCase() || "medium";
  const score = l.includes("easy") ? 1 : l.includes("hard") ? 3 : 2;

  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-6 rounded-full ${
            i <= score
              ? score === 3
                ? "bg-red-500"
                : score === 2
                ? "bg-yellow-500"
                : "bg-emerald-500"
              : "bg-slate-200 dark:bg-white/10"
          }`}
        />
      ))}
    </div>
  );
};

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        setLoading(true);
        const res = await interviewsAPI.getById(id);
        setInterview(res?.data?.interview || null);
      } catch (err) {
        setError("Encrypted file not found or corrupted.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInterview();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#020202] flex items-center justify-center text-purple-600 dark:text-purple-500 font-mono animate-pulse">
        Loading Mission Report...
      </div>
    );

  if (error || !interview)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#020202] flex flex-col items-center justify-center text-center px-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl text-slate-900 dark:text-white font-bold mb-2">Access Denied</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          {error || "Interview log missing."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 underline underline-offset-4"
        >
          Return to Archives
        </button>
      </div>
    );

  const dw = interview.detailedWriteup || {};

  return (
    // 🟢 FIX: Main Background & Text Color
    <div className="min-h-screen bg-gray-50 dark:bg-[#020202] text-slate-900 dark:text-slate-200 py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://grainy-gradients.vercel.app/noise.svg")',
        }}
      />
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom max-w-6xl relative z-10">
        {/* Navigation */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="group flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
        >
          <div className="p-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 group-hover:border-purple-500/50 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="font-mono">BACK_TO_ARCHIVES</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* --- LEFT CONTENT (Main Report) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 space-y-10"
          >
            {/* 1. Header Card */}
            {/* 🟢 FIX: Adaptive Card */}
            <div className="rounded-3xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-8 relative overflow-hidden shadow-lg dark:shadow-none">
              <div className="absolute top-0 right-0 p-32 bg-purple-600/10 dark:bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    {interview.company}
                  </h1>
                  <StatusBadge status={dw.outcome || "Completed"} />
                </div>
                <div className="flex items-center gap-3 text-lg text-slate-600 dark:text-slate-400 mb-6">
                  <Briefcase size={18} className="text-purple-600 dark:text-purple-400" />
                  <span>{interview.role}</span>
                </div>

                {/* Preparation Highlight */}
                {dw.preparation && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    <span className="text-purple-600 dark:text-purple-400 font-bold not-italic block mb-1 text-xs uppercase tracking-widest">
                      Pre-Mission Prep:
                    </span>
                    "{dw.preparation}"
                  </div>
                )}
              </div>
            </div>

            {/* 2. Rounds Timeline */}
            {interview.rounds?.length > 0 && (
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                  <Layers className="text-purple-600 dark:text-purple-400" /> Mission Stages
                </h3>

                <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-slate-300 dark:via-slate-800 to-transparent" />

                  {interview.rounds.map((round, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative pl-12"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white dark:bg-[#020202] border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-600 dark:text-purple-400 z-10 shadow-lg dark:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        {idx + 1}
                      </div>

                      {/* Card */}
                      {/* 🟢 FIX: Adaptive Round Card */}
                      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] p-6 hover:border-purple-400 dark:hover:border-purple-500/30 transition-colors shadow-sm dark:shadow-none">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {round.roundName || `Round ${idx + 1}`}
                          </h4>
                          {round.duration && (
                            <span className="text-xs font-mono text-slate-500 border border-slate-200 dark:border-white/10 px-2 py-1 rounded">
                              {round.duration}
                            </span>
                          )}
                        </div>

                        {round.description && (
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                            {round.description}
                          </p>
                        )}

                        {/* Questions List */}
                        {round.questionsAsked?.length > 0 && (
                          <div className="space-y-2 mt-4">
                            {round.questionsAsked.map((q, i) => (
                              <div
                                key={i}
                                className="flex gap-3 items-start p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5"
                              >
                                <Terminal
                                  size={14}
                                  className="mt-1 text-blue-600 dark:text-blue-400 shrink-0"
                                />
                                <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                                  {q}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {round.tips && (
                          <div className="mt-4 flex gap-2 text-xs text-yellow-700 dark:text-yellow-500/80 bg-yellow-50 dark:bg-yellow-500/5 p-3 rounded-lg border border-yellow-200 dark:border-yellow-500/10">
                            <Star size={14} className="shrink-0" />
                            <span>
                              <span className="font-bold">Key Insight:</span>{" "}
                              {round.tips}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Deep Dive Sections (System Design / Technical) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dw.systemDesign && (
                // 🟢 FIX: Adaptive Card
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Layers size={18} className="text-pink-600 dark:text-pink-400" /> System Design
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                    {dw.systemDesign}
                  </p>
                </div>
              )}

              {dw.technicalQuestions?.length > 0 && (
                // 🟢 FIX: Adaptive Card
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Terminal size={18} className="text-green-600 dark:text-green-400" /> Technical
                    QA
                  </h3>
                  <ul className="space-y-2">
                    {dw.technicalQuestions.map((q, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside marker:text-green-500"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 4. Tips for Future */}
            {dw.tipsForFuture && (
              // 🟢 FIX: Adaptive Card
              <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-8 text-center overflow-hidden group hover:border-purple-400 dark:hover:border-purple-500/30 transition-colors shadow-lg dark:shadow-none">
                {/* 1. Subtle Spotlight Glow (Behind the icon) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-colors" />

                <div className="relative z-10">
                  {/* 2. Styled Icon Container */}
                  <div className="w-14 h-14 mx-auto bg-slate-50 dark:bg-[#0F0F0F] rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-black/50 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    Advice for Future Candidates
                  </h3>

                  {/* 3. Text Styling matches other cards */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto italic font-medium">
                    "{dw.tipsForFuture}"
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* --- RIGHT SIDEBAR (Sticky Metadata) --- */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-28"
          >
            {/* Meta Card */}
            {/* 🟢 FIX: Adaptive Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] p-6 space-y-6 shadow-lg dark:shadow-none">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Log Details
                </h4>

                <div className="space-y-4">
                  {interview.date && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Calendar size={14} /> Date
                      </span>
                      <span className="text-slate-900 dark:text-white font-mono">
                        {new Date(interview.date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <Clock size={14} /> Type
                    </span>
                    <span className="text-slate-900 dark:text-white capitalize">
                      {interview.type || "On-site"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <AlertTriangle size={14} /> Difficulty
                    </span>
                    <DifficultyBar level={interview.difficulty} />
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/10" />

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Hash size={12} /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interview.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-300 dark:hover:border-purple-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            {dw.myPerformance && (
              // 🟢 FIX: Adaptive Card
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0F0F0F] p-6 shadow-sm dark:shadow-none">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Performance Note
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dw.myPerformance}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetail;