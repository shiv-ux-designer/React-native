import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ReorderScreen() {
  const insets = useSafeAreaInsets();

  // Sample reorder data
  const reorderData = {
    veggies: [
      { id: 1, name: 'Tomatoes (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 2, name: 'Dark Chilli (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 3, name: 'Capsicum (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 4, name: 'Cauliflower (1Pcs)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 5, name: 'Carrot (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 6, name: 'Cucumber (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 7, name: 'Lady Finger (1kg)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
      { id: 8, name: 'Ginger (250g)', price: '$3.45', rating: '4.8 (287)', quantity: 1 },
    ],
    fruits: [
      { id: 9, name: 'Banana (6Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
      { id: 10, name: 'Apple (6Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
      { id: 11, name: 'Orange (6Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
      { id: 12, name: 'Strawberry (6Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
      { id: 13, name: 'Kiwi (6Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
      { id: 14, name: 'Watermelon (1Pcs)', price: '$3.99', rating: '4.8 (287)', quantity: 1 },
    ]
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 25 }]}>
        <TouchableOpacity 
          style={styles.locationContainer}
          onPress={() => router.push('/location')}
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={20} color="#000000" />
          <Text style={styles.locationText}>61 Hopper street..</Text>
          <Ionicons name="chevron-down" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={() => router.push('/search')}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={20} color="#a2a2a2" />
          <Text style={styles.searchPlaceholder}>Search "Pui Saag"</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Reorder Message */}
        <View style={styles.reorderMessageContainer}>
          <Text style={styles.reorderTitle}>Reordering will be easy</Text>
          <View style={styles.reorderImageContainer}>
            <View style={styles.reorderImage}>
              <Ionicons name="refresh" size={80} color="#0ca201" />
            </View>
          </View>
          <Text style={styles.reorderSubtitle}>
            Items you order will show up here so you can buy{'\n'}them again easily
          </Text>
        </View>

        {/* Veggies Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Veggies</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {reorderData.veggies.map((product, index) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#000000" />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#ffd500" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="remove" size={18} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{product.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="add" size={18} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* View All Products */}
        <TouchableOpacity style={styles.viewAllContainer}>
          <View style={styles.viewAllContent}>
            <View style={styles.productIcons}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.productIcon}>
                  <Ionicons name="leaf" size={20} color="#0ca201" />
                </View>
              ))}
            </View>
            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllText}>View all products</Text>
              <Ionicons name="chevron-forward" size={16} color="#0a0b0a" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Fruits Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fruits</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {reorderData.fruits.map((product, index) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImageContainer}>
                <View style={styles.productImage}>
                  <Ionicons name="leaf" size={40} color="#0ca201" />
                </View>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>10% Off</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#000000" />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#ffd500" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="remove" size={18} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{product.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="add" size={18} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* View All Products */}
        <TouchableOpacity style={styles.viewAllContainer}>
          <View style={styles.viewAllContent}>
            <View style={styles.productIcons}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={styles.productIcon}>
                  <Ionicons name="leaf" size={20} color="#0ca201" />
                </View>
              ))}
            </View>
            <View style={styles.viewAllTextContainer}>
              <Text style={styles.viewAllText}>View all products</Text>
              <Ionicons name="chevron-forward" size={16} color="#0a0b0a" />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNavigation, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/dashboard')}
        >
          <Ionicons name="home" size={26} color="#000000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/favourites')}
        >
          <Ionicons name="heart" size={26} color="#000000" />
          <Text style={styles.navText}>Favourite</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, { backgroundColor: 'rgba(12, 162, 1, 0.1)' }]}
        >
          <Ionicons name="refresh" size={26} color="#0ca201" />
          <Text style={[styles.navText, { color: '#0ca201' }]}>Reorders</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="menu" size={26} color="#000000" />
          <Text style={styles.navText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  profileButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    gap: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#a2a2a2',
  },
  scrollView: {
    flex: 1,
  },
  reorderMessageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  reorderTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0ca201',
    marginBottom: 20,
  },
  reorderImageContainer: {
    width: 168,
    height: 168,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  reorderImage: {
    width: 168,
    height: 168,
    backgroundColor: '#f6f6f6',
    borderRadius: 84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reorderSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  productsScroll: {
    paddingHorizontal: 15,
  },
  productCard: {
    width: 170,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 147,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountTag: {
    position: 'absolute',
    top: -6,
    left: -5,
    backgroundColor: '#0ca201',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    top: 11,
    right: 13,
    width: 38,
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  quantityContainer: {
    position: 'absolute',
    bottom: 11,
    right: 13,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityButton: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 8,
  },
  viewAllContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 12,
    height: 60,
  },
  viewAllContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  productIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#f6f6f6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  viewAllTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    zIndex: 100,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 65,
    borderRadius: 20,
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
    marginTop: 3,
  },
}); 