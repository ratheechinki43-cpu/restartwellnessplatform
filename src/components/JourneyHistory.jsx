import React, { useState } from 'react';

export default function JourneyHistory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showLogModal, setShowLogModal] = useState(false);

  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'Today',
      title: 'Morning Flow & Breathing',
      duration: '20 min',
      category: 'ReStart Moment',
      tag: 'Refreshed',
      content: 'A gentle return to the mat. Felt stiff at first, but breathing through it helped release the tension.',
      icon: 'star',
      isHighlight: true
    },
    {
      id: 2,
      date: 'Yesterday',
      title: 'Evening Unwind with AI',
      duration: '15 min',
      category: 'AI Chat',
      tag: 'Calm',
      content: 'Shared my work stress with the companion. Realized I was carrying pressure from last week. Dropped the heavy expectation.',
      icon: 'auto_awesome',
      isHighlight: false
    },
    {
      id: 3,
      date: '3 days ago',
      title: 'Midday Mindful Reset',
      duration: '5 min',
      category: 'Breathing',
      tag: 'Grounded',
      content: 'Took a short 5-minute pause during a busy afternoon. Listened to the soft ocean ambient sounds.',
      icon: 'self_improvement',
      isHighlight: false
    },
    {
      id: 4,
      date: '5 days ago',
      title: 'Gratitude Reflection',
      duration: '10 min',
      category: 'Journal',
      tag: 'Peaceful',
      content: 'Wrote down 3 small wins today: drinking enough water, taking a walk in the sun, and speaking kindly to myself.',
      icon: 'edit_note',
      isHighlight: false
    }
  ]);

  // Form fields for new log
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('Peaceful');

  const filterOptions = ['All', 'ReStart Moment', 'AI Chat', 'Breathing', 'Journal'];

  const filteredEntries = activeFilter === 'All'
    ? entries
    : entries.filter(e => e.category === activeFilter);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      date: 'Just now',
      title: newTitle,
      duration: '5 min',
      category: 'ReStart Moment',
      tag: newTag,
      content: newContent || 'Chose to take a gentle pause and begin again.',
      icon: 'psychology',
      isHighlight: true
    };

    setEntries([newEntry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setShowLogModal(false);
  };

  return (
    <main class="flex-grow w-full max-w-[1100px] mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-8 pb-24 md:pb-16">
      {/* Header */}
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2">
            Your Journey
          </h1>
          <p class="text-on-surface-variant dark:text-outline-variant text-sm max-w-xl">
            Every step forward is a victory. Here are the moments you chose to nourish yourself.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          class="bg-primary text-on-primary rounded-full px-6 py-3 font-label-caps text-xs hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-md shrink-0 self-start md:self-auto"
        >
          <span class="material-symbols-outlined text-sm">add</span>
          Log ReStart Reflection
        </button>
      </div>

      {/* Filters */}
      <div class="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            class={`px-4 py-2 rounded-full font-label-caps text-xs transition-colors whitespace-nowrap ${
              activeFilter === f
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container-high dark:bg-inverse-surface/60 text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Timeline Section */}
      <section class="relative py-4">
        {/* Vertical Line */}
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-outline-variant/40 to-transparent -translate-x-1/2"></div>
        <div class="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-outline-variant/40"></div>

        <div class="space-y-8 relative z-10">
          {filteredEntries.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                class={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Desktop timeline marker */}
                <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary items-center justify-center shadow-md z-20 border-2 border-background">
                  <span class="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </div>

                {/* Mobile timeline marker */}
                <div class="md:hidden absolute left-4 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center z-20 top-6">
                  <span class="material-symbols-outlined text-[10px]">{item.icon}</span>
                </div>

                {/* Card Container */}
                <div class={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} pl-10 md:pl-0`}>
                  <div class="bg-surface-container-low dark:bg-inverse-surface/40 rounded-2xl p-6 hover:shadow-md transition-all border border-surface-container-high dark:border-outline/20">
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <span class="font-label-caps text-[11px] text-primary dark:text-primary-fixed block font-bold uppercase tracking-wider mb-0.5">
                          {item.date}
                        </span>
                        <h3 class="font-headline-lg-mobile text-lg text-on-background font-semibold">
                          {item.title}
                        </h3>
                      </div>
                      <span class="text-on-surface-variant dark:text-outline-variant text-xs flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">schedule</span>
                        {item.duration}
                      </span>
                    </div>

                    <p class="text-on-surface-variant dark:text-outline-variant text-xs md:text-sm mb-4 leading-relaxed">
                      {item.content}
                    </p>

                    <div class="flex gap-2 flex-wrap items-center">
                      <span class="bg-primary/10 text-primary dark:text-primary-fixed px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs">psychology</span>
                        {item.category}
                      </span>
                      <span class="bg-secondary/10 text-secondary dark:text-secondary-fixed-dim px-3 py-1 rounded-full text-[11px] font-semibold">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Log Modal */}
      {showLogModal && (
        <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-background dark:bg-inverse-surface rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-surface-variant">
            <h3 class="font-headline-lg-mobile text-xl text-primary dark:text-primary-fixed font-bold mb-2">
              Log a ReStart Moment
            </h3>
            <p class="text-xs text-on-surface-variant dark:text-outline-variant mb-6">
              Record a brief reflection or breathing session without pressure or streak metrics.
            </p>

            <form onSubmit={handleAddLog} class="space-y-4">
              <div>
                <label class="block font-label-caps text-xs text-on-surface-variant mb-1 font-bold">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 5-min Sunset Breathing"
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label class="block font-label-caps text-xs text-on-surface-variant mb-1 font-bold">Feeling Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option>Peaceful</option>
                  <option>Refreshed</option>
                  <option>Grounded</option>
                  <option>Relieved</option>
                  <option>Calm</option>
                </select>
              </div>

              <div>
                <label class="block font-label-caps text-xs text-on-surface-variant mb-1 font-bold">Reflection Notes</label>
                <textarea
                  rows="3"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="What helped you reset today?"
                  class="w-full bg-surface-container-low dark:bg-inverse-surface/80 border border-outline-variant/40 rounded-xl px-4 py-2.5 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                ></textarea>
              </div>

              <div class="flex justify-end gap-3 pt-4 border-t border-surface-variant">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  class="px-5 py-2 rounded-full text-xs font-label-caps text-on-surface-variant hover:text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-label-caps font-bold hover:bg-surface-tint transition-colors shadow-md"
                >
                  Save Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
