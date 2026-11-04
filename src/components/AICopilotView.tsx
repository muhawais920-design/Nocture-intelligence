import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  RotateCw,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { AIResponsePayload, askNocturneAI } from '../utils/ai-service.ts';
import { AI_QUERY_PRESETS } from '../data/mockData.ts';

interface AICopilotViewProps {
  initialQuery?: string;
  initialCourseContext?: string;
}

export const AICopilotView: React.FC<AICopilotViewProps> = ({
  initialQuery = '',
  initialCourseContext,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [courseContext, setCourseContext] = useState(initialCourseContext || 'CS 482');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponsePayload | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleRunQuery = async (customText?: string, contextOverride?: string) => {
    const textToRun = (customText ?? query).trim();
    if (!textToRun) return;

    setLoading(true);
    setFlippedCards({});

    try {
      const res = await askNocturneAI(textToRun, contextOverride || courseContext);
      setResponse(res);
    } catch (err) {
      console.error('Failed to query Nocturne AI:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (promptText: string, tag: string) => {
    setQuery(promptText);
    setCourseContext(tag);
    handleRunQuery(promptText, tag);
  };

  const toggleFlipCard = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-4 pb-24 text-[#dde1ff]">
      {/* Header */}
      <div className="pt-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] flex items-center justify-center glow-violet shadow-lg shadow-purple-900/40">
            <Sparkles className="w-4 h-4 text-[#5de6ff]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Nocturne AI Copilot
            </h2>
            <p className="text-xs text-[#8996B5]">
              Real-time STEM synthesis, proof generation & study companion
            </p>
          </div>
        </div>
      </div>

      {/* Query Presets Chips */}
      <div>
        <p className="text-[11px] font-semibold text-[#8996B5] uppercase tracking-wider mb-2">
          Contextual Focus Shortcuts
        </p>
        <div className="flex flex-wrap gap-2">
          {AI_QUERY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.prompt, preset.tag)}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#172447] hover:bg-[#1E2D58] border border-[#29375C] hover:border-[#8B5CF6] text-xs font-medium text-[#dde1ff] hover:text-[#5de6ff] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <span className="text-[#8B5CF6] font-bold">✦</span>
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold text-[#8996B5]">Course Context:</span>
          <select
            value={courseContext}
            onChange={(e) => setCourseContext(e.target.value)}
            className="bg-[#101A3A] border border-[#29375C] rounded-lg px-2 py-0.5 text-xs text-white outline-none"
          >
            <option value="CS 482">CS 482 · Neural Architectures</option>
            <option value="MATH 314">MATH 314 · Stochastic Calculus</option>
            <option value="BIO 290">BIO 290 · Computational Genomics</option>
            <option value="PHIL 210">PHIL 210 · Cognitive Agents</option>
            <option value="General">General Academic / Study Planning</option>
          </select>
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question, request proof derivations, generate revision flashcards, or synthesize notes..."
            className="w-full bg-[#101A3A] border border-[#29375C] focus:border-[#7C3AED] rounded-xl p-3 text-xs text-white placeholder-[#8996B5] outline-none transition-colors resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleRunQuery();
              }
            }}
          />

          <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#29375C]/50">
            <span className="text-[10px] text-[#8996B5]">
              Press Ctrl+Enter to submit
            </span>

            <button
              onClick={() => handleRunQuery()}
              disabled={loading || !query.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-xs font-bold glow-violet hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-purple-950/50"
            >
              {loading ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask Nocturne</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Response Display Area */}
      {loading && (
        <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-8 text-center animate-pulse">
          <Sparkles className="w-8 h-8 text-[#22D3EE] mx-auto mb-2 animate-spin-slow" />
          <p className="text-sm font-bold text-white">Synthesizing Academic Manifolds...</p>
          <p className="text-xs text-[#8996B5] mt-1">
            Analyzing lecture transcripts, syllabus dependencies, and key formulas.
          </p>
        </div>
      )}

      {response && !loading && (
        <div className="space-y-4 animate-fade-in">
          {/* Executive Synthesis Card */}
          <div className="bg-[#172447] border border-[#29375C] rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#5de6ff] bg-[#22D3EE]/15 px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
                Synthesis & Theoretical Intuition
              </span>
              <span className="text-[11px] text-[#8996B5] font-semibold">{courseContext}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
              {response.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#B8C4E0] leading-relaxed mb-4">
              {response.summary}
            </p>

            {/* Key Concepts */}
            <div className="space-y-2 mb-4 bg-[#101A3A] p-3.5 rounded-xl border border-[#29375C]/60">
              <p className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-[#22D3EE]" />
                Key Mathematical & Concept Pillars
              </p>
              <ul className="space-y-1.5 text-xs text-[#dde1ff]">
                {response.keyConcepts.map((concept, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8B5CF6] font-bold mt-0.5">•</span>
                    <span className="leading-snug">{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Insights */}
            <div className="space-y-2 bg-[#1E2D58]/60 p-3.5 rounded-xl border border-[#29375C]">
              <p className="text-xs font-bold text-[#10BFA5] flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10BFA5]" />
                Actionable Exam & Project Steps
              </p>
              <ul className="space-y-1.5 text-xs text-[#dde1ff]">
                {response.actionableInsights.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#10BFA5] font-bold">✓</span>
                    <span className="leading-snug">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Flashcards */}
          {response.flashcards && response.flashcards.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                  Active Recall Flashcards (Click to flip)
                </p>
                <span className="text-[10px] text-[#8996B5]">Spaced Retrieval Ready</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {response.flashcards.map((card, idx) => {
                  const isFlipped = !!flippedCards[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFlipCard(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleFlipCard(idx)}
                      className={`min-h-[110px] p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isFlipped
                          ? 'bg-[#101A3A] border-[#10BFA5]/60 text-[#dde1ff]'
                          : 'bg-[#172447] border-[#29375C] hover:border-[#8B5CF6] text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
                        <span className={isFlipped ? 'text-[#10BFA5]' : 'text-[#8B5CF6]'}>
                          {isFlipped ? 'Answer & Explanation' : `Prompt #${idx + 1}`}
                        </span>
                        <span className="text-[#8996B5] flex items-center gap-1">
                          <RotateCw className="w-3 h-3" />
                          Flip
                        </span>
                      </div>

                      <p className="text-xs font-medium leading-relaxed">
                        {isFlipped ? card.back : card.front}
                      </p>

                      <div className="mt-2 text-right">
                        <span className="text-[9px] text-[#8996B5]">
                          {isFlipped ? 'Tap to see prompt' : 'Tap to reveal answer'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Suggested Follow-Ups */}
          {response.suggestedFollowUps && response.suggestedFollowUps.length > 0 && (
            <div className="bg-[#101A3A] border border-[#29375C] rounded-2xl p-3.5">
              <p className="text-xs font-bold text-white flex items-center gap-1.5 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#22D3EE]" />
                Explore Deeper Follow-Ups
              </p>
              <div className="space-y-1.5">
                {response.suggestedFollowUps.map((followUp, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(followUp);
                      handleRunQuery(followUp);
                    }}
                    className="w-full text-left text-xs p-2 rounded-lg bg-[#172447] hover:bg-[#1E2D58] text-[#B8C4E0] hover:text-white border border-[#29375C]/60 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span>{followUp}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8996B5] group-hover:text-[#22D3EE] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
