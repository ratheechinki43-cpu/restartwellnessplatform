import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function JourneyHistoryScreen() {
  const { colors } = useTheme();

  const [activeFilter, setActiveFilter] = useState('All');
  const [showLogModal, setShowLogModal] = useState(false);

  const [entries, setEntries] = useState([
    {
      id: '1',
      date: 'Today',
      title: 'Morning Flow & Breathing',
      duration: '20 min',
      category: 'ReStart Moment',
      tag: 'Refreshed',
      content: 'A gentle return to the mat. Felt stiff at first, but breathing through it helped release the tension.',
      icon: 'star'
    },
    {
      id: '2',
      date: 'Yesterday',
      title: 'Evening Unwind with AI',
      duration: '15 min',
      category: 'AI Chat',
      tag: 'Calm',
      content: 'Shared my work stress with the companion. Realized I was carrying pressure from last week. Dropped the heavy expectation.',
      icon: 'auto-awesome'
    },
    {
      id: '3',
      date: '3 days ago',
      title: 'Midday Mindful Reset',
      duration: '5 min',
      category: 'Breathing',
      tag: 'Grounded',
      content: 'Took a short 5-minute pause during a busy afternoon. Listened to the soft ocean ambient sounds.',
      icon: 'self-improvement'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const filterOptions = ['All', 'ReStart Moment', 'AI Chat', 'Breathing'];

  const filtered = activeFilter === 'All'
    ? entries
    : entries.filter(e => e.category === activeFilter);

  const handleAddLog = () => {
    if (!newTitle.trim()) return;

    const newEntry = {
      id: Date.now().toString(),
      date: 'Just now',
      title: newTitle,
      duration: '5 min',
      category: 'ReStart Moment',
      tag: 'Refreshed',
      content: newContent || 'Took a gentle moment to begin again.',
      icon: 'psychology'
    };

    setEntries([newEntry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setShowLogModal(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>Your Journey</Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            Every step forward is a victory. Here are the moments you chose to nourish yourself.
          </Text>

          <TouchableOpacity onPress={() => setShowLogModal(true)} style={[styles.addBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="add" size={18} color="#fff" />
            <Text style={styles.addBtnText}>Log ReStart Moment</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {filterOptions.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.chip,
                { backgroundColor: activeFilter === f ? colors.primary : colors.surfaceContainerHigh }
              ]}
            >
              <Text style={[styles.chipText, { color: activeFilter === f ? colors.onPrimary : colors.onSurfaceVariant }]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Entries */}
        {filtered.map((item) => (
          <View key={item.id} style={[styles.entryCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <View style={[styles.iconCircle, { backgroundColor: colors.primary }]}>
                  <MaterialIcons name={item.icon} size={14} color="#fff" />
                </View>
                <View>
                  <Text style={[styles.dateText, { color: colors.primary }]}>{item.date}</Text>
                  <Text style={[styles.entryTitle, { color: colors.onSurface }]}>{item.title}</Text>
                </View>
              </View>
              <Text style={[styles.duration, { color: colors.onSurfaceVariant }]}>{item.duration}</Text>
            </View>

            <Text style={[styles.entryContent, { color: colors.onSurfaceVariant }]}>{item.content}</Text>

            <View style={styles.tagRow}>
              <View style={[styles.tagBadge, { backgroundColor: colors.primaryContainer }]}>
                <Text style={[styles.tagText, { color: colors.onPrimaryContainer }]}>{item.category}</Text>
              </View>
              <View style={[styles.tagBadge, { backgroundColor: colors.secondaryContainer }]}>
                <Text style={[styles.tagText, { color: colors.onSecondaryContainer }]}>{item.tag}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Log Modal */}
      {showLogModal && (
        <Modal animationType="slide" transparent visible={showLogModal}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.primary }]}>Log ReStart Moment</Text>
              <Text style={[styles.modalSub, { color: colors.onSurfaceVariant }]}>
                Record a brief reflection without pressure or streak metrics.
              </Text>

              <TextInput
                style={[styles.modalInput, { backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }]}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Title (e.g. 5-min Sunset Breathing)"
                placeholderTextColor={colors.onSurfaceVariant}
              />

              <TextInput
                style={[styles.modalInput, styles.textArea, { backgroundColor: colors.surfaceContainerLow, color: colors.onSurface }]}
                value={newContent}
                onChangeText={setNewContent}
                placeholder="What helped you reset today?"
                placeholderTextColor={colors.onSurfaceVariant}
                multiline
              />

              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setShowLogModal(false)}>
                  <Text style={[styles.cancelText, { color: colors.onSurfaceVariant }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddLog} style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>Save Reflection</Text>
                </TouchableOpacity>
              </View>
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
  header: { marginBottom: Spacing.md },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, marginBottom: 12 },
  addBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full, gap: 6 },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  chipScroll: { marginBottom: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full, marginRight: 8 },
  chipText: { fontSize: 12, fontWeight: '600' },
  entryCard: { borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconCircle: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  dateText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  entryTitle: { fontSize: 15, fontWeight: '700' },
  duration: { fontSize: 11 },
  entryContent: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
  tagRow: { flexDirection: 'row', gap: 8 },
  tagBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.full },
  tagText: { fontSize: 10, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.lg },
  modalContent: { borderRadius: Radius.lg, padding: Spacing.lg },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  modalSub: { fontSize: 12, marginBottom: 12 },
  modalInput: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: Radius.md, fontSize: 13, marginBottom: 10 },
  textArea: { height: 80, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 16, marginTop: 10 },
  cancelText: { fontSize: 13, fontWeight: '600' },
  saveBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: Radius.full }
});
