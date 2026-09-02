import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function ProfileSettingsScreen() {
  const { colors, darkMode, toggleDarkMode } = useTheme();

  const [reminders, setReminders] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [restartCount, setRestartCount] = useState(6);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={[styles.profileHeader, { backgroundColor: colors.surfaceContainerLow }]}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' }}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.primary }]}>Alex Morgan</Text>
            <Text style={[styles.userBadge, { color: colors.onSurfaceVariant }]}>Sanctuary Member</Text>
            <Text style={[styles.bio, { color: colors.onSurfaceVariant }]}>
              Embracing the journey of continuous renewal. Finding balance one mindful moment at a time.
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.surfaceContainerLow }]}>
            <MaterialIcons name="restart-alt" size={24} color={colors.primary} />
            <Text style={[styles.statTitle, { color: colors.onSurfaceVariant }]}>ReStart Count</Text>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{restartCount}</Text>
            <TouchableOpacity onPress={() => setRestartCount(prev => prev + 1)} style={[styles.logBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.logBtnText}>+ Log Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.surfaceContainerLow }]}>
            <MaterialIcons name="monitoring" size={24} color={colors.secondary} />
            <Text style={[styles.statTitle, { color: colors.onSurfaceVariant }]}>Consistency</Text>
            <Text style={[styles.statNumber, { color: colors.secondary }]}>84%</Text>
            <Text style={[styles.statSub, { color: colors.onSurfaceVariant }]}>4 days active</Text>
          </View>
        </View>

        {/* Settings Sections */}
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Sanctuary Preferences</Text>

        <View style={[styles.settingCard, { backgroundColor: colors.surfaceContainerLow }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Dark Theme</Text>
              <Text style={[styles.settingSub, { color: colors.onSurfaceVariant }]}>Soft forest obsidian palette</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Gentle Reminders</Text>
              <Text style={[styles.settingSub, { color: colors.onSurfaceVariant }]}>Soft nudges for daily reset</Text>
            </View>
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.onSurface }]}>AI Emotional Insights</Text>
              <Text style={[styles.settingSub, { color: colors.onSurfaceVariant }]}>Personalized growth pattern summaries</Text>
            </View>
            <Switch
              value={aiInsights}
              onValueChange={setAiInsights}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingTextGroup}>
              <Text style={[styles.settingLabel, { color: colors.onSurface }]}>Ambient Relaxation Audio</Text>
              <Text style={[styles.settingSub, { color: colors.onSurfaceVariant }]}>Rain and forest soundscapes</Text>
            </View>
            <Switch
              value={ambientAudio}
              onValueChange={setAmbientAudio}
              trackColor={{ false: '#ccc', true: colors.primary }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: Spacing.md, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.md },
  avatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  profileInfo: { alignItems: 'center' },
  userName: { fontSize: 22, fontWeight: '700', marginBottom: 2 },
  userBadge: { fontSize: 12, fontWeight: '600', marginBottom: 8 },
  bio: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg },
  statBox: { flex: 1, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center' },
  statTitle: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },
  statNumber: { fontSize: 28, fontWeight: '800', marginVertical: 4 },
  statSub: { fontSize: 10 },
  logBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: Radius.full, marginTop: 6 },
  logBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: Spacing.sm },
  settingCard: { borderRadius: Radius.lg, padding: Spacing.md },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  settingTextGroup: { flex: 1, paddingRight: 10 },
  settingLabel: { fontSize: 14, fontWeight: '600' },
  settingSub: { fontSize: 11, marginTop: 2 }
});
