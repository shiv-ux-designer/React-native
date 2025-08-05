import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const [isWhatsAppEnabled, setIsWhatsAppEnabled] = useState(false);

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
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerRight}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000000" />
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
            <TouchableOpacity style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Ionicons name="person" size={24} color="#000000" />
                <Text style={styles.detailText}>Kinglsey Ezechukwu</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#000000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Ionicons name="call" size={24} color="#000000" />
                <Text style={styles.detailText}>+447404168963</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================
            ADDRESS SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          
          <TouchableOpacity style={styles.addressContainer}>
            <View style={styles.addressLeft}>
              <Ionicons name="location" size={24} color="#000000" />
              <View style={styles.addressTextContainer}>
                <Text style={styles.addressTitle}>Apartment 609</Text>
                <Text style={styles.addressSubtitle}>45 Soho loop street birmingham..</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            DELIVERY SLOT SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Delivery Slot</Text>
          
          <TouchableOpacity style={styles.deliverySlot}>
            <Text style={styles.deliveryText}>22 Oct, Tue, Between 06:00 AM - 07:00 AM</Text>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deliverySlot}>
            <Text style={styles.deliveryText}>Add delivery instructions</Text>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            COUPON SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Have Coupon?</Text>
          
          <TouchableOpacity style={styles.couponContainer}>
            <View style={styles.couponLeft}>
              <Ionicons name="pricetag" size={24} color="#000000" />
              <Text style={styles.couponText}>Apply Coupon</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* ========================================
            ORDER SUMMARY SECTION
            ======================================== */}
        <View style={styles.section}>
          <View style={styles.orderSummaryHeader}>
            <Text style={styles.sectionTitle}>Order Summary (12 items)</Text>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </View>
          
          <View style={styles.orderSummaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>$40.25</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Handle Charges</Text>
              <Text style={styles.summaryValue}>$0.25</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charges</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>$49.00</Text>
            </View>
            
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
            PAYMENT METHODS SECTION
            ======================================== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          <TouchableOpacity style={styles.paymentMethod}>
            <View style={styles.paymentLeft}>
              <Ionicons name="card" size={32} color="#000000" />
              <Text style={styles.paymentText}>UPI & Cards Payment</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#000000" />
          </TouchableOpacity>
          
          <View style={styles.paymentMethod}>
            <View style={styles.paymentLeft}>
              <Ionicons name="cash" size={32} color="#000000" />
              <Text style={styles.paymentText}>Cash On Delivery</Text>
            </View>
            <View style={styles.radioButton}>
              <View style={styles.radioButtonInner} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ========================================
          PLACE ORDER BUTTON
          ======================================== */}
      <View style={styles.placeOrderContainer}>
        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      
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
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  headerRight: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 150,
  },
  section: {
    marginBottom: 20,
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
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 16,
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
    fontSize: 16,
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
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#726c6c',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#726c6c',
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
  paymentMethod: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0ca201',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0ca201',
  },
  placeOrderContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  placeOrderButton: {
    backgroundColor: 'rgba(12, 162, 1, 0.8)',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
     placeOrderText: {
     color: '#ffffff',
     fontSize: 16,
     fontWeight: '600',
   },
}); 