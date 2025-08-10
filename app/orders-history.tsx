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
import { router } from 'expo-router';

export default function OrdersHistoryScreen() {
  const orders = [
    {
      id: 'ORD115254235',
      status: 'Out for Delivery',
      items: [
        { id: 1, name: 'Apple', image: 'https://via.placeholder.com/67x67/FF6B6B/FFFFFF?text=Apple' },
        { id: 2, name: 'Banana', image: 'https://via.placeholder.com/68x56/4ECDC4/FFFFFF?text=Banana' },
        { id: 3, name: 'Orange', image: 'https://via.placeholder.com/72x54/45B7D1/FFFFFF?text=Orange' },
        { id: 4, name: 'Grape', image: 'https://via.placeholder.com/62x62/96CEB4/FFFFFF?text=Grape' },
        { id: 5, name: 'Strawberry', image: 'https://via.placeholder.com/62x47/FFEAA7/FF6B6B?text=Berry' },
      ],
    },
    {
      id: 'ORD115254236',
      status: 'Delivered',
      items: [
        { id: 1, name: 'Apple', image: 'https://via.placeholder.com/67x67/FF6B6B/FFFFFF?text=Apple' },
        { id: 2, name: 'Banana', image: 'https://via.placeholder.com/68x56/4ECDC4/FFFFFF?text=Banana' },
        { id: 3, name: 'Orange', image: 'https://via.placeholder.com/72x54/45B7D1/FFFFFF?text=Orange' },
        { id: 4, name: 'Grape', image: 'https://via.placeholder.com/62x62/96CEB4/FFFFFF?text=Grape' },
        { id: 5, name: 'Strawberry', image: 'https://via.placeholder.com/62x47/FFEAA7/FF6B6B?text=Berry' },
      ],
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleOrderPress = (order) => {
    router.push({
      pathname: '/order-details',
      params: { orderId: order.id }
    });
  };

  const renderOrderCard = (order) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      onPress={() => handleOrderPress(order)}
      activeOpacity={0.8}
    >
      {/* Product Images Container */}
      <View style={styles.productImagesContainer}>
        {order.items.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.image }}
            style={styles.productImage}
          />
        ))}
      </View>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderStatus}>{order.status}</Text>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderIdLabel}>Order ID:</Text>
            <Text style={styles.orderIdValue}>{order.id}</Text>
          </View>
        </View>
        <Ionicons name="chevron-up" size={24} color="#414d5c" style={styles.chevronIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders History</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Orders List */}
      <ScrollView 
        style={styles.ordersContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersContent}
      >
        {orders.map((order) => renderOrderCard(order))}
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
  ordersContainer: {
    flex: 1,
  },
  ordersContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    marginBottom: 16,
    overflow: 'hidden',
  },
  productImagesContainer: {
    backgroundColor: '#f6f6f6',
    height: 86,
    margin: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  orderDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderInfo: {
    flex: 1,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ca201',
    marginBottom: 4,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdLabel: {
    fontSize: 14,
    color: '#414d5c',
  },
  orderIdValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005f41',
    marginLeft: 8,
  },
  chevronIcon: {
    transform: [{ rotate: '180deg' }],
  },
}); 