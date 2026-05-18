'use client';

import { useState, useEffect, useRef } from 'react';
import { TerminalCard } from './terminal-card';
import { ContactSection } from './contact-section';

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseIndicator, setShowPauseIndicator] = useState<'enter' | 'exit' | null>(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const totalRef = useRef(0);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const testimonials = [
    {
      quote: "Shounak has been an outstanding teammate on our Security project. He is highly proactive, consistently taking ownership and driving solutions that improved our service's security posture, helping us achieve a 5% increase in our security score in just two weeks.",
      name: "Thanh Tran",
      title: "Software Engineer @ Atlassian"
    },
    {
      quote: "Shounak loves software engineering. He is clever, hardworking and easy to work with. Despite real uncertainty about his future during a time of hiring freezes, layoffs and the possibility of his contract not being renewed, Shounak kept working hard, demonstrating a genuine love for his craft and a consistently positive mindset.",
      name: "Alexander Sumer",
      title: "AI Platform @ Atlassian"
    },
    {
      quote: "Shounak is a dedicated engineer who learns quickly and is an asset to any team. He is a great team member to bounce ideas and helped integrate the agent to agent protocols into our service.",
      name: "Emily Wong",
      title: "ML Systems Engineer"
    },
    {
      quote: "I have enjoyed working with Shounak for the last two years. He is hard-working, bright, and a skilled communicator. I particularly enjoyed his sense of humor in the face of what can sometimes be a stressful situation when faced with tight deadlines.",
      name: "Milton Biswas",
      title: "Project Associate @ CTS"
    },
    {
      quote: "I had the pleasure of working with Shounak, a highly skilled backend developer with an impressive command of Java. His ability to solve complex problems efficiently and his knack for writing clean, maintainable code stood out.",
      name: "Niloy Biswas",
      title: "Staff Engineer @ Nagarro"
    },
    {
      quote: "Shounak is a fantastic person to work with — not only a multi-skilled and insightful colleague, but also an inspiring strategist. Great employee with very strong problem solving skills.",
      name: "Agrim Maheshwari",
      title: "Senior Backend Engineer"
    },
    {
      quote: "I have been working with Shounak for almost the past year at Cognizant. He consistently impressed me with his ability to deliver results under tight deadlines. Beyond his professional expertise, Shounak is a great team player who always goes above and beyond to support his colleagues.",
      name: "Swathi Shivakumar",
      title: "Consultant @ Capgemini"
    },
    {
      quote: "Shounak and I started working in the project together 2 years back. He has amazing technical skills. He is definitely a team player, always ready to help others and resolve their doubts.",
      name: "Aashiya Singhal",
      title: "Software Developer"
    },
    {
      quote: "I worked with Shounak and during my professional interactions with him, I found him to be a very hardworking employee with deep knowledge on multiple technologies including Java, J2EE, Spring Boot, Spring Batch, and Jenkins. He is very passionate about his work and brings a lot of energy into the team.",
      name: "Megha Bajaj",
      title: "Senior Software Developer"
    },
    {
      quote: "I and Shounak worked together during our training when we started our careers. Shounak was one of the most valuable members in the group we had back then with unmatched skills in Java and SQL.",
      name: "Ayush Kumar",
      title: "Techno-Functional Consultant @ SAP Labs"
    }
  ];

  totalRef.current = testimonials.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalRef.current);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = testimonials[currentIndex];

  function goNext() {
    setCurrentIndex((prev) => (prev + 1) % totalRef.current);
  }

  function goPrev() {
    setCurrentIndex((prev) => (prev - 1 + totalRef.current) % totalRef.current);
  }

  function togglePause() {
    setIsPaused((p) => !p);
    setShowPauseIndicator('enter');
    setIsBlurred(true);
    clearTimeout(blurTimerRef.current);
    blurTimerRef.current = setTimeout(() => setIsBlurred(false), 1000);
  }

  useEffect(() => {
    if (showPauseIndicator !== 'enter') return;
    const t = setTimeout(() => setShowPauseIndicator('exit'), 800);
    const t2 = setTimeout(() => setShowPauseIndicator(null), 1000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [showPauseIndicator]);

  const colors = [
    { base: 'amber', hex: 'd97706' },
    { base: 'cyan', hex: '06b6d4' },
    { base: 'purple', hex: 'a855f7' },
    { base: 'pink', hex: 'ec4899' },
    { base: 'rose', hex: 'f43f5e' },
    { base: 'sky', hex: '0ea5e9' },
    { base: 'orange', hex: 'ea580c' },
    { base: 'indigo', hex: '6366f1' },
    { base: 'lime', hex: '65a30d' },
    { base: 'yellow', hex: 'ca8a04' },
  ];
  const c = colors[currentIndex % colors.length];
  const prevColor = colors[(currentIndex - 1 + totalRef.current) % totalRef.current];
  const nextColor = colors[(currentIndex + 1) % totalRef.current];

  return (
    <>
      <div className="md:col-span-9 flex flex-col">
        <TerminalCard title="Testimonials.sh" icon="format_quote" className="flex-1">
          <div className="p-6 md:p-8 flex-1 flex flex-col min-h-[300px]" onClick={togglePause}>
            <div className="flex-1 min-h-0 space-y-4 relative">
              <div className={`${isBlurred ? 'blur-sm transition-all duration-200' : ''}`}>
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <div
                  className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: `#${c.hex}33`, backgroundColor: `#${c.hex}1a` }}
                >
                  <span className="material-symbols-outlined text-[14px]" style={{ color: `#${c.hex}` }}>person</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold font-mono" style={{ color: `#${c.hex}` }}>{current.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{current.title}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-4">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">&gt;</span>
                <div className="max-h-[120px] overflow-y-auto flex-1">
                  <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-mono text-justify">
                    <span className="text-emerald-400/60">&ldquo;</span>
                    {current.quote}
                    <span className="text-emerald-400/60">&rdquo;</span>
                  </p>
                </div>
              </div>
            </div>
              {showPauseIndicator && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      showPauseIndicator === 'enter' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <span className="material-symbols-outlined text-5xl" style={{ color: `#${c.hex}` }}>
                      {isPaused ? 'pause' : 'play_arrow'}
                    </span>
                    <span className="text-2xl font-mono uppercase tracking-widest" style={{ color: `#${c.hex}cc` }}>
                      {isPaused ? 'paused' : 'resumed'}
                    </span>
                  </div>
                </div>
              )}
          </div>
          <div className="px-6 pb-4">
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="flex items-center justify-center w-7 h-7 rounded border transition-all cursor-pointer"
                style={{
                  borderColor: `#${prevColor.hex}33`,
                  backgroundColor: `#${prevColor.hex}1a`,
                  color: `#${prevColor.hex}`,
                }}
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <div className="flex gap-2 w-40 justify-center">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? 'w-8' : 'w-1.5 bg-white/20'
                    }`}
                    style={i === currentIndex ? { backgroundColor: `#${colors[i].hex}` } : {}}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="flex items-center justify-center w-7 h-7 rounded border transition-all cursor-pointer"
                style={{
                  borderColor: `#${nextColor.hex}33`,
                  backgroundColor: `#${nextColor.hex}1a`,
                  color: `#${nextColor.hex}`,
                }}
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/20">{isPaused ? 'click to resume' : 'click to pause'}</span>
            </div>
          </div>
          </div>
        </TerminalCard>
      </div>

      <div className="md:col-span-3 flex flex-col">
        <ContactSection />
      </div>
    </>
  );
}
