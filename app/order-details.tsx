import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';

export default function OrderDetailsScreen() {
  const params = useLocalSearchParams();
  const orderId = params.orderId || 'ORD112078298';

  const orderData = {
    id: orderId,
    status: 'Order Status',
    placedDate: 'Placed today, 10:35 AM',
    paymentMethod: 'Cash On Delivery',
    totalAmount: '₹40.00',
    itemsCount: 6,
    currentStatus: 'Out for Delivery',
    items: [
      {
        id: 1,
        name: '4 bunch of banana (300g)',
        price: '₹3.45',
        quantity: 1,
        image: 'https://via.placeholder.com/73x60/FF6B6B/FFFFFF?text=Banana',
      },
      {
        id: 2,
        name: '4 bunch of banana (300g)',
        price: '₹3.45',
        quantity: 1,
        image: 'https://via.placeholder.com/73x56/4ECDC4/FFFFFF?text=Apple',
      },
      {
        id: 3,
        name: '4 bunch of banana (300g)',
        price: '₹3.45',
        quantity: 2,
        image: 'https://via.placeholder.com/73x75/45B7D1/FFFFFF?text=Orange',
      },
      {
        id: 4,
        name: 'Quadratini biscuit (300g)',
        price: '₹3.45',
        quantity: 1,
        image: 'https://via.placeholder.com/73x57/96CEB4/FFFFFF?text=Kiwi',
      },
      {
        id: 5,
        name: 'Quadratini biscuit (300g)',
        price: '₹3.45',
        quantity: 1,
        image: 'https://via.placeholder.com/73x45/FFEAA7/FF6B6B?text=Cookie',
      },
      {
        id: 6,
        name: 'Quadratini biscuit (300g)',
        price: '₹3.45',
        quantity: 2,
        image: 'https://via.placeholder.com/73x60/FF6B6B/FFFFFF?text=Biscuit',
      },
    ],
  };

  const timelineData = [
    { id: 1, title: 'Order Placed', time: '10:35 AM', status: 'completed' },
    { id: 2, title: 'Processing', time: '11:00 AM', status: 'completed' },
    { id: 3, title: 'Packed', time: '12:30 PM', status: 'completed' },
    { id: 4, title: 'Out for Delivery', time: '2:00 PM', status: 'current' },
    { id: 5, title: 'Delivered', time: '6:00 PM', status: 'pending' },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleReorder = () => {
    router.push('/dashboard');
  };

  const handleDownloadInvoice = () => {
    // Handle download invoice
    console.log('Download invoice');
  };

  const renderTimelineItem = (item) => {
    const isCompleted = item.status === 'completed';
    const isCurrent = item.status === 'current';
    const isPending = item.status === 'pending';

    return (
      <View key={item.id} style={styles.timelineItem}>
        <View style={styles.timelineLeft}>
          <View style={[
            styles.timelineDot,
            isCompleted && styles.timelineDotCompleted,
            isCurrent && styles.timelineDotCurrent,
            isPending && styles.timelineDotPending,
          ]} />
          {item.id < timelineData.length && (
            <View style={[
              styles.timelineLine,
              isCompleted && styles.timelineLineCompleted,
              isCurrent && styles.timelineLineCurrent,
            ]} />
          )}
        </View>
        <View style={styles.timelineContent}>
          <Text style={[
            styles.timelineItemTitle,
            isCompleted && styles.timelineItemTitleCompleted,
            isCurrent && styles.timelineItemTitleCurrent,
            isPending && styles.timelineItemTitlePending,
          ]}>
            {item.title}
          </Text>
          <Text style={styles.timelineTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  const renderProductItem = (item) => (
    <View key={item.id} style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Invoices</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Order Status Section */}
        <View style={styles.orderStatusSection}>
          <Text style={styles.orderDate}>{orderData.placedDate}</Text>
          <Text style={styles.orderStatusText}>{orderData.currentStatus}</Text>
        </View>

        {/* Payment Method Section */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentLeft}>
            <Ionicons name="cash-outline" size={24} color="#0ca201" />
            <Text style={styles.paymentMethod}>{orderData.paymentMethod}</Text>
          </View>
          <Text style={styles.totalAmount}>{orderData.totalAmount}</Text>
        </View>

        {/* Order Summary Section */}
        <View style={styles.orderSummarySection}>
          <View style={styles.orderSummaryLeft}>
            <Text style={styles.itemsCount}>{orderData.itemsCount} Items</Text>
            <Text style={styles.orderId}>
              Order ID : <Text style={styles.orderIdValue}>{orderData.id}</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.reorderButton} onPress={handleReorder}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadInvoice}>
            <Text style={styles.downloadButtonText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineSectionTitle}>Order Timeline</Text>
          {timelineData.map((item) => renderTimelineItem(item))}
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          {orderData.items.map((item) => renderProductItem(item))}
        </View>
      </ScrollView>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  orderStatusSection: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 10,
  },
  orderDate: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 4,
  },
  orderStatusText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0ca201',
  },
  paymentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 10,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  orderSummarySection: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: 10,
    position: 'relative',
  },
  orderSummaryLeft: {
    marginBottom: 15,
  },
  itemsCount: {
    fontSize: 10,
    color: '#000000',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: '#000000',
  },
  orderIdValue: {
    color: '#0ca201',
    fontWeight: '600',
  },
  reorderButton: {
    position: 'absolute',
    top: 20,
    right: 15,
    backgroundColor: '#0ca201',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  reorderButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  downloadButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#cccbcb',
    borderRadius: 8,
  },
  downloadButtonText: {
    color: '#2b2928',
    fontSize: 12,
    fontWeight: '600',
  },
  timelineSection: {
    marginBottom: 20,
  },
  timelineSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  timelineDotCompleted: {
    backgroundColor: '#0ca201',
  },
  timelineDotCurrent: {
    backgroundColor: '#0ca201',
  },
  timelineDotPending: {
    backgroundColor: '#f0f0f0',
  },
  timelineLine: {
    width: 2,
    height: 20,
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
  timelineItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  timelineItemTitleCompleted: {
    color: '#000000',
  },
  timelineItemTitleCurrent: {
    color: '#0ca201',
  },
  timelineItemTitlePending: {
    color: '#666666',
  },
  timelineTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  productsSection: {
    gap: 15,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    borderRadius: 10,
  },
  productImage: {
    width: 73,
    height: 73,
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#0a0b0a',
  },
  quantityContainer: {
    width: 38,
    height: 38,
    borderRadius: 38,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 5,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
}); 