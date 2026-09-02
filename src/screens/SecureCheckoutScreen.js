import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Radius, Spacing } from '../constants/theme';

export default function SecureCheckoutScreen({ route, navigation }) {
  const { colors } = useTheme();

  const plan = route?.params?.plan;
  const isAnnual = route?.params?.isAnnual ?? true;

  const planName = plan ? plan.name : 'Sanctuary Pro Annual';
  const rawPrice = plan ? (isAnnual ? plan.priceAnnual : plan.priceMonthly) : '$59.99';
  const numericPrice = parseFloat(rawPrice.replace('$', '')) || 59.99;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'RESTART2026') {
      setDiscount(numericPrice * 0.2);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={20} color={colors.onSurface} />
            <Text style={[styles.backText, { color: colors.onSurface }]}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.primary }]}>Complete Your Journey</Text>
        </View>

        {/* Order Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLow }]}>
          <View style={styles.planHeader}>
            <MaterialIcons name="stars" size={24} color={colors.primary} />
            <Text style={[styles.planTitle, { color: colors.onSurface }]}>{planName}</Text>
          </View>

          <View style={[styles.trialBanner, { backgroundColor: colors.primaryContainer }]}>
            <MaterialIcons name="auto-awesome" size={16} color={colors.onPrimaryContainer} />
            <Text style={[styles.trialText, { color: colors.onPrimaryContainer }]}>
              Includes 7-Day Free Trial. Cancel anytime.
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={{ color: colors.onSurfaceVariant, fontSize: 13 }}>Plan Subtotal</Text>
            <Text style={{ color: colors.onSurface, fontWeight: '700' }}>${numericPrice.toFixed(2)}</Text>
          </View>

          {discount > 0 && (
            <View style={styles.priceRow}>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>Promo Discount (20%)</Text>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>-${discount.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.promoRow}>
            <TextInput
              style={[styles.promoInput, { backgroundColor: colors.surface, color: colors.onSurface }]}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Promo Code (RESTART2026)"
              placeholderTextColor={colors.onSurfaceVariant}
            />
            <TouchableOpacity onPress={applyPromo} style={[styles.applyBtn, { backgroundColor: colors.primary }]}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.onSurface }]}>Total Due Today</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>$0.00</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Payment Details</Text>

        <View style={[styles.formCard, { backgroundColor: colors.surfaceContainerLow }]}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
            placeholder="Email Address"
            placeholderTextColor={colors.onSurfaceVariant}
            keyboardType="email-address"
          />

          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
            placeholder="Card Number"
            placeholderTextColor={colors.onSurfaceVariant}
            keyboardType="numeric"
          />

          <View style={styles.rowInputs}>
            <TextInput
              style={[styles.halfInput, { backgroundColor: colors.surface, color: colors.onSurface }]}
              placeholder="MM / YY"
              placeholderTextColor={colors.onSurfaceVariant}
            />
            <TextInput
              style={[styles.halfInput, { backgroundColor: colors.surface, color: colors.onSurface }]}
              placeholder="CVC"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity onPress={handleCheckout} style={[styles.checkoutBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="lock" size={18} color="#fff" />
            <Text style={styles.checkoutBtnText}>
              {isProcessing ? 'Processing...' : 'Start 7-Day Free Trial'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Modal */}
      {showSuccess && (
        <Modal animationType="fade" transparent visible={showSuccess}>
          <View style={styles.modalOverlay}>
            <View style={[styles.successModal, { backgroundColor: colors.surface }]}>
              <MaterialIcons name="check-circle" size={48} color={colors.primary} />
              <Text style={[styles.successTitle, { color: colors.primary }]}>Sanctuary Unlocked!</Text>
              <Text style={[styles.successSub, { color: colors.onSurfaceVariant }]}>
                Your 7-day free trial has been activated. Explore your AI companion right away.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowSuccess(false);
                  navigation?.navigate('AiCompanion');
                }}
                style={[styles.modalOkBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Enter Sanctuary</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, gap: 10 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backText: { fontSize: 13, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '700' },
  summaryCard: { borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  planHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  planTitle: { fontSize: 18, fontWeight: '700' },
  trialBanner: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: Radius.md, gap: 6, marginBottom: 12 },
  trialText: { fontSize: 11, fontWeight: '600' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  promoRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  promoInput: { flex: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: Radius.md, fontSize: 12 },
  applyBtn: { paddingHorizontal: 14, justifyContent: 'center', borderRadius: Radius.md },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '700' },
  totalAmount: { fontSize: 24, fontWeight: '800' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: Spacing.sm },
  formCard: { borderRadius: Radius.lg, padding: Spacing.md, gap: 10 },
  input: { paddingHorizontal: 14, paddingVertical: 12, borderRadius: Radius.md, fontSize: 13 },
  rowInputs: { flexDirection: 'row', gap: 10 },
  halfInput: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, borderRadius: Radius.md, fontSize: 13 },
  checkoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: Radius.full, marginTop: 10, gap: 8 },
  checkoutBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.lg },
  successModal: { borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center' },
  successTitle: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  successSub: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  modalOkBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: Radius.full }
});
