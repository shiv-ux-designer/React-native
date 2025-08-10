import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(false);
  const [isPaymentMethodVisible, setIsPaymentMethodVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const params = useLocalSearchParams<{ selectedSlot?: string; deliveryInstructions?: string; appliedCoupon?: string }>();
  const selectedDeliverySlot = params.selectedSlot || '';
  const deliveryInstructions = params.deliveryInstructions ? JSON.parse(params.deliveryInstructions) : null;
  const appliedCoupon = params.appliedCoupon || '';
  
  // Animation for payment method bottom sheet
  const paymentAnimation = useRef(new Animated.Value(0)).current;

  const handleDeliverySlotSelect = () => {
    router.push('/delivery-slot');
  };

  const handleDeliveryInstructionsSelect = () => {
    router.push('/delivery-instructions');
  };

  const handleCouponSelect = () => {
    router.push('/coupons');
  };

  // Mock function to get the selected slot - in a real app, this would come from navigation params or context
  const getSelectedSlotDisplay = () => {
    if (selectedDeliverySlot) {
      // Map slot IDs to display text
      const slotMap: { [key: string]: string } = {
        '1': '06:00 AM - 07:00 AM',
        '2': '09:00 AM - 10:00 AM',
        '3': '12:00 PM - 02:00 PM',
        '4': '04:00 PM - 07:00 PM',
        '5': '08:00 PM - 10:00 PM',
      };
      return slotMap[selectedDeliverySlot] || 'Select Delivery Slot';
    }
    return 'Select Delivery Slot';
  };

  // Function to get delivery instructions display text and icon
  const getDeliveryInstructionsDisplay = () => {
    if (deliveryInstructions) {
      const { selected, other } = deliveryInstructions;
      
      // If user selected a predefined option
      if (selected && selected.length > 0) {
        const selectedOption = instructionOptionsMap[selected[0]];
        return selectedOption || 'Add Delivery Instructions';
      }
      
      // If user wrote custom instructions
      if (other && other.trim()) {
        return other.length > 30 ? `${other.substring(0, 30)}...` : other;
      }
    }
    return 'Add Delivery Instructions';
  };

  // Function to get the icon for delivery instructions
  const getDeliveryInstructionsIcon = () => {
    if (deliveryInstructions) {
      const { selected, other } = deliveryInstructions;
      
      // If user selected a predefined option
      if (selected && selected.length > 0) {
        const iconMap: { [key: string]: any } = {
          'beware-pets': 'paw',
          'security-guard': 'shield',
          'door': 'home',
        };
        return iconMap[selected[0]] || 'chatbubble-outline';
      }
      
      // If user wrote custom instructions
      if (other && other.trim()) {
        return 'chatbubble-outline';
      }
    }
    return 'chatbubble-outline';
  };

  // Map for instruction options
  const instructionOptionsMap: { [key: string]: string } = {
    'beware-pets': 'Beware of Pets',
    'security-guard': 'Leave with security guard',
    'door': 'Leave at door',
  };

  // Function to get coupon display text
  const getCouponDisplay = () => {
    if (appliedCoupon) {
      const couponMap: { [key: string]: string } = {
        'SAVE20': 'SAVE20 - 20% OFF',
        'FIRST50': 'FIRST50 - ₹50 OFF',
        'FREEDEL': 'FREEDEL - Free Delivery',
        'WEEKEND25': 'WEEKEND25 - 25% OFF',
      };
      return couponMap[appliedCoupon] || 'Apply Coupon';
    }
    return 'Apply Coupon';
  };

  // Function to calculate coupon savings
  const getCouponSavings = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = 50.25; // Mock subtotal amount
    const couponSavingsMap: { [key: string]: number } = {
      'SAVE20': subtotal * 0.20, // 20% off
      'FIRST50': 50, // ₹50 off
      'FREEDEL': 4, // Free delivery (delivery charge)
      'WEEKEND25': subtotal * 0.25, // 25% off
    };
    
    return couponSavingsMap[appliedCoupon] || 0;
  };

  // Function to get coupon savings display text
  const getCouponSavingsDisplay = () => {
    const savings = getCouponSavings();
    if (savings > 0) {
      return `-₹${savings.toFixed(2)}`;
    }
    return '';
  };

  // Function to get delivery charge display
  const getDeliveryChargeDisplay = () => {
    if (appliedCoupon === 'FREEDEL') {
      return '₹0.00';
    }
    return '₹4.00';
  };

  // Function to calculate grand total with coupon savings
  const getGrandTotal = () => {
    const subtotal = 40.25; // After existing discounts
    const couponSavings = getCouponSavings();
    const deliveryCharge = appliedCoupon === 'FREEDEL' ? 0 : 4.00;
    const handlingCharge = 5.00;
    
    const grandTotal = subtotal - couponSavings + deliveryCharge + handlingCharge;
    return Math.max(0, grandTotal); // Ensure total is not negative
  };

  // Function to calculate total savings including coupon savings
  const getTotalSavings = () => {
    const existingSavings = 35.00; // Existing savings from other discounts
    const couponSavings = getCouponSavings();
    return existingSavings + couponSavings;
  };

  const handleChoosePaymentMethod = () => {
    setIsPaymentMethodVisible(true);
    Animated.timing(paymentAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closePaymentMethod = () => {
    Animated.timing(paymentAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsPaymentMethodVisible(false);
    });
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (selectedPaymentMethod) {
      // Handle payment confirmation
      closePaymentMethod();
      router.push('/order-confirmation');
    }
  };

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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerRight}>
          <Ionicons name="create" size={24} color="#0ca201" />
        </View>
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ========================================
            DETAILS SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Ionicons name="person" size={24} color="#0ca201" />
                <Text style={styles.detailText}>Kinglsey Ezechukwu</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Ionicons name="call" size={24} color="#0ca201" />
                <Text style={styles.detailText}>+447404168963</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ========================================
            ADDRESS SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          
          <View style={styles.addressContainer}>
            <View style={styles.addressLeft}>
              <Ionicons name="location" size={24} color="#0ca201" />
              <View style={styles.addressTextContainer}>
                <Text style={styles.addressTitle}>Apartment 609</Text>
                <Text style={styles.addressSubtitle}>45 Soho loop street birmingham..</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ========================================
            DELIVERY SLOT SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Delivery Slot</Text>
          
          <TouchableOpacity 
            style={styles.deliverySlot} 
            activeOpacity={0.7}
            onPress={handleDeliverySlotSelect}
          >
            <View style={styles.deliverySlotLeft}>
              <Ionicons name="time" size={24} color="#0ca201" />
              <Text style={styles.deliveryText}>{getSelectedSlotDisplay()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            ADD DELIVERY INSTRUCTIONS SECTION
            ======================================== */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.deliveryInstructions} 
            activeOpacity={0.7}
            onPress={handleDeliveryInstructionsSelect}
          >
            <View style={styles.deliveryInstructionsLeft}>
              <Ionicons name={getDeliveryInstructionsIcon() as any} size={24} color="#0ca201" />
              <Text style={styles.deliveryInstructionsText}>{getDeliveryInstructionsDisplay()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            COUPON SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have Coupon?</Text>
          
          <TouchableOpacity 
            style={styles.couponContainer} 
            activeOpacity={0.7}
            onPress={handleCouponSelect}
          >
            <View style={styles.couponLeft}>
              <Ionicons name="pricetag" size={24} color="#0ca201" />
              <Text style={styles.couponText}>{getCouponDisplay()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#0ca201" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            ORDER SUMMARY SECTION
            ======================================== */}
        <View style={styles.section}>
          <View style={styles.orderSummaryHeader}>
            <Text style={styles.sectionTitle}>Order Summary (12 items)</Text>
          </View>
          
          <View style={styles.orderSummaryContainer}>
            {/* Subtotal with savings */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryLeft}>
                <Ionicons name="cart" size={20} color="#0ca201" />
                <Text style={styles.summaryLabel}>Subtotal</Text>
              </View>
              <View style={styles.summaryRight}>
                <View style={styles.savingsBadge}>
                  <Text style={styles.savingsText}>Saved ₹10</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>₹50.25</Text>
                  <Text style={styles.finalPrice}>₹40.25</Text>
                </View>
              </View>
            </View>

            {/* Coupon Savings */}
            {appliedCoupon && getCouponSavings() > 0 && (
              <View style={styles.summaryRow}>
                <View style={styles.summaryLeft}>
                  <Ionicons name="pricetag" size={20} color="#0ca201" />
                  <Text style={styles.summaryLabel}>Coupon Savings</Text>
                </View>
                <Text style={styles.couponSavingsText}>{getCouponSavingsDisplay()}</Text>
              </View>
            )}

            {/* Delivery Charge */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryLeft}>
                <Ionicons name="car" size={20} color="#0ca201" />
                <Text style={styles.summaryLabel}>Delivery Charge</Text>
              </View>
              <Text style={styles.summaryValue}>{getDeliveryChargeDisplay()}</Text>
            </View>

            {/* Handling Charge */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryLeft}>
                <Ionicons name="bag" size={20} color="#0ca201" />
                <Text style={styles.summaryLabel}>Handling Charge</Text>
              </View>
              <Text style={styles.summaryValue}>₹5.00</Text>
            </View>

            {/* Grand Total */}
            <View style={styles.summaryRow}>
              <Text style={styles.grandTotalLabel}>Grand Total</Text>
              <Text style={styles.grandTotalValue}>₹{getGrandTotal().toFixed(2)}</Text>
            </View>

            {/* Total Savings */}
            <View style={styles.summaryRow}>
              <View style={styles.savingsContainer}>
                <Text style={styles.savingsLabel}>Your total saving</Text>
                <Text style={styles.savingsSubLabel}>
                  Includes ₹25 saving through free delivery
                  {appliedCoupon && getCouponSavings() > 0 && ` & ₹${getCouponSavings().toFixed(2)} coupon savings`}
                </Text>
              </View>
              <Text style={styles.savingsAmount}>₹{getTotalSavings().toFixed(2)}</Text>
            </View>

            {/* WhatsApp Invoice */}
            <View style={styles.whatsappContainer}>
              <Text style={styles.whatsappText}>Send Invoice via WhatsApp</Text>
              <TouchableOpacity 
                style={[styles.toggleButton, isWhatsAppEnabled && styles.toggleButtonActive]}
                onPress={() => setIsWhatsAppEnabled(!isWhatsAppEnabled)}
              >
                <View style={[styles.toggleCircle, isWhatsAppEnabled && styles.toggleCircleActive]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ========================================
            CANCELLATION POLICY SECTION
            ======================================== */}
        <View style={styles.section}>
          <View style={styles.cancellationContainer}>
            <Text style={styles.cancellationTitle}>Cancellation Policy</Text>
            <Text style={styles.cancellationText}>
              Once your order is packed for delivery, cancellations will not be possible. 
              In case of unforeseen delays, eligible refunds will be processed accordingly. 
              We offer replacements only in case of damages or product issues.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ========================================
          CHOOSE PAYMENT METHOD BUTTON
          ======================================== */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.choosePaymentButton} activeOpacity={0.7} onPress={handleChoosePaymentMethod}>
          <Text style={styles.choosePaymentText}>Choose Payment Method</Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
          PAYMENT METHOD BOTTOM SHEET
          ======================================== */}
      {isPaymentMethodVisible && (
        <Animated.View 
          style={[
            styles.paymentMethodOverlay,
            {
              opacity: paymentAnimation,
            }
          ]}
        >
          <TouchableOpacity 
            style={styles.paymentMethodBackdrop}
            onPress={closePaymentMethod}
            activeOpacity={1}
          />
          <Animated.View 
            style={[
              styles.paymentMethodContainer,
              {
                transform: [{
                  translateY: paymentAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 0],
                  })
                }]
              }
            ]}
          >
            {/* Bottom Sheet Header */}
            <View style={styles.paymentMethodHeader}>
              <View style={styles.paymentMethodHandle} />
              <Text style={styles.paymentMethodTitle}>Payment Method</Text>
            </View>

            {/* Payment Methods */}
            <ScrollView style={styles.paymentMethodsScroll} showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={[
                  styles.paymentMethodItem,
                  selectedPaymentMethod === 'upi' && styles.paymentMethodItemSelected
                ]}
                onPress={() => handlePaymentMethodSelect('upi')}
                activeOpacity={0.7}
              >
                <View style={styles.paymentMethodItemLeft}>
                  <View style={styles.paymentMethodIconContainer}>
                    <Ionicons name="phone-portrait" size={24} color={selectedPaymentMethod === 'upi' ? "#ffffff" : "#0ca201"} />
                  </View>
                  <View style={styles.paymentMethodItemContent}>
                    <Text style={[
                      styles.paymentMethodItemTitle,
                      selectedPaymentMethod === 'upi' && styles.paymentMethodItemTitleSelected
                    ]}>
                      UPI Payment
                    </Text>
                    <Text style={[
                      styles.paymentMethodItemDescription,
                      selectedPaymentMethod === 'upi' && styles.paymentMethodItemDescriptionSelected
                    ]}>
                      Pay using UPI apps
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.paymentMethodRadioButton,
                  selectedPaymentMethod === 'upi' && styles.paymentMethodRadioButtonActive
                ]}>
                  {selectedPaymentMethod === 'upi' && (
                    <View style={styles.paymentMethodRadioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentMethodItem,
                  selectedPaymentMethod === 'card' && styles.paymentMethodItemSelected
                ]}
                onPress={() => handlePaymentMethodSelect('card')}
                activeOpacity={0.7}
              >
                <View style={styles.paymentMethodItemLeft}>
                  <View style={styles.paymentMethodIconContainer}>
                    <Ionicons name="card" size={24} color={selectedPaymentMethod === 'card' ? "#ffffff" : "#0ca201"} />
                  </View>
                  <View style={styles.paymentMethodItemContent}>
                    <Text style={[
                      styles.paymentMethodItemTitle,
                      selectedPaymentMethod === 'card' && styles.paymentMethodItemTitleSelected
                    ]}>
                      Pay with card
                    </Text>
                    <Text style={[
                      styles.paymentMethodItemDescription,
                      selectedPaymentMethod === 'card' && styles.paymentMethodItemDescriptionSelected
                    ]}>
                      Credit/Debit card
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.paymentMethodRadioButton,
                  selectedPaymentMethod === 'card' && styles.paymentMethodRadioButtonActive
                ]}>
                  {selectedPaymentMethod === 'card' && (
                    <View style={styles.paymentMethodRadioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentMethodItem,
                  selectedPaymentMethod === 'cod' && styles.paymentMethodItemSelected
                ]}
                onPress={() => handlePaymentMethodSelect('cod')}
                activeOpacity={0.7}
              >
                <View style={styles.paymentMethodItemLeft}>
                  <View style={styles.paymentMethodIconContainer}>
                    <Ionicons name="cash" size={24} color={selectedPaymentMethod === 'cod' ? "#ffffff" : "#0ca201"} />
                  </View>
                  <View style={styles.paymentMethodItemContent}>
                    <Text style={[
                      styles.paymentMethodItemTitle,
                      selectedPaymentMethod === 'cod' && styles.paymentMethodItemTitleSelected
                    ]}>
                      Cash On Delivery
                    </Text>
                    <Text style={[
                      styles.paymentMethodItemDescription,
                      selectedPaymentMethod === 'cod' && styles.paymentMethodItemDescriptionSelected
                    ]}>
                      Pay when you receive
                    </Text>
                  </View>
                </View>
                <View style={[
                  styles.paymentMethodRadioButton,
                  selectedPaymentMethod === 'cod' && styles.paymentMethodRadioButtonActive
                ]}>
                  {selectedPaymentMethod === 'cod' && (
                    <View style={styles.paymentMethodRadioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Confirm Button */}
            <TouchableOpacity
              style={[
                styles.paymentMethodConfirmButton,
                !selectedPaymentMethod && styles.paymentMethodConfirmButtonDisabled
              ]}
              onPress={handleConfirmPayment}
              activeOpacity={0.7}
              disabled={!selectedPaymentMethod}
            >
              <Text style={[
                styles.paymentMethodConfirmButtonText,
                !selectedPaymentMethod && styles.paymentMethodConfirmButtonTextDisabled
              ]}>
                Place Order (₹{getGrandTotal().toFixed(2)})
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
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
    backdropFilter: 'blur(10px)',
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
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    overflow: 'hidden',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  detailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  addressContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  addressSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  deliverySlot: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  deliverySlotLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: '#000000',
  },
  deliveryInstructions: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  deliveryInstructionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deliveryInstructionsText: {
    fontSize: 14,
    color: '#000000',
  },
  couponContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  couponText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  orderSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  orderSummaryContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2b2928',
  },
  savingsBadge: {
    backgroundColor: '#f6f6f6',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: '#cccbcb',
  },
  savingsText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#0ca201',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: 'rgba(114,108,108,0.8)',
    textDecorationLine: 'line-through',
  },
  finalPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2b2928',
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  savingsContainer: {
    flex: 1,
  },
  savingsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0ca201',
  },
  savingsSubLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    marginTop: 2,
  },
  savingsAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ca201',
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f6f6f6',
  },
  whatsappText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  toggleButton: {
    width: 40,
    height: 24,
    backgroundColor: '#cccbcb',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButtonActive: {
    backgroundColor: '#0ca201',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  toggleCircleActive: {
    transform: [{ translateX: 16 }],
  },
  cancellationContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    padding: 15,
  },
  cancellationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  cancellationText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  choosePaymentButton: {
    backgroundColor: 'rgba(12, 162, 1, 0.8)',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
  choosePaymentText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  couponSavingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff0000',
  },
  paymentMethodOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    justifyContent: 'flex-end',
  },
  paymentMethodBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  paymentMethodContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentMethodHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  paymentMethodHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#d1d1d1',
    borderRadius: 2,
    marginBottom: 10,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  paymentMethodsScroll: {
    maxHeight: 300,
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
  paymentMethodItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  paymentMethodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodItemContent: {
    flex: 1,
  },
  paymentMethodItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  paymentMethodItemTitleSelected: {
    color: '#0ca201',
  },
  paymentMethodItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  paymentMethodItemDescriptionSelected: {
    color: '#0ca201',
  },
  paymentMethodRadioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentMethodRadioButtonActive: {
    borderColor: '#0ca201',
  },
  paymentMethodRadioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ca201',
  },
  paymentMethodConfirmButton: {
    backgroundColor: '#0ca201',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentMethodConfirmButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  paymentMethodConfirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethodConfirmButtonTextDisabled: {
    color: '#999999',
  },
}); 