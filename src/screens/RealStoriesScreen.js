import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function RealStoriesScreen() {
  const { colors } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);
  const [likes, setLikes] = useState({ 1: 42, 2: 19, 3: 31, 4: 56 });

  const categories = ['All', 'Burnout', 'Mindfulness', 'Zero Pressure', 'Sleep'];

  const stories = [
    {
      id: 1,
      category: 'Zero Pressure',
      author: 'Elena R.',
      timeline: 'Found consistency after 3 years',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      headline: '"The lack of pressure is what finally made it stick."',
      quote: "The lack of pressure is what finally made it stick. ReStart doesn't yell at me when I miss a day; it just quietly offers a path back.",
      fullStory: "For three years, I tried standard habit trackers with high streaks and bright red warnings whenever I missed a day. Every time I broke a 10-day streak, the guilt caused me to stop using the app for months. Switch to ReStart's 'Breathing Pulse' mindset transformed everything."
    },
    {
      id: 2,
      category: 'Burnout',
      author: 'Marcus T.',
      timeline: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      headline: '"No shame, just steady progress."',
      quote: "I used to spiral after one bad meal or skipped workout. The 'ReStart' philosophy taught me to just breathe and start fresh the next morning.",
      fullStory: "Recovering from severe tech burnout meant unlearning the idea that every minute must be optimized. ReStart helped me realize taking a rest day isn't 'failing'—it's part of the rhythm."
    },
    {
      id: 3,
      category: 'Mindfulness',
      author: 'Sarah J.',
      timeline: 'Designer & Parent',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      headline: '"The AI feels genuinely supportive."',
      quote: "The AI doesn't feel robotic. When I logged a stressful day, the guidance was incredibly gentle.",
      fullStory: "Juggling client deadlines with parenting left me constantly on edge. The AI companion offered an empathetic ear and reminded me to pause and unclench my jaw."
    },
    {
      id: 4,
      category: 'Sleep',
      author: 'David W.',
      timeline: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      headline: '"A sanctuary, not a taskmaster."',
      quote: "Removing the 'streak' counter was the best thing for my mental health. Now I focus on the quality of my days.",
      fullStory: "I used to lie awake at 2 AM worrying about uncompleted task lists. Having a calm space that prioritizes rest over relentless metrics has allowed me to sleep peacefully."
    }
  ];

  const filtered = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.kicker, { color: colors.primary }]}>COMMUNITY STORIES</Text>
          <Text style={[styles.title, { color: colors.onSurface }]}>Finding peace in the process.</Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Real experiences from individuals who discovered consistency is about choosing to begin again.
          </Text>

          {/* Category Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.chip,
                  { backgroundColor: activeCategory === cat ? colors.primary : colors.surfaceContainerHigh }
                ]}
              >
                <Text style={[styles.chipText, { color: activeCategory === cat ? colors.onPrimary : colors.onSurfaceVariant }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stories List */}
        {filtered.map(story => (
          <TouchableOpacity
            key={story.id}
            onPress={() => setSelectedStory(story)}
            style={[styles.storyCard, { backgroundColor: colors.surfaceContainerLow }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.authorGroup}>
                <Image source={{ uri: story.avatar }} style={styles.authorAvatar} />
                <View>
                  <Text style={[styles.authorName, { color: colors.onSurface }]}>{story.author}</Text>
                  <Text style={[styles.authorMeta, { color: colors.onSurfaceVariant }]}>{story.timeline}</Text>
                </View>
              </View>
              <View style={[styles.catBadge, { backgroundColor: colors.primaryContainer }]}>
                <Text style={[styles.catBadgeText, { color: colors.onPrimaryContainer }]}>{story.category}</Text>
              </View>
            </View>

            <Text style={[styles.storyQuote, { color: colors.onSurface }]}>{story.quote}</Text>

            <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => toggleLike(story.id)} style={styles.likeBtn}>
                <MaterialIcons name="favorite" size={16} color={colors.primary} />
                <Text style={[styles.likeText, { color: colors.primary }]}>{likes[story.id]} Inspired</Text>
              </TouchableOpacity>
              <Text style={[styles.readMore, { color: colors.primary }]}>Read Story →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Detail Modal */}
      {selectedStory && (
        <Modal animationType="slide" transparent visible={!!selectedStory}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <TouchableOpacity onPress={() => setSelectedStory(null)} style={styles.closeBtn}>
                <MaterialIcons name="close" size={24} color={colors.onSurface} />
              </TouchableOpacity>

              <Image source={{ uri: selectedStory.avatar }} style={styles.modalAvatar} />
              <Text style={[styles.modalAuthor, { color: colors.primary }]}>{selectedStory.author}</Text>
              <Text style={[styles.modalHeadline, { color: colors.onSurface }]}>{selectedStory.headline}</Text>
              <Text style={[styles.modalBody, { color: colors.onSurfaceVariant }]}>{selectedStory.fullStory}</Text>

              <TouchableOpacity
                onPress={() => setSelectedStory(null)}
                style={[styles.modalCloseBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: colors.onPrimary, fontWeight: '700' }}>Close Story</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: Spacing.md, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: Spacing.md },
  kicker: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 13, textAlign: 'center', paddingHorizontal: 20 },
  chipScroll: { marginVertical: 14 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full, marginRight: 8 },
  chipText: { fontSize: 12, fontWeight: '600' },
  storyCard: { borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  authorGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  authorAvatar: { width: 36, height: 36, borderRadius: 18 },
  authorName: { fontSize: 14, fontWeight: '700' },
  authorMeta: { fontSize: 10 },
  catBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.full },
  catBadgeText: { fontSize: 10, fontWeight: '700' },
  storyQuote: { fontSize: 13, lineHeight: 18, marginBottom: 12, fontStyle: 'italic' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTopWidth: 0.5, borderTopColor: '#eee' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  likeText: { fontSize: 12, fontWeight: '700' },
  readMore: { fontSize: 12, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.lg },
  modalContent: { borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', position: 'relative' },
  closeBtn: { position: 'absolute', top: 12, right: 12 },
  modalAvatar: { width: 64, height: 64, borderRadius: 32, marginBottom: 8 },
  modalAuthor: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  modalHeadline: { fontSize: 15, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  modalBody: { fontSize: 13, lineHeight: 20, textAlign: 'center', marginBottom: 20 },
  modalCloseBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: Radius.full }
});
