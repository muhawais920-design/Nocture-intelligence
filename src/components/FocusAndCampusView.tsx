import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  MapPin,
  CheckCircle2,
  Sparkles,
  Headphones,
  Radio,
} from 'lucide-react';
import { formatFocusTimer } from '../utils/academic-logic.ts';
import { CAMPUS_SERVICES } from '../data/mockData.ts';
import { ambientSound } from '../utils/ambient-sound.ts';

interface FocusAndCampusViewProps {
  onStudySessionLogged?: (mins: number) => void;
}

export const FocusAndCampusView: React.FC<FocusAndCampusViewProps> = ({
  onStudySessionLogged,
}) => {
  // Focus Timer State
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Soundscape State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [soundMode, setSoundMode] = useState<'cosmic' | 'alpha' | 'rain' | 'whitenoise'>('cosmic');
  const [volume, setVolume] = useState(0.3);

  // Campus Services Reservation State
  const [reservedServiceId, setReservedServiceId] = useState<string | null>(null);

  // Timer Tick Effect
  useEffect(() => {
    let interval: number | undefined;
    if (isActive && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setSessionCompleted(true);
      if (onStudySessionLogged) {
        onStudySessionLogged(Math.round(initialSeconds / 60));
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, initialSeconds, onStudySessionLogged]);

  // Handle Sound Play / Pause
  const toggleAudio = () => {
    if (isPlayingAudio) {
      ambientSound.stop();
      setIsPlayingAudio(false);
    } else {
      ambientSound.play(soundMode);
      ambientSound.setVolume(volume);
      setIsPlayingAudio(true);
    }
  };

  const handleSelectSoundMode = (mode: 'cosmic' | 'alpha' | 'rain' | 'whitenoise') => {
    setSoundMode(mode);
    if (isPlayingAudio) {
      ambientSound.play(mode);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientSound.setVolume(newVol);
  };

  const resetTimer = (durationMins: number) => {
    setIsActive(false);
    setInitialSeconds(durationMins * 60);
    setSecondsLeft(durationMins * 60);
    setSessionCompleted(false);
  };

  const progressPercent = Math.round(
    ((initialSeconds - secondsLeft) / initialSeconds) * 100
  );

  return (
    <div className="space-y-5 pb-24 text-[#dde1ff]">
      {/* Header */}
      <div className="pt-1">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Radio className="w-5 h-5 text-[#10BFA5]" />
          Focus Engine & Campus Hub
        </h2>
        <p className="text-xs text-[#8996B5]">
          Binaural deep-work timer, ambient cosmic frequencies & facilities telemetry
        </p>
      </div>

      {/* Focus Timer Section */}
      <section
        aria-label="Cosmic Focus Timer"
        className="bg-[#172447] border border-[#29375C] rounded-2xl p-5 shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10BFA5] animate-ping" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Deep Work Interval
            </h3>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 bg-[#101A3A] p-1 rounded-xl border border-[#29375C]/60">
            <button
              onClick={() => resetTimer(25)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                initialSeconds === 25 * 60
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-[#8996B5] hover:text-white'
              }`}
            >
              25m
            </button>
            <button
              onClick={() => resetTimer(50)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                initialSeconds === 50 * 60
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-[#8996B5] hover:text-white'
              }`}
            >
              50m
            </button>
            <button
              onClick={() => resetTimer(15)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                initialSeconds === 15 * 60
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-[#8996B5] hover:text-white'
              }`}
            >
              15m
            </button>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center py-4">
          <div className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight font-mono drop-shadow-[0_0_16px_rgba(210,187,255,0.4)]">
            {formatFocusTimer(secondsLeft)}
          </div>
          <p className="text-xs text-[#8996B5] mt-2 font-medium">
            {isActive
              ? 'Focus flow active · Cognitive distractions muted'
              : sessionCompleted
              ? '🎉 Focus block complete! Logged to weekly flight deck.'
              : 'Ready to immerse in coursework'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#101A3A] h-2 rounded-full overflow-hidden mb-5">
          <div
            className="bg-gradient-to-r from-[#22D3EE] via-[#7C3AED] to-[#10BFA5] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 py-2.5 px-6 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
              isActive
                ? 'bg-[#1E2D58] hover:bg-[#29375C] text-[#5de6ff] border border-[#22D3EE]/40'
                : 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white glow-violet hover:opacity-90'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Deep Work</span>
              </>
            )}
          </button>

          <button
            onClick={() => resetTimer(initialSeconds / 60)}
            aria-label="Reset Timer"
            className="p-2.5 rounded-xl bg-[#101A3A] hover:bg-[#1E2D58] text-[#8996B5] hover:text-white border border-[#29375C] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Ambient Cosmic Soundscapes (Web Audio API) */}
      <section
        aria-label="Ambient Soundscape Generator"
        className="bg-[#172447] border border-[#29375C] rounded-2xl p-4 sm:p-5 shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#22D3EE]" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Ambient Audio Synthesizer
            </h3>
          </div>
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#10BFA5] text-[#080F2B] glow-mint'
                : 'bg-[#1E2D58] text-[#B8C4E0] hover:text-white border border-[#29375C]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Playing</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Soundscape</span>
              </>
            )}
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {[
            { id: 'cosmic', label: 'Cosmic Drone', desc: 'Sub-bass harmonics' },
            { id: 'alpha', label: 'Alpha Wave', desc: '10Hz binaural beat' },
            { id: 'rain', label: 'Cosmic Rain', desc: 'Pink filtered drops' },
            { id: 'whitenoise', label: 'Starlight Noise', desc: 'Equal energy band' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleSelectSoundMode(mode.id as typeof soundMode)}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                soundMode === mode.id
                  ? 'bg-[#7C3AED]/20 border-[#8B5CF6] text-white shadow-sm'
                  : 'bg-[#101A3A] border-[#29375C]/60 text-[#8996B5] hover:text-white'
              }`}
            >
              <p className="text-xs font-bold">{mode.label}</p>
              <p className="text-[10px] text-[#8996B5] mt-0.5">{mode.desc}</p>
            </button>
          ))}
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-3 bg-[#101A3A] p-2.5 rounded-xl border border-[#29375C]/50">
          <button
            onClick={() => handleVolumeChange(volume > 0 ? 0 : 0.3)}
            className="text-[#8996B5] hover:text-white cursor-pointer"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-[#7C3AED] h-1.5 bg-[#172447] rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono text-[#8996B5] w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </section>

      {/* Campus Facilities & Live Availability Telemetry */}
      <section aria-label="Campus Facilities Telemetry" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#F59E0B]" />
            Campus Facilities Telemetry
          </h3>
          <span className="text-[11px] text-[#10BFA5] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10BFA5] animate-pulse" />
            Live Sensors
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CAMPUS_SERVICES.map((service) => {
            const isReserved = reservedServiceId === service.id;

            return (
              <div
                key={service.id}
                className="bg-[#172447] border border-[#29375C] rounded-2xl p-4 flex flex-col justify-between hover:border-[#22D3EE]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${service.accent}20`,
                        color: service.accent,
                      }}
                    >
                      {service.type}
                    </span>
                    <span className="text-xs font-semibold text-[#10BFA5]">
                      {service.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{service.name}</h4>

                  <p className="text-xs text-[#8996B5] flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8996B5]" />
                    {service.location}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#29375C]/60 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-white font-medium">{service.availableSlots}</span>
                    <p className="text-[10px] text-[#8996B5]">
                      {service.occupancyPercent}% Occupancy
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setReservedServiceId(isReserved ? null : service.id)
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isReserved
                        ? 'bg-[#10BFA5]/20 text-[#10BFA5] border border-[#10BFA5]/40 flex items-center gap-1'
                        : 'bg-[#1E2D58] hover:bg-[#29375C] text-[#5de6ff] border border-[#29375C]'
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Reserved</span>
                      </>
                    ) : (
                      <span>Reserve Spot</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
