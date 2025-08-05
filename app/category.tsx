import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function CategoryScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample category data
  const categories = [
    { id: 1, name: 'All', image: 'https://via.placeholder.com/55x55/FFD700/FFFFFF?text=A' },
    { id: 2, name: 'Exotic Fruits', image: 'https://via.placeholder.com/55x55/4ECDC4/FFFFFF?text=EF' },
    { id: 3, name: 'Daily fruits', image: 'https://via.placeholder.com/55x55/FF6B6B/FFFFFF?text=DF' },
    { id: 4, name: 'Seasonal Fruits', image: 'https://via.placeholder.com/55x55/FF8E53/FFFFFF?text=SF' },
  ];

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Banana',
      price: '₹10',
      originalPrice: '₹15',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFD700/FFFFFF?text=B',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5'
    },
    {
      id: 2,
      name: 'Apple',
      price: '₹12',
      originalPrice: '₹18',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FF0000/FFFFFF?text=A',
      quantity: '1 pcs',
      saveAmount: 'Save ₹6'
    },
    {
      id: 3,
      name: 'Orange',
      price: '₹8',
      originalPrice: '₹12',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFA500/FFFFFF?text=O',
      quantity: '1 pcs',
      saveAmount: 'Save ₹4'
    },
    {
      id: 4,
      name: 'Mango',
      price: '₹15',
      originalPrice: '₹20',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FFD700/FFFFFF?text=M',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5'
    },
    {
      id: 5,
      name: 'Strawberry',
      price: '₹20',
      originalPrice: '₹25',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/FF69B4/FFFFFF?text=S',
      quantity: '1 pcs',
      saveAmount: 'Save ₹5'
    },
    {
      id: 6,
      name: 'Kiwi',
      price: '₹18',
      originalPrice: '₹22',
      discount: '10% Off',
      rating: '4.8 (1.k)',
      image: 'https://via.placeholder.com/138x112/4ECDC4/FFFFFF?text=K',
      quantity: '1 pcs',
      saveAmount: 'Save ₹4'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* ========================================
          HEADER SECTION
          ======================================== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#0a0b0a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fruits</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#0a0b0a" />
        </TouchableOpacity>
      </View>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <View style={styles.mainContent}>
        {/* ========================================
            SIDEBAR - CATEGORY FILTERS
            ======================================== */}
        <View style={styles.sidebar}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sidebarContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name && styles.categoryItemActive
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                </View>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ========================================
            PRODUCTS GRID
            ======================================== */}
        <View style={styles.productsContainer}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsContent}
          >
            <View style={styles.productsGrid}>
              {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                  {/* Product Image Container */}
                  <View style={styles.productImageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <View style={styles.discountTag}>
                      <Text style={styles.discountText}>{product.discount}</Text>
                    </View>
                  </View>

                  {/* Add to Cart Button */}
                  <View style={styles.addToCartButton}>
                    <Ionicons name="remove" size={16} color="#000000" />
                    <Text style={styles.quantityText}>1</Text>
                    <Ionicons name="add" size={16} color="#000000" />
                  </View>

                  {/* Favorite Button */}
                  <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={24} color="#000000" />
                  </TouchableOpacity>

                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    {/* Price Section */}
                    <View style={styles.priceSection}>
                      <Text style={styles.currentPrice}>{product.price}</Text>
                      <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                      <Text style={styles.saveAmount}>{product.saveAmount}</Text>
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.quantitySelector}>
                      <Text style={styles.quantityLabel}>{product.quantity}</Text>
                      <Ionicons name="chevron-down" size={12} color="#000000" />
                    </View>

                    {/* Product Name */}
                    <Text style={styles.productName}>{product.name}</Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={11} color="#FFD700" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0b0a',
  },
  searchButton: {
    padding: 5,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 75,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#c4c4c4',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  sidebarContent: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 5,
  },
  categoryItemActive: {
    backgroundColor: '#f6f6f6',
    borderRadius: 6,
  },
  categoryImageContainer: {
    width: 55,
    height: 55,
    backgroundColor: '#f6f6f6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryImage: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(28, 28, 28, 0.8)',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#0a0b0a',
    fontWeight: '600',
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  productsContent: {
    paddingBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  productImageContainer: {
    backgroundColor: '#f6f6f6',
    borderRadius: 15,
    height: 138,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 138,
    height: 112,
    borderRadius: 15,
  },
  discountTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#0ca201',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 15,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 38,
    width: 36,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 38,
    elevation: 2,
  },
  quantityText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ececec',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.05,
    shadowRadius: 40,
    elevation: 2,
  },
  productInfo: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 5,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  currentPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: '500',
    color: '#808080',
    textDecorationLine: 'line-through',
  },
  saveAmount: {
    fontSize: 9,
    fontWeight: '500',
    color: '#ff0000',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#0ca201',
    borderRadius: 3,
  },
  quantityLabel: {
    fontSize: 11,
    color: '#000000',
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 3,
  },
  ratingText: {
    fontSize: 11,
    color: '#000000',
  },
}); 