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

const { width, height } = Dimensions.get('window');

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  unit: string;
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ cartItems?: string }>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Parse cart items from navigation parameters
  useEffect(() => {
    if (params.cartItems) {
      try {
        const parsedCartItems = JSON.parse(params.cartItems);
        // Convert the {[key: string]: number} format to CartItem[] format
        const formattedCartItems: CartItem[] = Object.entries(parsedCartItems).map(([name, quantity]) => ({
          id: name,
          name: name,
          quantity: quantity as number,
          price: 10, // Default price, you can adjust this based on your needs
          image: 'leaf',
          unit: '1 piece'
        }));
        setCartItems(formattedCartItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
      }
    }
  }, [params.cartItems]);

  const updateQuantity = (id: string, increment: boolean) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity <= 0) {
          return null; // Remove item if quantity becomes 0
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter((item): item is CartItem => item !== null));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
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
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.headerRight}>
          <Text style={styles.itemCount}>{getTotalItems()} items</Text>
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
        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <View style={styles.emptyCartIcon}>
              <Ionicons name="cart-outline" size={80} color="#0ca201" />
            </View>
            <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtitle}>Add some items to get started</Text>
            <TouchableOpacity 
              style={styles.startShoppingButton}
              onPress={() => router.push('/dashboard')}
            >
              <Text style={styles.startShoppingButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Cart Items */}
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImage}>
                  <Ionicons name={item.image as any} size={30} color="#0ca201" />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                  <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.itemControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => item.quantity === 1 ? removeItem(item.id) : updateQuantity(item.id, false)}
                  >
                    <Ionicons 
                      name={item.quantity === 1 ? "trash" : "remove"} 
                      size={18} 
                      color="#000000" 
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={() => updateQuantity(item.id, true)}
                  >
                    <Ionicons name="add" size={18} color="#000000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Free Delivery Section */}
            <View style={styles.freeDeliverySection}>
              <Text style={styles.freeDeliveryText}>Yaay!! You've got free delivery..</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>

            {/* Recommended Section */}
            <View style={styles.recommendedSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedScroll}>
                {/* Recommended items will go here */}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>

      {/* ========================================
          BOTTOM BUTTON
          ======================================== */}
      {cartItems.length > 0 && (
        <View style={styles.bottomButton}>
          <TouchableOpacity 
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.checkoutButtonText}>
              Go To Checkout (₹{getTotalPrice().toFixed(2)})
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0ca201',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f6f6f6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  itemUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#0a0b0a',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  controlButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 10,
  },
  freeDeliverySection: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  freeDeliveryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#ececec',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0ca201',
    borderRadius: 3,
    width: '100%',
  },
  recommendedSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ca201',
  },
  recommendedScroll: {
    marginLeft: -5,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  checkoutButton: {
    backgroundColor: 'rgba(12, 162, 1, 0.8)',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  emptyCartIcon: {
    marginBottom: 20,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0a0b0a',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyCartSubtitle: {
    fontSize: 16,
    color: '#0a0b0a',
    marginBottom: 30,
    textAlign: 'center',
  },
  startShoppingButton: {
    backgroundColor: '#0ca201',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  startShoppingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
}); 