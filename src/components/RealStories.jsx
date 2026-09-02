import React, { useState } from 'react';

export default function RealStories() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);
  const [likes, setLikes] = useState({ 1: 42, 2: 19, 3: 31, 4: 56 });

  const categories = ['All', 'Burnout Recovery', 'Mindfulness', 'Zero Pressure', 'Sleep & Rest'];

  const stories = [
    {
      id: 1,
      category: 'Zero Pressure',
      author: 'Elena R.',
      timeline: 'Found consistency after 3 years',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      headline: '"The lack of pressure is what finally made it stick."',
      quote: "The lack of pressure is what finally made it stick. ReStart doesn't yell at me when I miss a day; it just quietly offers a path back. It's the first time a habit feels like a companion instead of a chore.",
      fullStory: "For three years, I tried standard habit trackers with high streaks and bright red warnings whenever I missed a day. Every time I broke a 10-day streak, the guilt caused me to stop using the app for months. When I switched to ReStart's 'Breathing Pulse' mindset, there were no red alerts or broken chains. Just a soft prompt: 'Whenever you are ready, let's take a gentle step forward.' It transformed my relationship with consistency.",
      isFeatured: true
    },
    {
      id: 2,
      category: 'Burnout Recovery',
      author: 'Marcus T.',
      timeline: 'Software Engineer, SF',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      headline: '"No shame, just steady progress."',
      quote: "I used to spiral after one bad meal or skipped workout. The 'ReStart' philosophy taught me to just breathe and start fresh the next morning. No shame, just progress.",
      fullStory: "Recovering from severe tech burnout meant unlearning the idea that every minute must be optimized. ReStart helped me realize taking a rest day isn't 'failing'—it's part of the rhythm. The quick AI resets gave me a 5-minute breathing anchor during intense workdays.",
      isFeatured: false
    },
    {
      id: 3,
      category: 'Mindfulness',
      author: 'Sarah J.',
      timeline: 'Designer & Parent',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      headline: '"The AI feels genuinely supportive."',
      quote: "The AI doesn't feel robotic. When I logged a stressful day, the guidance was incredibly gentle. It suggested a 5-minute breathing exercise instead of pushing my planned routine.",
      fullStory: "Juggling client deadlines with parenting left me constantly on edge. The AI companion didn't give me a generic productivity checklist; it offered an empathetic ear and reminded me to pause and unclench my jaw.",
      isFeatured: false
    },
    {
      id: 4,
      category: 'Sleep & Rest',
      author: 'David W.',
      timeline: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      headline: '"A sanctuary, not a taskmaster."',
      quote: "Removing the 'streak' counter was the best thing for my mental health. Now I focus on the quality of my days, not a punishing number. ReStart feels like a sanctuary, not a taskmaster.",
      fullStory: "I used to lie awake at 2 AM worrying about uncompleted task lists. Having a calm space that prioritizes rest over relentless metrics has allowed me to sleep peacefully for the first time in years.",
      isFeatured: false
    }
  ];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <main class="flex-grow px-container-padding-mobile md:px-container-padding-desktop max-w-[1100px] mx-auto w-full pt-8 pb-24 md:pb-16">
      {/* Header Section */}
      <section class="text-center mb-12 max-w-2xl mx-auto">
        <span class="font-label-caps text-label-caps text-primary dark:text-primary-fixed tracking-widest uppercase mb-3 block">
          Community Stories
        </span>
        <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">
          Finding peace in the process.
        </h1>
        <p class="text-on-surface-variant dark:text-outline-variant text-base leading-relaxed">
          Real experiences from individuals who discovered that consistency isn't about never failing, but simply choosing to begin again.
        </p>

        {/* Category Filters */}
        <div class="flex gap-2 overflow-x-auto justify-center pb-2 pt-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              class={`px-4 py-2 rounded-full font-label-caps text-xs transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-high dark:bg-inverse-surface/60 text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Bento Grid Testimonials */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">
        {filteredStories.map((story) => {
          if (story.isFeatured) {
            return (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                class="md:col-span-2 md:row-span-2 bg-surface-container dark:bg-inverse-surface/60 rounded-3xl p-8 relative overflow-hidden group cursor-pointer border border-surface-container-high dark:border-outline/20 hover:shadow-lg transition-all"
              >
                <div class="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-transparent"></div>
                <span class="material-symbols-outlined text-5xl text-primary opacity-20 absolute top-8 right-8" style={{ fontVariationSettings: "'FILL' 1" }}>
                  format_quote
                </span>
                <div class="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span class="bg-primary-container text-on-primary-container text-[11px] font-label-caps px-3 py-1 rounded-full mb-4 inline-block font-bold">
                      {story.category}
                    </span>
                    <p class="font-headline-lg-mobile text-xl md:font-headline-lg md:text-2xl text-on-surface dark:text-on-surface mb-6 leading-snug font-semibold">
                      {story.quote}
                    </p>
                  </div>

                  <div class="flex items-center justify-between mt-6">
                    <div class="flex items-center gap-4">
                      <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                        <img alt={story.author} class="w-full h-full object-cover" src={story.avatar} />
                      </div>
                      <div>
                        <p class="font-bold text-on-background">{story.author}</p>
                        <p class="text-on-surface-variant dark:text-outline-variant text-xs">{story.timeline}</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleLike(story.id, e)}
                      class="flex items-center gap-1.5 px-4 py-2 bg-background/80 dark:bg-surface-container-high rounded-full text-xs text-primary font-bold hover:scale-105 transition-transform"
                    >
                      <span class="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        favorite
                      </span>
                      {likes[story.id]} Inspired
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-3xl p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border border-surface-container-high dark:border-outline/20"
            >
              <div>
                <div class="flex justify-between items-center mb-3">
                  <span class="bg-surface-variant dark:bg-surface-container-high text-on-surface-variant text-[10px] font-label-caps px-2.5 py-1 rounded-full font-semibold">
                    {story.category}
                  </span>
                  <span class="material-symbols-outlined text-secondary opacity-40 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    water_drop
                  </span>
                </div>
                <p class="text-on-background dark:text-on-surface text-sm mb-6 leading-relaxed">
                  {story.quote}
                </p>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-surface-variant/40 dark:border-outline/20">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img alt={story.author} class="w-full h-full object-cover" src={story.avatar} />
                  </div>
                  <div>
                    <span class="font-bold text-xs text-on-background block">{story.author}</span>
                    <span class="text-[10px] text-on-surface-variant dark:text-outline-variant">{story.timeline}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => toggleLike(story.id, e)}
                  class="flex items-center gap-1 text-xs text-primary font-semibold hover:scale-110 transition-transform"
                >
                  <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                  {likes[story.id]}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Detail Reader Modal */}
      {selectedStory && (
        <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div class="bg-background dark:bg-inverse-surface rounded-3xl p-8 max-w-xl w-full shadow-2xl relative border border-surface-variant">
            <button
              onClick={() => setSelectedStory(null)}
              class="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-variant dark:bg-surface-container-high flex items-center justify-center text-on-surface hover:scale-105 transition-transform"
            >
              <span class="material-symbols-outlined">close</span>
            </button>

            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-primary">
                <img alt={selectedStory.author} class="w-full h-full object-cover" src={selectedStory.avatar} />
              </div>
              <div>
                <h3 class="font-headline-lg-mobile text-lg text-primary dark:text-primary-fixed font-bold">
                  {selectedStory.author}
                </h3>
                <p class="text-xs text-on-surface-variant dark:text-outline-variant">{selectedStory.timeline}</p>
              </div>
            </div>

            <h4 class="font-headline-lg-mobile text-xl text-on-surface mb-4 font-semibold">
              {selectedStory.headline}
            </h4>

            <div class="text-sm text-on-surface-variant dark:text-outline-variant space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p>{selectedStory.fullStory}</p>
            </div>

            <div class="mt-8 flex justify-between items-center pt-4 border-t border-surface-variant">
              <button
                onClick={(e) => toggleLike(selectedStory.id, e)}
                class="px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-label-caps flex items-center gap-2 hover:bg-surface-tint transition-colors"
              >
                <span class="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
                {likes[selectedStory.id]} People Inspired
              </button>
              <button
                onClick={() => setSelectedStory(null)}
                class="text-xs font-label-caps text-on-surface-variant hover:text-primary"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
