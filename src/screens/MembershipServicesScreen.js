import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function MembershipServicesScreen({ navigation }) {
  const { colors } = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Sanctuary',
      tagline: 'Gentle introduction to daily mindfulness & basic AI check-ins.',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: 'Forever free',
      highlighted: false,
      cta: 'Get Started Free',
      features: [
        'Daily gentle mood check-in',
        '3 AI companion conversations/week',
        'Basic progress ring history',
        'Access to community stories'
      ]
    },
    {
      id: 'pro',
      name: 'Sanctuary Pro',
      tagline: 'Our most popular plan for continuous growth & guided AI companion.',
      priceMonthly: '$14.99',
      priceAnnual: '$59.99',
      period: isAnnual ? '/ year (Save 66%)' : '/ month',
      badge: 'Most Popular',
      highlighted: true,
      cta: 'Start 7-Day Free Trial',
      features: [
        'Unlimited AI Companion conversations',
        'Personalized daily reset rituals',
        'Full Journey history & mood analytics',
        'Guided breathing & ambient soundscapes',
        'Priority community resilience library',
        'Zero streak anxiety design'
      ]
    },
    {
      id: 'guidance',
      name: 'Complete Guidance',
      tagline: 'Deep restoration with 1-on-1 human wellness expert check-ins.',
      priceMonthly: '$29.99',
      priceAnnual: '$199.99',
      period: isAnnual ? '/ year' : '/ month',
      highlighted: false,
      cta: 'Choose Complete Guidance',
      features: [
        'Everything in Sanctuary Pro',
        'Monthly 1-on-1 human coaching session',
        'Customized weekly recovery action plans',
        'Direct messaging with wellness guides',
        'Exclusive sanctuary retreats & workshops'
      ]
    }
  ];

  const handleSelect = (plan) => {
    if (navigation) {
      navigation.navigate('SecureCheckout', { plan, isAnnual });
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.kicker, { color: colors.primary }]}>MEMBERSHIP SERVICES</Text>
          <Text style={[styles.title, { color: colors.onSurface }]}>Invest in your peace of mind.</Text>
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            No rigid pressure. Flexible memberships built around the ReStart philosophy.
          </Text>

          {/* Toggle */}
          <View style={[styles.toggleContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
            <TouchableOpacity
              onPress={() => setIsAnnual(false)}
              style={[styles.toggleBtn, !isAnnual && [styles.toggleActive, { backgroundColor: colors.surface }]]}
            >
              <Text style={[styles.toggleText, { color: !isAnnual ? colors.primary : colors.onSurfaceVariant }]}>
                Monthly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsAnnual(true)}
              style={[styles.toggleBtn, isAnnual && [styles.toggleActive, { backgroundColor: colors.primary }]]}
            >
              <Text style={[styles.toggleText, { color: isAnnual ? colors.onPrimary : colors.onSurfaceVariant }]}>
                Annual (Save 66%)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plans */}
        {plans.map((plan) => (
          <View
            key={plan.id}
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: plan.highlighted ? colors.primary : colors.surfaceContainerHigh },
              plan.highlighted && styles.highlightedCard
            ]}
          >
            {plan.badge && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>{plan.badge}</Text>
              </View>
            )}

            <Text style={[styles.planName, { color: colors.primary }]}>{plan.name}</Text>
            <Text style={[styles.planTagline, { color: colors.onSurfaceVariant }]}>{plan.tagline}</Text>

            <View style={styles.priceRow}>
              <Text style={[styles.price, { color: colors.onSurface }]}>
                {isAnnual ? plan.priceAnnual : plan.priceMonthly}
              </Text>
              <Text style={[styles.period, { color: colors.onSurfaceVariant }]}>{plan.period}</Text>
            </View>

            <View style={styles.divider} />

            {plan.features.map((feat, idx) => (
              <View key={idx} style={styles.featRow}>
                <MaterialIcons name="check-circle" size={18} color={colors.primary} />
                <Text style={[styles.featText, { color: colors.onSurfaceVariant }]}>{feat}</Text>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => handleSelect(plan)}
              style={[
                styles.ctaBtn,
                { backgroundColor: plan.highlighted ? colors.primary : colors.surfaceContainerHigh }
              ]}
            >
              <Text style={[styles.ctaText, { color: plan.highlighted ? colors.onPrimary : colors.onSurface }]}>
                {plan.cta}
              </Text>
              <MaterialIcons
                name="arrow-forward"
                size={16}
                color={plan.highlighted ? colors.onPrimary : colors.onSurface}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: Spacing.md, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: Spacing.lg },
  kicker: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 6 },
  subtitle: { fontSize: 13, textAlign: 'center', paddingHorizontal: 20 },
  toggleContainer: { flexDirection: 'row', borderRadius: Radius.full, padding: 4, marginTop: 16 },
  toggleBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full },
  toggleActive: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  toggleText: { fontSize: 12, fontWeight: '700' },
  card: { borderRadius: Radius.lg, padding: Spacing.lg, borderWidth: 1.5, marginBottom: Spacing.md, position: 'relative' },
  highlightedCard: { borderWidth: 2 },
  badge: { position: 'absolute', top: -12, alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.full },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  planName: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  planTagline: { fontSize: 12, marginBottom: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginBottom: 12 },
  price: { fontSize: 32, fontWeight: '800' },
  period: { fontSize: 12 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  featRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 4 },
  featText: { fontSize: 13 },
  ctaBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: Radius.full, marginTop: 16, gap: 6 },
  ctaText: { fontSize: 13, fontWeight: '700' }
});
