import React, { useState, useRef, useEffect } from 'react';

export default function AiCompanion() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Welcome back. It's completely okay if today feels heavy. We can pause, or we can gently explore what's on your mind. How are you feeling right now?",
      time: 'Just now'
    },
    {
      id: 2,
      sender: 'user',
      text: "I feel like I've fallen off track with my goals again.",
      time: 'Just now'
    },
    {
      id: 3,
      sender: 'ai',
      text: "That is such a common feeling, and I want to validate that it can be deeply frustrating. But remember our philosophy: there is no failure here, only the opportunity to begin again.\n\nYou haven't lost your progress. You're just taking a rest. What feels like the smallest, most manageable step you could take today?",
      time: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBreathingMode, setIsBreathingMode] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const chatEndRef = useRef(null);

  const quickReplies = [
    { text: 'I need a moment to breathe', icon: 'self_improvement', action: 'breathe' },
    { text: "I'm feeling overwhelmed", icon: 'bedtime', action: 'overwhelmed' },
    { text: 'Help me reset my day', icon: 'psychiatry', action: 'reset' },
    { text: 'Share a gentle affirmation', icon: 'auto_awesome', action: 'affirmation' },
  ];

  const aiResponses = {
    breathe: "Let's take a 3-second breathing reset together. Breathe in deeply... feel your lungs expand... and gently let go. You are safe in this moment.",
    overwhelmed: "When overwhelming feelings arise, try narrowing your focus. What is one thing you can touch, hear, or see right now? Let's ground ourselves first.",
    reset: "Starting fresh doesn't require waiting until tomorrow. Right now, in this second, you can choose to reset. Drink a glass of water, stretch your shoulders, and smile softly.",
    affirmation: "You are worthy of rest. Your value is not defined by endless productivity. Taking care of your mind is your highest achievement.",
    default: "Thank you for sharing that with me. Every small step you take towards self-compassion creates lasting resilience. How does your body feel after expressing that?"
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Breathing timer mode
  useEffect(() => {
    let interval;
    if (isBreathingMode) {
      const phases = ['Inhale (4s)', 'Hold (4s)', 'Exhale (4s)', 'Rest (2s)'];
      let count = 0;
      setBreathPhase(phases[0]);
      interval = setInterval(() => {
        count = (count + 1) % phases.length;
        setBreathPhase(phases[count]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathingMode]);

  const handleSend = (customText = null, actionKey = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    if (actionKey === 'breathe') {
      setIsBreathingMode(true);
    }

    setTimeout(() => {
      let replyText = aiResponses.default;
      if (actionKey && aiResponses[actionKey]) {
        replyText = aiResponses[actionKey];
      } else {
        const lower = textToSend.toLowerCase();
        if (lower.includes('breathe') || lower.includes('stress')) replyText = aiResponses.breathe;
        else if (lower.includes('tired') || lower.includes('heavy') || lower.includes('anxious')) replyText = aiResponses.overwhelmed;
        else if (lower.includes('reset') || lower.includes('start')) replyText = aiResponses.reset;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <main class="flex-grow flex flex-col max-w-[1100px] mx-auto w-full px-container-padding-mobile md:px-container-padding-desktop pb-24 md:pb-8 pt-4 overflow-hidden relative">
      {/* Header Area for AI */}
      <div class="text-center mb-6 shrink-0">
        <div class="w-16 h-16 mx-auto bg-primary-container rounded-full flex items-center justify-center breathing-pulse mb-3 text-on-primary-container shadow-md">
          <span class="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
        <h1 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary dark:text-primary-fixed mb-1">
          Here with you.
        </h1>
        <p class="text-on-surface-variant dark:text-outline-variant max-w-md mx-auto text-sm md:text-base">
          Whenever you're ready, let's take a gentle step forward together.
        </p>
      </div>

      {/* Guided Breathing Modal Banner */}
      {isBreathingMode && (
        <div class="mb-4 bg-primary-container/20 border border-primary/30 rounded-2xl p-4 flex items-center justify-between text-primary dark:text-primary-fixed animate-fade-in">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center breathing-pulse">
              <span class="material-symbols-outlined">self_improvement</span>
            </div>
            <div>
              <p class="font-bold text-sm">Guided Breathing Session</p>
              <p class="text-xs opacity-90">{breathPhase}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsBreathingMode(false)}
            class="px-3 py-1 bg-surface rounded-full text-xs font-semibold hover:bg-surface-variant transition-colors"
          >
            End Session
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div class="flex-grow overflow-y-auto flex flex-col gap-4 p-4 md:p-6 rounded-2xl bg-surface-container-low dark:bg-inverse-surface/40 shadow-[0_4px_24px_rgba(86,125,98,0.05)] border border-surface-container dark:border-outline/20 mb-4 min-h-[320px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            class={`flex gap-3 message-enter ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 text-on-primary-container mt-1 shadow-sm">
                <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
              </div>
            )}

            <div
              class={`rounded-2xl p-4 max-w-[85%] text-sm md:text-base leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary-container text-on-primary-container rounded-tr-none shadow-sm'
                  : 'bg-surface dark:bg-surface-container-high text-on-surface dark:text-on-surface rounded-tl-none shadow-[0_2px_8px_rgba(86,125,98,0.05)] border border-surface-container dark:border-outline/20'
              }`}
            >
              {msg.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} class={idx > 0 ? 'mt-2' : ''}>
                  {paragraph}
                </p>
              ))}
              <span class="block text-[10px] opacity-60 text-right mt-2">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div class="flex gap-3 items-center text-on-surface-variant">
            <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 text-on-primary-container breathing-pulse">
              <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div class="bg-surface dark:bg-surface-container-high rounded-2xl rounded-tl-none p-3 border border-surface-container dark:border-outline/20 flex gap-1">
              <span class="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span class="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div class="shrink-0 pt-2 bg-background dark:bg-transparent relative z-10">
        {/* Quick Replies */}
        <div class="flex gap-2 overflow-x-auto pb-3 no-scrollbar items-center">
          {quickReplies.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip.text, chip.action)}
              class="whitespace-nowrap px-4 py-2 bg-surface-container-highest dark:bg-surface-container-high hover:bg-surface-variant text-on-surface-variant dark:text-outline-variant rounded-full font-label-caps text-xs transition-colors flex items-center gap-2 border border-surface-container dark:border-outline/20 shadow-sm"
            >
              <span class="material-symbols-outlined text-[16px]">{chip.icon}</span>
              {chip.text}
            </button>
          ))}
        </div>

        {/* Text Field */}
        <div class="relative flex items-center">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            class="w-full bg-surface-container-low dark:bg-inverse-surface/60 border border-surface-variant dark:border-outline/30 rounded-[24px] pl-6 pr-14 py-4 text-on-surface dark:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-shadow text-sm md:text-base"
            placeholder="Share what's on your mind..."
            rows="1"
          />
          <button
            onClick={() => handleSend()}
            class="absolute right-3 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-surface-tint transition-colors shadow-sm focus:outline-none"
          >
            <span class="material-symbols-outlined">arrow_upward</span>
          </button>
        </div>

        <div class="text-center mt-3">
          <p class="font-label-caps text-[11px] text-outline dark:text-outline-variant">
            ReStart AI is a supportive guide, not a medical professional.
          </p>
        </div>
      </div>
    </main>
  );
}
