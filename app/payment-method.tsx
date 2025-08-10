import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function PaymentMethodScreen() {
  const insets = useSafeAreaInsets();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const animation = useRef(new Animated.Value(0)).current;

  // Animate the screen on mount
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod) {
      // Handle payment confirmation
      router.replace('/dashboard');
    }
  };

  const paymentMethods = [
    {
      id: 'upi',
      title: 'UPI Payment',
      icon: 'phone-portrait',
      description: 'Pay using UPI apps',
    },
    {
      id: 'card',
      title: 'Pay with card',
      icon: 'card',
      description: 'Credit/Debit card',
    },
    {
      id: 'cod',
      title: 'Cash On Delivery',
      icon: 'cash',
      description: 'Pay when you receive',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#0a0b0a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerRight} />
      </View>

      {/* ========================================
          PAYMENT METHODS
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethodItem,
              selectedPaymentMethod === method.id && styles.paymentMethodItemSelected
            ]}
            onPress={() => handlePaymentMethodSelect(method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.paymentMethodLeft}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={method.icon as any} 
                  size={24} 
                  color={selectedPaymentMethod === method.id ? "#ffffff" : "#0ca201"} 
                />
              </View>
              <View style={styles.paymentMethodContent}>
                <Text style={[
                  styles.paymentMethodTitle,
                  selectedPaymentMethod === method.id && styles.paymentMethodTitleSelected
                ]}>
                  {method.title}
                </Text>
                <Text style={[
                  styles.paymentMethodDescription,
                  selectedPaymentMethod === method.id && styles.paymentMethodDescriptionSelected
                ]}>
                  {method.description}
                </Text>
              </View>
            </View>
            <View style={[
              styles.radioButton,
              selectedPaymentMethod === method.id && styles.radioButtonActive
            ]}>
              {selectedPaymentMethod === method.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ========================================
          BOTTOM SHEET ANIMATION
          ======================================== */}
      <Animated.View 
        style={[
          styles.bottomSheetOverlay,
          {
            opacity: animation,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.bottomSheetBackdrop}
          onPress={() => router.back()}
          activeOpacity={1}
        />
        <Animated.View 
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [400, 0],
                })
              }]
            }
          ]}
        >
          {/* Bottom Sheet Header */}
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHandle} />
          </View>

          {/* Payment Summary */}
          <View style={styles.paymentSummary}>
            <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>
            <View style={styles.paymentSummaryRow}>
              <Text style={styles.paymentSummaryLabel}>Total Amount</Text>
              <Text style={styles.paymentSummaryAmount}>₹49.00</Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.confirmButton,
              !selectedPaymentMethod && styles.confirmButtonDisabled
            ]}
            onPress={handleConfirmPayment}
            activeOpacity={0.7}
            disabled={!selectedPaymentMethod}
          >
            <Text style={[
              styles.confirmButtonText,
              !selectedPaymentMethod && styles.confirmButtonTextDisabled
            ]}>
              Confirm and Pay (₹49.00)
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  headerRight: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  paymentMethodItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodItemSelected: {
    borderColor: '#0ca201',
    backgroundColor: '#f8fff8',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodContent: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  paymentMethodTitleSelected: {
    color: '#0ca201',
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#666666',
  },
  paymentMethodDescriptionSelected: {
    color: '#0ca201',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: '#0ca201',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ca201',
  },
  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  bottomSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  bottomSheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d1d1',
    borderRadius: 2,
  },
  paymentSummary: {
    marginBottom: 30,
  },
  paymentSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  paymentSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paymentSummaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  paymentSummaryAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  confirmButton: {
    backgroundColor: '#0ca201',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: '#999999',
  },
}); 