import React, { useState, useEffect } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CouponsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');
  const params = useLocalSearchParams<{ appliedCoupon?: string }>();
  const appliedCoupon = params.appliedCoupon || '';

  // Set the selected coupon to the applied coupon if it exists
  useEffect(() => {
    if (appliedCoupon) {
      setSelectedCoupon(appliedCoupon);
    }
  }, [appliedCoupon]);

  const couponOptions = [
    {
      id: 'SAVE20',
      title: 'SAVE20',
      description: 'Get 20% off on orders above ₹200',
      discount: '20% OFF',
      minAmount: '₹200',
      validTill: '31 Dec 2024',
      category: 'All Items',
      icon: 'pricetag',
    },
    {
      id: 'FIRST50',
      title: 'FIRST50',
      description: 'Get ₹50 off on your first order',
      discount: '₹50 OFF',
      minAmount: '₹100',
      validTill: '31 Dec 2024',
      category: 'First Order',
      icon: 'gift',
    },
    {
      id: 'FREEDEL',
      title: 'FREEDEL',
      description: 'Free delivery on orders above ₹500',
      discount: 'Free Delivery',
      minAmount: '₹500',
      validTill: '31 Dec 2024',
      category: 'Delivery',
      icon: 'car',
    },
    {
      id: 'WEEKEND25',
      title: 'WEEKEND25',
      description: '25% off on weekend orders',
      discount: '25% OFF',
      minAmount: '₹150',
      validTill: '31 Dec 2024',
      category: 'Weekend',
      icon: 'calendar',
    },
  ];

  const handleCouponSelect = (couponId: string) => {
    setSelectedCoupon(couponId);
  };

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      // Navigate back to checkout with selected coupon
      router.replace({
        pathname: '/checkout',
        params: { 
          appliedCoupon: selectedCoupon
        }
      });
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
        <Text style={styles.headerTitle}>Available Coupons</Text>
      </View>

      {/* ========================================
          SUBTITLE SECTION
          ======================================== */}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>
          Choose from our available coupons and save big on your order
        </Text>
      </View>

      {/* ========================================
          COUPON OPTIONS
          ======================================== */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {couponOptions.map((coupon) => (
          <TouchableOpacity
            key={coupon.id}
            style={[
              styles.couponItem,
              selectedCoupon === coupon.id && styles.couponItemSelected,
              appliedCoupon === coupon.id && styles.couponItemApplied
            ]}
            onPress={() => handleCouponSelect(coupon.id)}
            activeOpacity={0.7}
          >
            <View style={styles.couponLeft}>
              <View style={styles.iconContainer}>
                <Ionicons 
                  name={coupon.icon as any} 
                  size={24} 
                  color={
                    selectedCoupon === coupon.id || appliedCoupon === coupon.id
                      ? "#ffffff" 
                      : "#0ca201"
                  } 
                />
              </View>
              <View style={styles.couponContent}>
                <View style={styles.couponHeader}>
                  <Text style={[
                    styles.couponTitle,
                    selectedCoupon === coupon.id && styles.couponTitleSelected,
                    appliedCoupon === coupon.id && styles.couponTitleApplied
                  ]}>
                    {coupon.title}
                  </Text>
                  <View style={[
                    styles.discountBadge,
                    selectedCoupon === coupon.id && styles.discountBadgeSelected,
                    appliedCoupon === coupon.id && styles.discountBadgeApplied
                  ]}>
                    <Text style={[
                      styles.discountText,
                      selectedCoupon === coupon.id && styles.discountTextSelected,
                      appliedCoupon === coupon.id && styles.discountTextApplied
                    ]}>
                      {coupon.discount}
                    </Text>
                  </View>
                </View>
                <Text style={[
                  styles.couponDescription,
                  selectedCoupon === coupon.id && styles.couponDescriptionSelected,
                  appliedCoupon === coupon.id && styles.couponDescriptionApplied
                ]}>
                  {coupon.description}
                </Text>
                <View style={styles.couponDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="information-circle-outline" size={14} color="#666666" />
                    <Text style={styles.detailText}>Min. Amount: {coupon.minAmount}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={14} color="#666666" />
                    <Text style={styles.detailText}>Valid till: {coupon.validTill}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="pricetag-outline" size={14} color="#666666" />
                    <Text style={styles.detailText}>{coupon.category}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[
              styles.radioButton,
              selectedCoupon === coupon.id && styles.radioButtonActive,
              appliedCoupon === coupon.id && styles.radioButtonApplied
            ]}>
              {(selectedCoupon === coupon.id || appliedCoupon === coupon.id) && (
                <View style={[
                  styles.radioButtonInner,
                  appliedCoupon === coupon.id && styles.radioButtonInnerApplied
                ]} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ========================================
          APPLY BUTTON
          ======================================== */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            !selectedCoupon && styles.applyButtonDisabled
          ]}
          onPress={handleApplyCoupon}
          activeOpacity={0.7}
          disabled={!selectedCoupon}
        >
          <Text style={[
            styles.applyButtonText,
            !selectedCoupon && styles.applyButtonTextDisabled
          ]}>
            {appliedCoupon ? 'Coupon Applied' : 'Apply Coupon'}
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#ffffff',
    gap: 16,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  couponItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ececec',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  couponItemSelected: {
    borderColor: '#0ca201',
    backgroundColor: '#f8fff8',
  },
  couponItemApplied: {
    borderColor: '#0ca201',
    backgroundColor: '#f0fff0',
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  couponContent: {
    flex: 1,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  couponTitleSelected: {
    color: '#0ca201',
  },
  couponTitleApplied: {
    color: '#0ca201',
  },
  discountBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountBadgeSelected: {
    backgroundColor: '#0ca201',
  },
  discountBadgeApplied: {
    backgroundColor: '#0ca201',
  },
  discountText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0ca201',
  },
  discountTextSelected: {
    color: '#ffffff',
  },
  discountTextApplied: {
    color: '#ffffff',
  },
  couponDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  couponDescriptionSelected: {
    color: '#0ca201',
  },
  couponDescriptionApplied: {
    color: '#0ca201',
  },
  couponDetails: {
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#666666',
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
  radioButtonApplied: {
    borderColor: '#0ca201',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0ca201',
  },
  radioButtonInnerApplied: {
    backgroundColor: '#0ca201',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  applyButton: {
    backgroundColor: '#0ca201',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButtonTextDisabled: {
    color: '#999999',
  },
}); 