import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  SafeAreaView
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function AiCompanionScreen() {
  const { colors, darkMode } = useTheme();

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: "Welcome back. It's completely okay if today feels heavy. We can pause, or we can gently explore what's on your mind. How are you feeling right now?",
      time: 'Just now'
    },
    {
      id: '2',
      sender: 'user',
      text: "I feel like I've fallen off track with my goals again.",
      time: 'Just now'
    },
    {
      id: '3',
      sender: 'ai',
      text: "That is such a common feeling, and I want to validate that it can be deeply frustrating. But remember our philosophy: there is no failure here, only the opportunity to begin again.\n\nYou haven't lost your progress. You're just taking a rest. What feels like the smallest, most manageable step you could take today?",
      time: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isBreathingMode, setIsBreathingMode] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');

  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Breathing Pulse Animation loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  // Breathing session phase timer
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

  const quickReplies = [
    { text: 'I need a moment to breathe', icon: 'self-improvement', action: 'breathe' },
    { text: "I'm feeling overwhelmed", icon: 'bedtime', action: 'overwhelmed' },
    { text: 'Help me reset my day', icon: 'psychology', action: 'reset' },
    { text: 'Share a gentle affirmation', icon: 'auto-awesome', action: 'affirmation' },
  ];

  const aiResponses = {
    breathe: "Let's take a 3-second breathing reset together. Breathe in deeply... feel your lungs expand... and gently let go. You are safe in this moment.",
    overwhelmed: "When overwhelming feelings arise, try narrowing your focus. What is one thing you can touch, hear, or see right now? Let's ground ourselves first.",
    reset: "Starting fresh doesn't require waiting until tomorrow. Right now, in this second, you can choose to reset. Drink a glass of water and stretch your shoulders.",
    affirmation: "You are worthy of rest. Your value is not defined by endless productivity. Taking care of your mind is your highest achievement.",
    default: "Thank you for sharing that with me. Every small step you take towards self-compassion creates lasting resilience. How does your body feel after expressing that?"
  };

  const handleSend = (customText = null, actionKey = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    if (actionKey === 'breathe') setIsBreathingMode(true);

    setTimeout(() => {
      let replyText = aiResponses.default;
      if (actionKey && aiResponses[actionKey]) replyText = aiResponses[actionKey];

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.msgContainer, isUser ? styles.userMsgContainer : styles.aiMsgContainer]}>
        {!isUser && (
          <View style={[styles.aiAvatarSmall, { backgroundColor: colors.primaryContainer }]}>
            <MaterialIcons name="auto-awesome" size={16} color={colors.onPrimaryContainer} />
          </View>
        )}

        <View
          style={[
            styles.bubble,
            isUser
              ? [styles.userBubble, { backgroundColor: colors.primaryContainer }]
              : [styles.aiBubble, { backgroundColor: colors.surface, borderColor: colors.surfaceContainerHigh }]
          ]}
        >
          <Text style={[styles.msgText, { color: isUser ? colors.onPrimaryContainer : colors.onSurface }]}>
            {item.text}
          </Text>
          <Text style={[styles.timeText, { color: isUser ? colors.onPrimaryContainer : colors.onSurfaceVariant }]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Animated.View style={[styles.avatarPulse, { transform: [{ scale: pulseAnim }], backgroundColor: colors.primaryContainer }]}>
              <MaterialIcons name="auto-awesome" size={28} color={colors.onPrimaryContainer} />
            </Animated.View>
            <Text style={[styles.title, { color: colors.primary }]}>Here with you.</Text>
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
              Whenever you're ready, let's take a gentle step forward together.
            </Text>
          </View>

          {/* Breathing Session Banner */}
          {isBreathingMode && (
            <View style={[styles.breathingBanner, { backgroundColor: colors.primaryContainer + '20', borderColor: colors.primary }]}>
              <View style={styles.breathingLeft}>
                <View style={[styles.breathingDot, { backgroundColor: colors.primary }]}>
                  <MaterialIcons name="self-improvement" size={18} color="#fff" />
                </View>
                <View>
                  <Text style={[styles.breathingTitle, { color: colors.primary }]}>Guided Breathing Session</Text>
                  <Text style={[styles.breathingSub, { color: colors.onSurfaceVariant }]}>{breathPhase}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsBreathingMode(false)} style={[styles.endBtn, { backgroundColor: colors.surface }]}>
                <Text style={[styles.endBtnText, { color: colors.primary }]}>End</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Messages */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.listContent}
          />

          {isTyping && (
            <View style={styles.typingBox}>
              <Text style={{ color: colors.onSurfaceVariant, fontSize: 12 }}>ReStart AI is reflecting...</Text>
            </View>
          )}

          {/* Quick replies */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll}>
            {quickReplies.map((chip, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSend(chip.text, chip.action)}
                style={[styles.chip, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}
              >
                <MaterialIcons name={chip.icon} size={16} color={colors.primary} />
                <Text style={[styles.chipText, { color: colors.onSurfaceVariant }]}>{chip.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input field */}
          <View style={[styles.inputRow, { backgroundColor: colors.surfaceContainerLow, borderColor: colors.outlineVariant }]}>
            <TextInput
              style={[styles.input, { color: colors.onSurface }]}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Share what's on your mind..."
              placeholderTextColor={colors.onSurfaceVariant}
              multiline
            />
            <TouchableOpacity onPress={() => handleSend()} style={[styles.sendBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="arrow-upward" size={20} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.disclaimer, { color: colors.outline }]}>
            ReStart AI is a supportive guide, not a medical professional.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, paddingHorizontal: Spacing.md, paddingBottom: Spacing.sm },
  header: { alignItems: 'center', marginVertical: Spacing.md },
  avatarPulse: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justify: 'center', justifyContent: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, textAlign: 'center', paddingHorizontal: 20 },
  breathingBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: Radius.md, borderWidth: 1, marginBottom: 10 },
  breathingLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  breathingDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  breathingTitle: { fontSize: 13, fontWeight: '700' },
  breathingSub: { fontSize: 11 },
  endBtn: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.full },
  endBtnText: { fontSize: 11, fontWeight: '700' },
  listContent: { paddingVertical: Spacing.sm },
  msgContainer: { flexDirection: 'row', marginVertical: 6, alignItems: 'flex-start' },
  userMsgContainer: { justifyContent: 'flex-end' },
  aiMsgContainer: { justifyContent: 'flex-start' },
  aiAvatarSmall: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 8, marginTop: 4 },
  bubble: { padding: 12, borderRadius: Radius.md, maxWidth: '82%' },
  userBubble: { borderTopRightRadius: 2 },
  aiBubble: { borderTopLeftRadius: 2, borderWidth: 1 },
  msgText: { fontSize: 14, lineHeight: 20 },
  timeText: { fontSize: 9, textAlign: 'right', marginTop: 4, opacity: 0.7 },
  typingBox: { paddingHorizontal: 16, paddingVertical: 4 },
  quickScroll: { maxHeight: 44, marginVertical: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: Radius.full, borderWidth: 1, marginRight: 8, gap: 6 },
  chipText: { fontSize: 12, fontWeight: '500' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: Radius.xl, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 6 },
  input: { flex: 1, fontSize: 14, maxHeight: 80, paddingRight: 8 },
  sendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  disclaimer: { fontSize: 10, textAlign: 'center', marginTop: 6 }
});
