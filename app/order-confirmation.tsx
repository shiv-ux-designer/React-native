import React, { useEffect, useRef } from 'react';
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

export default function OrderConfirmationScreen() {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate screen entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoToHome = () => {
    router.replace('/dashboard');
  };

  const handleViewOrders = () => {
    router.push('/orders-history');
  };

  const timelineData = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order has been successfully placed',
      icon: 'checkmark-circle',
      status: 'completed',
      time: '2:30 PM',
    },
    {
      id: 2,
      title: 'Order Processing',
      description: 'We are preparing your order',
      icon: 'settings',
      status: 'completed',
      time: '2:35 PM',
    },
    {
      id: 3,
      title: 'Packed',
      description: 'Your order has been packed and ready',
      icon: 'cube',
      status: 'completed',
      time: '3:00 PM',
    },
    {
      id: 4,
      title: 'Out for Delivery',
      description: 'Your order is on its way',
      icon: 'car',
      status: 'current',
      time: '4:30 PM',
    },
    {
      id: 5,
      title: 'Delivered',
      description: 'Order delivered successfully',
      icon: 'home',
      status: 'pending',
      time: '6:00 PM',
    },
  ];

  const renderTimelineItem = (item, index) => {
    const isCompleted = item.status === 'completed';
    const isCurrent = item.status === 'current';
    const isPending = item.status === 'pending';

    return (
      <View key={item.id} style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <View style={[
            styles.timelineIcon,
            isCompleted && styles.timelineIconCompleted,
            isCurrent && styles.timelineIconCurrent,
            isPending && styles.timelineIconPending,
          ]}>
            <Ionicons 
              name={item.icon} 
              size={20} 
              color={isCompleted ? '#ffffff' : isCurrent ? '#ffffff' : '#cccccc'} 
            />
          </View>
          {index < timelineData.length - 1 && (
            <View style={[
              styles.timelineLine,
              isCompleted && styles.timelineLineCompleted,
              isCurrent && styles.timelineLineCurrent,
            ]} />
          )}
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineHeader}>
            <Text style={[
              styles.timelineTitle,
              isCompleted && styles.timelineTitleCompleted,
              isCurrent && styles.timelineTitleCurrent,
              isPending && styles.timelineTitlePending,
            ]}>
              {item.title}
            </Text>
            <Text style={styles.timelineTime}>{item.time}</Text>
          </View>
          <Text style={[
            styles.timelineDescription,
            isCompleted && styles.timelineDescriptionCompleted,
            isCurrent && styles.timelineDescriptionCurrent,
            isPending && styles.timelineDescriptionPending,
          ]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { translateY: slideAnim }
              ]
            }
          ]}
        >
          {/* Success Icon */}
          <View style={styles.successIconContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={60} color="#ffffff" />
            </View>
            <View style={styles.successGlow} />
          </View>

          {/* Order Confirmed Text */}
          <Text style={styles.orderConfirmedText}>Order Confirmed!</Text>
          <Text style={styles.orderNumberText}>Order #123456789</Text>
          
          {/* Order Details */}
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailItem}>
              <View style={styles.orderDetailIconContainer}>
                <Ionicons name="time-outline" size={24} color="#0ca201" />
              </View>
              <View style={styles.orderDetailContent}>
                <Text style={styles.orderDetailLabel}>Estimated Delivery</Text>
                <Text style={styles.orderDetailValue}>Today, 6:00 PM - 7:00 PM</Text>
              </View>
            </View>

            <View style={styles.orderDetailItem}>
              <View style={styles.orderDetailIconContainer}>
                <Ionicons name="location-outline" size={24} color="#0ca201" />
              </View>
              <View style={styles.orderDetailContent}>
                <Text style={styles.orderDetailLabel}>Delivery Address</Text>
                <Text style={styles.orderDetailValue}>Apartment 609, 45 Soho loop street birmingham..</Text>
              </View>
            </View>

            <View style={styles.orderDetailItem}>
              <View style={styles.orderDetailIconContainer}>
                <Ionicons name="card-outline" size={24} color="#0ca201" />
              </View>
              <View style={styles.orderDetailContent}>
                <Text style={styles.orderDetailLabel}>Payment Method</Text>
                <Text style={styles.orderDetailValue}>UPI Payment</Text>
              </View>
            </View>
          </View>

          {/* Order Timeline */}
          <View style={styles.timelineContainer}>
            <Text style={styles.timelineTitle}>Order Timeline</Text>
            {timelineData.map((item, index) => renderTimelineItem(item, index))}
          </View>

          {/* Order Summary */}
          <View style={styles.orderSummaryContainer}>
            <Text style={styles.orderSummaryTitle}>Order Summary</Text>
            <View style={styles.orderSummaryItem}>
              <Text style={styles.orderSummaryLabel}>Items (12)</Text>
              <Text style={styles.orderSummaryValue}>₹40.25</Text>
            </View>
            <View style={styles.orderSummaryItem}>
              <Text style={styles.orderSummaryLabel}>Delivery Charge</Text>
              <Text style={styles.orderSummaryValue}>₹4.00</Text>
            </View>
            <View style={styles.orderSummaryItem}>
              <Text style={styles.orderSummaryLabel}>Handling Charge</Text>
              <Text style={styles.orderSummaryValue}>₹5.00</Text>
            </View>
            <View style={[styles.orderSummaryItem, styles.totalItem]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹49.25</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGoToHome}
              activeOpacity={0.8}
            >
              <Ionicons name="home-outline" size={20} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Go to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleViewOrders}
              activeOpacity={0.8}
            >
              <Ionicons name="list-outline" size={20} color="#0ca201" />
              <Text style={styles.secondaryButtonText}>View Orders</Text>
            </TouchableOpacity>
          </View>

          {/* Thank You Message */}
          <View style={styles.thankYouContainer}>
            <Text style={styles.thankYouText}>Thank you for your order!</Text>
            <Text style={styles.thankYouSubText}>
              We'll send you updates about your order status via SMS and email.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  successIconContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0ca201',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0ca201',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 2,
  },
  successGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 70,
    backgroundColor: '#0ca201',
    opacity: 0.2,
    zIndex: 1,
  },
  orderConfirmedText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  orderNumberText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  orderDetailsContainer: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderDetailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  orderDetailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderDetailContent: {
    flex: 1,
    marginLeft: 12,
  },
  orderDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  orderDetailValue: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  timelineContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  timelineIconCompleted: {
    backgroundColor: '#0ca201',
  },
  timelineIconCurrent: {
    backgroundColor: '#0ca201',
  },
  timelineIconPending: {
    backgroundColor: '#f0f0f0',
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: '#f0f0f0',
    marginTop: 4,
  },
  timelineLineCompleted: {
    backgroundColor: '#0ca201',
  },
  timelineLineCurrent: {
    backgroundColor: '#0ca201',
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  timelineTitleCompleted: {
    color: '#000000',
  },
  timelineTitleCurrent: {
    color: '#0ca201',
  },
  timelineTitlePending: {
    color: '#666666',
  },
  timelineTime: {
    fontSize: 12,
    color: '#999999',
  },
  timelineDescription: {
    fontSize: 14,
    color: '#666666',
  },
  timelineDescriptionCompleted: {
    color: '#666666',
  },
  timelineDescriptionCurrent: {
    color: '#0ca201',
  },
  timelineDescriptionPending: {
    color: '#999999',
  },
  orderSummaryContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  orderSummaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderSummaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  orderSummaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0ca201',
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#0ca201',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0ca201',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#0ca201',
  },
  secondaryButtonText: {
    color: '#0ca201',
    fontSize: 16,
    fontWeight: '600',
  },
  thankYouContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  thankYouSubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 